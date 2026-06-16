# Living Project Wiki x KickstartAI 

A self-maintaining knowledge base for KickstartAI projects, powered by Claude Code.
Drop in source documents and the LLM keeps the wiki current — summarising, cross-referencing, detecting gaps, and building institutional memory across projects.

---

## Background and Inspiration
This project is directly inspired by Andrej Karpathy's LLM Wiki pattern — a GitHub Gist he published in April 2026 describing a simple but powerful idea: instead of having an LLM re-read raw documents every time you ask a question (as RAG systems do), compile them once into a persistent, structured wiki and keep it updated forever. Knowledge compounds instead of evaporating between sessions.

This repo applies that pattern to our thesis project — building the self-documenting wiki system that is itself the first project it documents.
Original gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

## How it works

Three layers, strictly separated:

```
/sources      # Raw documents. Immutable. The LLM reads; you never lose the originals.
/wiki         # LLM-owned markdown. The LLM writes; you read and navigate.
CLAUDE.md     # The schema. Tells Claude how to maintain this wiki. You co-evolve it.
```

Claude Code reads `CLAUDE.md` at the start of every session and uses it as its operating instructions. You interact through three operations — **ingest**, **query**, and **lint** — described below.

---

## System architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOU OWN THIS                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   LAYER 1 — SOURCES                     │   │
│  │                                                         │   │
│  │   /sources/                                             │   │
│  │   PDFs · Markdown · Meeting notes · PRs · Data files    │   │
│  │                                                         │   │
│  │   Immutable. Drop files in. Never modified by the LLM.  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   LAYER 3 — SCHEMA                      │   │
│  │                                                         │   │
│  │   CLAUDE.md                                             │   │
│  │   Operations · Templates · Conventions · Config         │   │
│  │                                                         │   │
│  │   Co-evolved by you and the LLM over time.              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    reads sources │ governed by schema
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LLM ENGINE                                 │
│                    (Claude Code)                                │
│                                                                 │
│   ingest ──▶ summarise · cross-reference · detect gaps         │
│   query  ──▶ search index · synthesise · cite · offer to file  │
│   lint   ──▶ check contradictions · orphans · staleness        │
└─────────────────────────────────────────────────────────────────┘
                              │
                         writes │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       LLM OWNS THIS                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   LAYER 2 — WIKI                        │   │
│  │                                                         │   │
│  │   wiki/index.md         Content catalog                 │   │
│  │   wiki/log.md           Append-only operation log       │   │
│  │   wiki/_overview.md     Project synthesis               │   │
│  │   wiki/_gaps.md         Underdocumented areas           │   │
│  │   wiki/_reuse.md        Cross-project patterns          │   │
│  │   wiki/decisions/       One page per decision           │   │
│  │   wiki/entities/        One page per person or org      │   │
│  │   wiki/concepts/        One page per concept            │   │
│  │   wiki/meetings/        One page per meeting            │   │
│  │   wiki/deliverables/    One page per milestone          │   │
│  │   wiki/queries/         Saved query answers             │   │
│  │                                                         │   │
│  │   The LLM creates, updates, and cross-references.       │   │
│  │   You read, navigate, and query.                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

Ownership summary
─────────────────────────────────────────────────────────────────
  YOU own    /sources      — add files, never touch existing ones
  YOU own    CLAUDE.md     — configure, refine, co-evolve
  YOU read   /wiki         — navigate, query, review
  LLM owns   /wiki         — creates, updates, cross-references
  LLM reads  /sources      — never modifies
  LLM reads  CLAUDE.md     — never modifies
─────────────────────────────────────────────────────────────────
```

---

## Quickstart

### 1. Clone and configure

```bash
git clone https://github.com/your-org/kickstartai-wiki
cd kickstartai-wiki
```

Open `CLAUDE.md` and fill in the `## Project configuration` block at the top:

```yaml
project_name:     My Project
project_slug:     my-project
domain:           societal-impact
partners:         [ING, NS]
team:             [Alice (lead), Bob (engineer)]
start_date:       2026-05-12
access_level:     internal
sensitivity_note: ""
```

### 2. Initialise the wiki

```bash
mkdir -p sources wiki/decisions wiki/entities wiki/concepts wiki/meetings wiki/deliverables wiki/queries
touch wiki/index.md wiki/log.md wiki/_overview.md wiki/_gaps.md wiki/_reuse.md
```

### 3. Open Claude Code

```bash
claude
```

