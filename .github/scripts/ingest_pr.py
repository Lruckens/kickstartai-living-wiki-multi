#!/usr/bin/env python3
"""
Ingest a GitHub pull request event into the project wiki.
Called by .github/workflows/wiki-sync-pr.yml on PR open and merge.
"""

import json
import os
import re
import urllib.request
from pathlib import Path

from anthropic import Anthropic

WIKI_DIR = Path(__file__).parent.parent.parent / "wiki"

# ---------------------------------------------------------------------------
# Helpers
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


def fetch_pr_files(repo: str, pr_number: str, token: str) -> list[dict]:
    url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/files"
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "wiki-bot",
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except Exception as e:
        print(f"Warning: could not fetch PR files: {e}")
        return []


def build_pr_document(files_changed: list[dict]) -> str:
    action  = os.environ.get("PR_ACTION", "")
    number  = os.environ.get("PR_NUMBER", "")
    title   = os.environ.get("PR_TITLE", "")
    body    = (os.environ.get("PR_BODY") or "").strip() or "_No description provided._"
    author  = os.environ.get("PR_AUTHOR", "")
    head    = os.environ.get("PR_HEAD_REF", "")
    base    = os.environ.get("PR_BASE_REF", "")
    url     = os.environ.get("PR_URL", "")
    merged  = os.environ.get("PR_MERGED", "false")

    status = "merged into main" if merged == "true" else f"opened ({action})"

    files_list = "\n".join(
        f"- `{f['filename']}` — {f['status']} (+{f['additions']} / -{f['deletions']})"
        for f in files_changed
    ) or "_File list unavailable._"

    return f"""# PR #{number}: {title}

**Status:** {status}
**Author:** {author}
**Branch:** `{head}` → `{base}`
**URL:** {url}

## Description

{body}

## Files changed

{files_list}
"""


def apply_files(files: list[dict]) -> tuple[list[str], list[str]]:
    created, updated = [], []
    for f in files:
        raw = f.get("path", "").lstrip("/")
        if raw.startswith("wiki/"):
            raw = raw[len("wiki/"):]
        content = f.get("content", "")
        target = (WIKI_DIR / raw).resolve()
        if not str(target).startswith(str(WIKI_DIR.resolve())):
            print(f"Skipping unsafe path: {raw}")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        existed = target.exists()
        target.write_text(content, encoding="utf-8")
        (updated if existed else created).append(raw)
    return created, updated


# ---------------------------------------------------------------------------
# Prompts
# ---------------------------------------------------------------------------

SYSTEM = """\
You are the wiki maintainer for the KickstartAI Living Project Wiki.

A GitHub pull request event has occurred. Process it as a wiki ingest:

1. Classify what this PR does (feature, fix, docs, refactor, etc.)
2. Note key changes based on the title, description, and files touched
3. Determine which wiki pages are affected (deliverables, entities, concepts, decisions)
4. Update or create those pages — preserve existing content, only extend
5. Always append a new entry to log.md (append-only — never remove entries)
6. Update index.md if new pages were created
7. Update _overview.md only if project status or scope changed materially
8. Add new entries to _gaps.md if the PR reveals open questions

Output ONLY a valid JSON object — no markdown fences, no explanation:
{
  "files": [
    {"path": "path/relative/to/wiki/root.md", "content": "complete file content"}
  ]
}

Rules:
- Paths are relative to the wiki root (e.g. "log.md", "deliverables/generator-module.md")
- Always output complete file content — not diffs
- Always include an updated log.md
- Use [[slug]] for all internal wiki links
- Follow the log.md entry format:
  ## [YYYY-MM-DD] ingest | PR #{number}: {title}
  **PR:** {url}
  **Action:** opened | merged
  **Author:** {author}
  **Pages created:** [[slug]] or none
  **Pages updated:** [[slug]], [[slug]]
  **Conflicts detected:** none | description
  **Gaps added:** none | description
"""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise SystemExit("ERROR: ANTHROPIC_API_KEY secret not set in GitHub Actions.")

    repo     = os.environ.get("GITHUB_REPOSITORY", "")
    token    = os.environ.get("GITHUB_TOKEN", "")
    pr_num   = os.environ.get("PR_NUMBER", "")
    pr_title = os.environ.get("PR_TITLE", "?")
    action   = os.environ.get("PR_ACTION", "?")

    print(f"Processing PR #{pr_num} ({action}): {pr_title}")

    files_changed = fetch_pr_files(repo, pr_num, token)
    print(f"  {len(files_changed)} file(s) changed in PR")

    pr_doc = build_pr_document(files_changed)
    wiki   = read_wiki()
    print(f"  Wiki context: {len(wiki.split())} words across {len(list(WIKI_DIR.rglob('*.md')))} pages")

    client = Anthropic(api_key=api_key)

    print("  Calling Claude to generate wiki updates…")
    resp = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=8000,
        system=SYSTEM,
        messages=[{
            "role": "user",
            "content": (
                f"## Current wiki\n\n{wiki}\n\n"
                f"---\n\n## Pull request to ingest\n\n{pr_doc}"
            ),
        }],
    )

    raw = resp.content[0].text.strip()
    raw = re.sub(r"^```json\s*", "", raw)
    raw = re.sub(r"\s*```\s*$", "", raw)

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"ERROR: Claude returned invalid JSON: {e}")
        print("Raw output (first 500 chars):", raw[:500])
        raise SystemExit(1)

    created, updated = apply_files(data.get("files", []))
    print(f"  Created: {created or 'none'}")
    print(f"  Updated: {updated or 'none'}")
    print("Done.")


if __name__ == "__main__":
    main()
