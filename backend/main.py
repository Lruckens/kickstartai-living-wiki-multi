from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from anthropic import Anthropic
from dotenv import load_dotenv
import os, json, shutil, re, subprocess, tempfile
from pathlib import Path
from datetime import date as dt_date, datetime
from pathlib import Path
import os
import json
from typing import Optional
import re

from wiki_reader import read_wiki_context
import permission

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

BASE_DIR    = Path(__file__).parent.parent
WIKI_DIR    = BASE_DIR / "wiki"        # one subtree per project: wiki/<project>/
SOURCES_DIR = BASE_DIR / "sources"     # one subtree per project: sources/<project>/
SOURCE_DIR  = SOURCES_DIR              # legacy alias
WIKI_DIR.mkdir(exist_ok=True)
SOURCES_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Living Wiki Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def project_dirs(project: Optional[str]) -> tuple[Path, Path]:
    """(wiki_dir, sources_dir) for a project subtree; validates the project id.

    Each project lives in its own subtree — wiki/<project>/ and sources/<project>/ —
    so multiple projects (e.g. uva + bakkie) coexist in one repo with separate
    index/_overview/_gaps and separate source folders."""
    if not project or project not in permission.PROJECTS:
        raise HTTPException(status_code=400, detail="Please choose a valid project.")
    return WIKI_DIR / project, SOURCES_DIR / project


# ---------------------------------------------------------------------------
# Authentication (dummy accounts — see permission.py)
# ---------------------------------------------------------------------------

def current_user(x_session_token: Optional[str] = Header(default=None)) -> dict:
    user = permission.user_for_token(x_session_token)
    if user is None:
        raise HTTPException(status_code=401, detail="Please log in to continue.")
    return user


def team_member(user: dict = Depends(current_user)) -> dict:
    if user["tier"] != "internal":
        raise HTTPException(
            status_code=403,
            detail="This area is for KickstartAI team members.",
        )
    return user


class LoginRequest(BaseModel):
    email: str
    password: str


@app.post("/auth/login")
def auth_login(req: LoginRequest):
    session = permission.login(req.email, req.password)
    if session is None:
        raise HTTPException(status_code=401, detail="That email and password don't match.")
    return session


@app.post("/auth/logout")
def auth_logout(x_session_token: Optional[str] = Header(default=None)):
    permission.logout(x_session_token or "")
    return {"ok": True}


@app.get("/me")
def me(user: dict = Depends(current_user)):
    return permission.public_user(user)


@app.get("/projects")
def projects(user: dict = Depends(current_user)):
    return {
        "all": list(permission.PROJECTS.values()),
        "mine": [permission.PROJECTS[p] for p in user["projects"]],
    }


@app.get("/audit-log")
def audit_log(user: dict = Depends(team_member)):
    return permission.read_audit_log()


# ---------------------------------------------------------------------------
# Gap Detector — single integrated engine (see wiki_gaps.py), runs IN-PROCESS.
# Cara's 6-layer design (same taxonomy / scoring / GapReport shape), with every
# detection layer grounded in this wiki's CLAUDE.md schema, [[link]] graph, and
# _gaps.md ledger (no separate pipeline copy is kept).
# Async job + poll (the grounded semantic layer makes one LLM call per page).
# ---------------------------------------------------------------------------
import hashlib
import uuid
from fastapi import BackgroundTasks
import wiki_gaps

GAP_CORPUS_DIRS = ("concepts", "decisions", "entities", "meetings", "deliverables")
GAP_CORPUS_ROOT_FILES = ("_overview.md",)
_gap_jobs: dict[str, dict] = {}  # job_id -> {status, report?, error?}


def _all_wiki_pages(project: str) -> list[dict]:
    """Every page {path, content} in a project's subtree — paths are PROJECT-RELATIVE
    (e.g. decisions/foo.md) so the detector's category + ledger logic works unchanged."""
    wdir = WIKI_DIR / project
    return [{"path": "/".join(p.relative_to(wdir).parts),
             "content": p.read_text(encoding="utf-8")}
            for p in sorted(wdir.rglob("*.md"))]


def _gap_corpus_paths(user: dict, project: str) -> set[str]:
    """Project-relative paths to report gaps on (permission-filtered)."""
    wdir = WIKI_DIR / project
    paths = set()
    for rf in GAP_CORPUS_ROOT_FILES:
        if (wdir / rf).exists() and permission.user_can_see(permission.page_access(f"{project}/{rf}"), user):
            paths.add(rf)
    for d in GAP_CORPUS_DIRS:
        for p in sorted((wdir / d).glob("*.md")):
            rel = f"{d}/{p.name}"
            if permission.user_can_see(permission.page_access(f"{project}/{rel}"), user):
                paths.add(rel)
    return paths


def _wiki_version(pages: list[dict], corpus_paths: set[str]) -> str:
    h = hashlib.sha256()
    for page in sorted((p for p in pages if p["path"] in corpus_paths), key=lambda d: d["path"]):
        h.update(page["path"].encode()); h.update(b"\0")
        h.update(page["content"].encode()); h.update(b"\0")
    return h.hexdigest()[:16]


def _run_wiki_gaps(job_id: str, pages: list[dict], corpus_paths: set[str]) -> None:
    try:
        report = wiki_gaps.analyze(pages, corpus_paths, llm=client, model="claude-sonnet-4-6")
        _gap_jobs[job_id] = {"status": "completed", "report": report}
    except Exception as e:
        _gap_jobs[job_id] = {"status": "failed", "error": str(e)}


@app.get("/gaps/health")
def gaps_health(user: dict = Depends(team_member)):
    return {"available": bool(os.getenv("ANTHROPIC_API_KEY")), "mode": "wiki-native-v2"}


@app.get("/gaps/version")
def gaps_version(project: str, user: dict = Depends(team_member)):
    project_dirs(project)
    return {"wiki_version": _wiki_version(_all_wiki_pages(project), _gap_corpus_paths(user, project))}


