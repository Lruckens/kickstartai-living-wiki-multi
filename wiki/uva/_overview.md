# Living Wiki (UvA) — Overview

**Status:** scoping
**Last updated:** 2026-06-16

## What this project is about
The Living Project Wiki is a self-documenting GenAI system that continuously ingests heterogeneous project documents (PDFs, markdown, GitHub repos, meeting notes, emails, slide decks) and produces a living, auto-updating knowledge base. Inspired by Andrej Karpathy's "LLM Wiki" concept, it goes beyond document search to synthesize, summarize, detect changes, and surface connections across a project's knowledge base.

The recursive twist: the first project this system documents is *itself*. See [[living-wiki]] for the core concept.

The project is run for [[kickstartai]] by students at the [[uva-ai4business-lab]]. The architecture is explicitly designed for reuse across all KickstartAI projects once the initial use case is complete.

## Current status
Scoping / kickoff. Founding brief received 2026-04-02 (`2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md`). Scope, user journeys, and sub-deliverables defined; team, timeline, and tech stack not yet documented.

## Key decisions
- Privacy/permissions are a first-class design concern: deploying to a sensitive project later should require configuration, not a rewrite. See [[permission-model]].
- Blog post drafts must be evaluated against a human-written baseline.

## Open questions
See [[_gaps]] for the full list (team, timeline, tech stack, source connectors, regeneration cadence, tone spec).

## Key concepts
- [[living-wiki]] — the core self-updating LLM Wiki concept
- [[user-journeys]] — the 5 defining product requirements
- [[permission-model]] — document-level access control
- [[evaluation-framework]] — coverage, freshness, accuracy, usefulness + HITL

## Team
KickstartAI technical mentor (TBD) + UvA AI4Business Lab students (TBD). Connection to KickstartAI's engineering team available for technical discussion.
