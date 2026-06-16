import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  BookOpen, Loader2, AlertCircle, ChevronRight, ChevronDown,
  FileText, Network, Sparkles, TrendingUp, AlertTriangle, CheckCircle2,
  Search, Clock, ListChecks, Link2, GitBranch, LayoutDashboard, Gauge,
} from "lucide-react";
import { authFetch, GapReport, RankedGap } from "./api";

// ===========================================================================
// Adapter — the 6-layer GapReport → the view model the Lovable design renders.
// (Detection is Cara's pipeline; this only reshapes its output for display.)
// ===========================================================================
type Severity = "high" | "medium" | "low";
type Method = "rule" | "semantic" | "graph";

type ViewGap = {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: Severity;
  methods: Method[];
  impactScore: number;       // 0-100
  severityScore: number;     // 0-10
  frequency: number;
  confidence: number;
  page: string;              // document_title (H1)
  pagePath?: string;         // resolved wiki path for deep-link
  section: string | null;
  recommendation: string;
  rootCause: string;
  evidence: { layer: Method | string; text: string }[];
  provenance: "detected" | "confirmed" | "from_ledger";
};

const PROVENANCE_META: Record<string, { label: string; cls: string }> = {
  confirmed:   { label: "Team-confirmed", cls: "bg-emerald-500/12 text-emerald-600 border-emerald-500/30" },
  from_ledger: { label: "Team-logged",    cls: "bg-primary/10 text-primary border-primary/30" },
};
const ProvenanceBadge = ({ p }: { p: string }) => {
  const m = PROVENANCE_META[p];
  return m ? <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${m.cls}`}>{m.label}</span> : null;
};

const CATEGORY_LABEL: Record<string, string> = {
  STRUCTURAL: "Structural Gap",
  EXPLICIT_EXPRESSION: "Explicit Expression Gap",
  IMPLICIT_EXPRESSION: "Implicit Expression Gap",
  RELATIONAL: "Relational (Reasoning) Gap",
  SEMANTIC: "Semantic Gap",
};
const LAYER_TO_METHOD: Record<string, Method> = {
  rule_based: "rule", semantic: "semantic", graph: "graph",
};
const METHOD_LABEL: Record<Method, string> = { rule: "Rule", semantic: "Semantic", graph: "Graph" };

const adaptGap = (g: RankedGap, resolve: (t: string) => string | undefined): ViewGap => {
  const methods = Array.from(
    new Set((g.evidence_sources ?? []).map((e) => LAYER_TO_METHOD[e.source_layer]).filter(Boolean)),
  ) as Method[];
  return {
    id: g.gap_id.slice(0, 8),
    title: g.description,
    description: g.root_cause || g.description,
    category: CATEGORY_LABEL[g.gap_category] ?? g.gap_category,
    severity: (g.risk_level?.toLowerCase() as Severity) ?? "medium",
    methods: methods.length ? methods : ["rule"],
    impactScore: Math.max(0, Math.min(100, Math.round(g.priority_score * 10))),
    severityScore: g.severity,
    frequency: g.frequency,
    confidence: g.confidence,
    page: g.document_title,
    pagePath: resolve(g.document_title),
    section: g.affected_document_section ?? null,
    recommendation: g.recommendation,
    rootCause: g.root_cause,
    evidence: (g.evidence_sources ?? []).map((e) => ({ layer: e.source_layer, text: e.description })),
    provenance: g.provenance ?? "detected",
  };
};

// --- shared visual atoms (Lovable look, our palette) -----------------------
const SEV_STYLE: Record<Severity, string> = {
  high:   "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  low:    "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};
const SEV_DOT: Record<Severity, string> = {
  high: "bg-destructive", medium: "bg-amber-500", low: "bg-emerald-500",
};
const METHOD_STYLE: Record<Method, string> = {
  rule:     "bg-primary-glow/10 text-primary-glow border-primary-glow/30",
  semantic: "bg-primary/10 text-primary border-primary/30",
  graph:    "bg-teal-500/10 text-teal-600 border-teal-500/30",
};
const impactColor = (s: number) =>
  s >= 80 ? "bg-destructive" : s >= 60 ? "bg-amber-500" : s >= 40 ? "bg-primary" : "bg-muted-foreground/50";

const SeverityBadge = ({ severity }: { severity: Severity }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${SEV_STYLE[severity]}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${SEV_DOT[severity]}`} /> {severity}
  </span>
);
const MethodChip = ({ method }: { method: Method }) => (
  <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${METHOD_STYLE[method]}`}>
    {METHOD_LABEL[method]}
  </span>
);
const ImpactBar = ({ score }: { score: number }) => (
  <div className="flex items-center gap-2">
    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
      <div className={`h-full rounded-full ${impactColor(score)}`} style={{ width: `${score}%` }} />
    </div>
    <span className="text-xs font-semibold tabular-nums text-foreground">{score}</span>
  </div>
);

// ===========================================================================
// cache + small helpers
// ===========================================================================
const CACHE_KEY = "wiki_gaps_cache_v2";
type Cache = { wiki_version: string; report: GapReport; saved_at: string };
const loadCache = (): Cache | null => {
  try { const r = sessionStorage.getItem(CACHE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
};
const saveCache = (c: Cache) => { try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch { /* ignore */ } };
type WikiPageRef = { path: string; title: string };

// ===========================================================================
// Main view
// ===========================================================================
type SubView = "dashboard" | "report";

export const GapsView = ({ onNavigate }: { onNavigate: (view: string, wikiPath?: string) => void }) => {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [report, setReport]       = useState<GapReport | null>(null);
  const [savedAt, setSavedAt]     = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [stale, setStale]         = useState(false);
  const [sub, setSub]             = useState<SubView>("dashboard");
  const [pageMap, setPageMap]     = useState<Record<string, string>>({});
  const analyzedVersion = useRef<string | null>(null);
  const polling = useRef(false);

  useEffect(() => {
    authFetch("/wiki/pages").then((r) => (r.ok ? r.json() : [])).then((pages: WikiPageRef[]) => {
      const m: Record<string, string> = {};
      pages.forEach((p) => { m[p.title.trim().toLowerCase()] = p.path; });
      setPageMap(m);
    }).catch(() => setPageMap({}));
  }, []);
  const resolvePath = useCallback((title: string) => pageMap[title.trim().toLowerCase()], [pageMap]);

  const runAnalysis = useCallback(async () => {
    if (polling.current) return;
    polling.current = true; setAnalyzing(true); setError(null); setStale(false);
    try {
      const a = await authFetch("/gaps/analyze", { method: "POST" });
      if (!a.ok) throw new Error((await a.json().catch(() => ({})))?.detail ?? "Could not start the analysis.");
      const { job_id, wiki_version } = await a.json();
      for (let i = 0; i < 200; i++) {
        await new Promise((r) => setTimeout(r, 2500));
        const p = await authFetch(`/gaps/report/${job_id}`);
        if (!p.ok) {
          if (p.status === 404) throw new Error("The analysis job expired. Try again.");
          throw new Error("The analysis could not be completed.");
        }
        const body = await p.json();
        if (body.status === "completed") {
          const at = new Date().toISOString();
          setReport(body.report); setSavedAt(at);
          analyzedVersion.current = wiki_version;
          saveCache({ wiki_version, report: body.report, saved_at: at });
          return;
        }
      }
      throw new Error("The analysis is taking longer than expected. Please re-try.");
    } catch (e: any) {
      setError(e?.message ?? "Analysis failed.");
    } finally { setAnalyzing(false); polling.current = false; }
  }, []);

  useEffect(() => {
    (async () => {
      let health: any = {};
      try { health = await (await authFetch("/gaps/health")).json(); } catch { health = { available: false }; }
      if (!health.available) { setAvailable(false); return; }
      setAvailable(true);
      let version = "";
      try { version = (await (await authFetch("/gaps/version")).json()).wiki_version; } catch { /* ignore */ }
      const cache = loadCache();
      if (cache && cache.wiki_version === version) {
        setReport(cache.report); setSavedAt(cache.saved_at); analyzedVersion.current = cache.wiki_version;
      } else { runAnalysis(); }
    })();
  }, [runAnalysis]);

  useEffect(() => {
    if (available !== true) return;
    const id = setInterval(async () => {
      if (polling.current) return;
      try {
        const v = (await (await authFetch("/gaps/version")).json()).wiki_version;
        if (analyzedVersion.current && v !== analyzedVersion.current) setStale(true);
      } catch { /* ignore */ }
    }, 45000);
    return () => clearInterval(id);
  }, [available]);

  const gaps = useMemo(
    () => (report?.gaps ?? []).map((g) => adaptGap(g, resolvePath)),
    [report, resolvePath],
  );
  const openPage = (g: ViewGap) => onNavigate("wiki", g.pagePath);

  return (
    <div className="min-h-screen bg-soft flex flex-col">
      {/* App header (one artifact — same nav as the other tabs) */}
      <header className="bg-hero text-primary-foreground shrink-0">
        <div className="max-w-full px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center ring-1 ring-primary-foreground/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Project Wiki</div>
              <div className="text-xs text-primary-foreground/70">Self-updating knowledge base</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-primary-foreground/80">
            <span onClick={() => onNavigate("wiki")}       className="hover:text-primary-foreground cursor-pointer">Wiki</span>
            <span onClick={() => onNavigate("operations")} className="hover:text-primary-foreground cursor-pointer">Operations</span>
            <span onClick={() => onNavigate("generator")}  className="hover:text-primary-foreground cursor-pointer">Generator</span>
            <span className="text-primary-foreground font-medium border-b-2 border-accent pb-1 cursor-default">Gaps</span>
          </nav>
          <div className="h-9 w-9 rounded-full bg-accent-gradient flex items-center justify-center text-sm font-semibold text-accent-foreground">LR</div>
        </div>
      </header>

      {/* sub-nav + controls */}
      <div className="border-b border-border bg-card/60 backdrop-blur">
        <div className="max-w-[1200px] mx-auto px-8 py-3 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-3 mr-auto">
            <div className="h-9 w-9 rounded-lg bg-hero flex items-center justify-center text-primary-foreground shadow-soft">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold leading-tight text-foreground">Gap Detector</div>
              <div className="text-xs text-muted-foreground">Hybrid rule · semantic · graph analysis</div>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-1 text-sm">
            <button onClick={() => setSub("dashboard")}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${sub === "dashboard" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
            </button>
            <button onClick={() => setSub("report")}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${sub === "report" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <FileText className="h-3.5 w-3.5" /> Report
            </button>
          </div>
          <button onClick={runAnalysis} disabled={analyzing || available !== true}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
            {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {analyzing ? "Running scan…" : "Run scan"}
          </button>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto w-full px-8 py-6 space-y-5">
        {stale && !analyzing && (
          <div className="flex items-center gap-2 text-sm bg-amber-500/8 border border-amber-500/25 rounded-xl px-4 py-3 text-foreground/80">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            The wiki changed since this report was generated.
            <button onClick={runAnalysis} className="ml-1 font-medium text-amber-700 underline underline-offset-2">Re-run scan</button>
          </div>
        )}

        {available === null ? (
          <Centered><Loader2 className="h-7 w-7 text-primary animate-spin" /></Centered>
        ) : available === false ? (
          <Unavailable />
        ) : error ? (
          <div className="bg-card rounded-xl border border-border px-6 py-16 text-center shadow-soft">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <button onClick={runAnalysis} className="mt-5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">Try again</button>
          </div>
        ) : !report && analyzing ? (
          <Centered>
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground mt-4">Running the 6-layer analysis across your wiki — this can take a minute.</p>
          </Centered>
        ) : report ? (
          sub === "dashboard"
            ? <Dashboard gaps={gaps} report={report} savedAt={savedAt} onOpenPage={openPage} />
            : <Report gaps={gaps} onOpenPage={openPage} />
        ) : null}
      </main>

      <footer className="pb-6 pt-2 text-center text-xs text-muted-foreground">
        Detection: rule-based · semantic · graph — Cara Cheng's 6-layer pipeline, in-process.
      </footer>
    </div>
  );
};

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card rounded-xl border border-border px-6 py-20 flex flex-col items-center justify-center text-center shadow-soft">{children}</div>
);
const Unavailable = () => (
  <div className="bg-card rounded-xl border border-border px-6 py-16 text-center shadow-soft">
    <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground mb-4"><Network className="h-6 w-6" /></div>
    <h3 className="text-base font-semibold text-foreground">Gap analysis service unavailable</h3>
    <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto">The rest of the wiki works normally. Gap analysis will appear here once the service is reachable.</p>
  </div>
);

// ===========================================================================
// Dashboard
// ===========================================================================
const Dashboard = ({ gaps, report, savedAt, onOpenPage }: {
  gaps: ViewGap[]; report: GapReport; savedAt: string | null; onOpenPage: (g: ViewGap) => void;
}) => {
  const [query, setQuery] = useState("");
  const [sev, setSev] = useState<Severity | "all">("all");
  const [method, setMethod] = useState<Method | "all">("all");
  const [sort, setSort] = useState<"impact" | "confidence">("impact");
  const [selectedId, setSelectedId] = useState<string | null>(gaps[0]?.id ?? null);

  const filtered = useMemo(() => {
    let g = gaps.filter((x) => {
      if (sev !== "all" && x.severity !== sev) return false;
      if (method !== "all" && !x.methods.includes(method)) return false;
      if (query) {
        const q = query.toLowerCase();
        return x.title.toLowerCase().includes(q) || x.page.toLowerCase().includes(q) || x.category.toLowerCase().includes(q);
      }
      return true;
    });
    return [...g].sort((a, b) => sort === "impact" ? b.impactScore - a.impactScore : b.confidence - a.confidence);
  }, [gaps, query, sev, method, sort]);

  const selected = filtered.find((g) => g.id === selectedId) ?? filtered[0] ?? null;
  const avgImpact = gaps.length ? Math.round(gaps.reduce((s, g) => s + g.impactScore, 0) / gaps.length) : 0;
  const byCategory = useMemo(() => {
    const m: Record<string, number> = {};
    gaps.forEach((g) => { m[g.category] = (m[g.category] ?? 0) + 1; });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, [gaps]);
  const byMethod = useMemo(() => {
    const m: Record<Method, number> = { rule: 0, semantic: 0, graph: 0 };
    gaps.forEach((g) => g.methods.forEach((x) => { m[x]++; }));
    return m;
  }, [gaps]);
  const bySev = { high: report.high_risk_count, medium: report.medium_risk_count, low: report.low_risk_count };

  const stats = [
    { label: "Open gaps", value: report.total_gaps, sub: `${bySev.high} high`, icon: AlertTriangle, tone: "text-destructive" },
    { label: "Avg impact", value: avgImpact, sub: "weighted score", icon: TrendingUp, tone: "text-amber-600" },
    { label: "Pages analysed", value: report.documents_analyzed.length, sub: "wiki knowledge layer", icon: BookOpen, tone: "text-primary" },
    { label: "High priority", value: bySev.high, sub: `${bySev.medium} medium · ${bySev.low} low`, icon: AlertCircle, tone: "text-destructive" },
  ];

  return (
    <>
      {savedAt && <div className="text-xs text-muted-foreground -mb-1">Report last updated: <span className="font-medium text-foreground">{new Date(savedAt).toLocaleString()}</span></div>}

      {/* stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.label}</span>
              <c.icon className={`h-4 w-4 ${c.tone}`} />
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{c.value}</div>
            <div className="text-xs text-muted-foreground">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* insights */}
      <div className="grid gap-3 lg:grid-cols-3">
        <InsightCard title="By priority" sub="severity distribution">
          {(["high", "medium", "low"] as Severity[]).map((s) => (
            <BarRow key={s} label={s} value={bySev[s]} max={Math.max(1, report.total_gaps)} barClass={SEV_DOT[s]} />
          ))}
        </InsightCard>
        <InsightCard title="By category" sub={`across ${report.total_gaps} gaps`}>
          {byCategory.map((c) => (
            <BarRow key={c.name} label={c.name} value={c.value} max={Math.max(1, ...byCategory.map((x) => x.value))} barClass="bg-primary" />
          ))}
        </InsightCard>
        <InsightCard title="Detection method mix" sub="hybrid triangulation">
          <BarRow label="Rule-based" value={byMethod.rule} max={Math.max(1, byMethod.rule + byMethod.semantic + byMethod.graph)} barClass="bg-primary-glow" pct />
          <BarRow label="Semantic" value={byMethod.semantic} max={Math.max(1, byMethod.rule + byMethod.semantic + byMethod.graph)} barClass="bg-primary" pct />
          <BarRow label="Graph" value={byMethod.graph} max={Math.max(1, byMethod.rule + byMethod.semantic + byMethod.graph)} barClass="bg-teal-500" pct />
        </InsightCard>
      </div>

      {/* prioritized list + detail */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Prioritized gaps</h2>
          <p className="text-xs text-muted-foreground">Ranked by estimated impact across the wiki knowledge graph.</p>
        </div>
        {/* filter bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card/50 px-5 py-3">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search gaps, pages, categories…"
              className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none focus:border-primary" />
          </div>
          <Segmented label="Severity" value={sev} options={["all", "high", "medium", "low"]} onChange={setSev} />
          <Segmented label="Method" value={method} options={["all", "rule", "semantic", "graph"]} onChange={setMethod} />
          <select value={sort} onChange={(e) => setSort(e.target.value as any)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm capitalize outline-none focus:border-primary">
            <option value="impact">Sort: impact</option>
            <option value="confidence">Sort: confidence</option>
          </select>
          <span className="ml-auto text-xs text-muted-foreground tabular-nums">{filtered.length} results</span>
        </div>
        <div className="grid lg:grid-cols-[1fr_400px]">
          <div className="max-h-[680px] overflow-y-auto divide-y divide-border">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted-foreground">No gaps match your filters.</div>
            ) : filtered.map((g) => {
              const active = selected?.id === g.id;
              return (
                <button key={g.id} onClick={() => setSelectedId(g.id)}
                  className={`group flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/50 ${active ? "bg-secondary/70" : ""}`}>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{g.id}</span>
                      <SeverityBadge severity={g.severity} />
                      <span className="text-xs text-muted-foreground">· {g.category}</span>
                      <ProvenanceBadge p={g.provenance} />
                    </div>
                    <h3 className="font-medium leading-snug text-foreground">{g.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-0.5">
                      <div className="flex gap-1">{g.methods.map((m) => <MethodChip key={m} method={m} />)}</div>
                      <ImpactBar score={g.impactScore} />
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><FileText className="h-3 w-3" /> {g.page}</span>
                    </div>
                  </div>
                  <ChevronRight className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${active ? "translate-x-0.5 text-foreground" : "group-hover:translate-x-0.5"}`} />
                </button>
              );
            })}
          </div>
          <aside className="border-t border-border bg-secondary/20 lg:border-l lg:border-t-0">
            {selected ? <GapDetail gap={selected} onOpenPage={onOpenPage} /> : <div className="p-8 text-center text-sm text-muted-foreground">Select a gap.</div>}
          </aside>
        </div>
      </div>
    </>
  );
};

