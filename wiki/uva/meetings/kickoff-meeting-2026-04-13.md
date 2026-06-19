# Meeting: KickstartAI x UvA Living Wiki Kickoff (2026-04-13)

**Last updated:** 2026-06-19
**Date:** 2026-04-13
**Type:** Project kickoff meeting (Gemini-generated notes / transcript summary)
**Status:** ingested (notes body); 3 embedded screenshots image-only, not ingested

## Summary
The kickoff meeting for the Living Wiki project between KickstartAI and the UvA AI4Business Lab students. This is the **first ingested source carrying actual kickoff decisions, participant backgrounds, technical guidance, and action items** — much of which was previously flagged as image-locked or pending. Source: Gemini meeting notes (`2026-04-13-KAI-UvA-Kickoff-meeting-notes.md`). The **presentation deck used at this meeting** (`KickstartAI x UvA - Kick-off.pdf`) is now separately ingested and text-extractable — see [[kickoff-deck-2026-04-13]].

## Attendees
- **Sanne Wielinga** — Senior ML Engineer, KickstartAI; confirmed **main contact** for the students. The project was **handed over to Sanne from "Averion"** (see ambiguity note below).
- **Quinten van den Heuvel** (quintenvdheuvel12@gmail.com) — Dutch; interested in AI in the Dutch business sector. Team coordinator/spokesperson.
- **Xiaojing Li** ("XiaoJing") — from China; interested in AI, LLMs, and mathematics; raised the idea of in-person discussions in Delft.
- **Laurenz Ruckensteiner** (laurenz.ruckensteiner@gmail.com) — from Barcelona; prior data-scientist intern experience.
- **"Cara"** — originally from China; switched from business administration to business analytics (interest in analytics, coding, AI). Strongly maps to **Carac M. Cheng** (carac.m.cheng@gmail.com).
- **h.zhu@uva.nl** — invited; no background given in the notes (did not introduce themselves among the four students — strengthens the "supervisor, not participant" reading, but unstated). Role still unconfirmed — see [[_gaps]].

All four students are **business analytics students** working on this as a **thesis project**.

> ⚠️ **"Meng" discrepancy:** The 2026-04-10 email thread greeting named "Quinten, XiaoJing, Laurenz, **Meng**," but the meeting roster names Quinten, Xiaojing Li, Laurenz, and **"Cara"** — no "Meng" appears. "Meng" may have been a prior informal/preferred name now superseded, or a transcription discrepancy. Documented, not asserted. See [[project-team]], [[_gaps]].

## Key decisions / agreements
- **Self-documentation first** — the project's first task is to **document itself**, chosen because it avoids sharing sensitive data and provides an intuitive evaluation method.
- **Regular check-ins** agreed in principle (weekly or bi-weekly) given the short timeline; specific cadence TBD, to be emailed to Sanne. (The kickoff deck's closing **"How we'll work together – TBD"** slide corroborates that the collaboration model was deliberately left open — see [[kickoff-deck-2026-04-13]].)
- **Five core modules confirmed** (also named verbatim in the kickoff deck): ingestion pipeline, generation engine, generator module, gap detector, permission layer; the **evaluation framework runs throughout** the project. See [[user-journeys]], [[kickoff-deck-2026-04-13]], and the deliverable pages.
- **Permission layer need not be fully working** due to the short timeline — but students **must design** how it would handle sensitive data from the start. See [[permission-layer]].

## Technical guidance (from Sanne)
- **Spend more time on architecture / mockup**; data understanding may require less time for this self-documenting project than typical.
- **No hard limits on using LLMs**, but **do not rely solely on them** for building the core knowledge-management tool — students must apply critical thinking, especially for the permission layer and evaluation framework.
- Sanne is available for engineering questions.

## Methodology & timeline context
- The project follows the **CRISP-DM framework**. Quinten shared a rough Gantt chart **assumed to start April 1st**.
- The plan **needs updating** due to a delay in project selection.
- Early weeks focus on **business understanding, defining goals, and assigning roles**.
- **Presentation scheduled for April 22nd**, covering main goals and role assignments. See [[assignment-1-project-definition]].

## Implementation strategy (concrete)
- **Initial input data:** ingest the two-pager and slides; **scrape KickstartAI website + LinkedIn posts** for public documents; then continuously add the team's own PRs, meeting notes, design decisions, and presentations. The kickoff deck frames this as ingestion that "starts with KickstartAI docs and lab materials on day one" and grows as "every PR, meeting note, and decision feeds in." See [[ingestion-pipeline]], [[kickoff-deck-2026-04-13]].

## Action items
- **[Sanne]** Add students to the KickstartAI Slack community channel (today).
- **[Sanne]** Email useful presentation slides and meeting notes from the call.
- **[Sanne, group]** Complete signature process for project legal documents soon.
- **[Group]** Scrape KickstartAI website and LinkedIn posts for initial public documents.
- **[Group]** Set up a protocol for documenting internal meetings and design decisions immediately.
- **[Group]** Update/adjust the Gantt chart timeline and share the updated project overview.
- **[Group]** Discuss approach; assign specific roles and contributions this week.
- **[Group]** Determine optimal check-in frequency and notify Sanne by email.
- **[Sanne]** Check whether more useful evaluation criteria or a knowledge base can be provided for evaluation.

## Context corroborated
- Sanne reiterated KickstartAI's societal-challenges framing (tripling healthcare costs, reduced GDP growth, strained infrastructure, rising income inequality, climate impact) → practical AI roles (AI tutors, predictive diagnostics, smart infrastructure), with solutions intended to be **adopted and replicated across the Netherlands and beyond**. Corroborates the intro-deck framing on [[kickstartai]] — no new facts.
- The knowledge-management problem statement (documentation scattered across multiple concurrent AI projects) corroborates [[living-wiki]] and the verbatim three-bullet problem statement in [[kickoff-deck-2026-04-13]].

## Ambiguities / not ingested
- **"Averion" handover** — named as the party Sanne took the project over from; not in any other source. Possibly a transcription error for "Evertjan" (Evertjan Peer is the documented introducer), possibly a genuine predecessor. **Unconfirmed; no entity created.** See [[_gaps]].
- **3 embedded screenshots** (CDN-hosted JPGs) are **image-only and not ingested** — almost certainly the same image-locked deck/Gantt diagrams already flagged.

## Related
- [[project-team]]
- [[assignment-1-project-definition]]
- [[kickoff-deck-2026-04-13]]
- [[project-timeline]]
- [[permission-layer]]
- [[ingestion-pipeline]]
- [[evaluation-framework]]
- [[living-wiki]]
- [[kickstartai]]
- [[_overview]]

## Sources
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes/transcript summary; 3 embedded screenshots image-only, not ingested)
- 2026-04-13-KAI-UvA-Kickoff.md (KickstartAI x UvA kickoff slide deck, text-extractable; presentation artifact used at the meeting)
