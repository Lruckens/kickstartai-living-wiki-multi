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

ANSWER_MODEL = "claude-sonnet-4-6"        # the wiki's model (≠ the Opus judge model)
RETRIEVAL_MODEL = "claude-sonnet-4-6"     # page (C2) / chunk (C1r) selection — temperature=0 → deterministic
BASE_DIR = Path(__file__).resolve().parent.parent

_client = Anthropic()

ANSWER_SYSTEM = (
    "You answer questions about a specific software project. Use ONLY the context "
    "provided. Be concrete and specific — cite the actual decisions, people, dates, "
    "and reasons. If the answer is not in the context, say exactly: "
    "\"This is not documented in the provided material.\" Do not guess."
)

ARTIFACT_EXTS = (".md", ".txt", ".pdf")   # genuine project artifacts (markdown after conversion)

# --- Corpus hygiene (UvA-only, defensible comparison) -----------------------------
# Keep C1 (raw) and C2 (wiki) on the same UvA knowledge corpus. Exclude:
#  - cross-project content (Westerwoude/Bakkie) — a different project,
#  - raw source dumps misplaced inside the wiki tree (wiki/sources/**) — not real pages,
#  - saved query pages — prior LLM answers to near-identical eval questions (circular → unfair to C2),
#  - a stray, un-templated page.
SOURCE_EXCLUDE_SUBSTR = ("westerwoude", "bakkie")
WIKI_EXCLUDE_PREFIXES = ("sources/", "queries/")
WIKI_EXCLUDE_NAMES    = ("Meeting notes 14-5-2026.pdf.md",)


def _keep_source(p: Path) -> bool:
    return not any(s in p.name.lower() for s in SOURCE_EXCLUDE_SUBSTR)


def _keep_wiki(rel: str) -> bool:
    if rel in WIKI_EXCLUDE_NAMES:
        return False
    return not any(rel.startswith(pre) for pre in WIKI_EXCLUDE_PREFIXES)


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
        if not _keep_source(p):
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
        if not _keep_wiki(rel):
            continue
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
        model=RETRIEVAL_MODEL, max_tokens=400, temperature=0,
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


def _retrieve_wiki_graph(question: str, project: str, k: int = 6,
                         budget_tokens: int = 20000, max_pages: int = 14):
    """C2+graph: seed with the same top-k pages as C2, then traverse their [[links]] ONE hop,
    adding the most-linked neighbour pages. This finally lets the wiki use its cross-reference
    graph. It is deliberately NOT retrieval-matched to a raw baseline (raw chunks have no links
    to follow), so it answers the 'full wiki capability' question — not the controlled C1r-vs-C2
    isolation. Traversal is capped by a TOKEN budget (≈2x C2, still well below the full dump) so
    the context stays bounded and the scalability framing holds."""
    import re
    from collections import Counter
    wdir = _wiki_dir(project)
    cat = _wiki_catalog(project)
    seed_ctx, seed = _retrieve_wiki(question, project, k)          # reuse C2's selector (1 LLM call)
    if not seed:
        return seed_ctx, seed
    text = {rel: (wdir / rel).read_text(encoding="utf-8") for rel, _ in cat}
    stem_to_rel: dict = {}
    for rel, _ in cat:
        stem_to_rel.setdefault(rel.rsplit("/", 1)[-1][:-3], rel)   # filename stem (drop .md) → path
    seen = set(seed)
    linked: Counter = Counter()
    for rel in seed:                                              # one hop out from each seed page
        for raw in re.findall(r"\[\[([^\]]+)\]\]", text.get(rel, "")):
            slug = raw.split("|")[0].split("#")[0].strip()
            slug = slug[:-3] if slug.endswith(".md") else slug
            tgt = stem_to_rel.get(slug)
            if tgt and tgt not in seen:
                linked[tgt] += 1                                  # rank neighbours by link frequency
    budget_chars = budget_tokens * 4                             # ~4 chars/token
    total = sum(len(text[r]) for r in seed if r in text)
    pages = list(seed)
    for rel, _ in linked.most_common():                          # add neighbours, most-linked first
        if len(pages) >= max_pages:
            break
        if total + len(text.get(rel, "")) > budget_chars:        # skip pages that would bust the budget
            continue
        pages.append(rel); total += len(text[rel])
    ctx = "\n\n".join(f"=== {rel} ===\n{text.get(rel, '')}" for rel in pages)
    return ctx, pages


