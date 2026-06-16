"""
wiki_gaps.py — wiki-native gap detector (v2), reconciled with Cara's 6-layer design.

Keeps Cara's architecture, 5-category taxonomy, scoring formula, GapReport output
shape, and evaluation framing — but re-grounds every layer in three wiki-native
sources of truth so the gaps reflect THIS project:

  • CLAUDE.md page schema   → Layer 1 validates real required sections (not generic
                              "Date/Participants/Owner" templates)
  • the whole linked wiki   → Layer 2 judges each page WITH cross-page context, so it
                              never flags "X undefined" when X is defined elsewhere
  • [[wikilink]] graph      → Layer 3 uses the wiki's real links (orphans / dangling /
                              decision-without-rationale), not formal RDF edges
  • _gaps.md + open Qs      → Layer 4 reconciles against the team's curated gap ledger
                              (ground truth) and surfaces logged-but-undetected gaps

This is the single, integrated gap detector — the changes are applied directly to
Cara's six-layer design; there is no separate copy of the pipeline.
Emits the same GapReport JSON the /gaps API + Lovable UI already consume, plus a
`provenance` field per gap (detected | confirmed | from_ledger).
"""
from __future__ import annotations

import json
import re
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone

# --- regexes / constants ----------------------------------------------------
WIKILINK = re.compile(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]")
WIKI_SLUG = re.compile(r"^[a-z0-9][a-z0-9-]*$")   # a real wiki slug (not a file/source ref)
H1 = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
META = re.compile(r"^\*\*([A-Za-z][A-Za-z /]+?):\*\*", re.MULTILINE)  # **Field:** metadata lines
PLACEHOLDER = "_to be documented_"
TODO_RE = re.compile(r"\b(TBD|TODO|FIXME|to be determined|to be decided|to be confirmed)\b", re.IGNORECASE)
META_SLUGS = {"_overview", "index", "log", "_gaps", "_reuse"}

CATEGORY = {
    "structural": "STRUCTURAL", "explicit": "EXPLICIT_EXPRESSION",
    "implicit": "IMPLICIT_EXPRESSION", "semantic": "SEMANTIC", "relational": "RELATIONAL",
}
GAP_TYPE = {
    "STRUCTURAL": "Structural Gap", "EXPLICIT_EXPRESSION": "Explicit Expression Gap",
    "IMPLICIT_EXPRESSION": "Implicit Expression Gap", "SEMANTIC": "Semantic Gap",
    "RELATIONAL": "Relational (Reasoning) Gap",
}
# Cara's risk multipliers, by category (her Layer-5 mapping).
RISK_MULT = {"STRUCTURAL": 0.9, "EXPLICIT_EXPRESSION": 1.0, "IMPLICIT_EXPRESSION": 1.0,
             "SEMANTIC": 1.1, "RELATIONAL": 1.1}
RISK_HIGH, RISK_MEDIUM = 8.0, 6.0  # priority_score bands → risk_level

# --- volume / signal tuning -------------------------------------------------
# Keep the list short and high-signal. A gap survives the final filter only if
# it is team-validated (confirmed / from the ledger) OR scores at/above the
# Medium band. The list is then capped, always keeping team-validated gaps.
MIN_PRIORITY = RISK_MEDIUM          # drop Low-band detected gaps
MAX_GAPS = 25                       # hard cap on the surfaced list
LEDGER_CAP = 8                      # cap raw ledger echoes so detector findings aren't drowned
SEM_PER_PAGE = 1                    # at most 1 semantic gap per page
SEM_MIN_SEVERITY = 7.0              # only surface materially-important semantic gaps
DROP_IMPORTANCE = {"minor"}         # don't report missing low-value sections (e.g. Sources)

