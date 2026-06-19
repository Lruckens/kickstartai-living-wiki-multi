# Operation log — Living Wiki (UvA)

Append-only. One entry per operation: ingest, query, or lint.

---

---

## 2026-06-16 — INGEST
**Source:** 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md (founding project brief)
**Action:** First ingest into empty wiki. Populated `_overview.md` skeleton; added gaps to `_gaps.md`; seeded `_reuse.md`.
**Pages created:** [[living-wiki]], [[user-journeys]], [[permission-model]], [[evaluation-framework]], [[kickstartai]], [[uva-ai4business-lab]], [[ingestion-pipeline]], [[wiki-generation-engine]], [[generator-module]], [[gap-detector]], [[permission-layer]], [[evaluation-deliverable]]
**Pages updated:** _overview.md, index.md, _gaps.md, _reuse.md
**Notes:** This is the founding charter for the project itself (the recursive "first project the system documents is itself"). Total pages now 12.

---

## 2026-06-16 — INGEST
**Source:** KickstartAI_About_us.md (public "About us" web clipping, https://kickstart.ai/about-us, created 2026-05-07)
**Action:** Low-risk enrichment ingest of KickstartAI organizational profile. Enriched [[kickstartai]] with mission, three pillars (do/share/connect), 2019 founding → 2022 independent non-profit history, ~7,500-professional community. Created roster page. Refined team and tone gaps; added cross-references on [[generator-module]].
**Pages created:** [[kickstartai-team]]
**Pages updated:** kickstartai.md, generator-module.md, _gaps.md, index.md
**Notes:** No conflicts — partner list consistent with prior entry. Deliberately avoided inferring any named person as the Living Wiki technical mentor; the brief leaves it TBD and this source does not connect anyone to the project. Kept staff roster distinct from the (still-TBD) project team. Total pages now 13.

---

## 2026-06-16 — INGEST
**Source:** KickstartAI_homepage.md (public homepage web clipping, https://kickstart.ai/, created 2026-05-07)
**Action:** Low-risk enrichment ingest of the KickstartAI homepage. Reconciled the two parallel pillar vocabularies on [[kickstartai]] ("We do/share/connect" ↔ "Apply/Amplify/Activate"); added the impact-in-numbers stats (10+ partners, 7,407+ community, 15+ projects) with a 2026-05-07 snapshot note; reconciled the community figure (~7,500 / 7,407+). Created a TechDays entity stub. Added "Amplify" alias and TechDays cross-reference to [[generator-module]]. Added three new gaps.
**Pages created:** [[techdays]]
**Pages updated:** kickstartai.md, generator-module.md, _gaps.md, index.md
**Notes:** No substantive conflicts. One minor numeric reconciliation: ~7,500 (marketing) vs 7,407+ (impact counter) — consistent, documented both with snapshot date rather than overwriting. Pillar-label equivalence is inferred, not stated by source — flagged in [[_gaps]]. TechDays kept as standalone stub (consistent with separating [[kickstartai-team]] from [[kickstartai]]); its relevance to the project's content outputs noted only as a possibility. Total pages now 14.

---

## 2026-06-16 — INGEST
**Source:** KickstartAI_News.md (public news/blog index web clipping, https://kickstart.ai/news, created 2026-05-07)
**Action:** Low-risk enrichment ingest of the KickstartAI news/blog *index* (listing only — no article bodies). Created a standalone channel stub for the blog, enumerating its content categories (GenAI project-management lessons, partner interviews, employee spotlights, technical blogs, domain blogs, community spotlights). Linked it from [[kickstartai]] under the "We share / Amplify" pillar and a new "Public channels" note. Strengthened [[generator-module]]'s publication-venue picture (blog as the more plausible channel vs [[techdays]]) and noted the blog as a candidate human-baseline corpus on [[evaluation-deliverable]]. Refined three gaps.
**Pages created:** [[kickstartai-blog]]
**Pages updated:** kickstartai.md, generator-module.md, evaluation-deliverable.md, _gaps.md, index.md
**Notes:** No conflicts. Employee-spotlight names corroborate the existing [[kickstartai-team]] roster with consistent spelling — no new staff names added. Index-only source: explicitly flagged that article bodies are not ingested (new gap). Venue and baseline-corpus links to [[generator-module]] / [[evaluation-deliverable]] kept as possibilities only — no source connects Living Wiki output to the blog. Total pages now 15.

---

## 2026-06-16 — INGEST
**Source:** KickstartAI_Projects.md (public projects index web clipping, https://kickstart.ai/projects, created 2026-05-07)
**Action:** Low-risk enrichment ingest of the KickstartAI project portfolio *index* (titles, one-liners, partner lists only — no project bodies). Created a standalone portfolio entity page listing 11 example projects and their partners. Linked it from [[kickstartai]] (new "Projects / portfolio" subsection + "Public channels" note, and the Apply pillar). Strengthened the blog↔project correspondence on [[kickstartai-blog]] (NS object detection, Ampère parcels, ING chatbot, food-insecurity, healthcare). Added a "breadth of target projects" note to [[_reuse]] reinforcing the configuration-not-rewrite principle. Added four gaps.
**Pages created:** [[kickstartai-projects]]
**Pages updated:** kickstartai.md, kickstartai-blog.md, _reuse.md, _gaps.md, index.md
**Notes:** No substantive conflicts. 11 listed projects vs "15+ completed" (homepage) treated as consistent — a curated, non-exhaustive showcase, flagged as point-in-time. **bol**, **Philips**, and **NL4AI** surfaced as recurring collaborators/participants but kept explicitly distinct from the four founding partners (Ahold Delhaize, ING, KLM, NS); no separate entity pages created — relationships undocumented (new gap). Index-only granularity: created a single portfolio page rather than per-project pages. Total pages now 16.

## [2026-06-19] generate | onboarding-summary — New team member

**File:** `wiki/uva/generator/2026-06-19-project-onboarding-summary.md`
**Output type:** onboarding-summary
**Variant:** N/A
**Stakeholder:** New team member
**Wiki pages consulted:** [[_overview]], [[index]], [[evaluation-deliverable]], [[gap-detector]], [[generator-module]], [[ingestion-pipeline]], [[permission-layer]], [[wiki-generation-engine]]

---

---

## 2026-06-19 — INGEST
**Source:** 2026-04-10-Intro-email.md (KickstartAI x UvA kickoff email thread, 2026-04-10 → 2026-04-20)
**Action:** Ingested the kickoff email thread — the project's human/process scaffolding. Created [[project-team]] consolidating the named UvA student team (Quinten van den Heuvel — coordinator, Laurenz Ruckensteiner, + two members as email aliases), KickstartAI POC Sanne Wielinga, introducer Evertjan Peer, and likely supervisor h.zhu@uva.nl. Created [[assignment-1-project-definition]] stub anchoring the first milestone (kickoff 2026-04-13; Assignment 1 presentation ~2026-04-22). Added Sanne Wielinga to the org roster ([[kickstartai-team]]) and updated the Evertjan note. Added the named team + supervisor to [[uva-ai4business-lab]]. Updated [[_overview]] status (kickoff held), team, and timeline anchors. Resolved/refined the two largest standing gaps and added finer-grained gaps.
**Pages created:** [[project-team]], [[assignment-1-project-definition]]
**Pages updated:** _overview.md, kickstartai-team.md, uva-ai4business-lab.md, _gaps.md, index.md
**Notes:** No hard contradictions. Two ambiguities deliberately not over-asserted: (1) student name↔email mapping — greeting names "Quinten, XiaoJing, Laurenz, Meng" but two members appear only as aliases (lee89953@, carac.m.cheng@); documented separately, mapping flagged unconfirmed. (2) Neither Sanne nor Evertjan is explicitly called "technical mentor" — documented roles as stated (Sanne = POC, Evertjan = introducer). Kept [[project-team]] distinct from org roster [[kickstartai-team]], consistent with prior separation discipline. Kickoff notes, kickoff slides, Assignment 1 PDF, and presentation deck referenced but bodies not ingested — flagged as pending. Total pages now 18.

---

## 2026-06-19 — INGEST
**Source:** 2026-04-13-Gantt_chart.md (project Gantt chart, dated 2026-04-13 — image-only, contents not ingested)
**Action:** Ingested the project Gantt chart artifact. The source body is **a single embedded CDN-hosted JPG with no extractable text** — no task names, dates, durations, dependencies, or milestone labels are readable. Created a lightweight stub [[project-timeline]] recording the artifact's existence and date while explicitly stating its contents are not ingested. Refined the standing "Timeline/milestones" gap from "no timeline documented" to "timeline artifact exists but unreadable/un-OCR'd." Added a new "Surfaced from Gantt chart ingest" gaps section. Cross-referenced the chart from [[assignment-1-project-definition]] (association inferred from shared dating, not asserted). Updated [[_overview]] status and timeline anchors.
**Pages created:** [[project-timeline]]
**Pages updated:** _overview.md, assignment-1-project-definition.md, _gaps.md, index.md
**Notes:** **No factual conflicts** — the document is image-only, so there are no readable claims to reconcile. Core discipline for this ingest: **record the artifact's existence and date, but do NOT invent its contents** — the image was not OCR'd/transcribed. Phases, durations, dependencies, milestones, and end date remain undocumented (flagged for re-ingest once transcribed or a text version is supplied). The Gantt↔Assignment-1 association is inferred from shared dating only and flagged as unconfirmed. Created a single stub (vs folding into [[assignment-1-project-definition]]) because the timeline is conceptually broader than Assignment 1 and is independently a major standing gap. Total pages now 19.

---

## 2026-06-19 — INGEST
**Source:** 2026-04-13-KAI-Intro.md (KickstartAI intro/strategy slide deck, dated 2026-04-13 — image-heavy; diagrams not ingested)
**Action:** Ingested the KickstartAI corporate/strategy intro deck (a kickoff-day stakeholder deck, plausibly one of the email-thread kickoff slide decks). The deck is **heavily image-based** — only slide titles, stat captions, and bullet fragments are legibly extractable; the six-phase adoption model, partner-ripple diagram, and challenge→solution mappings are embedded JPGs and **not ingested**. Enriched [[kickstartai]] with a new "Strategic positioning / societal mission" subsection (five challenges → five AI futures, three strategic aspirations, "designed for adoption, not pilots," and point-in-time societal stats). Created a contents-pending stub [[adoption-journey]] for the named-but-image-locked six-phase circular adoption model. Updated [[assignment-1-project-definition]] kickoff-artifact references (deck now partially ingested; identity vs named decks inferred from date). Added a new "Surfaced from KickstartAI intro deck ingest" gaps section. Updated [[_overview]] status and timeline anchors.
**Pages created:** [[adoption-journey]]
**Pages updated:** kickstartai.md, assignment-1-project-definition.md, _overview.md, _gaps.md, index.md
**Notes:** **No factual conflicts** — the deck corroborates existing [[kickstartai]] mission/applied-AI/"not pilots" framing. Core discipline (same as the Gantt ingest): **record legibly-extractable text only; do NOT fabricate diagram contents** — the six adoption-model phases, the partner-ripple diagram, and the challenge→solution mappings are image-locked and unread. Deliberately did **not** assert the deck's three strategic aspirations ("lighthouse / mobilize leaders / talent ecosystem") as a third equivalent to the documented three pillars — documented as a distinct strategy-deck framing, relationship flagged unconfirmed. Societal stats flagged point-in-time/undated-source. Kickoff-deck identity (vs `20260413 UvA.pdf` / `KickstartAI x UvA - Kick-off.pdf`) inferred from date, flagged unconfirmed. Total pages now 20.
