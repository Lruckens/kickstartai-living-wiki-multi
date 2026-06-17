"""
pipelines.py — the three answer conditions for the headline experiment.

Same model + same prompt template; only the CONTEXT differs:
  C0  closed-book      — no context (hallucination floor)
  C1  raw-context      — the project artifacts (the "constantly feed context" baseline)
  C2  wiki-grounded    — index → top-k retrieved wiki pages (the artifact)

Project-aware: pass project="uva" to read sources/<project>/ and wiki/<project>/ (the
multi-project app layout). Empty project = a flat sources/ + wiki/ (single-project repo).

Cost: the C1 artifact context is the same for every question, so we mark it with Anthropic
**prompt caching** (cache_control) — it is processed once and reused at ~10% cost for the
rest of the run. (For the H2 *token* comparison we still report the raw tokens fed; caching
only lowers the $ cost of running the experiment.)
"""
import time
from pathlib import Path
from typing import Optional

from anthropic import Anthropic

ANSWER_MODEL = "claude-opus-4-8"          # the wiki's model (≠ the judge model)
RETRIEVAL_MODEL = "claude-haiku-4-5"      # cheap model for index→page selection (C2)
BASE_DIR = Path(__file__).resolve().parent.parent

_client = Anthropic()

ANSWER_SYSTEM = (
    "You answer questions about a specific software project. Use ONLY the context "
    "provided. Be concrete and specific — cite the actual decisions, people, dates, "
    "and reasons. If the answer is not in the context, say exactly: "
    "\"This is not documented in the provided material.\" Do not guess."
)

ARTIFACT_EXTS = (".md", ".txt", ".pdf")   # genuine project artifacts (markdown after conversion)


def _sources_dir(project: str) -> Path:
    return BASE_DIR / "sources" / project if project else BASE_DIR / "sources"


def _wiki_dir(project: str) -> Path:
    return BASE_DIR / "wiki" / project if project else BASE_DIR / "wiki"


def _read_sources(project: str) -> str:
    """All project artifacts as text (markdown after conversion; pdf/txt also supported)."""
    parts = []
    for p in sorted(_sources_dir(project).rglob("*")):
        if not p.is_file() or p.name == ".gitkeep" or p.suffix.lower() not in ARTIFACT_EXTS:
            continue
        try:
            if p.suffix.lower() == ".pdf":
                import pdfplumber
                with pdfplumber.open(p) as pdf:
                    txt = "\n".join(pg.extract_text() or "" for pg in pdf.pages)
            else:
                txt = p.read_text(encoding="utf-8")
        except Exception:
            continue
        parts.append(f"=== {p.name} ===\n{txt.strip()}")
    return "\n\n".join(parts)


def _wiki_catalog(project: str) -> list:
    """[(path, title)] for every wiki page — the retrieval index (CLAUDE.md: 'read index.md first')."""
    wdir = _wiki_dir(project)
    cat = []
    for p in sorted(wdir.rglob("*.md")):
        rel = "/".join(p.relative_to(wdir).parts)
        txt = p.read_text(encoding="utf-8")
        title = next((l[2:].strip() for l in txt.splitlines() if l.startswith("# ")), p.stem)
        cat.append((rel, title))
    return cat


def _retrieve_wiki(question: str, project: str, k: int = 6):
    """C2 retrieval: a cheap model picks the top-k relevant pages; load only those → bounded."""
    wdir = _wiki_dir(project)
    cat = _wiki_catalog(project)
    listing = "\n".join(f"{rel} — {title}" for rel, title in cat)
    sel = _client.messages.create(
        model=RETRIEVAL_MODEL, max_tokens=400,
        messages=[{"role": "user", "content": (
            f"From this wiki page catalog, choose the file paths most relevant to answering the "
            f"question. Return ONLY a JSON array of up to {k} paths, most relevant first.\n\n"
            f"## Catalog\n{listing}\n\n## Question\n{question}"
        )}],
    )
    import json
    import re
    raw = next((b.text for b in sel.content if b.type == "text"), "[]")
    m = re.search(r"\[.*\]", raw, re.DOTALL)
    try:
        paths = json.loads(m.group(0)) if m else []
    except Exception:
        paths = []
    valid = {rel for rel, _ in cat}
    paths = [p for p in paths if p in valid][:k]
    ctx = "\n\n".join(f"=== {rel} ===\n{(wdir / rel).read_text(encoding='utf-8')}" for rel in paths)
    return ctx, paths


def _ask(question: str, context: Optional[str], cache_context: bool) -> dict:
    """Answer with the given context. When cache_context, the context block is marked for
    Anthropic prompt caching so an identical context (e.g. C1's) is processed once and reused."""
    t0 = time.time()
    if context is None:
        messages = [{"role": "user", "content": question}]
    else:
        ctx_block = {"type": "text", "text": f"## Context\n{context}"}
        if cache_context:
            ctx_block["cache_control"] = {"type": "ephemeral"}
        messages = [{"role": "user", "content": [ctx_block, {"type": "text", "text": f"## Question\n{question}"}]}]
    msg = _client.messages.create(model=ANSWER_MODEL, max_tokens=1200, system=ANSWER_SYSTEM, messages=messages)
    u = msg.usage
    cache_read = getattr(u, "cache_read_input_tokens", 0) or 0
    cache_creation = getattr(u, "cache_creation_input_tokens", 0) or 0
    return {
        "answer": next((b.text for b in msg.content if b.type == "text"), "").strip(),
        "context": context or "",
        # tokens_fed = the full prompt size (for the H2 comparison) — independent of caching
        "tokens_fed": u.input_tokens + cache_read + cache_creation,
        "input_tokens": u.input_tokens,                  # billed at full price
        "cache_read_tokens": cache_read,                 # billed ~10% (the caching saving)
        "cache_creation_tokens": cache_creation,
        "output_tokens": u.output_tokens,
        "latency_s": round(time.time() - t0, 2),
    }


_RAW_BY_PROJECT: dict = {}   # artifact context, read once per project


def answer(question: str, condition: str, project: str = "") -> dict:
    if condition == "C0":                       # closed-book
        return _ask(question, None, cache_context=False)
    if condition == "C1":                       # project artifacts (cached — fed/analysed once)
        if project not in _RAW_BY_PROJECT:
            _RAW_BY_PROJECT[project] = _read_sources(project)
        return _ask(question, _RAW_BY_PROJECT[project], cache_context=True)
    if condition == "C2":                       # wiki + retrieval (index → top-k pages)
        ctx, pages = _retrieve_wiki(question, project)
        res = _ask(question, ctx, cache_context=False)   # context varies per question → caching N/A
        res["retrieved_pages"] = pages
        return res
    raise ValueError(f"unknown condition: {condition}")