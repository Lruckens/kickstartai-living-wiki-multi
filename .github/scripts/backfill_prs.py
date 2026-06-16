#!/usr/bin/env python3
"""
One-time backfill: ingest all existing GitHub PRs into the wiki.

Usage:
    GITHUB_TOKEN=ghp_xxx python3 .github/scripts/backfill_prs.py
"""

import json
import os
import re
import sys
import time
import urllib.request
from pathlib import Path

from anthropic import Anthropic

WIKI_DIR = Path(__file__).parent.parent.parent / "wiki"
REPO     = "Lruckens/kickstartai-living-wiki"

# ---------------------------------------------------------------------------
# GitHub API
# ---------------------------------------------------------------------------

def gh(path: str, token: str):
    url = f"https://api.github.com{path}"
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept":        "application/vnd.github.v3+json",
            "User-Agent":    "wiki-backfill-bot",
        },
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def fetch_all_prs(token: str) -> list[dict]:
    prs = gh(f"/repos/{REPO}/pulls?state=all&per_page=100&sort=created&direction=asc", token)
    return [pr for pr in prs if isinstance(pr, dict)]


def fetch_pr_files(pr_number: int, token: str) -> list[dict]:
    try:
        return gh(f"/repos/{REPO}/pulls/{pr_number}/files", token)
    except Exception as e:
        print(f"  Warning: could not fetch files for PR #{pr_number}: {e}")
        return []


# ---------------------------------------------------------------------------
# Wiki helpers
# ---------------------------------------------------------------------------

def read_wiki() -> str:
    parts = []
    for path in sorted(WIKI_DIR.rglob("*.md")):
        rel = path.relative_to(WIKI_DIR)
        try:
            parts.append(f"=== wiki/{rel} ===\n{path.read_text(encoding='utf-8')}")
        except Exception:
            pass
    return "\n\n".join(parts)


def apply_files(files: list[dict]) -> tuple[list[str], list[str]]:
    created, updated = [], []
    for f in files:
        raw = f.get("path", "").lstrip("/")
        if raw.startswith("wiki/"):
            raw = raw[len("wiki/"):]
        content = f.get("content", "")
        target  = (WIKI_DIR / raw).resolve()
        if not str(target).startswith(str(WIKI_DIR.resolve())):
            print(f"  Skipping unsafe path: {raw}")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        existed = target.exists()
        target.write_text(content, encoding="utf-8")
        (updated if existed else created).append(raw)
    return created, updated


def already_ingested(pr_number: int) -> bool:
    log_path = WIKI_DIR / "log.md"
    if not log_path.exists():
        return False
    return f"PR #{pr_number}:" in log_path.read_text(encoding="utf-8")


# ---------------------------------------------------------------------------
# Prompt
# ---------------------------------------------------------------------------

SYSTEM = """\
You are the wiki maintainer for the KickstartAI Living Project Wiki.

A GitHub pull request has been provided for retrospective ingestion.
Process it following the standard ingest operation:

1. Classify what this PR does (feature, fix, docs, infra, etc.)
2. Identify which wiki pages are affected based on the files changed and description
3. Update those pages — preserve existing content, only extend
4. Always append a new entry to log.md (append-only — never remove existing entries)
5. Update index.md if new pages were created
6. Update _overview.md only if project scope or status changed materially
7. Add entries to _gaps.md if open questions are revealed

Output ONLY a valid JSON object — no markdown fences, no explanation:
{
  "files": [
    {"path": "path/relative/to/wiki/root.md", "content": "complete file content"}
  ]
}

Rules:
- Paths relative to wiki root (e.g. "log.md", "deliverables/generator-module.md")
- Always full file content — not diffs
- Always include an updated log.md
- Use [[slug]] for all internal wiki links
- Log entry format:
  ## [YYYY-MM-DD] ingest | PR #N: title
  **PR:** url
  **Action:** merged
  **Author:** author
  **Pages created:** [[slug]] or none
  **Pages updated:** [[slug]], [[slug]]
  **Conflicts detected:** none | description
  **Gaps added:** none | description
"""


def build_pr_doc(pr: dict, files_changed: list[dict]) -> str:
    number  = pr["number"]
    title   = pr["title"]
    body    = (pr.get("body") or "").strip() or "_No description provided._"
    author  = pr["user"]["login"]
    head    = pr["head"]["ref"]
    base    = pr["base"]["ref"]
    url     = pr["html_url"]
    merged  = pr.get("merged_at") is not None
    state   = "merged" if merged else pr["state"]
    date    = (pr.get("merged_at") or pr.get("created_at") or "")[:10]

    files_list = "\n".join(
        f"- `{f['filename']}` — {f['status']} (+{f['additions']} / -{f['deletions']})"
        for f in files_changed
    ) or "_File list unavailable._"

    return f"""# PR #{number}: {title}

**Date:** {date}
**Status:** {state}
**Author:** {author}
**Branch:** `{head}` → `{base}`
**URL:** {url}

## Description

{body}

## Files changed

{files_list}
"""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not token:
        print("ERROR: set GITHUB_TOKEN environment variable before running.")
        print("  export GITHUB_TOKEN=ghp_yourtoken")
        sys.exit(1)

    api_key = None
    env_path = Path(__file__).parent.parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("ANTHROPIC_API_KEY="):
                api_key = line.split("=", 1)[1].strip()
    api_key = api_key or os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not found in .env or environment.")
        sys.exit(1)

    client = Anthropic(api_key=api_key)

    print(f"Fetching PRs from {REPO}…")
    prs = fetch_all_prs(token)
    print(f"Found {len(prs)} PR(s).\n")

    for pr in prs:
        number = pr["number"]
        title  = pr["title"]
        print(f"── PR #{number}: {title}")

        if already_ingested(number):
            print("   Already in wiki log — skipping.\n")
            continue

        files_changed = fetch_pr_files(number, token)
        pr_doc        = build_pr_doc(pr, files_changed)

        # Re-read wiki each time so each PR sees the previous PR's updates
        wiki = read_wiki()
        print(f"   Wiki context: {len(wiki.split())} words")

        print("   Calling Claude…")
        try:
            resp = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=8000,
                system=SYSTEM,
                messages=[{
                    "role": "user",
                    "content": (
                        f"## Current wiki\n\n{wiki}\n\n"
                        f"---\n\n## PR to ingest\n\n{pr_doc}"
                    ),
                }],
            )
        except Exception as e:
            print(f"   ERROR calling Claude: {e}")
            continue

        raw = resp.content[0].text.strip()
        raw = re.sub(r"^```json\s*", "", raw)
        raw = re.sub(r"\s*```\s*$", "", raw)

        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            print(f"   ERROR: invalid JSON from Claude: {e}")
            print(f"   Raw (first 300 chars): {raw[:300]}")
            continue

        created, updated = apply_files(data.get("files", []))
        print(f"   Created: {created or 'none'}")
        print(f"   Updated: {updated or 'none'}")
        print()

        # Small pause to avoid hitting API rate limits
        time.sleep(2)

    print("Backfill complete. Run `git diff wiki/` to review changes before committing.")


if __name__ == "__main__":
    main()
