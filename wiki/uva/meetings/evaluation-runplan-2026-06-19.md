# Artifact: Evaluation Run Plan — Wiki vs. Raw-Context Experiment (2026-06-19)

**Last updated:** 2026-06-19
**Date:** 2026-06-19 (run date; document authored 2026-06-18)
**Owner:** Laurenz
**Type:** Evaluation experiment runbook / operational plan
**Status:** ingested (resolves the `evaluation/RUN-PLAN.md not ingested` gap from [[_gaps]])

## Summary
The formal evaluation runbook for **Strand A** (the headline experiment) of the Living Wiki thesis evaluation — a controlled comparison of answering quality and token cost across four context conditions: **C0** (no context), **C1** (all raw `.md` sources), **C1r** (retrieved raw chunks), and **C2** (retrieved wiki pages). The experiment runs against the clean-slate `uva` project subtree of the **multi-project app** (see [[multi-project-app-2026-06-17]]) and is the practical realization of the evaluation plan first sketched at [[team-meeting-2026-06-15]] and grounded in the architecture of [[wiki-generation-engine]].

Source: `2026-06-18-Laurenz-evaluation-plan.md` (the `evaluation/RUN-PLAN.md` file flagged as missing since [[multi-project-app-2026-06-17]]).

---

## The Claim

Answering from the **compiled wiki** beats feeding the LLM **raw source context** every time — more correct, less hallucination, fewer tokens, and it scales as the corpus grows.

- **H1 (quality):** C2 > C1r on correctness (retrieval held constant → the *wiki* itself helps), and C2 abstains correctly more often on unanswerable questions than C1.
- **H2 (cost/efficiency):** C2 answers with far fewer tokens than C1; raw-dump cost grows with corpus size while retrieval stays bounded.

---

## Conditions

All conditions use the same **answer model** (`claude-opus-4-8`) and the same prompt; only the context differs.

| ID | Context | Represents |
|---|---|---|
| **C0** | none | closed-book floor (hallucination baseline) |
| **C1** | all raw `.md` sources dumped in | "feed it everything every time" |
| **C1r** | top-k retrieved **raw chunks** | raw source + retrieval |
| **C2** | top-k retrieved **wiki pages** | the artifact (compiled wiki) |

**Key isolation:** C1r vs C2 holds retrieval constant and varies only whether the context is raw source chunks or compiled wiki pages. This cleanly isolates the value of the persistent compiled knowledge layer. C1 vs C1r shows what retrieval alone buys on top of a raw dump.

**Retrieval model:** `claude-haiku-4-5` (cheap catalog scan → top-k items loaded). Only the top-k items are loaded per query; the full corpus is not re-read on every call.

⚠️ These model identifiers (`claude-opus-4-8`, `claude-haiku-4-5`) are **evaluation harness models** — first occurrence in the wiki. Whether they match the production wiki-engine model is unspecified. See [[_gaps]].

---

## Question Set (`questions.json`)

**30 questions**, each with a **human reference answer** (written from the `.md` sources):
- **T1 — single-fact** ×10
- **T2 — synthesis** ×10
- **T3 — unanswerable/trap** ×10 (correct behaviour = decline/abstain, not fabricate)

`gold_pages` hints are included in `questions.json` as navigation aids only — they are **not used in scoring**. Correctness is judged against the human reference answer.

⚠️ `questions.json` and `reference-answers-worksheet.md` (the worksheet for writing human reference answers) are referenced but **not ingested** — see [[_gaps]].

---

## Metrics (`metrics.py`)

**Judge model:** `claude-sonnet-4-6` — **deliberately different from the answer model** (`claude-opus-4-8`). This addresses Sanne's same-model audit blind-spot concern (raised for the [[permission-layer]] evaluation) and makes LLM-as-Judge defensible. See [[evaluation-framework]].

| Metric | Role | Conditions |
|---|---|---|
| **Correctness** vs human reference | **PRIMARY outcome** | all |
| **Faithfulness** (grounding in given context) | secondary diagnostic | all |
| **Answer relevancy** | secondary | all |
| **Contextual recall** | secondary | C1r, C2 only |
| **Abstention** (correct = decline on T3) | deterministic | T3 |

⚠️ `metrics.py` and `pipelines.py` are referenced but **not ingested** — see [[_gaps]].

---

## Fairness Invariant

> The wiki (C2) must be the **compiled form of exactly the sources** that C1/C1r read. Same knowledge, raw vs compiled — nothing more, nothing less.