@app.post("/gaps/analyze")
def gaps_analyze(project: str, background_tasks: BackgroundTasks, user: dict = Depends(team_member)):
    if not os.getenv("ANTHROPIC_API_KEY"):
        raise HTTPException(503, "Gap analysis is not configured (missing API key).")
    project_dirs(project)
    pages = _all_wiki_pages(project)
    corpus_paths = _gap_corpus_paths(user, project)
    if not corpus_paths:
        raise HTTPException(400, "No wiki pages available to analyse.")
    version = _wiki_version(pages, corpus_paths)
    job_id = str(uuid.uuid4())
    _gap_jobs[job_id] = {"status": "processing"}
    background_tasks.add_task(_run_wiki_gaps, job_id, pages, corpus_paths)
    return {"job_id": job_id, "wiki_version": version, "documents_analyzed": len(corpus_paths)}


@app.get("/gaps/report/{job_id}")
def gaps_report(job_id: str, user: dict = Depends(team_member)):
    job = _gap_jobs.get(job_id)
    if job is None:
        raise HTTPException(404, "That analysis job was not found.")
    if job["status"] == "processing":
        return {"status": "processing"}
    if job["status"] == "failed":
        raise HTTPException(502, "The gap analysis could not be completed.")
    return {"status": "completed", "report": job["report"]}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def read_all_wiki(project: Optional[str] = None) -> str:
    """Concatenated wiki context. Scoped to one project's subtree when given."""
    base = (WIKI_DIR / project) if project else WIKI_DIR
    prefix = f"wiki/{project}/" if project else "wiki/"
    parts = []
    for path in sorted(base.rglob("*.md")):
        rel = path.relative_to(base)
        try:
            parts.append(f"=== {prefix}{rel} ===\n{path.read_text(encoding='utf-8')}")
        except Exception:
            pass
    return "\n\n".join(parts)


RETRIEVAL_MODEL = "claude-sonnet-4-6"   # index→page selection (whole system on Sonnet)


def retrieve_wiki_context(project: str, question: str, user: dict, k: int = 8):
    """Interactive-mode Query (per CLAUDE.md): read the index/catalog, pick the relevant
    pages, return ONLY those as context — instead of dumping the whole wiki. Permission-aware
    (only pages the reader may see enter the catalog). Returns (context, [page_paths])."""
    wdir = WIKI_DIR / project
    catalog = []
    for p in sorted(wdir.rglob("*.md")):
        rel = "/".join(p.relative_to(wdir).parts)
        if not permission.user_can_see(permission.page_access(f"{project}/{rel}"), user):
            continue
        txt = p.read_text(encoding="utf-8")
        title = next((l[2:].strip() for l in txt.splitlines() if l.startswith("# ")), p.stem)
        catalog.append((rel, title))
    if not catalog:
        return "", []
    listing = "\n".join(f"{rel} — {title}" for rel, title in catalog)
    sel = client.messages.create(
        model=RETRIEVAL_MODEL, max_tokens=400,
        messages=[{"role": "user", "content": (
            f"From this wiki page catalog, choose the file paths most relevant to answering the "
            f"question. Return ONLY a JSON array of up to {k} paths, most relevant first.\n\n"
            f"## Catalog\n{listing}\n\n## Question\n{question}"
        )}],
    )
    raw = next((b.text for b in sel.content if b.type == "text"), "[]")
    m = re.search(r"\[.*\]", raw, re.DOTALL)
    try:
        paths = json.loads(m.group(0)) if m else []
    except Exception:
        paths = []
    valid = {rel for rel, _ in catalog}
    paths = [p for p in paths if p in valid][:k]
    ctx = "\n\n".join(f"=== {project}/{rel} ===\n{(wdir / rel).read_text(encoding='utf-8')}" for rel in paths)
    return ctx, paths


