# Gaps — Living Wiki (UvA)

Underdocumented areas and open questions.

## Surfaced from founding brief (2026-04-02)
- **Project-team mapping — largely resolved** — The working team is named (see [[project-team]]): Sanne Wielinga is the KickstartAI **main contact**, Evertjan Peer made the **introduction**.
- **UvA student team — largely resolved** — Four UvA business-analytics students named and (as of the 2026-04-13 kickoff notes) mostly identified: Quinten van den Heuvel (coordinator), Xiaojing Li, Laurenz Ruckensteiner, "Cara" ≈ Carac M. Cheng. See [[project-team]] and the residual mapping gaps below.
- **Timeline/milestones — partially evidenced** — Kickoff (2026-04-13) and Assignment 1 presentation (~2026-04-22, main goals + roles) are anchored. The Gantt chart artifact exists (dated 2026-04-13) and its **methodology is now known** (CRISP-DM, assumed April-1 start, needs revision) — but the chart image's specific phases/durations/milestones/end date remain un-OCR'd. See [[project-timeline]].
- **Tech stack undecided** — No LLM choice, vector store, ingestion connectors, or hosting documented.
- **Source connectors** — Kickoff named initial public sources (KickstartAI website scrape + LinkedIn posts, two-pager, slides) and ongoing internal sources (PRs, meeting notes, design decisions, presentations), but the specific connectors/tooling are unspecified. Slack is a live project channel — see below.
- **Regeneration cadence** — "Configurable schedule" (daily?) stated as an example, not decided.
- **Tone/voice spec** — "KickstartAI's voice" for content generation is referenced but not defined. A Content Strategist (Ioanna Lykiardopoulou — see [[kickstartai-team]]) exists on staff, but whether the voice spec will come from them is unconfirmed. See [[generator-module]].
- **Human baseline for blog eval** — Required but no baseline document exists yet. KickstartAI's published blogs (see [[kickstartai-blog]]) are a *candidate* source, but no specific article has been selected or ingested. (Possibility only.)
- **Permission model specifics** — Design approach (RBAC? doc-level ACLs?) not yet specified. Kickoff confirmed a **design-only** deliverable is acceptable (need not be fully working), but the mechanism is undecided. See [[permission-model]], [[permission-layer]].
- **Pending source material** — The KickstartAI two-pager and UvA AI4Business Lab documentation are referenced as data sources but not yet ingested.

## Surfaced from kickoff email thread ingest (2026-04-10 → 2026-04-20)
- **Role of h.zhu@uva.nl still unconfirmed** — A UvA address cc'd throughout and **invited to the kickoff meeting**, but did **not** introduce themselves among the four students — strengthening the "academic supervisor/coordinator" reading, though the role is not stated. See [[project-team]], [[kickoff-meeting-2026-04-13]].
- **"Mentor" role still not explicitly assigned** — Sanne is the explicit *main contact* and Evertjan the *introducer*, but no source names either "technical mentor."
- **Slack as a communication/source channel** — The KickstartAI community Slack is a live project channel (students added at kickoff); whether it will be an ingestion source for the Living Wiki is unspecified.

## Surfaced from Gantt chart ingest (2026-04-13)
- **Gantt chart image not OCR'd** — `2026-04-13-Gantt_chart.md` is a single embedded JPG with no extractable text. The chart's specific task breakdown, durations, dependencies, milestone dates, and **end date** remain undocumented. The kickoff notes now supply the *methodology* (CRISP-DM, assumed April-1 start, needs revision) textually, but the visual schedule remains unread. Flag for OCR/re-ingest. See [[project-timeline]].
- **Gantt is a draft needing revision** — Per the kickoff notes the plan needs updating due to a project-selection delay; the 2026-04-13 chart is not finalized.
- **Gantt ↔ Assignment 1 association unconfirmed** — Whether the Gantt is part of, accompanies, or is separate from the Assignment 1 deliverable is inferred from shared dating, not stated. See [[project-timeline]], [[assignment-1-project-definition]].

