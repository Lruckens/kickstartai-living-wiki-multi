# Deliverable: Ingestion Pipeline

**Last updated:** 2026-06-19
**Status:** scoped (Must Have)

## Summary
A system that connects to internal document sources, handles heterogeneous file types, and maintains a versioned document index with change detection.

## Details
Must handle PDFs, markdown, GitHub repos, meeting notes (transcriptions, notes), emails, and slide decks. Maintains a versioned index so changes to source documents can be detected and propagated to the wiki. The Assignment 1a report describes the **data-preparation** transforms: text extraction, cleaning, tokenization, and chunking into structured machine-readable formats (CRISP-DM data-preparation phase). See [[assignment-1-report-2026-04-22]].

### Initial input data (from kickoff, 2026-04-13; report corroborates)
The kickoff meeting and deck specified concrete starting sources:
- The KickstartAI **two-pager** and **kickoff slides**.
- Per the kickoff deck (see [[kickoff-deck-2026-04-13]]): ingestion **"starts with KickstartAI docs and lab materials on day one"** and **"every PR, meeting note, and decision feeds in"** as work proceeds.
- **Scrape the KickstartAI website + LinkedIn posts** for initial public documents.
- Then **continuously add the team's own documentation** — pull requests, meeting notes, design decisions, and presentations.
- The report frames the Phase-1 **cold-start corpus** as project-definition documents, meeting notes, and onboarding materials — a limited but evolving, unstructured, heterogeneous dataset. See [[assignment-1-report-2026-04-22]].

The specific "lab materials" set (UvA AI4Business Lab docs) remains un-ingested/unspecified — see [[_gaps]]. This aligns with the "document itself first" strategy (see [[living-wiki]], [[kickoff-meeting-2026-04-13]]).

### MoSCoW & ownership (Assignment 1, 2026-04-22)
- **Must Have:** ingestion pipeline supporting **PDFs, markdown, and meeting notes** (a minimum file-type set for this iteration).
- **Ownership:** Assigned to **Member 1**, bundled with the [[wiki-generation-engine]]. The Member 1 RQ concerns **detecting changes in a heterogeneous document corpus** to produce a continuously updated structured knowledge base. See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]], [[project-team]].

## Related
- [[living-wiki]]
- [[wiki-generation-engine]]
- [[user-journeys]]
- [[kickoff-meeting-2026-04-13]]
- [[kickoff-deck-2026-04-13]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-13-KAI-UvA-Kickoff.md (KickstartAI x UvA kickoff slide deck, text-extractable)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)