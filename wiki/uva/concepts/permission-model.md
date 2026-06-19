# Concept: Permission Model

**Last updated:** 2026-06-19

## Summary
Document-level access control is a first-class design concern for the Living Wiki, not an afterthought. The architecture must be designed so that deploying to a sensitive project later requires configuration, not a rewrite. As of **2026-06-07** the model has a concrete, evaluated instantiation: a **paragraph-level tier model + pre-filtering ACL + LLM self-audit** (see [[permission-layer]], [[xiaojing-sanne-permission-email-2026-06-07]]).

## Details
The permission layer is intended to handle access-controlled documents when the system is deployed to other KickstartAI projects.

### Concrete mechanism — paragraph-level tier model + two-layer architecture (2026-06-07)
The "RBAC vs document-level ACL" question is now substantially answered by Xiaojing's design (see [[permission-layer]], [[xiaojing-sanne-permission-email-2026-06-07]]) — effectively a **paragraph-level ACL + tier model**:
- **Three tiers, labeled at ingestion at paragraph level:** **public**, **internal** (KickstartAI members only), **restricted** (a specific project, by `project_id`).
- **Two leakage types** the model must prevent: **vertical** (restricted content in a lower-tier page) and **horizontal** (restricted content from one project in another project's same-tier page).
- **Layer 1 — pre-filtering:** the source paragraph pool is filtered to authorized paragraphs (by `project_id` + `user_id`) *before* generation, so the LLM never sees unauthorized content. Access changes need no code/prompt change (SQL paragraph-table updates in a full pipeline; a markdown config file in the current Claude Code implementation).
- **Layer 2 — self-audit:** an LLM-judge step (preceded by a regex blacklist) audits the generated page against allowed paragraphs and escalates by severity.

### Open hard problems (Sanne's critique, 2026-06-07)
- **Aggregation / inference leakage** — grounded combination of allowed paragraphs can reveal restricted info and passes a groundedness-based audit. A classic hard access-control problem; not yet in the threat model.
- **Label correctness at ingestion** — the entire pre-filtering guarantee rests on correct paragraph labels; who labels and how (manual vs automated) is the biggest real-world risk.
- **Cross-project connections vs. strict filtering** — the cross-project-learnings feature ([[_reuse]]) is in tension with strict `project_id` filtering; the tier model implicitly resolves this but it should be explicit.
See [[_gaps]].

### Configurable-backend / data-residency direction (2026-05-15)
Because the MVP passes ingested documents to **Anthropic's LLM via API** (Claude Code — see [[wiki-generation-engine]]), sensitive-project deployment may require a **configurable backend** to swap in a **self-hosted or VPC-deployed model**, plus consideration of **zero-data-retention (ZDR)** API terms (see [[laurenz-sanne-email-2026-05-15]]). Documenting **which operations send data externally vs. stay local** is a concrete design/thesis artifact. This data-residency dimension complements the document-level access-control dimension. See [[permission-layer]], [[_reuse]].

## Related
- [[permission-layer]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[wiki-generation-engine]]
- [[laurenz-sanne-email-2026-05-15]]
- [[_reuse]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
- 2026-06-07-Xiaojing-Sanne-email-content.md (Xiaojing ↔ Sanne permission-layer design review email thread, 2026-06-07 → 2026-06-08)
