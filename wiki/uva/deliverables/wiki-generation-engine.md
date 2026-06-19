# Deliverable: Wiki Generation Engine

**Last updated:** 2026-06-19
**Status:** scoped (Must Have); first MVP exists (GitHub, 2026-05-14); LLM backend confirmed (Claude Code + Anthropic API); **UI built — React/Vite + FastAPI (2026-06-12)**; generator module integrated (2026-06-11); **fully integrated wiki demoed (2026-06-15)**

## Summary
An LLM-powered, **RAG-grounded** system that processes ingested documents into structured, interlinked wiki pages organized by topic. Pages regenerate or update on a configurable schedule (e.g., daily) as source material changes. It is the **persistent, compiled knowledge layer** that distinguishes the Living Wiki from stateless RAG (see [[living-wiki]]).

## Details
- **First MVP exists (2026-05-14):** At the 2026-05-14 development-phase team meeting (see [[team-meeting-2026-05-14]]), **Laurenz demoed a GitHub repo** containing the **wiki architecture and a first MVP of the system** — the first concrete evidence the system exists in code.
- **MVP finished; UI built (2026-06-04 planned → 2026-06-12 built):** At the 2026-06-04 meeting (see [[team-meeting-2026-06-04]]), Laurenz had **finished his MVP version** and planned to **build a UI on top of the GitHub**. As of **2026-06-12** that UI is **built** — see the architecture below and [[mockup-artifact-2026-06-12]]. Whether the UI is a graded thesis deliverable or a convenience layer remains partly open — see [[_gaps]].
- **Fully integrated wiki demoed (2026-06-15):** At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]), **Laurenz demoed the fully integrated wiki** — with the [[generator-module]], [[gap-detector]] (a dashboard + report page), and [[permission-layer]] (a login landing page) all wired into one UI. The integration effort tracked across 06-11/06-12 is now realized in one demoed artifact.
- **GitHub repo — URL known (2026-05-15):** The repo is `https://github.com/Lruckens/kickstartai-living-wiki` (shared in the demo follow-up thread — see [[laurenz-sanne-email-2026-05-15]]). The repo schema/mechanics are now substantially revealed by the 2026-06-12 artifact (see below); the full code body remains un-ingested. See [[_gaps]].
- **LLM backend — RESOLVED (2026-05-15):** The repo is **directly linked to Claude Code** (Anthropic's terminal-based agent), which **performs all operations and generates the wiki pages**; ingested documents are passed to **Anthropic's LLM via API**. The engine runs on **Anthropic (Claude) via Claude Code**, and it is working. See [[laurenz-sanne-email-2026-05-15]], [[_gaps]].
  - ⚠️ **Note — permission-layer evaluation used a *different* model.** Xiaojing's permission-layer experiments (2026-06-07) ran on **gpt-5.1 via the UvA API**, not Claude — an *experimental/evaluation* environment, distinct from this production backend. Production intends Claude end-to-end. See [[permission-layer]], [[xiaojing-sanne-permission-email-2026-06-07]], [[_gaps]].
- **RAG-grounded (Assignment 1, 2026-04-22):** The presentation describes the Wiki Engine as **"LLM-powered, RAG-grounded page generation & refresh"** — a retrieval-augmented-generation approach grounding pages in source documents (Lewis et al., 2020; Gao et al., 2023). See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]].
- **Persistent compiled layer:** Rather than re-synthesising from raw documents on every query, the engine compiles content into structured pages **once** and **updates them as new information arrives**, so understanding compounds over time (overcoming RAG statelessness; see [[living-wiki]]).
- **Member 1 research focus (report):** Bundled with the [[ingestion-pipeline]] under **Member 1**, whose RQ is: "How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base?" The thesis researches **change-detection mechanisms, document versioning approaches, and wiki update strategies**, explicitly **comparing full page regeneration against incremental updates**. See [[assignment-1-report-2026-04-22]].
- **MoSCoW (Must Have):** An LLM-powered wiki generation engine with **daily refresh** is a Must-Have for this iteration. (Real-time / sub-daily updates are explicitly **Won't Have**.)

### UI + backend architecture (2026-06-12)
The 2026-06-12 mock-up artifact (see [[mockup-artifact-2026-06-12]]) reveals the implemented architecture:
- **Frontend:** a **React/TypeScript app served by Vite**, talking directly to a **FastAPI backend on `localhost:8000`**.
- **No database** — the wiki *is* the markdown files on disk; the backend is a thin **read / call-Claude / write** layer.
- **Wiki view (read path):** `GET /wiki/pages` returns a catalog (title/category/slug); `GET /wiki/page?path=…` returns raw markdown rendered with `react-markdown`, with `[[slug]]` cross-references rewritten into clickable in-app links.
- **Operations view (write path):** three operations as tabs with **live SSE streaming** — **Ingest** (3-phase: Analyse → Apply → Push), **Query** (answers from wiki content only with `[[page]]` citations), **Lint** (health-check report). These match the wiki's own `ingest`/`query`/`lint` operation types in [[log]].
- **Ingest mechanics:** Claude analyses the uploaded doc vs. the existing wiki and streams its plan; a second Claude call outputs **JSON with complete file contents** for every affected page, written into `/wiki`; then a **push** phase.
- **GitHub push — "Wiki Bot" via git worktree:** the backend fetches `origin/main`, checks it out into a **temporary git worktree**, copies the updated `wiki/` + new source file in, commits as a dedicated **Wiki Bot** identity, pushes `HEAD:main`, then deletes the worktree — keeping the developer's working branch untouched while `main` always reflects the latest knowledge, with an attributable, append-only commit history. A reusable pattern — see [[_reuse]].
- ⚠️ **Deployment durability:** component backends (e.g. the generator) currently run on **individual laptops**; Sanne suggested **Vercel** for central URL-hosted deployment (out of scope but to be attempted). See [[_gaps]].

### Integrated UI + collaboration workflow (2026-06-15)
At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]) the integrated wiki was demoed and a concrete collaboration workflow adopted:
- **Integrated surfaces:** the UI now bundles the wiki read/write views, the **Generator** config UI, the **Gap Detector** as a **dashboard + report page**, and the **Permission Layer** as a **login landing page** (log in before entering the wiki).
- **Branch-per-member workflow:** the UI runs on **any member's laptop** by creating a **separate branch** of the GitHub repo + downloading the repo docs locally. Members work on **their own branches**; **always ask Laurenz before a pull request / merge to `main`** — Laurenz is the **integration/merge gatekeeper**. This **partially mitigates** the single-laptop-owner durability risk (any member can run the integrated UI locally) but is **not** central/URL deployment — the **Vercel/central-deployment gap remains open**. See [[_gaps]].
- **State of the live wiki:** currently holds **only public + internal pages** — **restricted pages still need to be added** to test the permission layer's full functionality (see [[permission-layer]], [[_gaps]]).
- ⚠️ **Token-cost caution (Sanne):** to avoid exhausting the Anthropic API quota before the final new-project test ingestions, **pre-parse/convert source docs into a lighter format** — **PDFs especially** waste tokens (processed as text *and* converted to an image). See [[ingestion-pipeline]], [[_gaps]].