def read_source_file(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix == ".pdf":
        try:
            import pdfplumber
            with pdfplumber.open(path) as pdf:
                return "\n\n".join(
                    page.extract_text() or "" for page in pdf.pages
                ).strip()
        except Exception as e:
            return f"[PDF read error: {e}]"
    if suffix in (".md", ".txt", ".py", ".js", ".ts"):
        return path.read_text(encoding="utf-8")
    return f"[Binary file — {path.suffix} — cannot display as text]"


def sse(payload: dict) -> str:
    return f"data: {json.dumps(payload)}\n\n"


def git_push_wiki_to_main(commit_msg: str, extra_source: Optional[str] = None) -> None:
    """Commit the current wiki/ (and optionally a source file) to main via a
    temporary git worktree. Used by both ingest and lint."""
    # Fetch so origin/main is current
    subprocess.run(
        ["git", "fetch", "origin", "main"],
        cwd=BASE_DIR, check=True, capture_output=True,
    )

    with tempfile.TemporaryDirectory() as tmp:
        wt = Path(tmp) / "wt"
        subprocess.run(
            ["git", "worktree", "add", str(wt), "origin/main"],
            cwd=BASE_DIR, check=True, capture_output=True,
        )
        try:
            # Copy wiki directory into the worktree
            shutil.copytree(WIKI_DIR, wt / "wiki", dirs_exist_ok=True)
            # Copy the source file as well, when ingesting one (extra_source is
            # project-relative, e.g. "bakkie/notes.pdf").
            if extra_source:
                src = SOURCES_DIR / extra_source
                if src.exists():
                    dest = wt / "sources" / extra_source
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(src, dest)

            subprocess.run(["git", "add", "wiki/"], cwd=wt, check=True, capture_output=True)
            if extra_source:
                subprocess.run(["git", "add", f"sources/{extra_source}"], cwd=wt, check=False, capture_output=True)

            # Nothing staged → nothing to do
            if subprocess.run(["git", "diff", "--staged", "--quiet"], cwd=wt).returncode == 0:
                return

            subprocess.run(
                ["git", "-c", "user.name=Wiki Bot", "-c", "user.email=wiki-bot@kickstartai.nl",
                 "commit", "-m", commit_msg],
                cwd=wt, check=True, capture_output=True,
            )
            subprocess.run(
                ["git", "push", "origin", "HEAD:main"],
                cwd=wt, check=True, capture_output=True,
            )
        finally:
            subprocess.run(
                ["git", "worktree", "remove", "--force", str(wt)],
                cwd=BASE_DIR, capture_output=True,
            )


# ---------------------------------------------------------------------------
# Generate (existing)
# ---------------------------------------------------------------------------

class GenerateRequest(BaseModel):
    output_id: str
    progress_variant: str
    stakeholder_name: str
    stakeholder_role: str
    tone: int
    length: int
    include: list[str] = []
    exclude: list[str] = []
    output_title: str
    project_scope: Optional[str] = None  # restricted-project scope (optional)


def build_prompt(req: GenerateRequest, wiki_context: str) -> str:
    tone_desc = (
        "formal and professional" if req.tone < 35
        else "conversational and approachable" if req.tone > 65
        else "balanced in tone"
    )
    length_desc = (
        "brief and concise (short)" if req.length < 35
        else "detailed and in-depth (long)" if req.length > 65
        else "moderate in length"
    )
    variant_map = {
        "progress-tech": "Technical angle",
        "progress-business": "Business angle",
        "progress-comms": "Communication angle",
    }
    variant_label = f" — {variant_map[req.progress_variant]}" if req.output_id == "progress" else ""
    output_label  = f"{req.output_title}{variant_label}"
    include_note  = f"\nMust include these topics: {', '.join(req.include)}." if req.include else ""
    exclude_note  = f"\nMust exclude: {', '.join(req.exclude)}." if req.exclude else ""

    return f"""You are the generator module of the KickstartAI Living Project Wiki system. \
Your task is to produce a realistic, high-quality communication output drawn from the project wiki.

## Project wiki context
{wiki_context}

## Generation request
Output type: {output_label}
Intended audience: {req.stakeholder_name} ({req.stakeholder_role})
Tone: {tone_desc}
Length: {length_desc}{include_note}{exclude_note}

## Instructions
Write the actual finished output — not a description of what it would say. \
No preamble, no meta-commentary, no "here is your draft". Start directly with the content.

Format it appropriately for the output type:
- LinkedIn draft: hook opening line, 2-3 short paragraphs, CTA. No markdown headers.
- Project / onboarding summary: use markdown headers (##), cover background, objectives, \
current status, key decisions, team.
- Progress report: use markdown headers (##), cover recent progress, key milestones, \
blockers, next steps. Angle matches the variant (technical / business / communication).
- Weekly digest: friendly intranet-style update, cover 2-3 project highlights from the \
past week, use bullet points, end with a what's-next note.
- Custom: follow the description and include/exclude constraints provided.

Make it specific, realistic, and genuinely useful to the {req.stakeholder_name}. \
Use concrete details from the wiki context above."""


TYPE_LABELS: dict[str, str] = {
    "linkedin": "linkedin-draft",
    "summary": "onboarding-summary",
    "progress": "progress-report",
    "digest": "weekly-digest",
}

VARIANT_LABELS: dict[str, str] = {
    "progress-tech": "technical",
    "progress-business": "business",
    "progress-comms": "communication",
}


class SaveRequest(BaseModel):
    output_id: str
    progress_variant: str
    stakeholder_name: str
    output_title: str
    generated_text: str
    pages: list[str] = []
    project_scope: Optional[str] = None
    audit_action: str = "publish"  # verdict from /generate; re-verified below


def _slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def _update_index(slug: str, title: str, output_type: str, date_str: str, project: str) -> None:
    index_path = WIKI_DIR / project / "index.md"
    content = index_path.read_text(encoding="utf-8") if index_path.exists() else ""
    entry = f"- [[{slug}]] — {title} — type: {output_type} — date: {date_str}\n"
    section_header = "## Generated outputs\n"

    if section_header in content:
        idx = content.index(section_header) + len(section_header)
        next_section = content.find("\n## ", idx)
        if next_section == -1:
            content = content.rstrip() + "\n" + entry
        else:
            content = content[:next_section] + entry + content[next_section:]
    else:
        content = content.rstrip() + "\n\n" + section_header + "\n" + entry

    content = re.sub(r"Last updated: \d{4}-\d{2}-\d{2}", f"Last updated: {date_str}", content)
    index_path.write_text(content, encoding="utf-8")


def _append_log(slug: str, output_type: str, variant: str, stakeholder: str, date_str: str, pages: list[str], project: str) -> None:
    log_path = WIKI_DIR / project / "log.md"
    pages_str = ", ".join(f"[[{Path(p).stem}]]" for p in pages) if pages else "none"
    entry = (
        f"\n## [{date_str}] generate | {output_type} — {stakeholder}\n\n"
        f"**File:** `wiki/{project}/generator/{slug}.md`\n"
        f"**Output type:** {output_type}\n"
        f"**Variant:** {variant}\n"
        f"**Stakeholder:** {stakeholder}\n"
        f"**Wiki pages consulted:** {pages_str}\n\n"
        f"---\n"
    )
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(entry)

# ---------------------------------------------------------------------------
# Routes — health, save & generate
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/save")
async def save(req: SaveRequest, project: str, user: dict = Depends(team_member)):
    project_dirs(project)
    # Saving is publishing — only audit-cleared drafts may be saved, and the
    # deterministic blacklist gate is re-run server-side.
    level = permission.target_level(req.output_id, req.project_scope)
    if req.audit_action != "publish":
        raise HTTPException(
            status_code=403,
            detail="This draft is waiting for a person to review it, so it can't be saved yet.",
        )
    hits = permission.blacklist_check(req.generated_text, level, req.project_scope)
    if hits:
        permission.append_audit_log(
            f"save:{req.output_id} ({req.output_title}) by {user['user_id']}", level,
            [{"text": h, "severity": "high", "reason": "blacklist hit at save time"} for h in hits[:10]],
            "blocked at save — blacklist hit",
        )
        raise HTTPException(
            status_code=403,
            detail="This draft contains information that can't be shared at this level, so it wasn't saved.",
        )

    today = dt_date.today().isoformat()
    slug = f"{today}-{_slugify(req.output_title)}"
    output_type = TYPE_LABELS.get(req.output_id, "custom")
    variant = VARIANT_LABELS.get(req.progress_variant, "N/A") if req.output_id == "progress" else "N/A"
    pages_inline = ", ".join(f"[[{Path(p).stem}]]" for p in req.pages) if req.pages else "_to be documented_"

    generator_dir = WIKI_DIR / project / "generator"
    generator_dir.mkdir(parents=True, exist_ok=True)

    output_path = generator_dir / f"{slug}.md"
    counter = 2
    while output_path.exists():
        output_path = generator_dir / f"{slug}-{counter}.md"
        counter += 1

    page_content = (
        f"# {req.output_title}\n\n"
        f"**Type:** {output_type}\n"
        f"**Variant:** {variant}\n"
        f"**Stakeholder:** {req.stakeholder_name}\n"
        f"**Generated:** {today}\n"
        f"**Wiki pages consulted:** {pages_inline}\n\n"
        f"## Output\n\n"
        f"{req.generated_text}\n\n"
        f"## Generation notes\n\n"
        f"_to be documented_\n"
    )
    output_path.write_text(page_content, encoding="utf-8")

    _update_index(output_path.stem, req.output_title, output_type, today, project)
    _append_log(output_path.stem, output_type, variant, req.stakeholder_name, today, req.pages, project)

    return {"path": f"wiki/{project}/generator/{output_path.name}", "slug": output_path.stem}


@app.post("/generate")
async def generate(req: GenerateRequest, project: str, user: dict = Depends(current_user)):
    if not os.getenv("ANTHROPIC_API_KEY"):
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not set in .env")
    project_dirs(project)

    # --- Permission layer: target level + access checks --------------------
    level = permission.target_level(req.output_id, req.project_scope)
    if level != "public" and user["tier"] != "internal":
        raise HTTPException(
            status_code=403,
            detail="This output type is only available to KickstartAI team members.",
        )
    if req.project_scope and req.project_scope not in user["projects"]:
        project = permission.PROJECTS.get(req.project_scope, {})
        raise HTTPException(
            status_code=403,
            detail=(
                f"You're not part of {project.get('name', 'this project')}, so its "
                f"content can't be used here. Ask the project lead for access, or "
                f"generate without the project scope."
            ),
        )

    # --- Layer 1: pre-filter the source pool before any LLM call -----------
    allowed_meta = permission.context_filter(level, req.project_scope, user)
    wiki_context, pages = read_wiki_context(
        req.output_id, req.progress_variant,
        allowed=lambda rel: allowed_meta(permission.page_access(f"{project}/{rel}")),
        base=WIKI_DIR / project,
    )
    if level == "public":
        # Input-side wrap: audience rules ride along with the filtered context
        wiki_context = (
            "## Audience rules (must follow)\n"
            "This output is for a PUBLIC audience. Do not include personal names, "
            "e-mail addresses, phone numbers, budget figures, or partner-confidential "
            "details. Refer to people by role only (e.g. 'the student team', 'our mentor').\n\n"
            + wiki_context
        )

    # --- Generation (unmodified) + Layer 2 self-audit ----------------------
    prompt = build_prompt(req, wiki_context)
    MAX_RETRIES = 2
    text, audit, attempt = None, None, 0
    for attempt in range(MAX_RETRIES + 1):
        try:
            message = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=16000,
                messages=[{"role": "user", "content": prompt}],
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        # Fable 5 responses start with a thinking block — take the first text block
        text = next((b.text for b in message.content if b.type == "text"), None)
        if text is None:
            raise HTTPException(
                status_code=500,
                detail=f"Generation returned no text (stop_reason: {message.stop_reason})",
            )

        try:
            audit = permission.audit_output(client, text, wiki_context, level, req.project_scope)
        except Exception as e:
            audit = {"action": "review", "spans": [{
                "text": "(check unavailable)", "severity": "medium",
                "reason": f"The safety check could not be completed: {e}",
            }]}
        if audit["action"] != "block":
            break
        flagged = "; ".join(s["text"][:60] for s in audit["spans"][:5])
        prompt = (
            build_prompt(req, wiki_context)
            + f"\n\nIMPORTANT: a previous draft was rejected because it contained: "
              f"{flagged}. Rewrite without this information or anything equivalent."
        )

    action_label = {
        "publish": "published",
        "review": "blocked — escalated to human review (MEDIUM)",
        "block": "blocked — HIGH severity persisted after retries",
    }[audit["action"]]
    permission.append_audit_log(
        f"generate:{req.output_id} ({req.output_title}) by {user['user_id']}",
        level, audit["spans"], action_label, retries=attempt,
    )

    audit_payload = {
        "action": audit["action"], "level": level,
        "retries": attempt, "flags": audit["spans"],
    }
    if audit["action"] == "block":
        return {"text": None, "pages": pages, "audit": audit_payload}
    return {"text": text, "pages": pages, "audit": audit_payload}


# ---------------------------------------------------------------------------
# Routes — wiki browser
# ---------------------------------------------------------------------------

@app.get("/wiki/pages")
def list_wiki_pages(project: str, user: dict = Depends(current_user)):
    wdir, _ = project_dirs(project)
    pages = []
    for path in sorted(wdir.rglob("*.md")):
        rel     = path.relative_to(wdir)          # project-relative, e.g. decisions/foo.md
        parts   = rel.parts
        full    = f"{project}/{'/'.join(parts)}"  # access-label key + /wiki/page path
        access  = permission.page_access(full)
        if not permission.user_can_see(access, user):
            continue
        category = parts[0] if len(parts) > 1 else "root"
        content  = path.read_text(encoding="utf-8")
        title = next(
            (line[2:].strip() for line in content.splitlines() if line.startswith("# ")),
            path.stem.replace("-", " ").title(),
        )
        pages.append({
            "path":       full,
            "title":      title,
            "category":   category,
            "slug":       path.stem,
            "access":     permission.access_badge(access),
            "label":      access.get("label", "internal"),
            "project":    project,
            "project_id": access.get("project_id"),
        })
    return pages


@app.get("/wiki/page")
def get_wiki_page(path: str, user: dict = Depends(current_user)):
    safe = (WIKI_DIR / path).resolve()
    if not str(safe).startswith(str(WIKI_DIR.resolve())) or safe.suffix != ".md":
        raise HTTPException(status_code=400, detail="Invalid path")
    if not safe.exists():
        raise HTTPException(status_code=404, detail="Page not found")
    if not permission.user_can_see(permission.page_access(path), user):
        raise HTTPException(status_code=403, detail="You don't have access to this page.")
    return {"content": safe.read_text(encoding="utf-8")}


# ---------------------------------------------------------------------------
# Routes — operations
# ---------------------------------------------------------------------------

@app.get("/sources")
def list_sources(project: str, user: dict = Depends(team_member)):
    _, sdir = project_dirs(project)
    skip = {".gitkeep"}
    if not sdir.exists():
        return []
    return [f.name for f in sorted(sdir.iterdir()) if f.is_file() and f.name not in skip]


@app.post("/sources/upload")
async def upload_source(
    file: UploadFile = File(...),
    project: str = Form(...),
    label: str = Form("internal"),
    user: dict = Depends(team_member),
):
    # `project` = which project the artefact belongs to (drives the source folder +
    # wiki subtree). `label` = visibility (public/internal/restricted) — orthogonal.
    if label not in ("public", "internal", "restricted"):
        raise HTTPException(400, "Unknown visibility option.")
    _, sdir = project_dirs(project)
    if project not in user["projects"]:
        raise HTTPException(403, "You can only add documents to your own projects.")
    project_id = project if label == "restricted" else None
    filename = Path(file.filename).name  # strip any path components
    sdir.mkdir(parents=True, exist_ok=True)
    safe = (sdir / filename).resolve()
    if not str(safe).startswith(str(sdir.resolve())):
        raise HTTPException(400, "Invalid filename")
    content = await file.read()
    safe.write_bytes(content)
    permission.set_source_access(f"{project}/{filename}", label, project_id)
    return {
        "filename": filename,
        "project": project,
        "access": permission.access_badge({"label": label, "project_id": project_id}),
    }


# --- Query ------------------------------------------------------------------

class QueryRequest(BaseModel):
    question: str

QUERY_SYSTEM = """You are the wiki maintainer for the KickstartAI Living Project Wiki.
Answer the user's question using only the wiki content provided.

Rules:
- Cite sources using [[page-slug]] inline links
- Be specific and concrete — reference actual decisions, meetings, people by name
- If the answer is not in the wiki, say so clearly
- Use markdown formatting (headers, bullet points) where it aids clarity"""


@app.post("/query")
async def query_wiki(req: QueryRequest, project: str, user: dict = Depends(team_member)):
    project_dirs(project)
    # Interactive-mode retrieval (CLAUDE.md): index → relevant pages, not the whole wiki.
    wiki, used_pages = retrieve_wiki_context(project, req.question, user)

    async def stream():
        yield sse({"type": "pages", "pages": used_pages})  # which pages were retrieved
        try:
            with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=16000,
                system=QUERY_SYSTEM,
                messages=[{"role": "user", "content": f"Retrieved wiki pages:\n\n{wiki}\n\n---\n\nQuestion: {req.question}"}],
            ) as s:
                for text in s.text_stream:
                    yield sse({"type": "text", "content": text})
                final = s.get_final_message()
            if final.stop_reason == "max_tokens":
                yield sse({"type": "text", "content": "\n\n> ⚠️ _Answer hit the token limit and was truncated._"})
            yield sse({"type": "done"})
        except Exception as e:
            yield sse({"type": "error", "message": str(e)})

    return StreamingResponse(stream(), media_type="text/event-stream")


