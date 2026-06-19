# Concept: Permission Model

**Last updated:** 2026-06-19

## Summary
Document-level access control is a first-class design concern for the Living Wiki, not an afterthought. The architecture must be designed so that deploying to a sensitive project later requires configuration, not a rewrite.

## Details
The permission layer is intended to handle access-controlled documents when the system is deployed to other KickstartAI projects. Specific approach (RBAC, document-level ACLs, etc.) is not yet decided — see [[_gaps]].

### Configurable-backend / data-residency direction (2026-05-15)
A concrete mechanism candidate surfaced in the demo follow-up thread (see [[laurenz-sanne-email-2026-05-15]]): because the MVP passes ingested documents to **Anthropic's LLM via API** (Claude Code — see [[wiki-generation-engine]]), sensitive-project deployment may require a **configurable backend** to swap in a **self-hosted or VPC-deployed model**, plus consideration of **zero-data-retention (ZDR)** API terms. Documenting **which operations send data externally vs. stay local** is a concrete design/thesis artifact. This data-residency dimension complements the document-level access-control dimension. See [[permission-layer]], [[_reuse]].

## Related
- [[permission-layer]]
- [[wiki-generation-engine]]
- [[laurenz-sanne-email-2026-05-15]]
- [[_reuse]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
