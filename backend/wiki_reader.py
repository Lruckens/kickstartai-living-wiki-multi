from pathlib import Path
from typing import Callable, Optional

WIKI_DIR = Path(__file__).parent.parent / "wiki"


def _read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        return ""


def read_wiki_context(
    output_id: str,
    progress_variant: str,
    allowed: Optional[Callable[[str], bool]] = None,
    base: Optional[Path] = None,
) -> tuple[str, list[str]]:
    """Assemble the wiki context for a generation request.

    `allowed` is an optional predicate over wiki-relative paths (e.g.
    "decisions/foo.md") injected by the permission layer to pre-filter the
    source pool before any LLM call. When omitted, behaviour is unchanged.
    `base` scopes reading to one project's subtree (wiki/<project>/); defaults
    to the whole wiki.
    """
    if allowed is None:
        allowed = lambda _path: True
    WIKI_DIR = base or globals()["WIKI_DIR"]

    sections = []
    pages: list[str] = []

    overview = _read(WIKI_DIR / "_overview.md") if allowed("_overview.md") else ""
    if overview:
        sections.append(f"## Project Overview\n{overview}")
        pages.append("wiki/_overview.md")

    index = _read(WIKI_DIR / "index.md") if allowed("index.md") else ""
    if index:
        sections.append(f"## Wiki Index\n{index}")
        pages.append("wiki/index.md")

    if output_id in ("progress", "summary", "digest") or output_id.startswith("custom-out-"):
        deliverables_dir = WIKI_DIR / "deliverables"
        if deliverables_dir.exists():
            parts = []
            for f in sorted(deliverables_dir.glob("*.md")):
                if not allowed(f"deliverables/{f.name}"):
                    continue
                content = _read(f)
                if content:
                    parts.append(f"### {f.stem}\n{content}")
                    pages.append(f"wiki/deliverables/{f.name}")
            if parts:
                sections.append("## Deliverables\n" + "\n\n".join(parts))

    decisions_dir = WIKI_DIR / "decisions"
    if decisions_dir.exists():
        parts = []
        for f in sorted(decisions_dir.glob("*.md")):
            if not allowed(f"decisions/{f.name}"):
                continue
            content = _read(f)
            if content:
                parts.append(f"### {f.stem}\n{content}")
                pages.append(f"wiki/decisions/{f.name}")
        if parts:
            sections.append("## Key Decisions\n" + "\n\n".join(parts))

    meetings_dir = WIKI_DIR / "meetings"
    if meetings_dir.exists():
        parts = []
        for f in sorted(meetings_dir.glob("*.md"), reverse=True)[:3]:
            if not allowed(f"meetings/{f.name}"):
                continue
            content = _read(f)
            if content:
                parts.append(f"### {f.stem}\n{content}")
                pages.append(f"wiki/meetings/{f.name}")
        if parts:
            sections.append("## Recent Meetings\n" + "\n\n".join(parts))

    if output_id in ("progress", "digest"):
        gaps = _read(WIKI_DIR / "_gaps.md") if allowed("_gaps.md") else ""
        if gaps:
            sections.append(f"## Open Gaps & Questions\n{gaps}")
            pages.append("wiki/_gaps.md")

    return "\n\n---\n\n".join(sections), pages
