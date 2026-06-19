# Living Wiki (UvA) — Overview

**Status:** scoping → project-definition complete (Assignment 1 presented ~2026-04-22; presentation deck ingested)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM Wiki" concept, it goes beyond document search to synthesize, summarize, detect changes, and surface connections across a project's knowledge base.

The recursive twist: the first project this system documents is *itself* (the presentation calls this "The Meta-Twist"). See [[living-wiki]]. The kickoff clarified *why* self-documentation is the first task: it avoids sharing sensitive data and provides an intuitive evaluation method.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]]. The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
Project-definition milestone reached. The **Assignment 1 project-definition presentation** (~2026-04-22; deck `2026-04-22-presentation-slides.md`) is now **ingested** (see [[assignment-1-presentation-2026-04-22]]), defining: a **six-component architecture**, **MoSCoW prioritization**, a **DSR + CRISP-DM** methodology, a **12-week / 3-phase timeline**, and **group + per-member research questions**. The deck **resolves the #1–4 sub-deliverable ↔ component mapping** (M1 Ingestion+Wiki Engine, M2 Generator, M3 Gap Detector, M4 Permission Layer) — though it **conflicts** with the supervisor-kickoff scheme on the Permission Layer (individual vs. collaborative; see [[_gaps]]). Prior context: kickoff meeting (2026-04-13, notes ingested — see [[kickoff-meeting-2026-04-13]]), kickoff slide deck (text-extractable — see [[kickoff-deck-2026-04-13]]), supervisor kickoff (2026-04-16 — see [[supervisor-kickoff-2026-04-16]]). Student identities and the supervisor are resolved (see [[project-team]]). Tech stack remains undecided (RAG/LLM named, but no specific LLM/vector store/framework), and which *named student* is Member 1/2/3/4 is still open.

## Timeline anchors
- 2026-04-02 — founding brief received.
- ~2026-04-01 — assumed CRISP-DM project start (per draft Gantt; needs revision due to selection delay).
- 2026-04-13 — kickoff meeting (KickstartAI x UvA), 10:00 CEST; **meeting notes ingested** (see [[kickoff-meeting-2026-04-13]]).
- 2026-04-13 — kickoff slide deck (`KickstartAI x UvA - Kick-off.pdf`) ingested, **text-extractable** (see [[kickoff-deck-2026-04-13]]).
- 2026-04-13 — project Gantt chart produced (draft; image-only — see [[project-timeline]]).
- 2026-04-13 — KickstartAI intro/strategy deck (`KAI-Intro`) partially ingested (image-heavy; diagrams not ingested).
- 2026-04-16 — UvA-internal supervisor kickoff; supervisor (Hongyi Zhu) confirmed; task-division scheme agreed (see [[supervisor-kickoff-2026-04-16]]).
- ~2026-04-22 (Wed) — Assignment 1 (project definition) presentation, 9–11 AM; **deck ingested** (see [[assignment-1-presentation-2026-04-22]]).
- **Project plan:** 12 weeks / 3 phases — Phase 1 (wks 1–4) design; Phase 2 (wks 5–9) development; Phase 3 (wks 10–12) evaluation & synthesis (week numbers only; absolute dates not pinned).

## Key decisions
- Privacy/permissions are a first-class design concern; the [[permission-layer]] is **design-only** for now (MoSCoW: design = Should, fully working = Won't) but must address sensitive-data handling from the start.
- **Document the project itself first** — avoids sensitive data and gives an intuitive evaluation method.
- Blog post drafts evaluated against a human-written baseline (MoSCoW: a **Could** stretch goal; basic accuracy+freshness eval is the **Must**).
- **Don't rely solely on LLMs** for the core tool — critical thinking required, especially for the permission layer and evaluation framework.
- **Methodology:** **Design Science Research (DSR)** layered with **CRISP-DM**.
- **Six-component architecture** = 5 build modules + 1 evaluation framework, split across 4 members (ingestion+wiki engine bundled under Member 1; evaluation as group framework + per-member thesis methods).

## Open questions
See [[_gaps]] for the full list (member↔named-student mapping for #1–4, division-scheme discrepancy vs. supervisor kickoff, tech stack, check-in cadence, individual supervisor-meeting dates, regeneration cadence, tone spec, the "Averion" handover, the "Meng" name discrepancy, un-OCR'd Gantt chart, DAPS diagram contents, un-OCR'd intro-deck diagrams / six-phase adoption model, `KAI-Intro` ↔ `20260413 UvA.pdf` mapping).

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements + member↔component mapping
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL

## Team
See [[project-team]] for the full working team. In brief:
- **UvA students (4, business analytics, thesis project):** Quinten van den Heuvel (coordinator, Dutch), Xiaojing Li ("XiaoJing"/lee89953@, China), Laurenz Ruckensteiner (Barcelona), and "Cara" ≈ Carac M. Cheng (China). Component ownership (M1–M4) is assigned by component but not yet mapped to named students — see [[_gaps]].
- **UvA academic supervisor:** Hongyi Zhu (h.zhu@uva.nl) — confirmed via the 2026-04-16 supervisor kickoff.
- **KickstartAI main contact:** Sanne Wielinga (Senior ML Engineer). Project handed to her "from Averion" (unidentified — see [[_gaps]]).
- **KickstartAI introducer:** Evertjan Peer (Tech Lead).
