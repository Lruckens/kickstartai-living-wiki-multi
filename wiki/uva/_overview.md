# Living Wiki (UvA) — Overview

**Status:** scoping complete → **development phase underway** (Assignment 1 presented ~2026-04-22; first system MVP demoed 2026-05-14; tech stack confirmed 2026-05-15; per-member builds underway 2026-06-04; permission-layer PoC built & evaluated 2026-06-07)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM knowledge bases" concept (Karpathy, 2026), it goes beyond document search to synthesize, summarize, detect changes, and surface connections. Its stated technical contribution is extending RAG with a **persistent, compiled knowledge layer** that overcomes RAG's statelessness — understanding compounds rather than being rediscovered per query. See [[living-wiki]].

The recursive twist: the first project this system documents is *itself* (the presentation calls this "The Meta-Twist"). The kickoff clarified *why* self-documentation is the first task: it avoids sharing sensitive data and provides an intuitive evaluation method.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]] (a BSc Business Analytics thesis project). The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
Project-definition milestone reached and the team is **in the development phase (Phase 2, weeks 5–9)** with **each member now actively building their component**. The **2026-05-14 internal team meeting** (see [[team-meeting-2026-05-14]]) was the first development-phase source: **Laurenz demoed a GitHub repo with the wiki architecture and a first MVP**. The **2026-05-15 → 2026-05-18 demo follow-up thread** (see [[laurenz-sanne-email-2026-05-15]]) then **resolved the tech stack**: the system runs on **Claude Code + Anthropic API** (repo `github.com/Lruckens/kickstartai-living-wiki`). The **2026-06-04 team meeting** (see [[team-meeting-2026-06-04]]) shows the team mid-build: Laurenz has **finished his MVP** and is building a **UI on top of the GitHub**; Quinten is building the **generator module** (untested; integration with the GitHub flagged as at-risk); Xiaojing is adding a **user-id connection** to the **permission layer**; and Cara (Meng Cheng) reports an **MVP step is infeasible** for her component (she "already delivers a final product").

The **2026-06-07 → 2026-06-08 permission-layer design review** (Xiaojing ↔ Sanne; see [[xiaojing-sanne-permission-email-2026-06-07]]) is a landmark: it turns the [[permission-layer]] — previously the wiki's vaguest deliverable — into its most concretely specified one. Xiaojing presents a **built-and-evaluated two-layer design** (paragraph-level public/internal/restricted tiers; pre-filtering by `project_id`/`user_id`; an LLM self-audit with regex blacklist + LLM judge; a 20-scenario leakage evaluation), and **self-identifies as the permission-layer owner** — the first self-asserted person↔component evidence (Xiaojing ≈ Member 4). Sanne returns five expert critiques (same-model audit blind spot, aggregation/inference leakage, label-correctness risk, cross-project-vs-filtering tension, eval scale). Build activity now aligns 3/4 members with components; the full person↔member mapping is still partly inferential.

The 2026-05-15 thread also delivered a **purpose-built fictional test corpus** (`llm-wiki-student-materials`, containing the **Bakkie** sub-corpus — see [[student-materials-corpus]]) and a KickstartAI **PM Ops folder** structure (see [[kickstartai-pm-ops]]), and advanced the **data-privacy / permission-layer** thread with concrete directions (zero-data-retention API tier; configurable/swappable self-hosted/VPC backend).

Both student-authored Assignment 1 artifacts remain ingested: the **presentation deck** ([[assignment-1-presentation-2026-04-22]]) and the **written report** ([[assignment-1-report-2026-04-22]]). They define a **five-component-plus-shared-evaluation architecture**, **MoSCoW prioritization**, a **DSR + CRISP-DM** methodology, a **12-week / 3-phase timeline**, **group + per-member research questions**, an **author list with student numbers**, and the **GAPS** problem-structuring framework (see [[gaps-diagram]]). They **resolve** the sub-deliverable↔component mapping (M1 Ingestion+Wiki Engine, M2 Generator, M3 Gap Detector, M4 Permission Layer; evaluation = collaborative) and **resolve-by-precedence** the permission-layer ownership conflict.

