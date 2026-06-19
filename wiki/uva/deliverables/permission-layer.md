# Deliverable: Permission Layer

**Last updated:** 2026-06-19
**Status:** scoped (design required; full implementation explicitly out of scope this iteration)

## Summary
Design (and optionally partial implementation) of document-level access control so the system is ready for sensitive projects. The 2026-04-13 kickoff clarified the permission layer **need not be a fully working architecture** — but the students **must design** how it would handle sensitive data from the start. The Assignment 1 presentation and written report (2026-04-22) confirm this via **MoSCoW**: permission-layer **design** is a **Should Have**, while a **completely working permission layer** is explicitly a **Won't Have** (this iteration). See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]].

## Details
Privacy and permissions are a first-class concern. The design should allow deployment to a sensitive project via configuration, not a rewrite. See concept page [[permission-model]] for design intent.

- **Privacy surfaced live in the MVP (2026-05-14):** At the first development-phase team meeting (see [[team-meeting-2026-05-14]]), **"document privacy may be an issue"** was raised as a live concern in the demoed MVP — corroborating the design-first framing.
- **Deployment governance — admin-per-project (2026-05-14):** The team proposed a deployment model where each project is assigned an **admin who governs the wiki page**. Recorded as a proposal/design decision; the mechanism (how the admin governs, relationship to RBAC/ACL) is unspecified — see [[permission-model]], [[_gaps]]. Ties to the configuration-not-rewrite reuse model (see [[_reuse]]).
- **MoSCoW (Assignment 1, 2026-04-22):** Permission-layer **design** = **Should Have**; a **fully working/programmed permission layer** = **Won't Have (this iteration)**. Consistent with the existing "design-only" framing.
- **Research framing (Member 4 RQ):** "How can a permission-aware architecture be designed for an LLM-maintained knowledge base to mitigate **information leakage from restricted source documents into synthesized wiki pages**?" The written report sharpens the problem: because the wiki serves **synthesised/summarised content rather than raw documents**, **traditional access control is insufficient** — restricted information can leak to unauthorised users. The member defines leakage in the LLM-synthesis context, designs an architecture to prevent it, and evaluates it; the result is a document-level permission layer making the system suitable for confidential/partner-sensitive projects. See [[assignment-1-report-2026-04-22]].
- **Ownership — RESOLVED-BY-PRECEDENCE (Member 4 individual):** The 2026-04-16 supervisor kickoff recorded this sub-deliverable (#5) as **collaborative**. Both later student-authored sources — the presentation deck AND the written report — assign it **individually to Member 4** (own component + individual RQ) and instead name the **evaluation framework as the collaborative deliverable**. With two agreeing student-authored sources against one supervisor-kickoff note, the **Member-4-individual** split is treated as confirmed; the superseded “collaborative” note is recorded, not deleted. See [[project-team]], [[user-journeys]], [[_gaps]].
- **Design principles grounding (report):** security, privacy & data protection grounded in GDPR (EU 2016), NIST SP 800-53, ISO/IEC 27001:2013, and Kroll et al. (2017) on accountable algorithms. See [[assignment-1-report-2026-04-22]].
- **Critical-thinking emphasis:** Sanne advised the students **not to rely solely on LLMs** here — the permission layer (and the evaluation framework) specifically require the students' own critical thinking.
- Specific mechanism (RBAC, ACLs) not yet decided — see [[_gaps]].

## Related
- [[permission-model]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[team-meeting-2026-05-14]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[project-team]]
- [[_reuse]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-16-supervisor-kickoff.md (UvA-internal student↔supervisor kickoff meeting notes, 2026-04-16)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-05-14-meeting-notes.md (internal UvA team working meeting notes, development phase)
