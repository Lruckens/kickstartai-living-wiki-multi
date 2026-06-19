# Gaps — Living Wiki (UvA)

Underdocumented areas and open questions.

## Surfaced from Assignment 1 written report ingest (2026-04-22; ingested 2026-06-19)
- **Member ↔ named-student mapping (#1–4) — STILL OPEN.** Both the presentation deck and the written report map RQs/components to **"Member 1–4"** but neither binds each Member number to a *named student*. Owners-by-component resolved; owners-by-person still open. See [[user-journeys]], [[project-team]], [[assignment-1-report-2026-04-22]].
- **Permission-layer division-scheme conflict — RESOLVED-BY-PRECEDENCE.** Two later, mutually-consistent student-authored sources (deck + written report) assign the **Permission Layer to Member 4 individually** and name the **evaluation framework as the collaborative deliverable**, against the single supervisor-kickoff (2026-04-16) note that called the Permission Layer "collaborative." Treated as confirmed; the superseded note is recorded, not deleted. See [[permission-layer]], [[user-journeys]], [[project-team]].
- **GAPS diagram — framework IDENTIFIED, image contents still locked.** The deck's image-only "DAPS diagram" is textually identified as a **GenAI-Analytic Problem Structure (GAPS) diagram** per **de Mast & Lokkerbol (2024), DAPS diagrams for defining Data Science projects, *Journal of Big Data***. The framework's identity/origin is now closed (see [[gaps-diagram]]), but the **diagram image's actual node/layer contents remain in an un-OCR'd JPG** — re-ingest flag retained.
- **"Meng Cheng" ↔ "Cara"/"Carac M. Cheng" — NARROWED (alias relationship inferred).** The report's author list gives **Meng Cheng** (#14025906) in the exact roster slot earlier sources gave "Cara"/"Carac M. Cheng" (same surname Cheng, same email). Near-certainly the same person — likely official name "Meng Cheng," informal/anglicised "Cara"/"Carac M. Cheng." The explicit alias mapping is **inferred, not stated**. The 2026-04-10 "Meng" greeting is now reconciled to this student. See [[project-team]], [[uva-ai4business-lab]].
- **Laurenz surname variant.** The report gives **Ruckensteiner-Geyer** (#13762931); earlier sources used the shorter "Ruckensteiner." Updated to the fuller form, shorter noted as a variant.
- **Tech stack — narrowed, still open.** The report names RAG/LLM and generation strategies (direct prompting / RAG / template-driven) and design principles, but **no specific LLM, vector store, embedding model, or RAG framework** is chosen. See [[wiki-generation-engine]].
- **Literature/citation set — bodies not ingested.** The report cites Karpathy (2026), Lewis et al. (2020), Gao et al. (2023), Brown et al. (2020), Ji et al. (2023), Hevner (2007), Chapman et al. (2000), Martínez-Plumed et al. (2021), de Mast & Lokkerbol (2024), Bass/Clements/Kazman (2012), Parisi et al. (2019), Dean & Ghemawat (2008), GDPR/NIST/ISO/Kroll et al. — recorded as citations only; external bodies not ingested.
- **Assignment 1 PDF body — RESOLVED.** Previously flagged as unread; now ingested as `2026-04-22-problem-definition.md` (see [[assignment-1-report-2026-04-22]]).

## Surfaced from Assignment 1 presentation ingest (2026-04-22; ingested 2026-06-19)
- **5 embedded JPGs not ingested (deck).** The presentation contains 5 image-only JPGs — the **GAPS/DAPS diagram** + 4 "Core Problem" icons. The diagram layer structure is not legible (framework now identified — see [[gaps-diagram]]). Flag for OCR/re-ingest; contents not fabricated. See [[assignment-1-presentation-2026-04-22]].
- **12-week timeline vs. un-OCR'd Gantt.** The presentation/report give a **3-phase / 12-week** structure; whether this matches the still-unread (revised) Gantt image is unconfirmed; **absolute start/end dates are not pinned** (week numbers only). See [[project-timeline]].
- **MoSCoW Could-haves are stretch goals.** HITL feedback integration, blog-draft tone alignment, and comparative generated-vs-human evaluation are **Could Have** — track whether they survive scoping. See [[evaluation-deliverable]], [[generator-module]].

## Surfaced from founding brief (2026-04-02)
- **Project-team mapping — largely resolved** — See [[project-team]]: Sanne Wielinga is the KickstartAI **main contact**, Evertjan Peer made the **introduction**.
- **UvA student team — resolved** — Four UvA business-analytics students named & identified with student numbers: Quinten van den Heuvel (#15150658, coordinator), Xiaojing Li (#14851199, lee89953@), Laurenz Ruckensteiner-Geyer (#13762931), Meng Cheng (#14025906, = "Cara"/"Carac M. Cheng"). See [[project-team]].
- **Tech stack undecided** — No specific LLM choice, vector store, embedding model, ingestion connectors, or hosting documented (RAG/LLM + generation strategies named at high level — see above).
- **Source connectors** — Kickoff named initial public sources (website scrape + LinkedIn posts, two-pager, slides) and ongoing internal sources (PRs, meeting notes, design decisions, presentations), but the specific connectors/tooling are unspecified. Slack is a live project channel — see below.
- **Regeneration cadence** — Presentation sets **daily refresh** as a Must and **sub-daily/real-time** as Won't, but exact cadence config not finalized.
- **Tone/voice spec** — "KickstartAI's voice" referenced but not defined. A Content Strategist (Ioanna Lykiardopoulou — see [[kickstartai-team]]) exists on staff, but whether the voice spec will come from them is unconfirmed. See [[generator-module]].
- **Human baseline for blog eval** — Required but no baseline document exists yet (now a Could-Have comparative eval). KickstartAI's published blogs (see [[kickstartai-blog]]) are a *candidate* source, but no specific article has been selected or ingested. (Possibility only.)
- **Permission model specifics** — Design approach (RBAC? doc-level ACLs?) not yet specified. Design-only deliverable confirmed (MoSCoW: design = Should, fully working = Won't). The mechanism is undecided. See [[permission-model]], [[permission-layer]].
- **Pending source material** — The KickstartAI two-pager and UvA AI4Business Lab documentation are referenced as data sources but not yet ingested. The supervisor kickoff confirmed a **cold-start** situation (only the two-pager + website org info available so far).

## Surfaced / updated from kickoff email thread + supervisor kickoff ingests
- **UvA supervisor — RESOLVED** — h.zhu@uva.nl is **Hongyi Zhu**, **confirmed as the UvA academic supervisor** (supervisor kickoff + report title page). See [[supervisor-kickoff-2026-04-16]].
- **lee89953@gmail.com — RESOLVED** — The 2026-04-16 supervisor participant list **explicitly maps lee89953@gmail.com → Xiaojing Li**. See [[project-team]].
- **"Meng" — RECONCILED (alias inferred)** — The 2026-04-10 greeting named "Meng," now reconciled to **Meng Cheng** (= "Cara"/"Carac M. Cheng") via the report's author list. Alias relationship inferred, not stated. See above.
- **"Mentor" role still not explicitly assigned** — Sanne is the explicit *main contact* and Evertjan the *introducer*, but no source names either "technical mentor."
- **Slack as a communication/source channel** — The KickstartAI community Slack is a live project channel; whether it will be an ingestion source for the Living Wiki is unspecified.

## Surfaced from supervisor kickoff ingest (2026-04-16)
- **Individual supervisor progress meetings** — Scheduled "after next week's presentation" (i.e., after Apr 22); specific dates/cadence unspecified. See [[project-team]].

## Surfaced from Gantt chart ingest (2026-04-13)
- **Gantt chart image not OCR'd** — `2026-04-13-Gantt_chart.md` is a single embedded JPG with no extractable text. The presentation/report supply a 3-phase/12-week structure textually, but the visual Gantt's specific task breakdown, durations, dependencies, and milestone dates remain unread. Flag for OCR/re-ingest. See [[project-timeline]].
- **Gantt is a draft needing revision** — Per the kickoff notes the plan needs updating due to a project-selection delay.

## Surfaced from KickstartAI intro deck ingest (2026-04-13)
- **Deck is largely image-only** — Substantive content (six-phase adoption model, partner-ripple diagram, challenge→solution mappings) is embedded as JPGs with no extractable text. Diagram contents **not ingested**, **not fabricated**. Flag for OCR/re-ingest. See [[kickstartai]], [[adoption-journey]].
- **Six-phase adoption model contents unknown** — Named in the deck but its phases/order/structure are image-locked. [[adoption-journey]] is a contents-pending stub.
- **`KAI-Intro` ↔ `20260413 UvA.pdf` mapping unconfirmed** — inferred from shared dating, not stated. See [[assignment-1-project-definition]].
- **Societal stats are point-in-time / undated-source** — ~2024 snapshots from a pitch deck; they will drift. See [[kickstartai]].
- **Strategy framing vs. pillar vocabulary** — The deck's three strategic aspirations are *adjacent to but not asserted equivalent to* the documented three pillars. Relationship unconfirmed.

## Surfaced from kickoff slide deck ingest (2026-04-13; text-extractable)
- **Five-vs-six deliverable framing — RECONCILED** — The report's framing settles this: **five member-owned components (ingestion+wiki engine = one) + the evaluation framework as the collaborative/shared deliverable = 6 deliverables**. See [[user-journeys]].
- **"Day one" source set** — The specific **lab-materials set** (UvA AI4Business Lab docs) remains un-ingested/unspecified. See [[ingestion-pipeline]], [[uva-ai4business-lab]].
- **Collaboration model deliberately open** — Check-in cadence (weekly vs bi-weekly) still TBD.

## Surfaced from kickoff meeting notes ingest (2026-04-13)
- **"Averion" handover unexplained** — The kickoff notes state the project was handed over to Sanne "from Averion." No other source mentions "Averion." Possibly a transcription error for "Evertjan," possibly a genuine predecessor party. **Unconfirmed; no entity created.** See [[project-team]], [[kickoff-meeting-2026-04-13]].
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