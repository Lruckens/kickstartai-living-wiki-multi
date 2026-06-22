# Deliverable: Wiki Generation Engine

**Last updated:** 2026-06-19
**Status:** scoped (Must Have); first MVP exists (GitHub, 2026-05-14); LLM backend confirmed (Claude Code + Anthropic API); **UI built — React/Vite + FastAPI (2026-06-12)**; generator module integrated (2026-06-11); **fully integrated wiki demoed (2026-06-15)**; **multi-project app built (2026-06-17)**; **evaluation runplan ingested — break-even / build-cost framing confirmed (2026-06-19)**; **final demo to Sanne (2026-06-18); Vercel decided against; Obsidian graph integration revealed**

## Summary
An LLM-powered, **RAG-grounded** system that processes ingested documents into structured, interlinked wiki pages organized by topic. Pages regenerate or update on a configurable schedule (e.g., daily) as source material changes. It is the **persistent, compiled knowledge layer** that distinguishes the Living Wiki from stateless RAG (see [[living-wiki]]).

## Details
- **First MVP exists (2026-05-14):** At the 2026-05-14 development-phase team meeting (see [[team-meeting-2026-05-14]]), **Laurenz demoed a GitHub repo** containing the **wiki architecture and a first MVP of the system** — the first concrete evidence the system exists in code.
- **MVP finished; UI built (2026-06-04 planned → 2026-06-12 built):** At the 2026-06-04 meeting (see [[team-meeting-2026-06-04]]), Laurenz had **finished his MVP version** and planned to **build a UI on top of the GitHub**. As of **2026-06-12** that UI is **built** — see the architecture below and [[mockup-artifact-2026-06-12]]. Whether the UI is a graded thesis deliverable or a convenience layer remains partly open — see [[_gaps]].
- **Fully integrated wiki demoed (2026-06-15):** At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]), **Laurenz demoed the fully integrated wiki** — with the [[generator-module]], [[gap-detector]] (a dashboard + report page), and [[permission-layer]] (a login landing page) all wired into one UI. The integration effort tracked across 06-11/06-12 is now realized in one demoed artifact.
- **Final demo to Sanne (2026-06-18):** Laurenz demoed the fully integrated multi-project system to Sanne (see [[team-meeting-2026-06-18]]). The demo included all four account types (UvA member, Bakkie member, combined, guest), the Obsidian graph integration, and the cross-session learning feature. The system received positive feedback.
- **Multi-project app built (2026-06-17):** A **multi-project version of the app** was built (see [[multi-project-app-2026-06-17]]), refactoring the flat single-project layout into **per-project subtrees** (`wiki/<project>/` + `sources/<project>/`) with config-driven deployment. This is the **evaluation substrate** for the clean-slate ingest experiment and the strongest concrete realization of the configuration-not-rewrite reuse principle. See [[decision-multi-project-app-structure]], [[_reuse]].
- **GitHub repo — URL known (2026-05-15):** The repo is `https://github.com/Lruckens/kickstartai-living-wiki` (shared in the demo follow-up thread — see [[laurenz-sanne-email-2026-05-15]]). The repo schema/mechanics are now substantially revealed by the 2026-06-12 and 2026-06-17 artifacts; the full code body remains un-ingested. See [[_gaps]].
- **LLM backend — RESOLVED (2026-05-15):** The repo is **directly linked to Claude Code** (Anthropic's terminal-based agent), which **performs all operations and generates the wiki pages**; ingested documents are passed to **Anthropic's LLM via API**. The engine runs on **Anthropic (Claude) via Claude Code**, and it is working. See [[laurenz-sanne-email-2026-05-15]], [[_gaps]].
  - ⚠️ **Note — permission-layer evaluation used a *different* model.** Xiaojing's permission-layer experiments (2026-06-07) ran on **gpt-5.1 via the UvA API**, not Claude — an *experimental/evaluation* environment, distinct from this production backend. Production intends Claude end-to-end. See [[permission-layer]], [[xiaojing-sanne-permission-email-2026-06-07]], [[_gaps]].
  - ⚠️ **Note — evaluation harness uses specific model versions.** The headline experiment (see [[evaluation-runplan-2026-06-19]]) names `claude-opus-4-8` (answer), `claude-haiku-4-5` (retrieval), `claude-sonnet-4-6` (judge). These are evaluation harness models; whether they match the production wiki-engine model is unspecified. See [[_gaps]].
- **RAG-grounded (Assignment 1, 2026-04-22):** The presentation describes the Wiki Engine as **"LLM-powered, RAG-grounded page generation & refresh"** — a retrieval-augmented-generation approach grounding pages in source documents (Lewis et al., 2020; Gao et al., 2023). See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]].
- **Persistent compiled layer:** Rather than re-synthesising from raw documents on every query, the engine compiles content into structured pages **once** and **updates them as new information arrives**, so understanding compounds over time (overcoming RAG statelessness; see [[living-wiki]]).
- **Member 1 research focus (report):** Bundled with the [[ingestion-pipeline]] under **Member 1**, whose RQ is: "How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base?" The thesis researches **change-detection mechanisms, document versioning approaches, and wiki update strategies**, explicitly **comparing full page regeneration against incremental updates**. See [[assignment-1-report-2026-04-22]].
- **MoSCoW (Must Have):** An LLM-powered wiki generation engine with **daily refresh** is a Must-Have for this iteration. (Real-time / sub-daily updates are explicitly **Won't Have**.)

### Build cost / break-even framing (2026-06-19)
The evaluation runplan (see [[evaluation-runplan-2026-06-19]]) introduces an **economic framing** for the persistent compiled knowledge layer:
- **H2 (efficiency):** C2 (wiki pages) uses far fewer tokens than C1 (full raw dump) per query; raw-dump cost grows linearly with corpus size while retrieval stays bounded.
- **Build cost / break-even:** total ingestion cost from `token_usage.md` ÷ per-query token saving (C1 − C2) = **N\*** — *"the wiki pays for itself after ~N\* queries."*
This is a novel evaluation dimension (cost/efficiency) that complements the four quality dimensions (coverage/freshness/accuracy/usefulness) defined in the report. It directly justifies the persistent compiled layer as an architectural choice, not just a quality benefit.

### UI + backend architecture (2026-06-12)
The 2026-06-12 mock-up artifact (see [[mockup-artifact-2026-06-12]]) reveals the implemented architecture:
- **Frontend:** a **React/TypeScript app served by Vite**, talking directly to a **FastAPI backend on `localhost:8000`**.
- **No database** — the wiki *is* the markdown files on disk; the backend is a thin **read / call-Claude / write** layer.
- **Wiki view (read path):** `GET /wiki/pages` returns a catalog (title/category/slug); `GET /wiki/page?path=…` returns raw markdown rendered with `react-markdown`, with `[[slug]]` cross-references rewritten into clickable in-app links.
- **Operations view (write path):** three operations as tabs with **live SSE streaming** — **Ingest** (3-phase: Analyse → Apply → Push), **Query** (answers from wiki content only with `[[page]]` citations), **Lint** (health-check report). These match the wiki's own `ingest`/`query`/`lint` operation types in [[log]].
- **Ingest mechanics:** Claude analyses the uploaded doc vs. the existing wiki and streams its plan; a second Claude call outputs **JSON with complete file contents** for every affected page, written into `/wiki`; then a **push** phase.
- **GitHub push — "Wiki Bot" via git worktree:** the backend fetches `origin/main`, checks it out into a **temporary git worktree**, copies the updated `wiki/` + new source file in, commits as a dedicated **Wiki Bot** identity, pushes `HEAD:main`, then deletes the worktree — keeping the developer's working branch untouched while `main` always reflects the latest knowledge, with an attributable, append-only commit history. A reusable pattern — see [[_reuse]].
- **Obsidian graph integration (revealed 2026-06-18):** Laurenz showcased a **visual Obsidian graph of wiki page links** at the final demo (see [[team-meeting-2026-06-18]]), providing a visual knowledge-map demonstrating the interconnected nature of the documentation. Not previously documented; implementation details and production-vs-demo status unspecified. See [[_gaps]].
- **Save-to-wiki feature:** users can save generated content or query responses directly to the wiki (stored in a generated outputs section). See [[team-meeting-2026-06-18]].
- ✅ **Deployment — Vercel decided against (2026-06-18).** The team decided **not to deploy to Vercel**, prioritizing individual thesis work and test cases (see [[team-meeting-2026-06-18]]). Component backends currently run on **individual laptops**; the branch-per-member workflow lets any member run the UI locally. Central URL-hosted deployment remains future work for production reuse.

### Multi-project app architecture (2026-06-17)
The 2026-06-17 multi-project app (see [[multi-project-app-2026-06-17]], [[decision-multi-project-app-structure]]) introduces the **per-project subtree model** that supersedes the flat single-project layout:
- **Per-project subtrees:** `wiki/<project>/` + `sources/<project>/`; `project_dirs(project)` resolves the correct paths and validates against `permission.PROJECTS`. Each project has its own `index.md` / `_overview.md` / `_gaps.md`.
- **Config-driven deployment:** `backend/project_config.py` + optional `project.config.json` at the project root. `PROJECT_ROOT` env var for working-tree redirection. **No code edits needed to add a new project** — only config. Direct realization of configuration-not-rewrite (see [[_reuse]]).
- **Project-scoped operations:** every endpoint takes `?project=<id>`; frontend uses `withProject(path, project)`. Ingest/query/generate/lint all route through `project_dirs`.
- **Frontend project switcher:** `App.tsx` keeps an **active project** in state (persisted to `localStorage`), shown as a switcher (bottom-left). Changing the project re-scopes every view. `VITE_BACKEND_URL` configures the backend URL.
- **Per-project access control:** users carry a `projects` list; access refused for non-member projects. Demo accounts: `anna.jansen` (UvA), `bram.bakker` (Bakkie), `carla.visser` (both), `gast.bezoeker` (public guest). See [[permission-layer]].
- **Token logging:** per-ingest token counts + prompt caching recorded in `token_usage.md` — directly addresses the Anthropic API budget caution from [[team-meeting-2026-06-15]].
- ⚠️ **Deployment status:** Vercel deployment decided against (2026-06-18). The multi-project app runs locally per the branch-per-member workflow. See [[team-meeting-2026-06-18]], [[_gaps]].

### Integrated UI + collaboration workflow (2026-06-15)
At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]) the integrated wiki was demoed and a concrete collaboration workflow adopted:
- **Integrated surfaces:** the UI now bundles the wiki read/write views, the **Generator** config UI, the **Gap Detector** as a **dashboard + report page**, and the **Permission Layer** as a **login landing page** (log in before entering the wiki).
- **Branch-per-member workflow:** the UI runs on **any member's laptop** by creating a **separate branch** of the GitHub repo + downloading the repo docs locally. Members work on **their own branches**; **always ask Laurenz before a pull request / merge to `main`** — Laurenz is the **integration/merge gatekeeper**. This **partially mitigates** the single-laptop-owner durability risk.
- **State of the live wiki:** currently holds **only public + internal pages** — **restricted pages still need to be added** to test the permission layer's full functionality (see [[permission-layer]], [[_gaps]]).
- ⚠️ **Token-cost caution (Sanne):** to avoid exhausting the Anthropic API quota before the final new-project test ingestions, **pre-parse/convert source docs into a lighter format** — **PDFs especially** waste tokens (processed as text *and* converted to an image). See [[ingestion-pipeline]], [[_gaps]].

