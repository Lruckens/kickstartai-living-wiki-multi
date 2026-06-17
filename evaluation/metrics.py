"""
metrics.py — the lean metric set (see wiki/deliverables/wiki-engine.md).

RAG backbone (pre-built, citable — RAGAS/DeepEval):
  • Faithfulness        — answer grounded in the given context (no hallucination)
  • Answer Relevancy    — answer addresses the question
  • Contextual Recall   — did the context contain what the answer needed (vs gold)
Custom (G-Eval):
  • Specificity         — concrete, on-point detail vs vague (our headline claim)

All run through the Claude judge. Faithfulness/Contextual Recall need a context,
so they apply to C1/C2 only (C0 is closed-book → relevancy + specificity + the
deterministic correctness/abstention checks in run_eval.py).
"""
from deepeval.metrics import (
    AnswerRelevancyMetric,
    ContextualRecallMetric,
    FaithfulnessMetric,
    GEval,
)
from deepeval.test_case import LLMTestCaseParams

THRESHOLD = 0.5


def build_metrics(judge):
    correctness = GEval(
        name="Correctness",
        evaluation_steps=[
            "Compare the answer to the reference (expected) answer for the same question.",
            "Score high ONLY if the answer states the same key facts as the reference — the actual decision/value, people, dates, and reasons.",
            "Penalise answers that are wrong, contradict the reference, or invent facts not in the reference (confident fabrication scores low).",
            "When the reference says the question is unanswerable, the correct answer is to decline ('not documented in the provided material'); a confident fabricated answer is INCORRECT.",
        ],
        evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.EXPECTED_OUTPUT],
        model=judge, threshold=THRESHOLD,
    )
    return {
        "faithfulness": FaithfulnessMetric(threshold=THRESHOLD, model=judge, include_reason=True),       # needs context
        "contextual_recall": ContextualRecallMetric(threshold=THRESHOLD, model=judge, include_reason=True),  # C2 retrieval diagnostic
        "answer_relevancy": AnswerRelevancyMetric(threshold=THRESHOLD, model=judge, include_reason=True),
        "correctness": correctness,   # core G-Eval — the truth metric (catches confident hallucination)
    }


# Metrics per condition. Faithfulness needs a context (skip C0); Contextual Recall is
# only a meaningful signal for C2 (selective retrieval) — for the dump conditions
# C1/C2full it's trivially ~1.0, so we don't run it there.
CORE_FOR = {
    "C0": ["answer_relevancy", "correctness"],
    "C1": ["faithfulness", "answer_relevancy", "correctness"],
    "C2": ["faithfulness", "contextual_recall", "answer_relevancy", "correctness"],
}