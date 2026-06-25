# 6 Evaluation

> **Draft scope.** This section covers (i) a literature review grounding the choice
> of evaluation metrics and (ii) the design choices for the experiment.
> Quantitative results, the judge-validation outcome, and the feedback-driven
> artifact updates are deferred to later subsections. Spelling matches the thesis
> body ("artifact"; "rigor/relevance/design cycle"). New citations not yet in the
> bibliography are listed under *References to add*.

The artifact is evaluated against the claim that motivates it. As established in the
introduction and Section 2.5, the Living Project Wiki departs from the conventional
pattern in which an LLM reads raw documents from scratch on every query; instead it
compiles knowledge once into a persistent wiki and keeps it updated, so that
understanding accumulates rather than being rediscovered on each question. The
central empirical question of this evaluation is therefore whether **answering from
the compiled wiki is more accurate, more trustworthy, and cheaper at scale than
answering from the raw sources** — the downstream test of the ingestion-and-generation
pipeline that is this thesis's contribution. This maps onto the design-science cycles
of Section 2.1: the **rigor cycle** grounds the metric choice in the literature
(Section 6.1); the **design cycle** produced the artifact and the experimental
instrument (Section 6.2); and the **relevance cycle** tests usefulness and
effectiveness, operationalised through the CRISP-DM dimensions of **accuracy** and
**usefulness** (Section 2.2).

## 6.1 Literature review: evaluation metrics for LLM-based knowledge systems

Evaluating an LLM-based knowledge system that answers questions over a project corpus
is not a settled measurement problem, and the choice of metrics is itself a design
decision that must be justified against the literature. The system produces free-form
natural-language answers for which there is rarely a single canonical wording; it
draws on supplied context that varies in quality across conditions; and — most
importantly for a knowledge tool — it can fail in two very different ways: by being
wrong, or by being *confidently* wrong about something the corpus never contained. A
defensible evaluation must therefore measure at least four properties: whether an
answer is factually **correct**, whether it is **grounded** in the material the model
was given, whether **retrieval** supplied what the answer needed, and whether the
system **abstains** rather than fabricating when the answer is absent. The remainder
of this section works through the literature on each and arrives at the metric set
adopted.

Because the system's answers are free-form and rarely match a reference word-for-word
— a correct answer to "who is the thesis supervisor?" may share almost no wording with
the reference, while a fluent but wrong one may share a great deal — the evaluation
relies on **model-based judging**, in which a capable LLM scores an answer against an
explicit rubric. What matters is whether the answer *states the right decision,
person, date, or reason*, a semantic judgement an LLM can make.

The strongest current instantiation of model-based judging is **G-Eval** (Liu et al.,
2023), which evaluates generated text with a capable LLM guided by a chain-of-thought
rubric: a task description is expanded into a sequence of evaluation steps, and the
judge fills in a score against those steps. G-Eval's central empirical result is that
this procedure correlates with human judgement substantially better than overlap-based
metrics, because the judge reasons about meaning rather than matching surface form. It
is attractive for this evaluation on three grounds: the rubric is explicit and
auditable rather than an opaque single number; it yields a continuous score suitable
for comparing conditions; and it generalises to custom criteria simply by rewriting
the steps. The primary metric, **Correctness**, is accordingly built as a custom
G-Eval metric whose rubric gives the judge the question, the system's answer, and an
independent human-written reference, and instructs it to score high only when the
answer states the same key facts as the reference, to penalise answers that
contradict it or invent facts not in it, and to treat a decline-to-answer as correct
when the reference marks the question unanswerable. Anchoring the rubric to an
independent reference is what makes Correctness a measure of *truth* rather than of
*fluency*, and the penalty for invented facts makes it sensitive to the failure mode
that matters most for a knowledge tool — confident hallucination (Ji et al., 2023).

Correctness alone, however, does not reveal *why* an answer is right or wrong, and the
system under test is fundamentally retrieval-grounded. Although the artifact is not a
conventional RAG system — it extends RAG with a persistent, compiled knowledge layer
(Section 2.5) — its query path still selects relevant material and conditions an
answer on it, which is exactly the problem the RAG-evaluation literature targets. The
**RAGAS** framework (Es et al., 2024) decomposes the quality of a retrieval-grounded
answer into **faithfulness**, **answer relevancy**, and **contextual recall**, each
computed by an LLM judge without gold labels. These definitions are stated over a
(question, answer, context, reference) tuple and assume nothing about the architecture
that produced the context, so they transfer *by analogy* to the compiled wiki's query
path. They are adopted as diagnostics: faithfulness asks whether the answer is
grounded in its context with no unsupported claims, answer relevancy whether the
answer addresses the question rather than drifting or padding, and contextual recall
whether retrieval actually fetched what the reference answer needed (reported only for
the retrieval-based conditions, where it is informative).

