# Entity: Project Team (Living Wiki)

**Last updated:** 2026-06-19

## Summary
The actual working team for the Living Wiki project, established by the 2026-04-10 → 2026-04-20 kickoff email thread, substantially clarified by the **2026-04-13 kickoff meeting notes** (see [[kickoff-meeting-2026-04-13]]), further resolved by the **2026-04-16 UvA supervisor kickoff** (see [[supervisor-kickoff-2026-04-16]]), and refined by the **2026-04-22 Assignment 1 presentation + written report** (see [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]]). This page consolidates the *project* team (UvA students + KickstartAI contacts + UvA supervisor), kept deliberately distinct from the KickstartAI organization roster on [[kickstartai-team]]. The student identities and the supervisor are now resolved; the written report’s author list largely reconciles the long-open “Meng” name, and the “Averion” handover remains flagged — see [[_gaps]].

## Details
### UvA AI4Business Lab students (4)
All four are **business analytics students** doing this as a **thesis project** (BSc Business Analytics). The 2026-04-22 written report (see [[assignment-1-report-2026-04-22]]) supplies the official author list with student numbers:
- **Quinten van den Heuvel** (#15150658; quintenvdheuvel12@gmail.com) — Dutch; interested in AI in the Dutch business sector. Acts as the team's **coordinator / spokesperson** (sends slides, summaries, schedules, assignment descriptions; shared the Gantt chart at kickoff).
- **Xiaojing Li** (#14851199; "XiaoJing", **lee89953@gmail.com**) — from China; interested in AI, LLMs, and mathematics; raised in-person discussions in Delft. The 2026-04-16 supervisor meeting participant list **explicitly maps lee89953@gmail.com → Xiaojing Li**.
- **Laurenz Ruckensteiner-Geyer** (#13762931; laurenz.ruckensteiner@gmail.com) — from Barcelona; prior data-scientist intern experience. *(The report gives the fuller hyphenated surname “Ruckensteiner-Geyer”; earlier sources used the shorter “Ruckensteiner.”)*
- **Meng Cheng** (#14025906; carac.m.cheng@gmail.com) — originally from China; switched from business administration to business analytics. The written report’s author list gives **“Meng Cheng”** in the exact roster slot earlier sources gave **“Cara” / “Carac M. Cheng”** (same surname Cheng). Near-certain to be the same person; **“Meng Cheng”** appears to be the official thesis name, with “Cara”/“Carac M. Cheng” an informal/anglicised variant. The alias relationship is inferred (same slot, same surname, same email), not explicitly stated — see [[_gaps]].

> Name-reconciliation note: The 2026-04-10 greeting named **“Meng,”** which had no roster match until the report’s author list surfaced **“Meng Cheng.”** This largely reconciles the long-open “Meng” discrepancy: the greeting almost certainly referred to **Meng Cheng** (= “Cara”/“Carac M. Cheng”). The explicit alias mapping remains inferred. See [[_gaps]].

### UvA academic supervisor
- **Hongyi Zhu** (h.zhu@uva.nl) — **UvA academic supervisor** (role **confirmed** via the 2026-04-16 supervisor kickoff and re-confirmed on the report’s title page). **Individual progress meetings** with Hongyi Zhu are to be scheduled **after the April 22 presentation** (specific dates TBD — see [[_gaps]]).

### KickstartAI contacts
- **Sanne Wielinga** — Senior Machine Learning Engineer; **main point of contact** for the project (also named as the company contact on the report title page). The project was **handed over to Sanne from “Averion”** per the kickoff notes — “Averion” is unidentified in any other source and may be a transcription artifact for “Evertjan”; see ambiguity note below. Also on the org roster ([[kickstartai-team]]).
- **Evertjan Peer** — Tech Lead (see [[kickstartai-team]]); **made the introduction** (forwarded the students' intro to Sanne) per the email thread.

> The brief's "technical mentor (TBD)" is now much closer to resolved — Sanne is the explicit main contact — but no source uses the word "mentor." See [[_gaps]].

> ⚠️ **"Averion" handover ambiguity:** The kickoff notes state the project was handed over to Sanne "from Averion." No other source mentions "Averion." Possibly a transcription error for "Evertjan," possibly a genuine predecessor. Not asserted; no entity page created. See [[_gaps]].

### Work division — component ownership (Assignment 1 presentation + report, 2026-04-22)
Both student-authored artifacts assign the build components to **four members** (by component, **not** by named student):
- **Member 1** — **Ingestion Pipeline + Wiki Engine** — RQ on change detection (full-regeneration vs incremental updates) in a heterogeneous corpus.
- **Member 2** — **Generator Module** — RQ on LLM-based stakeholder-specific generation (direct prompting / RAG / template-driven) + evaluation.
- **Member 3** — **Gap Detector** — RQ on rule-based / semantic / graph-based gap detection; outputs a structured gap report.
- **Member 4** — **Permission Layer** — RQ on permission-aware architecture mitigating information leakage into synthesized output.
- **Evaluation Framework** — the **collaborative/shared deliverable** (all four design & execute; each contributes component-level results into their own thesis).

> **Division-scheme discrepancy — RESOLVED-BY-PRECEDENCE.** The supervisor kickoff (2026-04-16) recorded **sub-deliverable #5 (Permission Layer) as collaborative** and **evaluation as per-member-into-thesis**. Both the presentation deck and the written report (3+ days later, mutually consistent) instead **assign the Permission Layer to Member 4 individually** and name the **evaluation framework as the collaborative deliverable**. Two agreeing student-authored sources are treated as confirming this split; the superseded supervisor-kickoff note is recorded, not deleted. See [[_gaps]], [[permission-layer]], [[user-journeys]].

> **Residual:** which *named student* is Member 1/2/3/4 is **not stated** in either artifact — owners-by-component resolved, owners-by-person still open. See [[_gaps]].

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
- [[assignment-1-report-2026-04-22]]
- [[assignment-1-project-definition]]
- [[user-journeys]]
- [[_overview]]

## Sources
- 2026-04-10-Intro-email.md (KickstartAI x UvA kickoff email thread, 2026-04-10 → 2026-04-20)
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)