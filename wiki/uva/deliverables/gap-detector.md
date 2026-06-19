# Deliverable: Gap Detector

**Last updated:** 2026-06-19
**Status:** scoped (Should Have); **built — 6-layer hybrid framework with UI (2026-06-12); integrated as a dashboard + report page (2026-06-15)**

## Summary
Identifies underdocumented areas, unresolved decisions, or missing rationale — e.g., decisions without rationale, PRs without explanations, meetings without recorded outcomes. Outputs a **structured, ranked gap report** highlighting missing or incomplete knowledge. As of **2026-06-12** a working **6-layer hybrid implementation** exists (see [[mockup-artifact-2026-06-12]]); by **2026-06-15** it is integrated into the wiki UI as a **dashboard + report page** (see [[team-meeting-2026-06-15]]).

## Ownership — Cara / Meng Cheng, POSITIVELY CONFIRMED (2026-06-12)
The 2026-06-12 mock-up artifact (see [[mockup-artifact-2026-06-12]]) gives the **first positive evidence** that **Cara / Meng Cheng** owns the Gap Detector (Member 3) — a full Gap Detector design attributed to her in the same integrated-artifact set as the other three members' named components. This **resolves** the long-standing by-elimination-only inference recorded across [[project-team]], [[user-journeys]], and [[_gaps]]. Cara ↔ Member 3 is now positively evidenced, not merely inferred.

## Details
Serves the Gap Detector user journey, so project leads know where knowledge is at risk. Output feeds into pages like [[_gaps]]. Per the Assignment 1a report, the module is integrated into the wiki system, automatically analysing project documents to detect incomplete or incorrectly recorded areas, and generating a **structured gap report**. Detection methods are compared via an evaluation framework on accuracy and effectiveness. See [[assignment-1-report-2026-04-22]].

### Built design — 6-layer hybrid framework (2026-06-12)
A hybrid framework combining rule-based detection, semantic analysis, and graph analysis to identify and prioritize knowledge gaps, built on top of the wiki ingestion pipeline (see [[mockup-artifact-2026-06-12]]):
1. **Rule-Based Layer** — deterministic rules for explicit, structural, and keyword-based gaps (missing sections, incomplete structures, predefined missing-information patterns against a fixed gap-definition schema).
2. **Semantic Analysis Layer** — implicit/expression gaps and semantic inconsistencies via **LLM-based reasoning (prompt-driven)** + **cosine similarity over embeddings**.
3. **Graph Analysis Layer** — documents modeled as a knowledge graph; **Claude extracts entities + typed relationships**, **NetworkX `DiGraph`** constructs the graph; graph algorithms detect missing dependencies, orphan nodes, broken reasoning chains.
4. **Gap Aggregation Layer** — dedupe overlapping gaps, merge multi-source evidence, track frequency across layers, enrich with affected entities → unified structured representation.
5. **Ranking Layer (Hybrid)** — LLM reasoning + deterministic scoring. `Final Score = (0.45 × Severity + 0.40 × Impact + 0.15 × Frequency) × Risk Multiplier` (Risk: High=1.1, Medium=1.0, Low=0.9). Confidence reported **separately** as a reliability indicator.
6. **Gap Report Layer** — ranked list prioritised by business impact; each gap includes evidence, category, priority score, root cause, and a concrete fix recommendation. A UI presents both an overview report and individual gap reports.

### Integrated into the wiki UI (2026-06-15)
At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]) the Gap Detector was added to the integrated wiki as an **additional page with a dashboard + report feature**. ⚠️ A minor **UX issue** was flagged: the **"Team confirmed" label is unclear** and should be clarified. The Gap Detector is to be **evaluated at component level** (it does not join the 17.06 text-generation evaluation meeting). See [[evaluation-deliverable]], [[_gaps]].

### Stakeholder feedback — scoring transparency (Sanne, 2026-06-12)
Sanne flagged the scoring methodology for **greater transparency/justification**: importance/significance and confidence/reliability are **combined into a single score** and should be **presented separately**; detection thresholds for **Precision/Recall/F1** should be justified or empirically validated; the **manually-defined weights (0.45/0.40/0.15) and risk multipliers** need supporting rationale, testing, or expert judgment. Also flagged a usability concern — the tool must be usable by non-technical company staff. See [[evaluation-deliverable]], [[_gaps]].

### MoSCoW & ownership (Assignment 1, 2026-04-22)
- **Should Have:** gap detector identifying underdocumented areas.
- **Ownership:** Assigned to **Member 3** — now positively confirmed as **Cara / Meng Cheng** (2026-06-12). The Member 3 RQ scopes the methods: "To what extent can **rule-based, semantic and graph-based** methods detect knowledge gaps in wiki systems?" — directly realized by the 6-layer framework. See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]], [[project-team]].

## Related
- [[user-journeys]]
- [[wiki-generation-engine]]
- [[mockup-artifact-2026-06-12]]
- [[team-meeting-2026-06-15]]
- [[evaluation-deliverable]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[project-team]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-06-12-mock-up-artifact.md (Living Wiki UI mock-up artifact description + Sanne feedback, development phase)
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
