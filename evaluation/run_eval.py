"""
run_eval.py — the headline experiment runner: Wiki vs. raw-context answering.

For each question, generate an answer under C0 (closed-book), C1 (raw context),
C2 (wiki-grounded), then score with the lean metric set. Writes results.json and
prints a per-condition summary (the C2-vs-C1 contrast + cost/scaling).

  python evaluation/run_eval.py                 # all questions, C0/C1/C2
  python evaluation/run_eval.py --limit 1        # smoke test (1 question)
  python evaluation/run_eval.py --conditions C1 C2

Needs ANTHROPIC_API_KEY in the environment (load it from ../.env first).
"""
import argparse
import json
import os
from pathlib import Path

from dotenv import load_dotenv

HERE = Path(__file__).resolve().parent
load_dotenv(dotenv_path=HERE.parent / ".env")

from deepeval.test_case import LLMTestCase           # noqa: E402

import pipelines                                      # noqa: E402
from judge import ClaudeJudge                         # noqa: E402
from metrics import CORE_FOR, build_metrics        # noqa: E402

ABSTAIN_PHRASE = "not documented in the provided material"


def score_answer(metric_names, metrics, tc) -> dict:
    out = {}
    for name in metric_names:
        m = metrics[name]
        try:
            m.measure(tc)
            out[name] = {"score": round(float(m.score), 3), "reason": getattr(m, "reason", None)}
        except Exception as e:  # noqa: BLE001 — keep going; record the failure
            out[name] = {"score": None, "reason": f"metric error: {e}"}
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="cap number of questions (0 = all)")
    ap.add_argument("--conditions", nargs="+", default=["C0", "C1", "C1r", "C2"])
    ap.add_argument("--project", default="", help="project subtree for the multi-app layout (e.g. uva); empty = flat repo")
    ap.add_argument("--out", default=str(HERE / "results.json"))
    args = ap.parse_args()

    questions = json.loads((HERE / "questions.json").read_text(encoding="utf-8"))
    if args.limit:
        questions = questions[: args.limit]

    judge = ClaudeJudge()
    metrics = build_metrics(judge)
    results = []

    for q in questions:
        print(f"\n● {q['id']} [{q['type']}] {q['question']}")
        for cond in args.conditions:
            gen = pipelines.answer(q["question"], cond, args.project)
            tc = LLMTestCase(
                input=q["question"],
                actual_output=gen["answer"],
                expected_output=q["reference_answer"],
                retrieval_context=[gen["context"]] if gen["context"] else None,
            )
            applicable = [m for m in CORE_FOR[cond]
                          if not (m in ("faithfulness", "contextual_recall") and not gen["context"])]
            scores = score_answer(applicable, metrics, tc)
            abstained = ABSTAIN_PHRASE in gen["answer"].lower()
            rec = {
                "id": q["id"], "type": q["type"], "condition": cond,
                "answer": gen["answer"],
                "retrieved_pages": gen.get("retrieved_pages"),
                "scores": scores,
                "abstained": abstained,
                "abstention_correct": (abstained if q["type"] == "T3" else None),
                "tokens_fed": gen["tokens_fed"],                 # full prompt size (H2 comparison)
                "input_tokens": gen["input_tokens"], "output_tokens": gen["output_tokens"],
                "cache_read_tokens": gen.get("cache_read_tokens", 0),
                "cache_creation_tokens": gen.get("cache_creation_tokens", 0),
                "latency_s": gen["latency_s"],
            }
            results.append(rec)
            sc = " ".join(f"{k}={v['score']}" for k, v in scores.items())
            print(f"   {cond}: {sc} | tokens_fed={gen['tokens_fed']} lat={gen['latency_s']}s"
                  + (f" | abstained={abstained}" if q["type"] == "T3" else ""))

    Path(args.out).write_text(json.dumps(results, indent=2), encoding="utf-8")
    summarise(results)
    print(f"\nWrote {args.out}")


def summarise(results: list[dict]) -> None:
    print("\n=== summary (mean per condition) ===")
    conds = sorted({r["condition"] for r in results})
    metric_names = ["faithfulness", "contextual_recall", "answer_relevancy", "correctness"]
    for cond in conds:
        rows = [r for r in results if r["condition"] == cond]
        line = [f"{cond}:"]
        for mn in metric_names:
            vals = [r["scores"][mn]["score"] for r in rows if mn in r["scores"] and r["scores"][mn]["score"] is not None]
            if vals:
                line.append(f"{mn}={sum(vals)/len(vals):.2f}")
        fed = [r.get("tokens_fed", r["input_tokens"]) for r in rows]
        cr = [r.get("cache_read_tokens", 0) for r in rows]
        lat = [r["latency_s"] for r in rows]
        if fed:
            line.append(f"avg_tokens_fed={sum(fed)//len(fed)}")   # H2: context size per query
            if sum(cr):
                line.append(f"avg_cache_read={sum(cr)//len(cr)}")  # billed-cheap reuse
            line.append(f"avg_lat={sum(lat)/len(lat):.1f}s")
        t3 = [r for r in rows if r["type"] == "T3"]
        if t3:
            ok = sum(1 for r in t3 if r["abstention_correct"])
            line.append(f"T3_abstained={ok}/{len(t3)}")
        print("  " + " ".join(line))


if __name__ == "__main__":
    main()