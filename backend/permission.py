"""
permission.py — synthesis-time access control (sub-deliverable 5, Xiaojing Li),
integrated as a layer around the existing wiki / generator / operations backend.

Implements the two-layer enforcement from the "Permission layer" section of CLAUDE.md:
  Layer 1 — deterministic pre-filtering of the source pool before any LLM call
  Layer 2 — post-generation self-audit: blacklist regex, then LLM audit with
            permission-layer/AUDIT-v3.md, with HIGH/MEDIUM/LOW response logic and
            append-only audit_log.md

Authentication uses DUMMY ACCOUNTS only — fake names, fake passwords. Never
put real credentials here.
"""

import json
from typing import Optional
import re
import secrets
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
PERMISSION_DIR = BASE_DIR / "permission-layer"
AUDIT_PROMPT_PATH = PERMISSION_DIR / "AUDIT-v3.md"
AUDIT_LOG = BASE_DIR / "audit_log.md"
ACCESS_LABELS_PATH = BASE_DIR / "access_labels.json"

# ---------------------------------------------------------------------------
# Projects and dummy accounts
# ---------------------------------------------------------------------------

PROJECTS = {
    "uva":    {"id": "uva",    "name": "Living Wiki (UvA)"},
    "bakkie": {"id": "bakkie", "name": "Project Bakkie"},
}

# DUMMY accounts — fake people, fake passwords (demo only).
# tier: "internal" = KickstartAI team member; "public" = external guest.
USERS = {
    "anna.jansen@kickstartai.demo": {
        "user_id": "anna.jansen", "name": "Anna Jansen",
        "password": "wiki-demo-1", "tier": "internal", "projects": ["uva"],
    },
    "bram.bakker@kickstartai.demo": {
        "user_id": "bram.bakker", "name": "Bram Bakker",
        "password": "wiki-demo-2", "tier": "internal", "projects": ["bakkie"],
    },
    "carla.visser@kickstartai.demo": {
        "user_id": "carla.visser", "name": "Carla Visser",
        "password": "wiki-demo-3", "tier": "internal", "projects": ["uva", "bakkie"],
    },
    "gast.bezoeker@extern.demo": {
        "user_id": "gast.bezoeker", "name": "Gast Bezoeker",
        "password": "wiki-demo-4", "tier": "public", "projects": [],
    },
}

_sessions: dict[str, str] = {}  # token -> email (in-memory; demo-grade)


def login(email: str, password: str) -> Optional[dict]:
    user = USERS.get(email.strip().lower())
    if not user or user["password"] != password:
        return None
    token = secrets.token_urlsafe(24)
    _sessions[token] = email.strip().lower()
    return {"token": token, **public_user(user)}


def logout(token: str) -> None:
    _sessions.pop(token, None)


def user_for_token(token: Optional[str]) -> Optional[dict]:
    if not token:
        return None
    email = _sessions.get(token)
    return USERS.get(email) if email else None


def public_user(user: dict) -> dict:
    return {
        "user_id": user["user_id"], "name": user["name"], "tier": user["tier"],
        "projects": [PROJECTS[p] for p in user["projects"] if p in PROJECTS],
    }


# ---------------------------------------------------------------------------
# Access labels (Layer 1 metadata)
# ---------------------------------------------------------------------------
# Labels are stored in a sidecar file keyed by wiki page path / source filename,
# so they survive page rewrites during ingest. Parsing/filtering stays fully
# deterministic — no LLM call, per the pre-filtering spec.
# Shape: {"wiki": {path: {"label": ..., "project_id": ...}}, "sources": {...}}

DEFAULT_LABEL = "internal"


