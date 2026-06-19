# Gaps — Living Wiki (UvA)

Underdocumented areas and open questions.

## Surfaced from founding brief (2026-04-02)
- **Project-team mapping — largely resolved (2026-04-10 thread)** — The working team is now named (see [[project-team]]): Sanne Wielinga is the KickstartAI **point of contact**, Evertjan Peer made the **introduction**. Remaining nuance: neither is formally labeled "technical mentor" (see below).
- **UvA student team — largely resolved (2026-04-10 thread)** — Four UvA students named: Quinten van den Heuvel (coordinator), Laurenz Ruckensteiner, plus two appearing as email aliases. See [[project-team]] and the name-mapping gap below.
- **Timeline/milestones — partially evidenced, not resolved** — Kickoff (2026-04-13) and Assignment 1 presentation (~2026-04-22) are anchored (see [[_overview]], [[assignment-1-project-definition]]). A **Gantt chart artifact now demonstrably exists** (dated 2026-04-13, see [[project-timeline]]) — but it was ingested as an image only, so the actual phases/milestones/durations/end date remain unread. Distinguish "a schedule artifact exists" from "the timeline is known." See the Gantt-chart section below.
- **Tech stack undecided** — No LLM choice, vector store, ingestion connectors, or hosting documented.
- **Source connectors** — Which internal drives/tools (GitHub, transcription tools, email) will be connected is unspecified. Note: a community Slack channel is now a live project channel — see below.
- **Regeneration cadence** — "Configurable schedule" (daily?) stated as an example, not decided.
- **Tone/voice spec** — "KickstartAI's voice" for content generation is referenced but not defined. A Content Strategist (Ioanna Lykiardopoulou — see [[kickstartai-team]]) exists on staff, but whether the voice spec will come from them is unconfirmed. KickstartAI's published blogs (see [[kickstartai-blog]]) are candidate exemplars of the voice, but their bodies are not yet ingested. See [[generator-module]].
- **Human baseline for blog eval** — Required but no baseline document exists yet. KickstartAI's published technical/domain blogs (see [[kickstartai-blog]]) are a *candidate* source for the human-written baseline, but no specific article has been selected or ingested as the baseline. (Possibility only.)
- **Permission model specifics** — Design approach (RBAC? doc-level ACLs?) not yet specified. See [[permission-model]].
- **Pending source material** — The KickstartAI two-pager and UvA AI4Business Lab documentation are referenced as data sources but not yet ingested.

## Surfaced from kickoff email thread ingest (2026-04-10 → 2026-04-20; ingested 2026-06-19)
- **Student name↔email mapping ambiguous** — Sanne greets "Quinten, XiaoJing, Laurenz, and Meng," but two team members appear only as email aliases (`lee89953@gmail.com`, `carac.m.cheng@gmail.com`). Which alias corresponds to "XiaoJing" vs "Meng" (and how "Carac M. Cheng" maps) is unconfirmed. See [[project-team]].
- **Role of h.zhu@uva.nl unconfirmed** — A UvA address cc'd throughout; plausibly the UvA academic supervisor/coordinator, but the role is not stated (could also be a fifth participant). See [[project-team]].
- **"Mentor" role still not explicitly assigned** — Sanne is the explicit *point of contact* and Evertjan the *introducer*, but no source names either "technical mentor." The brief's "technical mentor (TBD)" is now closer but not formally closed.
- **Kickoff meeting notes not ingested** — Gemini-generated kick-off notes (2026-04-13) and kickoff slides (`20260413 UvA.pdf`, `KickstartAI x UvA - Kick-off.pdf`) are referenced as attachments but their *content* is not ingested; decisions made at kickoff are undocumented.
- **Assignment 1 content not ingested** — `Assignment 1 - project definition.pdf` and the team's presentation (`Living Project Wiki.pptx`) are referenced but bodies not ingested; the actual project-definition scope/decisions are unread. See [[assignment-1-project-definition]].
- **Slack as a communication/source channel** — The KickstartAI community Slack is now a live project channel; whether it will be an ingestion source for the Living Wiki is unspecified.

## Surfaced from Gantt chart ingest (2026-04-13; ingested 2026-06-19)
- **Gantt chart content not ingested (image-only)** — The source `2026-04-13-Gantt_chart.md` is a single embedded JPG (CDN-hosted) with no extractable text. Project phases, task breakdown, durations, dependencies, milestones, and **end date** remain undocumented. No timeline content was fabricated from the image. Flag for re-ingest via OCR/transcription or a text/structured version of the schedule. See [[project-timeline]].
- **Timeline gap now partially evidenced, not resolved** — A schedule *artifact* demonstrably exists (dated 2026-04-13), but the actual milestones beyond kickoff (2026-04-13) and Assignment 1 (~2026-04-22) are still unread. "Artifact exists" ≠ "timeline known."
- **Gantt ↔ Assignment 1 association unconfirmed** — Whether the Gantt chart is part of, accompanies, or is separate from the Assignment 1 project-definition deliverable is inferred from shared dating, not stated by any source. See [[project-timeline]], [[assignment-1-project-definition]].

## Surfaced from KickstartAI homepage ingest (2026-05-07 clipping)
- **Pillar terminology drift** — KickstartAI uses two parallel vocabularies for its three pillars ("We do / We share / We connect" vs "Apply / Amplify / Activate"). Documented as equivalent on [[kickstartai]] based on semantic mapping, but this equivalence is *inferred, not stated* by any source. Flag for confirmation.
- **Impact stats are point-in-time** — Impact numbers (10+ partners, 7,407+ community, 15+ projects completed) are a 2026-05-07 snapshot; the source carries no "as-of" / last-refresh date, so the figures will drift.
- **Generator publication venue unconfirmed** — Two plausible public venues are now documented for the Living Wiki's generated content: [[kickstartai-blog]] (the news/blog — the more likely channel) and [[techdays]] (the conference). No source connects the Living Wiki's outputs to either; both are possibilities only. (Refines the earlier TechDays-relevance gap.)

## Surfaced from KickstartAI news/blog index ingest (2026-05-07 clipping)
- **Blog article bodies not ingested** — Only the news *index* was clipped (2026-05-07). No individual article content has been ingested, so the actual content and voice of the "GenAI project management lessons" and technical blogs (see [[kickstartai-blog]]) are referenced but unread/undocumented.

## Surfaced from KickstartAI projects index ingest (2026-05-07 clipping)
- **Project bodies not ingested** — Only the projects *index* was clipped (2026-05-07): titles, one-liners, and partner lists only. No case-study detail, outcomes, dates, or per-project write-ups. The content/voice of these projects is referenced but unread. See [[kickstartai-projects]].
- **Additional collaborator orgs undocumented** — **bol**, **Philips**, and **NL4AI** recur as project collaborators but are not described anywhere; their relationship to KickstartAI (partner vs. participant vs. vendor) and to the four founding partners is unspecified. No entity pages created yet.
- **Project portfolio is non-exhaustive / point-in-time** — 11 projects listed (see [[kickstartai-projects]]) vs. "15+ completed" on the homepage; the projects page carries no "as-of" date on the source itself (clipping created 2026-05-07). The list will drift and is not a full inventory.
- **No Living Wiki project listed** — The Living Wiki / UvA AI4Business Lab project does not appear in the public portfolio (expected — it is in scoping/internal), so the public list excludes it.