Claude Code will read `CLAUDE.md` automatically. You are ready to go.

---

## Operations

### Ingest — add a new source document

Drop the file into `/sources`, then tell Claude:

```
ingest sources/my-document.pdf
```

Claude will:
1. Read the document fully
2. Discuss key takeaways with you before writing anything
3. Update existing wiki pages that are affected
4. Create new pages for new entities, decisions, or concepts
5. Update `wiki/index.md` and append to `wiki/log.md`

A single source typically touches 10–15 wiki pages. You can stay involved
(default) or run unsupervised batch ingestion for many sources at once:

```
ingest sources/ --batch
```

---

### Query — ask questions against the wiki

```
query: What decisions have been made about the ingestion pipeline?
query: Compare the approaches considered for change detection.
query: Give me a stakeholder summary of the current project status.
```

Claude reads `index.md` to find relevant pages, synthesises an answer with
citations, and offers to save the result as a new wiki page — so your
explorations compound in the knowledge base rather than disappearing into
chat history.

---

### Lint — health-check the wiki

```
lint
```

Claude checks for:
- Contradictions between pages
- Stale content superseded by newer sources
- Orphan pages with no inbound links
- Concepts mentioned but lacking their own page
- Decision pages missing rationale
- Unresolved items in `_gaps.md`
- Patterns not yet captured in `_reuse.md`

Run lint periodically — after every 5 ingestions is a good default.

---

## Repository structure

```
kickstartai-wiki/
├── CLAUDE.md                  # Schema and operating instructions for Claude
├── README.md                  # This file
├── sources/                   # Raw source documents (immutable)
│   └── .gitkeep
└── wiki/
    ├── index.md               # Content catalog — updated on every ingest
    ├── log.md                 # Append-only operation log
    ├── _overview.md           # Project synthesis, always current
    ├── _gaps.md               # Underdocumented areas and open questions
    ├── _reuse.md              # Cross-project patterns and learnings
    ├── decisions/             # One file per decision
    ├── entities/              # One file per person, org, or team
    ├── concepts/              # One file per technical or domain concept
    ├── meetings/              # One file per meeting
    ├── deliverables/          # One file per sub-deliverable or milestone
    └── queries/               # Saved query answers (optional)
```

---

## Deploying to a new KickstartAI project

This repository is designed to be reused across all KickstartAI projects.

1. Fork or copy the repository
2. Fill in `## Project configuration` in `CLAUDE.md`
3. Set `access_level` appropriately:
   - `open` — public or student projects
   - `internal` — standard KickstartAI projects
   - `restricted` — healthcare, law enforcement, or partner-confidential projects
4. Run the quickstart steps above
5. Ingest the project brief as the first source document

No changes to `CLAUDE.md` beyond the configuration block are needed for a
standard project. Domain-specific conventions go in a `_domain.md` supplement.

---

## Supported source document types

| Type | Examples |
|---|---|
| PDF | Research papers, slide decks, briefs |
| Markdown | Notes, READMEs, design documents |
| Plain text | Emails, transcripts, meeting notes |
| Code / diff | GitHub PRs, architecture sketches |
| Data files | CSV, JSON (Claude Code reads these natively) |

---

## Tips

**Stay involved during ingestion.** Claude discusses takeaways before writing.
Use this moment to guide emphasis — what matters most for this project, what
can be summarised briefly, what needs its own concept page.

**File query answers back.** When you ask a comparison or analysis question,
say yes when Claude offers to save the answer. These compound over time and
make the wiki more useful than the sum of its sources.

**Check `_gaps.md` regularly.** This is where the wiki tells you what it
doesn't know yet — missing rationale, unresolved decisions, action items
without owners. It is more useful than any status report.

**Use `log.md` to orient new sessions.** At the start of a new Claude Code
session, ask Claude to read the last few log entries so it knows what was
done recently. Or from your terminal:

```bash
grep "^## \[" wiki/log.md | tail -5
```

**`_reuse.md` is the long-term asset.** Patterns captured here carry over
to future KickstartAI projects. When a decision or deliverable produces
something transferable, make sure Claude files it there.

---

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated
- Git

No other infrastructure required. The wiki is plain markdown files.
No vector database, no embeddings pipeline, no servers.

---

## Contributing

`CLAUDE.md` is a living document — you and Claude co-evolve it as you learn
what works for your domain and team. If you improve the schema in a way that
would benefit other KickstartAI projects, open a pull request against the
main repository so the improvement propagates to all deployments.
