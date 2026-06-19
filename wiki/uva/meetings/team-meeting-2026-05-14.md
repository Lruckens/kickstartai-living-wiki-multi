# Meeting: UvA Team Working Meeting (2026-05-14)

**Last updated:** 2026-06-19
**Date:** 2026-05-14
**Type:** Internal UvA team working meeting (development phase)
**Status:** ingested

## Summary
The **first ingested source from the development phase** (Phase 2, weeks 5–9 — see [[project-timeline]]). An internal working meeting of the four UvA AI4Business Lab students (no KickstartAI contact or supervisor present in the notes), ~3 weeks after the April 22 Assignment-1 presentation and ~10 days after the 2026-04-30 check-in thread. Source: `2026-05-14-meeting-notes.md`. It is a milestone: the team has moved from scoping into **actual building** — Laurenz demoed a **GitHub repo with a wiki architecture and a first MVP** of the system. The notes are terse; they capture a first MVP demo, several open technical questions, two concrete design decisions, and a shared-thesis work split.

## Build progress (first concrete implementation evidence)
- **Laurenz** demoed a **GitHub repo** containing the **wiki architecture** and a **first MVP of the system**. This is the first evidence the system exists in code. (Soft signal toward Laurenz = Member 1 / Ingestion + Wiki Engine — **not asserted**; see [[_gaps]].) The repo itself is **not ingested** — flagged for future ingest. See [[wiki-generation-engine]].

## Open technical questions raised (unresolved)
- **LLM choice / feasibility** — "Need to be connected to an LLM → What LLM do they use and is this possible?" The system must connect to an LLM; which one, and whether access is feasible, is open. Refines the standing tech-stack gap — see [[_gaps]], [[wiki-generation-engine]].
- **Document privacy** — surfaced as a live concern in the MVP. Ties to [[permission-layer]].
- **Agentic architecture** — "Should we turn this into agents?" — agents-vs-pipeline architecture is an open design question. See [[wiki-generation-engine]], [[_gaps]].
- **Generator sourcing (Quinten)** — should the [[generator-module]] generate content **based on the wiki**, or **search through the underlying source documents** the wiki is built from, and then generate? A genuine open design decision. See [[generator-module]], [[_gaps]].
- **Data understanding** — with little data and little preprocessing, what should the CRISP-DM **data-understanding** phase include? Unresolved. See [[_gaps]].

## Design decisions / agreements
- **Deployment governance — admin-per-project:** "Deployment: assign an **admin per project** who governs the wiki page." A concrete governance/deployment choice. Ties to [[permission-layer]], [[permission-model]], and the configuration-not-rewrite reuse model (see [[_reuse]]). The mechanism for how the admin "governs" is unspecified — see [[_gaps]].
- **Information architecture — one page per project:** "**One wiki page should be one project**, with a connection to other projects via **shared topics**." A per-*project* page granularity, cross-linked by shared topics — a coarser, multi-project framing than the within-project per-*topic* pages described elsewhere (e.g. [[living-wiki]]). Recorded precisely to avoid conflating the two granularities. See [[_gaps]].

## Work assignments (shared-thesis split)
These are **shared-thesis sub-task** assignments, kept **distinct** from the Member 1–4 component ownership (which remains unmapped-by-person — see [[project-team]], [[_gaps]]):
- **Laurenz & Quinten** — work out a way to **combine the generator module with the GitHub architecture**.
- **Xiaojing** — **business understanding** for the shared thesis.
- **Laurenz** — **data understanding** for the shared thesis.

## Conflicts / ambiguities
- **Generator-module sourcing — noted conflict (settledness, not fact).** The wiki currently frames the [[generator-module]] as producing outputs *from the wiki*. These notes show the team treats **wiki-based vs. source-document-based generation as an open question**. Not a contradiction of a decided fact, but the wiki's phrasing implied more settledness than exists; softened on [[generator-module]] and flagged here. See [[_gaps]].
- **"One wiki page = one project" — mild terminology note.** Other pages describe per-topic interlinked pages within a single project; this note introduces per-*project* page granularity with cross-project topic links — reflecting the multi-project deployment vision. Different scope, not contradictory.
- **Person↔member mapping — soft signal only.** Laurenz holding the GitHub/wiki-architecture MVP softly suggests Laurenz = Member 1; the generator-integration pairing involves Quinten. **Neither is asserted.** See [[_gaps]].

## Related
- [[project-team]]
- [[wiki-generation-engine]]
- [[generator-module]]
- [[permission-layer]]
- [[permission-model]]
- [[ingestion-pipeline]]
- [[project-timeline]]
- [[_reuse]]
- [[_overview]]

## Sources
- 2026-05-14-meeting-notes.md (internal UvA team working meeting notes, development phase)
