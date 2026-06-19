# Entity: Project Team (Living Wiki)

**Last updated:** 2026-06-19

## Summary
The actual working team for the Living Wiki project, established by the 2026-04-10 → 2026-04-20 kickoff email thread, substantially clarified by the **2026-04-13 kickoff meeting notes** (see [[kickoff-meeting-2026-04-13]]), further resolved by the **2026-04-16 UvA supervisor kickoff** (see [[supervisor-kickoff-2026-04-16]]), refined by the **2026-04-22 Assignment 1 presentation + written report** (see [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]]), supplemented by a **2026-04-30 check-in scheduling thread** (see [[checkin-scheduling-2026-04-30]]), updated by the **2026-05-14 development-phase team meeting** (see [[team-meeting-2026-05-14]]), the **2026-05-15 demo follow-up thread** (see [[laurenz-sanne-email-2026-05-15]]), the **2026-06-04 team meeting** (see [[team-meeting-2026-06-04]]), and the **2026-06-07 permission-layer design review** (see [[xiaojing-sanne-permission-email-2026-06-07]]). This page consolidates the *project* team (UvA students + KickstartAI contacts + UvA supervisor), kept deliberately distinct from the KickstartAI organization roster on [[kickstartai-team]]. The student identities and the supervisor are now resolved; the written report’s author list largely reconciles the long-open “Meng” name, and the “Averion” handover remains flagged — see [[_gaps]].

