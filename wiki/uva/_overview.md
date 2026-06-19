# Living Wiki (UvA) — Overview

**Status:** scoping (kickoff held 2026-04-13)
**Last updated:** 2026-06-19

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM Wiki" concept, it goes beyond document search to synthesize, summarize, detect changes, and surface connections across a project's knowledge base.

The recursive twist: the first project this system documents is *itself*. See [[living-wiki]] for the core concept.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]]. The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
Scoping / kickoff. Founding brief received 2026-04-02 (`2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md`). **Kickoff meeting held 2026-04-13** (10:00 CEST). First deliverable — **Assignment 1: project definition** — presented ~2026-04-22 (see [[assignment-1-project-definition]]). Scope, user journeys, and sub-deliverables defined; the team is now named (see [[project-team]]). A **project Gantt chart / timeline artifact now exists** (dated 2026-04-13), but it was ingested as an image only — its actual phases/milestones/end date are unread (see [[project-timeline]]). A **KickstartAI intro/strategy deck** (dated 2026-04-13) is now partially ingested (titles/stats only; diagrams unread — see [[kickstartai]], [[adoption-journey]]). Full timeline detail and tech stack not yet documented.

## Timeline anchors
- 2026-04-02 — founding brief received.
- 2026-04-13 — kickoff meeting (KickstartAI x UvA), 10:00 CEST (Gemini meeting notes exist, not yet ingested).
- 2026-04-13 — project Gantt chart produced (image-only; contents not ingested — see [[project-timeline]]).
- 2026-04-13 — KickstartAI intro/strategy deck (`KAI-Intro`) partially ingested (image-heavy; diagrams not ingested — see [[kickstartai]], [[adoption-journey]]).
- ~2026-04-22 (Wed) — Assignment 1 (project definition) presentation, 9–11 AM.

## Key decisions
- Privacy/permissions are a first-class design concern: deploying to a sensitive project later should require configuration, not a rewrite. See [[permission-model]].
- Blog post drafts must be evaluated against a human-written baseline.

## Open questions
See [[_gaps]] for the full list (full timeline detail, tech stack, source connectors, regeneration cadence, tone spec, student name-mapping, supervisor role, mentor labeling, un-OCR'd Gantt chart, un-OCR'd intro-deck diagrams / six-phase adoption model).

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL

## Team
See [[project-team]] for the full working team. In brief:
- **UvA students (4):** Quinten van den Heuvel (coordinator), Laurenz Ruckensteiner, plus two members (lee89953@gmail.com, carac.m.cheng@gmail.com); greeting names "Quinten, XiaoJing, Laurenz, Meng" (alias↔name mapping ambiguous).
- **KickstartAI POC:** Sanne Wielinga (Senior ML Engineer).
- **KickstartAI introducer:** Evertjan Peer (Tech Lead).
- **Likely UvA supervisor:** h.zhu@uva.nl (role unconfirmed).
