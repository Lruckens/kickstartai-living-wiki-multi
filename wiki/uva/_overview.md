# Living Wiki (UvA) — Overview

**Status:** scoping (kickoff held 2026-04-13; supervisor kickoff 2026-04-16; meeting notes + kickoff slide deck now ingested)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM Wiki" concept, it goes beyond document search to synthesize, summarize, detect changes, and surface connections across a project's knowledge base.

The recursive twist: the first project this system documents is *itself*. See [[living-wiki]] for the core concept. The kickoff clarified *why* self-documentation is the first task: it avoids sharing sensitive data and provides an intuitive evaluation method. The kickoff deck (see [[kickoff-deck-2026-04-13]]) names the underlying problem verbatim — knowledge in people's heads/scattered docs, manual status compilation, and **learnings rarely reaching the next project**.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]]. The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
Scoping / kickoff. Founding brief received 2026-04-02. **Kickoff meeting held 2026-04-13** (10:00 CEST) — its **Gemini meeting notes are ingested** (see [[kickoff-meeting-2026-04-13]]), and the **kickoff slide deck** (`KickstartAI x UvA - Kick-off.pdf`) is now ingested text-extractably (see [[kickoff-deck-2026-04-13]]), supplying verbatim problem framing and the five-module build ask. A **UvA-internal supervisor kickoff** was held 2026-04-16 (see [[supervisor-kickoff-2026-04-16]]), confirming the academic supervisor (Hongyi Zhu) and the team's **task-division scheme** across the six sub-deliverables. First deliverable — **Assignment 1: project definition** — presented ~2026-04-22 (main goals + role assignments; see [[assignment-1-project-definition]]). The project follows the **CRISP-DM framework**; **regular check-ins** (weekly or bi-weekly) agreed in principle, exact cadence TBD. Student identities and the supervisor are now resolved (see [[project-team]]). A **project Gantt chart** (dated 2026-04-13) is a CRISP-DM draft needing revision (assumed April-1 start; chart image still un-OCR'd — see [[project-timeline]]). A **KickstartAI intro/strategy deck** (`KAI-Intro`, dated 2026-04-13) is partially ingested (titles/stats only; diagrams unread). Tech stack and specific #1–4 deliverable owners not yet documented.

## Timeline anchors
- 2026-04-02 — founding brief received.
- ~2026-04-01 — assumed CRISP-DM project start (per draft Gantt; needs revision due to selection delay).
- 2026-04-13 — kickoff meeting (KickstartAI x UvA), 10:00 CEST; **meeting notes ingested** (see [[kickoff-meeting-2026-04-13]]).
- 2026-04-13 — kickoff slide deck (`KickstartAI x UvA - Kick-off.pdf`) ingested, **text-extractable** (see [[kickoff-deck-2026-04-13]]).
- 2026-04-13 — project Gantt chart produced (draft; image-only — see [[project-timeline]]).
- 2026-04-13 — KickstartAI intro/strategy deck (`KAI-Intro`) partially ingested (image-heavy; diagrams not ingested).
- 2026-04-16 — UvA-internal supervisor kickoff; supervisor (Hongyi Zhu) confirmed; task-division scheme agreed (see [[supervisor-kickoff-2026-04-16]]).
- ~2026-04-22 (Wed) — Assignment 1 (project definition) presentation, 9–11 AM (main goals + role assignments).

## Key decisions
- Privacy/permissions are a first-class design concern; the [[permission-layer]] is **design-only** for now (need not be fully working given the short timeline) but must address sensitive-data handling from the start. Sub-deliverable 5 is a **team-collaborative** task.
- **Document the project itself first** — avoids sensitive data and gives an intuitive evaluation method.
- Blog post drafts must be evaluated against a human-written baseline.
- **Don't rely solely on LLMs** for the core tool — critical thinking required, especially for the permission layer and evaluation framework.
- Initial input data: two-pager + slides, scrape KickstartAI website + LinkedIn, then add own PRs/notes/decisions ("starts with KickstartAI docs + lab materials on day one"). The supervisor kickoff noted the current **cold-start** data situation.
- **Five build modules + one cross-cutting evaluation framework** — the kickoff deck names five build modules; the supervisor kickoff enumerates **six sub-deliverables** (1–4 individual, 5 collaborative, 6 evaluation per-member-into-thesis). See [[_gaps]].

## Open questions
See [[_gaps]] for the full list (tech stack, specific #1–4 deliverable owners, check-in cadence, individual supervisor-meeting dates, regeneration cadence, tone spec, the "Averion" handover, the "Meng" name discrepancy, un-OCR'd Gantt chart, un-OCR'd intro-deck diagrams / six-phase adoption model, `KAI-Intro` ↔ `20260413 UvA.pdf` mapping).

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL

## Team
See [[project-team]] for the full working team. In brief:
- **UvA students (4, business analytics, thesis project):** Quinten van den Heuvel (coordinator, Dutch), Xiaojing Li ("XiaoJing"/lee89953@, China), Laurenz Ruckensteiner (Barcelona), and "Cara" ≈ Carac M. Cheng (China). The greeting name "Meng" no longer cleanly maps — see [[_gaps]].
- **UvA academic supervisor:** Hongyi Zhu (h.zhu@uva.nl) — confirmed via the 2026-04-16 supervisor kickoff.
- **KickstartAI main contact:** Sanne Wielinga (Senior ML Engineer). Project handed to her "from Averion" (unidentified — see [[_gaps]]).
- **KickstartAI introducer:** Evertjan Peer (Tech Lead).