# Required sections per page type — derived from CLAUDE.md page templates.
# Each: (section, importance) where importance sets base severity.
# Date/Status/Owner/Deciders may appear as **Field:** metadata lines, not headings.
SCHEMA: dict[str, list[tuple[str, str]]] = {
    "decisions": [
        ("Context", "normal"), ("Decision", "core"), ("Rationale", "core"),
        ("Alternatives considered", "core"), ("Consequences", "normal"), ("Sources", "minor"),
    ],
    "meetings": [
        ("Agenda", "normal"), ("Decisions made", "core"), ("Action items", "core"), ("Sources", "minor"),
    ],
    "concepts": [
        ("Definition", "core"), ("Role in this project", "normal"), ("Sources", "minor"),
    ],
    "deliverables": [
        ("Description", "normal"), ("Acceptance criteria", "core"), ("Progress", "normal"), ("Sources", "minor"),
    ],
    "entities": [
        ("About", "core"), ("Involvement", "normal"), ("Sources", "minor"),
    ],
}
META_REQUIRED = {  # required fields that legitimately live as **Field:** metadata lines
    "decisions": ["Status", "Date", "Deciders"],
    "deliverables": ["Status", "Owner", "Due"],
    "meetings": ["Attendees", "Type"],
    "entities": ["Type"],
    "concepts": [],
}
IMPORTANCE_SEV = {"core": 7.0, "normal": 5.0, "minor": 3.0}


# --- parsing ----------------------------------------------------------------
def _title(content: str, path: str) -> str:
    m = H1.search(content)
    return m.group(1).strip() if m else path.rsplit("/", 1)[-1][:-3].replace("-", " ").title()

def _slug(path: str) -> str:
    return path.rsplit("/", 1)[-1][:-3]

def _ptype(path: str) -> str:
    return path.split("/")[0] if "/" in path else "root"

def _sections(content: str) -> dict[str, str]:
    out, cur, buf = {}, None, []
    for line in content.splitlines():
        h = re.match(r"^##\s+(.+?)\s*$", line)
        if h:
            if cur is not None:
                out[cur] = "\n".join(buf).strip()
            cur, buf = h.group(1).strip(), []
        elif cur is not None:
            buf.append(line)
    if cur is not None:
        out[cur] = "\n".join(buf).strip()
    return out

def _has(sections: dict[str, str], name: str) -> bool:
    nl = name.lower()
    return any(nl in s.lower() or s.lower() in nl for s in sections)

def _meta_fields(content: str) -> set[str]:
    return {m.group(1).strip().lower() for m in META.finditer(content)}


# --- gap builder + scoring (Cara's formula + score banding) -----------------
def _score(severity: float, impact: float, category: str, frequency: int = 1) -> tuple[float, str]:
    freq_norm = min(frequency / 5.0, 1.0) * 10.0
    raw = 0.45 * severity + 0.40 * impact + 0.15 * freq_norm
    final = round(raw * RISK_MULT.get(category, 1.0), 3)
    level = "High" if final >= RISK_HIGH else "Medium" if final >= RISK_MEDIUM else "Low"
    return final, level

def _gap(category: str, page: dict, section, description, recommendation, root_cause,
         severity, impact, layer, evidence, provenance="detected", confidence=0.95, **ev_extra) -> dict:
    final, level = _score(severity, impact, category)
    return {
        "gap_id": str(uuid.uuid4()), "gap_category": category, "gap_type": GAP_TYPE[category],
        "document_id": page["path"], "document_title": page["title"],
        "affected_document_section": section, "description": description,
        "evidence_sources": [{"source_layer": layer, "description": evidence, **ev_extra}],
        "severity": severity, "impact": impact, "confidence": confidence, "frequency": 1,
        "final_score": final, "risk_level": level, "priority_score": final,
        "affected_entities": [], "root_cause": root_cause, "recommendation": recommendation,
        "llm_reasoning": None, "provenance": provenance,
    }