### Permission-layer integration (2026-06-07 → 2026-06-15)
The [[permission-layer]] operates on the **source paragraph pool before generation** — pre-filtering to only the paragraphs a target user is authorized to see (by `project_id` + `user_id`/email), so the engine never receives unauthorized content. In the **current Claude Code implementation**, Claude reads the updated permission configuration from a **markdown file** (vs SQL paragraph-table updates in a full pipeline). A **UI + email-based login** layer was added 2026-06-12 and wired as a **login landing page** in the integrated demo (2026-06-15). See [[permission-layer]], [[xiaojing-sanne-permission-email-2026-06-07]], [[mockup-artifact-2026-06-12]].

### Module integration (2026-06-04 → 2026-06-15)
The [[generator-module]] (built by Quinten) integrates with this GitHub architecture. As of **2026-06-11** (see [[team-meeting-2026-06-11]]) **Quinten's and Laurenz's modules are integrated and functional** (the generator merged via PR into `main`, per [[mockup-artifact-2026-06-12]]) — the earlier at-risk integration task is **resolved**. Integration of the **remaining modules** (the [[permission-layer]] and Cara's [[gap-detector]]) was completed by 2026-06-15, when Laurenz **demoed the fully integrated wiki** (see [[team-meeting-2026-06-15]]); Cara and Xiaojing shared their MVPs + precise descriptions and Laurenz merged them **using Claude and VS Code**. Sanne flagged **integrating each component's separate UI/backend into one working system** as the biggest challenge. The robustness/repeatability of the manual, Claude-assisted merge is unspecified — see [[_gaps]].

### Deployment / backend configurability (2026-05-15)
For sensitive-project deployment, Sanne suggested a **configurable backend** that can swap in a **self-hosted or VPC-deployed model** when needed while keeping the rest of the architecture intact — tying the engine's LLM backend to the [[permission-layer]] and the configuration-not-rewrite reuse model (see [[_reuse]]). See [[laurenz-sanne-email-2026-05-15]].

### Open design questions (2026-05-14 team meeting)
- **LLM choice — RESOLVED (see above).** Backend is Claude Code + Anthropic API. Residual: data residency / privacy of the external data flow; specific vector store and embedding model remain unspecified. See [[permission-layer]], [[_gaps]].
- **Agentic architecture — partially answered.** The chosen tool (**Claude Code**) is itself agentic; whether to build further agentic structure vs. a pipeline is still a live design choice. See [[team-meeting-2026-05-14]], [[_gaps]].
- **Information architecture (one page per project) — proposed.** The team agreed **"one wiki page should be one project, with a connection to other projects via shared topics."** A per-*project* granularity (cross-linked by shared topics), coarser than the within-project per-*topic* pages in [[living-wiki]]. See [[team-meeting-2026-05-14]], [[_reuse]], [[_gaps]].

## Related
- [[ingestion-pipeline]]
- [[living-wiki]]
- [[gap-detector]]
- [[mockup-artifact-2026-06-12]]
- [[team-meeting-2026-05-14]]
- [[team-meeting-2026-06-04]]
- [[team-meeting-2026-06-11]]
- [[team-meeting-2026-06-15]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[laurenz-sanne-email-2026-05-15]]
- [[permission-layer]]
- [[generator-module]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[project-team]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-05-14-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
- 2026-06-04-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-07-Xiaojing-Sanne-email-content.md (Xiaojing ↔ Sanne permission-layer design review email thread, 2026-06-07 → 2026-06-08)
- 2026-06-11-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-12-mock-up-artifact.md (Living Wiki UI mock-up artifact description + Sanne feedback, development phase)
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
