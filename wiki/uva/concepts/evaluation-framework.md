# Concept: Evaluation Framework

**Last updated:** 2026-06-19

## Summary
Framework to measure wiki quality across four dimensions: coverage, freshness, accuracy, and usefulness, with human-in-the-loop feedback to improve generation over time. The kickoff meeting (2026-04-13) emphasized that this framework should **run throughout** the project. The Assignment 1a report confirms it as the team’s **collaboratively designed and executed shared deliverable**. As of **2026-06-11** the team has begun the evaluation phase (Quinten leading metric selection); by **2026-06-15** a concrete candidate metric shortlist exists and a new-project use-case experiment is planned.

## Details
Four dimensions (verbatim from the Assignment 1a report — see [[assignment-1-report-2026-04-22]]):
- **Coverage** — Are all important topics represented in the wiki?
- **Freshness** — Does the wiki reflect the most recent documents?
- **Accuracy** — Does it faithfully represent source material without hallucination?
- **Usefulness** — Do users find what they need?

Human feedback / evaluation logs collected during the project refine generation quality. The blog post draft (see [[generator-module]]) is specifically to be evaluated against a human-written version to make the creativity/opinion angle measurable.

### Candidate evaluation-metric shortlist (2026-06-15)
At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]) the team produced its **first concrete metric shortlist** — candidates under research, aligning with Sanne's "~3 metrics" advice (2026-06-12):
- **Self-BLEU** — measures **diversity** between generations by computing BLEU scores between generated texts rather than against references; **lower = more diverse**.
- **BERTScore** — BERT-embedding metric computing sentence similarity as a sum of cosine similarities between token embeddings; captures **semantic** (not n-gram) alignment.
- **LLM-as-Judge** — an LLM scores outputs on three sub-metrics:
  - **Coherence** — logical structure, flow, connected/organized ideas.
  - **Faithfulness** — groundedness of claims in the input documents; unlike BERTScore, **detects unsupported claims** (not just semantic alignment).
  - **Stakeholder-appropriateness** — tone/detail/framing suitable for the audience (LinkedIn draft = accessible public language; progress report = low jargon; onboarding summary = enough context for a newcomer).
The final selection, thresholds, and mapping to the four dimensions are still pending — see [[evaluation-deliverable]], [[_gaps]].

### Evaluation experiment & schedule (2026-06-15)
The artifact will be evaluated by **re-ingesting all source documents from scratch into an empty wiki**, then running an **experiment with a fake KickstartAI project** to test generalization to a new project. The **17.06 framework-design meeting** is for the **text-generation evaluation (Quinten + Laurenz)**; the **gap detector and permission layer are evaluated at component level** (their owners excluded from that meeting). An **Anthropic API budget caution** shapes the experiment — source docs must be pre-parsed/converted to a lighter format (PDFs especially) to avoid exhausting the quota. See [[team-meeting-2026-06-15]], [[ingestion-pipeline]], [[evaluation-deliverable]].

### Sanne's metric guidance (2026-06-12)
At the 2026-06-12 artifact review (see [[mockup-artifact-2026-06-12]]) Sanne noted that **systematic evaluation may be hard to implement** in this project, and advised the team to **find circa three metrics** in academic sources or online and **apply them** to see what comes out. This is a concrete refinement of the evaluation-metric-selection gap (alongside Quinten's metric-options list). See [[_gaps]].

She also gave **gap-detector-specific** evaluation feedback: importance/significance and confidence/reliability are conflated into one score and should be **separated**; **Precision/Recall/F1 detection thresholds** should be justified or empirically validated; the manually-defined scoring **weights and risk multipliers** need supporting rationale, testing, or expert judgment. See [[gap-detector]].

### Evaluation phase begins — two evaluation "families" (2026-06-11)
At the 2026-06-11 meeting (see [[team-meeting-2026-06-11]]) the team started operationalizing evaluation:
- **Quinten leads metric selection**, sharing a **list of options** to implement; he can already apply metrics since his generator module is integrated and functional.
- **Two evaluation "families"** reflect how the components differ: **Laurenz + Quinten** can use **comparable frameworks** (both generate text via LLMs), while **Cara + Xiaojing** use **different frameworks**. This corroborates the report's model in which **each member contributes component-level evaluation into their own thesis**. The specific metrics against the four dimensions are not yet chosen — see [[_gaps]].

### MoSCoW prioritization (Assignment 1, 2026-04-22)
A **basic framework (accuracy + freshness)** is a **Must Have**, while the fuller comparative (generated-vs-human) evaluation and HITL feedback are **Could Have** stretch goals. See [[evaluation-deliverable]], [[assignment-1-presentation-2026-04-22]].

### Kickoff guidance (2026-04-13)
- The **self-documentation** approach was chosen partly as an **intuitive evaluation method** (the team can judge whether the wiki accurately reflects its own project work).
- Sanne is to **check whether a knowledge base or additional/better evaluation criteria can be provided** — outcome pending (see [[_gaps]]).
- Sanne advised the students **not to rely solely on LLMs** for building the evaluation framework — it specifically requires their critical thinking.

### Production approach — collaborative shared deliverable (Assignment 1a report, 2026-04-22)
The written report states that **all four members collaboratively design and execute** an integrated evaluation framework assessing the system as a whole across the four dimensions, and that **each member additionally contributes component-level evaluation results for their own sub-system** (enabling both local and end-to-end assessment). This supersedes-by-precedence the supervisor-kickoff’s “each member a different method into their own thesis” framing of evaluation as the (sole) individual track — the report makes the *framework itself* the collaborative deliverable, with component-level results in each thesis. See [[evaluation-deliverable]], [[user-journeys]], [[supervisor-kickoff-2026-04-16]].

This concept is also tracked as a deliverable — see [[evaluation-deliverable]].

## Related
- [[evaluation-deliverable]]
- [[generator-module]]
- [[gap-detector]]
- [[team-meeting-2026-06-11]]
- [[team-meeting-2026-06-15]]
- [[mockup-artifact-2026-06-12]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-06-11-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
