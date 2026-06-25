# The Living Project Wiki

A GenAI system that turns the heterogeneous artefacts of a project — meeting notes,
design decisions, code, and presentations — into a **structured, cross-referenced,
continuously-updated knowledge base**.

Built as a BSc Business Analytics thesis with **KickstartAI**. Inspired by Andrej
Karpathy's [*LLM wiki*](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
pattern: instead of having a language model re-read raw documents on every query (as
conventional RAG does), the system **compiles knowledge once** into a persistent wiki and
keeps it updated — so understanding accumulates over a project's life rather than being
rediscovered on each question.

---

## Architecture

<p align="center">
  <img src="figure2-three-layer-architecture.svg" alt="Three-layer architecture of the Living Project Wiki" width="820">
</p>

The system is built on a **schema-governed, three-layer architecture** that strictly
separates data, knowledge, and configuration:

- **Layer 1 — Sources** (`/sources`): the raw project artefacts. Immutable; the LLM only
  reads them, preserving a verifiable ground truth.
- **Layer 2 — Wiki** (`/wiki`): the LLM-generated, cross-referenced Markdown pages
  (entities, decisions, concepts, meetings, deliverables). Owned by the agent — you read
  it, it writes it.
- **Layer 3 — Schema** (`CLAUDE.md`): the configuration that governs how the agent reads
  documents and maintains the wiki — page templates, operation workflows, and
  cross-referencing conventions.

An LLM agent performs four operations: **Ingest** (compile a source into wiki pages),
**Query** (answer questions from the wiki), **Generate** (digests, onboarding summaries,
reports), and **Lint** (wiki health check).

---

## Repository structure

```
.
├── CLAUDE.md              # Layer 3 — the schema that governs the agent
├── backend/              # FastAPI backend (the four operations, powered by the Anthropic API)
├── frontend/             # React + TypeScript + Vite single-page app
├── sources/              # Layer 1 — raw sources, one subtree per project (e.g. sources/uva/)
├── wiki/                 # Layer 2 — generated wiki, one subtree per project (e.g. wiki/uva/)
├── permission-layer/     # Access-control assets (per-project blacklists)
├── evaluation/           # Wiki-vs-raw-context experiment (conditions, metrics, question set)
├── access_labels.json    # Permission labels per document / wiki page
├── audit_log.md          # Permission-layer self-audit trail
└── token_usage.md        # Per-ingest token / cost ledger
```

---

## Local setup

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**
- An **Anthropic API key** ([console.anthropic.com](https://console.anthropic.com))

### 1. Clone and configure

```bash
git clone https://github.com/Lruckens/kickstartai-living-wiki-multi.git
cd kickstartai-living-wiki-multi
cp .env.example .env          # then open .env and set ANTHROPIC_API_KEY
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate    # optional but recommended
pip install -r requirements.txt
uvicorn main:app --reload --port 8010
```

The API is now running at **http://localhost:8010**.

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (default **http://localhost:5173**). The frontend talks to the
backend at `http://localhost:8010` — override with `VITE_BACKEND_URL` if needed.

---

## Using the app

- **Ingest** — add a `.md` / `.pdf` source to `sources/<project>/` (or upload it in the UI);
  the agent reads it and compiles it into cross-referenced wiki pages.
- **Query** — ask a question; the system retrieves the relevant wiki pages and answers with
  citations.
- **Generate** — produce a weekly digest, onboarding summary, progress report, or LinkedIn
  draft for a chosen audience.
- **Lint** — run a wiki health check (contradictions, orphan pages, gaps).

---

## Permission layer

Controls who can see what, from the moment a document is uploaded to the moment a
generated page is shared:

- When you upload a document, you choose who can see it — everyone, the KickstartAI team,
  or just one project. That choice carries through to every wiki page generated from it.
- Every wiki page shows its visibility at a glance, so it's never ambiguous who's allowed
  to read it.
- Before generating a digest, summary, or LinkedIn draft, you choose the audience, and the
  system only draws on content that audience is allowed to see.
- Every generated page is checked automatically before it's shared. If it accidentally
  includes something the audience shouldn't see, it's held back for a person to review
  instead of being published.
- A read-only history records every check that's ever run — what was shared, what was held
  back, and why — so the system stays auditable over time.

---

## Evaluation

The evaluation harness compares answering from the compiled wiki against answering from raw
source context (conditions C0–C2g; correctness via a cross-model LLM judge plus RAGAS
diagnostics).

```bash
pip install -r evaluation/requirements.txt
python evaluation/run_eval.py --project uva
```

See [`evaluation/README.md`](evaluation/README.md) for the full design, conditions, metrics,
and question set.

---

## Acknowledgements

- **KickstartAI** — the Dutch applied-AI non-profit this project was built with.
- **UvA AI4Business Lab** — academic home of the thesis.
- Andrej Karpathy — for the *LLM wiki* pattern that inspired the approach.

Powered by [Claude](https://www.anthropic.com/claude) (Anthropic API).
---

## Gap Detector

The gap detector is a post-ingestion pipeline that analyses wiki documents for missing, incomplete, inconsistent, and disconnected knowledge. It runs six sequential layers — content normalisation, rule-based checks, semantic embedding, LLM evaluation, graph analysis, and classification & scoring — and produces a ranked report of detected gaps.

Each gap is scored using:
FinalScore = (0.45 × Severity + 0.40 × Impact + 0.15 × Frequency) × Category_Risk_Multiplier

Five gap categories are detected: **Structural** (missing sections), **Explicit Expression** (empty sections), **Implicit Expression** (decisions without rationale), **Relational** (orphan pages, broken links), and **Semantic** (isolated or contradictory documents).

In the app, the gap detector is exposed as a **Gaps** tab. Results are reconciled against `wiki/_gaps.md` — the team-maintained ledger — and each gap is tagged as *detected*, *confirmed*, or *team-logged*.


