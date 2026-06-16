"""
project_config.py — the single source of per-project configuration + paths.

Everything project-specific is resolved here so deploying the artifact to a NEW
project needs no code edits — only:
  1. a `project.config.json` (project id/name, accounts, git push target), and
  2. optionally a `PROJECT_ROOT` env var pointing at a different working tree.

Path resolution:
  • PROJECT_ROOT (env), if set, is the project's working tree;
    otherwise the repo root (parent of backend/) is used.
Config resolution:
  • project.config.json is read from the project root. If it is missing or
    invalid, the built-in DEFAULTS (the current UvA prototype) are used, so the
    app always boots and existing behaviour is unchanged.
"""
import json
import os
from pathlib import Path

# --- paths ------------------------------------------------------------------
_REPO_ROOT = Path(__file__).parent.parent
ROOT = Path(os.getenv("PROJECT_ROOT") or _REPO_ROOT).resolve()

WIKI_DIR           = ROOT / "wiki"
SOURCES_DIR        = ROOT / "sources"
ACCESS_LABELS_PATH = ROOT / "access_labels.json"
PERMISSION_DIR     = ROOT / "permission-layer"
AUDIT_PROMPT_PATH  = PERMISSION_DIR / "AUDIT-v3.md"
AUDIT_LOG          = ROOT / "audit_log.md"
CONFIG_PATH        = ROOT / "project.config.json"

# --- defaults (current UvA prototype — keep in sync with project.config.json) ---
DEFAULTS = {
    "project": {"id": "uva", "name": "Living Wiki (UvA)"},
    "extra_projects": {"bakkie": "Project Bakkie"},
    "push": {"remote": "origin", "branch": "main",
             "bot_name": "Wiki Bot", "bot_email": "wiki-bot@kickstartai.nl"},
    "accounts": [
        {"email": "anna.jansen@kickstartai.demo", "user_id": "anna.jansen", "name": "Anna Jansen",
         "password": "wiki-demo-1", "tier": "internal", "projects": ["uva"]},
        {"email": "bram.bakker@kickstartai.demo", "user_id": "bram.bakker", "name": "Bram Bakker",
         "password": "wiki-demo-2", "tier": "internal", "projects": ["bakkie"]},
        {"email": "carla.visser@kickstartai.demo", "user_id": "carla.visser", "name": "Carla Visser",
         "password": "wiki-demo-3", "tier": "internal", "projects": ["uva", "bakkie"]},
        {"email": "gast.bezoeker@extern.demo", "user_id": "gast.bezoeker", "name": "Gast Bezoeker",
         "password": "wiki-demo-4", "tier": "public", "projects": []},
    ],
}


def _load() -> dict:
    try:
        data = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except Exception:
        return dict(DEFAULTS)
    return {**DEFAULTS, **data}


_CFG = _load()


def project() -> dict:
    """The primary project: {"id", "name"}."""
    return _CFG["project"]


def projects() -> dict:
    """{project_id: {"id", "name"}} — the primary project plus any extras."""
    p = _CFG["project"]
    out = {p["id"]: {"id": p["id"], "name": p["name"]}}
    for pid, name in (_CFG.get("extra_projects") or {}).items():
        out[pid] = {"id": pid, "name": name}
    return out


def users() -> dict:
    """{email_lower: account_dict} used for login."""
    out: dict[str, dict] = {}
    for a in _CFG.get("accounts", []):
        out[a["email"].strip().lower()] = {
            "user_id": a["user_id"], "name": a["name"], "password": a["password"],
            "tier": a["tier"], "projects": list(a.get("projects", [])),
        }
    return out


def push_config() -> dict:
    return {**DEFAULTS["push"], **_CFG.get("push", {})}
