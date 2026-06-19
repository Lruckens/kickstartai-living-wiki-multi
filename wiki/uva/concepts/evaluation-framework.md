# Concept: Evaluation Framework

**Last updated:** 2026-06-19

## Summary
Framework to measure wiki quality across four dimensions: coverage, freshness, accuracy, and usefulness, with human-in-the-loop feedback to improve generation over time. The kickoff meeting (2026-04-13) emphasized that this framework should **run throughout** the project. The Assignment 1a report confirms it as the team’s **collaboratively designed and executed shared deliverable**. As of **2026-06-11** the team has begun the evaluation phase (Quinten leading metric selection).

## Details
Four dimensions (verbatim from the Assignment 1a report — see [[assignment-1-report-2026-04-22]]):
- **Coverage** — Are all important topics represented in the wiki?
- **Freshness** — Does the wiki reflect the most recent documents?
- **Accuracy** — Does it faithfully represent source material without hallucination?
- **Usefulness** — Do users find what they need?

Human feedback / evaluation logs collected during the project refine generation quality. The blog post draft (see [[generator-module]]) is specifically to be evaluated against a human-written version to make the creativity/opinion angle measurable.

### Evaluation phase begins — development status (2026-06-11)
At the 2026-06-11 team meeting (see [[team-meeting-2026-06-11]]) the team began operationalizing the evaluation framework:
- **Quinten leads evaluation-metric selection** — he will **share a list of metric options** that can be implemented for the framework, and can **already start applying metrics** because his [[generator-module]] is integrated into the wiki and functional.
- **Two evaluation "families" (NEW structural insight):**
  - **Laurenz + Quinten** — can use **comparable evaluation frameworks** because both modules **generate text using LLMs**.
  - **Cara + Xiaojing** — both use **different frameworks** (their components do not generate text the same way).
The **specific metrics** mapping to the four dimensions are not yet chosen — see [[_gaps]].

### MoSCoW prioritization (Assignment 1, 2026-04-22)
A **basic framework (accuracy + freshness)** is a **Must Have**, while the fuller comparative (generated-vs-human) evaluation and HITL feedback are **Could Have** stretch goals. See [[evaluation-deliverable]], [[assignment-1-presentation-2026-04-22]].

### Kickoff guidance (2026-04-13)
- The **self-documentation** approach was chosen partly as an **intuitive evaluation method** (the team can judge whether the wiki accurately reflects its own project work).
- Sanne is to **check whether a knowledge base or additional/better evaluation criteria can be provided** — outcome pending (see [[_gaps]]).
- Sanne advised the students **not to rely solely on LLMs** for building the evaluation framework — it specifically requires their critical thinking.

### Production approach — collaborative shared deliverable (Assignment 1a report, 2026-04-22)
The written report states that **all four members collaboratively design and execute** an integrated evaluation framework assessing the system as a whole across the four dimensions, and that **each member additionally contributes component-level evaluation results for their own sub-system** (enabling both local and end-to-end assessment). This supersedes-by-precedence the supervisor-kickoff’s “each member a different method into their own thesis” framing of evaluation as the (sole) individual track — the report makes the *framework itself* the collaborative deliverable, with component-level results in each thesis. See [[evaluation-deliverable]], [[user-journeys]], [[supervisor-kickoff-2026-04-16]].

This concept is also tracked as a deliverable — see [[evaluation-deliverable]].

## Related
- [[evaluation-deliverable]]
- [[generator-module]]
- [[team-meeting-2026-06-11]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-06-11-meeting-notes.md (internal UvA team working meeting notes, development phase)
