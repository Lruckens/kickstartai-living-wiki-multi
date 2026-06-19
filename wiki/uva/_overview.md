# Living Wiki (UvA) — Overview

**Status:** scoping complete → **development phase: all four components built & integrating; UI built; evaluation phase underway** (Assignment 1 presented ~2026-04-22; first system MVP demoed 2026-05-14; tech stack confirmed 2026-05-15; per-member builds 2026-06-04; permission-layer PoC built & evaluated 2026-06-07; generator+wiki-engine integrated & evaluation phase started 2026-06-11; **integrated UI + all four components showcased 2026-06-12**)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM knowledge bases" concept (Karpathy, 2026), it goes beyond document search to synthesize, summarize, detect changes, and surface connections. Its stated technical contribution is extending RAG with a **persistent, compiled knowledge layer** that overcomes RAG's statelessness — understanding compounds rather than being rediscovered per query. See [[living-wiki]].

The recursive twist: the first project this system documents is *itself* (the presentation calls this "The Meta-Twist"). The kickoff clarified *why* self-documentation is the first task: it avoids sharing sensitive data and provides an intuitive evaluation method.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]] (a BSc Business Analytics thesis project). The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
The team is **deep in the development phase (Phase 2) and into the evaluation phase (Phase 3)**, with a **working integrated system**. The **2026-06-12 mock-up artifact** (see [[mockup-artifact-2026-06-12]]) is the highest-substance build source to date: it describes a **built React/Vite + FastAPI web UI** (Wiki view + Operations view with Ingest/Query/Lint + Generator + Permission/Gap surfaces), exposes the **git-worktree "Wiki Bot" push architecture** (markdown-on-disk, no database), and concretely documents all four member components — crucially **positively confirming Cara/Meng Cheng's component as the [[gap-detector]]** (a 6-layer hybrid framework), resolving the last standing person↔component gap.

Earlier development-phase milestones: the **2026-06-11 meeting** (see [[team-meeting-2026-06-11]]) marked an **integration milestone** — Quinten's generator and Laurenz's wiki architecture **integrated and functional**, with Laurenz merging Cara's and Xiaojing's MVPs (via Claude + VS Code) and the **evaluation phase begun** (Quinten on metrics; two evaluation families). The **2026-06-07 permission-layer design review** (see [[xiaojing-sanne-permission-email-2026-06-07]]) turned the [[permission-layer]] into the most concretely specified deliverable (paragraph-level tiers + pre-filtering + self-audit; 20-scenario evaluation), now joined by a **built UI + email-based login** (2026-06-12).

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
- 2026-06-04 — internal team meeting; **per-member build progress** (UI plan, generator build, permission-layer user-id, Cara MVP-feasibility issue).
- 2026-06-07 → 2026-06-08 — permission-layer design review; **two-layer permission design built & evaluated**; Xiaojing self-asserts Member-4 ownership.
- 2026-06-11 — internal team meeting; **generator + wiki-engine integrated**; evaluation phase begins.
- ~2026-06-12 — **mock-up artifact + feedback**: integrated **UI built**; all four components showcased; **Cara = Gap Detector confirmed**; Sanne feedback (Vercel, ~3 metrics, usability) — **ingested** (see [[mockup-artifact-2026-06-12]]).
- **Project plan:** 12 weeks / 3 phases — Phase 1 (wks 1–4) design; Phase 2 (wks 5–9) development; Phase 3 (wks 10–12) evaluation & synthesis (week numbers only; absolute dates not pinned).

## Key decisions
- Privacy/permissions are a first-class design concern; the [[permission-layer]] is **design-required** (MoSCoW: design = Should, fully-working = Won't), but a **built-and-evaluated two-layer PoC + UI/auth layer** now exists (paragraph-level tiers + pre-filtering + self-audit; email-based login + project-scoped access), being **integrated** into the wiki architecture.
- **Document the project itself first** — avoids sensitive data and gives an intuitive evaluation method.
- Blog post drafts evaluated against a human-written baseline (MoSCoW: a **Could** stretch goal).
- **Don't rely solely on LLMs** for the core tool — critical thinking required (reinforced by Sanne's 2026-06-07/06-12 critiques).
- **Methodology:** **Design Science Research (DSR; Hevner 2007)** layered with **CRISP-DM**.
- **Architecture:** **five member-owned components** (ingestion+wiki engine under Member 1) **+ the evaluation framework as the collaborative/shared deliverable**.
- **Tech stack (2026-05-15):** **Claude Code + Anthropic API** (repo `github.com/Lruckens/kickstartai-living-wiki`). Permission-layer *evaluation* used gpt-5.1 via the UvA API (experimental).
- **UI / backend (2026-06-12):** **React/Vite frontend + FastAPI backend**, **markdown-on-disk (no database)**, **git-worktree "Wiki Bot" push** to `main`, SSE-streamed Ingest/Query/Lint operations.
- **Integration (2026-06-11/12):** done by **Laurenz** (Claude + VS Code / PR merges); generator already integrated.
- **Deployment (2026-06-12):** investigate **Vercel** for central backend hosting (currently laptop-local); production auth out of scope.
- **Deployment governance (2026-05-14):** **admin-per-project**; **one wiki page = one project**, linked by shared topics.

## Open questions
See [[_gaps]] for the full list (Member 1/Member 2 person-mapping (Laurenz/Quinten still soft signals; M3 Cara & M4 Xiaojing now confirmed), backend/multi-component deployment durability (laptop-local; Vercel), integration into one system, vector store/embedding model, gap-detector scoring transparency, permission-layer open problems (aggregation/inference leakage, paragraph-label assignment, eval scale, cross-model audit, gpt-5.1 eval environment), evaluation-metric selection (~3 metrics), UI deliverable-status, usability-for-non-technical-staff, un-ingested screenshots/Gantt/GAPS-diagram, un-ingested student-materials corpus & PM Ops folder, recurring check-in cadence, second UvA group, the "Averion" handover, etc.).

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