class QuerySaveRequest(BaseModel):
    question: str
    answer: str


def _update_index_entry(section_header: str, entry: str, date_str: str, project: str) -> None:
    index_path = WIKI_DIR / project / "index.md"
    content = index_path.read_text(encoding="utf-8") if index_path.exists() else ""
    if section_header in content:
        idx = content.index(section_header) + len(section_header)
        next_section = content.find("\n## ", idx)
        if next_section == -1:
            content = content.rstrip() + "\n" + entry
        else:
            content = content[:next_section] + entry + content[next_section:]
    else:
        content = content.rstrip() + "\n\n" + section_header + "\n" + entry
    content = re.sub(r"Last updated: \d{4}-\d{2}-\d{2}", f"Last updated: {date_str}", content)
    index_path.write_text(content, encoding="utf-8")


@app.post("/query/save")
async def save_query(req: QuerySaveRequest, project: str, user: dict = Depends(team_member)):
    if not req.question.strip() or not req.answer.strip():
        raise HTTPException(400, "Nothing to save yet — ask a question first.")
    project_dirs(project)
    today = dt_date.today().isoformat()
    slug = f"{today}-{_slugify(req.question)[:60].rstrip('-')}"

    queries_dir = WIKI_DIR / project / "queries"
    queries_dir.mkdir(parents=True, exist_ok=True)
    output_path = queries_dir / f"{slug}.md"
    counter = 2
    while output_path.exists():
        output_path = queries_dir / f"{slug}-{counter}.md"
        counter += 1

    page_content = (
        f"# {req.question.strip()}\n\n"
        f"**Type:** saved query\n"
        f"**Asked by:** {user['name']}\n"
        f"**Date:** {today}\n\n"
        f"## Answer\n\n"
        f"{req.answer.strip()}\n"
    )
    output_path.write_text(page_content, encoding="utf-8")

    _update_index_entry(
        "## Saved queries\n",
        f"- [[{output_path.stem}]] — {req.question.strip()} — date: {today}\n",
        today,
        project,
    )
    log_entry = (
        f"\n## [{today}] query | {req.question.strip()}\n\n"
        f"**Answer format:** prose\n"
        f"**Pages consulted:** full wiki\n"
        f"**Filed to wiki:** yes → [[{output_path.stem}]]\n\n"
        f"---\n"
    )
    with open(WIKI_DIR / project / "log.md", "a", encoding="utf-8") as f:
        f.write(log_entry)

    return {"path": f"wiki/queries/{output_path.name}", "slug": output_path.stem}


