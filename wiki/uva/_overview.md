# Living Wiki (UvA) — Overview

**Status:** scoping complete → **development phase complete; fully integrated system demoed; evaluation phase underway; multi-project app built (2026-06-17); evaluation runplan ingested (2026-06-19); final demo + thesis defence scheduled 2026-06-22** (Assignment 1 presented ~2026-04-22; first system MVP demoed 2026-05-14; tech stack confirmed 2026-05-15; per-member builds 2026-06-04; permission-layer PoC built & evaluated 2026-06-07; generator+wiki-engine integrated 2026-06-11; integrated UI + all four components showcased 2026-06-12; **fully integrated wiki demoed 2026-06-15**; **multi-project app built 2026-06-17**; **evaluation runplan ingested 2026-06-19**)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM knowledge bases" concept (Karpathy, 2026), it goes beyond document search to synthesize, summarize, detect changes, and surface connections. Its stated technical contribution is extending RAG with a **persistent, compiled knowledge layer** that overcomes RAG's statelessness — understanding compounds rather than being rediscovered per query. See [[living-wiki]].

The recursive twist: the first project this system documents is *itself* (the presentation calls this "The Meta-Twist"). The kickoff clarified *why* self-documentation is the first task: it avoids sharing sensitive data and provides an intuitive evaluation method.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]] (a BSc Business Analytics thesis project). The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
The team has a **fully integrated, demoed system** and is **in the evaluation phase (Phase 3)**, working toward a **final demo + individual thesis defence on 2026-06-22**.

