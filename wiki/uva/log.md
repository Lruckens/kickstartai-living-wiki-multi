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
**Notes:** No conflicts. Deliberately avoided inferring any named person as the Living Wiki technical mentor. Total pages now 13.

---

## 2026-06-16 — INGEST
**Source:** KickstartAI_homepage.md (public homepage web clipping, https://kickstart.ai/, created 2026-05-07)
**Action:** Low-risk enrichment ingest of the KickstartAI homepage. Reconciled the two parallel pillar vocabularies on [[kickstartai]]; added impact-in-numbers stats; created TechDays entity stub; added gaps.
**Pages created:** [[techdays]]
**Pages updated:** kickstartai.md, generator-module.md, _gaps.md, index.md
**Notes:** No substantive conflicts. Total pages now 14.

---

## 2026-06-16 — INGEST
**Source:** KickstartAI_News.md (public news/blog index web clipping, https://kickstart.ai/news, created 2026-05-07)
**Action:** Low-risk enrichment ingest of the news/blog *index*. Created blog channel stub; linked from [[kickstartai]]; strengthened [[generator-module]] venue picture; noted blog as candidate baseline corpus on [[evaluation-deliverable]].
**Pages created:** [[kickstartai-blog]]
**Pages updated:** kickstartai.md, generator-module.md, evaluation-deliverable.md, _gaps.md, index.md
**Notes:** No conflicts. Index-only source. Total pages now 15.

---

## 2026-06-16 — INGEST
**Source:** KickstartAI_Projects.md (public projects index web clipping, https://kickstart.ai/projects, created 2026-05-07)
**Action:** Low-risk enrichment ingest of the project portfolio *index*. Created portfolio entity page (11 projects); linked from [[kickstartai]]; strengthened blog↔project correspondence; added breadth note to [[_reuse]]; added gaps.
**Pages created:** [[kickstartai-projects]]
**Pages updated:** kickstartai.md, kickstartai-blog.md, _reuse.md, _gaps.md, index.md
**Notes:** No substantive conflicts. bol/Philips/NL4AI kept distinct from founders. Total pages now 16.

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
**Action:** Ingested the kickoff email thread. Created [[project-team]] and [[assignment-1-project-definition]]; added Sanne to org roster; updated [[uva-ai4business-lab]], [[_overview]], [[_gaps]].
**Pages created:** [[project-team]], [[assignment-1-project-definition]]
**Pages updated:** _overview.md, kickstartai-team.md, uva-ai4business-lab.md, _gaps.md, index.md
**Notes:** Student name↔email mapping and "mentor" labeling deliberately not over-asserted. Total pages now 18.

---

## 2026-06-19 — INGEST
**Source:** 2026-04-13-Gantt_chart.md (project Gantt chart, dated 2026-04-13 — image-only, contents not ingested)
**Action:** Ingested the Gantt artifact (image-only). Created stub [[project-timeline]]; refined timeline gap; cross-referenced from [[assignment-1-project-definition]].
**Pages created:** [[project-timeline]]
**Pages updated:** _overview.md, assignment-1-project-definition.md, _gaps.md, index.md
**Notes:** Image-only; recorded existence/date but did not invent contents. Total pages now 19.

---

## 2026-06-19 — INGEST
**Source:** 2026-04-13-KAI-Intro.md (KickstartAI intro/strategy slide deck, dated 2026-04-13 — image-heavy; diagrams not ingested)
**Action:** Ingested the strategy intro deck (image-heavy). Enriched [[kickstartai]] strategic-positioning subsection; created [[adoption-journey]] stub; updated [[assignment-1-project-definition]], [[_overview]], [[_gaps]].
**Pages created:** [[adoption-journey]]
**Pages updated:** kickstartai.md, assignment-1-project-definition.md, _overview.md, _gaps.md, index.md
**Notes:** Recorded legibly-extractable text only; did not fabricate diagram contents. Total pages now 20.

---

## 2026-06-19 — INGEST
**Source:** 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes/transcript summary, 2026-04-13)
**Action:** Ingested the kickoff meeting notes — the first ingested source carrying actual kickoff decisions, participant backgrounds, technical guidance, and action items (long-flagged as a pending artifact). Created the first **Meetings** page [[kickoff-meeting-2026-04-13]]. **Resolved standing student-identity gaps:** "XiaoJing" = **Xiaojing Li** (China; AI/LLMs/maths); "Cara" ≈ **Carac M. Cheng** (China; business→analytics); Quinten (Dutch, coordinator), Laurenz (Barcelona, ex-data-scientist intern) — all four business-analytics thesis students. Refined [[project-team]] and [[uva-ai4business-lab]] rosters. Updated [[assignment-1-project-definition]] (Apr 22 = main goals + roles; CRISP-DM; Gantt draft needs revision; meeting notes now ingested). Updated [[project-timeline]] (CRISP-DM, assumed April-1 start, needs revision — methodology now textually known though chart image still un-OCR'd). Refined [[permission-layer]] scope (design-only acceptable; sensitive-data handling required from the start; don't rely solely on LLMs). Added concrete initial sources to [[ingestion-pipeline]] (two-pager, slides, KickstartAI website scrape, LinkedIn, then own PRs/notes/decisions). Corroborated [[living-wiki]] problem statement + "document itself first" rationale, [[evaluation-framework]] (self-documentation as intuitive eval; Sanne to check eval data/KB), and [[kickstartai]] societal-challenges framing. Updated [[_overview]] status/decisions/anchors. Added many gap resolutions + new gaps.
**Pages created:** [[kickoff-meeting-2026-04-13]]
**Pages updated:** project-team.md, uva-ai4business-lab.md, assignment-1-project-definition.md, project-timeline.md, permission-layer.md, ingestion-pipeline.md, living-wiki.md, evaluation-framework.md, kickstartai.md, _overview.md, _gaps.md, index.md
**Notes:** ⚠️ Two ambiguities deliberately NOT over-asserted: (1) **"Averion" handover** — Sanne took the project over "from Averion," a party absent from every other source; likely a transcription artifact for "Evertjan" but possibly a real predecessor — flagged as a gap, no entity created. (2) **"Meng" discrepancy** — present in the 2026-04-10 email greeting, absent from the meeting roster (which names Cara instead); documented as a discrepancy, lee89953@ still not hard-mapped. The Cara↔Carac M. Cheng mapping is strong but inferred. The 3 embedded screenshots are image-only and were not ingested/fabricated (likely the same image-locked deck/Gantt diagrams). No hard factual conflicts — societal framing, 5-module scope, Sanne-as-contact, and the Apr 22 presentation all corroborate prior entries; the April-1 assumed start + needs-revision note clarifies the Gantt's draft status without contradicting its 2026-04-13 date. Total pages now 21.
