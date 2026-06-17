"""
judge.py — a Claude-backed DeepEval judge.

DeepEval defaults to an OpenAI judge; we only have an Anthropic key, so all
G-Eval / RAG metrics run through this wrapper. We deliberately use a *different*
model than the one that answers/ingests (Sonnet here vs Opus for answers) to
reduce self-preference bias — see the evaluation plan in wiki/deliverables/wiki-engine.md.
"""
import json
import os
import re

from anthropic import Anthropic
from deepeval.models import DeepEvalBaseLLM

JUDGE_MODEL = "claude-sonnet-4-6"


class ClaudeJudge(DeepEvalBaseLLM):
    def __init__(self, model: str = JUDGE_MODEL):
        self.model = model
        self._client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    def load_model(self):
        return self._client

    def get_model_name(self) -> str:
        return self.model

    def _call(self, prompt: str, max_tokens: int = 4000) -> str:
        msg = self._client.messages.create(
            model=self.model,
            max_tokens=max_tokens,
            messages=[{"role": "user", "content": prompt}],
        )
        return next((b.text for b in msg.content if b.type == "text"), "")

    def generate(self, prompt: str, schema=None):
        """Return a string, or a populated pydantic `schema` if DeepEval asks for
        structured output (newer metrics do)."""
        text = self._call(prompt)
        if schema is None:
            return text
        # Coerce the model's reply into the requested pydantic schema. Robust to
        # code fences and to trailing prose after the JSON ("Extra data").
        raw = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip())
        try:
            return schema.model_validate_json(raw)
        except Exception:
            start = raw.find("{")
            if start == -1:
                raise
            obj, _ = json.JSONDecoder().raw_decode(raw[start:])  # first object; ignore trailing
            return schema.model_validate(obj)

    async def a_generate(self, prompt: str, schema=None):
        return self.generate(prompt, schema)