# --- Layer 1 — schema-aware structural + explicit ---------------------------
def layer1(page: dict) -> list[dict]:
    ptype, sections, content = _ptype(page["path"]), _sections(page["content"]), page["content"]
    metas = _meta_fields(content)
    gaps: list[dict] = []

    for field in META_REQUIRED.get(ptype, []):
        if field.lower() not in metas and not _has(sections, field):
            gaps.append(_gap(
                CATEGORY["structural"], page, field,
                f"Missing the “{field}” field expected for a {ptype[:-1]} page.",
                f"Add a **{field}:** line near the top of “{page['title']}”.",
                "Required metadata for this page type isn't recorded.", 4.5, 4.0,
                "rule_based", f"No “{field}” metadata or section found.", missing_fields=[field]))

    for name, importance in SCHEMA.get(ptype, []):
        if importance in DROP_IMPORTANCE:
            continue
        if not _has(sections, name):
            sev = IMPORTANCE_SEV[importance]
            gaps.append(_gap(
                CATEGORY["structural"], page, name,
                f"Missing the “{name}” section expected for a {ptype[:-1]} page.",
                f"Add a “## {name}” section to “{page['title']}”.",
                f"The page's template (CLAUDE.md) requires a “{name}” section.", sev, sev,
                "rule_based", f"Required “{name}” section not present.", missing_fields=[name]))

    # explicit: placeholders / TODO markers in real sections
    for sec, body in sections.items():
        if PLACEHOLDER in body.lower():
            gaps.append(_gap(
                CATEGORY["explicit"], page, sec,
                f"The “{sec}” section is still a placeholder.",
                f"Replace the “{sec}” placeholder in “{page['title']}” with real content.",
                "Section was scaffolded but never filled in.", 6.0, 5.5,
                "rule_based", f"“{PLACEHOLDER}” found in “{sec}”.", matched_keyword=PLACEHOLDER))
        else:
            m = TODO_RE.search(body)
            if m:
                gaps.append(_gap(
                    CATEGORY["explicit"], page, sec,
                    f"“{sec}” contains an open marker ({m.group(0)}).",
                    f"Resolve the “{m.group(0)}” in the “{sec}” section of “{page['title']}”.",
                    "An explicit unfinished marker remains.", 5.0, 4.5,
                    "rule_based", body[max(0, m.start()-30):m.end()+30].strip(), matched_keyword=m.group(0)))
    return gaps


# --- Layer 3 — wikilink-graph relational ------------------------------------
def layer3(page: dict, all_slugs: set[str], inbound: dict[str, int]) -> list[dict]:
    gaps: list[dict] = []
    slug = page["slug"]
    # dangling links
    for tgt in {m.group(1).strip() for m in WIKILINK.finditer(page["content"])}:
        if WIKI_SLUG.match(tgt) and tgt not in all_slugs and tgt not in META_SLUGS:
            gaps.append(_gap(
                CATEGORY["relational"], page, None,
                f"Links to [[{tgt}]], which has no page.",
                f"Create the “{tgt}” page or fix the [[{tgt}]] link in “{page['title']}”.",
                "A cross-reference points at a page that doesn't exist.", 8.5, 8.0,
                "graph", f"[[{tgt}]] referenced from {page['path']} resolves to nothing.", matched_keyword=tgt))
    # orphan page (skip the overview root + meta)
    if slug not in META_SLUGS and inbound.get(slug, 0) == 0:
        gaps.append(_gap(
            CATEGORY["relational"], page, None,
            "No other page links to this one — it's disconnected.",
            f"Reference [[{slug}]] from a related page so “{page['title']}” is discoverable.",
            "Isolated knowledge is hard to find and easy to forget.", 6.0, 6.0,
            "graph", f"0 inbound [[links]] to {slug} across the wiki."))
    # decision pages must be linked from a concept/deliverable/entity (CLAUDE.md rule)
    if _ptype(page["path"]) == "decisions" and inbound.get(slug, 0) == 0:
        pass  # already covered by orphan rule above
    return gaps


# --- Layer 2 — grounded whole-page semantic LLM -----------------------------
SEM_SCHEMA = {
    "type": "object",
    "properties": {"gaps": {"type": "array", "items": {
        "type": "object",
        "properties": {
            "gap_type": {"type": "string", "enum": ["IMPLICIT_EXPRESSION", "SEMANTIC"]},
            "description": {"type": "string"},
            "evidence": {"type": "string"},
            "severity": {"type": "number"},
        },
        "required": ["gap_type", "description", "evidence", "severity"],
        "additionalProperties": False,
    }}},
    "required": ["gaps"],
    "additionalProperties": False,
}
SEM_SYSTEM = (
    "You are a knowledge-gap analyst for a SPECIFIC project wiki. You are given one wiki page "
    "plus a digest of what is ALREADY documented elsewhere in the same wiki (linked pages, the "
    "index, and the schema). Identify only GENUINELY missing essential project knowledge on THIS "
    "page that would hurt project risk, decisions, or knowledge retention.\n\n"
    "STRICT RULES:\n"
    "- Do NOT flag something as missing if it is defined or covered in the provided context digest.\n"
    "- Do NOT report writing style, formatting, or minor clarifications.\n"
    "- Report at MOST 1 gap for this page — only the single most important one — and return an "
    "empty list if the page is adequately covered. Most pages should return an empty list.\n"
    "- 'description' must be ONE concise sentence, max 20 words. No preamble, no restating the page.\n"
    "- IMPLICIT_EXPRESSION = missing assumption/precondition/dependency/rationale. "
    "SEMANTIC = contradiction, ambiguous commitment, or unclear decision.\n"
    "- severity is 0-10; only use ≥8 for gaps that genuinely block decisions or risk knowledge loss."
)