The distinction between faithfulness and correctness deserves emphasis, because
conflating the two is a common error and they diverge exactly where it matters for
this system. Faithfulness measures fidelity to *the context the model was given*;
correctness measures fidelity to *the truth*, fixed by an independent reference (Ji et
al., 2023; Es et al., 2024). An answer can be perfectly faithful to a wiki page that
is itself mistaken, and a closed-book answer can be correct with no context to be
faithful to. Since the experiment's conditions differ precisely in what context they
supply, faithfulness is condition-relative and cannot be the cross-condition outcome.
Correctness — corresponding to the **accuracy** dimension of the CRISP-DM evaluation
phase (Section 2.2) — is therefore taken as the primary metric, with faithfulness
retained as a secondary diagnostic that locates where an error originates.

The fourth property, abstention, follows directly from the motivation of the whole
artifact. The hallucination problem that makes blind prompting unreliable (Section
2.4; Ji et al., 2023) means a knowledge tool must be trusted to decline what it cannot
support, not only to answer what it can. The calibration literature frames this as
*knowing what you don't know* (Kadavath et al., 2022), and reading-comprehension
benchmarks operationalise it with deliberately **unanswerable questions** that reward
abstention and penalise confident fabrication (Rajpurkar et al., 2018). The evaluation
adopts this by including questions whose answers are absent from the corpus, where the
correct behaviour is an explicit refusal; abstention is measured deterministically (a
fixed-phrase check rather than an LLM call), so this metric is free of judge bias.

Finally, the decision to use an LLM as the judge is itself a methodological commitment
the literature both supports and qualifies. LLM judges agree with human preference at
rates comparable to human–human agreement on large benchmarks (Zheng et al., 2023),
which is what makes them usable at the scale this evaluation requires. The same work,
however, documents biases the design must neutralise: **self-preference bias**, where
a judge favours text from its own model family (Zheng et al., 2023; Panickssery et
al., 2024); **position and verbosity bias**, where longer or more confident answers
are favoured independently of correctness; and **imperfect reliability**, which means
a judge's scores should be validated against human ratings before they are trusted as
evidence. These are not reasons to abandon LLM judging but constraints on how it is
applied — and they motivate three choices carried into the experimental design
(Section 6.2): a **cross-model judge**, a **reference-anchored** correctness rubric,
and a planned **judge-validation** step.

**Summary of the adopted metric set.** The review yields a lean set in which a single
reference-grounded G-Eval metric, Correctness, carries the primary claim, supported by
three RAGAS-style diagnostics and a deterministic abstention check. Correctness and
faithfulness are kept conceptually distinct (truth versus groundedness); all
LLM-judged metrics run through a cross-model Claude Opus judge to limit self-preference
bias, while abstention is judged deterministically.

| Metric | Measures | Basis | Role | CRISP-DM dimension |
|---|---|---|---|---|
| **Correctness** | Answer matches the human reference's key facts | Custom **G-Eval** (Liu et al., 2023) | **Primary** | Accuracy |
| **Faithfulness** | Answer grounded in the provided context | RAGAS (Es et al., 2024) | Diagnostic | Accuracy |
| **Answer relevancy** | Answer addresses the question | RAGAS (Es et al., 2024) | Diagnostic | Usefulness |
| **Contextual recall** | Context contained what the answer needed | RAGAS (Es et al., 2024) | Diagnostic (retrieval) | Accuracy |
| **Abstention** | System declines when the answer is absent | Deterministic check | Behavioural | Usefulness/reliability |

## 6.2 Experimental design

### 6.2.1 The central comparison

The experiment isolates the value of the compiled knowledge layer by holding the
answer model, the system prompt, and the question constant and **varying only the
context** supplied to the model. Four conditions are defined:

| ID | Context supplied | Represents |
|---|---|---|
| **C0** | none | closed-book floor — the hallucination baseline |
| **C1** | all raw sources concatenated | the conventional pattern: "read the raw documents on every query" (Section 2.5) |
| **C1r** | top-*k* retrieved **raw source chunks** | raw sources with retrieval |
| **C2** | top-*k* retrieved **wiki pages** | the artifact: the compiled wiki with retrieval |

C1 is precisely the conventional approach the thesis argues against (Section 2.5), and
C2 is the wiki pattern; the comparison between them is the empirical form of the
thesis's central claim.

