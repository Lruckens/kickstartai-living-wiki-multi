# Artifact: Multi-Project Living Wiki App (2026-06-17)

**Last updated:** 2026-06-19
**Date:** 2026-06-17
**Type:** Technical architecture / application overview document (README-style)
**Status:** ingested

## Summary
A README-style document (`2026-06-17-MULTI-APP.md`) describing the **multi-project version of the Living Wiki app** — a significant architectural evolution from the single-project app (flat `/wiki` + `/sources`) to a multi-project app hosting **several projects side-by-side**, each with its own isolated knowledge base, project-scoped operations, and per-project accounts. Dated 2026-06-17, consistent with the "17.06: Quinten + Laurenz design the evaluation experiment" milestone from [[team-meeting-2026-06-15]]. This app is the **evaluation substrate** for the clean-slate wiki-vs-raw-context experiment planned for 18–19 June.

The document references a decision record `[[decision-multi-project-app-structure]]` (see [[decision-multi-project-app-structure]]) and an `evaluation/RUN-PLAN.md` — neither previously in the wiki. The decision page is created as a stub; `RUN-PLAN.md` is not yet ingested. See [[_gaps]].

## Why it was built
Two motivations are stated explicitly:
1. **Reusability across KickstartAI projects** — rather than fork the app per project, one app serves all, each isolated and switchable from an in-app toggle. *Deploying a new project needs no code edits — just config.* This is the strongest concrete realization of the configuration-not-rewrite principle to date. See [[_reuse]].
2. **Clean-slate evaluation corpus** — a brand-new, empty `uva` project subtree can be ingested from scratch with known provenance and per-ingest token counts, giving the evaluation a controlled baseline the long-lived original wiki cannot provide. See [[evaluation-deliverable]].

## Architecture

### Per-project subtrees
Each project is a self-contained wiki + source tree:
```
wiki/uva/…       sources/uva/…       ← Living Wiki (UvA)
wiki/bakkie/…    sources/bakkie/…    ← Project Bakkie
```
`backend/main.py::project_dirs(project)` resolves `(wiki_dir, sources_dir)` for a project and validates the id against `permission.PROJECTS`. Each project has its own `index.md` / `_overview.md` / `_gaps.md` and never bleeds into another.

### Config in one place
`backend/project_config.py` + optional `project.config.json` at the project root is the **single source of per-project config** (projects, demo accounts, git push target), falling back to built-in `DEFAULTS` so the app always boots. A `PROJECT_ROOT` env var can point the app at a different working tree. *No code edits needed for a new project — just config.*

### Scoped operations
Every backend endpoint takes a `project` parameter and routes through `project_dirs`. The frontend appends it via `api.ts::withProject(path, project)` → `?project=<id>`.

### Permission & accounts
Users carry a `projects` list and a `tier`. Demo accounts:
- `anna.jansen` → UvA only
- `bram.bakker` → Bakkie only
- `carla.visser` → both UvA and Bakkie (example login: `carla.visser@kickstartai.demo` / `wiki-demo-3`)
- `gast.bezoeker` → public guest (no projects)

Ingest/query/generate/lint are refused for a project the user is not a member of.

### Frontend
`App.tsx` keeps an **active project** in state (persisted to `localStorage`), shown as a switcher (bottom-left). Changing the active project re-scopes every view (Wiki, Operations, Gaps, Artifact). `BACKEND_URL` is configurable via `VITE_BACKEND_URL` (default `http://localhost:8000`).

## Projects registered

| id | name | seeded from |
|---|---|---|
| `uva` | Living Wiki (UvA) | thesis project — fresh `.md` ingest for evaluation |
| `bakkie` | Project Bakkie | second project — proves multi-project isolation |

⚠️ **"Bakkie" identity ambiguity.** The existing wiki ([[student-materials-corpus]], [[kickstartai-projects]]) establishes "Bakkie" as a **fictional** student-materials test corpus that must never be merged into the real KickstartAI portfolio. This document calls it "a second, real project — proves multi-project isolation." The most plausible reading is that the same fictional corpus is being used as the second isolation-test project subtree (i.e. "real" means a real populated subtree, not a real KickstartAI client). This is not confirmed — see [[_gaps]].

## Build sequence (6 steps)
1. **Initial scaffold** — multi-project skeleton (UvA + Bakkie), empty per-project trees.
2. **Project-scoped backend** — ingest + view per subtree, then query/lint/generate/gaps.
3. **Frontend active-project context** — switcher + `withProject` across all views.
4. **Clean slate** — reset both projects to empty skeletons for a controlled ingestion test.
5. **Configurable backend URL** (`VITE_BACKEND_URL`) and switcher moved to bottom-left.
6. **Ingestion cost instrumentation** — per-ingest token logging + prompt caching (`token_usage.md`), ported from the main repo.

## Relation to the thesis evaluation
The `uva` project subtree is the **clean-slate corpus** for the wiki-vs-raw-context experiment: a fresh `.md` ingest builds `wiki/uva/` from `sources/uva/`, token logging records the build cost in `token_usage.md`, and the evaluation runs with `--project uva`. See `evaluation/RUN-PLAN.md` (not yet ingested — see [[_gaps]]). This directly supports the 18.06 re-ingest milestone from [[team-meeting-2026-06-15]].

## Comparison with single-project app

| | Single-project (original) | Multi-project (this app) |
|---|---|---|
| Layout | flat `/wiki`, `/sources` | per-project subtrees `wiki/<project>/`, `sources/<project>/` |
| Operation scope | implicit (one project) | every call carries `?project=<id>` |
| Config | hard-coded | `project_config.py` + optional `project.config.json` |
| Accounts | one project's users | users carry a `projects` list; access is per-project |
| Frontend | single view | active-project switcher; all views act on selected project |
| Isolation | n/a | separate index/overview/gaps, sources, and access labels per project |

## Not ingested
- `evaluation/RUN-PLAN.md` — referenced; contains the experiment plan for the clean-slate UvA ingest. See [[_gaps]].
- `token_usage.md` — per-ingest token logging file. See [[_gaps]].
- `wiki/bakkie/` and `sources/bakkie/` contents. See [[_gaps]].

## Related
- [[decision-multi-project-app-structure]]
- [[wiki-generation-engine]]
- [[ingestion-pipeline]]
- [[permission-layer]]
- [[evaluation-deliverable]]
- [[team-meeting-2026-06-15]]
- [[mockup-artifact-2026-06-12]]
- [[student-materials-corpus]]
- [[_reuse]]
- [[_overview]]

## Sources
- 2026-06-17-MULTI-APP.md (multi-project Living Wiki app README / architecture overview, 2026-06-17)
