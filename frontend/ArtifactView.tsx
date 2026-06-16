import { useEffect, useState } from "react";
import {
  BookOpen, Sparkles, FileText, TrendingUp, CalendarDays, Linkedin,
  Users, Plus, Settings2, ArrowRight, Check, X, Briefcase,
  Code2, Megaphone, Building2, ChevronRight, Clock, Bot, ListPlus,
  Plus as PlusIcon, Minus, Trash2, Share2, Download, Copy, RotateCcw,
  Mail, Loader2, Info, Lock, UserPlus, Globe2, AlertCircle,
  ShieldCheck, ShieldAlert, ShieldX,
} from "lucide-react";
import { authFetch, withProject, getSession, Project } from "./src/api";

const BACKEND_URL = "http://localhost:8000";

// ---------------------------------------------------------------------------
// Presets
// ---------------------------------------------------------------------------
const PRESETS: Record<string, { tone: number; length: number }> = {
  "summary|new-member":        { tone: 55, length: 70 },
  "summary|tech-lead":         { tone: 30, length: 65 },
  "summary|pm":                { tone: 35, length: 50 },
  "summary|client":            { tone: 20, length: 45 },
  "summary|general":           { tone: 45, length: 40 },
  "progress-tech|tech-lead":   { tone: 25, length: 75 },
  "progress-tech|pm":          { tone: 35, length: 55 },
  "progress-tech|general":     { tone: 45, length: 45 },
  "progress-business|client":  { tone: 20, length: 50 },
  "progress-business|pm":      { tone: 30, length: 50 },
  "progress-business|general": { tone: 40, length: 40 },
  "progress-comms|comms":      { tone: 70, length: 45 },
  "digest|intranet":           { tone: 55, length: 50 },
  "linkedin|comms":            { tone: 80, length: 30 },
};
const DEFAULT_PRESET = { tone: 50, length: 50 };
const presetFor = (o: string, s: string) => PRESETS[`${o}|${s}`] ?? DEFAULT_PRESET;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type OutputType = {
  id: string; title: string; desc: string; icon: React.ElementType;
  cadence: string; custom?: boolean; include?: string[]; exclude?: string[];
};
type Stakeholder = {
  id: string; name: string; role: string; tone: string;
  icon: React.ElementType; custom?: boolean;
};
type ProgressVariant = "progress-tech" | "progress-business" | "progress-comms";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const outputTypes: OutputType[] = [
  { id: "linkedin",  title: "LinkedIn draft",               desc: "Public-ready narrative with hook and CTA, sent to the comms team.",                                                  icon: Linkedin,     cadence: "On demand"   },
  { id: "summary",   title: "Project / onboarding summary", desc: "Overview of scope, status, and outcomes — ideal for new joiners or stakeholders catching up.",                       icon: FileText,     cadence: "On demand"   },
  { id: "progress",  title: "Progress report",              desc: "Milestones, blockers, and next steps. Pick a technical, business, or communication angle.",                           icon: TrendingUp,   cadence: "Bi-weekly"   },
  { id: "digest",    title: "Weekly digest",                desc: "Auto-published to the intranet every Friday. Aggregates the week's updates across all active projects.",              icon: CalendarDays, cadence: "Every Friday" },
];

const PROGRESS_VARIANTS: { id: ProgressVariant; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "progress-tech",     label: "Technical",     desc: "Architecture, code, blockers",    icon: Code2     },
  { id: "progress-business", label: "Business",      desc: "Outcomes, timeline, value",       icon: Briefcase },
  { id: "progress-comms",    label: "Communication", desc: "Narrative for the team & beyond", icon: Megaphone },
];

const stakeholders: Stakeholder[] = [
  { id: "new-member", name: "New team member",     role: "Onboarding",              tone: "Welcoming · contextual",   icon: UserPlus  },
  { id: "tech-lead",  name: "Tech lead",           role: "Engineering ownership",   tone: "Technical · precise",      icon: Code2     },
  { id: "pm",         name: "Project manager",     role: "Delivery & coordination", tone: "Structured · outcome-led", icon: Briefcase },
  { id: "client",     name: "Client contact",      role: "External stakeholder",    tone: "Formal · value-driven",    icon: Building2 },
  { id: "general",    name: "General",             role: "Broad internal audience", tone: "Balanced · accessible",    icon: Users     },
  { id: "comms",      name: "Communications team", role: "Brand & public voice",    tone: "Narrative · public",       icon: Megaphone },
  { id: "intranet",   name: "All employees",       role: "Company intranet readers",tone: "Friendly · informative",   icon: Globe2    },
];