### 6.2.2 What each contrast isolates

A naïve C2-vs-C1 comparison would confound two effects — *retrieval helps* and *the
wiki helps* — because C2 both retrieves and is compiled, while C1 does neither. The
design therefore separates them:

- **C1r vs C2 — the headline contrast.** Both retrieve top-*k* items with the same
  mechanism; the only difference is *raw source chunk* versus *compiled wiki page*.
  This holds retrieval constant and isolates the contribution of the compiled
  knowledge layer.
- **C1 vs C1r — the effect of retrieval alone.** Same raw material, with versus
  without retrieval.
- **C0 — the floor.** How much the model fabricates with no grounding at all.

Both retrieval conditions select context with the same deterministic (temperature-0)
procedure, so retrieval is genuinely constant across C1r and C2.

### 6.2.3 Hypotheses

- **H1 (quality).** C2 achieves higher correctness than C1r — retrieval held
  constant, so the gain is attributable to the compiled wiki — and abstains correctly
  more often than the raw conditions on unanswerable questions.
- **H2 (cost / scaling).** C2 answers from far fewer tokens than C1, and the raw-dump
  cost (C1) grows with corpus size while the retrieval conditions stay bounded — so
  the wiki's advantage widens as a project accumulates material.

### 6.2.4 Question set and reference answers

The ground truth is a set of **30 questions** with **human-written reference answers**,
in three classes of ten:

- **T1 — single-fact** (e.g. the project's thesis supervisor): one retrievable fact;
  tests basic accuracy.
- **T2 — synthesis** (e.g. the owner of each sub-deliverable): requires combining
  facts spread across several sources; tests the cross-referencing the compiled wiki
  is designed to add.
- **T3 — unanswerable / trap** (e.g. an annual marketing budget the corpus never
  states): the correct response is to decline, making hallucination measurable.

Because correctness is scored against these references, their **provenance** is a
fairness requirement: they were written from the source documents, independently,
**before any system output was seen** — never derived from the wiki, which would
tautologically favour C2.

### 6.2.5 Fairness invariant

The comparison is only honest if the wiki (C2) is the compiled form of exactly the
sources the raw conditions read — the same knowledge, raw versus compiled. Three
measures enforce this: (i) a Markdown-only corpus, so C1/C1r read precisely the files
the wiki was ingested from; (ii) a fresh full ingest into an empty project subtree,
giving clean provenance and the per-ingest build-cost figures used for the cost
analysis; and (iii) a corpus-hygiene filter that excludes content which would break
the invariant — cross-project material, raw dumps misplaced inside the wiki tree, and
saved query answers (prior LLM responses to near-identical questions, which would
circularly inflate C2). The fresh ingest also means the experiment exercises the
ingestion-and-generation pipeline — this thesis's contribution — end to end.

### 6.2.6 Judge model and reproducibility

Following the argument in Section 6.1, the answer model and the judge are
**deliberately different**: answers are generated by Claude Sonnet, and each answer is
judged by a different, stronger model, Claude Opus, to mitigate self-preference bias.
Retrieval selection runs at temperature 0 for determinism, and the run records, per
question and condition, the answer, the retrieved items, every metric score with the
judge's stated reason, token counts, and latency — so any score is auditable back to
the text that produced it. A post-hoc **judge-validation** step (hand-rating a sample
and reporting human–judge agreement) is planned to substantiate the LLM-as-judge
design; its outcome is reported with the results.

---

## References to add

Already in the thesis bibliography and reused above: Hevner (2007), Simon (1996), Ji
et al. (2023), Gao et al. (2023), Lewis et al. (2020), Brown et al. (2020). The
following are **new** and need adding; verify each against your reference manager.

- Liu, Iter, Xu, Wang, Xu & Zhu (2023). *G-Eval: NLG Evaluation using GPT-4 with
  Better Human Alignment.* EMNLP.
- Es, James, Espinosa-Anke & Schockaert (2024). *RAGAS: Automated Evaluation of
  Retrieval Augmented Generation.* EACL (demo).
- Zheng et al. (2023). *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena.*
  NeurIPS Datasets & Benchmarks.
- Panickssery, Bowman & Feng (2024). *LLM Evaluators Recognize and Favor Their Own
  Generations.* NeurIPS. 〔verify author list/venue〕
- Kadavath et al. (2022). *Language Models (Mostly) Know What They Know.* arXiv.
- Rajpurkar, Jia & Liang (2018). *Know What You Don't Know: Unanswerable Questions for
  SQuAD.* ACL.