def _chunk(text: str, words: int = 600) -> list:
    w = text.split()
    return [" ".join(w[i:i + words]) for i in range(0, len(w), words)] or [text]


_CHUNKS_BY_PROJECT: dict = {}


def _source_chunks(project: str) -> list:
    """Raw artifacts split into page-sized chunks → [(chunk_id, text)] (cached per project)."""
    if project in _CHUNKS_BY_PROJECT:
        return _CHUNKS_BY_PROJECT[project]
    chunks = []
    for p in sorted(_sources_dir(project).rglob("*")):
        if not p.is_file() or p.name == ".gitkeep" or p.suffix.lower() not in ARTIFACT_EXTS:
            continue
        if not _keep_source(p):
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
        for i, ch in enumerate(_chunk(txt)):
            chunks.append((f"{p.name}#{i}", ch))
    _CHUNKS_BY_PROJECT[project] = chunks
    return chunks


def _retrieve_raw(question: str, project: str, k: int = 8):
    """C1r retrieval: SAME mechanism as C2 but over raw-document chunks instead of wiki pages.
    Comparing C1r vs C2 holds retrieval constant and isolates compiled-wiki vs raw-source."""
    import json
    import re
    chunks = _source_chunks(project)
    if not chunks:
        return "", []
    listing = "\n".join(f"{cid} — {' '.join(text.split()[:20])}" for cid, text in chunks)
    sel = _client.messages.create(
        model=RETRIEVAL_MODEL, max_tokens=400, temperature=0,
        messages=[{"role": "user", "content": (
            f"From this list of raw document chunks, choose the chunk ids most relevant to "
            f"answering the question. Return ONLY a JSON array of up to {k} ids, most relevant first.\n\n"
            f"## Chunks\n{listing}\n\n## Question\n{question}"
        )}],
    )
    raw = next((b.text for b in sel.content if b.type == "text"), "[]")
    m = re.search(r"\[.*\]", raw, re.DOTALL)
    try:
        ids = json.loads(m.group(0)) if m else []
    except Exception:
        ids = []
    by_id = dict(chunks)
    ids = [i for i in ids if i in by_id][:k]
    ctx = "\n\n".join(f"=== {cid} ===\n{by_id[cid]}" for cid in ids)
    return ctx, ids


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
    if condition == "C1":                       # project artifacts dumped (cached — fed/analysed once)
        if project not in _RAW_BY_PROJECT:
            _RAW_BY_PROJECT[project] = _read_sources(project)
        return _ask(question, _RAW_BY_PROJECT[project], cache_context=True)
    if condition == "C1r":                      # raw chunks + retrieval (vs C2 = compiled wiki + retrieval)
        ctx, ids = _retrieve_raw(question, project)
        res = _ask(question, ctx, cache_context=False)
        res["retrieved_pages"] = ids
        return res
    if condition == "C2":                       # wiki + retrieval (index → top-k pages)
        ctx, pages = _retrieve_wiki(question, project)
        res = _ask(question, ctx, cache_context=False)   # context varies per question → caching N/A
        res["retrieved_pages"] = pages
        return res
    if condition == "C2g":                      # wiki + retrieval + one-hop graph traversal (full capability)
        ctx, pages = _retrieve_wiki_graph(question, project)
        res = _ask(question, ctx, cache_context=False)
        res["retrieved_pages"] = pages
        return res
    raise ValueError(f"unknown condition: {condition}")