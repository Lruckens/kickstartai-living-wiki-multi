# Artifact: Living Wiki Mock-Up / Integrated MVP Showcase + Feedback (2026-06-12)

**Last updated:** 2026-06-19
**Date:** ~2026-06-12
**Type:** Artifact-description + stakeholder-feedback document (development phase)
**Status:** ingested (text body; ~15 embedded UI screenshots image-only, not ingested)

## Summary
The **highest-substance build/implementation source to date** — the first source that concretely describes the **working integrated system**: a React/Vite + FastAPI **web UI** plus all four member components (Living Wiki UI/engine, Generator, Permission Layer, Gap Detector), each with design + technical implementation, followed by **Sanne Wielinga's stakeholder feedback** on each component and overall. Source: `2026-06-12-mock-up-artifact.md`, dated ~1 day after [[team-meeting-2026-06-11]].

This source is a **landmark**: it (a) **positively confirms Cara/Meng Cheng's component as the [[gap-detector]]** — resolving the single biggest standing person↔component gap (previously by-elimination only); (b) reveals a **built React/Vite + FastAPI UI** with full Ingest/Query/Lint/Generator/Permission/Gap surfaces; (c) exposes the **git-worktree "Wiki Bot" push architecture**; and (d) records **substantive Sanne feedback** (Vercel deployment, ~3 evaluation metrics, usability, gap-detector scoring transparency).

## The integrated UI (NEW — major)
A **React/TypeScript app served by Vite**, talking directly to a **FastAPI backend on `localhost:8000`**. **No database** — the wiki *is* the markdown files on disk; FastAPI is a thin read / call-Claude / write layer. Two main views:

### Wiki view (read path)
- A read-only browser for the `/wiki` knowledge base. Sidebar groups pages by category (Overview, Concepts, Decisions, Deliverables, Entities, Meetings, Generated outputs) with live page counts, collapsible sections, title search.
- Renders markdown via `react-markdown`; rewrites Obsidian-style `[[slug]]` cross-references into **clickable in-app links** — so the LLM's linking convention becomes navigation, without changing stored files.
- Endpoints: `GET /wiki/pages` (scans `wiki/**/*.md`, returns catalog) and `GET /wiki/page?path=…` (raw markdown).

### Operations view (write path)
The control surface for the three CLAUDE.md operations, each a tab with **live Server-Sent-Events (SSE) streaming**:
- **Ingest** — drag-and-drop a source doc (uploaded to `/sources`), then 3 phases streamed live: **(1) Analyse** (Claude analyses the doc vs. existing wiki, streams classification/conflicts/planned changes), **(2) Apply** (a second Claude call outputs JSON with complete file contents for every affected page; backend writes them into `/wiki`), **(3) Push** (committed & pushed to `main`).
- **Query** — natural-language question; Claude answers **from wiki content only**, streaming token-by-token with `[[page]]` citations.
- **Lint** — one-click wiki health check streaming a report on contradictions, stale content, orphan pages, missing concept pages/cross-references, underdocumented decisions, unresolved gaps.

### GitHub push mechanism — "Wiki Bot" via git worktree
The push uses a **temporary git worktree**: the backend fetches `origin/main`, checks it out into a temp dir, copies the updated `wiki/` (and new source file) in, commits as a dedicated **Wiki Bot** identity, pushes `HEAD:main`, then deletes the worktree. This keeps the developer's working branch untouched while `main` always reflects the latest ingested knowledge, with an attributable, append-only commit history. See [[wiki-generation-engine]].

## Per-component build detail