const stakeholdersFor = (outputId: string, variant: ProgressVariant): string[] => {
  if (outputId === "linkedin") return ["comms"];
  if (outputId === "summary")  return ["new-member", "tech-lead", "pm", "client", "general"];
  if (outputId === "digest")   return ["intranet"];
  if (outputId === "progress") {
    if (variant === "progress-tech")     return ["tech-lead", "pm", "general"];
    if (variant === "progress-business") return ["client", "pm", "general"];
    return ["comms"];
  }
  return stakeholders.map((s) => s.id);
};

const isStakeholderFixed = (outputId: string, variant: ProgressVariant): boolean =>
  outputId === "linkedin" || outputId === "digest" ||
  (outputId === "progress" && variant === "progress-comms");

const presetKeyOutput = (outputId: string, variant: ProgressVariant): string =>
  outputId === "progress" ? variant : outputId;

// ---------------------------------------------------------------------------
// Backend API call — replaces direct Anthropic call
// ---------------------------------------------------------------------------
export type AuditFlag = { text: string; severity: string; reason: string };
export type AuditResult = {
  action: "publish" | "review" | "block";
  level: string;
  retries: number;
  flags: AuditFlag[];
};

const callBackendAPI = async (params: {
  outputId: string; progressVariant: string; stakeholderName: string;
  stakeholderRole: string; tone: number; length: number;
  include: string[]; exclude: string[]; outputTitle: string;
  projectScope: string | null; project: string;
}): Promise<{ text: string | null; pages: string[]; audit: AuditResult | null }> => {
  const response = await authFetch(withProject(`/generate`, params.project), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      output_id:        params.outputId,
      progress_variant: params.progressVariant,
      stakeholder_name: params.stakeholderName,
      stakeholder_role: params.stakeholderRole,
      tone:             params.tone,
      length:           params.length,
      include:          params.include,
      exclude:          params.exclude,
      output_title:     params.outputTitle,
      project_scope:    params.projectScope,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any)?.detail ?? `API error ${response.status}`);
  }

  const data = await response.json();
  return { text: data.text, pages: data.pages ?? [], audit: data.audit ?? null };
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const ArtifactView = ({ onNavigate, project }: { onNavigate?: (view: string) => void; project: string }) => {
  const [showModal,       setShowModal]       = useState(false);
  const [selectedOutput,  setSelectedOutput]  = useState("summary");
  const [progressVariant, setProgressVariant] = useState<ProgressVariant>("progress-tech");
  const [selectedStakeholder, setSelectedStakeholder] = useState<string>("new-member");

  const initialKey = presetKeyOutput("summary", "progress-tech");
  const initial    = presetFor(initialKey, "new-member");
  const [tone,        setTone]        = useState(initial.tone);
  const [length,      setLength]      = useState(initial.length);
  const [usingPreset, setUsingPreset] = useState(true);

  useEffect(() => {
    const allowed = selectedOutput.startsWith("custom-out-")
      ? stakeholders.map((s) => s.id)
      : stakeholdersFor(selectedOutput, progressVariant);
    if (!allowed.includes(selectedStakeholder)) setSelectedStakeholder(allowed[0]);
  }, [selectedOutput, progressVariant]);

  useEffect(() => {
    const key = presetKeyOutput(selectedOutput, progressVariant);
    const p   = presetFor(key, selectedStakeholder);
    setTone(p.tone); setLength(p.length); setUsingPreset(true);
  }, [selectedOutput, progressVariant, selectedStakeholder]);

  const onToneChange   = (n: number) => { setTone(n);   setUsingPreset(false); };
  const onLengthChange = (n: number) => { setLength(n); setUsingPreset(false); };
  const resetToPreset  = () => {
    const key = presetKeyOutput(selectedOutput, progressVariant);
    const p   = presetFor(key, selectedStakeholder);
    setTone(p.tone); setLength(p.length); setUsingPreset(true);
  };

  const [generated,       setGenerated]       = useState(false);
  const [generating,      setGenerating]      = useState(false);
  const [generatedText,   setGeneratedText]   = useState("");
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [copied,          setCopied]          = useState(false);
  const [pagesConsulted,  setPagesConsulted]  = useState<string[]>([]);
  const [saving,          setSaving]          = useState(false);
  const [saved,           setSaved]           = useState(false);
  const [audit,           setAudit]           = useState<AuditResult | null>(null);
  const [blocked,         setBlocked]         = useState(false);
  const [projectScope,    setProjectScope]    = useState<string>("");
  const [allProjects,     setAllProjects]     = useState<Project[]>([]);

  useEffect(() => {
    authFetch("/projects")
      .then((r) => (r.ok ? r.json() : { all: [] }))
      .then((d) => setAllProjects(d.all ?? []))
      .catch(() => setAllProjects([]));
  }, []);

  const myProjectIds = (getSession()?.projects ?? []).map((p) => p.id);

  const [genInclude,      setGenInclude]      = useState<string[]>([]);
  const [genExclude,      setGenExclude]      = useState<string[]>([]);
  const [genIncludeInput, setGenIncludeInput] = useState("");
  const [genExcludeInput, setGenExcludeInput] = useState("");

  const addGenChip = (which: "include" | "exclude") => {
    const input = which === "include" ? genIncludeInput : genExcludeInput;
    const val   = input.trim();
    if (!val) return;
    if (which === "include") { setGenInclude([...genInclude, val]); setGenIncludeInput(""); }
    else                     { setGenExclude([...genExclude, val]); setGenExcludeInput(""); }
  };
  const removeGenChip = (which: "include" | "exclude", idx: number) => {
    if (which === "include") setGenInclude(genInclude.filter((_, i) => i !== idx));
    else                     setGenExclude(genExclude.filter((_, i) => i !== idx));
  };

  const [customList,    setCustomList]    = useState<Stakeholder[]>([]);
  const [draft,         setDraft]         = useState({ name: "", role: "", tone: "" });
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [customOutputs,   setCustomOutputs]   = useState<OutputType[]>([]);
  const [outputDraft, setOutputDraft] = useState<{
    title: string; desc: string; include: string[]; exclude: string[];
    includeInput: string; excludeInput: string;
  }>({ title: "", desc: "", include: [], exclude: [], includeInput: "", excludeInput: "" });

  const allOutputs      = [...outputTypes, ...customOutputs];
  const allStakeholders = [...stakeholders, ...customList];
  const activeOutput      = allOutputs.find((o) => o.id === selectedOutput) ?? allOutputs[0];
  const activeStakeholder = allStakeholders.find((s) => s.id === selectedStakeholder) ?? stakeholders[0];

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareDraft,     setShareDraft]     = useState({ to: "", message: "" });
  const [shareSent,      setShareSent]      = useState(false);

  const handleAddCustom = () => {
    if (!draft.name.trim()) return;
    const newSh: Stakeholder = {
      id: `custom-${Date.now()}`, name: draft.name,
      role: draft.role || "Custom stakeholder", tone: draft.tone || "Custom tone",
      icon: Users, custom: true,
    };
    setCustomList([...customList, newSh]);
    setSelectedStakeholder(newSh.id);
    setDraft({ name: "", role: "", tone: "" });
    setShowModal(false);
  };

  const handleAddCustomOutput = () => {
    if (!outputDraft.title.trim()) return;
    const newOut: OutputType = {
      id: `custom-out-${Date.now()}`, title: outputDraft.title,
      desc: outputDraft.desc || "Custom output type", icon: ListPlus, cadence: "Custom",
      custom: true, include: outputDraft.include, exclude: outputDraft.exclude,
    };
    setCustomOutputs([...customOutputs, newOut]);
    setSelectedOutput(newOut.id);
    setOutputDraft({ title: "", desc: "", include: [], exclude: [], includeInput: "", excludeInput: "" });
    setShowOutputModal(false);
  };

  // Uses backend instead of direct Anthropic call
  const handleGenerate = async () => {
    setGenerating(true);
    setGenerated(false);
    setGenerationError(null);
    setGeneratedText("");
    setAudit(null);
    setBlocked(false);

    setSaved(false);
    try {
      const { text, pages, audit } = await callBackendAPI({
        outputId:        selectedOutput,
        progressVariant,
        stakeholderName: activeStakeholder.name,
        stakeholderRole: activeStakeholder.role,
        tone,
        length,
        include:         genInclude,
        exclude:         genExclude,
        outputTitle:     activeOutput.title,
        projectScope:    selectedOutput === "linkedin" ? null : (projectScope || null),
        project,
      });
      setAudit(audit);
      setPagesConsulted(pages);
      if (text === null || audit?.action === "block") {
        setBlocked(true);
      } else {
        setGeneratedText(text);
        setGenerated(true);
      }
    } catch (err: any) {
      setGenerationError(err?.message ?? "Generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const getContent = () => generatedText || "";

  const handleDownload = () => {
    const content = getContent();
    if (!content) return;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${activeOutput.title.toLowerCase().replace(/\s+/g, "-")}-${activeStakeholder.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = async () => {
    const content = getContent();
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* silently ignored */ }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await authFetch(withProject(`/save`, project), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          output_id:        selectedOutput,
          progress_variant: progressVariant,
          stakeholder_name: activeStakeholder.name,
          output_title:     activeOutput.title,
          generated_text:   generatedText,
          pages:            pagesConsulted,
          project_scope:    selectedOutput === "linkedin" ? null : (projectScope || null),
          audit_action:     audit?.action ?? "publish",
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as any)?.detail ?? `Save error ${response.status}`);
      }
      setSaved(true);
    } catch (err: any) {
      setGenerationError(err?.message ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleShareSend = () => {
    if (!shareDraft.to.trim()) return;
    setShareSent(true);
    setTimeout(() => {
      setShowShareModal(false); setShareSent(false);
      setShareDraft({ to: "", message: "" });
    }, 1400);
  };

  const addChip = (which: "include" | "exclude") => {
    const key = which === "include" ? "includeInput" : "excludeInput";
    const val = outputDraft[key].trim();
    if (!val) return;
    setOutputDraft({ ...outputDraft, [which]: [...outputDraft[which], val], [key]: "" });
  };
  const removeChip = (which: "include" | "exclude", idx: number) =>
    setOutputDraft({ ...outputDraft, [which]: outputDraft[which].filter((_, i) => i !== idx) });

  const deleteCustomOutput = (id: string) => {
    setCustomOutputs((prev) => prev.filter((o) => o.id !== id));
    if (selectedOutput === id) setSelectedOutput("summary");
  };
  const deleteCustomStakeholder = (id: string) => {
    setCustomList((prev) => prev.filter((s) => s.id !== id));
    if (selectedStakeholder === id) {
      const allowed = stakeholdersFor(selectedOutput, progressVariant);
      setSelectedStakeholder(allowed[0]);
    }
  };

  return (
    <div className="min-h-screen bg-soft">
      {/* Top bar */}
      <header className="bg-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
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
            <span onClick={() => onNavigate?.("wiki")}       className="hover:text-primary-foreground cursor-pointer">Wiki</span>
            <span onClick={() => onNavigate?.("operations")} className="hover:text-primary-foreground cursor-pointer">Operations</span>
            <span className="text-primary-foreground font-medium border-b-2 border-accent pb-1 cursor-default">Generator</span>
            <span onClick={() => onNavigate?.("gaps")}       className="hover:text-primary-foreground cursor-pointer">Gaps</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs bg-primary-foreground/10 px-3 py-1.5 rounded-full ring-1 ring-primary-foreground/20">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Wiki synced · 4 min ago
            </div>
            <div className="h-9 w-9 rounded-full bg-accent-gradient flex items-center justify-center text-sm font-semibold">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-hero text-primary-foreground pb-20 pt-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-primary-glow/60 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent font-medium mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Generator module
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl text-balance leading-[1.1]">
            Turn your living wiki into the right story, for the right audience.
          </h1>
          <p className="mt-4 text-primary-foreground/75 max-w-2xl text-base leading-relaxed">
            Pick an output, choose who it's for, and the generator pulls fresh context from across
            your projects — calibrated to tone, length, and audience.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <main className="max-w-7xl mx-auto px-8 -mt-12 pb-20 relative">
        <div className="grid grid-cols-12 gap-6">

          {/* Left column — controls */}
          <div className="col-span-12 lg:col-span-5 space-y-6">

            {/* Step 01 — Output type */}
            <Panel step="01" title="Output type" hint="What should we generate?"
              action={
                <button onClick={() => setShowOutputModal(true)}
                  className="text-xs font-medium text-primary hover:text-primary-glow flex items-center gap-1 transition-colors">
                  <Plus className="h-3.5 w-3.5" /> Custom
                </button>
              }>
              <div className="grid grid-cols-1 gap-2.5">
                {allOutputs.map((o) => {
                  const active = o.id === selectedOutput;
                  const Icon   = o.icon;
                  return (
                    <button key={o.id} onClick={() => setSelectedOutput(o.id)}
                      className={`group text-left rounded-xl border p-4 flex items-start gap-3 transition-all duration-300 ${
                        active ? "border-primary bg-primary/[0.04] ring-glow"
                               : "border-border bg-card hover:border-primary/40 hover:bg-secondary/60"}`}>
                      <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center transition-colors ${
                        active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-sm text-foreground flex items-center gap-2">
                            {o.title}
                            {o.custom && (
                              <span className="text-[9px] uppercase tracking-wider bg-accent-soft text-accent px-1.5 py-0.5 rounded font-semibold">Custom</span>
                            )}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />{o.cadence}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{o.desc}</p>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        {active && (
                          <div className="h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </div>
                        )}
                        {o.custom && (
                          <span role="button" tabIndex={0}
                            onClick={(e) => { e.stopPropagation(); deleteCustomOutput(o.id); }}
                            className="h-6 w-6 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors cursor-pointer">
                            <Trash2 className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedOutput === "progress" && (
                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.03] p-3">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary font-semibold mb-2.5">
                    <TrendingUp className="h-3 w-3" /> Progress report angle
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {PROGRESS_VARIANTS.map((v) => {
                      const active = v.id === progressVariant;
                      const VIcon  = v.icon;
                      return (
                        <button key={v.id} onClick={() => setProgressVariant(v.id)}
                          className={`text-left rounded-lg border p-2.5 transition-all ${
                            active ? "border-primary bg-card ring-glow" : "border-border bg-card/60 hover:border-primary/40"}`}>
                          <div className={`h-6 w-6 rounded-md flex items-center justify-center mb-1.5 ${
                            active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                            <VIcon className="h-3.5 w-3.5" />
                          </div>
                          <div className="text-xs font-medium text-foreground">{v.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{v.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </Panel>

            {/* Step 02 — Stakeholder */}
            {(() => {
              const isCustomOut  = selectedOutput.startsWith("custom-out-");
              const fixed        = !isCustomOut && isStakeholderFixed(selectedOutput, progressVariant);
              const allowedIds   = isCustomOut ? stakeholders.map((s) => s.id) : stakeholdersFor(selectedOutput, progressVariant);
              const showCustomList = isCustomOut || selectedOutput === "summary";
              const visiblePredefined = stakeholders.filter((s) => allowedIds.includes(s.id));
              const visibleCustom     = showCustomList ? customList : [];
              const visibleList: Stakeholder[] = [...visiblePredefined, ...visibleCustom];
              const fixedStakeholder = fixed ? visiblePredefined[0] : null;

              return (
                <Panel step="02" title="Stakeholder profile"
                  hint={fixed ? "Audience is fixed for this output." : "Who is reading?"}
                  action={!fixed && showCustomList ? (
                    <button onClick={() => setShowModal(true)}
                      className="text-xs font-medium text-primary hover:text-primary-glow flex items-center gap-1 transition-colors">
                      <Plus className="h-3.5 w-3.5" /> Custom
                    </button>
                  ) : null}>
                  {fixed && fixedStakeholder ? (
                    <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4 flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                        <fixedStakeholder.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{fixedStakeholder.name}</span>
                          <span className="text-[9px] uppercase tracking-wider bg-secondary text-muted-foreground px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                            <Lock className="h-2.5 w-2.5" /> Fixed
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{fixedStakeholder.role}</p>
                        <p className="text-[11px] text-primary-glow mt-1 font-medium">{fixedStakeholder.tone}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5">
                      {visibleList.map((s) => {
                        const active = s.id === selectedStakeholder;
                        const Icon   = s.icon;
                        return (
                          <button key={s.id} onClick={() => setSelectedStakeholder(s.id)}
                            className={`relative text-left rounded-xl border p-3 transition-all duration-300 ${
                              active ? "border-primary bg-primary/[0.04] ring-glow" : "border-border bg-card hover:border-primary/40"}`}>
                            {s.custom && (
                              <div className="absolute top-2 right-2 flex items-center gap-1">
                                <span className="text-[9px] uppercase tracking-wider bg-accent-soft text-accent px-1.5 py-0.5 rounded font-semibold">Custom</span>
                                <span role="button" tabIndex={0}
                                  onClick={(e) => { e.stopPropagation(); deleteCustomStakeholder(s.id); }}
                                  className="h-5 w-5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors cursor-pointer">
                                  <Trash2 className="h-3 w-3" />
                                </span>
                              </div>
                            )}
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-2 ${
                              active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="text-sm font-medium text-foreground">{s.name}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{s.role}</div>
                            <div className="text-[10px] text-primary-glow mt-1.5 font-medium">{s.tone}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Panel>
              );
            })()}

            {/* Step 03 — Tone & length */}
            <Panel step="03" title="Tone & length" hint="Fine-tune the voice."
              action={!usingPreset ? (
                <button onClick={resetToPreset}
                  className="text-xs font-medium text-primary hover:text-primary-glow flex items-center gap-1 transition-colors">
                  <RotateCcw className="h-3 w-3" /> Reset to default
                </button>
              ) : null}>
              <div className="mb-3 flex items-start gap-2 rounded-lg bg-accent-soft border border-accent/20 px-3 py-2">
                <Info className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                <p className="text-[11px] text-foreground/80 leading-relaxed">
                  {usingPreset ? (
                    <>Default for <span className="font-medium text-foreground">{activeOutput.title}</span> — <span className="font-medium text-foreground">{activeStakeholder.name}</span>. Adjust freely.</>
                  ) : (
                    <>Custom settings — different from the default for this combination.</>
                  )}
                </p>
              </div>
              <Slider label="Tone"   left="Formal"  right="Conversational" value={tone}   onChange={onToneChange}   />
              <div className="h-3" />
              <Slider label="Length" left="Brief"   right="In-depth"       value={length} onChange={onLengthChange} />
            </Panel>

            {/* Step 04 — Content details */}
            <Panel step="04" title="Content details" hint="Fine-tune what goes in or stays out.">
              <div className="mb-3 flex items-start gap-2 rounded-lg bg-accent-soft border border-accent/20 px-3 py-2">
                <Info className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                <p className="text-[11px] text-foreground/80 leading-relaxed">
                  These tweaks apply only to this generation and do not change the saved output type or stakeholder profile.
                </p>
              </div>
              <ChipField label="Must include" hint="Topics, names, or sections to emphasise" tone="include"
                items={genInclude} input={genIncludeInput} setInput={setGenIncludeInput}
                onAdd={() => addGenChip("include")} onRemove={(i) => removeGenChip("include", i)} />
              <div className="h-4" />
              <ChipField label="Must exclude" hint="Topics or details to leave out" tone="exclude"
                items={genExclude} input={genExcludeInput} setInput={setGenExcludeInput}
                onAdd={() => addGenChip("exclude")} onRemove={(i) => removeGenChip("exclude", i)} />

              {selectedOutput !== "linkedin" && allProjects.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-foreground mb-1">Project-specific content</div>
                  <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">
                    Optionally include content that only a specific project's members can see.
                  </p>
                  <select
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-secondary/50 focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">No — team-wide content only</option>
                    {allProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}{myProjectIds.includes(p.id) ? "" : " (you're not a member)"}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </Panel>

            {/* Generate button */}
            <button onClick={handleGenerate} disabled={generating}
              className="w-full rounded-2xl bg-hero text-primary-foreground font-semibold py-4 px-5 shadow-elegant hover:opacity-95 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70">
              {generating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
              ) : generated ? (
                <><RotateCcw className="h-4 w-4" /> Regenerate</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Generate</>
              )}
            </button>
          </div>

          {/* Right column — preview */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-card rounded-2xl border border-border shadow-elegant overflow-hidden sticky top-6">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/40">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">generator / preview.draft</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                  {generating ? "Generating…" : blocked ? "Held back" : generated ? "Draft ready" : generationError ? "Error" : "Idle"}
                  {audit && !generating && (
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      audit.action === "publish"
                        ? "bg-accent/8 text-accent border-accent/20"
                        : audit.action === "review"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/25"
                        : "bg-destructive/8 text-destructive border-destructive/20"
                    }`}>
                      {audit.action === "publish" ? <ShieldCheck className="h-3 w-3" />
                        : audit.action === "review" ? <ShieldAlert className="h-3 w-3" />
                        : <ShieldX className="h-3 w-3" />}
                      {audit.action === "publish" ? "Safe to share"
                        : audit.action === "review" ? "Needs a second look"
                        : "Held back"}
                    </span>
                  )}
                </div>
              </div>

              {!generated && !generating && !generationError && !blocked ? (
                <div className="px-7 py-20 text-center">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-5">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">No draft yet</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Configure the output, audience and tone — then hit{" "}
                    <span className="font-medium text-foreground">Generate</span> to produce a draft from your wiki.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium border border-primary/15">{activeOutput.title}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span className="px-2.5 py-1 rounded-full bg-accent-soft text-accent font-medium border border-accent/20">{activeStakeholder.name}</span>
                  </div>
                </div>
              ) : generating ? (
                <div className="px-7 py-20 text-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-4">Drawing from your wiki and shaping the draft…</p>
                </div>
              ) : blocked ? (
                <div className="px-7 py-16 text-center">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-5">
                    <ShieldX className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">This draft couldn't be shared</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto leading-relaxed">
                    It kept including information that this audience isn't allowed to see,
                    even after rewriting. A team member should review it before anything is published.
                  </p>
                  <button onClick={handleGenerate}
                    className="mt-6 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    Try again
                  </button>
                </div>
              ) : generationError ? (
                <div className="px-7 py-20 text-center">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-5">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">Generation failed</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto leading-relaxed">{generationError}</p>
                  <button onClick={handleGenerate}
                    className="mt-5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    Try again
                  </button>
                </div>
              ) : (
                <div className="p-7">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium border border-primary/15">{activeOutput.title}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span className="px-2.5 py-1 rounded-full bg-accent-soft text-accent font-medium border border-accent/20">{activeStakeholder.name}</span>
                  </div>
                  {audit?.action === "review" && (
                    <div className="mb-4 flex items-start gap-2 text-xs bg-amber-500/8 border border-amber-500/25 rounded-lg px-3.5 py-2.5 text-foreground/80 leading-relaxed">
                      <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <span className="font-semibold text-amber-600">Needs a second look.</span>{" "}
                        Some details in this draft couldn't be traced back to the wiki, so it can't
                        be saved until a person has checked it.
                      </span>
                    </div>
                  )}
                  <div className="mt-2 space-y-3 text-[14px] leading-relaxed text-foreground/85 whitespace-pre-wrap font-sans">
                    {generatedText}
                  </div>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5 font-semibold">Sources from your wiki</div>
                    <div className="flex flex-wrap gap-1.5">
                      {["wiki/_overview", "wiki/decisions/", "wiki/deliverables/", "wiki/meetings/", "wiki/concepts/"].map((src) => (
                        <span key={src} className="text-[11px] font-mono px-2 py-1 rounded-md bg-secondary text-primary-deep border border-border">{src}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-secondary/30 flex-wrap">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <Settings2 className="h-3.5 w-3.5" />
                  Tone {tone}% · Length {length}%
                  {usingPreset && (
                    <span className="text-[10px] uppercase tracking-wider bg-accent-soft text-accent px-1.5 py-0.5 rounded font-semibold">Default</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleGenerate} disabled={!generated || generating}
                    className="text-sm px-3 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-foreground flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                    <RotateCcw className="h-3.5 w-3.5" /> Regenerate
                  </button>
                  <button onClick={handleDownload} disabled={!generated}
                    className="text-sm px-3 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-foreground flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Download className="h-3.5 w-3.5" /> Download .md
                  </button>
                  <button onClick={handleCopyMarkdown} disabled={!generated}
                    className="text-sm px-3 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-foreground flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? <><Check className="h-3.5 w-3.5 text-accent" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy markdown</>}
                  </button>
                  <button onClick={handleSave}
                    disabled={!generated || saving || saved || audit?.action !== "publish"}
                    title={audit?.action === "review" ? "Waiting for a person to review this draft" : undefined}
                    className="text-sm px-3 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-foreground flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                    {saving ? (
                      <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
                    ) : saved ? (
                      <><Check className="h-3.5 w-3.5 text-accent" /> Saved to wiki</>
                    ) : (
                      <><BookOpen className="h-3.5 w-3.5" /> Save to wiki</>
                    )}
                  </button>
                  <button onClick={() => setShowShareModal(true)} disabled={!generated}
                    className="text-sm px-4 py-2 rounded-lg bg-hero text-primary-foreground font-medium hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed">
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-deep/60 backdrop-blur-sm"
          onClick={() => !shareSent && setShowShareModal(false)}>
          <div className="bg-card rounded-2xl border border-border shadow-elegant max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-hero text-primary-foreground px-6 py-5 flex items-start justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-1">Share draft</div>
                <h3 className="text-lg font-semibold">Send to colleagues</h3>
                <p className="text-xs text-primary-foreground/70 mt-1">Email this {activeOutput.title.toLowerCase()} to anyone in or outside the company.</p>
              </div>
              <button onClick={() => setShowShareModal(false)}
                className="h-8 w-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            {shareSent ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-3">
                  <Check className="h-6 w-6" strokeWidth={3} />
                </div>
                <h4 className="text-base font-semibold text-foreground">Sent!</h4>
                <p className="text-xs text-muted-foreground mt-1">Your draft is on its way to {shareDraft.to}.</p>
              </div>
            ) : (
              <>
                <div className="p-6 space-y-4">
                  <Field label="Recipients" placeholder="alex@company.com" value={shareDraft.to} onChange={(v) => setShareDraft({ ...shareDraft, to: v })} />
                  <label className="block">
                    <span className="text-xs font-medium text-foreground">Message (optional)</span>
                    <textarea value={shareDraft.message} onChange={(e) => setShareDraft({ ...shareDraft, message: e.target.value })}
                      placeholder="Add a short note…" rows={3}
                      className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-glow transition-all resize-none" />
                  </label>
                </div>
                <div className="px-6 py-4 border-t border-border bg-secondary/40 flex items-center justify-end gap-2">
                  <button onClick={() => setShowShareModal(false)}
                    className="text-sm px-4 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors">Cancel</button>
                  <button onClick={handleShareSend} disabled={!shareDraft.to.trim()}
                    className="text-sm px-4 py-2 rounded-lg bg-accent-gradient text-accent-foreground font-medium hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed">
                    <Mail className="h-3.5 w-3.5" /> Send draft
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Custom stakeholder modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-deep/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl border border-border shadow-elegant max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-hero text-primary-foreground px-6 py-5 flex items-start justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-1">New stakeholder</div>
                <h3 className="text-lg font-semibold">Define a custom audience</h3>
              </div>
              <button onClick={() => setShowModal(false)}
                className="h-8 w-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Field label="Name" placeholder="e.g. Investor update list" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
              <Field label="Role / context" placeholder="e.g. Series B investors" value={draft.role} onChange={(v) => setDraft({ ...draft, role: v })} />
              <Field label="Tone descriptors" placeholder="e.g. Confident, metric-driven" value={draft.tone} onChange={(v) => setDraft({ ...draft, tone: v })} />
            </div>
            <div className="px-6 py-4 border-t border-border bg-secondary/40 flex items-center justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="text-sm px-4 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors">Cancel</button>
              <button onClick={handleAddCustom}
                className="text-sm px-4 py-2 rounded-lg bg-accent-gradient text-accent-foreground font-medium hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-soft">
                Save stakeholder <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom output modal */}
      {showOutputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-deep/60 backdrop-blur-sm"
          onClick={() => setShowOutputModal(false)}>
          <div className="bg-card rounded-2xl border border-border shadow-elegant max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-hero text-primary-foreground px-6 py-5 flex items-start justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-1">New output type</div>
                <h3 className="text-lg font-semibold">Design your own output</h3>
              </div>
              <button onClick={() => setShowOutputModal(false)}
                className="h-8 w-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <Field label="Title" placeholder="e.g. Monthly investor brief" value={outputDraft.title} onChange={(v) => setOutputDraft({ ...outputDraft, title: v })} />
              <label className="block">
                <span className="text-xs font-medium text-foreground">Description</span>
                <textarea value={outputDraft.desc} onChange={(e) => setOutputDraft({ ...outputDraft, desc: e.target.value })}
                  placeholder="Describe what this output should generate…" rows={3}
                  className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-glow transition-all resize-none" />
              </label>
              <ChipField label="Include" hint="Topics the generator must cover." tone="include"
                items={outputDraft.include} input={outputDraft.includeInput}
                setInput={(v) => setOutputDraft({ ...outputDraft, includeInput: v })}
                onAdd={() => addChip("include")} onRemove={(i) => removeChip("include", i)} />
              <ChipField label="Exclude" hint="Anything the generator should leave out." tone="exclude"
                items={outputDraft.exclude} input={outputDraft.excludeInput}
                setInput={(v) => setOutputDraft({ ...outputDraft, excludeInput: v })}
                onAdd={() => addChip("exclude")} onRemove={(i) => removeChip("exclude", i)} />
            </div>
            <div className="px-6 py-4 border-t border-border bg-secondary/40 flex items-center justify-end gap-2">
              <button onClick={() => setShowOutputModal(false)} className="text-sm px-4 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors">Cancel</button>
              <button onClick={handleAddCustomOutput}
                className="text-sm px-4 py-2 rounded-lg bg-accent-gradient text-accent-foreground font-medium hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-soft">
                Save output type <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
const Panel = ({ step, title, hint, action, children }: {
  step: string; title: string; hint: string; action?: React.ReactNode; children: React.ReactNode;
}) => (
  <section className="bg-card rounded-2xl border border-border shadow-soft p-5">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <span className="text-[10px] font-mono font-semibold text-accent bg-accent-soft px-2 py-1 rounded">{step}</span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
        </div>
      </div>
      {action}
    </div>
    {children}
  </section>
);

const Slider = ({ label, left, right, value, onChange }: {
  label: string; left: string; right: string; value: number; onChange: (n: number) => void;
}) => (
  <div>
    <div className="flex items-center justify-between text-xs mb-2">
      <span className="font-medium text-foreground">{label}</span>
      <span className="text-muted-foreground">{left} · <span className="text-primary font-medium">{right}</span></span>
    </div>
    <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-primary cursor-pointer"
      style={{ background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) ${value}%, hsl(var(--secondary)) ${value}%, hsl(var(--secondary)) 100%)` }} />
  </div>
);

const Field = ({ label, placeholder, value, onChange }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) => (
  <label className="block">
    <span className="text-xs font-medium text-foreground">{label}</span>
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-glow transition-all" />
  </label>
);

const ChipField = ({ label, hint, tone, items, input, setInput, onAdd, onRemove }: {
  label: string; hint: string; tone: "include" | "exclude";
  items: string[]; input: string; setInput: (v: string) => void;
  onAdd: () => void; onRemove: (i: number) => void;
}) => {
  const isInclude = tone === "include";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
          {isInclude ? <PlusIcon className="h-3 w-3 text-primary" /> : <Minus className="h-3 w-3 text-destructive" />}
          {label}
        </span>
        <span className="text-[11px] text-muted-foreground">{hint}</span>
      </div>
      <div className="mt-1.5 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } }}
          placeholder={isInclude ? "Add a topic and press Enter" : "Add something to skip"}
          className="flex-1 rounded-lg border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-glow transition-all" />
        <button type="button" onClick={onAdd}
          className="text-xs font-medium px-3 rounded-lg border border-border bg-secondary hover:bg-secondary/70 text-foreground transition-colors">Add</button>
      </div>
      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.map((it, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded-full flex items-center gap-1.5 border ${
              isInclude ? "bg-primary/10 text-primary border-primary/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
              {it}
              <button onClick={() => onRemove(i)} className="opacity-60 hover:opacity-100" aria-label={`Remove ${it}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