const InsightCard = ({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
    <div className="mb-3"><h3 className="text-sm font-semibold text-foreground">{title}</h3><p className="text-xs text-muted-foreground">{sub}</p></div>
    <div className="space-y-1.5">{children}</div>
  </div>
);
const BarRow = ({ label, value, max, barClass, pct }: { label: string; value: number; max: number; barClass: string; pct?: boolean }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-28 truncate capitalize text-muted-foreground">{label}</span>
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
      <div className={`h-full rounded-full ${barClass}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
    <span className="w-12 text-right tabular-nums text-foreground">{value}{pct ? ` · ${Math.round((value / max) * 100)}%` : ""}</span>
  </div>
);
function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
      <span className="px-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
          className={`h-7 rounded px-2 text-xs font-medium capitalize transition-colors ${value === o ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>{o}</button>
      ))}
    </div>
  );
}

const GapDetail = ({ gap, onOpenPage }: { gap: ViewGap; onOpenPage: (g: ViewGap) => void }) => (
  <div className="flex h-full flex-col">
    <div className="border-b border-border px-5 py-4">
      <div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs text-muted-foreground">{gap.id}</span><SeverityBadge severity={gap.severity} /><ProvenanceBadge p={gap.provenance} /></div>
      <h2 className="mt-2 text-base font-semibold leading-tight text-foreground">{gap.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{gap.description}</p>
    </div>
    <div className="flex-1 space-y-5 overflow-y-auto p-5">
      <div className="grid grid-cols-2 gap-3">
        <Metric icon={<TrendingUp className="h-4 w-4" />} label="Impact" value={String(gap.impactScore)} />
        <Metric icon={<Gauge className="h-4 w-4" />} label="Severity" value={gap.severityScore.toFixed(1)} />
        <Metric icon={<GitBranch className="h-4 w-4" />} label="Confidence" value={`${Math.round(gap.confidence * 100)}%`} />
        <Metric icon={<Clock className="h-4 w-4" />} label="Seen" value={`${gap.frequency}×`} />
      </div>
      <div>
        <Label>Affected page</Label>
        <button onClick={() => onOpenPage(gap)} className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-primary hover:bg-secondary transition-colors">
          <FileText className="h-3.5 w-3.5" /> {gap.page}{gap.section ? ` · ${gap.section}` : ""} <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div>
        <Label>Detection methods</Label>
        <div className="mt-2 flex gap-1.5">{gap.methods.map((m) => <MethodChip key={m} method={m} />)}</div>
      </div>
      <section className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2 text-primary"><Sparkles className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wide">Recommendation</span></div>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{gap.recommendation}</p>
      </section>
      {gap.evidence.length > 0 && (
        <div>
          <Label>Supporting evidence</Label>
          <ul className="mt-2 space-y-1.5">
            {gap.evidence.map((ev, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-2.5 text-xs text-muted-foreground">
                <Network className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span><span className="font-semibold text-foreground/70 capitalize">{String(ev.layer).replace("_", " ")}:</span> {ev.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{children}</h4>
);
const Metric = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-lg border border-border bg-card p-3">
    <div className="flex items-center gap-1.5 text-muted-foreground">{icon}<span className="text-xs">{label}</span></div>
    <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
  </div>
);

// ===========================================================================
// Report (severity-grouped, expandable, with evidence + remediation)
// ===========================================================================
const SEV_META: Record<Severity, { label: string; blurb: string; icon: React.ElementType; tone: string }> = {
  high:   { label: "High",   blurb: "Address within the current sprint.", icon: AlertTriangle, tone: "text-destructive" },
  medium: { label: "Medium", blurb: "Plan for the next docs grooming cycle.", icon: TrendingUp, tone: "text-amber-600" },
  low:    { label: "Low",    blurb: "Batch with routine cleanup work.", icon: CheckCircle2, tone: "text-emerald-600" },
};

const Report = ({ gaps, onOpenPage }: { gaps: ViewGap[]; onOpenPage: (g: ViewGap) => void }) => {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(gaps.slice(0, 2).map((g) => [g.id, true])));
  const grouped: Record<Severity, ViewGap[]> = {
    high: gaps.filter((g) => g.severity === "high"),
    medium: gaps.filter((g) => g.severity === "medium"),
    low: gaps.filter((g) => g.severity === "low"),
  };
  const avg = gaps.length ? Math.round(gaps.reduce((s, g) => s + g.impactScore, 0) / gaps.length) : 0;
  const top = gaps.reduce((m, g) => Math.max(m, g.impactScore), 0);
  const byCategory = useMemo(() => {
    const m: Record<string, number> = {};
    gaps.forEach((g) => { m[g.category] = (m[g.category] ?? 0) + 1; });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, [gaps]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3 w-3" /> Generated report
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Prioritized knowledge gaps</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Structured summary of {gaps.length} detected gaps, ordered by estimated impact. Each entry includes
              supporting evidence, the affected wiki page, and a targeted remediation step.
            </p>
          </div>
          <div className="hidden text-right md:block">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Avg impact</div>
            <div className="text-3xl font-semibold tabular-nums text-foreground">{avg}</div>
            <div className="text-xs text-muted-foreground">top: {top}</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {(["high", "medium", "low"] as Severity[]).map((s) => {
            const meta = SEV_META[s]; const Icon = meta.icon;
            return (
              <div key={s} className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{meta.label}</span>
                  <Icon className={`h-4 w-4 ${meta.tone}`} />
                </div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{grouped[s].length}</div>
                <div className="text-[11px] leading-snug text-muted-foreground">{meta.blurb}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gap type distribution</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {byCategory.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2 py-0.5 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{c.name}</span><span className="tabular-nums">{c.value}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {(["high", "medium", "low"] as Severity[]).map((s) => {
        const items = grouped[s]; if (items.length === 0) return null;
        const meta = SEV_META[s]; const Icon = meta.icon;
        return (
          <section key={s} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${meta.tone}`} />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">{meta.label} priority</h2>
              <span className="text-xs text-muted-foreground">· {items.length} gap{items.length > 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-3">
              {items.map((g, idx) => {
                const isOpen = open[g.id] ?? false;
                return (
                  <article key={g.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                    <button onClick={() => setOpen((o) => ({ ...o, [g.id]: !isOpen }))}
                      className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/40">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-xs font-semibold tabular-nums text-muted-foreground">{idx + 1}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{g.id}</span>
                          <SeverityBadge severity={g.severity} />
                          <span className="rounded-md border border-border bg-secondary/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{g.category}</span>
                          <ProvenanceBadge p={g.provenance} />
                          <div className="flex gap-1">{g.methods.map((m) => <MethodChip key={m} method={m} />)}</div>
                        </div>
                        <h3 className="font-medium leading-snug text-foreground">{g.title}</h3>
                        <ImpactBar score={g.impactScore} />
                      </div>
                      {isOpen ? <ChevronDown className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />}
                    </button>
                    {isOpen && (
                      <div className="grid gap-5 border-t border-border bg-secondary/10 p-5 md:grid-cols-2">
                        <div className="md:col-span-2"><p className="text-sm leading-relaxed text-muted-foreground">{g.description}</p></div>
                        <div>
                          <SectionLabel icon={<BookOpen className="h-3.5 w-3.5" />}>Supporting evidence</SectionLabel>
                          <ul className="mt-2 space-y-2">
                            {g.evidence.map((ev, i) => (
                              <li key={i} className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-2.5 text-xs">
                                <Network className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <div><div className="font-medium capitalize text-foreground">{String(ev.layer).replace("_", " ")}</div><div className="text-muted-foreground">{ev.text}</div></div>
                              </li>
                            ))}
                            {g.evidence.length === 0 && <li className="text-xs text-muted-foreground">—</li>}
                          </ul>
                        </div>
                        <div>
                          <SectionLabel icon={<Link2 className="h-3.5 w-3.5" />}>Contextual references</SectionLabel>
                          <ul className="mt-2 space-y-1.5">
                            <li>
                              <button onClick={() => onOpenPage(g)} className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-foreground transition-colors hover:bg-secondary">
                                <span className="rounded-sm bg-secondary px-1 py-0.5 text-[9px] uppercase tracking-wide text-muted-foreground">page</span>
                                <span className="truncate">{g.page}</span>
                              </button>
                            </li>
                            {g.section && <li className="text-xs text-muted-foreground">Section: {g.section}</li>}
                          </ul>
                        </div>
                        <div className="md:col-span-2">
                          <SectionLabel icon={<ListChecks className="h-3.5 w-3.5" />}>Remediation</SectionLabel>
                          <ol className="mt-2 space-y-2">
                            {[
                              { label: "Apply the fix", detail: g.recommendation },
                              { label: "Re-run the scan", detail: "Confirm the gap is resolved after editing the page." },
                            ].map((step, i) => (
                              <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">{i + 1}</span>
                                <div><div className="text-sm font-medium text-foreground">{step.label}</div><div className="text-xs text-muted-foreground">{step.detail}</div></div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
const SectionLabel = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{icon}{children}</div>
);
