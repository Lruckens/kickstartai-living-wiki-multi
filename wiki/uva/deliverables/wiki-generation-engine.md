# Deliverable: Wiki Generation Engine

**Last updated:** 2026-06-19
**Status:** scoped (Must Have); first MVP exists (GitHub, 2026-05-14); LLM backend confirmed (Claude Code + Anthropic API)

## Summary
An LLM-powered, **RAG-grounded** system that processes ingested documents into structured, interlinked wiki pages organized by topic. Pages regenerate or update on a configurable schedule (e.g., daily) as source material changes. It is the **persistent, compiled knowledge layer** that distinguishes the Living Wiki from stateless RAG (see [[living-wiki]]).

## Details
- **First MVP exists (2026-05-14):** At the 2026-05-14 development-phase team meeting (see [[team-meeting-2026-05-14]]), **Laurenz demoed a GitHub repo** containing the **wiki architecture and a first MVP of the system** — the first concrete evidence the system exists in code.
- **GitHub repo — URL known (2026-05-15):** The repo is `https://github.com/Lruckens/kickstartai-living-wiki` (shared in the demo follow-up thread — see [[laurenz-sanne-email-2026-05-15]]). The repo **body/schema is still not ingested** — flagged for future ingest. See [[_gaps]].
- **LLM backend — RESOLVED (2026-05-15):** The repo is **directly linked to Claude Code** (Anthropic's terminal-based agent), which **performs all operations and generates the wiki pages**; ingested documents are passed to **Anthropic's LLM via API**. This closes the 2026-05-14 "what LLM do they use and is this possible?" question: the engine runs on **Anthropic (Claude) via Claude Code**, and it is working. See [[laurenz-sanne-email-2026-05-15]], [[_gaps]].
- **RAG-grounded (Assignment 1, 2026-04-22):** The presentation describes the Wiki Engine as **"LLM-powered, RAG-grounded page generation & refresh"** — a retrieval-augmented-generation approach grounding pages in source documents (Lewis et al., 2020; Gao et al., 2023). See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]].
- **Persistent compiled layer:** Rather than re-synthesising from raw documents on every query, the engine compiles content into structured pages **once** and **updates them as new information arrives**, so understanding compounds over time (overcoming RAG statelessness; see [[living-wiki]]).
- **Member 1 research focus (report):** Bundled with the [[ingestion-pipeline]] under **Member 1**, whose RQ is: "How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base?" The thesis researches **change-detection mechanisms, document versioning approaches, and wiki update strategies**, explicitly **comparing full page regeneration against incremental updates** to evaluate their effect on the quality and consistency of the knowledge base. See [[assignment-1-report-2026-04-22]].
- **MoSCoW (Must Have):** An LLM-powered wiki generation engine with **daily refresh** is a Must-Have for this iteration. (Real-time / sub-daily updates are explicitly **Won't Have**.)

### Deployment / backend configurability (2026-05-15)
For sensitive-project deployment, Sanne suggested a **configurable backend** that can swap in a **self-hosted or VPC-deployed model** when needed while keeping the rest of the architecture intact — a direction that ties the engine's LLM backend to the [[permission-layer]] and the configuration-not-rewrite reuse model (see [[_reuse]]). See [[laurenz-sanne-email-2026-05-15]].

### Open design questions (2026-05-14 team meeting)
- **LLM choice — RESOLVED (see above).** Backend is Claude Code + Anthropic API. The remaining open question is data residency / privacy of that external data flow — see [[permission-layer]], [[_gaps]]. Specific vector store and embedding model remain unspecified.
- **Agentic architecture — partially answered.** "Should we turn this into agents?" — the chosen tool (**Claude Code**, an agentic terminal-based agent) is itself agentic; whether to build further agentic structure on top vs. a pipeline is still a live design choice. See [[team-meeting-2026-05-14]], [[_gaps]].
- **Information architecture (one page per project) — proposed.** The team agreed **"one wiki page should be one project, with a connection to other projects via shared topics."** This is a per-*project* page granularity (cross-linked by shared topics) reflecting the multi-project deployment vision — a coarser framing than the within-project per-*topic* pages described in [[living-wiki]]. See [[team-meeting-2026-05-14]], [[_reuse]], [[_gaps]].

## Related
- [[ingestion-pipeline]]
- [[living-wiki]]
- [[gap-detector]]
- [[team-meeting-2026-05-14]]
- [[laurenz-sanne-email-2026-05-15]]
- [[permission-layer]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[project-team]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-05-14-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
