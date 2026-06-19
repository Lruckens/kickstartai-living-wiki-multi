# Concept: User Journeys

**Last updated:** 2026-06-19

## Summary
The five defining user journeys (product requirements) for the Living Wiki.

## Details
1. **The Knowledge Base** — As a student joining in week 3, query the wiki for an accurate synthesized overview of decisions so far, without reading 40 documents.
2. **The Change Tracker** — Detect when a new PR is merged or meeting note added, update relevant wiki pages, and surface a summary of what changed and why it matters.
3. **The Summarizer** — Generate periodic project summaries (weekly digests, milestone reports) for PMs/stakeholders without engineers writing status reports.
4. **The Content Generator** — Generate draft blog posts / knowledge-sharing articles in KickstartAI's voice describing approaches, lessons, and replicable patterns.
5. **The Gap Detector** — Tell the project lead what's underdocumented: decisions without rationale, PRs without explanations, meetings without recorded outcomes.

### Module framing (kickoff deck, 2026-04-13)
The kickoff deck (see [[kickoff-deck-2026-04-13]]) names **five modules to build** verbatim: ingestion pipeline, wiki generation engine, generator module, gap detector, permission layer. The **evaluation framework is not in this list** — consistent with the kickoff notes' "runs throughout" framing. The wiki tracks **6 deliverables = 5 build modules + 1 cross-cutting framework** — see [[_gaps]].

### Six sub-deliverables — numbering confirmed (supervisor kickoff, 2026-04-16)
The 2026-04-16 UvA supervisor kickoff (see [[supervisor-kickoff-2026-04-16]]) **explicitly enumerates six sub-deliverables** and assigns a task-division scheme:
- **Sub-deliverables 1–4:** one group member each.
- **Sub-deliverable 5 (Permission Layer):** collaborative.
- **Sub-deliverable 6 (Evaluation Method):** each member a different method, into their own thesis.

This second-source numbering (with #5 = Permission Layer, #6 = Evaluation Method) **reinforces the 5-build-modules + 1-cross-cutting-framework = 6-deliverable reading**. The exact 1↔module mapping for #1–4 is **not stated** by the source (inferred order: ingestion / generation engine / generator / gap detector) — see [[_gaps]].

## Related
- [[living-wiki]]
- [[generator-module]]
- [[gap-detector]]
- [[kickoff-deck-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff.md (KickstartAI x UvA kickoff slide deck, text-extractable)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