# --- Lint -------------------------------------------------------------------

LINT_SYSTEM = """You are the wiki maintainer for the KickstartAI Living Project Wiki.
Run a comprehensive health check. Check for and report on each of the following:

1. **Contradictions** — claims on different pages that conflict with each other
2. **Stale content** — pages whose claims have been superseded by newer sources
3. **Orphan pages** — pages with no inbound [[links]] from any other wiki page
4. **Missing concept pages** — concepts mentioned across pages but lacking their own page
5. **Missing cross-references** — pages that should link to each other but don't
6. **Underdocumented decisions** — decision pages missing rationale or alternatives
7. **Unfilled gaps** — items in _gaps.md that could now be resolved
8. **Reuse opportunities** — patterns not yet captured in _reuse.md

Format your report with a section per category. Use checkboxes (- [ ]) for actionable items.
End with: new questions worth investigating, and new sources worth looking for."""


LINT_APPLY_SYSTEM = """You are the wiki maintainer for the KickstartAI Living Project Wiki.
You have just produced the health-check report below. Extract its structured outcome.

Return ONLY a JSON object:
{
  "summary": "one sentence summarising the wiki's health and main findings",
  "contradictions": <int>,
  "orphan_pages": ["page-slug", ...],
  "stale_pages": <int>,
  "reuse_opportunities": <int>,
  "new_gaps": [{"type": "<short gap type>", "description": "<one concise sentence>"}]
}

Only include gaps that are genuinely new and actionable; keep each description to one
sentence. Return an empty new_gaps list if the report surfaced nothing new to track."""

