# Entity: Project Team (Living Wiki)

**Last updated:** 2026-06-19

## Summary
The actual working team for the Living Wiki project, established by the 2026-04-10 → 2026-04-20 kickoff email thread, substantially clarified by the **2026-04-13 kickoff meeting notes** (see [[kickoff-meeting-2026-04-13]]), further resolved by the **2026-04-16 UvA supervisor kickoff** (see [[supervisor-kickoff-2026-04-16]]), and refined by the **2026-04-22 Assignment 1 presentation** (see [[assignment-1-presentation-2026-04-22]]). This page consolidates the *project* team (UvA students + KickstartAI contacts + UvA supervisor), kept deliberately distinct from the KickstartAI organization roster on [[kickstartai-team]]. The student identities and the supervisor are now resolved; one residual ambiguity (the "Meng" greeting name) and the "Averion" handover are flagged — see [[_gaps]].

## Details
### UvA AI4Business Lab students (4)
All four are **business analytics students** doing this as a **thesis project**. The supervisor kickoff participant list resolved the remaining name↔email ambiguity:
- **Quinten van den Heuvel** (quintenvdheuvel12@gmail.com) — Dutch; interested in AI in the Dutch business sector. Acts as the team's **coordinator / spokesperson** (sends slides, summaries, schedules, assignment descriptions; shared the Gantt chart at kickoff).
- **Xiaojing Li** ("XiaoJing", **lee89953@gmail.com**) — from China; interested in AI, LLMs, and mathematics; raised in-person discussions in Delft. The 2026-04-16 supervisor meeting participant list **explicitly maps lee89953@gmail.com → Xiaojing Li**, hard-confirming the prior by-elimination inference.
- **Laurenz Ruckensteiner** (laurenz.ruckensteiner@gmail.com) — from Barcelona; prior data-scientist intern experience.
- **"Cara"** ≈ **Carac M. Cheng** (carac.m.cheng@gmail.com) — originally from China; switched from business administration to business analytics. The Cara↔Carac M. Cheng mapping is strong but inferred, not explicitly stated; the carac.m.cheng@gmail.com address recurs across kickoff sources.

> Residual mapping note: The 2026-04-10 greeting named **"Meng,"** but no "Meng" appears in any meeting roster. With lee89953@gmail.com now firmly mapped to **Xiaojing Li**, "Meng" remains an unmapped greeting name — likely a superseded informal/preferred name or a transcription discrepancy. Documented, not asserted. See [[_gaps]].

### UvA academic supervisor
- **Hongyi Zhu** (h.zhu@uva.nl) — **UvA academic supervisor** (role **confirmed** via the 2026-04-16 supervisor kickoff, see [[supervisor-kickoff-2026-04-16]]). **Individual progress meetings** with Hongyi Zhu are to be scheduled **after the April 22 presentation** (specific dates TBD — see [[_gaps]]).

### KickstartAI contacts
- **Sanne Wielinga** — Senior Machine Learning Engineer; **main point of contact** for the project. The project was **handed over to Sanne from "Averion"** per the kickoff notes — "Averion" is unidentified in any other source and may be a transcription artifact for "Evertjan"; see ambiguity note below. Also on the org roster ([[kickstartai-team]]).
- **Evertjan Peer** — Tech Lead (see [[kickstartai-team]]); **made the introduction** (forwarded the students' intro to Sanne) per the email thread.

> The brief's "technical mentor (TBD)" is now much closer to resolved — Sanne is the explicit main contact — but no source uses the word "mentor." See [[_gaps]].

> ⚠️ **"Averion" handover ambiguity:** The kickoff notes state the project was handed over to Sanne "from Averion." No other source mentions "Averion." Possibly a transcription error for "Evertjan," possibly a genuine predecessor. Not asserted; no entity page created. See [[_gaps]].

### Work division — component ownership (Assignment 1 presentation, 2026-04-22)
The Assignment 1 presentation (see [[assignment-1-presentation-2026-04-22]]) assigns the build components to **four members** (by component, **not** by named student):
- **Member 1** — **Ingestion Pipeline + Wiki Engine** (two modules) — RQ on change detection in a heterogeneous corpus.
- **Member 2** — **Generator Module** — RQ on LLM-based stakeholder-specific generation + evaluation.
- **Member 3** — **Gap Detector** — RQ on rule-based / semantic / graph-based gap detection.
- **Member 4** — **Permission Layer** — RQ on permission-aware architecture mitigating information leakage.
- **Evaluation Method** — group framework + each member researches a different method into their own thesis.

> ⚠️ **Division-scheme discrepancy.** The supervisor kickoff (2026-04-16) recorded **sub-deliverables 1–4 individual, 5 (Permission Layer) collaborative, 6 (Evaluation) per-member-into-thesis**. The presentation (3 days later) instead **individually assigns the Permission Layer to Member 4** and bundles ingestion + wiki engine under Member 1. The presentation is later and more authoritative on component ownership, but the "collaborative permission layer" note was not explicitly retracted — flagged, not silently overwritten. See [[_gaps]], [[permission-layer]], [[user-journeys]].

> **Residual:** which *named student* is Member 1/2/3/4 is **not stated** in the deck — owners-by-component resolved, owners-by-person still open. See [[_gaps]].

### Cadence & process
- **Regular check-ins** (with KickstartAI/Sanne) agreed in principle — **weekly or bi-weekly**; specific frequency TBD and to be emailed to Sanne. See [[kickoff-meeting-2026-04-13]], [[_gaps]].
- **Individual supervisor progress meetings** to be scheduled after the April 22 presentation (UvA-side; see [[supervisor-kickoff-2026-04-16]]).

### Communication channels
- **KickstartAI community Slack** — students added via the community signup form and confirmed to be added at kickoff. Whether it becomes a Living Wiki ingestion source is unspecified — see [[_gaps]].

## Related
- [[uva-ai4business-lab]]
- [[kickstartai-team]]
- [[kickstartai]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-project-definition]]
- [[user-journeys]]
- [[_overview]]

## Sources
- 2026-04-10-Intro-email.md (KickstartAI x UvA kickoff email thread, 2026-04-10 → 2026-04-20)
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