## Details
### UvA AI4Business Lab students (4)
All four are **business analytics students** doing this as a **thesis project** (BSc Business Analytics). The 2026-04-22 written report (see [[assignment-1-report-2026-04-22]]) supplies the official author list with student numbers:
- **Quinten van den Heuvel** (#15150658; quintenvdheuvel12@gmail.com) — Dutch; interested in AI in the Dutch business sector. Acts as the team's **coordinator / spokesperson** (sends slides, summaries, schedules, assignment descriptions; shared the Gantt chart at kickoff).
- **Xiaojing Li** (#14851199; "XiaoJing", **lee89953@gmail.com**) — from China; interested in AI, LLMs, and mathematics; raised in-person discussions in Delft. The 2026-04-16 supervisor meeting participant list **explicitly maps lee89953@gmail.com → Xiaojing Li**, re-corroborated by the 2026-04-30 scheduling thread and again by the 2026-06-07 permission-layer thread. See [[checkin-scheduling-2026-04-30]], [[xiaojing-sanne-permission-email-2026-06-07]].
- **Laurenz Ruckensteiner-Geyer** (#13762931; laurenz.ruckensteiner@gmail.com) — from Barcelona; prior data-scientist intern experience. *(The report gives the fuller hyphenated surname “Ruckensteiner-Geyer”; earlier sources used the shorter “Ruckensteiner.”)* Holds/owns the project **GitHub repo** (`github.com/Lruckens/kickstartai-living-wiki`) and is the KickstartAI-facing contact for it (see [[laurenz-sanne-email-2026-05-15]]).
- **Meng Cheng** (#14025906; carac.m.cheng@gmail.com) — originally from China; switched from business administration to business analytics. The written report’s author list gives **“Meng Cheng”** in the exact roster slot earlier sources gave **“Cara” / “Carac M. Cheng”** (same surname Cheng). Near-certain to be the same person; **“Meng Cheng”** appears to be the official thesis name, with “Cara”/“Carac M. Cheng” an informal/anglicised variant. The alias relationship is inferred (same slot, same surname, same email), not explicitly stated — see [[_gaps]].

> Name-reconciliation note: The 2026-04-10 greeting named **“Meng,”** which had no roster match until the report’s author list surfaced **“Meng Cheng.”** This largely reconciles the long-open “Meng” discrepancy: the greeting almost certainly referred to **Meng Cheng** (= “Cara”/“Carac M. Cheng”). The explicit alias mapping remains inferred. See [[_gaps]].

### UvA academic supervisor
- **Hongyi Zhu** (h.zhu@uva.nl) — **UvA academic supervisor** (role **confirmed** via the 2026-04-16 supervisor kickoff and re-confirmed on the report’s title page). **Individual progress meetings** with Hongyi Zhu are to be scheduled **after the April 22 presentation** (specific dates TBD — see [[_gaps]]). Note: Hongyi Zhu is **not** included on the KickstartAI-side check-in thread (company comms route via Sanne; UvA-internal via Zhu).

### KickstartAI contacts
- **Sanne Wielinga** — Senior Machine Learning Engineer; **main point of contact** for the project (also named as the company contact on the report title page). Email appears as both **sanne.wielinga@kickstart.ai** and **sanne.wielinga@kickstartai.org** across sources — a minor domain inconsistency (the 2026-06-07 thread is consistently `@kickstart.ai`); the canonical form is unconfirmed (see [[_gaps]]). The project was **handed over to Sanne from “Averion”** per the kickoff notes — “Averion” is unidentified in any other source and may be a transcription artifact for “Evertjan”; see ambiguity note below. Also on the org roster ([[kickstartai-team]]).
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

> **Residual:** which *named student* is Member 1/2/3/4 is **not stated** in either artifact. **Build-activity soft signals** (below) align 3 of 4 members with components, and the 2026-06-07 thread now provides **self-asserted ownership** of the Permission Layer by Xiaojing. The full person↔member mapping remains formally **unasserted** for M1/M2/M3. See [[_gaps]].

### Shared-thesis work split (2026-05-14 dev meeting)
Distinct from the Member 1–4 component ownership, the team divided **shared-thesis** sub-tasks (see [[team-meeting-2026-05-14]]):
- **Xiaojing** — **business understanding** for the shared thesis.
- **Laurenz** — **data understanding** for the shared thesis.
- **Laurenz & Quinten** — work out how to **combine the generator module with the GitHub architecture**.
- **Laurenz** demoed the **GitHub repo / wiki architecture / first MVP** (soft signal toward Laurenz = Member 1 — not asserted). See [[wiki-generation-engine]], [[_gaps]].

### Build-status work split (2026-06-04 dev meeting)
Per-member build progress at the 2026-06-04 meeting (see [[team-meeting-2026-06-04]]):
- **Laurenz** — finished his MVP version; now building a **UI on top of the GitHub** (exempt from MVP-building in the To-Do). Consistent with **Member 1 (Ingestion + Wiki Engine)**.
- **Quinten** — building the **generator module** (untested; wants a new version before adjusting the mock-up). Consistent with **Member 2 (Generator)**.
- **Xiaojing** — working on the **permission layer** (proposing a **user-id connection**). Consistent with **Member 4 (Permission Layer)**.
- **Cara / Meng Cheng** — reports an **MVP is not feasible** for her component because she "already delivers a final product" (a methodology-friction point — see [[_gaps]]). No component named; by elimination this *would* leave **Member 3 (Gap Detector)**, but there is no positive evidence.

### Permission-layer ownership self-asserted (2026-06-07)
In the 2026-06-07 → 2026-06-08 design-review thread (see [[xiaojing-sanne-permission-email-2026-06-07]]), **Xiaojing self-identifies as the permission-layer owner** ("my design about the permission layer"), presenting a built-and-evaluated two-layer architecture. This moves **Xiaojing ↔ Member 4** from a build-activity soft signal to **self-asserted ownership** — the strongest person↔component evidence to date for any member (still not an explicit course "Member 4" label).

> **Person↔member mapping — status.** As of 2026-06-07: **Xiaojing ↔ Permission Layer (Member 4)** is now **self-asserted**. **Laurenz ↔ M1** and **Quinten ↔ M2** remain **build-activity soft signals**; **Cara ↔ M3** remains a **by-elimination inference with no positive evidence**. The full mapping is not formally asserted. See [[user-journeys]], [[_gaps]].

### Cadence & process
- **Regular check-ins** (with KickstartAI/Sanne) agreed in principle — **weekly or bi-weekly**; specific recurring frequency **still TBD** (to be emailed to Sanne). See [[kickoff-meeting-2026-04-13]], [[_gaps]].
- **First concrete post-presentation check-in scheduled (2026-04-30 thread):** after the spring break, Sanne and the group arranged a one-off check-in call for **Thursday at 11:00 AM** (calendar invite to follow). This does **not** settle the standing weekly/bi-weekly cadence — that remains open. See [[checkin-scheduling-2026-04-30]], [[_gaps]].
- **Delft office visit invited (2026-04-30 thread):** Sanne invited "both groups" to visit the KickstartAI office in **Delft** for a day; date(s) TBD. See [[checkin-scheduling-2026-04-30]], [[_gaps]].
- **Pending deliveries from Sanne (2026-05-15 thread):** a **Google Drive structure** and (delivered 2026-05-18) a **PM Ops folder structure** + a **fictional test corpus** — see [[laurenz-sanne-email-2026-05-15]], [[kickstartai-pm-ops]], [[student-materials-corpus]]. Day-to-day ways-of-working to be discussed on a call/Thursday.
- **Individual supervisor progress meetings** to be scheduled after the April 22 presentation (UvA-side; see [[supervisor-kickoff-2026-04-16]]).

> **Second UvA group — observation, unconfirmed.** Sanne's 2026-04-30 email references **"both groups" / "the other group,"** implying a **second UvA team** working with KickstartAI in parallel (beyond this four-person Living Wiki team). Identity, project, and relationship are unknown; recorded as an observation, no entity created. See [[checkin-scheduling-2026-04-30]], [[_gaps]].

### Communication channels
- **KickstartAI community Slack** — students added via the community signup form and confirmed to be added at kickoff. Whether it becomes a Living Wiki ingestion source is unspecified — see [[_gaps]].

## Related
- [[uva-ai4business-lab]]
- [[kickstartai-team]]
- [[kickstartai]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[checkin-scheduling-2026-04-30]]
- [[team-meeting-2026-05-14]]
- [[team-meeting-2026-06-04]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[laurenz-sanne-email-2026-05-15]]
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
- 2026-04-30-group-Sanne-email-content.md (KickstartAI x UvA check-in scheduling email thread, 2026-04-30 → 2026-05-04)
- 2026-05-14-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
- 2026-06-04-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-07-Xiaojing-Sanne-email-content.md (Xiaojing ↔ Sanne permission-layer design review email thread, 2026-06-07 → 2026-06-08)
