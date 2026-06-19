# Deliverable: Permission Layer

**Last updated:** 2026-06-19
**Status:** scoped (Assignment-1 MoSCoW: design = Should, fully-working = Won't); **a two-layer proof-of-concept is now BUILT & EVALUATED (Xiaojing, 2026-06-07)**

## Summary
Design (and now a working proof-of-concept implementation) of document-level access control so the system is ready for sensitive projects. The 2026-04-13 kickoff clarified the permission layer **need not be a fully working architecture** — but the students **must design** how it would handle sensitive data from the start. The Assignment 1 presentation and written report (2026-04-22) confirm this via **MoSCoW**: permission-layer **design** is a **Should Have**, while a **completely working permission layer** is explicitly a **Won't Have** (this iteration). As of **2026-06-07**, Xiaojing has gone beyond "design-only" and built **and evaluated** a concrete two-layer permission architecture (pre-filtering + self-audit) — see below. See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]], [[xiaojing-sanne-permission-email-2026-06-07]].

## Details
Privacy and permissions are a first-class concern. The design should allow deployment to a sensitive project via configuration, not a rewrite. See concept page [[permission-model]] for design intent.

### Concrete two-layer design — BUILT & EVALUATED (Xiaojing, 2026-06-07)
The most detailed source on this component to date is the 2026-06-07 → 2026-06-08 design-review thread between Xiaojing and Sanne (see [[xiaojing-sanne-permission-email-2026-06-07]]). Xiaojing **self-identifies as the permission-layer owner** and presents a fully-articulated, evaluated proof-of-concept. This realizes the 2026-06-04 "user-id connection" hint as `user_id` + `project_id` pre-filtering.

**Problem:** when an LLM synthesizes source documents into wiki pages, **traditional file-level access control is insufficient** — sensitive content can appear paraphrased in a page with no restriction label. Two leakage types are defined:
- **Vertical leakage** — higher-tier content (restricted) appears in a lower-tier page (public/internal).
- **Horizontal leakage** — restricted content from one project appears in another project's page at the **same tier** (e.g. KLM info in an NS page).

**Three permission tiers, labeled at ingestion at paragraph level:** **public**, **internal** (KickstartAI members only), **restricted** (specific project, by `project_id`).

**Layer 1 — Pre-filtering:** before generation, the source paragraph pool is filtered to authorized paragraphs (by `project_id` + `user_id`); the LLM **never sees** unauthorized content. Access-rights changes need no code/prompt change — in a full pipeline, SQL updates on the paragraph table; **in the current Claude Code implementation, Claude reads the updated config from a markdown file** (see [[wiki-generation-engine]]).

**Layer 2 — Self-audit:** a second LLM call audits the generated page against the allowed paragraphs, flagging ungrounded claims by severity — **High** → regenerate (max 2×) then human review; **Medium** → human review; **Low/None** → publish; all outcomes logged. Runs in two steps: a **fast regex blacklist** (verbatim patterns from restricted docs) then an **LLM judge** for semantic leakage.

**Evaluation:** 20 scenarios across **Set A** (pre-filtering off, forced leakage) and **Set B** (pre-filtering on); each 5 vertical + 5 horizontal; two audit-prompt versions compared for detection-rate / false-positive-rate tradeoff. ⚠️ The experiments ran on **`gpt-5.1` via the UvA API** for both generator and judge (same-model blind spot, self-acknowledged); **production intends Claude end-to-end**. This is an *experimental* model choice, distinct from the production Claude Code + Anthropic API stack — see [[_gaps]].

**Sanne's feedback (five critiques defining the open problems):**
1. **Same-model audit blind spot persists even on Claude end-to-end** — prefer a **different model family** for the audit; test same- vs cross-model detection.
2. **Groundedness ≠ leakage** — ungrounded claims are mostly benign hallucinations (inflate FP rate); the hard leak is **inference/aggregation** (grounded combination of allowed paragraphs revealing restricted info, which passes the audit). Name aggregation in the threat model.
3. **Label correctness at ingestion is a first-class assumption** — who labels paragraphs, and how? A single mislabeled restricted paragraph defeats Layer 1 — likely the biggest real-world risk.
4. **Cross-project connections vs. strict filtering tension** — the project pitches cross-project learnings as a feature, but strict project filtering prevents exactly that; make the tier resolution explicit.
5. **Evaluation is small** — 5 scenarios/type = 20% per-miss swing; frame as illustrative PoC; make ground-truth and FP-rate negatives explicit.

### Earlier signals & directions
- **Privacy surfaced live in the MVP (2026-05-14):** At the first development-phase team meeting (see [[team-meeting-2026-05-14]]), **"document privacy may be an issue"** was raised in the demoed MVP — corroborating the design-first framing.
- **User-id connection — first concrete mechanism signal (2026-06-04):** At the 2026-06-04 meeting (see [[team-meeting-2026-06-04]]), **Xiaojing** proposed a **connection to a user-id**. This is now fully realized in the two-layer design above (`user_id` + `project_id` pre-filtering). See [[permission-model]], [[_gaps]].
- **External-data-flow concern — concrete (2026-05-15):** The MVP runs on **Claude Code + Anthropic API** (see [[wiki-generation-engine]]), so **any ingested document is passed to Anthropic's LLM via API**. Fine for the team's own project docs, but a real concern for a **deployable artifact handling sensitive partner data / NDA-covered materials**. See [[laurenz-sanne-email-2026-05-15]].
- **Design directions from Sanne (2026-05-15):**
  - **Zero-data-retention (ZDR)** — check what Anthropic tier Claude Code falls under and whether ZDR is feasible.
  - **Configurable / swappable backend** — swap in a **self-hosted or VPC-deployed model** when needed; connects directly to the permission layer (Member 4 scope) and the configuration-not-rewrite reuse model (see [[_reuse]], [[permission-model]]).
  - **Data-flow documentation as a thesis artifact** — document which operations send data externally vs. stay local.
- **Deployment governance — admin-per-project (2026-05-14):** each project assigned an **admin who governs the wiki page** (mechanism unspecified — see [[permission-model]], [[_gaps]]).
- **MoSCoW (Assignment 1, 2026-04-22):** Permission-layer **design** = **Should Have**; a **fully working/programmed permission layer** = **Won't Have (this iteration)**. The 2026-06-07 PoC **exceeds** the "design-only" framing; recorded as a thesis-level component prototype, consistent with "design + optional partial implementation." The MoSCoW record is **kept, not overwritten** — see [[_gaps]].
- **Research framing (Member 4 RQ):** "How can a permission-aware architecture be designed for an LLM-maintained knowledge base to mitigate **information leakage from restricted source documents into synthesized wiki pages**?" The report sharpens it: because the wiki serves **synthesised content rather than raw documents**, **traditional access control is insufficient**. The 2026-06-07 design directly operationalizes this. See [[assignment-1-report-2026-04-22]].
- **Ownership — RESOLVED-BY-PRECEDENCE (Member 4 individual), now self-asserted:** The 2026-04-16 supervisor kickoff recorded sub-deliverable #5 as **collaborative**. Both later student-authored sources (deck + report) assign it **individually to Member 4** and name the **evaluation framework** as the collaborative deliverable. The 2026-06-07 thread adds **self-asserted ownership by Xiaojing**, strengthening Xiaojing ↔ Member 4 from soft signal to self-asserted (still not an explicit course "Member 4" label). See [[project-team]], [[user-journeys]], [[_gaps]].
- **Design principles grounding (report):** security, privacy & data protection grounded in GDPR (EU 2016), NIST SP 800-53, ISO/IEC 27001:2013, and Kroll et al. (2017). See [[assignment-1-report-2026-04-22]].
- **Critical-thinking emphasis:** Sanne advised the students **not to rely solely on LLMs** here — corroborated by her detailed 2026-06-07 critique.
- **Mechanism — now substantially specified:** effectively a **paragraph-level tier model (public/internal/restricted) + pre-filtering ACL by `project_id`/`user_id` + LLM self-audit**. Open refinements (aggregation leakage, label correctness, eval scale, cross-model audit) — see [[_gaps]].

## Related
- [[permission-model]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[team-meeting-2026-05-14]]
- [[team-meeting-2026-06-04]]
- [[laurenz-sanne-email-2026-05-15]]
- [[wiki-generation-engine]]
- [[evaluation-deliverable]]
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
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
- 2026-06-04-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-07-Xiaojing-Sanne-email-content.md (Xiaojing ↔ Sanne permission-layer design review email thread, 2026-06-07 → 2026-06-08)
