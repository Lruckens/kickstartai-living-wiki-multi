import { useState } from "react";
import { BookOpen, Loader2, LogIn, AlertCircle } from "lucide-react";
import { BACKEND_URL, setSession, SessionUser } from "./api";

const DEMO_ACCOUNTS = [
  { email: "anna.jansen@kickstartai.demo",  hint: "Team member — Living Wiki project" },
  { email: "bram.bakker@kickstartai.demo",  hint: "Team member — Project Bakkie" },
  { email: "carla.visser@kickstartai.demo", hint: "Team member — both projects" },
  { email: "gast.bezoeker@extern.demo",     hint: "External guest — public pages only" },
];

export const Login = ({ onLogin }: { onLogin: (user: SessionUser) => void }) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy]         = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const resp = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error((err as any)?.detail ?? "Sign-in failed.");
      }
      const user = (await resp.json()) as SessionUser;
      setSession(user);
      onLogin(user);
    } catch (err: any) {
      setError(err?.message ?? "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="h-11 w-11 rounded-xl bg-hero flex items-center justify-center text-primary-foreground">
            <BookOpen className="h-5.5 w-5.5" />
          </div>
          <div>
            <div className="text-base font-semibold text-foreground">Project Wiki</div>
            <div className="text-xs text-muted-foreground">Sign in to continue</div>
          </div>
        </div>

        <form onSubmit={submit} className="bg-card rounded-2xl border border-border shadow-soft p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@kickstartai.demo" autoFocus
              className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-input bg-secondary/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-input bg-secondary/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2.5">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <button type="submit" disabled={busy || !email || !password}
            className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-lg bg-hero text-primary-foreground font-medium hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Sign in
          </button>
        </form>

        <div className="mt-6 bg-card/60 rounded-xl border border-border p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Demo accounts (password: wiki-demo-1 … 4, in order)
          </div>
          <div className="space-y-1.5">
            {DEMO_ACCOUNTS.map((a) => (
              <button key={a.email} onClick={() => setEmail(a.email)}
                className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg hover:bg-secondary transition-colors">
                <span className="font-mono text-primary">{a.email}</span>
                <span className="text-muted-foreground ml-2">{a.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