The **2026-06-19 evaluation runplan** (see [[evaluation-runplan-2026-06-19]]) is the latest ingested artifact: the formal experimental design for the headline evaluation experiment — a controlled four-condition comparison (C0/C1/C1r/C2) testing whether the compiled wiki (C2) outperforms top-k retrieved raw chunks (C1r) on correctness (H1) and whether it uses dramatically fewer tokens than a full raw dump (C1, H2). 30 questions across T1 (single-fact), T2 (synthesis), T3 (unanswerable/trap); judge = `claude-sonnet-4-6` (≠ answer model, addressing Sanne's same-model blind-spot concern); build-cost / break-even analysis from `token_usage.md`. The corpus hygiene filter introduces a new entity — **"Westerwoude"** — as a cross-project source to exclude; identity unresolved — see [[_gaps]].

The **2026-06-17 multi-project app** (see [[multi-project-app-2026-06-17]]) is the prior milestone: a refactored version of the app hosting **several projects side-by-side** (`uva` + `bakkie`), each with an isolated subtree (`wiki/<project>/` + `sources/<project>/`), project-scoped operations (`?project=<id>`), and config-driven deployment (`project.config.json` + `project_config.py` DEFAULTS + `PROJECT_ROOT` + `VITE_BACKEND_URL`). **No code edits are needed to add a new project — only config.** This is the **evaluation substrate**: the clean-slate `uva` subtree is ingested from scratch for the thesis experiment, with per-ingest token logging (`token_usage.md`). See [[decision-multi-project-app-structure]], [[_reuse]].

The **2026-06-15 meeting** (see [[team-meeting-2026-06-15]]) is the prior major milestone: **Laurenz demoed the fully integrated wiki** — the [[generator-module]], [[gap-detector]] (a dashboard + report page), and [[permission-layer]] (a login landing page) all wired into one UI. The team adopted a **git-branch-per-member workflow** (Laurenz as merge gatekeeper), set a concrete **demo/evaluation run-up** (17–22 June), produced a **first concrete evaluation-metric shortlist** (Self-BLEU, BERTScore, LLM-as-Judge: coherence/faithfulness/stakeholder-appropriateness), and recorded an **Anthropic API budget caution** (pre-parse source docs, esp. PDFs, to save tokens).

The **2026-06-12 mock-up artifact** (see [[mockup-artifact-2026-06-12]]) is the highest-substance build source: a **built React/Vite + FastAPI web UI** (Wiki view + Operations view with Ingest/Query/Lint + Generator + Permission/Gap surfaces), the **git-worktree "Wiki Bot" push architecture** (markdown-on-disk, no database), and all four member components — **positively confirming Cara/Meng Cheng's component as the [[gap-detector]]** (a 6-layer hybrid framework), resolving the last person↔component gap.

Earlier milestones: the **2026-06-11 meeting** (integration of Quinten's generator + Laurenz's wiki architecture; evaluation phase begun; two evaluation families) and the **2026-06-07 permission-layer design review** (paragraph-level tiers + pre-filtering + self-audit; 20-scenario evaluation), now joined by a **built UI + email-based login**.

Sanne's 2026-06-12 feedback adds direction: she was **"impressed"** the system is this far/functioning; warned it must be **usable by non-technical staff**; recommended **Vercel** for central deployment (component backends currently run on laptops); flagged **integration into one system** as the biggest challenge; and advised picking **~3 evaluation metrics** from literature and applying them.

Both student-authored Assignment 1 artifacts remain ingested: the **presentation deck** ([[assignment-1-presentation-2026-04-22]]) and the **written report** ([[assignment-1-report-2026-04-22]]).

## Timeline anchors
- 2026-04-02 — founding brief received.
- 2026-04-13 — kickoff meeting + kickoff slide deck (text-extractable) + Gantt (image-only) + KAI intro deck.
- 2026-04-16 — UvA-internal supervisor kickoff; supervisor (Hongyi Zhu) confirmed.
- ~2026-04-22 — Assignment 1 (project definition) presentation; deck + written report ingested.
- 2026-04-30 → 2026-05-04 — post-presentation check-in scheduling thread.
- 2026-05-14 — internal team meeting; **first MVP demoed** (GitHub wiki architecture).
- 2026-05-15 → 2026-05-18 — demo follow-up thread; **tech stack confirmed (Claude Code + Anthropic API)**; test corpus + PM Ops folder delivered.
- 2026-06-04 — internal team meeting; **per-member build progress**.
- 2026-06-07 → 2026-06-08 — permission-layer design review; **two-layer permission design built & evaluated**; Xiaojing self-asserts Member-4 ownership.
- 2026-06-11 — internal team meeting; **generator + wiki-engine integrated**; evaluation phase begins.
- ~2026-06-12 — **mock-up artifact + feedback**: integrated **UI built**; all four components showcased; **Cara = Gap Detector confirmed**; Sanne feedback (Vercel, ~3 metrics, usability).
- 2026-06-15 — internal team meeting; **fully integrated wiki demoed**; branch-per-member workflow; evaluation-metric shortlist; demo/eval run-up scheduled.
- **2026-06-17** — **multi-project app built** (per-project subtrees, config-driven deployment, clean-slate `uva` evaluation substrate, token logging). See [[multi-project-app-2026-06-17]], [[decision-multi-project-app-structure]].
- 2026-06-18 — demo to Sanne + final feedback; re-ingest project docs into an empty wiki.
- **2026-06-19** — **evaluation runplan ingested** (C0/C1/C1r/C2 conditions, H1/H2 hypotheses, T1/T2/T3 question taxonomy, break-even framing); ingest a fake KickstartAI project as a new-project use-case. See [[evaluation-runplan-2026-06-19]].
- **2026-06-22 — final demo of the artifact + individual thesis defence.**
- **Project plan:** 12 weeks / 3 phases — Phase 1 (wks 1–4) design; Phase 2 (wks 5–9) development; Phase 3 (wks 10–12) evaluation & synthesis.

## Key decisions
- Privacy/permissions are a first-class design concern; the [[permission-layer]] is **design-required** (MoSCoW: design = Should, fully-working = Won't), but a **built-and-evaluated two-layer PoC + UI/auth layer** now exists (paragraph-level tiers + pre-filtering + self-audit; email-based login landing page), **integrated** into the wiki architecture, and **config-driven per-project access** in the multi-project app. (Only public + internal pages exist in the live wiki so far; restricted pages still to be added — see [[_gaps]].)
- **Document the project itself first** — avoids sensitive data and gives an intuitive evaluation method.
- Blog post drafts evaluated against a human-written baseline (MoSCoW: a **Could** stretch goal).
- **Don't rely solely on LLMs** for the core tool — critical thinking required.
- **Methodology:** **Design Science Research (DSR; Hevner 2007)** layered with **CRISP-DM**.
- **Architecture:** **five member-owned components** (ingestion+wiki engine under Member 1) **+ the evaluation framework as the collaborative/shared deliverable**.
- **Tech stack (2026-05-15):** **Claude Code + Anthropic API** (repo `github.com/Lruckens/kickstartai-living-wiki`). Permission-layer *evaluation* used gpt-5.1 via the UvA API (experimental).
- **UI / backend (2026-06-12):** **React/Vite frontend + FastAPI backend**, **markdown-on-disk (no database)**, **git-worktree "Wiki Bot" push** to `main`, SSE-streamed Ingest/Query/Lint operations.
- **Multi-project app (2026-06-17):** **per-project subtrees** (`wiki/<project>/` + `sources/<project>/`), **config-driven deployment** (`project.config.json` + `project_config.py` DEFAULTS + `PROJECT_ROOT` + `VITE_BACKEND_URL`), **per-project access control** (users carry a `projects` list), **per-ingest token logging** (`token_usage.md`). *No code edits needed to add a new project.* See [[decision-multi-project-app-structure]], [[_reuse]].
- **Collaboration (2026-06-15):** **branch-per-member workflow**; Laurenz is the merge gatekeeper (ask before any PR to `main`).
- **Evaluation (2026-06-15→19):** candidate metrics **Self-BLEU, BERTScore, LLM-as-Judge** (coherence/faithfulness/stakeholder-appropriateness); headline experiment = **C0/C1/C1r/C2 conditions** (same answer model `claude-opus-4-8`, only context differs), **H1 (quality: C2 > C1r)** and **H2 (efficiency: C2 tokens ≪ C1)**; **30 questions** (T1 single-fact / T2 synthesis / T3 unanswerable); **judge = `claude-sonnet-4-6`** (≠ answer model, addressing same-model blind spot); **build-cost/break-even** from `token_usage.md`. See [[evaluation-runplan-2026-06-19]].
- **Token budget (2026-06-15→17):** pre-parse/convert source docs (esp. PDFs) before ingestion; per-ingest token logging now in place.
- **Deployment (2026-06-12):** investigate **Vercel** for central backend hosting (currently laptop-local); production auth out of scope.
- **Deployment governance (2026-05-14):** **admin-per-project**; **one wiki page = one project**, realized as per-project subtrees in the multi-project app.

## Open questions
See [[_gaps]] for the full list. New gaps from the 2026-06-19 evaluation runplan ingest: **"Westerwoude" project name** (first occurrence, identity unresolved); **specific model versions** (`claude-opus-4-8`, `claude-haiku-4-5`, `claude-sonnet-4-6`) first cited in eval-harness context; **evaluation harness files not ingested** (`questions.json`, `reference-answers-worksheet.md`, `metrics.py`, `pipelines.py`, `run_eval.py`); **`results.json` not yet available**; **judge validation protocol pending**. Resolved: `evaluation/RUN-PLAN.md not ingested` gap is now closed.

Other standing open items: Member 1/Member 2 person-mapping soft signals; backend/multi-component deployment durability (laptop-local; Vercel; branch-per-member partial mitigation); multi-project app deployment status; `token_usage.md` not ingested; "Bakkie" identity in multi-project app (real vs. fictional); vector store/embedding model; gap-detector scoring transparency; permission-layer open problems (aggregation/inference leakage, paragraph-label assignment, eval scale, cross-model audit, gpt-5.1 eval environment, restricted pages not yet added); evaluation-metric finalization (~3 metrics; shortlist proposed); new-project use-case experiment design; UI deliverable-status; usability-for-non-technical-staff; un-ingested screenshots/Gantt/GAPS-diagram; un-ingested student-materials corpus & PM Ops folder; recurring check-in cadence; second UvA group; the "Averion" handover; etc.

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements + member↔component mapping
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL
- [[gaps-diagram]] — the GAPS / DAPS problem-structuring framework

## Team
See [[project-team]] for the full working team. In brief:
- **UvA students (4, business analytics, thesis project):** Quinten van den Heuvel (#15150658, coordinator; Generator/M2), Xiaojing Li (#14851199, lee89953@; Permission Layer/M4 self-asserted), Laurenz Ruckensteiner-Geyer (#13762931; repo/integration owner; Ingestion+Wiki Engine/M1), and Meng Cheng (#14025906, = "Cara"/"Carac M. Cheng"; **Gap Detector/M3 confirmed 2026-06-12**).
- **UvA academic supervisor:** Hongyi Zhu (h.zhu@uva.nl) — confirmed.
- **KickstartAI main contact:** Sanne Wielinga (Senior ML Engineer). Project handed to her "from Averion" (unidentified — see [[_gaps]]).
- **KickstartAI introducer:** Evertjan Peer (Tech Lead).
