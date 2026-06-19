# Living Wiki (UvA) — Overview

**Status:** scoping (kickoff held 2026-04-13; meeting notes now ingested)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM Wiki" concept, it goes beyond document search to synthesize, summarize, detect changes, and surface connections across a project's knowledge base.

The recursive twist: the first project this system documents is *itself*. See [[living-wiki]] for the core concept. The kickoff clarified *why* self-documentation is the first task: it avoids sharing sensitive data and provides an intuitive evaluation method.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]]. The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
Scoping / kickoff. Founding brief received 2026-04-02. **Kickoff meeting held 2026-04-13** (10:00 CEST) — its **Gemini meeting notes are now ingested** (see [[kickoff-meeting-2026-04-13]]), supplying the first concrete kickoff decisions, participant backgrounds, technical guidance, and action items. First deliverable — **Assignment 1: project definition** — presented ~2026-04-22 (main goals + role assignments; see [[assignment-1-project-definition]]). The project follows the **CRISP-DM framework**; **regular check-ins** (weekly or bi-weekly) agreed in principle, exact cadence TBD. Student identities are now largely resolved (see [[project-team]]). A **project Gantt chart** (dated 2026-04-13) is a CRISP-DM draft needing revision (assumed April-1 start; chart image still un-OCR'd — see [[project-timeline]]). A **KickstartAI intro/strategy deck** (dated 2026-04-13) is partially ingested (titles/stats only; diagrams unread). Tech stack and role assignments not yet documented.

## Timeline anchors
- 2026-04-02 — founding brief received.
- ~2026-04-01 — assumed CRISP-DM project start (per draft Gantt; needs revision due to selection delay).
- 2026-04-13 — kickoff meeting (KickstartAI x UvA), 10:00 CEST; **meeting notes ingested** (see [[kickoff-meeting-2026-04-13]]).
- 2026-04-13 — project Gantt chart produced (draft; image-only — see [[project-timeline]]).
- 2026-04-13 — KickstartAI intro/strategy deck (`KAI-Intro`) partially ingested (image-heavy; diagrams not ingested).
- ~2026-04-22 (Wed) — Assignment 1 (project definition) presentation, 9–11 AM (main goals + role assignments).

## Key decisions
- Privacy/permissions are a first-class design concern; the [[permission-layer]] is **design-only** for now (need not be fully working given the short timeline) but must address sensitive-data handling from the start.
- **Document the project itself first** — avoids sensitive data and gives an intuitive evaluation method.
- Blog post drafts must be evaluated against a human-written baseline.
- **Don't rely solely on LLMs** for the core tool — critical thinking required, especially for the permission layer and evaluation framework.
- Initial input data: two-pager + slides, scrape KickstartAI website + LinkedIn, then add own PRs/notes/decisions.

## Open questions
See [[_gaps]] for the full list (tech stack, role assignments, check-in cadence, regeneration cadence, tone spec, the "Averion" handover, the "Meng" name discrepancy, lee89953@ mapping, supervisor role, evaluation data/KB, unsigned legal docs, un-OCR'd Gantt chart, un-OCR'd intro-deck diagrams / six-phase adoption model).

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL

## Team
See [[project-team]] for the full working team. In brief:
- **UvA students (4, business analytics, thesis project):** Quinten van den Heuvel (coordinator, Dutch), Xiaojing Li ("XiaoJing", China), Laurenz Ruckensteiner (Barcelona), and "Cara" ≈ Carac M. Cheng (China). The greeting name "Meng" no longer cleanly maps — see [[_gaps]].
- **KickstartAI main contact:** Sanne Wielinga (Senior ML Engineer). Project handed to her "from Averion" (unidentified — see [[_gaps]]).
- **KickstartAI introducer:** Evertjan Peer (Tech Lead).
- **Likely UvA supervisor:** h.zhu@uva.nl (role unconfirmed).
