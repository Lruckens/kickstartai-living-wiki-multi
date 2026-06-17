import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { ArtifactView } from "../ArtifactView";
import { WikiViewer } from "./WikiViewer";
import { OperationsView } from "./OperationsView";
import { GapsView } from "./GapsView";
import { Login } from "./Login";
import { authFetch, clearSession, getSession, SessionUser } from "./api";

type View = "generator" | "wiki" | "operations" | "gaps";

export default function App() {
  const [view, setView] = useState<View>("wiki");
  const [wikiTarget, setWikiTarget] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<SessionUser | null>(getSession());
  // Active project — every operation acts on this project's subtree (wiki/<project>/).
  const [project, setProject] = useState<string>(() => {
    const ids = (getSession()?.projects ?? []).map((p) => p.id);
    const saved = localStorage.getItem("wiki_active_project");
    return saved && ids.includes(saved) ? saved : (ids[0] ?? "uva");
  });
  const changeProject = (p: string) => {
    setProject(p);
    localStorage.setItem("wiki_active_project", p);
    setWikiTarget(undefined);  // drop a stale per-project deep-link target
  };
  const nav = (v: string, wikiPath?: string) => {
    if (wikiPath) setWikiTarget(wikiPath);
    setView(v as View);
  };

  useEffect(() => {
    const expire = () => setUser(null);
    window.addEventListener("wiki-session-expired", expire);
    return () => window.removeEventListener("wiki-session-expired", expire);
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  const logout = async () => {
    await authFetch("/auth/logout", { method: "POST" }).catch(() => null);
    clearSession();
    setUser(null);
  };

  return (
    <div className="relative">
      {/* Signed-in strip — the permission layer's session indicator */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-card/95 backdrop-blur border border-border rounded-full shadow-soft pl-3.5 pr-1.5 py-1.5 text-xs">
        <span className="text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{user.name}</span>
        </span>
        <button onClick={logout} title="Log out"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="h-3 w-3" /> Log out
        </button>
      </div>

      {/* Active-project switcher — every view/operation acts on this project.
          Bottom-left (mirrors the bottom-right session strip) so it never covers the top nav. */}
      {user.projects.length > 0 && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1 bg-card/95 backdrop-blur border border-border rounded-full shadow-soft px-1.5 py-1 text-xs">
          <span className="px-2 text-muted-foreground">Project</span>
          {user.projects.map((p) => (
            <button key={p.id} onClick={() => changeProject(p.id)}
              className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                project === p.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}>
              {p.name}
            </button>
          ))}
        </div>
      )}

      {view === "wiki"       ? <WikiViewer     onNavigate={nav} initialPath={wikiTarget} project={project} />
      : view === "operations" ? <OperationsView onNavigate={nav} project={project} />
      : view === "gaps"       ? <GapsView       onNavigate={nav} project={project} />
      :                         <ArtifactView   onNavigate={nav} project={project} />}
    </div>
  );
}