LINT_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "summary": {"type": "string"},
        "contradictions": {"type": "integer"},
        "orphan_pages": {"type": "array", "items": {"type": "string"}},
        "stale_pages": {"type": "integer"},
        "reuse_opportunities": {"type": "integer"},
        "new_gaps": {"type": "array", "items": {
            "type": "object",
            "properties": {"type": {"type": "string"}, "description": {"type": "string"}},
            "required": ["type", "description"], "additionalProperties": False,
        }},
    },
    "required": ["summary", "contradictions", "orphan_pages", "stale_pages",
                 "reuse_opportunities", "new_gaps"],
    "additionalProperties": False,
}


def apply_lint_results(result: dict, project: str) -> tuple[list[str], int]:
    """Append a lint entry to log.md and any new gaps to _gaps.md (append-only,
    deterministic — the LLM only classifies; Python writes). Returns (updated, n_gaps)."""
    today = dt_date.today().isoformat()
    updated: list[str] = []

    def words(s: str) -> set[str]:
        return {w for w in re.findall(r"[a-z]{4,}", s.lower())}

    # 1) _gaps.md — append new gaps not already tracked (dedupe by description overlap)
    gaps_added = 0
    gaps_path = WIKI_DIR / project / "_gaps.md"
    new_gaps = result.get("new_gaps") or []
    if new_gaps and gaps_path.exists():
        existing = gaps_path.read_text(encoding="utf-8")
        existing_items = [l for l in existing.splitlines() if l.strip().startswith("- [")]
        to_add: list[str] = []
        for g in new_gaps:
            desc = " ".join(str(g.get("description", "")).split())
            if not desc:
                continue
            dw = words(desc)
            if dw and any(len(dw & words(l)) >= max(3, len(dw) // 2) for l in existing_items):
                continue  # already tracked
            gtype = " ".join(str(g.get("type", "")).split()) or "lint finding"
            to_add.append(f"- [ ] **{gtype}** — {desc} — source: [[lint]] — flagged: {today}")
        if to_add:
            if not existing.endswith("\n"):
                existing += "\n"
            gaps_path.write_text(existing + "\n".join(to_add) + "\n", encoding="utf-8")
            gaps_added = len(to_add)
            updated.append("_gaps.md")

    # 2) log.md — append the lint entry (append-only)
    log_path = WIKI_DIR / project / "log.md"
    orphans = result.get("orphan_pages") or []
    orphan_str = ", ".join(f"[[{o}]]" for o in orphans) if orphans else "none"
    pages_updated = "[[log]]" + (", [[_gaps]]" if gaps_added else "")
    entry = (
        f"\n## [{today}] lint | Wiki health check\n\n"
        f"**Contradictions found:** {result.get('contradictions', 0)}\n"
        f"**Orphan pages:** {orphan_str}\n"
        f"**Stale pages:** {result.get('stale_pages', 0)}\n"
        f"**Gaps added:** {gaps_added}\n"
        f"**Reuse opportunities flagged:** {result.get('reuse_opportunities', 0)}\n"
        f"**Pages updated:** {pages_updated}\n"
        f"**Notes:** {result.get('summary', '').strip() or 'Health check run; see report.'}\n"
    )
    if log_path.exists():
        cur = log_path.read_text(encoding="utf-8")
        if not cur.endswith("\n"):
            cur += "\n"
        log_path.write_text(cur + entry, encoding="utf-8")
        updated.append("log.md")
    return updated, gaps_added


@app.post("/lint")
async def lint_wiki(project: str, user: dict = Depends(team_member)):
    project_dirs(project)
    wiki = read_all_wiki(project)
    report_parts: list[str] = []

    async def stream():
        # Phase 1 — stream the health-check report
        try:
            with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=16000,
                system=LINT_SYSTEM,
                messages=[{"role": "user", "content": f"Wiki content to audit:\n\n{wiki}"}],
            ) as s:
                for text in s.text_stream:
                    report_parts.append(text)
                    yield sse({"type": "text", "content": text})
                final = s.get_final_message()
            if final.stop_reason == "max_tokens":
                yield sse({"type": "text", "content": "\n\n> ⚠️ _Report hit the token limit and was truncated._"})
        except Exception as e:
            yield sse({"type": "error", "message": str(e)})
            return

        report = "".join(report_parts)

        # Phase 2 — log the lint + add new gaps to _gaps.md (per CLAUDE.md)
        yield sse({"type": "applying"})
        try:
            with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=4000,
                system=LINT_APPLY_SYSTEM,
                output_config={"format": {"type": "json_schema", "schema": LINT_RESULT_SCHEMA}},
                messages=[{"role": "user", "content": f"Health-check report:\n\n{report}"}],
            ) as a:
                chunks: list[str] = []
                for c in a.text_stream:
                    chunks.append(c)
                a.get_final_message()
            raw = "".join(chunks).strip()
            raw = re.sub(r"^```json\s*", "", raw)
            raw = re.sub(r"\s*```$", "", raw)
            result = json.loads(raw)
            updated, gaps_added = apply_lint_results(result, project)
            yield sse({"type": "applied", "created": [], "updated": updated})
        except Exception as e:
            yield sse({"type": "error", "message": f"Logging the lint failed: {e}"})
            yield sse({"type": "done"})
            return

        # Phase 3 — push log + gaps to main
        yield sse({"type": "pushing"})
        try:
            git_push_wiki_to_main(
                f"wiki: lint {project} ({gaps_added} gap{'s' if gaps_added != 1 else ''} added)"
            )
            yield sse({"type": "pushed"})
        except Exception as e:
            yield sse({"type": "push_error", "message": str(e)})

        yield sse({"type": "done"})

    return StreamingResponse(stream(), media_type="text/event-stream")


