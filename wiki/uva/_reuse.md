# Reuse — Living Wiki (UvA)

Patterns and learnings reusable across KickstartAI projects.

## Cross-project reuse intent
The Living Wiki architecture is explicitly designed for reuse across all KickstartAI projects after the initial (self-documenting) use case. A key design principle: the [[permission-model]] should be configurable so that deploying to a sensitive project requires *configuration, not a rewrite*. (Source: founding brief, 2026-04-02.)

The kickoff slide deck (see [[kickoff-deck-2026-04-13]]) articulates the cross-project reuse motivation at source level: one of the three stated problems is that **"learnings from one project rarely reach the next one."** The Living Wiki is the mechanism for carrying learnings forward across projects.

## KickstartAI internal-use commitment (2026-06-18) — STRONGEST EVIDENCE TO DATE
At the 2026-06-18 final demo check-in (see [[team-meeting-2026-06-18]]), **Sanne Wielinga explicitly stated** that she and **another KickstartAI engineer** intend to use this work as a **starting point for an internal KickstartAI project**. The wiki "provides valuable context on features and the decision-making process."

This is the **first on-the-record, post-thesis internal-reuse commitment by KickstartAI** — confirming that the reuse vision is not merely architectural aspiration but a concrete near-term plan. The identity of the "another engineer" is unknown; see [[_gaps]].

## Concrete cross-project design choices (2026-05-14 dev meeting)
The first development-phase team meeting (see [[team-meeting-2026-05-14]]) surfaced two concrete design choices that reinforce the configuration-not-rewrite, multi-project deployment vision:
- **Admin-per-project governance** — "assign an admin per project who governs the wiki page." Each deployed project gets its own governing admin (mechanism unspecified — see [[permission-layer]], [[_gaps]]).
- **One page per project, linked by shared topics** — the chosen information architecture treats **one wiki page = one project**, with cross-project connections via **shared topics**. This is now realized at the app level as **one subtree per project** (`wiki/<project>/`), with each subtree containing its own interlinked topic pages. See [[wiki-generation-engine]], [[multi-project-app-2026-06-17]].

## Reusable architecture patterns (2026-06-12 mock-up artifact)
The 2026-06-12 mock-up artifact (see [[mockup-artifact-2026-06-12]]) surfaced concrete, reusable implementation patterns for the wiki-maintenance system:
- **Markdown-on-disk as the knowledge store (no database)** — the wiki *is* the markdown files; a thin FastAPI layer reads, calls Claude, and writes them back. Simple, portable, and version-controllable per project.
- **Git-worktree "Wiki Bot" push pattern** — writes are committed to `main` by a dedicated **Wiki Bot** identity via a temporary git worktree, keeping developer working branches untouched and giving an attributable, append-only commit history. Reusable for any per-project wiki repo.
- **Config-via-UI** — output types, tone/stakeholder/length (generator) and visibility labels / project scoping (permission layer) are configured through a UI, supporting the configuration-not-rewrite goal.
- **Permission config as a markdown file** (Claude Code implementation) — access rights change without code/prompt edits.
- **Secret management via gitignored `.env`** (with a committed `.env.example` template) — a per-deployment API-key handling pattern.
- **Obsidian graph integration** — a visual knowledge-graph of wiki page links, revealed at the 2026-06-18 demo (see [[team-meeting-2026-06-18]]). Implementation details unspecified; potentially reusable as a navigation/query-efficiency aid. See [[_gaps]].
- **Cross-session learning pattern** — summarize project learnings → ingest the summary as an internal document → accessible to team in future sessions. Described by Xiaojing at the 2026-06-18 demo (see [[team-meeting-2026-06-18]]). Whether this is a dedicated UI flow or general wiki capability is unspecified. See [[_gaps]].
- ⚠️ **Deployment note:** Vercel deployment was **decided against** (2026-06-18) to prioritize thesis work; the branch-per-member workflow lets any member run the UI locally. Central URL-hosted deployment remains future work for a production reuse scenario. See [[team-meeting-2026-06-18]], [[_gaps]].

## Multi-project app — configuration-not-rewrite fully realized (2026-06-17)
The 2026-06-17 multi-project app (see [[multi-project-app-2026-06-17]], [[decision-multi-project-app-structure]]) is the **strongest concrete realization of the configuration-not-rewrite principle to date**:
- **Per-project subtrees** (`wiki/<project>/` + `sources/<project>/`) — each project is self-contained; no bleed between projects.
- **`project.config.json` + `project_config.py` DEFAULTS** — single source of per-project config (projects, demo accounts, git push target). Adding a new project requires **no code edits** — only config.
- **`PROJECT_ROOT` env var** — points the app at a different working tree without code changes.
- **`VITE_BACKEND_URL` env var** — configures the backend URL at build time (supports different deployment environments).
- **Per-project access control** — users carry a `projects` list; operations refused for non-member projects; aligns with [[permission-model]].
- **Per-project token logging** (`token_usage.md`) — tracks ingestion cost per project, supporting the Anthropic API budget management discussed at [[team-meeting-2026-06-15]].

The document states this explicitly: *"Deploying to a new project needs no code edits — just config."*

## Breadth of target projects
KickstartAI's public project portfolio (see [[kickstartai-projects]]) illustrates the breadth and heterogeneity of projects the Living Wiki is intended to be reused across — spanning law enforcement (Politie Nederland), finance (ING), healthcare (LUMC), retail/food-waste (Ahold Delhaize/Albert Heijn, KLM), logistics (Ampère, bol), public health (sewage-water virus prediction, Philips), and societal impact (Voedselbanken). This diversity of domains, partners, and sensitivity levels underscores the configuration-not-rewrite design principle: each project carries different document types, permission needs, and stakeholders. (Source: KickstartAI projects index, 2026-05-07.)
