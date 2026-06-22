# Gaps — Living Wiki (UvA)

Underdocumented areas and open questions.

## Surfaced from 2026-06-18 final demo check-in ingest (ingested 2026-06-19)
- **Vercel deployment — RESOLVED (decided against).** The team explicitly decided **not to deploy to Vercel**, prioritising individual thesis work and test cases. This closes the long-standing open Vercel deployment gap tracked since [[mockup-artifact-2026-06-12]]. See [[team-meeting-2026-06-18]], [[wiki-generation-engine]], [[generator-module]].
- **Obsidian graph integration — NEW, undocumented feature.** Laurenz showcased a **visual Obsidian graph of wiki page links** at the 18.06 demo. Not mentioned in any prior ingested source. Role (production feature vs. demo-only) and implementation details unspecified. See [[team-meeting-2026-06-18]], [[wiki-generation-engine]].
- **Cross-session learning feature — NEW, undocumented.** Xiaojing described a distinct wiki capability: summarize project learnings → ingest the summary as an internal document → accessible to team members in future sessions. Whether this is a dedicated UI flow or a general wiki capability is unspecified. See [[team-meeting-2026-06-18]].
- **"Another engineer" at KickstartAI — unnamed.** Sanne mentioned she and "another engineer" intend to use this work as a starting point for an internal KickstartAI project. Identity of the second engineer unknown. See [[team-meeting-2026-06-18]], [[_reuse]].
- **Post-defence Bakkie demo meeting — NEW.** The team plans to demo the Bakkie project to Sanne after the thesis deadline (Thursday evening post-22.06 defence). Whether this happened and what was shown is not yet documented. See [[team-meeting-2026-06-18]], [[student-materials-corpus]].
- **Friday 2026-06-20 final integration demo — NEW milestone.** Team agreed to meet Friday 20.06 to review all final details before the Monday defence. Outcome not yet documented. See [[team-meeting-2026-06-18]], [[project-timeline]].
- **Supervisor feedback — partially resolved.** Supervisor indicated project work is "generally sufficient, provided individual contributions are clear" — positive signal, but supervisor was at a conference and full feedback not yet received. See [[team-meeting-2026-06-18]].

## Surfaced from 2026-06-19 evaluation runplan ingest (ingested 2026-06-19)
- **~~`evaluation/RUN-PLAN.md` not ingested~~ — RESOLVED.** The evaluation runplan is now ingested as [[evaluation-runplan-2026-06-19]]. The gap from the multi-project app ingest (2026-06-17) is closed.
- **"Westerwoude" project name — NEW, identity unresolved.** The corpus hygiene filter in the evaluation runplan excludes "Westerwoude/Bakkie" cross-project sources from the UvA evaluation corpus. "Westerwoude" appears here for the **first time** in any ingested source. It could be: (a) a real KickstartAI project whose source files ended up in `/sources/uva/` by accident, (b) another name for the Bakkie fictional corpus, or (c) a third project entirely. No entity page created; do not assert. See [[evaluation-runplan-2026-06-19]], [[student-materials-corpus]].
- **Bakkie identity — further evidence (still unresolved).** The hygiene filter listing "Westerwoude/Bakkie" as cross-project sources to exclude from the UvA corpus is consistent with the fictional-test-corpus reading (Bakkie files exist in `/sources/` but are not UvA project material). Does not fully resolve the ambiguity — the fictional-Bakkie guardrail remains in force. See [[student-materials-corpus]], [[kickstartai-projects]], [[multi-project-app-2026-06-17]].
- **Specific model versions — first cited, eval-harness context — NEW.** `claude-opus-4-8` (answer model), `claude-haiku-4-5` (retrieval model), `claude-sonnet-4-6` (judge model) appear for the first time in [[evaluation-runplan-2026-06-19]]. These are the evaluation harness models; whether they match the production wiki-engine model (Claude Code + Anthropic API) is unspecified. Do not conflate with the production stack. See [[wiki-generation-engine]], [[evaluation-runplan-2026-06-19]].
- **Evaluation harness files not ingested — NEW.** The following files are referenced in the runplan but not provided as source documents: `questions.json` (question set + human reference answers), `reference-answers-worksheet.md` (human reference answer worksheet), `metrics.py` (scoring logic), `pipelines.py` (corpus hygiene filter + retrieval pipeline), `run_eval.py` (runner script). See [[evaluation-runplan-2026-06-19]].
- **`results.json` not yet available — NEW.** The evaluation output file; will be generated post-run (2026-06-19). Not yet ingested. See [[evaluation-runplan-2026-06-19]].
- **Judge validation protocol — pending — NEW.** Sanne's requirement: hand-rate ~20–30 evaluation items and compare to LLM judge scores (Spearman/κ); report agreement to make LLM-as-Judge defensible. Whether this has been done, by whom, and the result are not yet stated. See [[evaluation-runplan-2026-06-19]], [[evaluation-deliverable]].
- **Human reference answers not yet written — NEW (as of runplan authoring).** The 30 human reference answers for `questions.json` (T1/T2 questions; T3 = abstain deterministically) were to be written on the day of the run from the `.md` sources, not from the wiki pages. Whether they are now complete is not stated. See [[evaluation-runplan-2026-06-19]].

