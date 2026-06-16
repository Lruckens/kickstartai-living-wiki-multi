// Shared backend access + session handling for the permission layer.

export const BACKEND_URL = "http://localhost:8000";

export type Project = { id: string; name: string };
export type SessionUser = {
  token: string;
  user_id: string;
  name: string;
  tier: "internal" | "public";
  projects: Project[];
};

const SESSION_KEY = "wiki_session";

export const getSession = (): SessionUser | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
};

export const setSession = (s: SessionUser) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));

export const clearSession = () => localStorage.removeItem(SESSION_KEY);

export const authHeaders = (): Record<string, string> => {
  const s = getSession();
  return s ? { "X-Session-Token": s.token } : {};
};

/** fetch with the session token attached; on 401 the session is cleared and
 *  the app returns to the login screen. */
export const authFetch = async (path: string, init: RequestInit = {}) => {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: { ...(init.headers ?? {}), ...authHeaders() },
  });
  if (response.status === 401) {
    clearSession();
    window.dispatchEvent(new Event("wiki-session-expired"));
  }
  return response;
};
