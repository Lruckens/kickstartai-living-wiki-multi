import { useState, useEffect, useMemo, useCallback } from "react";
import {
  BookOpen, Lightbulb, GitBranch, Package, Users2, CalendarDays,
  Sparkles, ChevronRight, ChevronDown, Search, Loader2, AlertCircle,
  FileText, ScrollText, ListChecks,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { authFetch, getSession } from "./api";

type WikiPage = {
  path: string; title: string; category: string; slug: string;
  access: string; label: "public" | "internal" | "restricted";
  project_id: string | null;
};

const ACCESS_STYLES: Record<string, string> = {
  public:     "bg-accent/10 text-accent border-accent/25",
  internal:   "bg-secondary text-muted-foreground border-border",
  restricted: "bg-destructive/8 text-destructive border-destructive/20",
};

const AccessBadge = ({ label, text, compact }: { label: string; text: string; compact?: boolean }) => (
  <span className={`inline-flex items-center rounded-full border font-medium ${
    ACCESS_STYLES[label] ?? ACCESS_STYLES.internal
  } ${compact ? "text-[9px] px-1.5 py-px" : "text-[11px] px-2 py-0.5"}`}>
    {compact ? text.split(" — ")[0] : text}
  </span>
);

const CATEGORIES: Record<string, { label: string; Icon: React.ElementType; order: number }> = {
  root:         { label: "Overview",          Icon: BookOpen,     order: 0 },
  concepts:     { label: "Concepts",          Icon: Lightbulb,    order: 1 },
  decisions:    { label: "Decisions",         Icon: GitBranch,    order: 2 },
  deliverables: { label: "Deliverables",      Icon: Package,      order: 3 },
  entities:     { label: "Entities",          Icon: Users2,       order: 4 },
  meetings:     { label: "Meetings",          Icon: CalendarDays, order: 5 },
  generator:    { label: "Generated outputs", Icon: Sparkles,     order: 6 },
  queries:      { label: "Saved queries",     Icon: Search,       order: 7 },
};

const ROOT_ICONS: Record<string, React.ElementType> = {
  "_overview.md": BookOpen,
  "_gaps.md":     ListChecks,
  "_reuse.md":    ScrollText,
  "index.md":     FileText,
  "log.md":       ScrollText,
};

export const WikiViewer = ({ onNavigate, initialPath }: { onNavigate: (view: string, wikiPath?: string) => void; initialPath?: string }) => {
  const [pages, setPages]               = useState<WikiPage[]>([]);
  const [selectedPath, setSelectedPath] = useState(initialPath || "_overview.md");
  const [content, setContent]           = useState("");
  const [loadingPages, setLoadingPages] = useState(true);
  const [loadingPage, setLoadingPage]   = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [search, setSearch]             = useState("");
  const [expanded, setExpanded]         = useState<Set<string>>(
    new Set(Object.keys(CATEGORIES))
  );
  // Per-project tabs — only the projects this user belongs to (e.g. Carla Visser = UvA + Bakkie).
  const myProjects = getSession()?.projects ?? [];
  const [activeProject, setActiveProject] = useState<string>("all");

  // Load page list (already filtered to this user's permissions by the backend)
  useEffect(() => {
    authFetch("/wiki/pages")
      .then((r) => r.json())
      .then((data) => { setPages(data); setLoadingPages(false); })
      .catch((e) => { setError(e.message); setLoadingPages(false); });
  }, []);

  // Load page content
  useEffect(() => {
    setLoadingPage(true);
    setError(null);
    authFetch(`/wiki/page?path=${encodeURIComponent(selectedPath)}`)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((d) => { setContent(d.content); setLoadingPage(false); })
      .catch((e) => { setError(e.message); setLoadingPage(false); });
  }, [selectedPath]);

  const slugMap = useMemo(() => {
    const m: Record<string, string> = {};
    pages.forEach((p) => { m[p.slug] = p.path; });
    return m;
  }, [pages]);

  const navigateToSlug = useCallback(
    (slug: string) => { if (slugMap[slug]) setSelectedPath(slugMap[slug]); },
    [slugMap]
  );

  // Replace [[slug]] with markdown links before rendering
  const processedContent = useMemo(
    () => content.replace(/\[\[([^\]]+)\]\]/g, (_, s) => `[${s}](wiki://${s})`),
    [content]
  );

  const grouped = useMemo(() => {
    const q = search.toLowerCase();
    let filtered = pages;
    // Project tab: a project's view = its own pages plus shared org pages (public/internal, untagged).
    if (activeProject !== "all") {
      filtered = filtered.filter((p) => p.project_id === activeProject || p.project_id == null);
    }
    if (q) filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
    const out: Record<string, WikiPage[]> = {};
    filtered.forEach((p) => { (out[p.category] ??= []).push(p); });
    return out;
  }, [pages, search, activeProject]);

  const activeTitle = pages.find((p) => p.path === selectedPath)?.title ?? "";

  const toggleCategory = (cat: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      prev.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });

  return (
    <div className="min-h-screen bg-soft flex flex-col">
      {/* Header */}
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
            <span className="text-primary-foreground font-medium border-b-2 border-accent pb-1 cursor-default">Wiki</span>
            <span onClick={() => onNavigate("operations")} className="hover:text-primary-foreground cursor-pointer">Operations</span>
            <span onClick={() => onNavigate("generator")}  className="hover:text-primary-foreground cursor-pointer">Generator</span>
            <span onClick={() => onNavigate("gaps")}        className="hover:text-primary-foreground cursor-pointer">Gaps</span>
          </nav>
          <div className="h-9 w-9 rounded-full bg-accent-gradient flex items-center justify-center text-sm font-semibold text-accent-foreground">
            LR
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 68px)" }}>

        {/* Sidebar */}
        <aside className="w-72 shrink-0 bg-card border-r border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border space-y-3">
            {myProjects.length > 0 && (
              <div className="flex items-center gap-1 overflow-x-auto" role="tablist" aria-label="Project">
                {[{ id: "all", name: "All" }, ...myProjects].map((proj) => (
                  <button
                    key={proj.id}
                    role="tab"
                    aria-selected={activeProject === proj.id}
                    onClick={() => setActiveProject(proj.id)}
                    className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeProject === proj.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {proj.name}
                  </button>
                ))}
              </div>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages…"
                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-input bg-secondary/60 placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {loadingPages ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              </div>
            ) : (
              Object.entries(CATEGORIES)
                .sort((a, b) => a[1].order - b[1].order)
                .filter(([cat]) => (grouped[cat]?.length ?? 0) > 0)
                .map(([cat, meta]) => {
                  const catPages = grouped[cat] ?? [];
                  const isOpen   = expanded.has(cat);
                  const Icon     = meta.Icon;
                  return (
                    <div key={cat}>
                      <button
                        onClick={() => toggleCategory(cat)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-secondary text-sm font-semibold text-foreground transition-colors"
                      >
                        <Icon className="h-4 w-4 text-primary shrink-0" />
                        <span className="flex-1 text-left">{meta.label}</span>
                        <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
                          {catPages.length}
                        </span>
                        {isOpen
                          ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                          : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                      </button>

                      {isOpen && (
                        <div className="ml-4 mt-0.5 mb-1 border-l-2 border-primary/15 pl-3 space-y-0.5">
                          {catPages.map((page) => {
                            const active = selectedPath === page.path;
                            const LeafIcon = ROOT_ICONS[page.path];
                            return (
                              <button
                                key={page.path}
                                onClick={() => setSelectedPath(page.path)}
                                className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors ${
                                  active
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                }`}
                              >
                                {LeafIcon && <LeafIcon className="h-3 w-3 shrink-0 opacity-60" />}
                                <span className="truncate flex-1">{page.title}</span>
                                <AccessBadge label={page.label} text={page.access} compact />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
            )}
          </nav>
        </aside>

        {/* Content panel */}
        <main className="flex-1 overflow-y-auto bg-soft">
          <div className="max-w-3xl mx-auto px-10 py-10">
            {loadingPage ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center py-24 text-center gap-3">
                <AlertCircle className="h-10 w-10 text-destructive" />
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            ) : (
              <>
                <div className="text-xs font-medium text-muted-foreground mb-6 flex items-center gap-1.5">
                  <span className="text-primary/70">wiki</span>
                  <ChevronRight className="h-3 w-3" />
                  <span>{activeTitle}</span>
                  {(() => {
                    const p = pages.find((pg) => pg.path === selectedPath);
                    return p ? <span className="ml-2"><AccessBadge label={p.label} text={p.access} /></span> : null;
                  })()}
                </div>
                <div className="wiki-prose">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a({ href, children }) {
                        if (href?.startsWith("wiki://")) {
                          const slug = href.slice(7);
                          return (
                            <span
                              onClick={() => navigateToSlug(slug)}
                              className="text-primary underline underline-offset-2 cursor-pointer hover:text-primary-glow transition-colors"
                            >
                              {children}
                            </span>
                          );
                        }
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer"
                            className="text-primary underline underline-offset-2 hover:text-primary-glow transition-colors">
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {processedContent}
                  </ReactMarkdown>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
