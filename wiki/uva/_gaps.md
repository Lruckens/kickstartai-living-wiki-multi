# Gaps — Living Wiki (UvA)

Underdocumented areas and open questions.

## Surfaced from 2026-06-12 mock-up artifact ingest (ingested 2026-06-19)
- **Cara's component = Gap Detector — RESOLVED (positively confirmed).** The long-standing "Cara's component still unnamed" gap is **closed**: the 2026-06-12 mock-up artifact attributes a full **6-layer hybrid Gap Detector** design to Cara/Meng Cheng. Cara ↔ Member 3 is now **positively evidenced**, not by-elimination. See [[gap-detector]], [[mockup-artifact-2026-06-12]], [[project-team]], [[user-journeys]].
- **UI scope/existence — substantially RESOLVED (residual on deliverable status).** The 2026-06-04 "UI planned" gap is resolved: a **React/Vite + FastAPI UI is built** (Wiki + Operations + Generator + Permission + Gap surfaces). Residual: is the UI a **graded thesis deliverable or a convenience layer**? Still partly open. See [[wiki-generation-engine]], [[mockup-artifact-2026-06-12]].
- **Generator sourcing approach — RESOLVED toward "from the wiki."** The 2026-05-14 wiki-vs-source-documents question is answered for the implemented MVP: a **wiki-reader module** gathers wiki pages/content as generation context. See [[generator-module]].
- **GitHub repo schema/mechanics — substantially RESOLVED.** The artifact reveals the repo mechanics: **markdown-on-disk (no DB)**, 3-phase Ingest (Analyse/Apply/Push), **git-worktree "Wiki Bot" push** to `main`, FastAPI thin layer. Residual: full code body still un-ingested. See [[wiki-generation-engine]].
- **Backend deployment / laptop-local dependency — NEW (key durability risk).** The generator (and likely permission/gap) backends run **on individual laptops**; the system only works while the owner runs it. Sanne suggested **Vercel** (free plan likely sufficient); deployment is out of scope but to be attempted. Track outcome. See [[generator-module]], [[wiki-generation-engine]], [[project-team]].
- **Multi-component integration into one system — NEW.** Each component has its own UI/backend; Sanne and the team flag **integrating them into one working system** as the biggest challenge (extends the Claude + VS Code manual-merge durability gap). See [[wiki-generation-engine]].
- **Gap-detector scoring transparency — NEW (Sanne's feedback).** Manually-defined weights (0.45/0.40/0.15) + risk multipliers + Precision/Recall/F1 thresholds lack empirical/justified basis; importance vs. confidence are conflated and should be separated. See [[gap-detector]], [[evaluation-deliverable]].
- **Evaluation metric selection — refined (Sanne, ~3 metrics).** Sanne advises picking **circa three metrics** from academic/internet sources and applying them; systematic evaluation may be hard. Refines the existing metric-selection gap (alongside Quinten's options list). See [[evaluation-deliverable]], [[evaluation-framework]].
- **Vercel deployment direction — NEW.** A concrete (out-of-scope-but-attempted) deployment direction; track the outcome. See [[wiki-generation-engine]].
- **Usability vs. technicality — NEW (UX requirement).** Sanne's warning that the tool must be usable by non-technical company staff (esp. gap detector + permission layer) is now on record. See [[gap-detector]], [[permission-layer]].
- **Production authentication out of scope — NEW.** The permission-layer UI uses **passwordless demo accounts**; real password/access-control integration is explicitly future work for KickstartAI. See [[permission-layer]].
- **Generator output types fixed with KickstartAI — NEW.** A discussion fixed the generator output types; the specific list is referenced but not enumerated in extractable form. See [[generator-module]].
- **`.env` / API-key handling — NEW (secret management).** KickstartAI-provided Anthropic API key stored in a gitignored `.env` (`.env.example` template committed) — a per-deployment secret-management detail relevant to reuse. See [[_reuse]].
- **~15 UI screenshots not ingested — NEW.** The 2026-06-12 artifact's embedded PNG UI screenshots are image-only; contents not ingested, not fabricated. Re-ingest/OCR flag. See [[mockup-artifact-2026-06-12]].

## Surfaced from 2026-06-11 team-meeting ingest (ingested 2026-06-19)
- **Generator↔GitHub integration risk — RESOLVED.** Quinten's generator module and Laurenz's wiki architecture are integrated and functional (re-confirmed via PR in the 2026-06-12 artifact). See [[generator-module]], [[wiki-generation-engine]], [[team-meeting-2026-06-11]].
- **Integration tooling / durability — NEW.** Laurenz integrates the remaining modules by **merging MVPs manually using Claude + VS Code**; robustness/repeatability unspecified. See [[wiki-generation-engine]], [[team-meeting-2026-06-11]].
- **Evaluation-framework two-family split — NEW.** Recorded **two-family** structure: Laurenz+Quinten (LLM text-generation → comparable frameworks) vs. Cara+Xiaojing (different frameworks). See [[evaluation-framework]], [[evaluation-deliverable]].
- **Cara MVP-feasibility — status evolved/RESOLVED-in-practice.** The 2026-06-04 "MVP not feasible" friction was worked around; Cara shares an MVP (the Gap Detector). The methodology-reconciliation note remains for thesis framing. See [[team-meeting-2026-06-11]], [[gap-detector]].

## Surfaced from 2026-06-07 permission-layer design review thread ingest (ingested 2026-06-19)
- **Permission mechanism (RBAC/ACL) — substantially RESOLVED.** A **paragraph-level tier model** (public / internal / restricted-by-`project_id`) + a **pre-filtering ACL** + an **LLM self-audit**, now with an **email-based login + project-scoped UI** (2026-06-12). See [[permission-layer]], [[permission-model]], [[xiaojing-sanne-permission-email-2026-06-07]].
- **Permission-layer PoC vs. MoSCoW "Won't-Have working layer" — reconcile (kept).** A working, *evaluated* two-layer PoC + UI now exists, exceeding the Assignment-1 framing; scoped as partial implementation / scope-growth, MoSCoW record kept. See [[permission-layer]], [[_overview]].
- **Aggregation / inference leakage — NEW (unaddressed hard problem).** Grounded aggregation of allowed paragraphs revealing restricted info passes the audit; not yet in the threat model. See [[permission-layer]], [[permission-model]].
- **Paragraph-label assignment mechanism — NEW.** The pre-filtering guarantee rests on correct ingestion-time paragraph tier labels; who assigns them and how is unspecified. See [[permission-layer]].
- **Cross-project connections vs. strict project filtering — NEW (tension).** Strict `project_id` filtering is in tension with the cross-project-learnings feature; tier model implicitly resolves it but should be explicit. See [[permission-model]].
- **Evaluation environment = gpt-5.1 via UvA API (not Claude) — NEW.** Permission-layer experiments used gpt-5.1 as both generator and judge (same-model blind spot, persists even on Claude end-to-end); cross-model audit preferable. See [[wiki-generation-engine]], [[permission-layer]].
- **Permission-layer evaluation scale — NEW.** 5 scenarios/leak-type → one miss = 20% swing; frame as illustrative PoC. See [[evaluation-deliverable]], [[permission-layer]].
- **Claude-Code permission config via markdown file — NEW.** Current implementation reads access config from a markdown file (vs SQL paragraph-table updates). See [[wiki-generation-engine]], [[permission-layer]].
- **Person↔member mapping — M3 & M4 now resolved; M1/M2 soft.** **Xiaojing = M4** (self-asserted 2026-06-07) and **Cara = M3** (positively confirmed 2026-06-12). **Laurenz≈M1** and **Quinten≈M2** remain build/integration-activity soft signals. See [[project-team]], [[user-journeys]].
- **Xiaojing ↔ lee89953@gmail.com — RE-CORROBORATED.** See [[project-team]].
- **Sanne email domain — `@kickstart.ai` accumulating.** The `@kickstartai.org` variant remains unreconciled. See [[project-team]].

## Surfaced from 2026-06-04 development-phase team meeting ingest (ingested 2026-06-19)
- **UI / front-end layer — RESOLVED (built 2026-06-12).** See above.
- **Permission-layer user-id mechanism — RESOLVED.** Realized as `user_id`(email) + `project_id` pre-filtering + UI login. See [[permission-layer]], [[permission-model]].
- **MVP-vs-final-product feasibility (Cara) — evolved.** See 2026-06-11 entry. The Gap Detector is built; methodology-reconciliation note retained for thesis framing.

## Surfaced from 2026-05-15 demo follow-up thread ingest (ingested 2026-06-19)
- **Tech stack / LLM choice — RESOLVED.** Claude Code + Anthropic API (repo linked to Claude Code; React/Vite + FastAPI UI as of 2026-06-12). **Residual:** specific **vector store / embedding model / RAG framework** still unspecified (though the gap detector uses embeddings + NetworkX). See [[wiki-generation-engine]], [[laurenz-sanne-email-2026-05-15]].
- **Data-privacy / external-data-flow — OPEN, with directions.** ZDR API tier; configurable/swappable self-hosted/VPC backend; document local-vs-external operations. See [[permission-layer]], [[permission-model]], [[laurenz-sanne-email-2026-05-15]].
- **Student-materials corpus not yet ingested — NEW.** `llm-wiki-student-materials.zip` received 2026-05-18; documents not yet ingested. ⚠️ README must be EXCLUDED. See [[student-materials-corpus]], [[ingestion-pipeline]], [[evaluation-deliverable]].
- **PM Ops folder not yet ingested — NEW.** See [[kickstartai-pm-ops]].
- **Google Drive structure — pending delivery** from Sanne. See [[laurenz-sanne-email-2026-05-15]].
- **"Bakkie" is FICTIONAL — guardrail.** Must never be merged into the real [[kickstartai-projects]] portfolio. See [[student-materials-corpus]].
- **Agentic vs. pipeline — partially clarified.** Claude Code is itself agentic; further agentic structure vs. pipeline remains a live design choice. See [[wiki-generation-engine]].

## Surfaced from 2026-05-14 development-phase team meeting ingest (ingested 2026-06-19)
- **Data-understanding scope — open question.** What belongs in the CRISP-DM data-understanding phase given the cold-start corpus? See [[team-meeting-2026-05-14]].
- **Admin-per-project governance — (proposal recorded, mechanism unspecified).** See [[permission-layer]], [[team-meeting-2026-05-14]].
- **One-page-per-project vs. per-topic granularity — terminology note.** See [[wiki-generation-engine]], [[_reuse]].

## Surfaced from check-in scheduling thread ingest (2026-04-30 → 2026-05-04; ingested 2026-06-19)
- **Second UvA group ("both groups") — UNRESOLVED.** Implies a second UvA team beyond the four-person Living Wiki team; identity/project/relationship unknown. See [[checkin-scheduling-2026-04-30]], [[project-team]].
- **Delft office visit — date TBD.** See [[checkin-scheduling-2026-04-30]].
- **Standing check-in cadence — still open.** A one-off Thursday 11:00 call was scheduled; recurring weekly-vs-bi-weekly cadence undecided. See [[checkin-scheduling-2026-04-30]], [[project-team]].

## Surfaced from Assignment 1 written report ingest (2026-04-22; ingested 2026-06-19)
- **Member ↔ named-student mapping — RESOLVED for M3/M4, soft for M1/M2.** M4 = Xiaojing (self-asserted), M3 = Cara (confirmed 2026-06-12); M1≈Laurenz, M2≈Quinten (build/integration soft signals). See [[user-journeys]], [[project-team]].
- **Permission-layer division-scheme conflict — RESOLVED-BY-PRECEDENCE.** Deck + report assign the Permission Layer to Member 4 individually and name evaluation as collaborative, against the supervisor-kickoff note. See [[permission-layer]], [[user-journeys]], [[project-team]].
- **GAPS diagram — framework IDENTIFIED, image contents still locked.** GenAI-Analytic Problem Structure (GAPS) diagram per de Mast & Lokkerbol (2024); image contents un-OCR'd. See [[gaps-diagram]].
- **"Meng Cheng" ↔ "Cara"/"Carac M. Cheng" — NARROWED (alias inferred).** Same roster slot, surname, email. See [[project-team]], [[uva-ai4business-lab]].
- **Laurenz surname variant.** Report gives **Ruckensteiner-Geyer** (#13762931); shorter "Ruckensteiner" noted as a variant.
- **Literature/citation set — bodies not ingested.** Karpathy (2026), Lewis et al. (2020), Gao et al. (2023), Brown et al. (2020), Ji et al. (2023), Hevner (2007), Chapman et al. (2000), Martínez-Plumed et al. (2021), de Mast & Lokkerbol (2024), Bass/Clements/Kazman (2012), Parisi et al. (2019), Dean & Ghemawat (2008), GDPR/NIST/ISO/Kroll et al. — citations only.
- **Assignment 1 PDF body — RESOLVED.** Ingested as `2026-04-22-problem-definition.md`. See [[assignment-1-report-2026-04-22]].

## Surfaced from Assignment 1 presentation ingest (2026-04-22; ingested 2026-06-19)
- **5 embedded JPGs not ingested (deck).** GAPS/DAPS diagram + 4 "Core Problem" icons. See [[assignment-1-presentation-2026-04-22]].
- **12-week timeline vs. un-OCR'd Gantt.** Absolute start/end dates not pinned. See [[project-timeline]].
- **MoSCoW Could-haves are stretch goals.** HITL feedback, blog-draft tone alignment, comparative generated-vs-human evaluation. See [[evaluation-deliverable]], [[generator-module]].

## Surfaced from founding brief (2026-04-02)
- **Project-team mapping — resolved** — See [[project-team]].
- **UvA student team — resolved** — Four students named & identified with student numbers. See [[project-team]].
- **Tech stack — narrowed.** LLM backend resolved (Claude Code + Anthropic API); vector store / embedding model still partly unspecified.
- **Source connectors** — specific connectors/tooling unspecified; Slack is a live project channel.
- **Regeneration cadence** — daily refresh a Must; exact cadence config not finalized.
- **Tone/voice spec** — "KickstartAI's voice" referenced but not defined. See [[generator-module]].
- **Human baseline for blog eval** — no baseline document exists yet (now a Could-Have comparative eval). See [[evaluation-deliverable]].
- **Permission model specifics** — now substantially specified (see 2026-06-07/06-12). Design-only deliverable confirmed though an evaluated PoC + UI now exists. See [[permission-model]], [[permission-layer]].
- **Pending source material** — two-pager and UvA AI4Business Lab documentation not yet ingested. Cold-start situation.

## Surfaced / updated from kickoff email thread + supervisor kickoff ingests
- **UvA supervisor — RESOLVED** — h.zhu@uva.nl is **Hongyi Zhu**. See [[supervisor-kickoff-2026-04-16]].
- **lee89953@gmail.com — RESOLVED** — → Xiaojing Li. See [[project-team]].
- **"Meng" — RECONCILED (alias inferred)** — = **Meng Cheng** (= "Cara"/"Carac M. Cheng").
- **"Mentor" role still not explicitly assigned** — Sanne is the explicit main contact; no source names a "technical mentor."
- **Slack as a communication/source channel** — whether it will be an ingestion source is unspecified.

## Surfaced from supervisor kickoff ingest (2026-04-16)
- **Individual supervisor progress meetings** — Scheduled after Apr 22; dates/cadence unspecified. See [[project-team]].

## Surfaced from Gantt chart ingest (2026-04-13)
- **Gantt chart image not OCR'd** — `2026-04-13-Gantt_chart.md` is a single embedded JPG. See [[project-timeline]].
- **Gantt is a draft needing revision** — due to a project-selection delay.

## Surfaced from KickstartAI intro deck ingest (2026-04-13)
- **Deck is largely image-only** — diagram contents not ingested, not fabricated. See [[kickstartai]], [[adoption-journey]].
- **Six-phase adoption model contents unknown** — image-locked. [[adoption-journey]] is a contents-pending stub.
- **`KAI-Intro` ↔ `20260413 UvA.pdf` mapping unconfirmed.** See [[assignment-1-project-definition]].
- **Societal stats are point-in-time / undated-source.** See [[kickstartai]].
- **Strategy framing vs. pillar vocabulary** — relationship unconfirmed.

## Surfaced from kickoff slide deck ingest (2026-04-13; text-extractable)
- **Five-vs-six deliverable framing — RECONCILED** — five member-owned components + the evaluation framework = 6 deliverables. See [[user-journeys]].
- **"Day one" source set** — the lab-materials set remains un-ingested. See [[ingestion-pipeline]], [[uva-ai4business-lab]].
- **Collaboration model deliberately open** — recurring check-in cadence still TBD.

## Surfaced from kickoff meeting notes ingest (2026-04-13)
- **"Averion" handover unexplained** — possibly a transcription error for "Evertjan." Unconfirmed; no entity created. See [[project-team]], [[kickoff-meeting-2026-04-13]].
- **Check-in cadence undecided** — weekly vs bi-weekly. See [[project-team]].
- **Evaluation data / knowledge base pending** — a test corpus was delivered 2026-05-18. See [[evaluation-framework]], [[student-materials-corpus]].
- **Legal / project documents unsigned** — signature process pending.
- **Embedded screenshots not ingested** — 3 CDN-hosted JPGs.

## Surfaced from KickstartAI homepage ingest (2026-05-07 clipping)
- **Pillar terminology drift** — two parallel vocabularies; equivalence inferred.
- **Impact stats are point-in-time** — figures will drift.
- **Generator publication venue unconfirmed** — [[kickstartai-blog]] and [[techdays]] possibilities only.

## Surfaced from KickstartAI news/blog index ingest (2026-05-07 clipping)
- **Blog article bodies not ingested** — only the index was clipped. See [[kickstartai-blog]].

## Surfaced from KickstartAI projects index ingest (2026-05-07 clipping)
- **Project bodies not ingested** — only the index was clipped. See [[kickstartai-projects]].
- **Additional collaborator orgs undocumented** — bol, Philips, NL4AI.
- **Project portfolio is non-exhaustive / point-in-time.**
- **No Living Wiki project listed** — expected (internal/scoping).
- [ ] **stale-output-tracking** — The stale onboarding summary's superseded state is not yet resolved by regeneration; now contradicts even more facts (UI built, all four components, team mapped). — source: [[lint]] / [[mockup-artifact-2026-06-12]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — Aggregation/inference leakage lacks its own concept page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — RAG (Retrieval-Augmented Generation) has no dedicated concept page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — CRISP-DM and Design Science Research dual methodology is referenced on 6+ pages without a concept page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — Claude Code is the confirmed production backend but is only described inline. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The 'one wiki page = one project' information architecture decision lacks a structured rationale/alternatives record. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — Admin-per-project governance has no decision page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The Claude Code + Anthropic API tech-stack choice lacks a decision page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The permission model design lacks a record of rejected alternatives. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The markdown-on-disk / git-worktree "Wiki Bot" architecture choice lacks a decision page. — source: [[mockup-artifact-2026-06-12]] — flagged: 2026-06-19
- [ ] **missing-cross-reference** — gap-detector does not link to student-materials-corpus despite the corpus being its ground-truth evaluation source. — source: [[lint]] — flagged: 2026-06-19
- [ ] **open-question** — It is unspecified who assigns paragraph tier labels at ingestion and whether the process is automated. — source: [[lint]] — flagged: 2026-06-19
- [ ] **open-question** — The underlying vector store, embedding model, and RAG framework remain partly unspecified. — source: [[lint]] — flagged: 2026-06-19
- [ ] **open-question** — Whether the UI is a thesis deliverable or convenience layer needs a scope ruling. — source: [[lint]] / [[mockup-artifact-2026-06-12]] — flagged: 2026-06-19
- [ ] **methodology-reconciliation** — Cara's earlier claim that her component 'already delivers a final product' vs. the CRISP-DM mock-up-to-MVP progression needs reconciliation in the thesis framing (Gap Detector now built). — source: [[lint]] / [[mockup-artifact-2026-06-12]] — flagged: 2026-06-19
