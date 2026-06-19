# Gaps — Living Wiki (UvA)

Underdocumented areas and open questions.

## Surfaced from Assignment 1 presentation ingest (2026-04-22; ingested 2026-06-19)
- **Member ↔ named-student mapping (#1–4) — OPEN.** The presentation maps build components to **"Member 1–4"** (M1 = Ingestion+Wiki Engine, M2 = Generator, M3 = Gap Detector, M4 = Permission Layer) but does **not** state which *named student* is Member 1/2/3/4. Owners-by-component resolved; owners-by-person still open. See [[user-journeys]], [[project-team]], [[assignment-1-presentation-2026-04-22]].
- **Division-scheme discrepancy — OPEN/CONFLICT.** The supervisor kickoff (2026-04-16) recorded "sub-deliverables 1–4 individual, **5 (Permission Layer) collaborative**, 6 per-member-into-thesis." The presentation (2026-04-22) instead assigns the **Permission Layer individually to Member 4** and bundles ingestion + wiki engine under Member 1. The presentation is later/more authoritative on component ownership, but the "collaborative permission layer" note was **not explicitly retracted** — which governs? Flagged, not silently overwritten. See [[permission-layer]], [[project-team]], [[user-journeys]].
- **5 embedded JPGs not ingested.** The presentation contains 5 image-only JPGs — the **DAPS diagram** + 4 "Core Problem" icons. The DAPS layer structure (**Data-Analytic Problem Layer** / **Persistent Artifact Layer**) is not legible. Flag for OCR/re-ingest; contents not fabricated. See [[assignment-1-presentation-2026-04-22]].
- **DAPS framework — unexplained.** "Data-Analytic Problem Layer / Persistent Artifact Layer" newly named but image-locked; its content, structure, and origin are undocumented.
- **12-week timeline vs. un-OCR'd Gantt.** The presentation gives a **3-phase / 12-week** structure (Phase 1 wks 1–4, Phase 2 wks 5–9, Phase 3 wks 10–12). Whether this matches the still-unread (revised) Gantt image is unconfirmed; **absolute start/end dates are not pinned** (week numbers only). See [[project-timeline]].
- **Tech stack — narrowed, still open.** The deck names **"RAG-grounded" / "LLM-powered"** and a daily-refresh wiki engine, but no specific **LLM, vector store, or RAG framework** is chosen. See [[wiki-generation-engine]].
- **MoSCoW Could-haves are stretch goals.** HITL feedback integration, blog-draft tone alignment, and comparative generated-vs-human evaluation are **Could Have** — track whether they survive scoping. See [[evaluation-deliverable]], [[generator-module]].
- **Assignment 1 PDF body still unread.** The presentation deck is ingested, but `Assignment 1 - project definition.pdf` itself remains un-ingested; any additional written project-definition detail there is unread. See [[assignment-1-project-definition]].

## Surfaced from founding brief (2026-04-02)
- **Project-team mapping — largely resolved** — The working team is named (see [[project-team]]): Sanne Wielinga is the KickstartAI **main contact**, Evertjan Peer made the **introduction**.
- **UvA student team — resolved** — Four UvA business-analytics students named and identified: Quinten van den Heuvel (coordinator), Xiaojing Li (lee89953@), Laurenz Ruckensteiner, "Cara" ≈ Carac M. Cheng. See [[project-team]] and the residual "Meng" note below.
- **Tech stack undecided** — No specific LLM choice, vector store, ingestion connectors, or hosting documented (RAG/LLM approach named at high level — see above).
- **Source connectors** — Kickoff named initial public sources (KickstartAI website scrape + LinkedIn posts, two-pager, slides) and ongoing internal sources (PRs, meeting notes, design decisions, presentations), but the specific connectors/tooling are unspecified. Slack is a live project channel — see below.
- **Regeneration cadence** — Presentation sets **daily refresh** as a Must and **sub-daily/real-time** as Won't, but exact cadence config not finalized.
- **Tone/voice spec** — "KickstartAI's voice" for content generation is referenced but not defined. A Content Strategist (Ioanna Lykiardopoulou — see [[kickstartai-team]]) exists on staff, but whether the voice spec will come from them is unconfirmed. See [[generator-module]].
- **Human baseline for blog eval** — Required but no baseline document exists yet (now a Could-Have comparative eval). KickstartAI's published blogs (see [[kickstartai-blog]]) are a *candidate* source, but no specific article has been selected or ingested. (Possibility only.)
- **Permission model specifics** — Design approach (RBAC? doc-level ACLs?) not yet specified. Design-only deliverable confirmed (MoSCoW: design = Should, fully working = Won't). The mechanism is undecided. See [[permission-model]], [[permission-layer]].
- **Pending source material** — The KickstartAI two-pager and UvA AI4Business Lab documentation are referenced as data sources but not yet ingested. The supervisor kickoff confirmed a **cold-start** situation (only the two-pager + website org info available so far).

## Surfaced / updated from kickoff email thread + supervisor kickoff ingests
- **UvA supervisor — RESOLVED** — h.zhu@uva.nl is **Hongyi Zhu**, **confirmed as the UvA academic supervisor** via the 2026-04-16 supervisor kickoff (see [[supervisor-kickoff-2026-04-16]]).
- **lee89953@gmail.com — RESOLVED** — The 2026-04-16 supervisor participant list **explicitly maps lee89953@gmail.com → Xiaojing Li**. See [[project-team]].
- **"Meng" discrepancy — narrowed, still open** — The 2026-04-10 greeting named "Meng," who appears in no roster. With lee89953@ now firmly Xiaojing Li, "Meng" remains an unmapped greeting name (likely a superseded informal/preferred name or transcription discrepancy). Documented, not asserted.
- **"Mentor" role still not explicitly assigned** — Sanne is the explicit *main contact* and Evertjan the *introducer*, but no source names either "technical mentor."
- **Slack as a communication/source channel** — The KickstartAI community Slack is a live project channel; whether it will be an ingestion source for the Living Wiki is unspecified.

## Surfaced from supervisor kickoff ingest (2026-04-16)
- **Sub-deliverable #1–4 numbering ↔ module mapping — RESOLVED (by component)** — The Assignment 1 presentation now maps components to members (see top section). The residual question is which *named student* is each member.
- **Individual supervisor progress meetings** — Scheduled "after next week's presentation" (i.e., after Apr 22); specific dates/cadence unspecified. See [[project-team]].

## Surfaced from Gantt chart ingest (2026-04-13)
- **Gantt chart image not OCR'd** — `2026-04-13-Gantt_chart.md` is a single embedded JPG with no extractable text. The presentation now supplies a 3-phase/12-week structure textually, but the visual Gantt's specific task breakdown, durations, dependencies, and milestone dates remain unread. Flag for OCR/re-ingest. See [[project-timeline]].
- **Gantt is a draft needing revision** — Per the kickoff notes the plan needs updating due to a project-selection delay.

## Surfaced from KickstartAI intro deck ingest (2026-04-13)
- **Deck is largely image-only** — Substantive content (six-phase adoption model, partner-ripple diagram, challenge→solution mappings) is embedded as JPGs with no extractable text. Diagram contents **not ingested**, **not fabricated**. Flag for OCR/re-ingest. See [[kickstartai]], [[adoption-journey]].
- **Six-phase adoption model contents unknown** — Named in the deck but its phases/order/structure are image-locked. [[adoption-journey]] is a contents-pending stub.
- **`KAI-Intro` ↔ `20260413 UvA.pdf` mapping unconfirmed** — Whether the image-heavy `KAI-Intro` strategy deck corresponds to the named kickoff file `20260413 UvA.pdf` remains inferred from shared dating, not stated. See [[assignment-1-project-definition]].
- **Societal stats are point-in-time / undated-source** — ~2024 snapshots from a pitch deck; they will drift. See [[kickstartai]].
- **Strategy framing vs. pillar vocabulary** — The deck's three strategic aspirations are *adjacent to but not asserted equivalent to* the documented three pillars. Relationship unconfirmed.

## Surfaced from kickoff slide deck ingest (2026-04-13; text-extractable)
- **Five-vs-six deliverable framing** — The kickoff deck names **five build modules** and omits the **evaluation framework** ("runs throughout"); the supervisor kickoff and the Assignment 1 presentation both enumerate **six** components/sub-deliverables (with evaluation as #6). 5 build modules + 1 cross-cutting framework = 6 deliverables. See [[user-journeys]].
- **"Day one" source set** — The specific **lab-materials set** (UvA AI4Business Lab docs) remains un-ingested/unspecified. See [[ingestion-pipeline]], [[uva-ai4business-lab]].
- **Collaboration model deliberately open** — Check-in cadence (weekly vs bi-weekly) still TBD.

## Surfaced from kickoff meeting notes ingest (2026-04-13)
- **"Averion" handover unexplained** — The kickoff notes state the project was handed over to Sanne "from Averion." No other source mentions "Averion." Possibly a transcription error for "Evertjan," possibly a genuine predecessor party. **Unconfirmed; no entity created.** See [[project-team]], [[kickoff-meeting-2026-04-13]].
- **Cara ↔ Carac M. Cheng mapping inferred** — Strong but inferred, not explicitly stated.
- **Check-in cadence undecided** — Weekly vs bi-weekly agreed in principle; specific frequency TBD (to be emailed to Sanne). See [[project-team]].
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
