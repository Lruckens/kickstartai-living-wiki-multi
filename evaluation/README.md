# Evaluation — Knowledge Pipeline (Ingestion + Wiki Engine)

Headline experiment from the plan in [`wiki/deliverables/wiki-engine.md`](../wiki/deliverables/wiki-engine.md):
**does answering from the compiled wiki beat constantly feeding the LLM raw context?**

## Conditions (same model + prompt; only the context differs)
- **C0** closed-book — no context (hallucination floor)
- **C1** raw context — all raw `sources/` documents (the "give context each time" baseline)
- **C2** wiki-grounded — **index → top-k page retrieval** (the artifact; bounded context, what makes the wiki scale)

Smoke test on one question: C2-retrieval used **~14k** input tokens vs **~44k** for raw-context
C1 — retrieval keeps the wiki's context bounded as the corpus grows (H2). (A whole-wiki-dump
condition was tried but dropped — ~87k tokens, too token-heavy and lowest relevancy.)

## Metrics (lean set)
RAG backbone (DeepEval / RAGAS): **Faithfulness** (grounded / no hallucination — needs a
context, so C1/C2/C2full) and **Answer Relevancy**. Plus **Contextual Recall** as a **C2-only**
retrieval diagnostic (did index-retrieval fetch the right page; trivially ~1.0 for the
dump conditions, so not run there). Core G-Eval: **Correctness** vs the human gold answer
(all conditions — the truth metric that catches confident hallucination, incl. C0). On T3
(unanswerable) questions we also record **abstention** (did it correctly decline?).
The judge is **Claude Sonnet** (≠ the answer model, Opus) to reduce self-preference bias.

## Run
```bash
pip install -r evaluation/requirements.txt
python evaluation/run_eval.py --limit 1                 # smoke test (flat repo)
python evaluation/run_eval.py --project uva             # multi-app: sources/uva/ + wiki/uva/
python evaluation/run_eval.py --project bakkie          # the other project
```
`ANTHROPIC_API_KEY` is read from `../.env`. `--project` scopes to the per-project subtree
(the multi-project app); omit it for a flat single-project repo.

**Cost / "fed once":** C1's artifact context is identical every question, so it's sent with
**Anthropic prompt caching** — processed once, then reused at ~10% cost for the rest of the
run (`cache_read` in the output). For the **H2 token comparison** we report `tokens_fed`
(the true context size, ~44k for C1 vs ~14k for C2-retrieval) — caching lowers the *bill*,
not the context size.

**Scaling (H2):** re-run at points *during* ingestion (e.g. after 5, 15, 30 artifacts) and
plot `avg_tokens_fed` per condition vs corpus size — C1 grows with the corpus while
C2-retrieval stays bounded.

## Files
- `questions.json` — the question set (T1 single-fact · T2 synthesis · T3 unanswerable),
  each with a human reference answer + gold pages. **Expand this to ~30 (≈10 per type)** — it is the
  ground truth the whole experiment rests on.
- `pipelines.py` — C0/C1/C2 answer generators (+ token/latency telemetry).
- `metrics.py` — the metric definitions.
- `judge.py` — the Claude DeepEval judge wrapper.
- `run_eval.py` — runner → `results.json` + a per-condition summary.

## Reading the results
H1 (quality): C2 should beat C1 on **Faithfulness + Correctness**, and abstain correctly more
often on T3. H2 (cost/scaling): C1's `avg_tok_in` should be much larger than C2's (retrieval)
and grows with the corpus. Validate the **Correctness** judge against your own ratings on a
small sample before trusting it (see the plan's validity section).