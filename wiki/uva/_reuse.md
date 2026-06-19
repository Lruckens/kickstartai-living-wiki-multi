# Reuse — Living Wiki (UvA)

Patterns and learnings reusable across KickstartAI projects.

## Cross-project reuse intent
The Living Wiki architecture is explicitly designed for reuse across all KickstartAI projects after the initial (self-documenting) use case. A key design principle: the [[permission-model]] should be configurable so that deploying to a sensitive project requires *configuration, not a rewrite*. (Source: founding brief, 2026-04-02.)

The kickoff slide deck (see [[kickoff-deck-2026-04-13]]) articulates the cross-project reuse motivation at source level: one of the three stated problems is that **"learnings from one project rarely reach the next one."** The Living Wiki is the mechanism for carrying learnings forward across projects.

## Concrete cross-project design choices (2026-05-14 dev meeting)
The first development-phase team meeting (see [[team-meeting-2026-05-14]]) surfaced two concrete design choices that reinforce the configuration-not-rewrite, multi-project deployment vision:
- **Admin-per-project governance** — "assign an admin per project who governs the wiki page." Each deployed project gets its own governing admin (mechanism unspecified — see [[permission-layer]], [[_gaps]]).
- **One page per project, linked by shared topics** — the chosen information architecture treats **one wiki page = one project**, with cross-project connections via **shared topics**. This is the multi-project deployment framing (coarser than the within-project per-topic pages in [[living-wiki]]). See [[wiki-generation-engine]].

## Reusable architecture patterns (2026-06-12 mock-up artifact)
The 2026-06-12 mock-up artifact (see [[mockup-artifact-2026-06-12]]) surfaced concrete, reusable implementation patterns for the wiki-maintenance system:
- **Markdown-on-disk as the knowledge store (no database)** — the wiki *is* the markdown files; a thin FastAPI layer reads, calls Claude, and writes them back. Simple, portable, and version-controllable per project.
- **Git-worktree "Wiki Bot" push pattern** — writes are committed to `main` by a dedicated **Wiki Bot** identity via a temporary git worktree, keeping developer working branches untouched and giving an attributable, append-only commit history. Reusable for any per-project wiki repo.
- **Config-via-UI** — output types, tone/stakeholder/length (generator) and visibility labels / project scoping (permission layer) are configured through a UI, supporting the configuration-not-rewrite goal.
- **Permission config as a markdown file** (Claude Code implementation) — access rights change without code/prompt edits.
- **Secret management via gitignored `.env`** (with a committed `.env.example` template) — a per-deployment API-key handling pattern.
- ⚠️ **Open durability caveat:** component backends currently run on **individual laptops**; central deployment (e.g. **Vercel**) is needed for true multi-user reuse. See [[_gaps]].

## Breadth of target projects
KickstartAI's public project portfolio (see [[kickstartai-projects]]) illustrates the breadth and heterogeneity of projects the Living Wiki is intended to be reused across — spanning law enforcement (Politie Nederland), finance (ING), healthcare (LUMC), retail/food-waste (Ahold Delhaize/Albert Heijn, KLM), logistics (Ampère, bol), public health (sewage-water virus prediction, Philips), and societal impact (Voedselbanken). This diversity of domains, partners, and sensitivity levels underscores the configuration-not-rewrite design principle: each project carries different document types, permission needs, and stakeholders. (Source: KickstartAI projects index, 2026-05-07.)