### Generator module (Quinten)
- UI built with **Lovable**; configures **output type, stakeholder, tone, length** (steps 1–3) + explicit **include/exclude details** (step 4); result appears in a side panel on generate.
- **Output types fixed in collaboration with KickstartAI** during a discussion.
- Stack: `generate` operation instructions added to **CLAUDE.md** (based on Quinten's thesis functional design); outputs saved to `wiki/generator`; **KickstartAI-provided Anthropic API key** in gitignored `.env` (with `.env.example` template); a separate **wiki-reader Python module** gathers relevant wiki pages/content as real project context; backend (Python/FastAPI) sends the prompt to Anthropic and returns the result to the UI.
- **Integrated into Laurenz's main GitHub via pull request** (corroborates [[team-meeting-2026-06-11]]).
- ⚠️ **Problem:** backend runs **locally on Quinten's laptop** — the generator only works while he runs it; needs central deployment. See [[generator-module]], [[_gaps]].

### Permission layer (Xiaojing) — UI + auth
- **Login with `user_id` + password**; for KickstartAI, `user_id` = **email** in format `first_name.last_name@kickstart.ai`. Session identifies the user automatically thereafter.
- Two tabs: **Ingestion** (assign visibility label **public/internal/restricted**; restricted requires selecting/creating a project) and **Generator** (restricted-page dropdown **only shows authorized projects** → cross-project access blocked).
- **User lifecycle:** join company/project → added to auth system (granted restricted access); leave → account removed, access revoked.
- **Three demo accounts without passwords** for the prototype; **production authentication explicitly out of scope** (KickstartAI future work).
- Sanne's 2026-06-07 suggestions folded in: **email-as-user-id** and **dummy accounts**. See [[permission-layer]], [[permission-model]].

### Gap detector (Cara / Meng Cheng) — COMPONENT POSITIVELY CONFIRMED
- **First positive evidence that Cara's component is the Gap Detector** (previously by-elimination only). A **6-layer hybrid framework**:
  1. **Rule-Based** — deterministic rules for explicit/structural/keyword gaps (missing sections, incomplete structures, predefined missing-info patterns).
  2. **Semantic Analysis** — LLM-based reasoning (prompt-driven) + cosine similarity over embeddings, for implicit gaps/inconsistencies.
  3. **Graph Analysis** — Claude extracts entities/typed relationships; **NetworkX DiGraph** builds the graph; graph algorithms detect missing dependencies, orphan nodes, broken reasoning chains.
  4. **Gap Aggregation** — dedupe overlapping gaps, merge multi-source evidence, track frequency, enrich with affected entities.
  5. **Hybrid Ranking** — LLM reasoning + deterministic scoring. `Final Score = (0.45 × Severity + 0.40 × Impact + 0.15 × Frequency) × Risk Multiplier` (High=1.1, Medium=1.0, Low=0.9); confidence reported separately.
  6. **Gap Report** — ranked list by business impact; each gap includes evidence, category, priority score, root cause, concrete fix recommendation.
- Directly realizes the Member 3 RQ. See [[gap-detector]].

## Stakeholder feedback (Sanne)
- **Overall: "impressed"** — did not expect the wiki to be this far/functioning; especially pleased with the **UI↔technical-architecture connection**.
- **Usability warning** — must not be too technical; anyone in the company should be able to use it (esp. gap detector + permission layer).
- **Vercel recommendation** — investigate **Vercel** (AI cloud) to deploy backends on a URL domain instead of local laptops; free plan likely sufficient. Deployment out of scope but worth trying.
- **Integration is the biggest challenge/focus** — integrating each component's UI into one working system (corroborates [[team-meeting-2026-06-11]]).
- **Evaluation** — systematic evaluation may be hard; advises finding **~3 metrics** from academic/internet sources and applying them. See [[evaluation-deliverable]].
- **Gap-detector scoring** — separate **importance/significance from confidence/reliability**; justify/empirically validate detection thresholds (Precision/Recall/F1); manually-defined weights & risk multipliers need rationale/testing/expert judgment.

## Conflicts / ambiguities
- ✅ **Cara → Gap Detector now POSITIVELY CONFIRMED.** The wiki repeatedly recorded this as a by-elimination inference with no positive evidence ([[_gaps]], [[project-team]], [[user-journeys]], [[team-meeting-2026-06-04]], [[team-meeting-2026-06-11]]). This document supplies the positive evidence — a resolution, not a contradiction; hedges updated, history kept.
- ⚠️ **Generator sourcing — RESOLVED toward "from the wiki."** The 2026-05-14 open question (wiki-based vs. source-document-based generation) is answered for the implemented MVP: the generator uses a **wiki-reader module** gathering wiki pages/content as context. Update [[generator-module]].
- ⚠️ **MoSCoW "UI not in scope" / "permission layer = Won't-Have working" vs. built reality.** The built UI and working permission PoC **exceed** the Assignment-1 MoSCoW framing. MoSCoW record kept, status updated, flagged as scope-growth — established pattern.
- ⚠️ **Onboarding-summary staleness reinforced.** The stale [[2026-06-19-project-onboarding-summary]] ("team/timeline/tech-stack not documented", "Phase: scoping") is now even more stale. Already a tracked gap.

## Not ingested
- **~15 embedded PNG screenshots** of the various UI views (Wiki, Operations, Generator, Permission, Gap report) — image-only; contents not ingested, not fabricated. Re-ingest/OCR flag — see [[_gaps]].

## Related
- [[wiki-generation-engine]]
- [[generator-module]]
- [[permission-layer]]
- [[permission-model]]
- [[gap-detector]]
- [[evaluation-deliverable]]
- [[evaluation-framework]]
- [[team-meeting-2026-06-11]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[project-team]]
- [[user-journeys]]
- [[_reuse]]
- [[_overview]]

## Sources
- 2026-06-12-mock-up-artifact.md (Living Wiki UI mock-up artifact description + Sanne feedback, development phase; ~15 embedded UI screenshots image-only, not ingested)
