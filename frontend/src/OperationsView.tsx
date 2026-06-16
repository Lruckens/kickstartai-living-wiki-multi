import { useState, useRef, useCallback, useEffect, DragEvent } from "react";
import {
  BookOpen, Upload, Search, Wrench, Sparkles, Send,
  Loader2, AlertCircle, CheckCircle2, ChevronRight,
  FileText, FilePlus, RefreshCcw, Copy, Check, CloudUpload, X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { authFetch, withProject } from "./api";

type Tab = "ingest" | "query" | "lint" | "audit";

type AuditEntry = {
  timestamp: string;
  page: string;
  level: string;
  action: string;
  retries: number;
  flags: { severity: string; text: string; reason: string }[];
};

// ---------------------------------------------------------------------------
// SSE streaming helper
// ---------------------------------------------------------------------------
async function* readSSE(response: Response) {
  const reader  = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer    = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop()!;
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try { yield JSON.parse(line.slice(6)); } catch { /* skip */ }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const TabButton = ({
  id, active, icon: Icon, label, onClick,
}: { id: Tab; active: boolean; icon: React.ElementType; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2.5 px-5 py-3 text-sm font-medium rounded-xl transition-all ${
      active
        ? "bg-primary text-primary-foreground shadow-soft"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
  </button>
);

const StreamOutput = ({
  text, applying, applyChars, applied, pushing, pushed, pushError, error, empty,
  onNavigate,
}: {
  text: string;
  applying: boolean;
  applyChars: number;
  applied: { created: string[]; updated: string[] } | null;
  pushing: boolean;
  pushed: boolean;
  pushError: string | null;
  error: string | null;
  empty: React.ReactNode;
  onNavigate?: (view: string) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!text && !applying && !applied && !pushing && !pushed && !pushError && !error) return <>{empty}</>;

  return (
    <div className="space-y-4">
      {text && (
        <div className="relative">
          <div className="wiki-prose bg-card rounded-2xl border border-border p-6 shadow-soft">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary/80 px-2.5 py-1.5 rounded-lg border border-border transition-colors"
          >
            {copied ? <><Check className="h-3 w-3 text-accent" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
          </button>
        </div>
      )}

      {applying && (
        <div className="flex items-center gap-3 text-sm text-muted-foreground bg-card rounded-xl border border-border px-5 py-4">
          <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
          <span>
            Applying wiki file changes…
            {applyChars > 0 && (
              <span className="ml-2 text-xs font-mono text-muted-foreground/70">
                {applyChars.toLocaleString()} chars
              </span>
            )}
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 text-sm text-destructive bg-destructive/8 rounded-xl border border-destructive/20 px-5 py-4">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {applied && (
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            Wiki updated
          </div>
          {applied.created.length > 0 && (
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FilePlus className="h-3.5 w-3.5" /> Created ({applied.created.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {applied.created.map((p) => (
                  <span key={p} className="text-[11px] font-mono px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {applied.updated.length > 0 && (
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <RefreshCcw className="h-3.5 w-3.5" /> Updated ({applied.updated.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {applied.updated.map((p) => (
                  <span key={p} className="text-[11px] font-mono px-2 py-1 rounded-md bg-secondary text-muted-foreground border border-border">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {onNavigate && (
            <button
              onClick={() => onNavigate("wiki")}
              className="text-xs font-medium text-primary hover:text-primary-glow flex items-center gap-1 transition-colors mt-1"
            >
              Open in Wiki viewer <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      {pushing && (
        <div className="flex items-center gap-3 text-sm text-muted-foreground bg-card rounded-xl border border-border px-5 py-4">
          <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
          Pushing wiki changes to main…
        </div>
      )}

      {pushed && (
        <div className="flex items-center gap-3 text-sm text-accent bg-accent/8 rounded-xl border border-accent/20 px-5 py-4">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Pushed to main
        </div>
      )}

      {pushError && (
        <div className="flex items-start gap-3 text-sm text-destructive bg-destructive/8 rounded-xl border border-destructive/20 px-5 py-4">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          Push failed: {pushError}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Ingest tab
// ---------------------------------------------------------------------------
const ACCEPTED = ".pdf,.md,.txt,.docx,.pptx";

const IngestTab = ({ onNavigate, project }: { onNavigate: (view: string) => void; project: string }) => {
  const fileRef  = useRef<HTMLInputElement>(null);
  const [dragOver,  setDragOver]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filename,  setFilename]  = useState<string | null>(null);
  const [visibility,  setVisibility]  = useState<"public" | "internal" | "restricted">("internal");
  const [running,     setRunning]     = useState(false);
  const [text,        setText]        = useState("");
  const [applying,    setApplying]    = useState(false);
  const [applyChars,  setApplyChars]  = useState(0);
  const [applied,     setApplied]     = useState<{ created: string[]; updated: string[] } | null>(null);
  const [pushing,     setPushing]     = useState(false);
  const [pushed,      setPushed]      = useState(false);
  const [pushError,   setPushError]   = useState<string | null>(null);
  const [error,       setError]       = useState<string | null>(null);

  const reset = () => {
    setFilename(null);
    setText("");
    setApplying(false);
    setApplyChars(0);
    setApplied(null);
    setPushing(false);
    setPushed(false);
    setPushError(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const uploadAndIngest = useCallback(async (file: File) => {
    setUploading(true);
    setError(null);
    setText("");
    setApplying(false);
    setApplied(null);

    // 1. Upload (with the chosen visibility)
    let uploadedName: string;
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("project", project);
      form.append("label", visibility);
      const up = await authFetch(`/sources/upload`, { method: "POST", body: form });
      if (!up.ok) {
        const e = await up.json().catch(() => ({}));
        throw new Error((e as any).detail ?? `Upload failed (${up.status})`);
      }
      const data = await up.json();
      uploadedName = data.filename;
      setFilename(uploadedName);
    } catch (e: any) {
      setError(e.message);
      setUploading(false);
      return;
    }
    setUploading(false);

    // 2. Ingest
    setRunning(true);
    try {
      const resp = await authFetch(`/ingest`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ filename: uploadedName, project }),
      });
      if (!resp.ok) {
        const e = await resp.json().catch(() => ({}));
        throw new Error((e as any).detail ?? `HTTP ${resp.status}`);
      }
      for await (const event of readSSE(resp)) {
        if (event.type === "text")           setText((p) => p + event.content);
        if (event.type === "protection_updated")
          setText((p) => p + `> 🛡 The protection list for this project was updated (${event.added} new item${event.added === 1 ? "" : "s"}).\n\n`);
        if (event.type === "applying")       { setApplying(true); setApplyChars(0); }
        if (event.type === "apply_progress") setApplyChars(event.chars);
        if (event.type === "applied")        { setApplying(false); setApplied({ created: event.created, updated: event.updated }); }
        if (event.type === "pushing")        setPushing(true);
        if (event.type === "pushed")         { setPushing(false); setPushed(true); }
        if (event.type === "push_error")     { setPushing(false); setPushError(event.message); }
        if (event.type === "error")          { setError(event.message); setApplying(false); setPushing(false); }
        if (event.type === "done")           break;
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setRunning(false);
    }
  }, [visibility, project]);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    uploadAndIngest(files[0]);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const busy = uploading || running;

  return (
    <div className="space-y-5">

      {/* Who can see this document? */}
      {!filename && !busy && (
        <div className="bg-card rounded-2xl border border-border px-5 py-4 shadow-soft">
          <div className="text-sm font-semibold text-foreground mb-1">Who can see this document?</div>
          <p className="text-xs text-muted-foreground mb-3">
            This also decides who can see the wiki pages created from it.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {([
              { id: "public",     label: "Everyone" },
              { id: "internal",   label: "KickstartAI team" },
              { id: "restricted", label: "A specific project" },
            ] as const).map((opt) => (
              <button key={opt.id} onClick={() => setVisibility(opt.id)}
                className={`text-sm px-3.5 py-2 rounded-lg border transition-colors ${
                  visibility === opt.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:bg-secondary"
                }`}>
                {opt.label}
              </button>
            ))}
          </div>
          {visibility === "restricted" && (
            <p className="text-xs text-muted-foreground mt-2">
              Restricted to the active project — only its members will see this document and the pages made from it.
            </p>
          )}
        </div>
      )}

      {/* Drop zone */}
      {!filename && !busy && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={`relative bg-card rounded-2xl border-2 border-dashed p-14 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/[0.04] scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-secondary/40"
          }`}
        >
          <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-colors ${
            dragOver ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
          }`}>
            <CloudUpload className="h-7 w-7" />
          </div>
          <div className="text-center">
            <div className="text-base font-semibold text-foreground">
              {dragOver ? "Drop to ingest" : "Drop a file or click to browse"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              PDF · MD · TXT · DOCX — saved to <span className="font-mono">/sources</span> then ingested automatically
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* Uploading state */}
      {uploading && (
        <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <div className="text-sm font-medium text-foreground">Uploading…</div>
        </div>
      )}

      {/* File selected + running */}
      {filename && (
        <div className="bg-card rounded-2xl border border-border px-5 py-4 flex items-center gap-3 shadow-soft">
          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">{filename}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {running ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {applying ? "Applying wiki changes…" : "Analysing with Claude…"}
                </span>
              ) : applied ? (
                <span className="text-accent font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3" /> Ingested successfully
                </span>
              ) : error ? (
                <span className="text-destructive">Failed</span>
              ) : "Ready"}
            </div>
          </div>
          {!running && (
            <button onClick={reset} className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center justify-center transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <StreamOutput
        text={text} applying={applying} applyChars={applyChars} applied={applied}
        pushing={pushing} pushed={pushed} pushError={pushError}
        error={error} empty={<></>} onNavigate={onNavigate}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Query tab
// ---------------------------------------------------------------------------
const QueryTab = ({ project }: { project: string }) => {
  const [question, setQuestion] = useState("");
  const [running,  setRunning]  = useState(false);
  const [text,     setText]     = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [saving,    setSaving]    = useState(false);
  const [savedPath, setSavedPath] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [asked,     setAsked]     = useState("");

  const saveToWiki = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const resp = await authFetch(withProject(`/query/save`, project), {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ question: asked, answer: text }),
      });
      if (!resp.ok) {
        const e = await resp.json().catch(() => ({}));
        throw new Error((e as any).detail ?? `HTTP ${resp.status}`);
      }
      const data = await resp.json();
      setSavedPath(data.path);
    } catch (e: any) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const run = useCallback(async () => {
    if (!question.trim()) return;
    setRunning(true);
    setText("");
    setError(null);
    setSavedPath(null);
    setSaveError(null);
    setAsked(question.trim());
    try {
      const resp = await authFetch(withProject(`/query`, project), {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ question }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      for await (const event of readSSE(resp)) {
        if (event.type === "text")  setText((p) => p + event.content);
        if (event.type === "error") setError(event.message);
        if (event.type === "done")  break;
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setRunning(false);
    }
  }, [question, project]);

  const emptyState = (
    <div className="text-center py-20">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-4">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground">Ask anything</h3>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto">
        Type a question and Claude will answer using the full wiki as context, with citations.
      </p>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
        <div className="flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); run(); } }}
            placeholder="e.g. What decisions were made about the permission layer?"
            className="flex-1 rounded-xl border border-input bg-secondary/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button
            onClick={run}
            disabled={!question.trim() || running}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-hero text-primary-foreground text-sm font-semibold hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-soft"
          >
            {running
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Asking…</>
              : <><Send className="h-4 w-4" /> Ask</>}
          </button>
        </div>
      </div>

      <StreamOutput text={text} applying={false} applyChars={0} applied={null} pushing={false} pushed={false} pushError={null} error={error} empty={emptyState} />

      {/* Offer to file the answer back into the wiki (CLAUDE.md query step 5) */}
      {text && !running && !error && (
        <div className="bg-card rounded-xl border border-border px-5 py-3.5 shadow-soft flex items-center gap-3 flex-wrap">
          {savedPath ? (
            <div className="flex items-center gap-2 text-sm text-accent">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Saved to <span className="font-mono text-xs">{savedPath}</span>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground flex-1 min-w-[200px]">
                Worth keeping? Save this answer as a wiki page so it doesn't get lost in chat history.
              </div>
              <button onClick={saveToWiki} disabled={saving}
                className="text-sm px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-foreground flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {saving
                  ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
                  : <><BookOpen className="h-3.5 w-3.5" /> Save to wiki</>}
              </button>
            </>
          )}
          {saveError && (
            <div className="flex items-center gap-2 text-sm text-destructive w-full">
              <AlertCircle className="h-4 w-4 shrink-0" /> {saveError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Lint tab
// ---------------------------------------------------------------------------
const LintTab = ({ project }: { project: string }) => {
  const [running, setRunning] = useState(false);
  const [text,    setText]    = useState("");
  const [error,   setError]   = useState<string | null>(null);
  const [ran,     setRan]     = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied,  setApplied]  = useState<{ created: string[]; updated: string[] } | null>(null);
  const [pushing,  setPushing]  = useState(false);
  const [pushed,   setPushed]   = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setRunning(true);
    setText("");
    setError(null);
    setRan(false);
    setApplying(false);
    setApplied(null);
    setPushing(false);
    setPushed(false);
    setPushError(null);
    try {
      const resp = await authFetch(withProject(`/lint`, project), { method: "POST" });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      for await (const event of readSSE(resp)) {
        if (event.type === "text")     setText((p) => p + event.content);
        if (event.type === "applying") setApplying(true);
        if (event.type === "applied")  { setApplying(false); setApplied({ created: event.created, updated: event.updated }); }
        if (event.type === "pushing")  setPushing(true);
        if (event.type === "pushed")   { setPushing(false); setPushed(true); }
        if (event.type === "push_error") { setPushing(false); setPushError(event.message); }
        if (event.type === "error")    { setError(event.message); setApplying(false); setPushing(false); }
        if (event.type === "done")     { setRan(true); break; }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setRunning(false);
    }
  }, [project]);

  const emptyState = (
    <div className="text-center py-20">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-4">
        <Wrench className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground">Wiki health check</h3>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto">
        Run a full audit of all wiki pages — contradictions, orphan pages, missing links, gaps, and reuse opportunities.
      </p>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="bg-card rounded-2xl border border-border p-5 shadow-soft flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Wiki health check</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Audits all {" "}pages for contradictions, orphans, gaps, and reuse opportunities.
          </div>
        </div>
        <button
          onClick={run}
          disabled={running}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-hero text-primary-foreground text-sm font-semibold hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-soft"
        >
          {running
            ? <><Loader2 className="h-4 w-4 animate-spin" /> Running…</>
            : ran
            ? <><RefreshCcw className="h-4 w-4" /> Re-run</>
            : <><Sparkles className="h-4 w-4" /> Run health check</>}
        </button>
      </div>

      <StreamOutput text={text} applying={applying} applyChars={0} applied={applied} pushing={pushing} pushed={pushed} pushError={pushError} error={error} empty={emptyState} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Audit log (read-only — append-only evaluation evidence)
// ---------------------------------------------------------------------------
const ACTION_STYLES = (action: string) =>
  action.startsWith("published")
    ? "bg-accent/10 text-accent border-accent/25"
    : "bg-destructive/8 text-destructive border-destructive/20";

const ACTION_TEXT = (action: string) =>
  action.startsWith("published") ? "Shared" : "Held back";

const AuditLogTab = () => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/audit-log")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { setEntries(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-2xl border border-border px-5 py-4 shadow-soft">
        <div className="text-sm font-semibold text-foreground">Safety check history</div>
        <p className="text-xs text-muted-foreground mt-1">
          Every generated output is checked before it can be shared. This history is
          read-only and never deleted.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border px-5 py-10 text-center text-sm text-muted-foreground">
          No checks recorded yet — generate something first.
        </div>
      ) : (
        <div className="space-y-2.5">
          {entries.map((e, i) => (
            <div key={i} className="bg-card rounded-xl border border-border px-5 py-3.5 shadow-soft">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${ACTION_STYLES(e.action)}`}>
                  {ACTION_TEXT(e.action)}
                </span>
                <span className="text-sm text-foreground font-medium">{e.page}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border capitalize">
                  {e.level}
                </span>
                <span className="text-xs text-muted-foreground ml-auto font-mono">
                  {e.timestamp.replace("T", " ").slice(0, 19)}
                </span>
              </div>
              {e.flags.length > 0 && (
                <div className="mt-2.5 space-y-1">
                  {e.flags.slice(0, 4).map((f, j) => (
                    <div key={j} className="text-xs text-muted-foreground leading-relaxed">
                      <span className={`font-semibold mr-1.5 ${f.severity === "high" ? "text-destructive" : f.severity === "medium" ? "text-amber-600" : ""}`}>
                        {f.severity === "high" ? "Serious" : f.severity === "medium" ? "Unclear" : "Minor"}:
                      </span>
                      “{f.text.slice(0, 80)}” — {f.reason}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const OperationsView = ({ onNavigate, project }: { onNavigate: (view: string) => void; project: string }) => {
  const [tab, setTab] = useState<Tab>("query");

  const TABS: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: "query",  icon: Search, label: "Query" },
    { id: "ingest", icon: Upload, label: "Ingest" },
    { id: "lint",   icon: Wrench, label: "Lint" },
    { id: "audit",  icon: FileText, label: "Audit log" },
  ];

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
            <span onClick={() => onNavigate("wiki")}      className="hover:text-primary-foreground cursor-pointer">Wiki</span>
            <span onClick={() => onNavigate("generator")} className="hover:text-primary-foreground cursor-pointer">Generator</span>
            <span className="text-primary-foreground font-medium border-b-2 border-accent pb-1 cursor-default">Operations</span>
            <span onClick={() => onNavigate("gaps")}      className="hover:text-primary-foreground cursor-pointer">Gaps</span>
          </nav>
          <div className="h-9 w-9 rounded-full bg-accent-gradient flex items-center justify-center text-sm font-semibold text-accent-foreground">
            LR
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <section className="bg-hero text-primary-foreground pb-16 pt-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute left-1/4 bottom-0 h-56 w-56 rounded-full bg-primary-glow/40 blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-8 relative">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent font-medium mb-4">
            <Wrench className="h-3.5 w-3.5" /> Operations
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Ingest sources, query knowledge, audit the wiki.
          </h1>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-8 -mt-8 pb-20 w-full relative">
        {/* Tab bar */}
        <div className="bg-card rounded-2xl border border-border shadow-elegant p-2 flex gap-1 mb-6">
          {TABS.map(({ id, icon, label }) => (
            <TabButton key={id} id={id} active={tab === id} icon={icon} label={label} onClick={() => setTab(id)} />
          ))}
        </div>

        {tab === "ingest" && <IngestTab onNavigate={onNavigate} project={project} />}
        {tab === "query"  && <QueryTab project={project} />}
        {tab === "lint"   && <LintTab project={project} />}
        {tab === "audit"  && <AuditLogTab />}
      </main>
    </div>
  );
};
