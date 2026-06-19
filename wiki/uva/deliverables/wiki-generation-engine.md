# Deliverable: Wiki Generation Engine

**Last updated:** 2026-06-19
**Status:** scoped (Must Have); first MVP exists (GitHub, 2026-05-14)

## Summary
An LLM-powered, **RAG-grounded** system that processes ingested documents into structured, interlinked wiki pages organized by topic. Pages regenerate or update on a configurable schedule (e.g., daily) as source material changes. It is the **persistent, compiled knowledge layer** that distinguishes the Living Wiki from stateless RAG (see [[living-wiki]]).

## Details
- **First MVP exists (2026-05-14):** At the 2026-05-14 development-phase team meeting (see [[team-meeting-2026-05-14]]), **Laurenz demoed a GitHub repo** containing the **wiki architecture and a first MVP of the system** — the first concrete evidence the system exists in code. The repo itself is **not yet ingested** (flagged for future ingest — see [[_gaps]]).
- **RAG-grounded (Assignment 1, 2026-04-22):** The presentation describes the Wiki Engine as **"LLM-powered, RAG-grounded page generation & refresh"** — a retrieval-augmented-generation approach grounding pages in source documents (Lewis et al., 2020; Gao et al., 2023). See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]].
- **Persistent compiled layer:** Rather than re-synthesising from raw documents on every query, the engine compiles content into structured pages **once** and **updates them as new information arrives**, so understanding compounds over time (overcoming RAG statelessness; see [[living-wiki]]).
- **Member 1 research focus (report):** Bundled with the [[ingestion-pipeline]] under **Member 1**, whose RQ is: "How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base?" The thesis researches **change-detection mechanisms, document versioning approaches, and wiki update strategies**, explicitly **comparing full page regeneration against incremental updates** to evaluate their effect on the quality and consistency of the knowledge base. See [[assignment-1-report-2026-04-22]].
- **MoSCoW (Must Have):** An LLM-powered wiki generation engine with **daily refresh** is a Must-Have for this iteration. (Real-time / sub-daily updates are explicitly **Won't Have**.)

### Open design questions (2026-05-14 team meeting)
- **LLM choice / feasibility — OPEN.** The MVP needs to connect to an LLM; "what LLM do they use and is this possible?" remains unresolved. Specific LLM, vector store, embedding model, and RAG framework are still **not chosen** — see [[_gaps]].
- **Agentic architecture — OPEN.** "Should we turn this into agents?" — whether to build the engine as an agentic system vs. a pipeline is undecided. See [[team-meeting-2026-05-14]], [[_gaps]].
- **Information architecture (one page per project) — proposed.** The team agreed **"one wiki page should be one project, with a connection to other projects via shared topics."** This is a per-*project* page granularity (cross-linked by shared topics) reflecting the multi-project deployment vision — a coarser framing than the within-project per-*topic* pages described in [[living-wiki]]. See [[team-meeting-2026-05-14]], [[_reuse]], [[_gaps]].

## Related
- [[ingestion-pipeline]]
- [[living-wiki]]
- [[gap-detector]]
- [[team-meeting-2026-05-14]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[project-team]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-05-14-meeting-notes.md (internal UvA team working meeting notes, development phase)
