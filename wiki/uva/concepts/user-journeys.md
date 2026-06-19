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
The kickoff deck (see [[kickoff-deck-2026-04-13]]) names **five modules to build** verbatim: ingestion pipeline, wiki generation engine, generator module, gap detector, permission layer. The **evaluation framework is not in this list** — consistent with the kickoff notes' "runs throughout" framing. The wiki tracks **6 deliverables = 5 build modules + 1 cross-cutting framework**.

### Six sub-deliverables — numbering confirmed (supervisor kickoff, 2026-04-16)
The 2026-04-16 UvA supervisor kickoff (see [[supervisor-kickoff-2026-04-16]]) **explicitly enumerates six sub-deliverables** and assigns a task-division scheme:
- **Sub-deliverables 1–4:** one group member each.
- **Sub-deliverable 5 (Permission Layer):** collaborative.
- **Sub-deliverable 6 (Evaluation Method):** each member a different method, into their own thesis.

### Member ↔ component mapping — RESOLVED (Assignment 1 presentation + report, 2026-04-22)
Both student-authored Assignment 1 artifacts — the presentation deck (see [[assignment-1-presentation-2026-04-22]]) and the written report (see [[assignment-1-report-2026-04-22]]) — **map the build components to four members**, resolving the previously-inferred #1–4 ordering:
- **Member 1** — **Ingestion Pipeline + Wiki Engine** (counted as one component)
- **Member 2** — **Generator Module**
- **Member 3** — **Gap Detector**
- **Member 4** — **Permission Layer**
- **Evaluation Framework** — the **collaborative/shared deliverable** (all four design & execute it; each contributes component-level results into their own thesis).

The report’s cleanest framing: **five member-owned components + the evaluation framework as the shared/collaborative deliverable**. This reconciles the 6-deliverable architecture with 4 students by (a) bundling ingestion + wiki engine under Member 1 and (b) treating evaluation as a group deliverable rather than a sixth member-owned module.

### Division-scheme discrepancy — RESOLVED-BY-PRECEDENCE
The supervisor-kickoff scheme (2026-04-16) recorded the **Permission Layer as collaborative** and **evaluation as per-member-into-thesis**. The two later, mutually-consistent student-authored sources (deck + report) instead assign the **Permission Layer to Member 4 individually** and name the **evaluation framework as the collaborative deliverable**. With two agreeing student-authored sources against one supervisor-kickoff note, the **Member-4-individual / evaluation-collaborative** split is treated as **confirmed**; the superseded supervisor-kickoff note is recorded (not deleted). See [[_gaps]], [[permission-layer]], [[project-team]].

Neither artifact names which *named student* is Member 1/2/3/4 — owners-by-component are resolved, but owners-by-person remain open. See [[_gaps]].

## Related
- [[living-wiki]]
- [[generator-module]]
- [[gap-detector]]
- [[kickoff-deck-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff.md (KickstartAI x UvA kickoff slide deck, text-extractable)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)