def _load_labels() -> dict:
    try:
        return json.loads(ACCESS_LABELS_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {"wiki": {}, "sources": {}}


def _save_labels(data: dict) -> None:
    ACCESS_LABELS_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")


def page_access(path: str) -> dict:
    meta = _load_labels().get("wiki", {}).get(path)
    return meta if meta else {"label": DEFAULT_LABEL, "project_id": None}


def source_access(filename: str) -> dict:
    meta = _load_labels().get("sources", {}).get(filename)
    return meta if meta else {"label": DEFAULT_LABEL, "project_id": None}


def set_page_access(path: str, label: str, project_id: Optional[str]) -> None:
    data = _load_labels()
    data.setdefault("wiki", {})[path] = {"label": label, "project_id": project_id}
    _save_labels(data)


def set_source_access(filename: str, label: str, project_id: Optional[str]) -> None:
    data = _load_labels()
    data.setdefault("sources", {})[filename] = {"label": label, "project_id": project_id}
    _save_labels(data)


def access_badge(meta: dict) -> str:
    """Plain-language badge for end users — no jargon."""
    label = meta.get("label", DEFAULT_LABEL)
    if label == "public":
        return "Public"
    if label == "restricted":
        project = PROJECTS.get(meta.get("project_id") or "", {})
        return f"Restricted — {project.get('name', 'a specific project')}"
    return "Internal"


# ---------------------------------------------------------------------------
# Layer 1 — pre-filtering
# ---------------------------------------------------------------------------

def user_can_see(meta: dict, user: dict) -> bool:
    """Visibility rule for the Wiki tab (by reader)."""
    label = meta.get("label", DEFAULT_LABEL)
    if label == "public":
        return True
    if label == "internal":
        return user["tier"] == "internal"
    return meta.get("project_id") in user["projects"]


def context_filter(level: str, project_id: Optional[str], user: dict):
    """Predicate for the generation source pool at a target level.

    public      → only public-labelled pages
    internal    → public + internal
    restricted  → public + internal + restricted pages of the scoped project,
                  and only if the user is authorised for that project
    """
    def allowed(meta: dict) -> bool:
        label = meta.get("label", DEFAULT_LABEL)
        if label == "public":
            return True
        if label == "internal":
            return level in ("internal", "restricted")
        return (
            level == "restricted"
            and meta.get("project_id") == project_id
            and project_id in user["projects"]
        )
    return allowed


# Output type → required target level (the floor; never lower).
LEVEL_FLOOR = {
    "linkedin": "public",
    "digest": "internal",
    "summary": "internal",
    "progress": "internal",
}


def target_level(output_id: str, project_scope: Optional[str]) -> str:
    floor = LEVEL_FLOOR.get(output_id, "internal")
    if floor == "public":
        return "public"  # never raise a LinkedIn post above public
    return "restricted" if project_scope else floor


# ---------------------------------------------------------------------------
# Blacklists (per project, auto-updated at ingest of restricted documents)
# ---------------------------------------------------------------------------

UNIVERSAL_PATTERNS = [
    r"€\s?\d+", r"\b\d+k\b",                       # budget figures
    r"\b\d{4}-\d{4}\b", r"\+31\d{6,}",             # phone numbers
    r"Severity-[123]",                              # incident markers
    r"internal only", r"do not share", r"Classification:\s*Internal",
]


def _blacklist_path(project_id: str) -> Path:
    return PERMISSION_DIR / f"blacklist_{project_id}.json"


def load_blacklist(project_id: str) -> list[str]:
    try:
        return json.loads(_blacklist_path(project_id).read_text(encoding="utf-8")).get("patterns", [])
    except Exception:
        return []


def update_blacklist(project_id: str, document_text: str) -> int:
    """Extract sensitive literals from a restricted document and merge them
    into the project blacklist. Deterministic regex only."""
    found: list[str] = []
    found += re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", document_text)
    found += re.findall(r"\+31\s?\d[\d\s]{6,}", document_text)
    found += re.findall(r"€\s?[\d.,]+\s?(?:k|K|mln|million)?", document_text)
    path = _blacklist_path(project_id)
    existing = load_blacklist(project_id)
    merged = list(dict.fromkeys(existing + [f.strip() for f in found if f.strip()]))
    path.write_text(
        json.dumps({"project": project_id, "patterns": merged}, indent=2),
        encoding="utf-8",
    )
    return len(merged) - len(existing)


def blacklist_check(text: str, level: str, project_scope: Optional[str]) -> list[str]:
    """Step (a) of the self-audit. Universal patterns always apply.
    Public outputs are additionally checked against every project blacklist
    (vertical leakage); restricted outputs against every OTHER project's
    blacklist (horizontal leakage)."""
    hits = [m.group(0) for pat in UNIVERSAL_PATTERNS
            for m in re.finditer(pat, text, flags=re.IGNORECASE)]
    if level == "public":
        applicable = list(PROJECTS)
    elif level == "restricted":
        applicable = [p for p in PROJECTS if p != project_scope]
    else:
        applicable = []
    for pid in applicable:
        for literal in load_blacklist(pid):
            if re.search(re.escape(literal), text, flags=re.IGNORECASE):
                hits.append(literal)
    return list(dict.fromkeys(hits))


# ---------------------------------------------------------------------------
# Layer 2 — self-audit (blacklist, then LLM audit with AUDIT-v3.md)
# ---------------------------------------------------------------------------

AUDIT_SCHEMA = {
    "type": "object",
    "properties": {
        "leakage_detected": {"type": "boolean"},
        "flagged_spans": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "text": {"type": "string"},
                    "severity": {"type": "string", "enum": ["high", "medium", "low"]},
                    "reason": {"type": "string"},
                },
                "required": ["text", "severity", "reason"],
                "additionalProperties": False,
            },
        },
    },
    "required": ["leakage_detected", "flagged_spans"],
    "additionalProperties": False,
}


