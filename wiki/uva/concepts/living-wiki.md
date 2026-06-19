# Concept: Living Wiki

**Last updated:** 2026-06-19

## Summary
A self-documenting, auto-updating knowledge base that continuously ingests project documents and rewrites/expands itself as new information arrives. Inspired by Andrej Karpathy's "LLM Wiki"/"LLM knowledge bases" concept (Karpathy, 2026 — GitHub Gist). It goes beyond simple document search: it synthesizes, summarizes, detects changes, and surfaces connections across a project's knowledge base.

## Details
The system ingests heterogeneous document types (PDFs, markdown, GitHub repos, meeting notes/transcriptions, emails, slide decks), produces structured interlinked wiki-style pages that stay current as source documents change, and regenerates on a configurable schedule (e.g., daily).

### Novel contribution — persistent compiled knowledge layer (Assignment 1a report, 2026-04-22)
The written report (see [[assignment-1-report-2026-04-22]]) sharpens the technical contribution: the system extends **Retrieval-Augmented Generation (Lewis et al., 2020)** with a **persistent, compiled knowledge layer** that overcomes RAG’s **statelessness limitation** (identified by Karpathy, 2026). In conventional RAG, every query retrieves and synthesises from raw documents independently, with no accumulated understanding between queries. The Living Wiki instead **ingests documents once, synthesises their content into structured wiki pages, and updates those pages as new information arrives** — so understanding **compounds over time rather than being rediscovered on every query**. RAG principles remain central to grounding page generation in verified source material; the contribution lies in the persistent auto-updating knowledge structure. See [[wiki-generation-engine]].

### Problem statement (kickoff deck, verbatim, 2026-04-13)
The kickoff slide deck (`KickstartAI x UvA - Kick-off.pdf`; see [[kickoff-deck-2026-04-13]]) states the problem verbatim:
- Project knowledge lives in **people's heads and scattered documents**.
- Status updates require someone to **stop and compile them manually**.
- **Learnings from one project rarely reach the next one.** (Source-level articulation of the cross-project reuse motivation — see [[_reuse]].)

The Assignment 1 artifacts (see [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]]) restate the same problem from the students' own framing — documents scattered across repos/drives/notes, critical knowledge only in people's minds, no way to search/synthesise across sources, manual documentation can't keep pace, slow/costly onboarding.

### "Document itself first" rationale
The recursive twist: the first project this system documents is itself. The kickoff deck states this verbatim — **"The first project this system documents is itself"** — and adds:
- "Starts with KickstartAI docs and lab materials **on day one**."
- "Grows as you work – **every PR, meeting note, and decision feeds in**."
- "By the end: **a complete auto-generated record of how it was built**."

The Assignment 1 presentation labels this **"The Meta-Twist"** and frames two further benefits — **Eliminate Manual Work** (auto-summarized decisions + digests) and **Compounding Knowledge** (config-based deployment across all KickstartAI projects so cross-project learnings become systematically accessible). See [[assignment-1-presentation-2026-04-22]], [[_reuse]].

The kickoff meeting further clarified *why* self-documentation is the chosen first task — it **avoids sharing sensitive data** and **provides an intuitive evaluation method**.

## Related
- [[user-journeys]]
- [[ingestion-pipeline]]
- [[wiki-generation-engine]]
- [[gap-detector]]
- [[evaluation-framework]]
- [[kickoff-meeting-2026-04-13]]
- [[kickoff-deck-2026-04-13]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[_overview]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-13-KAI-UvA-Kickoff.md (KickstartAI x UvA kickoff slide deck, text-extractable)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)