# --- Ingest -----------------------------------------------------------------

class IngestRequest(BaseModel):
    filename: str
    project: str


INGEST_ANALYSIS_SYSTEM = """You are the wiki maintainer for the KickstartAI Living Project Wiki.
A new source document has been provided. Analyse it and plan your wiki updates.

Work through these steps and write your reasoning:
1. Classify the document (meeting note, decision, research finding, stakeholder update, etc.)
2. List the key takeaways
3. Check for conflicts with existing wiki pages — flag any with "> ⚠️ Conflict noted:"
4. List which existing pages need updating and why
5. List which new pages need to be created and why
6. Note any new gaps to add to _gaps.md

Be thorough but concise. This is your planning pass — file changes will be applied next."""


INGEST_APPLY_SYSTEM = """You are the wiki maintainer for the KickstartAI Living Project Wiki.
Based on the analysis below, generate the exact wiki file changes needed.

Output ONLY a valid JSON object with this structure:
{
  "files": [
    {"path": "relative/path/from/wiki/root.md", "content": "full file content"}
  ]
}

Rules:
- Include COMPLETE file content (not diffs) for every file that needs creating or updating
- Always include an updated log.md entry (append — do not remove existing entries)
- Always include an updated index.md if pages were added
- Update _overview.md only if project direction/status changed materially
- Update _gaps.md if new gaps were found
- Use [[slug]] for all internal links
- Follow the page templates from CLAUDE.md exactly
- Output ONLY the JSON — no markdown, no explanation, no code fences"""


