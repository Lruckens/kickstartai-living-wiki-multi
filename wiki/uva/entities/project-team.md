# Entity: Project Team (Living Wiki)

**Last updated:** 2026-06-19

## Summary
The actual working team for the Living Wiki project, established by the 2026-04-10 → 2026-04-20 kickoff email thread, substantially clarified by the **2026-04-13 kickoff meeting notes** (see [[kickoff-meeting-2026-04-13]]), further resolved by the **2026-04-16 UvA supervisor kickoff** (see [[supervisor-kickoff-2026-04-16]]), refined by the **2026-04-22 Assignment 1 presentation + written report** (see [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]]), supplemented by a **2026-04-30 check-in scheduling thread** (see [[checkin-scheduling-2026-04-30]]), updated by the **2026-05-14 development-phase team meeting** (see [[team-meeting-2026-05-14]]), the **2026-05-15 demo follow-up thread** (see [[laurenz-sanne-email-2026-05-15]]), the **2026-06-04 team meeting** (see [[team-meeting-2026-06-04]]), the **2026-06-07 permission-layer design review** (see [[xiaojing-sanne-permission-email-2026-06-07]]), the **2026-06-11 team meeting** (see [[team-meeting-2026-06-11]]), and the **2026-06-12 mock-up artifact** (see [[mockup-artifact-2026-06-12]]). This page consolidates the *project* team (UvA students + KickstartAI contacts + UvA supervisor), kept deliberately distinct from the KickstartAI organization roster on [[kickstartai-team]]. The student identities, supervisor, and (as of 2026-06-12) the full person↔component mapping are now resolved; the “Averion” handover remains flagged — see [[_gaps]].

