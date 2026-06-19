# Deliverable: Evaluation Framework

**Last updated:** 2026-06-19
**Status:** scoped (basic framework = Must Have; comparative gen-vs-human eval = Could Have; the integrated framework is the collaborative/shared deliverable); **evaluation phase begun (2026-06-11); Sanne metric guidance (2026-06-12); candidate metric shortlist + experiment plan (2026-06-15)**

## Summary
A framework measuring coverage, freshness, accuracy, and usefulness of the wiki, incorporating human-in-the-loop feedback to improve generation quality over time. The Assignment 1a report frames it as the team’s **collaboratively designed and executed shared deliverable**. As of **2026-06-11** the team has begun the evaluation phase (Quinten leading metric selection); Sanne added concrete metric guidance on **2026-06-12**; by **2026-06-15** a concrete metric shortlist and a re-ingest-from-scratch + fake-project experiment plan exist.

## Details
See the concept page [[evaluation-framework]] for the four dimensions. The blog post draft from [[generator-module]] is to be evaluated against a human-written version to make the creativity/opinion angle measurable. Requires a human baseline document that does not yet exist — see [[_gaps]].

KickstartAI's existing public technical and domain blogs (see [[kickstartai-blog]]) are a *candidate* corpus for the required human-written baseline. This is a possibility only; no specific article has been selected or ingested as the baseline. See [[_gaps]].

### Candidate metric shortlist + experiment plan (2026-06-15)
The 2026-06-15 meeting (see [[team-meeting-2026-06-15]]) produced the **first concrete candidate metric shortlist** (still under research, not finalized/applied):
- **Self-BLEU** — generation **diversity** (BLEU between generated texts; lower = more diverse).
- **BERTScore** — semantic similarity via BERT token-embedding cosine similarities.
- **LLM-as-Judge** — **Coherence** (structure/flow), **Faithfulness** (groundedness in inputs; detects unsupported claims, unlike BERTScore), **Stakeholder-appropriateness** (tone/detail/framing for the audience).

**Evaluation methodology (2026-06-15):** test the final artifact by **re-ingesting all source documents from scratch** into an empty wiki, then **ingest a fake KickstartAI project** as a new-project use-case to test generalization. **Gap detector and permission layer are evaluated at component level**; the text-generation evaluation (Quinten + Laurenz) is designed at the **17.06** meeting. ⚠️ An **Anthropic API budget caution** shapes the experiment — source docs must be pre-parsed/converted to lighter formats (PDFs especially, since they are processed as text *and* image) to avoid exhausting the quota. See [[ingestion-pipeline]], [[_gaps]].

### Sanne's metric guidance (2026-06-12)
At the 2026-06-12 artifact review (see [[mockup-artifact-2026-06-12]]) Sanne noted that **systematic evaluation may be hard to implement** in this project, and advised the team to **find circa three metrics** in academic sources or online and **apply them** to see what comes out. This is a concrete refinement of the evaluation-metric-selection gap (alongside Quinten's metric-options list). See [[_gaps]].

She also gave **gap-detector-specific** evaluation feedback: importance/significance and confidence/reliability are conflated into one score and should be **separated**; **Precision/Recall/F1 detection thresholds** should be justified or empirically validated; the manually-defined scoring **weights and risk multipliers** need supporting rationale, testing, or expert judgment. See [[gap-detector]].

### Evaluation phase begins — two evaluation "families" (2026-06-11)
At the 2026-06-11 meeting (see [[team-meeting-2026-06-11]]) the team started operationalizing evaluation:
- **Quinten leads metric selection**, sharing a **list of options** to implement; he can already apply metrics since his generator module is integrated and functional.
- **Two evaluation "families"** reflect how the components differ: **Laurenz + Quinten** can use **comparable frameworks** (both generate text via LLMs), while **Cara + Xiaojing** use **different frameworks**. The 2026-06-15 note operationalizes this: the 17.06 framework meeting is for the text-generation evaluation; gap detector + permission layer are evaluated at component level. The specific metrics against the four dimensions are not yet chosen — see [[_gaps]].

### Candidate evaluation / test dataset (2026-05-18)
The delivered **student-materials corpus** (`llm-wiki-student-materials`; see [[student-materials-corpus]], [[laurenz-sanne-email-2026-05-15]]) is a strong candidate evaluation/ingestion-test dataset. Crucially, its **README** (deliberately **withheld from ingestion**) summarises what the tool is *supposed to discover on its own* — effectively a **known ground truth** against which coverage, accuracy, and gap-detection can be measured. See [[gap-detector]], [[_gaps]].

### Component-level evaluation example — permission layer (2026-06-07)
Xiaojing's permission-layer design (see [[permission-layer]], [[xiaojing-sanne-permission-email-2026-06-07]]) includes a concrete **component-level evaluation** — a **20-scenario leakage-detection experiment** (Set A pre-filtering off / Set B pre-filtering on; 5 vertical + 5 horizontal each), comparing **two audit-prompt versions** for the **detection-rate / false-positive-rate** tradeoff. Caveats flagged by Sanne: the eval is small (5/type → 20% per-miss swing — frame as an illustrative PoC), groundedness is an imperfect proxy for leakage, and the experiment used **gpt-5.1 as both generator and judge** (same-model blind spot). See [[_gaps]].

### MoSCoW prioritization (Assignment 1, 2026-04-22)
- **Must Have:** a **basic evaluation framework measuring accuracy + freshness**.
- **Could Have:** **comparative evaluation of generated vs. human-written content** (the blog-baseline comparison) and **human-in-the-loop feedback integration**.

So the human-baseline comparison is now framed as a **stretch (Could) goal** rather than a defined Must — a prioritization, not a removal. See [[assignment-1-presentation-2026-04-22]], [[_gaps]].

### Methodology grounding (DSR + CRISP-DM)
The report grounds evaluation in the **Design Science Research rigor cycle** (RAG architectures, knowledge-graph construction, LLM evaluation, document change detection literature) alongside the **CRISP-DM Evaluation phase** (coverage/freshness/accuracy/usefulness, potentially comparing with human-generated content). See [[assignment-1-report-2026-04-22]].

### Production approach — collaborative shared deliverable (Assignment 1a report, 2026-04-22)
The written report states **all four members collaboratively design and execute** the integrated evaluation framework, and **each member additionally contributes component-level evaluation results for their own sub-system** into their own thesis. This is treated (resolved-by-precedence) as the authoritative reading over the supervisor-kickoff’s framing of evaluation as the sole per-member-into-thesis track. See [[evaluation-framework]], [[user-journeys]], [[supervisor-kickoff-2026-04-16]].

## Related
- [[evaluation-framework]]
- [[generator-module]]
- [[gap-detector]]
- [[permission-layer]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[mockup-artifact-2026-06-12]]
- [[team-meeting-2026-06-11]]
- [[team-meeting-2026-06-15]]
- [[student-materials-corpus]]
- [[ingestion-pipeline]]
- [[kickstartai-blog]]
- [[supervisor-kickoff-2026-04-16]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- KickstartAI_News.md (https://kickstart.ai/news, created 2026-05-07)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
- 2026-06-07-Xiaojing-Sanne-email-content.md (Xiaojing ↔ Sanne permission-layer design review email thread, 2026-06-07 → 2026-06-08)
- 2026-06-11-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-12-mock-up-artifact.md (Living Wiki UI mock-up artifact description + Sanne feedback, development phase)
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