def run_llm_audit(client, page_text: str, paragraphs_text: str, level: str) -> dict:
    audit_prompt = AUDIT_PROMPT_PATH.read_text(encoding="utf-8")
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4000,
        system=audit_prompt,
        output_config={"format": {"type": "json_schema", "schema": AUDIT_SCHEMA}},
        messages=[{
            "role": "user",
            "content": (
                f"Target permission level: {level}\n\n"
                f"Generated page:\n{page_text}\n\n"
                f"Allowed source paragraphs:\n{paragraphs_text}"
            ),
        }],
    )
    text = next((b.text for b in message.content if b.type == "text"), None)
    if text is None:
        return {"leakage_detected": True, "flagged_spans": [{
            "text": "(audit returned no result)",
            "severity": "medium",
            "reason": f"Audit could not be completed (stop_reason: {message.stop_reason}).",
        }]}
    return json.loads(text)


def decide(spans: list[dict]) -> str:
    """Audit response logic: HIGH → block, MEDIUM → review, LOW/none → publish."""
    severities = {s["severity"].lower() for s in spans}
    if "high" in severities:
        return "block"
    if "medium" in severities:
        return "review"
    return "publish"


def audit_output(client, page_text: str, paragraphs_text: str,
                 level: str, project_scope: Optional[str]) -> dict:
    hits = blacklist_check(page_text, level, project_scope)
    if hits:
        spans = [{"text": h, "severity": "high",
                  "reason": "Matches a project blacklist pattern."} for h in hits]
        return {"action": "block", "spans": spans}
    result = run_llm_audit(client, page_text, paragraphs_text, level)
    spans = result.get("flagged_spans", [])
    return {"action": decide(spans), "spans": spans}


def append_audit_log(page_ref: str, level: str, spans: list[dict],
                     action: str, retries: int = 0) -> None:
    """Append-only audit_log.md, per the CLAUDE.md audit_log format."""
    with open(AUDIT_LOG, "a", encoding="utf-8") as f:
        f.write(f"\n## {datetime.now().isoformat()} | {page_ref} | level={level}\n")
        f.write(f"- Action: {action}\n")
        f.write(f"- Retries: {retries}\n")
        f.write(f"- Leakage detected: {bool(spans)}\n")
        for s in spans:
            f.write(f"  - [{s['severity'].upper()}] {s['text'][:80]} — {s['reason']}\n")


def read_audit_log() -> list[dict]:
    """Parse audit_log.md into entries for the read-only Operations view."""
    if not AUDIT_LOG.exists():
        return []
    entries: list[dict] = []
    current: Optional[dict] = None
    for line in AUDIT_LOG.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^## (\S+) \| (.+) \| level=(\w+)$", line)
        if m:
            current = {"timestamp": m.group(1), "page": m.group(2),
                       "level": m.group(3), "action": "", "retries": 0, "flags": []}
            entries.append(current)
            continue
        if current is None:
            continue
        if line.startswith("- Action:"):
            current["action"] = line.split(":", 1)[1].strip()
        elif line.startswith("- Retries:"):
            try:
                current["retries"] = int(line.split(":", 1)[1].strip())
            except ValueError:
                pass
        elif line.strip().startswith("- ["):
            fm = re.match(r"- \[(\w+)\] (.*?) — (.*)$", line.strip())
            if fm:
                current["flags"].append({
                    "severity": fm.group(1).lower(),
                    "text": fm.group(2), "reason": fm.group(3),
                })
    return list(reversed(entries))  # newest first
