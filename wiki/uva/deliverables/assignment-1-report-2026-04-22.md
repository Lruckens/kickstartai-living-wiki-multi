# Deliverable: Assignment 1a Written Report (2026-04-22)

**Last updated:** 2026-06-19
**Status:** ingested (text body; embedded GAPS-diagram JPG image-only, not ingested)

## Summary
The **written Assignment 1a “Project Definition” report** (`2026-04-22-problem-definition.md`) — the prose companion to the already-ingested presentation deck ([[assignment-1-presentation-2026-04-22]]). This is the **text body of the long-flagged `Assignment 1 - project definition.pdf`**, now ingested, resolving the standing “Assignment 1 PDF body unread” gap. It is the most authoritative, most detailed student-authored scoping artifact to date — a **BSc Business Analytics thesis** project-definition document with explicit literature grounding, a named author list (with student numbers), a cited problem-structuring framework, and design principles.

Full title: **“The Living Project Wiki: Designing a Self-Documenting AI System for Automated Project Knowledge Management”** — Project Definition, Assignment 1a, BSc Business Analytics Thesis, University of Amsterdam.

## Details

### Authors (NEW — identity-resolving)
| Student | Student number |
|---|---|
| **Laurenz Ruckensteiner-Geyer** | 13762931 |
| **Quinten van den Heuvel** | 15150658 |
| **Meng Cheng** | 14025906 |
| **Xiaojing Li** | 14851199 |

- **UvA Supervisor:** Hongyi Zhu.
- **Company:** KickstartAI (Stichting Kickstart AI). **Company contact:** Sanne Wielinga.
- Notable reconciliations: **“Meng Cheng”** appears in the exact roster slot prior sources gave “Cara” / “Carac M. Cheng” (same surname Cheng) — strongly reconciling the long-open “Meng” greeting-name discrepancy (the student’s name appears to be **Meng Cheng**, with “Cara”/“Carac M. Cheng” an informal/anglicised variant). Laurenz’s fuller hyphenated surname **Ruckensteiner-Geyer** is given. See [[project-team]], [[_gaps]].

### Conceptual / literature grounding (NEW substance)
- **Karpathy (2026), “LLM knowledge bases” (GitHub Gist)** — concrete citation for the inspiration (prior wiki referenced “LLM Wiki concept” loosely).
- **Stated novel contribution:** the artifact extends **Retrieval-Augmented Generation (Lewis et al., 2020)** with a **persistent, compiled knowledge layer** that overcomes RAG’s **statelessness** — in conventional RAG every query retrieves & synthesises from raw documents independently with no accumulated understanding; the Living Wiki ingests once, synthesises into structured pages, and updates them so **understanding compounds over time rather than being rediscovered on every query**. See [[living-wiki]], [[wiki-generation-engine]].
- **RAG / LLM lineage cited:** Lewis et al. (2020); Gao et al. (2023, RAG survey: naïve → advanced → modular; chunking/embedding/ranking choices affect quality); Brown et al. (2020, scale & few-shot); Ji et al. (2023, hallucination survey).

### Problem-structuring framework — GAPS diagram (RESOLVES the “DAPS” gap)
The report textually identifies the deck’s image-only “DAPS diagram” as a **“GenAI-Analytic Problem Structure (GAPS) diagram”** citing **de Mast & Lokkerbol (2024), “DAPS diagrams for defining Data Science projects,” *Journal of Big Data* 11(1)**. So “DAPS” = de Mast’s published DAPS-diagram method; the project’s instance is the **GenAI-adapted GAPS** variant. The diagram *image* itself remains not legible (an embedded JPG), but its framework identity/origin is now known. See [[gaps-diagram]], [[_gaps]].

### Architecture framing — five components + shared evaluation (clarifies the arithmetic)
The report frames the system as **five interconnected components, each the individual research focus of one group member**, **plus** the **evaluation framework as a collaborative/shared deliverable** (not a sixth member-owned module):
1. **Ingestion + Wiki Generation Engine** — Member 1 (counted as one component). See [[ingestion-pipeline]], [[wiki-generation-engine]].
2. **Generator Module** — Member 2. See [[generator-module]].
3. **Gap Detector** — Member 3. See [[gap-detector]].
4. **Permission Layer** — Member 4. See [[permission-layer]].
5. **Evaluation Framework** — **collaboratively designed & executed** by all four members; each additionally contributes component-level results into their own thesis. See [[evaluation-deliverable]], [[evaluation-framework]].

> The report’s “five components, each a member’s focus + collaborative evaluation” is the cleanest statement yet reconciling the 6-deliverable architecture with 4 students. It **corroborates the presentation’s** Member-4-individual permission-layer split and names **evaluation** as the collaborative deliverable — disagreeing with the supervisor-kickoff’s “permission layer collaborative” note. See conflict note in [[_gaps]], [[permission-layer]].