def _semantic_one(page: dict, digest: str, llm, model: str) -> list[dict]:
    try:
        msg = llm.messages.create(
            model=model, max_tokens=1500, system=SEM_SYSTEM,
            output_config={"format": {"type": "json_schema", "schema": SEM_SCHEMA}},
            messages=[{"role": "user", "content": (
                f"# Page: {page['title']} ({page['path']})\n\n{page['content'][:6000]}\n\n"
                f"---\n# Already documented elsewhere (do not re-flag):\n{digest[:4000]}"
            )}],
        )
        text = next((b.text for b in msg.content if b.type == "text"), None)
        items = (json.loads(text) if text else {}).get("gaps", [])
    except Exception:
        return []
    out = []
    for it in items[:SEM_PER_PAGE]:
        sev = float(it.get("severity", 6.0))
        if sev < SEM_MIN_SEVERITY:
            continue
        cat = CATEGORY["implicit"] if it.get("gap_type") == "IMPLICIT_EXPRESSION" else CATEGORY["semantic"]
        desc = " ".join(str(it.get("description", "")).split())
        out.append(_gap(
            cat, page, None, desc,
            "Add or clarify this on the page so the knowledge is captured.",
            "Essential project knowledge is not captured on this page.", sev, sev,
            "semantic", str(it.get("evidence", "")).strip() or "Whole-page analysis with cross-page context."))
    return out

def _digest_for(page: dict, by_slug: dict[str, dict], index_titles: str) -> str:
    """Cross-page context: titles+intros of pages this page links to, plus the index."""
    parts = [f"Wiki index (existing pages): {index_titles[:1500]}"]
    seen = set()
    for tgt in {m.group(1).strip() for m in WIKILINK.finditer(page["content"])}:
        if tgt in by_slug and tgt not in seen:
            seen.add(tgt)
            t = by_slug[tgt]
            intro = " ".join(t["content"].split()[:60])
            parts.append(f"[[{tgt}]] = {t['title']}: {intro}")
        if len(seen) >= 12:
            break
    return "\n".join(parts)


# --- Layer 4 — reconcile with the wiki's own gap ledger ---------------------
def layer4_ledger(pages_by_path: dict[str, dict], detected: list[dict]) -> list[dict]:
    """Surface open items from _gaps.md and _overview.md 'Open questions' as gaps
    (provenance=from_ledger), and mark detected gaps that match a ledger item as
    confirmed. The ledger is the team's curated ground truth."""
    ledger_items: list[tuple[str, str]] = []  # (text, source_path)

    gm = pages_by_path.get("_gaps.md")
    if gm:
        for line in gm["content"].splitlines():
            m = re.match(r"^\s*-\s*\[ \]\s*(.+)$", line)  # unchecked = still open
            if m:
                ledger_items.append((m.group(1).strip(), "_gaps.md"))

    ov = pages_by_path.get("_overview.md")
    if ov:
        sec = _sections(ov["content"]).get("Open questions", "")
        for line in sec.splitlines():
            t = line.lstrip("- ").strip()
            if t:
                ledger_items.append((t, "_overview.md"))

    def keywords(s: str) -> set[str]:
        return {w for w in re.findall(r"[a-z]{4,}", s.lower())}

    overview = pages_by_path.get("_overview.md") or {"path": "_overview.md", "title": "Project Overview"}
    gaps: list[dict] = []
    for text, src in ledger_items:
        kw = keywords(text)
        match = next((g for g in detected if len(kw & keywords(g["description"])) >= 3), None)
        if match:
            match["provenance"] = "confirmed"
            match["confidence"] = min(0.99, match["confidence"] + 0.03)
        else:
            page = {"path": src, "title": "Open gaps ledger" if src == "_gaps.md" else "Project Overview"}
            # _gaps.md line: **<type>** — <description> — source: … — flagged: …
            clean = re.sub(r"^\s*\*\*[^*]+\*\*\s*[—-]\s*", "", text)            # drop the **type** — prefix
            clean = re.split(r"\s+—\s+(?:source:|flagged:)", clean)[0]          # keep the description only
            clean = re.sub(r"\[\[|\]\]", "", clean).strip()
            g = _gap(
                CATEGORY["implicit"], page, None,
                f"Team-logged gap not yet resolved: {clean[:160]}",
                "Resolve this open item and tick it off in the wiki's gap ledger.",
                f"Tracked as open in {src} by the team.", 7.0, 7.0,
                "rule_based", text[:200], provenance="from_ledger", confidence=0.99)
            gaps.append(g)
    return gaps