## Surfaced from 2026-06-17 multi-project app ingest (ingested 2026-06-19)
- **~~`evaluation/RUN-PLAN.md` not ingested~~ — RESOLVED.** See above.
- **`token_usage.md` not ingested — OPEN.** Per-ingest token logging file; directly relevant to the Anthropic API budget caution and the H2 build-cost/break-even analysis. The file's role is confirmed by the runplan; the file contents are still not ingested. See [[multi-project-app-2026-06-17]], [[evaluation-runplan-2026-06-19]], [[ingestion-pipeline]].
- **"Bakkie" identity in multi-project app — OPEN (ambiguity).** The multi-project app registers `bakkie` as "a second, real project — proves multi-project isolation." The existing wiki treats "Bakkie" as a fictional student-materials test corpus that must never be merged into the real portfolio. Whether this is the same fictional corpus used as the second subtree (most plausible) or a different real KickstartAI project is unresolved. Hygiene-filter evidence (see above) strengthens the fictional-corpus reading but does not close it. Fictional-Bakkie guardrail remains in force. See [[multi-project-app-2026-06-17]], [[student-materials-corpus]], [[kickstartai-projects]].
- **`wiki/bakkie/` and `sources/bakkie/` contents not ingested — OPEN.** The Bakkie project subtree exists in the multi-project app but its wiki contents are not ingested. See [[multi-project-app-2026-06-17]].
- **Multi-project app deployment status — OPEN.** Whether this multi-project app supersedes the single-project app entirely, runs alongside it, or has been deployed to Vercel is not stated. (Vercel deployment was decided against at [[team-meeting-2026-06-18]].) See [[multi-project-app-2026-06-17]], [[wiki-generation-engine]].
- **`[[decision-multi-project-app-structure]]` stub only — OPEN (partial resolution).** The document references this decision record as already existing; a stub page has been created but the full rationale/alternatives-considered record is not in the ingested sources. See [[decision-multi-project-app-structure]].

