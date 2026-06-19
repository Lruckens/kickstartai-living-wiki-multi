# Deliverable: Wiki Generation Engine

**Last updated:** 2026-06-19
**Status:** scoped (Must Have)

## Summary
An LLM-powered, **RAG-grounded** system that processes ingested documents into structured, interlinked wiki pages organized by topic. Pages regenerate or update on a configurable schedule (e.g., daily) as source material changes. It is the **persistent, compiled knowledge layer** that distinguishes the Living Wiki from stateless RAG (see [[living-wiki]]).

## Details
- **RAG-grounded (Assignment 1, 2026-04-22):** The presentation describes the Wiki Engine as **"LLM-powered, RAG-grounded page generation & refresh"** — a retrieval-augmented-generation approach grounding pages in source documents (Lewis et al., 2020; Gao et al., 2023). See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]].
- **Persistent compiled layer:** Rather than re-synthesising from raw documents on every query, the engine compiles content into structured pages **once** and **updates them as new information arrives**, so understanding compounds over time (overcoming RAG statelessness; see [[living-wiki]]).
- **Member 1 research focus (report):** Bundled with the [[ingestion-pipeline]] under **Member 1**, whose RQ is: "How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base?" The thesis researches **change-detection mechanisms, document versioning approaches, and wiki update strategies**, explicitly **comparing full page regeneration against incremental updates** to evaluate their effect on the quality and consistency of the knowledge base. See [[assignment-1-report-2026-04-22]].
- **MoSCoW (Must Have):** An LLM-powered wiki generation engine with **daily refresh** is a Must-Have for this iteration. (Real-time / sub-daily updates are explicitly **Won't Have**.)
- Specific LLM, vector store, embedding model, and RAG framework are **not yet chosen** — see [[_gaps]].

## Related
- [[ingestion-pipeline]]
- [[living-wiki]]
- [[gap-detector]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[project-team]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)