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

      {view === "wiki"       ? <WikiViewer     onNavigate={nav} initialPath={wikiTarget} />
      : view === "operations" ? <OperationsView onNavigate={nav} />
      : view === "gaps"       ? <GapsView       onNavigate={nav} />
      :                         <ArtifactView   onNavigate={nav} />}
    </div>
  );
}