## Surfaced from 2026-06-15 team-meeting ingest (ingested 2026-06-19)
- **Restricted-tier pages not yet implemented — OPEN.** The integrated live wiki currently holds only **public + internal** pages; **restricted pages must be added** to test the permission layer's full leakage-prevention functionality end-to-end. See [[permission-layer]], [[team-meeting-2026-06-15]].
- **Anthropic API budget / token-cost management — OPEN (operational risk).** Risk of exhausting the Anthropic API quota before the final new-project test ingestions; mitigation = pre-parse/convert source docs to lighter formats (PDFs especially expensive — processed as text *and* image). Durability/reproducibility consideration for the final demo. See [[ingestion-pipeline]], [[team-meeting-2026-06-15]].
- **Evaluation-metric shortlist proposed but not finalized/applied — OPEN (advances existing gap).** Candidates: **Self-BLEU, BERTScore, LLM-as-Judge** (coherence / faithfulness / stakeholder-appropriateness). Final selection, thresholds, and mapping to the four dimensions still pending. The formal runplan implements LLM-as-Judge (correctness + faithfulness) as primary metrics. See [[evaluation-framework]], [[evaluation-deliverable]], [[team-meeting-2026-06-15]], [[evaluation-runplan-2026-06-19]].
- **New-project use-case experiment design — OPEN.** Plan to re-ingest all docs into an empty wiki, then ingest a **fake KickstartAI project** to test generalization; experiment specifics (success criteria, what's measured during ingestion) to be designed 17.06. See [[evaluation-deliverable]], [[team-meeting-2026-06-15]].
- **Gap-detector "Team confirmed" label unclear — OPEN (minor UX).** The label's meaning/behavior in the Gap Detector dashboard is unclear and should be clarified. See [[gap-detector]], [[team-meeting-2026-06-15]].
- **Branch-per-member workflow durability — OPEN (partial mitigation note).** Any member can run the UI via a personal branch + local repo, with Laurenz gatekeeping merges to main; mitigates single-laptop-owner risk but is **not** central/URL deployment (Vercel gap now closed — decided against). Robustness/repeatability of local runs unspecified. See [[wiki-generation-engine]], [[project-team]], [[team-meeting-2026-06-15]].
- **Final-demo / thesis-defence date PINNED — RESOLVED.** **Monday 2026-06-22** = final artifact demo + individual thesis defences; anchors the previously-unpinned Phase 3 end / project end date. See [[project-timeline]], [[team-meeting-2026-06-15]].

## Surfaced from 2026-06-12 mock-up artifact ingest (ingested 2026-06-19)
- **Cara's component = Gap Detector — RESOLVED (positively confirmed).** The long-standing "Cara's component still unnamed" gap is **closed**: the 2026-06-12 mock-up artifact attributes a full **6-layer hybrid Gap Detector** design to Cara/Meng Cheng. Cara ↔ Member 3 is now **positively evidenced**, not by-elimination. See [[gap-detector]], [[mockup-artifact-2026-06-12]], [[project-team]], [[user-journeys]].
- **UI scope/existence — substantially RESOLVED (residual on deliverable status).** The 2026-06-04 "UI planned" gap is resolved: a **React/Vite + FastAPI UI is built** (Wiki + Operations + Generator + Permission + Gap surfaces). Residual: is the UI a **graded thesis deliverable or a convenience layer**? Still partly open. See [[wiki-generation-engine]], [[mockup-artifact-2026-06-12]].
- **Generator sourcing approach — RESOLVED toward "from the wiki."** The 2026-05-14 wiki-vs-source-documents question is answered for the implemented MVP: a **wiki-reader module** gathers wiki pages/content as generation context. See [[generator-module]].
- **GitHub repo schema/mechanics — substantially RESOLVED.** The artifact reveals the repo mechanics: **markdown-on-disk (no DB)**, 3-phase Ingest (Analyse/Apply/Push), **git-worktree "Wiki Bot" push** to `main`, FastAPI thin layer. Residual: full code body still un-ingested. See [[wiki-generation-engine]].
- **Backend deployment / laptop-local dependency — RESOLVED (Vercel decided against; branch-per-member mitigation).** The generator (and likely permission/gap) backends run **on individual laptops**; the system only works while the owner runs it. Sanne suggested **Vercel** (free plan likely sufficient); the team decided against Vercel at [[team-meeting-2026-06-18]] to prioritise thesis work. The 2026-06-15 **branch-per-member workflow** lets any member run the UI locally (partial mitigation). Track outcome. See [[generator-module]], [[wiki-generation-engine]], [[project-team]], [[team-meeting-2026-06-18]].
- **Multi-component integration into one system — SUBSTANTIALLY RESOLVED (demoed 2026-06-15).** Each component had its own UI/backend; Sanne flagged **integrating them into one working system** as the biggest challenge. Laurenz **demoed the fully integrated wiki** on 2026-06-15 and again to Sanne on 2026-06-18. Residual: robustness/repeatability of the manual Claude+VS-Code merge. See [[wiki-generation-engine]], [[team-meeting-2026-06-15]], [[team-meeting-2026-06-18]].
- **Gap-detector scoring transparency — OPEN (Sanne's feedback).** Manually-defined weights (0.45/0.40/0.15) + risk multipliers + Precision/Recall/F1 thresholds lack empirical/justified basis; importance vs. confidence are conflated and should be separated. See [[gap-detector]], [[evaluation-deliverable]].
- **Evaluation metric selection — refined (Sanne, ~3 metrics; shortlist proposed 2026-06-15).** Sanne advises picking **circa three metrics** from academic/internet sources and applying them; a concrete shortlist (Self-BLEU, BERTScore, LLM-as-Judge) is now under research. See [[evaluation-deliverable]], [[evaluation-framework]], [[team-meeting-2026-06-15]].
- **~~Vercel deployment direction — RESOLVED (decided against 2026-06-18).~~** See 2026-06-18 entry above.
- **Usability vs. technicality — OPEN (UX requirement).** Sanne's warning that the tool must be usable by non-technical company staff (esp. gap detector + permission layer) is now on record. See [[gap-detector]], [[permission-layer]].
- **Production authentication out of scope — noted.** The permission-layer UI uses **passwordless demo accounts**; real password/access-control integration is explicitly future work for KickstartAI. See [[permission-layer]].
- **Generator output types fixed with KickstartAI — noted.** A discussion fixed the generator output types; the specific list is referenced but not enumerated in extractable form. See [[generator-module]].
- **`.env` / API-key handling — noted (secret management).** KickstartAI-provided Anthropic API key stored in a gitignored `.env` (`.env.example` template committed) — a per-deployment secret-management detail relevant to reuse. See [[_reuse]].
- **~15 UI screenshots not ingested — OPEN.** The 2026-06-12 artifact's embedded PNG UI screenshots are image-only; contents not ingested, not fabricated. Re-ingest/OCR flag. See [[mockup-artifact-2026-06-12]].

## Surfaced from 2026-06-11 team-meeting ingest (ingested 2026-06-19)
- **Generator↔GitHub integration risk — RESOLVED.** Quinten's generator module and Laurenz's wiki architecture are integrated and functional (re-confirmed via PR in the 2026-06-12 artifact). See [[generator-module]], [[wiki-generation-engine]], [[team-meeting-2026-06-11]].
- **Integration tooling / durability — OPEN.** Laurenz integrates the remaining modules by **merging MVPs manually using Claude + VS Code**; robustness/repeatability unspecified. See [[wiki-generation-engine]], [[team-meeting-2026-06-11]].
- **Evaluation-framework two-family split — noted.** Recorded **two-family** structure: Laurenz+Quinten (LLM text-generation → comparable frameworks) vs. Cara+Xiaojing (different frameworks). See [[evaluation-framework]], [[evaluation-deliverable]].
- **Cara MVP-feasibility — status evolved/RESOLVED-in-practice.** The 2026-06-04 "MVP not feasible" friction was worked around; Cara shares an MVP (the Gap Detector). The methodology-reconciliation note remains for thesis framing. See [[team-meeting-2026-06-11]], [[gap-detector]].

## Surfaced from 2026-06-07 permission-layer design review thread ingest (ingested 2026-06-19)
- **Permission mechanism (RBAC/ACL) — substantially RESOLVED.** A **paragraph-level tier model** (public / internal / restricted-by-`project_id`) + a **pre-filtering ACL** + an **LLM self-audit**, now with an **email-based login + project-scoped UI** (2026-06-12) and **config-driven per-project membership** (2026-06-17). See [[permission-layer]], [[permission-model]], [[xiaojing-sanne-permission-email-2026-06-07]].
- **Permission-layer PoC vs. MoSCoW "Won't-Have working layer" — reconcile (kept).** A working, *evaluated* two-layer PoC + UI now exists, exceeding the Assignment-1 framing; scoped as partial implementation / scope-growth, MoSCoW record kept. See [[permission-layer]], [[_overview]].
- **Aggregation / inference leakage — OPEN (unaddressed hard problem).** Grounded aggregation of allowed paragraphs revealing restricted info passes the audit; not yet in the threat model. See [[permission-layer]], [[permission-model]].
- **Paragraph-label assignment mechanism — OPEN.** The pre-filtering guarantee rests on correct ingestion-time paragraph tier labels; who assigns them and how is unspecified. See [[permission-layer]].
- **Cross-project connections vs. strict project filtering — OPEN (tension).** Strict `project_id` filtering is in tension with the cross-project-learnings feature; tier model implicitly resolves it but should be explicit. See [[permission-model]].
- **Evaluation environment = gpt-5.1 via UvA API (not Claude) — noted.** Permission-layer experiments used gpt-5.1 as both generator and judge (same-model blind spot, persists even on Claude end-to-end); cross-model audit preferable. See [[wiki-generation-engine]], [[permission-layer]].
- **Permission-layer evaluation scale — noted.** 5 scenarios/leak-type → one miss = 20% swing; frame as illustrative PoC. See [[evaluation-deliverable]], [[permission-layer]].
- **Claude-Code permission config via markdown file — noted.** Current implementation reads access config from a markdown file (vs SQL paragraph-table updates). See [[wiki-generation-engine]], [[permission-layer]].
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
- **Student-materials corpus not yet ingested — OPEN.** `llm-wiki-student-materials.zip` received 2026-05-18; documents not yet ingested. ⚠️ README must be EXCLUDED. See [[student-materials-corpus]], [[ingestion-pipeline]], [[evaluation-deliverable]].
- **PM Ops folder not yet ingested — OPEN.** See [[kickstartai-pm-ops]].
- **Google Drive structure — pending delivery** from Sanne. See [[laurenz-sanne-email-2026-05-15]].
- **"Bakkie" is FICTIONAL — guardrail.** Must never be merged into the real [[kickstartai-projects]] portfolio. See [[student-materials-corpus]].
- **Agentic vs. pipeline — partially clarified.** Claude Code is itself agentic; further agentic structure vs. pipeline remains a live design choice. See [[wiki-generation-engine]].

## Surfaced from 2026-05-14 development-phase team meeting ingest (ingested 2026-06-19)
- **Data-understanding scope — open question.** What belongs in the CRISP-DM data-understanding phase given the cold-start corpus? See [[team-meeting-2026-05-14]].
- **Admin-per-project governance — (proposal recorded, mechanism unspecified).** See [[permission-layer]], [[team-meeting-2026-05-14]].
- **One-page-per-project vs. per-topic granularity — terminology note.** Now realized as per-project subtrees in the multi-project app. See [[wiki-generation-engine]], [[multi-project-app-2026-06-17]], [[_reuse]].

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
- **12-week timeline vs. un-OCR'd Gantt.** Absolute start dates not pinned; end pinned to 2026-06-22 (see 2026-06-15 entry). See [[project-timeline]].
- **MoSCoW Could-haves are stretch goals.** HITL feedback, blog-draft tone alignment, comparative generated-vs-human evaluation. See [[evaluation-deliverable]], [[generator-module]].

## Surfaced from founding brief (2026-04-02)
- **Project-team mapping — resolved** — See [[project-team]].
- **UvA student team — resolved** — Four students named & identified with student numbers. See [[project-team]].
- **Tech stack — narrowed.** LLM backend resolved (Claude Code + Anthropic API); vector store / embedding model still partly unspecified.
- **Source connectors** — specific connectors/tooling unspecified; Slack is a live project channel.
- **Regeneration cadence** — daily refresh a Must; exact cadence config not finalized.
- **Tone/voice spec** — "KickstartAI's voice" referenced but not defined. See [[generator-module]].
- **Human baseline for blog eval** — no baseline document exists yet (now a Could-Have comparative eval). See [[evaluation-deliverable]].
- **Permission model specifics** — now substantially specified (see 2026-06-07/06-12/06-17). Design-only deliverable confirmed though an evaluated PoC + UI + config-driven per-project access now exists. See [[permission-model]], [[permission-layer]].
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
- [ ] **stale-output-tracking** — The stale onboarding summary's superseded state is not yet resolved by regeneration; now contradicts even more facts (UI built, all four components, team mapped, fully integrated demo, dated final-demo schedule, multi-project app, C0/C1/C1r/C2 evaluation running). — source: [[lint]] / [[mockup-artifact-2026-06-12]] / [[team-meeting-2026-06-15]] / [[multi-project-app-2026-06-17]] / [[evaluation-runplan-2026-06-19]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — Aggregation/inference leakage lacks its own concept page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — RAG (Retrieval-Augmented Generation) has no dedicated concept page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — CRISP-DM and Design Science Research dual methodology is referenced on 6+ pages without a concept page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — Claude Code is the confirmed production backend but is only described inline. — source: [[lint]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — Evaluation metrics (Self-BLEU, BERTScore, LLM-as-Judge) could warrant a dedicated concept page once finalized. — source: [[team-meeting-2026-06-15]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — Obsidian graph integration (visual wiki link map) is a new undocumented feature. — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — Cross-session learning feature (summarize → ingest → access) is a new undocumented wiki capability. — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The 'one wiki page = one project' information architecture decision lacks a structured rationale/alternatives record. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — Admin-per-project governance has no decision page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The Claude Code + Anthropic API tech-stack choice lacks a decision page. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The permission model design lacks a record of rejected alternatives. — source: [[lint]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The markdown-on-disk / git-worktree "Wiki Bot" architecture choice lacks a decision page. — source: [[mockup-artifact-2026-06-12]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The branch-per-member collaboration workflow (Laurenz as merge gatekeeper) lacks a decision page. — source: [[team-meeting-2026-06-15]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The `.md`-only evaluation fairness constraint lacks a structured rationale/alternatives record beyond the runplan inline note. — source: [[evaluation-runplan-2026-06-19]] — flagged: 2026-06-19
- [ ] **undocumented-decision** — The decision against Vercel deployment (prioritize thesis work + test cases) lacks a decision page. — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **missing-cross-reference** — gap-detector does not link to student-materials-corpus despite the corpus being its ground-truth evaluation source. — source: [[lint]] — flagged: 2026-06-19
- [ ] **open-question** — It is unspecified who assigns paragraph tier labels at ingestion and whether the process is automated. — source: [[lint]] — flagged: 2026-06-19
- [ ] **open-question** — The underlying vector store, embedding model, and RAG framework remain partly unspecified. — source: [[lint]] — flagged: 2026-06-19
- [ ] **open-question** — Whether the UI is a thesis deliverable or convenience layer needs a scope ruling. — source: [[lint]] / [[mockup-artifact-2026-06-12]] — flagged: 2026-06-19
- [ ] **open-question** — Whether specific model versions (`claude-opus-4-8`, `claude-haiku-4-5`, `claude-sonnet-4-6`) are the production wiki-engine models or only the evaluation harness models is unspecified. — source: [[evaluation-runplan-2026-06-19]] — flagged: 2026-06-19
- [ ] **open-question** — "Westerwoude" appears as a cross-project exclusion in the corpus hygiene filter. Identity (real KickstartAI project / Bakkie alias / third entity) is unresolved. — source: [[evaluation-runplan-2026-06-19]] — flagged: 2026-06-19
- [ ] **open-question** — Judge validation (hand-rating ~20–30 evaluation items vs LLM judge; Sanne's requirement) status is unknown. — source: [[evaluation-runplan-2026-06-19]] — flagged: 2026-06-19
- [ ] **open-question** — Obsidian graph integration: production feature or demo-only? Implementation details unspecified. — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **open-question** — Cross-session learning: dedicated UI flow or general wiki capability? — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **open-question** — Identity of the "another engineer" who will work with Sanne on the internal KickstartAI project using this wiki as a starting point. — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **open-question** — Post-defence Bakkie demo (Thursday evening post-22.06): did it happen and what was shown? — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **open-question** — Friday 2026-06-20 final integration demo outcome: not yet documented. — source: [[team-meeting-2026-06-18]] — flagged: 2026-06-19
- [ ] **methodology-reconciliation** — Cara's earlier claim that her component 'already delivers a final product' vs. the CRISP-DM mock-up-to-MVP progression needs reconciliation in the thesis framing (Gap Detector now built). — source: [[lint]] / [[mockup-artifact-2026-06-12]] — flagged: 2026-06-19
- [ ] **missing-concept-page** — A concept or entity page for 'Westerwoude' should be explicitly blocked in _gaps.md with a 'do not create until identity confirmed' instruction, as the current open-question entry lacks this guardrail. — source: [[lint]] — flagged: 2026-06-22
- [ ] **undocumented-decision** — The 'one wiki page = one project' information-architecture decision made at the 2026-05-14 meeting has no decision page recording why this granularity was chosen over alternatives such as per-topic or per-partner wikis. — source: [[lint]] — flagged: 2026-06-22
