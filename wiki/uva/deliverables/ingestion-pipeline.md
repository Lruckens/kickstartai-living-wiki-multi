# Deliverable: Ingestion Pipeline

**Last updated:** 2026-06-19
**Status:** scoped

## Summary
A system that connects to internal document sources, handles heterogeneous file types, and maintains a versioned document index with change detection.

## Details
Must handle PDFs, markdown, GitHub repos, meeting notes (transcriptions, notes), emails, and slide decks. Maintains a versioned index so changes to source documents can be detected and propagated to the wiki.

### Initial input data (from kickoff, 2026-04-13)
The kickoff meeting specified concrete starting sources:
- The KickstartAI **two-pager** and **kickoff slides**.
- **Scrape the KickstartAI website + LinkedIn posts** for initial public documents.
- Then **continuously add the team's own documentation** — pull requests, meeting notes, design decisions, and presentations.

This aligns with the "document itself first" strategy (see [[living-wiki]], [[kickoff-meeting-2026-04-13]]).

## Related
- [[living-wiki]]
- [[wiki-generation-engine]]
- [[user-journeys]]
- [[kickoff-meeting-2026-04-13]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
