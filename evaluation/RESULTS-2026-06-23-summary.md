# Headline experiment — results summary (2026-06-23)

**Run:** `python evaluation/run_eval.py --project uva` · 30 questions × C0/C1/C1r/C2 · 120 records.
**Raw data (archived, won't be overwritten by re-runs):** `results-2026-06-23-uva.json`
(live copy `results.json` is overwritten each run).
**Answer model:** claude-sonnet-4-6 · **Judge:** claude-opus-4-8 · **Retrieval:** sonnet-4-6 @ temp 0.

## Correctness (primary), by question type

| Condition | T1 fact | T2 synthesis | T3 trap | **All** | Tokens fed |
|---|---|---|---|---|---|
| C0 closed-book | 0.07 | 0.05 | 1.00 | 0.37 | 80 |
| C1 raw-dump | **0.81** | **0.74** | 1.00 | **0.85** | 38,500 |
| C1r raw+retrieval | 0.69 | 0.49 | 1.00 | 0.73 | 4,460 |
| **C2 wiki+retrieval** | 0.65 | **0.59** | 0.98 | 0.74 | 10,550 |

Other means: faithfulness ≈ 0.98–0.99 (C1/C1r/C2); answer_relevancy ≈ 0.92–0.95;
contextual_recall 0.64 (C1r) / 0.66 (C2). T3 abstention: C0/C1/C1r = 10/10, C2 = 9/10.

## Interpretation (honest)

- **H1 (C2 > C1r) — not supported in aggregate (0.74 vs 0.73 tie), but supported on
  synthesis:** C2 beats C1r on T2 (0.59 vs 0.49) — where cross-referencing should help —
  while C1r edges C2 on single facts (T1). They wash out overall. *The wiki helps
  specifically on multi-source synthesis.*
- **C1 (dump everything) is the accuracy ceiling (0.85)** — but only because this corpus
  is small enough to fit (38.5k tokens). This is the key caveat.
- **H2 (cost) — supported vs C1, caveated:** C2 gets ~87% of C1's correctness at ~27% of
  the tokens. But C1r is cheaper still (4.5k) at the same overall correctness. **The
  wiki's scaling advantage is NOT visible at one corpus size** — need the scaling curve
  (re-run at 5/15/30 sources, plot tokens vs corpus size). This run is a single point.
- **C2's one T3 "miss" (T3-3) is a measurement artifact, not a hallucination:** C2 *did*
  decline ("no paying customers documented **anywhere** in the provided material") but the
  deterministic checker matches the exact phrase "not documented **in** the provided
  material"; "anywhere" broke the substring match. Judge scored it 0.8. Effectively 10/10.
- **C0 sanity:** its 0.37 is entirely the T3 column (closed-book → can only decline);
  on real questions (T1/T2) ≈ 0.06. Floor behaves as expected.

## Open follow-ups (when you come back)

1. **Broaden the abstention check and recount** — phrase-match is too strict (see T3-3).
   Doable from saved answers, no new API calls.
2. **Scaling curve for H2** — the strongest argument for the wiki; not in this run.
3. **Write-up angle:** lead with the per-type result (wiki helps on synthesis) + the
   cost/correctness frontier; be upfront that at small corpus size the full dump is the
   accuracy ceiling.
4. **Judge validation (Sanne's requirement):** hand-rate ~20–30 items vs the judge's
   correctness scores; report agreement (Spearman/κ).
5. Optional qualitative examples for the thesis: a T2 where C2 beats C1r; the T3-3 phrasing case.