## Details
### UvA AI4Business Lab students (4)
All four are **business analytics students** doing this as a **thesis project** (BSc Business Analytics). The 2026-04-22 written report (see [[assignment-1-report-2026-04-22]]) supplies the official author list with student numbers:
- **Quinten van den Heuvel** (#15150658; quintenvdheuvel12@gmail.com) — Dutch; interested in AI in the Dutch business sector. Acts as the team's **coordinator / spokesperson**. Built the **[[generator-module]]** (Member 2) — integrated into main via PR (2026-06-12); his backend currently runs locally on his laptop (deployment gap).
- **Xiaojing Li** (#14851199; "XiaoJing", **lee89953@gmail.com**) — from China; interested in AI, LLMs, and mathematics. **Permission-layer owner (Member 4)** — self-asserted (2026-06-07); built the two-layer leakage PoC + UI/auth layer. See [[xiaojing-sanne-permission-email-2026-06-07]], [[permission-layer]].
- **Laurenz Ruckensteiner-Geyer** (#13762931; laurenz.ruckensteiner@gmail.com) — from Barcelona; prior data-scientist intern experience. *(The report gives the fuller hyphenated surname “Ruckensteiner-Geyer”; earlier sources used the shorter “Ruckensteiner.”)* Holds/owns the project **GitHub repo** (`github.com/Lruckens/kickstartai-living-wiki`) and is the **integration owner** merging the other members' modules (2026-06-11, via Claude + VS Code). Consistent with **Member 1 (Ingestion + Wiki Engine)**.
- **Meng Cheng** (#14025906; carac.m.cheng@gmail.com) — originally from China; switched from business administration to business analytics. The author list gives **“Meng Cheng”** in the slot earlier sources gave **“Cara” / “Carac M. Cheng”** (same surname, same email — “Cara” an informal/anglicised variant; alias inferred, not stated). **Gap Detector owner (Member 3) — POSITIVELY CONFIRMED (2026-06-12)** via the mock-up artifact (a full 6-layer Gap Detector design attributed to her). See [[gap-detector]], [[mockup-artifact-2026-06-12]], [[_gaps]].

### UvA academic supervisor
- **Hongyi Zhu** (h.zhu@uva.nl) — **UvA academic supervisor** (role **confirmed** via the 2026-04-16 supervisor kickoff and the report’s title page). **Individual progress meetings** to be scheduled **after the April 22 presentation** (specific dates TBD — see [[_gaps]]). Not on the KickstartAI-side check-in thread (company comms route via Sanne; UvA-internal via Zhu).

### KickstartAI contacts
- **Sanne Wielinga** — Senior Machine Learning Engineer; **main point of contact** (also the company contact on the report title page). Email appears as both **sanne.wielinga@kickstart.ai** and **sanne.wielinga@kickstartai.org** — a minor domain inconsistency (recent threads consistently `@kickstart.ai`); canonical form unconfirmed (see [[_gaps]]). The project was **handed over to Sanne from “Averion”** per the kickoff notes — unidentified, possibly a transcription artifact for “Evertjan”; see ambiguity note below. Also on the org roster ([[kickstartai-team]]).
- **Evertjan Peer** — Tech Lead (see [[kickstartai-team]]); **made the introduction** per the email thread.

> The brief's "technical mentor (TBD)" is now much closer to resolved — Sanne is the explicit main contact — but no source uses the word "mentor." See [[_gaps]].

> ⚠️ **"Averion" handover ambiguity:** The kickoff notes state the project was handed over to Sanne "from Averion." No other source mentions "Averion." Possibly a transcription error for "Evertjan," possibly a genuine predecessor. Not asserted; no entity page created. See [[_gaps]].

### Work division — component ownership (Assignment 1 presentation + report, 2026-04-22; person↔member resolved 2026-06-12)
Both student-authored artifacts assign the build components to **four members** (by component); build/integration activity has since bound them to named students:
- **Member 1** — **Ingestion Pipeline + Wiki Engine** — **Laurenz** (repo/integration owner; soft signal).
- **Member 2** — **Generator Module** — **Quinten** (built & integrated; soft signal).
- **Member 3** — **Gap Detector** — **Cara / Meng Cheng** (**positively confirmed 2026-06-12**).
- **Member 4** — **Permission Layer** — **Xiaojing** (self-asserted 2026-06-07).
- **Evaluation Framework** — the **collaborative/shared deliverable** (all four design & execute; each contributes component-level results into their own thesis).

> **Division-scheme discrepancy — RESOLVED-BY-PRECEDENCE.** The supervisor kickoff (2026-04-16) recorded **#5 (Permission Layer) as collaborative** and **evaluation as per-member-into-thesis**. Both later student-authored sources instead **assign the Permission Layer to Member 4 individually** and name the **evaluation framework as the collaborative deliverable**. Two agreeing student-authored sources confirm this split; the superseded supervisor-kickoff note is recorded, not deleted. See [[_gaps]], [[permission-layer]], [[user-journeys]].

> **Person↔member mapping — status (2026-06-12).** **Member 4 = Xiaojing** (self-asserted) and **Member 3 = Cara** (positively confirmed via the mock-up artifact). **Member 1 = Laurenz** and **Member 2 = Quinten** remain strong build/integration-activity soft signals (not explicit course labels). See [[user-journeys]], [[_gaps]].

### Shared-thesis work split (2026-05-14 dev meeting)
Distinct from the Member 1–4 component ownership, the team divided **shared-thesis** sub-tasks (see [[team-meeting-2026-05-14]]):
- **Xiaojing** — **business understanding** for the shared thesis.
- **Laurenz** — **data understanding** for the shared thesis.
- **Laurenz & Quinten** — work out how to **combine the generator module with the GitHub architecture** (done 2026-06-11/12).

### Integration & evaluation work split (2026-06-11 → 2026-06-12)
Per the 2026-06-11 meeting (see [[team-meeting-2026-06-11]]) and 2026-06-12 artifact (see [[mockup-artifact-2026-06-12]]):
- **Quinten & Laurenz** — modules (generator + wiki architecture) **already integrated and functional** (generator merged via PR).
- **Laurenz** — **integration owner**, merging **Cara's** and **Xiaojing's** MVPs into the wiki architecture **using Claude and VS Code**. Sanne flagged integrating each component's UI/backend into one system as the biggest challenge.
- **Cara & Xiaojing** — to **share their MVPs + precise descriptions** and **fold Sanne's 2026-06-07/06-12 feedback** into what they send.
- **Quinten** — shifting to **evaluation metrics** for the [[evaluation-framework]] (sharing a list of options).
- **Two evaluation "families":** Laurenz + Quinten (LLM text-generation → comparable frameworks) vs. Cara + Xiaojing (different frameworks). See [[evaluation-deliverable]].
- ⚠️ **Deployment gap:** Quinten's generator backend runs **locally on his laptop**; Sanne suggested **Vercel** for central hosting. See [[_gaps]].

### Permission-layer ownership self-asserted (2026-06-07)
In the 2026-06-07 → 2026-06-08 design-review thread (see [[xiaojing-sanne-permission-email-2026-06-07]]), **Xiaojing self-identifies as the permission-layer owner**, presenting a built-and-evaluated two-layer architecture. This is the strongest person↔component evidence prior to the 2026-06-12 Gap-Detector confirmation.

### Cadence & process
- **Regular check-ins** (with KickstartAI/Sanne) agreed in principle — **weekly or bi-weekly**; specific recurring frequency **still TBD**. See [[kickoff-meeting-2026-04-13]], [[_gaps]].
- **First concrete post-presentation check-in scheduled (2026-04-30 thread):** a one-off call **Thursday 11:00 AM**. Does **not** settle the standing cadence. See [[checkin-scheduling-2026-04-30]], [[_gaps]].
- **Delft office visit invited (2026-04-30 thread):** Sanne invited "both groups"; date(s) TBD. See [[checkin-scheduling-2026-04-30]], [[_gaps]].
- **Pending deliveries from Sanne (2026-05-15 thread):** a **Google Drive structure** and (delivered 2026-05-18) a **PM Ops folder** + **fictional test corpus** — see [[laurenz-sanne-email-2026-05-15]], [[kickstartai-pm-ops]], [[student-materials-corpus]].
- **Individual supervisor progress meetings** to be scheduled after the April 22 presentation (UvA-side; see [[supervisor-kickoff-2026-04-16]]).

> **Second UvA group — observation, unconfirmed.** Sanne's 2026-04-30 email references **"both groups" / "the other group,"** implying a **second UvA team** working with KickstartAI in parallel. Identity, project, and relationship are unknown; recorded as an observation. See [[checkin-scheduling-2026-04-30]], [[_gaps]].

### Communication channels
- **KickstartAI community Slack** — students added at kickoff. Whether it becomes a Living Wiki ingestion source is unspecified — see [[_gaps]].

## Related
- [[uva-ai4business-lab]]
- [[kickstartai-team]]
- [[kickstartai]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[checkin-scheduling-2026-04-30]]
- [[team-meeting-2026-05-14]]
- [[team-meeting-2026-06-04]]
- [[team-meeting-2026-06-11]]
- [[mockup-artifact-2026-06-12]]
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
- 2026-06-11-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-12-mock-up-artifact.md (Living Wiki UI mock-up artifact description + Sanne feedback, development phase)
