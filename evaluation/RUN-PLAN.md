# Evaluation run plan — Wiki vs. raw-context (UvA)

**Owner:** Laurenz · **Run:** the day after 2026-06-18 · **Scope:** Strand A (headline experiment)
**Repo/layout:** the **multi-project app** — fresh `.md` ingest into the (currently empty)
**UvA** project, so the eval runs with **`--project uva`** (reads `/sources/uva/` + `/wiki/uva/`).

This is the practical runbook. The thesis-level plan lives in
[`../wiki/deliverables/wiki-engine.md`](../wiki/deliverables/wiki-engine.md); the harness
docs are in [`README.md`](README.md).

---

## The claim

Answering from the **compiled wiki** beats feeding the LLM **raw source context** every
time — more correct, less hallucination, fewer tokens, and it scales as the corpus grows.

- **H1 (quality):** C2 > C1r on correctness (retrieval held constant → the *wiki* helps),
  and abstains correctly more often on unanswerable questions.
- **H2 (cost):** C2 answers with far fewer tokens than C1, and raw-dump cost grows with the
  corpus while retrieval stays bounded.

---

## Conditions (same answer model `claude-sonnet-4-6`, same prompt; only context differs)

| ID | Context | Represents |
|---|---|---|
| **C0** | none | closed-book floor (hallucination baseline) |
| **C1** | all raw `.md` sources dumped in | "feed it everything every time" |
| **C1r** | top-k retrieved **raw chunks** | raw source + retrieval |
| **C2** | top-k retrieved **wiki pages** | the artifact (compiled wiki) |

Retrieval (C1r, C2) uses the same cheap model (`claude-haiku-4-5`) over a catalog → only
the top-k items load. **C1r vs C2 isolates compiled-wiki vs raw-source** (retrieval constant);
**C1 vs C1r** shows what retrieval alone buys.

## Question set ([`questions.json`](questions.json))

30 questions, each with a **human reference answer** (written from sources):
- **T1** single-fact ×10 · **T2** synthesis ×10 · **T3** unanswerable/trap ×10
  (correct behaviour on T3 = decline, not fabricate).

## Metrics ([`metrics.py`](metrics.py)) — judge = `claude-opus-4-8` (≠ answer model)

- **Correctness** vs the human reference — **PRIMARY outcome**.
- **Faithfulness** — secondary diagnostic (grounding in the given context; ≠ correctness).
- **Answer relevancy** · **Contextual recall** (C1r/C2 only) · **Abstention** (T3, deterministic).

---

## Fairness invariant (the rule that keeps the experiment honest)

> The wiki (C2) must be the **compiled form of exactly the sources** in `/sources` that
> C1/C1r read. Same knowledge, raw vs compiled.

**Locked decisions that satisfy it:**
- **`.md`-only sources.** `/sources/uva/` holds only `.md` files → C1/C1r read those, and the
  wiki is ingested from those same files. (No `.pptx`/`.docx` mismatch; no extra code.)
- **Fresh full ingest** into the empty UvA project of the multi app — gives clean provenance
  **and** the ingestion token numbers (`token_usage.md`) for the build-cost / break-even analysis.
- A fresh ingest may name pages differently from the `gold_pages` hints in `questions.json` —
  that's fine: `gold_pages` are only hints, not used in scoring; correctness is judged on the
  answer vs your human reference, and references come from the sources (version-independent).
- **Corpus hygiene filter** ([`pipelines.py`](pipelines.py)) excludes cross-project
  (Westerwoude/Bakkie), misplaced `wiki/sources/**` dumps, the stray page, and saved
  `queries/**` (prior LLM answers to near-identical questions → would unfairly inflate C2).

**Coverage check:** C1/C2 can only know what's in the `.md` set. When writing the reference
answers, if a question's answer isn't in any ingested `.md` → that fact isn't in the corpus →
drop/swap the question. Watch **T1-9** and **T2-1** (previously leaned on a `.pptx`).

---

## Tomorrow — run sequence

_All commands run in the **multi-project app** repo._

1. **Restart the backend** so the new token logging + prompt caching are live.
2. **Ingest all `.md` sources into the UvA project** (it's empty now) → builds `/wiki/uva/`
   *and* fills `token_usage.md` (= build cost; also the H2 ingestion-scaling curve as it grows).
3. **Write the 20 reference answers** from the `.md` sources, using
   [`reference-answers-worksheet.md`](reference-answers-worksheet.md). Do **not** read the
   wiki pages first (they're the system output we're testing). Put them in `questions.json`
   (or hand the worksheet back to transcribe). *(Can be done in parallel with step 2.)*
4. **Confirm** `/sources/uva/` and `/wiki/uva/` cover the same source set (fairness invariant).
5. **Smoke** (optional): `python evaluation/run_eval.py --project uva --limit 1`.
6. **Full run:**
   ```bash
   python evaluation/run_eval.py --project uva     # 30 Qs × C0/C1/C1r/C2
   ```
   Sequential, a few hundred API calls, **~30–60 min**. Writes `results.json` + prints a
   per-condition summary. (The runner refuses to start until every T1/T2 reference is filled.)

## Reading the result

- **C2 correctness > C1r correctness** → the wiki helps (retrieval held constant). ← headline
- **C1 vs C1r** → retrieval's separate effect.
- **C2 `tokens_fed` ≪ C1** → efficiency (H2).
- **C2 abstains on T3 more than C1** → less hallucination.
- **C0** = the floor.

## After the run

- **Judge validation (Sanne's requirement):** hand-rate ~20–30 items, compare to the judge's
  scores, report agreement (e.g. Spearman/κ). Makes LLM-as-judge defensible.
- **Build cost / break-even:** `token_usage.md` total build cost ÷ per-query token saving
  (C1 − C2) = N\*, "the wiki pays for itself after ~N\* queries"
  (see the break-even subsection in `wiki-engine.md`).
- **Analyse:** paired comparison across questions per metric; effect sizes; 2–3 qualitative
  examples (a T2 the wiki connects but C1 misses; a T3 where C1 fabricates and C2 abstains).

## Gotchas

- Run in the **multi app** with **`--project uva`** (that's where the fresh `.md` corpus is
  ingested). Don't run flat in the original repo — that's the organically-grown wiki, not the
  fresh-from-`.md` one.
- Don't run `--project bakkie` for this experiment (different project; questions are UvA).
- API budget is fine (confirmed with the mentor); the run is sequential so just let it finish.
- `results.json` is overwritten each run.