## Surfaced from KickstartAI intro deck ingest (2026-04-13)
- **Deck is largely image-only** — Substantive content (six-phase adoption model, partner-ripple diagram, challenge→solution mappings) is embedded as JPGs with no extractable text. Diagram contents **not ingested**, **not fabricated**. Flag for OCR/re-ingest. See [[kickstartai]], [[adoption-journey]].
- **Six-phase adoption model contents unknown** — Named in the deck but its phases/order/structure are image-locked. [[adoption-journey]] is a contents-pending stub.
- **Kickoff-deck identity unconfirmed** — Whether `KAI-Intro` is specifically `20260413 UvA.pdf` or `KickstartAI x UvA - Kick-off.pdf` is inferred from shared dating, not stated. See [[assignment-1-project-definition]].
- **Societal stats are point-in-time / undated-source** — ~2024 snapshots from a pitch deck; they will drift and are not authoritative. See [[kickstartai]].
- **Strategy framing vs. pillar vocabulary** — The deck's three strategic aspirations are *adjacent to but not asserted equivalent to* the documented three pillars. Relationship unconfirmed.

## Surfaced from kickoff meeting notes ingest (2026-04-13; ingested 2026-06-19)
- **"Averion" handover unexplained** — The kickoff notes state the project was handed over to Sanne Wielinga "from Averion." No other source mentions "Averion." Possibly a transcription error for "Evertjan" (the documented introducer), possibly a genuine predecessor party/org. **Unconfirmed; no entity created.** See [[project-team]], [[kickoff-meeting-2026-04-13]].
- **"Meng" name discrepancy** — The 2026-04-10 email greeting named "Quinten, XiaoJing, Laurenz, **Meng**," but the meeting roster names Quinten, **Xiaojing Li**, Laurenz, and **"Cara"** — no "Meng" appears. "Meng" may be a superseded informal/preferred name or a transcription discrepancy. Residual: the **lee89953@gmail.com** alias is not hard-confirmed to a specific named student (by elimination, most plausibly Xiaojing Li). See [[project-team]].
- **Cara ↔ Carac M. Cheng mapping inferred** — "Cara" (originally from China, moved from business administration to business analytics) strongly maps to Carac M. Cheng, but the mapping is inferred, not explicitly stated.
- **Check-in cadence undecided** — Weekly vs bi-weekly agreed in principle; specific frequency TBD (to be emailed to Sanne). See [[project-team]].
- **Roles / work division undefined** — Explicitly deferred at kickoff ("not yet discussed"; to be assigned "this week"). Specific role assignments unknown; expected at the Apr 22 presentation.
- **CRISP-DM ↔ deliverables mapping** — The CRISP-DM methodology is adopted, but how its phases map onto the six deliverables is not detailed.
- **Evaluation data / knowledge base pending** — Sanne is to check whether additional evaluation criteria or a knowledge base can be provided; outcome pending. See [[evaluation-framework]].
- **Legal / project documents unsigned** — A signature process for project legal documents is pending; the specific documents are unspecified.
- **Embedded screenshots not ingested** — The meeting notes contain 3 CDN-hosted JPGs (likely the same image-locked deck/Gantt diagrams already flagged); contents not ingested, not fabricated.

## Surfaced from KickstartAI homepage ingest (2026-05-07 clipping)
- **Pillar terminology drift** — Two parallel vocabularies ("We do / share / connect" vs "Apply / Amplify / Activate"); equivalence is *inferred, not stated*. Flag for confirmation.
- **Impact stats are point-in-time** — 10+ partners, 7,407+ community, 15+ projects are a 2026-05-07 snapshot with no "as-of" date; figures will drift.
- **Generator publication venue unconfirmed** — [[kickstartai-blog]] (more likely) and [[techdays]] are both documented as possibilities only; no source connects the Living Wiki's outputs to either.

## Surfaced from KickstartAI news/blog index ingest (2026-05-07 clipping)
- **Blog article bodies not ingested** — Only the news *index* was clipped; article content/voice are referenced but unread. See [[kickstartai-blog]].

## Surfaced from KickstartAI projects index ingest (2026-05-07 clipping)
- **Project bodies not ingested** — Only the projects *index* was clipped (titles, one-liners, partner lists). No case-study detail, outcomes, or dates. See [[kickstartai-projects]].
- **Additional collaborator orgs undocumented** — **bol**, **Philips**, and **NL4AI** recur as collaborators but are not described; their relationship to KickstartAI and the founders is unspecified.
- **Project portfolio is non-exhaustive / point-in-time** — 11 projects listed vs "15+ completed"; no "as-of" date on the source. The list will drift.
- **No Living Wiki project listed** — Expected; it is in scoping/internal, so the public list excludes it.