# --- orchestrator -----------------------------------------------------------
def analyze(pages: list[dict], corpus_paths: set[str], llm=None, model: str = "claude-sonnet-4-6") -> dict:
    for p in pages:
        p["slug"] = _slug(p["path"]); p["title"] = _title(p["content"], p["path"])
    by_slug = {p["slug"]: p for p in pages}
    by_path = {p["path"]: p for p in pages}
    all_slugs = set(by_slug)
    index_titles = ", ".join(sorted(p["title"] for p in pages if p["slug"] not in META_SLUGS))

    inbound = {s: 0 for s in all_slugs}
    for p in pages:
        for tgt in {m.group(1).strip() for m in WIKILINK.finditer(p["content"])}:
            if tgt in inbound and tgt != p["slug"]:
                inbound[tgt] += 1

    corpus = [p for p in pages if p["path"] in corpus_paths]
    gaps: list[dict] = []

    # Layers 1 + 3 (deterministic)
    for page in corpus:
        gaps += layer1(page)
        gaps += layer3(page, all_slugs, inbound)

    # Layer 2 (grounded semantic LLM, concurrent, optional)
    if llm is not None:
        def run_one(page):
            return _semantic_one(page, _digest_for(page, by_slug, index_titles), llm, model)
        with ThreadPoolExecutor(max_workers=8) as ex:
            for res in ex.map(run_one, corpus):
                gaps += res

    # Layer 4 (ground-truth reconciliation)
    gaps += layer4_ledger(by_path, gaps)

    # Keep the list short and high-signal. Detected gaps must reach the Medium
    # band to survive. `confirmed` (detector + ledger agree) and `detected`
    # findings are kept first; raw ledger echoes get a smaller sub-cap so they
    # don't drown the detector's own findings. Then cap the whole list.
    by_prio = lambda g: g["priority_score"]
    confirmed = sorted((g for g in gaps if g["provenance"] == "confirmed"), key=by_prio, reverse=True)
    detected = sorted((g for g in gaps if g["provenance"] == "detected" and g["priority_score"] >= MIN_PRIORITY),
                      key=by_prio, reverse=True)
    ledger = sorted((g for g in gaps if g["provenance"] == "from_ledger"), key=by_prio, reverse=True)[:LEDGER_CAP]
    gaps = (confirmed + detected + ledger)[:MAX_GAPS]
    gaps.sort(key=by_prio, reverse=True)
    counts = {"High": 0, "Medium": 0, "Low": 0}
    for g in gaps:
        counts[g["risk_level"]] += 1
    return {
        "report_id": str(uuid.uuid4()), "job_id": str(uuid.uuid4()),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "documents_analyzed": sorted(corpus_paths),
        "total_gaps": len(gaps),
        "high_risk_count": counts["High"], "medium_risk_count": counts["Medium"], "low_risk_count": counts["Low"],
        "gaps": gaps,
        "pipeline_metadata": {"engine": "wiki-native-v2", "layers": "schema · semantic(grounded) · graph · ledger"},
    }
