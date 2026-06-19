# Deliverable: Permission Layer

**Last updated:** 2026-06-19
**Status:** scoped (design required; full implementation explicitly out of scope this iteration)

## Summary
Design (and optionally partial implementation) of document-level access control so the system is ready for sensitive projects. The 2026-04-13 kickoff clarified the permission layer **need not be a fully working architecture** — but the students **must design** how it would handle sensitive data from the start. The Assignment 1 presentation (2026-04-22) confirms this via **MoSCoW**: permission-layer **design** is a **Should Have**, while a **completely working permission layer** is explicitly a **Won't Have** (this iteration). See [[assignment-1-presentation-2026-04-22]].

## Details
Privacy and permissions are a first-class concern. The design should allow deployment to a sensitive project via configuration, not a rewrite. See concept page [[permission-model]] for design intent.

- **MoSCoW (Assignment 1 presentation, 2026-04-22):** Permission-layer **design** = **Should Have**; a **fully working/programmed permission layer** = **Won't Have (this iteration)**. Consistent with the existing "design-only" framing.
- **Research framing (Member 4 RQ):** "How can a permission-aware architecture be designed for an LLM-maintained knowledge base to mitigate **information leakage from restricted source documents into synthesized wiki pages**?" — a notable sharpening of the design problem (leakage from sources into synthesized output). See [[assignment-1-presentation-2026-04-22]].
- ⚠️ **Ownership discrepancy:** The 2026-04-16 supervisor kickoff recorded this sub-deliverable (#5) as **collaborative** (whole team). The 2026-04-22 presentation instead assigns it **individually to Member 4** (own component + individual RQ). The presentation is later/more authoritative on component ownership, but the "collaborative" note was not explicitly retracted. Flagged, not silently overwritten — see [[project-team]], [[user-journeys]], [[_gaps]].
- **Critical-thinking emphasis:** Sanne advised the students **not to rely solely on LLMs** here — the permission layer (and the evaluation framework) specifically require the students' own critical thinking.
- Specific mechanism (RBAC, ACLs) not yet decided — see [[_gaps]].

## Related
- [[permission-model]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[assignment-1-presentation-2026-04-22]]
- [[project-team]]
- [[_reuse]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
