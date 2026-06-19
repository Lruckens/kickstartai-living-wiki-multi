# Living Wiki (UvA) — Overview

**Status:** scoping complete → **development phase begun** (Assignment 1 presented ~2026-04-22; first system MVP demoed 2026-05-14)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM knowledge bases" concept (Karpathy, 2026), it goes beyond document search to synthesize, summarize, detect changes, and surface connections. Its stated technical contribution is extending RAG with a **persistent, compiled knowledge layer** that overcomes RAG's statelessness — understanding compounds rather than being rediscovered per query. See [[living-wiki]].

The recursive twist: the first project this system documents is *itself* (the presentation calls this "The Meta-Twist"). The kickoff clarified *why* self-documentation is the first task: it avoids sharing sensitive data and provides an intuitive evaluation method.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]] (a BSc Business Analytics thesis project). The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
Project-definition milestone reached and the team has **entered the development phase (Phase 2, weeks 5–9)**. The **2026-05-14 internal team meeting** (see [[team-meeting-2026-05-14]]) is the first development-phase source: **Laurenz demoed a GitHub repo with the wiki architecture and a first MVP** — the first concrete evidence the system exists in code. That meeting also surfaced several open technical questions (which LLM to use & feasibility, agentic vs. pipeline architecture, generator sourcing from wiki vs. source documents, data-understanding scope) and two concrete design choices (**admin-per-project** governance; **one wiki page = one project**, linked by shared topics).

Both student-authored Assignment 1 artifacts remain ingested: the **presentation deck** ([[assignment-1-presentation-2026-04-22]]) and the **written report** ([[assignment-1-report-2026-04-22]]). They define a **five-component-plus-shared-evaluation architecture**, **MoSCoW prioritization**, a **DSR + CRISP-DM** methodology, a **12-week / 3-phase timeline**, **group + per-member research questions**, an **author list with student numbers**, and the **GAPS** problem-structuring framework (see [[gaps-diagram]]). They **resolve** the sub-deliverable↔component mapping (M1 Ingestion+Wiki Engine, M2 Generator, M3 Gap Detector, M4 Permission Layer; evaluation = collaborative) and **resolve-by-precedence** the permission-layer ownership conflict. A **2026-04-30 → 2026-05-04 check-in scheduling thread** ([[checkin-scheduling-2026-04-30]]) arranged a check-in call and referenced a **second UvA group**. Tech stack remains undecided (RAG/LLM + named generation strategies, but no specific LLM/vector store/embedding model/framework chosen — LLM choice now explicitly an active open question); which *named student* is Member 1/2/3/4 is still open.

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
- **Project plan:** 12 weeks / 3 phases — Phase 1 (wks 1–4) design; Phase 2 (wks 5–9) development; Phase 3 (wks 10–12) evaluation & synthesis (week numbers only; absolute dates not pinned).

## Key decisions
- Privacy/permissions are a first-class design concern; the [[permission-layer]] is **design-only** for now (MoSCoW: design = Should, fully working = Won't) but must address sensitive-data handling from the start.
- **Document the project itself first** — avoids sensitive data and gives an intuitive evaluation method.
- Blog post drafts evaluated against a human-written baseline (MoSCoW: a **Could** stretch goal; basic accuracy+freshness eval is the **Must**).
- **Don't rely solely on LLMs** for the core tool — critical thinking required, especially for the permission layer and evaluation framework.
- **Methodology:** **Design Science Research (DSR; Hevner 2007)** layered with **CRISP-DM (Chapman 2000; Martínez-Plumed 2021)**.
- **Architecture:** **five member-owned components** (ingestion+wiki engine under Member 1) **+ the evaluation framework as the collaborative/shared deliverable**.
- **Deployment (2026-05-14):** **admin-per-project** governance; **one wiki page = one project**, linked by shared topics.

## Open questions
See [[_gaps]] for the full list (member↔named-student mapping for #1–4, tech stack / LLM choice, agentic-vs-pipeline architecture, generator sourcing approach, data-understanding scope, admin-per-project mechanism, recurring check-in cadence, second UvA group, Delft office-visit date, individual supervisor-meeting dates, regeneration cadence, tone spec, the "Averion" handover, the Meng/Cara alias relationship (inferred), un-OCR'd Gantt chart, GAPS diagram image contents, un-OCR'd intro-deck diagrams / six-phase adoption model, `KAI-Intro` ↔ `20260413 UvA.pdf` mapping, un-ingested GitHub repo).

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements + member↔component mapping
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL
- [[gaps-diagram]] — the GAPS / DAPS problem-structuring framework

## Team
See [[project-team]] for the full working team. In brief:
- **UvA students (4, business analytics, thesis project):** Quinten van den Heuvel (#15150658, coordinator, Dutch), Xiaojing Li (#14851199, "XiaoJing"/lee89953@, China), Laurenz Ruckensteiner-Geyer (#13762931, Barcelona), and Meng Cheng (#14025906, = "Cara"/"Carac M. Cheng", China). Component ownership (M1–M4) is assigned by component but not yet mapped to named students — see [[_gaps]].
- **UvA academic supervisor:** Hongyi Zhu (h.zhu@uva.nl) — confirmed.
- **KickstartAI main contact:** Sanne Wielinga (Senior ML Engineer). Project handed to her "from Averion" (unidentified — see [[_gaps]]).
- **KickstartAI introducer:** Evertjan Peer (Tech Lead).
