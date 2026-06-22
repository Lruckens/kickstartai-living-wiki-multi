# Decision: Multi-Project App Structure

**Last updated:** 2026-06-19
**Date decided:** ~2026-06-17
**Status:** implemented (multi-project app built; referenced in `2026-06-17-MULTI-APP.md`)
**Owners:** Laurenz Ruckensteiner-Geyer (integration), Quinten van den Heuvel (evaluation)

## Decision
Refactor the Living Wiki from a **single-project app** (flat `/wiki` + `/sources`) to a **multi-project app** hosting several projects side-by-side, each in its own isolated subtree (`wiki/<project>/` + `sources/<project>/`), with all backend operations scoped by a `project` parameter and all per-project config centralized in `project_config.py` / `project.config.json`.

## Context
Two requirements converged around 2026-06-17:
1. **Reusability across KickstartAI projects** — the artifact is designed for deployment to many projects ([[_reuse]]). The original single-project app would require forking per project; a multi-project app serves all from one codebase, switching via an in-app toggle.
2. **Controlled evaluation corpus** — the thesis evaluation plan (see [[evaluation-deliverable]], [[team-meeting-2026-06-15]]) requires re-ingesting all docs from scratch into an **empty wiki** to measure build cost and generation quality. The long-lived original wiki has an entangled history; a fresh, isolated `uva` subtree provides a clean baseline.

The document (`2026-06-17-MULTI-APP.md`) references this decision page as `[[decision-multi-project-app-structure]]` in `wiki/uva/decisions/`.

## Rationale
- **Configuration, not code** — `project.config.json` + `project_config.py` DEFAULTS; `PROJECT_ROOT` env var; `VITE_BACKEND_URL`. Adding a new project requires no code edits — only config. Directly realizes the configuration-not-rewrite reuse principle (see [[_reuse]]).
- **Per-project isolation** — separate `index.md` / `_overview.md` / `_gaps.md` / sources per project; `project_dirs(project)` validation ensures no cross-project bleed.
- **Per-project access control** — users carry a `projects` list; ingest/query refused for unauthorized projects. Aligns with the paragraph-level permission model (see [[permission-layer]], [[permission-model]]).
- **Token logging** — per-ingest cost instrumentation (`token_usage.md`) is essential for managing the Anthropic API budget caution flagged at [[team-meeting-2026-06-15]].

## Alternatives considered
- **Fork per project** — rejected; maintenance burden scales with the number of projects.
- **Keep single-project app + run a separate clean-slate instance** — possible but less clean than a first-class multi-project architecture.

## Status note
⚠️ This decision page is a **stub** created from the README document (`2026-06-17-MULTI-APP.md`). The full alternatives-considered record and decision discussion are not available in the ingested sources. See [[_gaps]].

## Related
- [[multi-project-app-2026-06-17]]
- [[wiki-generation-engine]]
- [[permission-layer]]
- [[permission-model]]
- [[evaluation-deliverable]]
- [[team-meeting-2026-06-15]]
- [[_reuse]]
- [[ingestion-pipeline]]

## Sources
- 2026-06-17-MULTI-APP.md (multi-project Living Wiki app README / architecture overview, 2026-06-17)
