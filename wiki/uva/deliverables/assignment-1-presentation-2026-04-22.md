# Deliverable: Assignment 1 Presentation Deck (2026-04-22)

**Last updated:** 2026-06-19
**Status:** ingested (text-extractable body; 5 embedded JPGs image-only, not ingested)

## Summary
The **team's own Assignment 1 project-definition presentation deck** (`2026-04-22-presentation-slides.md`), presented ~2026-04-22 to the UvA course coordinator (the long-referenced `Living Project Wiki.pptx` — see [[assignment-1-project-definition]]). This is the **first source authored by the students themselves** that defines the project scope, architecture, prioritization, methodology, research questions, and timeline — as opposed to KickstartAI-supplied framing. It resolves several long-standing gaps (notably the #1–4 sub-deliverable ↔ module mapping and the timeline structure) and introduces some new ones.

The deck is **text-extractable** for titles/body; **5 embedded JPGs are image-only** (the DAPS diagram and 4 "Core Problem" icons) and were **not ingested**.

## Details

### Title & framing
"The Living Project Wiki — The Self-Documenting AI Project" (KickstartAI × Universiteit van Amsterdam). Agenda: (01) Background & Problem, (02) Project Concept, (03) DAPS Diagram, (04) System Architecture, (05) MoSCoW, (06) Research Questions, (07) Methodology.

### Problem framing (corroborates existing)
Knowledge is KickstartAI's core asset and it's fragmented: documents scattered across repos/drives/notes; critical knowledge lives only in people's minds; no way to search or synthesise across sources; manual documentation can't keep pace; onboarding new members is slow & costly. The deck's three concept pillars — **Eliminate Manual Work**, **Compounding Knowledge** (config-based cross-project reuse), and **The Meta-Twist** (the system documents itself first) — corroborate [[living-wiki]] and [[_reuse]].

### Six-component architecture (confirmed)
1. **Ingestion Pipeline** — PDFs, markdown, GitHub repos, meeting transcripts. See [[ingestion-pipeline]].
2. **Wiki Engine** — LLM-powered, **RAG-grounded** page generation & refresh. See [[wiki-generation-engine]].
3. **Generator Module** — weekly digests, stakeholder summaries, blog drafts. See [[generator-module]].
4. **Gap Detector** — surfaces undocumented decisions & knowledge holes. See [[gap-detector]].
5. **Permission Layer** — access-controlled synthesis for sensitive content. See [[permission-layer]].
6. **Evaluation Method** — coverage, freshness, accuracy & usefulness. See [[evaluation-deliverable]].

### Sub-deliverable ↔ member mapping (RESOLVES long-standing inferred gap)
The deck explicitly maps components to members (note: **components**, the deck does not name which student is which Member):
- **Member 1** — Ingestion Pipeline **& Wiki Engine** (two modules folded together)
- **Member 2** — Generator Module
- **Member 3** — Gap Detector
- **Member 4** — Permission Layer

> ⚠️ **Discrepancy with supervisor kickoff (2026-04-16).** The supervisor kickoff recorded "sub-deliverables **1–4 one member each**, **5 (Permission Layer) collaborative**, **6 (Evaluation) per-member-into-thesis**." This deck (3 days later, in the actual presentation) instead splits **four members across components**, with **Permission Layer individually owned by Member 4** (not collaborative) and Ingestion+Wiki Engine folded into Member 1. Treated here as the **later, more authoritative** division, but the discrepancy is **flagged, not silently overwritten** — see [[_gaps]], [[permission-layer]], [[project-team]].

### MoSCoW prioritization (new)
- **Must Have:** ingestion (PDFs/markdown/meeting notes); LLM wiki generation engine with **daily refresh**; basic evaluation framework measuring **accuracy + freshness**.
- **Should Have:** generator module (weekly digests + stakeholder summaries); gap detector; **permission-layer design** (for access-controlled deployment).
- **Could Have:** blog-post draft generation with tone alignment; human-in-the-loop feedback integration; comparative evaluation of generated vs. human-written content.
- **Won't Have (this iteration):** full production deployment to KickstartAI projects; real-time (sub-daily) wiki updates; a **completely working permission layer**.

### Methodology (new dual framework)
- **Design Science Research (DSR):** Relevance Cycle (grounded in KickstartAI's real KM challenges), Rigor Cycle (RAG architectures, LLM evaluation, knowledge-graph literature), Design Cycle (iterative prototyping & evaluation of each sub-system).
- **CRISP-DM (6 phases):** Business Understanding → Data Understanding → Data Preparation → Modelling (build the six GenAI components) → Evaluation (coverage/freshness/accuracy/usefulness) → Deployment (integrated prototype + usage guide).

Previously only CRISP-DM was documented; DSR is net-new.

### Timeline (new — partially resolves un-OCR'd Gantt)
**12 weeks, 3 phases:**
- **Phase 1 (wks 1–4):** Problem definition & Design.
- **Phase 2 (wks 5–9):** Development & Iteration.
- **Phase 3 (wks 10–12):** Evaluation & Synthesis.

Week numbers only — absolute start/end dates not pinned in the deck. See [[project-timeline]].

### Research questions (new)
- **Group RQ:** How can a modular LLM-powered system turn heterogeneous project documents into a continuously updated structured knowledge base?
- **Member 1 (Ingestion + Wiki Engine):** How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base?
- **Member 2 (Generator):** How can different LLM-based generation methods effectively produce periodic, stakeholder-specific project outputs, and how can the quality of these outputs be systematically evaluated?
- **Member 3 (Gap Detector):** To what extent can rule-based, semantic and graph-based methods detect knowledge gaps in wiki systems?
- **Member 4 (Permission Layer):** How can a permission-aware architecture be designed for an LLM-maintained knowledge base to mitigate information leakage from restricted source documents into synthesized wiki pages?

### Primary deliverables (new, explicit)
- Modular production-oriented GenAI system (6 components).
- Technical README, architecture diagram & usage guide.
- Working demo: system applied to its own documentation.
- Group evaluation framework (coverage, freshness, accuracy, usefulness).
- Individual thesis per team member with component-level evaluation.
- Reusable architecture deployable to any KickstartAI project (config-based).

### Business impact framing (new)
Saves time (eliminates manual KM/status writing); cross-project learning (learnings systematically accessible); onboarding speed; leadership positioning (KickstartAI as AI best-practice leader in NL); reusable config-based infra.

### DAPS diagram (image-only)
Slide 03 names a **DAPS** problem-definition diagram with a **Data-Analytic Problem Layer** and a **Persistent Artifact Layer**. The diagram structure is **image-only and not legible** — the framework's content/origin is **not ingested, not fabricated**. See [[_gaps]].

### Not ingested
- **5 embedded JPGs** — the DAPS diagram + 4 "Core Problem" icon images. Image-only; contents not ingested, not fabricated.

## Related
- [[assignment-1-project-definition]]
- [[user-journeys]]
- [[project-team]]
- [[project-timeline]]
- [[permission-layer]]
- [[evaluation-deliverable]]
- [[wiki-generation-engine]]
- [[ingestion-pipeline]]
- [[generator-module]]
- [[gap-detector]]
- [[supervisor-kickoff-2026-04-16]]
- [[living-wiki]]
- [[_overview]]

## Sources
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable; 5 embedded JPGs image-only, not ingested)