**Locked decisions that satisfy it:**
- **`.md`-only sources.** `/sources/uva/` holds only `.md` files → C1/C1r read those files, and the wiki is ingested from those same files. No `.pptx`/`.docx` mismatch; no extra code or content. *(Note: the [[ingestion-pipeline]] supports PDFs and other formats; the `.md`-only constraint is a deliberate fairness scoping choice for this experiment, not a pipeline limitation.)*
- **Fresh full ingest** into the empty UvA project subtree of the multi-project app — gives clean, known-provenance ingestion **and** fills `token_usage.md` with per-ingest build cost for the H2 / break-even analysis.
- **`gold_pages` hints** in `questions.json` are not used in scoring — a fresh ingest may name pages differently, and that's fine.
- **Corpus hygiene filter** (`pipelines.py`) excludes:
  - Cross-project sources (Westerwoude / Bakkie) — ⚠️ **"Westerwoude" appears here for the first time** in any ingested source; identity unresolved — see [[_gaps]]
  - Misplaced `wiki/sources/**` dumps
  - Saved `queries/**` (prior LLM answers to near-identical questions — would unfairly inflate C2 scores)

**Coverage check:** C1/C2 can only know what is in the `.md` source set. Reference answers must be derivable from those files. If a question's answer is not in any ingested `.md`, drop or swap the question. (Watch T1-9 and T2-1, which previously leaned on a `.pptx`.)

---

## Run Sequence (6 steps)

_All commands run in the **multi-project app** repo._

1. **Restart the backend** — ensures new token logging + prompt caching are live.
2. **Ingest all `.md` sources into the UvA project** (the subtree is empty at run start) → builds `/wiki/uva/` **and** fills `token_usage.md` (build cost; also H2 ingestion-scaling curve as corpus grows).
3. **Write the 30 human reference answers** from the `.md` sources using `reference-answers-worksheet.md`. Do **not** read the wiki pages first (they are the system output under test). Can be done in parallel with step 2.
4. **Confirm** `/sources/uva/` and `/wiki/uva/` cover the same source set (fairness invariant check).
5. **Smoke test** (optional): `python evaluation/run_eval.py --project uva --limit 1`.
6. **Full run:**
   ```bash
   python evaluation/run_eval.py --project uva     # 30 Qs × C0/C1/C1r/C2
   ```
   Sequential; a few hundred API calls; **~30–60 min**. Writes `results.json` and prints a per-condition summary. The runner refuses to start until every T1/T2 reference answer is filled.

---

## Reading the Results

- **C2 correctness > C1r correctness** → the wiki helps (retrieval held constant). ← headline H1
- **C1 vs C1r** → retrieval's separate effect (independent of compiled-wiki benefit).
- **C2 `tokens_fed` ≪ C1** → efficiency hypothesis H2.
- **C2 abstains on T3 more than C1** → less hallucination on unanswerable questions.
- **C0** = the floor (pure hallucination baseline).

---

## Post-Run Analysis

- **Judge validation (Sanne's requirement):** hand-rate ~20–30 items; compare ratings to the LLM judge's scores (e.g. Spearman / κ); report agreement. Makes LLM-as-Judge defensible for the thesis. ⚠️ Whether this has been done / who does it is not yet stated — see [[_gaps]].
- **Build cost / break-even:** `token_usage.md` total build cost ÷ per-query token saving (C1 − C2 per query) = **N\*** — *"the wiki pays for itself after ~N\* queries."* Provides an economic framing for the persistent compiled knowledge layer. See [[wiki-generation-engine]].
- **Qualitative examples:** 2–3 illustrative cases — a T2 synthesis question the wiki connects correctly but C1 misses; a T3 trap where C1 fabricates and C2 abstains correctly.

---

## Gotchas

- Run in the **multi-project app** with **`--project uva`**. Do not run flat in the original repo (that's the organically-grown wiki, not the fresh-from-`.md` evaluation corpus).
- Do not run `--project bakkie` for this experiment (different project; questions are UvA-specific).
- API budget confirmed sufficient (confirmed with the mentor); run is sequential — let it finish.
- `results.json` is overwritten on each run.

⚠️ `run_eval.py` and `results.json` are referenced but **not ingested** — see [[_gaps]].

---

## Related
- [[evaluation-deliverable]]
- [[evaluation-framework]]
- [[wiki-generation-engine]]
- [[multi-project-app-2026-06-17]]
- [[team-meeting-2026-06-15]]
- [[ingestion-pipeline]]
- [[decision-multi-project-app-structure]]
- [[permission-layer]]
- [[student-materials-corpus]]
- [[_gaps]]

## Sources
- 2026-06-18-Laurenz-evaluation-plan.md (evaluation run plan / `evaluation/RUN-PLAN.md`; authored 2026-06-18, run date 2026-06-19)