### Permission-layer integration (2026-06-07 → 2026-06-15)
The [[permission-layer]] operates on the **source paragraph pool before generation** — pre-filtering to only the paragraphs a target user is authorized to see (by `project_id` + `user_id`/email), so the engine never receives unauthorized content. In the **current Claude Code implementation**, Claude reads the updated permission configuration from a **markdown file** (vs SQL paragraph-table updates in a full pipeline). A **UI + email-based login** layer was added 2026-06-12 and wired as a **login landing page** in the integrated demo (2026-06-15). In the multi-project app (2026-06-17), per-project access control is enforced at the API level via the user's `projects` list. See [[permission-layer]], [[xiaojing-sanne-permission-email-2026-06-07]], [[mockup-artifact-2026-06-12]].

### Module integration (2026-06-04 → 2026-06-17)
The [[generator-module]] (built by Quinten) integrates with this GitHub architecture. As of **2026-06-11** (see [[team-meeting-2026-06-11]]) **Quinten's and Laurenz's modules are integrated and functional** (the generator merged via PR into `main`, per [[mockup-artifact-2026-06-12]]) — the earlier at-risk integration task is **resolved**. Integration of the **remaining modules** (the [[permission-layer]] and Cara's [[gap-detector]]) was completed by 2026-06-15, when Laurenz **demoed the fully integrated wiki** (see [[team-meeting-2026-06-15]]); Cara and Xiaojing shared their MVPs + precise descriptions and Laurenz merged them **using Claude and VS Code**. Sanne flagged **integrating each component's separate UI/backend into one working system** as the biggest challenge. The robustness/repeatability of the manual, Claude-assisted merge is unspecified — see [[_gaps]].

### Deployment / backend configurability (2026-05-15 → 2026-06-18)
For sensitive-project deployment, Sanne suggested a **configurable backend** that can swap in a **self-hosted or VPC-deployed model** when needed while keeping the rest of the architecture intact — tying the engine's LLM backend to the [[permission-layer]] and the configuration-not-rewrite reuse model (see [[_reuse]]). The multi-project app's `project.config.json` + `PROJECT_ROOT` + `VITE_BACKEND_URL` env vars are concrete steps toward this. Vercel deployment was **decided against** at the 2026-06-18 final demo check-in (see [[team-meeting-2026-06-18]]) — central URL-hosted deployment remains future work. See [[laurenz-sanne-email-2026-05-15]].

### Open design questions (2026-05-14 team meeting)
- **LLM choice — RESOLVED (see above).** Backend is Claude Code + Anthropic API. Residual: data residency / privacy of the external data flow; specific vector store and embedding model remain unspecified. See [[permission-layer]], [[_gaps]].
- **Agentic architecture — partially answered.** The chosen tool (**Claude Code**) is itself agentic; whether to build further agentic structure vs. a pipeline is still a live design choice. See [[team-meeting-2026-05-14]], [[_gaps]].
- **Information architecture (one page per project) — realized as per-project subtrees.** The 2026-05-14 agreement that "one wiki page should be one project" is now realized at the app level as **one subtree per project** (`wiki/<project>/`), cross-linked by shared topics. See [[team-meeting-2026-05-14]], [[_reuse]], [[_gaps]].

## Related
- [[ingestion-pipeline]]
- [[living-wiki]]
- [[gap-detector]]
- [[mockup-artifact-2026-06-12]]
- [[multi-project-app-2026-06-17]]
- [[decision-multi-project-app-structure]]
- [[evaluation-runplan-2026-06-19]]
- [[team-meeting-2026-05-14]]
- [[team-meeting-2026-06-04]]
- [[team-meeting-2026-06-11]]
- [[team-meeting-2026-06-15]]
- [[team-meeting-2026-06-18]]
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
- 2026-06-17-MULTI-APP.md (multi-project Living Wiki app README / architecture overview, 2026-06-17)
- 2026-06-18-Laurenz-evaluation-plan.md (evaluation run plan / evaluation/RUN-PLAN.md, 2026-06-18)
- 2026-06-18-meeting-notes.md (Gemini-generated transcript summary, final UvA + Sanne check-in meeting, 2026-06-18)