## Timeline anchors
- 2026-04-02 — founding brief received.
- ~2026-04-01 — assumed CRISP-DM project start (per draft Gantt; needs revision due to selection delay).
- 2026-04-13 — kickoff meeting (KickstartAI x UvA), 10:00 CEST; **meeting notes ingested** (see [[kickoff-meeting-2026-04-13]]).
- 2026-04-13 — kickoff slide deck (`KickstartAI x UvA - Kick-off.pdf`) ingested, **text-extractable** (see [[kickoff-deck-2026-04-13]]).
- 2026-04-13 — project Gantt chart produced (draft; image-only — see [[project-timeline]]).
- 2026-04-13 — KickstartAI intro/strategy deck (`KAI-Intro`) partially ingested (image-heavy; diagrams not ingested).
- 2026-04-16 — UvA-internal supervisor kickoff; supervisor (Hongyi Zhu) confirmed; task-division scheme agreed (see [[supervisor-kickoff-2026-04-16]]).
- ~2026-04-22 (Wed) — Assignment 1 (project definition) presentation, 9–11 AM; **deck + written report ingested** (see [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]]).
- 2026-04-30 → 2026-05-04 — post-presentation check-in scheduling thread (spring break; one-off check-in call Thursday 11:00; Delft office visit invited) — **ingested** (see [[checkin-scheduling-2026-04-30]]).
- 2026-05-14 — internal team development-phase meeting; **first MVP demoed** (GitHub wiki architecture) — **ingested** (see [[team-meeting-2026-05-14]]).
- 2026-05-15 → 2026-05-18 — demo follow-up thread (Laurenz ↔ Sanne); **tech stack confirmed (Claude Code + Anthropic API)**; **test corpus + PM Ops folder delivered**; data-privacy directions — **ingested** (see [[laurenz-sanne-email-2026-05-15]]).
- 2026-06-04 — internal team development-phase meeting; **per-member build progress** (UI plan, generator build + integration risk, permission-layer user-id, Cara MVP-feasibility issue) — **ingested** (see [[team-meeting-2026-06-04]]).
- 2026-06-07 → 2026-06-08 — permission-layer design review thread (Xiaojing ↔ Sanne); **two-layer permission design built & evaluated**; **Xiaojing self-asserts Member-4 ownership**; gpt-5.1-via-UvA-API evaluation environment — **ingested** (see [[xiaojing-sanne-permission-email-2026-06-07]]).
- **Project plan:** 12 weeks / 3 phases — Phase 1 (wks 1–4) design; Phase 2 (wks 5–9) development; Phase 3 (wks 10–12) evaluation & synthesis (week numbers only; absolute dates not pinned).

## Key decisions
- Privacy/permissions are a first-class design concern; the [[permission-layer]] is **design-required** (MoSCoW: design = Should, fully-working = Won't), but as of 2026-06-07 a **built-and-evaluated two-layer PoC** exists (paragraph-level tiers + pre-filtering + self-audit). Concrete 2026-05-15 directions: zero-data-retention API tier; configurable/swappable self-hosted/VPC backend. First mechanism hint (user-id connection) surfaced 2026-06-04, now realized.
- **Document the project itself first** — avoids sensitive data and gives an intuitive evaluation method.
- Blog post drafts evaluated against a human-written baseline (MoSCoW: a **Could** stretch goal; basic accuracy+freshness eval is the **Must**).
- **Don't rely solely on LLMs** for the core tool — critical thinking required, especially for the permission layer and evaluation framework (reinforced by Sanne's 2026-06-07 critique).
- **Methodology:** **Design Science Research (DSR; Hevner 2007)** layered with **CRISP-DM (Chapman 2000; Martínez-Plumed 2021)**.
- **Architecture:** **five member-owned components** (ingestion+wiki engine under Member 1) **+ the evaluation framework as the collaborative/shared deliverable**.
- **Tech stack (2026-05-15):** **Claude Code + Anthropic API** as the wiki-generation LLM backend (repo `github.com/Lruckens/kickstartai-living-wiki`). Note: the permission-layer *evaluation* (2026-06-07) used **gpt-5.1 via the UvA API** — an experimental environment, distinct from the production stack.
- **Deployment (2026-05-14):** **admin-per-project** governance; **one wiki page = one project**, linked by shared topics.
- **UI layer (2026-06-04):** Laurenz to build a **UI on top of the GitHub** — first front-end mention (scope/deliverable-status open — see [[_gaps]]).

## Open questions
See [[_gaps]] for the full list (member↔named-student mapping for M1/M2/M3 (M4 = Xiaojing self-asserted), vector store/embedding model, agentic-vs-pipeline architecture, generator sourcing approach, generator↔GitHub integration risk, UI scope, permission-layer open problems (aggregation/inference leakage, paragraph-label assignment, eval scale, cross-model audit, gpt-5.1 eval environment, markdown-config durability), permission-layer-PoC-vs-MoSCoW reconciliation, Cara MVP-feasibility, data-understanding scope, admin-per-project mechanism, data-privacy/ZDR/configurable-backend, recurring check-in cadence, second UvA group, Delft office-visit date, individual supervisor-meeting dates, regeneration cadence, tone spec, the "Averion" handover, the Meng/Cara alias relationship (inferred), un-OCR'd Gantt chart, GAPS diagram image contents, un-OCR'd intro-deck diagrams / six-phase adoption model, un-ingested GitHub repo body, un-ingested student-materials corpus, un-ingested PM Ops folder, pending Google Drive structure).

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements + member↔component mapping
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL
- [[gaps-diagram]] — the GAPS / DAPS problem-structuring framework

## Team
See [[project-team]] for the full working team. In brief:
- **UvA students (4, business analytics, thesis project):** Quinten van den Heuvel (#15150658, coordinator, Dutch), Xiaojing Li (#14851199, "XiaoJing"/lee89953@, China), Laurenz Ruckensteiner-Geyer (#13762931, Barcelona, holds the GitHub repo), and Meng Cheng (#14025906, = "Cara"/"Carac M. Cheng", China). Component ownership (M1–M4) is assigned by component; **Xiaojing self-asserts the Permission Layer (M4)** as of 2026-06-07; build-activity soft signals align Laurenz≈M1, Quinten≈M2 (Cara≈M3 by elimination) — see [[_gaps]].
- **UvA academic supervisor:** Hongyi Zhu (h.zhu@uva.nl) — confirmed.
- **KickstartAI main contact:** Sanne Wielinga (Senior ML Engineer). Project handed to her "from Averion" (unidentified — see [[_gaps]]).
- **KickstartAI introducer:** Evertjan Peer (Tech Lead).
