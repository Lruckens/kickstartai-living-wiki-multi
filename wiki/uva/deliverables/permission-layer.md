# Deliverable: Permission Layer

**Last updated:** 2026-06-19
**Status:** scoped (design required; full implementation not required given short timeline; team-collaborative deliverable)

## Summary
Design (and optionally partial implementation) of document-level access control so the system is ready for sensitive projects. The 2026-04-13 kickoff meeting clarified that, given the short timeline, the permission layer **need not be a fully working architecture** — but the students **must design** how it would handle sensitive data from the start. Per the 2026-04-16 supervisor kickoff, this sub-deliverable (#5) is to be tackled **collaboratively by the whole team** (see [[supervisor-kickoff-2026-04-16]]).

## Details
Privacy and permissions are a first-class concern. The design should allow deployment to a sensitive project via configuration, not a rewrite. See concept page [[permission-model]] for design intent.

- **Work division (supervisor kickoff, 2026-04-16):** This is **Sub-deliverable 5**, and unlike sub-deliverables 1–4 (one member each), it is assigned to the **whole team collaboratively**. See [[project-team]], [[supervisor-kickoff-2026-04-16]].
- **Scope refinement (kickoff, 2026-04-13):** A fully working implementation is **not required** due to the project's short timeline; the deliverable is primarily a **design** for sensitive-data handling. Self-documenting the project first deliberately avoids the need to handle sensitive data in the near term.
- **Critical-thinking emphasis:** Sanne advised the students **not to rely solely on LLMs** here — the permission layer (and the evaluation framework) specifically require the students' own critical thinking.
- Specific mechanism (RBAC, ACLs) not yet decided — see [[_gaps]].

## Related
- [[permission-model]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[project-team]]
- [[_reuse]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
