# Concept: Living Wiki

**Last updated:** 2026-06-19

## Summary
A self-documenting, auto-updating knowledge base that continuously ingests project documents and rewrites/expands itself as new information arrives. Inspired by Andrej Karpathy's "LLM Wiki" concept. It goes beyond simple document search: it synthesizes, summarizes, detects changes, and surfaces connections across a project's knowledge base.

## Details
The system ingests heterogeneous document types (PDFs, markdown, GitHub repos, meeting notes/transcriptions, emails, slide decks), produces structured interlinked wiki-style pages that stay current as source documents change, and regenerates on a configurable schedule (e.g., daily).

### Problem statement (kickoff, 2026-04-13)
The kickoff meeting framed the underlying problem: documentation (meeting notes, design decisions, code) from **multiple concurrent AI projects is scattered**. The living wiki addresses this by continuously ingesting project documents to produce an auto-updating knowledge base that synthesizes, summarizes, detects changes, and surfaces connections. See [[kickoff-meeting-2026-04-13]].

### "Document itself first" rationale
The recursive twist: the first project this system documents is itself. The kickoff clarified *why* this is the chosen first task — it **avoids sharing sensitive data** and **provides an intuitive evaluation method**. By the end, the wiki is a complete auto-generated record of how the system was built.

## Related
- [[user-journeys]]
- [[ingestion-pipeline]]
- [[wiki-generation-engine]]
- [[gap-detector]]
- [[evaluation-framework]]
- [[kickoff-meeting-2026-04-13]]
- [[_overview]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
