// Shared backend access + session handling for the permission layer.

// Backend base URL — override with VITE_BACKEND_URL (e.g. to run on an alt port).
export const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL ?? "http://localhost:8010";

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

/** Append ?project=<id> (or &project=) to a path — every operation is scoped to
 *  the active project's subtree (wiki/<project>/). */
export const withProject = (path: string, project: string): string =>
  `${path}${path.includes("?") ? "&" : "?"}project=${encodeURIComponent(project)}`;

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

// --- Gap detector types (mirror the backend GapReport shape) ---------------
export type GapEvidence = {
  source_layer: string;
  description: string;
  raw_evidence?: string | null;
  matched_keyword?: string | null;
  missing_fields?: string[] | null;
};

export type RankedGap = {
  gap_id: string;
  gap_category: "STRUCTURAL" | "EXPLICIT_EXPRESSION" | "IMPLICIT_EXPRESSION" | "SEMANTIC" | "RELATIONAL";
  gap_type: string;
  document_id: string;
  document_title: string;
  affected_document_section?: string | null;
  description: string;
  evidence_sources: GapEvidence[];
  severity: number;
  impact: number;
  confidence: number;
  frequency: number;
  final_score: number;
  risk_level: "High" | "Medium" | "Low";
  priority_score: number;
  affected_entities: string[];
  root_cause: string;
  recommendation: string;
  llm_reasoning?: string | null;
  provenance?: "detected" | "confirmed" | "from_ledger";
};

export type GapReport = {
  report_id: string;
  job_id: string;
  generated_at: string;
  documents_analyzed: string[];
  total_gaps: number;
  high_risk_count: number;
  medium_risk_count: number;
  low_risk_count: number;
  gaps: RankedGap[];
  pipeline_metadata: Record<string, unknown>;
};