### Business value (three value streams)
1. **Eliminate manual knowledge compilation** — decisions summarised/synthesised, periodic summaries & opinionated drafts generated automatically rather than written by engineers.
2. **Persistent, compounding knowledge infrastructure** — deploy across all KickstartAI projects via configuration, not rewrite; learnings cross projects.
3. **Leadership positioning** — offering the wiki as a best practice to partners demonstrates KickstartAI’s leading position and accelerates AI adoption in the Dutch ecosystem.

### Design principles (NEW)
- **Modularity** (Bass, Clements & Kazman, 2012) — components develop/test/maintain independently.
- **Continuous learning** (Parisi et al., 2019) — adapt/improve by incorporating new data.
- **Scalability** (Dean & Ghemawat, 2008) — efficiently handle growing data/users/compute.
- **Security, privacy & data protection, reliability, transparency** — grounded in GDPR (EU 2016), NIST SP 800-53, ISO/IEC 27001:2013, Kroll et al. (2017).

### MoSCoW prioritisation (corroborates deck)
- **Must:** ingestion (PDFs/markdown/meeting notes); LLM wiki engine with **daily refresh**; basic eval (accuracy + freshness).
- **Should:** generator (weekly digests + stakeholder summaries); gap detector; **permission-layer design**.
- **Could:** blog drafts with tone alignment; HITL feedback; comparative generated-vs-human eval.
- **Won’t (this iteration):** full production deployment; real-time/sub-daily updates; a completely working permission layer.

### Research questions (with report-level expansions)
- **Group RQ:** How can a modular LLM-powered system turn heterogeneous project documents into a continuously updated structured knowledge base?
- **Member 1 (Ingestion + Wiki Engine):** change detection in a heterogeneous corpus → structured updated pages; researches change-detection mechanisms, document versioning, and **compares full page regeneration vs. incremental updates** for quality/consistency.
- **Member 2 (Generator):** LLM-based generation of periodic, stakeholder-specific outputs + systematic evaluation; named strategies: **direct prompting, RAG, template-driven generation**; quality across accuracy/freshness/coverage/usefulness.
- **Member 3 (Gap Detector):** rule-based, semantic, and graph-based methods to detect knowledge gaps; outputs a **structured gap report** highlighting missing/incomplete knowledge.
- **Member 4 (Permission Layer):** permission-aware architecture mitigating **information leakage from restricted source documents into synthesized wiki pages** — because the wiki serves *synthesised* content, **traditional access control is insufficient**; defines leakage in the LLM-synthesis context, designs an architecture to prevent it, evaluates it.

### Shared deliverable — evaluation framework (verbatim dimensions)
All four members collaboratively design & execute an integrated framework across **four dimensions**:
- **Coverage** — are all important topics represented in the wiki?
- **Freshness** — does the wiki reflect the most recent documents?
- **Accuracy** — does the wiki faithfully represent source material without hallucination?
- **Usefulness** — do users find what they need?
Each member additionally contributes component-level evaluation for their own sub-system.

### Final artifact & methodology
- **Artifact:** modular, production-oriented GenAI system (five integrated components) + technical README, architecture diagram, usage guide + a working demo applied to the team’s own documentation.
- **DSR** (Hevner, 2007, “three-cycle view”): Relevance / Rigor / Design cycles.
- **CRISP-DM** (Chapman et al., 2000; Martínez-Plumed et al., 2021): business understanding → data understanding → data preparation (extraction/cleaning/tokenisation/chunking) → modelling (mock-up → MVP → artifact) → evaluation → deployment.
- **3-phase / 12-week procedure:** Phase 1 (wks 1–4) problem definition & design + cold-start corpus (project-definition docs, meeting notes, onboarding materials); Phase 2 (wks 5–9) per-member literature review, design alternatives, mock-up + MVP, initial integration; Phase 3 (wks 10–12) integrated evaluation + individual theses + final presentation/demo.

### Not ingested
- The **GAPS-diagram image** (embedded JPG) — node/layer contents not legible, not fabricated. See [[gaps-diagram]], [[_gaps]].
- Cited **external references** are recorded as citations only; their bodies are not ingested.

## Related
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-project-definition]]
- [[gaps-diagram]]
- [[living-wiki]]
- [[wiki-generation-engine]]
- [[ingestion-pipeline]]
- [[generator-module]]
- [[gap-detector]]
- [[permission-layer]]
- [[evaluation-deliverable]]
- [[evaluation-framework]]
- [[project-team]]
- [[user-journeys]]
- [[_overview]]

## Sources
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable; embedded GAPS-diagram JPG image-only, not ingested)