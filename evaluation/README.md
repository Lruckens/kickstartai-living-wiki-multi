# Evaluation — Knowledge Pipeline (Ingestion + Wiki Engine)

Headline experiment from the plan in [`wiki/deliverables/wiki-engine.md`](../wiki/deliverables/wiki-engine.md):
**does answering from the compiled wiki beat constantly feeding the LLM raw context?**

## Conditions (same model + prompt; only the context differs)
- **C0** closed-book — no context (hallucination floor)
- **C1** raw-dump — all raw `sources/` artifacts dumped (the "feed everything each time" baseline)
- **C1r** raw + retrieval — top-k retrieved *raw-document chunks* (same retrieval as C2, over raw text)
- **C2** wiki + retrieval — top-k retrieved *wiki pages* (the artifact)

**Why C1r exists (Sanne's point).** C2-vs-C1 conflates two effects — the wiki is *both*
compiled *and* retrieved over, while C1 dumps everything. So a cheaper/better C2 could just
mean "retrieval helps," not "the wiki helps." **C1r vs C2 holds retrieval constant** (both
retrieve top-k) so the only difference is *compiled wiki vs raw source* — that's the clean
test of the wiki's value. **C1 vs C1r** separately shows what retrieval alone buys.

## Metrics
- **Correctness vs the human reference — PRIMARY outcome.** This is "is the answer factually
  right." It's the metric the wiki claim rests on.
- **Faithfulness — SECONDARY diagnostic.** It measures grounding in the *provided context*,
  which differs per condition; an answer can be faithful to the wiki while the wiki is wrong,
  so faithfulness ≠ correctness. Use it to locate *where* errors come from, not as the outcome.
- **Answer Relevancy** (all conditions); **Contextual Recall** for the retrieval conditions
  (C1r/C2 — did retrieval fetch what the answer needed). **Abstention** recorded on T3.
- Judge = **Claude Sonnet** (≠ the answer model, Opus) to reduce self-preference bias.

## Reference answers (provenance matters — Sanne's point)
Correctness vs reference is the main metric, so the references must be **written from the
underlying sources, independently, and before seeing any system output** — NOT derived from
the wiki (that would unfairly favour C2). The seed answers in `questions.json` are provisional
and should be re-grounded in the sources before the real run.

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
C1r/C2 retrieval stay bounded.

## Reading the results
The **headline claim** is **C1r vs C2 on Correctness** (retrieval held constant → isolates the
wiki). **C1 vs C1r** shows what retrieval alone buys. C0 is the hallucination floor.
Faithfulness is read as a *diagnostic* alongside Correctness, not as the outcome.

> The 1-question numbers in this repo's history are **only a smoke test that the harness runs
> end-to-end** — not a directional finding. The **~30-question run is the result.** (API budget
> for that confirmed OK with the mentor.)

## Files
- `questions.json` — the question set (T1 single-fact · T2 synthesis · T3 unanswerable),
  each with a human reference answer + gold pages. **Expand this to ~30 (≈10 per type)** — it is the
  ground truth the whole experiment rests on (write the answers from sources, before seeing outputs).
- `pipelines.py` — C0/C1/C1r/C2 answer generators (+ token/latency telemetry).
- `metrics.py` — the metric definitions.
- `judge.py` — the Claude DeepEval judge wrapper.
- `run_eval.py` — runner → `results.json` + a per-condition summary.

## Reading the results
H1 (quality): C2 should beat C1 on **Faithfulness + Correctness**, and abstain correctly more
often on T3. H2 (cost/scaling): C1's `avg_tok_in` should be much larger than C2's (retrieval)
and grows with the corpus. Validate the **Correctness** judge against your own ratings on a
small sample before trusting it (see the plan's validity section).