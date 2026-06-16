#!/usr/bin/env python3
"""
log_merged_pr.py — deterministically append a wiki/log.md entry for a merged PR.

Run by .github/workflows/wiki-log-on-merge.yml on every PR merged into main.
No LLM involved — it just records that the merge happened, using PR metadata.

Robust against concurrent merges: instead of committing then rebasing (which
conflicts on append-at-EOF), it resets to the latest origin/main, appends, commits,
and pushes — retrying the whole cycle if another merge landed first. Idempotent:
if an entry for this PR is already present, it exits without doing anything.
"""
import json
import os
import subprocess
import sys
import urllib.request
from datetime import datetime, timezone

REPO = os.environ["REPO"]
TOKEN = os.environ["GH_TOKEN"]
PR_NUMBER = os.environ["PR_NUMBER"]
PR_TITLE = os.environ.get("PR_TITLE", "").strip() or f"PR #{PR_NUMBER}"
PR_AUTHOR = os.environ.get("PR_AUTHOR", "").strip() or "unknown"
PR_URL = os.environ.get("PR_URL", "").strip()
PR_MERGED_AT = os.environ.get("PR_MERGED_AT", "").strip()
LOG_PATH = "wiki/log.md"
MARKER = f"(PR #{PR_NUMBER})"
MAX_TRIES = 5


def sh(*args: str, check: bool = True) -> str:
    return subprocess.run(args, check=check, capture_output=True, text=True).stdout.strip()


def api(path: str) -> object:
    req = urllib.request.Request(
        f"https://api.github.com/repos/{REPO}{path}",
        headers={"Authorization": f"Bearer {TOKEN}", "Accept": "application/vnd.github+json"},
    )
    with urllib.request.urlopen(req) as r:  # noqa: S310 (trusted GitHub API)
        return json.load(r)


def changed_files() -> list[str]:
    out: list[str] = []
    try:
        for page in range(1, 4):  # up to 300 files
            batch = api(f"/pulls/{PR_NUMBER}/files?per_page=100&page={page}")
            if not batch:
                break
            out.extend(f["filename"] for f in batch)
            if len(batch) < 100:
                break
    except Exception:  # noqa: BLE001 — file list is best-effort
        pass
    return out


def merge_date() -> str:
    if PR_MERGED_AT:
        try:
            return datetime.fromisoformat(PR_MERGED_AT.replace("Z", "+00:00")).date().isoformat()
        except ValueError:
            pass
    return datetime.now(timezone.utc).date().isoformat()


def build_entry() -> str:
    files = changed_files()
    n = len(files)
    if files:
        preview = ", ".join(f"`{f}`" for f in files[:8])
        if n > 8:
            preview += f", … (+{n - 8} more)"
        files_line = f"**Files changed:** {n} — {preview}"
    else:
        files_line = "**Files changed:** _list unavailable_"
    by = f"by @{PR_AUTHOR}" + (f" — {PR_URL}" if PR_URL else "")
    return (
        f"\n## [{merge_date()}] merge | {PR_TITLE} (PR #{PR_NUMBER})\n\n"
        f"**PR:** #{PR_NUMBER} {by}\n"
        f"{files_line}\n"
        f"**Pages updated:** [[log]]\n"
        f"**Notes:** Auto-logged on merge to main by the wiki-log workflow "
        f"(deterministic record; no content synthesis).\n"
    )


def main() -> int:
    sh("git", "config", "user.name", "Wiki Bot")
    sh("git", "config", "user.email", "wiki-bot@kickstartai.nl")
    entry = build_entry()

    for attempt in range(1, MAX_TRIES + 1):
        sh("git", "fetch", "origin", "main")
        sh("git", "reset", "--hard", "origin/main")

        with open(LOG_PATH, encoding="utf-8") as f:
            current = f.read()
        if MARKER in current:
            print(f"PR #{PR_NUMBER} already logged — nothing to do.")
            return 0

        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write(entry)

        sh("git", "add", LOG_PATH)
        sh("git", "commit", "-m", f"wiki(log): record merge of PR #{PR_NUMBER} — {PR_TITLE}")

        push = subprocess.run(
            ["git", "push", "origin", "HEAD:main"], capture_output=True, text=True
        )
        if push.returncode == 0:
            print(f"Logged PR #{PR_NUMBER} (attempt {attempt}).")
            return 0
        print(f"Push rejected (attempt {attempt}), retrying on latest main…\n{push.stderr}")

    print("Failed to append log entry after retries.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
