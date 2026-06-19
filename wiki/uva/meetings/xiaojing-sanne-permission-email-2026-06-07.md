# Correspondence: Xiaojing ↔ Sanne Permission-Layer Design Review (2026-06-07 → 2026-06-08)

**Last updated:** 2026-06-19
**Date:** 2026-06-07 → 2026-06-08
**Type:** Stakeholder correspondence / technical design review email thread (UvA student ↔ KickstartAI main contact)
**Status:** ingested

## Summary
A three-message email thread between **Xiaojing Li** (lee89953@gmail.com) and **Sanne Wielinga** (KickstartAI main contact), in which Xiaojing shares a **detailed design of the [[permission-layer]]** (the Member 4 component) and Sanne returns a substantive expert critique. Source: `2026-06-07-Xiaojing-Sanne-email-content.md`. This is a **landmark, high-substance source**: it is the **first detailed technical design** of the permission layer to date — moving it from "design-only, mechanism undecided" to a fully-articulated, **built-and-evaluated proof-of-concept**.

It also (a) provides the **first self-asserted evidence** that **Xiaojing = Member 4** (she identifies as owning the permission-layer component), (b) surfaces a **new evaluation-environment tech fact** (gpt-5.1 via the UvA API used for the experiments), and (c) records the **Claude Code permission config via markdown file** implementation detail.

## Participants
- **Xiaojing Li** (lee89953@gmail.com) — UvA team; **self-identifies as the permission-layer owner** ("my design about the permission layer"). Re-corroborates the Xiaojing ↔ lee89953 alias. See [[project-team]], [[_gaps]].
- **Sanne Wielinga** (sanne.wielinga@kickstart.ai) — Senior ML Engineer, KickstartAI; main project contact; gave detailed design feedback. See [[kickstartai-team]], [[project-team]].

## The design (NEW — core substance)

### Problem framing
When an LLM synthesizes source documents into wiki pages, **traditional file-level access control is insufficient** — sensitive content can appear paraphrased inside a page with no restriction label. This operationalizes the Member 4 RQ on [[permission-layer]] (information leakage from restricted source documents into synthesized output).

### Two leakage types defined
- **Vertical leakage** — higher-tier content (restricted) appears in a lower-tier page (public/internal).
- **Horizontal leakage** — restricted content from one project appears in another project's page at the **same tier** (e.g. KLM information appears in an NS page).

### Three permission tiers (paragraph-level)
Every source document is labeled **at ingestion**, **at paragraph level**:
- **public**
- **internal** — KickstartAI members only
- **restricted** — a specific project, identified by `project_id`

### Layer 1 — Pre-filtering
Before generation, the source paragraph pool is filtered to only paragraphs the target user is authorized to see (by `project_id` + `user_id`); the LLM **never sees** content it may not use. Access-rights changes require **no code/prompt changes**:
- In a **full pipeline** implementation — simple SQL update queries on the paragraph table suffice.
- In the **current Claude Code implementation** — Claude reads the updated configuration from a **markdown file**. (See [[wiki-generation-engine]], [[_gaps]].)

### Layer 2 — Self-audit
A second LLM call audits the generated page against the allowed paragraphs and flags ungrounded claims by **severity**:
- **High** (significant harm) → regenerate (max 2×), then escalate to human review.
- **Medium** (limited harm) → human review.
- **Low / None** → publish.

All outcomes are **logged**. The audit runs in **two steps**: a **fast regex blacklist** check (verbatim patterns from restricted documents), then an **LLM judge** for semantic leakage the blacklist cannot detect.

### Evaluation
- **20 scenarios** across two datasets: **Set A** (pre-filtering off, forced leakage) and **Set B** (pre-filtering on). Each set: **5 vertical + 5 horizontal** scenarios.
- Compared **two audit-prompt versions** for the detection-rate / false-positive-rate tradeoff.
- ⚠️ **Evaluation ran on `gpt-5.1` via the UvA API** for **both** the scenario outputs and the audit judge — generator and judge are the **same model** (self-acknowledged blind spot). **Production intends Claude end-to-end.** This is an *experimental* model choice, distinct from the production **Claude Code + Anthropic API** stack. See [[_gaps]].

## Sanne's feedback (five substantive critiques)
1. **Same-model audit blind spot persists even on Claude end-to-end** — a model auditing its own output shares its blind spots. Prefer a **different model family** for the audit; test same-model vs cross-model detection rates.
2. **Groundedness ≠ leakage** — most ungrounded claims are benign hallucinations (inflating the FP rate). The harder leak is **inference/aggregation**: combining allowed paragraphs to reveal restricted info — that claim *is* grounded, so it passes the audit. Aggregation is a **classic hard access-control problem**; name it explicitly in the threat model.
3. **Label correctness at ingestion is a first-class assumption** — who assigns the paragraph labels, and how? If automated, a single mislabeled restricted paragraph defeats the layer — **probably the biggest real-world risk**.
4. **Cross-project connections vs. strict filtering tension** — the project pitches cross-project learnings as a feature, but strict project filtering prevents exactly that. Make the tier-based resolution explicit; note aggregation can still combine internal facts across projects into something more sensitive.
5. **Evaluation is small** — 5 scenarios/leak-type means one miss moves detection rate by 20%; frame as an **illustrative proof of concept**, not a robust estimate. Make explicit how ground truth was established and where the FP-rate negatives come from.

Xiaojing acknowledged the feedback as helpful (2026-06-08).

## Conflicts / ambiguities
- ⚠️ **Permission layer status vs. MoSCoW "Won't-Have working layer" (settledness, not contradiction).** [[permission-layer]], [[permission-model]], and [[_overview]] record — per Assignment 1 MoSCoW — that a "completely working permission layer" is a **Won't Have (this iteration)** and the layer is **design-only**. This source shows Xiaojing has **built and evaluated** a two-layer implementation. Treated as a **thesis-level component PoC** (consistent with "design + optional partial implementation"); the MoSCoW "Won't" referred to a *fully production-integrated* layer. The MoSCoW record is **kept**, status updated to "design + evaluated PoC." Not overwritten. See [[_gaps]].
- ⚠️ **Evaluation model = gpt-5.1, not Claude (tech-stack consistency).** The production stack remains **Claude Code + Anthropic API** (resolved 2026-05-15). gpt-5.1 via the UvA API is an *experimental/evaluation* environment only — recorded precisely so as not to imply the production backend changed. See [[wiki-generation-engine]], [[_gaps]].
- ⚠️ **Xiaojing = Member 4 — soft signal → self-asserted ownership.** Prior pages kept this as an unasserted build-activity soft signal; here Xiaojing **self-identifies** as the permission-layer owner. Strengthened from "soft signal" to "self-asserted ownership" — still not an explicit course-level "Member 4" label. M1/M2/M3 remain inferential. See [[project-team]], [[_gaps]].
- **Sanne email domain** — consistently `@kickstart.ai` here (one more data point against the unreconciled `@kickstartai.org` variant). See [[_gaps]].

## Related
- [[permission-layer]]
- [[permission-model]]
- [[team-meeting-2026-06-04]]
- [[laurenz-sanne-email-2026-05-15]]
- [[wiki-generation-engine]]
- [[evaluation-deliverable]]
- [[project-team]]
- [[user-journeys]]
- [[_overview]]

## Sources
- 2026-06-07-Xiaojing-Sanne-email-content.md (Xiaojing ↔ Sanne permission-layer design review email thread, 2026-06-07 → 2026-06-08)