INGEST_FILES_SCHEMA = {
    "type": "object",
    "properties": {
        "files": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "path": {"type": "string"},
                    "content": {"type": "string"},
                },
                "required": ["path", "content"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["files"],
    "additionalProperties": False,
}


def apply_ingest_files(files: list[dict], project: str) -> tuple[list[str], list[str]]:
    """Write LLM-produced pages into the project's subtree (wiki/<project>/…).

    The model emits project-relative paths (decisions/foo.md, index.md); we write
    them under wiki/<project>/ and return full project-relative keys
    (<project>/decisions/foo.md) for the access-label store."""
    wdir = WIKI_DIR / project
    created, updated = [], []
    for f in files:
        raw_path = f.get("path", "").lstrip("/")
        if raw_path.startswith("wiki/"):
            raw_path = raw_path[len("wiki/"):]
        if raw_path.startswith(f"{project}/"):       # strip an accidental project prefix
            raw_path = raw_path[len(project) + 1:]
        content  = f.get("content", "")
        target   = (wdir / raw_path).resolve()
        # Security: must stay inside this project's wiki subtree
        if not str(target).startswith(str(wdir.resolve())):
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        existed = target.exists()
        target.write_text(content, encoding="utf-8")
        (updated if existed else created).append(f"{project}/{raw_path}")
    return created, updated


TOKEN_USAGE_FILE = BASE_DIR / "token_usage.md"
TOKEN_USAGE_HEADER = (
    "# Ingestion token usage\n\n"
    "Append-only ledger of Claude token usage per ingestion (read from the API `usage` "
    "field). `Total fed` = input + cache-read + cache-write — the true context size the "
    "model processed; prompt caching lowers the *bill*, not the context size.\n\n"
    "| Timestamp | Project | Source | Pages | Input | Output | Cache read | Cache write | Total fed |\n"
    "|---|---|---|---|---|---|---|---|---|\n"
)


def _usage_tokens(u) -> dict:
    """Pull token counts off an Anthropic usage object (missing fields → 0)."""
    if u is None:
        return {"input": 0, "output": 0, "cache_read": 0, "cache_write": 0}
    return {
        "input":       getattr(u, "input_tokens", 0) or 0,
        "output":      getattr(u, "output_tokens", 0) or 0,
        "cache_read":  getattr(u, "cache_read_input_tokens", 0) or 0,
        "cache_write": getattr(u, "cache_creation_input_tokens", 0) or 0,
    }


def record_ingest_usage(project: str, filename: str, n_pages: int, usages: list) -> dict:
    """Sum usage across the ingest's API calls, append a row to token_usage.md, return totals."""
    agg = {"input": 0, "output": 0, "cache_read": 0, "cache_write": 0}
    for u in usages:
        t = _usage_tokens(u)
        for k in agg:
            agg[k] += t[k]
    agg["total_fed"] = agg["input"] + agg["cache_read"] + agg["cache_write"]
    if not TOKEN_USAGE_FILE.exists():
        TOKEN_USAGE_FILE.write_text(TOKEN_USAGE_HEADER, encoding="utf-8")
    row = (f"| {datetime.now():%Y-%m-%d %H:%M} | {project} | {filename} | {n_pages} | "
           f"{agg['input']:,} | {agg['output']:,} | {agg['cache_read']:,} | "
           f"{agg['cache_write']:,} | {agg['total_fed']:,} |\n")
    with TOKEN_USAGE_FILE.open("a", encoding="utf-8") as fh:
        fh.write(row)
    return agg


@app.post("/ingest")
async def ingest_source(req: IngestRequest, user: dict = Depends(team_member)):
    wdir, sdir = project_dirs(req.project)
    if req.project not in user["projects"]:
        raise HTTPException(403, "You can only ingest into your own projects.")
    source_path = (sdir / req.filename).resolve()
    if not str(source_path).startswith(str(sdir.resolve())):
        raise HTTPException(400, "Invalid filename")
    if not source_path.exists():
        raise HTTPException(404, "Source file not found")

    source_access = permission.source_access(f"{req.project}/{req.filename}")
    if source_access.get("label") == "restricted" and \
            source_access.get("project_id") not in user["projects"]:
        raise HTTPException(403, "This document belongs to a project you're not part of.")

    source_content = read_source_file(source_path)
    wiki_context   = read_all_wiki(req.project)

    # The wiki + source is identical across both ingest phases (analysis, then apply), so send
    # it as one cached system block: the apply phase re-reads it from cache at ~10% cost
    # instead of paying the full prompt twice. Phase-specific instructions go in a second,
    # uncached system block after the breakpoint, so the cached prefix matches between calls.
    shared_context = (
        f"## Existing wiki\n\n{wiki_context}\n\n"
        f"---\n\n## Source document: {req.filename}\n\n{source_content}"
    )
    cached_context_block = {
        "type": "text", "text": shared_context,
        "cache_control": {"type": "ephemeral"},
    }

    analysis_parts: list[str] = []
    analysis_usage = None

    async def stream():
        nonlocal analysis_usage
        # Restricted document → refresh that project's protection list first
        if source_access.get("label") == "restricted" and source_access.get("project_id"):
            added = permission.update_blacklist(source_access["project_id"], source_content)
            yield sse({"type": "protection_updated", "added": added})

        # Phase 1 — stream analysis
        try:
            with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=16000,
                system=[cached_context_block,
                        {"type": "text", "text": INGEST_ANALYSIS_SYSTEM}],
                messages=[{
                    "role": "user",
                    "content": "Analyse the source document above against the existing wiki, and plan the wiki updates.",
                }],
            ) as s:
                for text in s.text_stream:
                    analysis_parts.append(text)
                    yield sse({"type": "text", "content": text})
                analysis_final = s.get_final_message()
                analysis_usage = analysis_final.usage
            if analysis_final.stop_reason == "max_tokens":
                yield sse({"type": "text", "content": "\n\n> ⚠️ _Analysis hit the token limit and was truncated._"})
        except Exception as e:
            yield sse({"type": "error", "message": str(e)})
            return

        # Phase 2 — apply file changes
        yield sse({"type": "applying"})
        analysis = "".join(analysis_parts)
        try:
            # NOTE: do NOT add output_config/structured-outputs here. It lives in the
            # `tools` layer of the prompt-cache key (above `system`), so it would stop this
            # phase from reading the analysis phase's cached wiki block — doubling the
            # ingest's input cost. JSON is enforced via INGEST_APPLY_SYSTEM + the fence-
            # stripping below instead. (Verified: with output_config, phase-2 cache_read=0.)
            with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=64000,
                system=[cached_context_block,
                        {"type": "text", "text": INGEST_APPLY_SYSTEM}],
                messages=[{
                    "role": "user",
                    "content": (
                        f"## Analysis (use this to decide what to write)\n\n{analysis}\n\n"
                        f"Now output the JSON file changes for the wiki above."
                    ),
                }],
            ) as apply_stream:
                apply_chunks: list[str] = []
                apply_chars  = 0
                last_emit    = 0
                for chunk in apply_stream.text_stream:
                    apply_chunks.append(chunk)
                    apply_chars += len(chunk)
                    if apply_chars - last_emit >= 300:
                        last_emit = apply_chars
                        yield sse({"type": "apply_progress", "chars": apply_chars})
                raw = "".join(apply_chunks).strip()
                final = apply_stream.get_final_message()
                apply_usage = final.usage
            if final.stop_reason == "max_tokens":
                raise ValueError(
                    f"output truncated at {apply_chars:,} chars — the wiki update was too large "
                    f"for the 64K token limit; retry, or ingest a smaller source"
                )
            # Strip accidental markdown fences
            raw = re.sub(r"^```json\s*", "", raw)
            raw = re.sub(r"\s*```$", "", raw)
            data    = json.loads(raw)
            created, updated = apply_ingest_files(data.get("files", []), req.project)
            # Pages created from this source inherit its visibility
            for page_path in created:
                permission.set_page_access(
                    page_path, source_access.get("label", "internal"),
                    source_access.get("project_id"),
                )
            yield sse({"type": "applied", "created": created, "updated": updated})
            # Record real token usage (both phases) to the append-only ledger + the UI
            usage = record_ingest_usage(
                req.project, req.filename, len(created) + len(updated),
                [analysis_usage, apply_usage],
            )
            yield sse({"type": "usage", **usage})
        except Exception as e:
            yield sse({"type": "error", "message": f"Apply phase failed: {e}"})
            yield sse({"type": "done"})
            return

        # Phase 3 — push to main
        yield sse({"type": "pushing"})
        try:
            n = len(created) + len(updated)
            msg = f"wiki: ingest {req.project}/{req.filename} ({n} page{'s' if n != 1 else ''})"
            git_push_wiki_to_main(msg, extra_source=f"{req.project}/{req.filename}")
            yield sse({"type": "pushed"})
        except Exception as e:
            yield sse({"type": "push_error", "message": str(e)})

        yield sse({"type": "done"})

    return StreamingResponse(stream(), media_type="text/event-stream")
