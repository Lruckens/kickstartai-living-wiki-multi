# Deliverable: Permission Layer

**Last updated:** 2026-06-19
**Status:** scoped (Assignment-1 MoSCoW: design = Should, fully-working = Won't); **two-layer leakage PoC BUILT & EVALUATED (Xiaojing, 2026-06-07)**; **UI + auth layer BUILT (2026-06-12)**; **integrated as a login landing page (2026-06-15)**; **per-project access control in multi-project app (2026-06-17)**

## Summary
Design (and now a working proof-of-concept implementation with a UI) of document-level access control so the system is ready for sensitive projects. The 2026-04-13 kickoff clarified the permission layer **need not be a fully working architecture** — but the students **must design** how it would handle sensitive data from the start. The Assignment 1 presentation and written report (2026-04-22) confirm this via **MoSCoW**: permission-layer **design** is a **Should Have**, while a **completely working permission layer** is explicitly a **Won't Have** (this iteration). As of **2026-06-07**, Xiaojing built **and evaluated** a concrete two-layer permission architecture (pre-filtering + self-audit); as of **2026-06-12** she has also built a **UI + authentication layer**; by **2026-06-15** it is integrated into the wiki as a **login landing page**; by **2026-06-17** per-project access control is enforced at the API level in the multi-project app. See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]], [[xiaojing-sanne-permission-email-2026-06-07]], [[mockup-artifact-2026-06-12]], [[team-meeting-2026-06-15]], [[multi-project-app-2026-06-17]].

## Details
Privacy and permissions are a first-class concern. The design should allow deployment to a sensitive project via configuration, not a rewrite. See concept page [[permission-model]] for design intent.

### Per-project access control in multi-project app (2026-06-17)
The 2026-06-17 multi-project app (see [[multi-project-app-2026-06-17]]) adds an API-level enforcement layer on top of the existing UI/auth design:
- Users carry a **`projects` list** — ingest/query/generate/lint are **refused** for a project the user is not a member of.
- Demo accounts: `anna.jansen` (UvA only), `bram.bakker` (Bakkie only), `carla.visser` (both), `gast.bezoeker` (public guest, no projects).
- This is a **config-driven** realization: accounts and project memberships are defined in `project_config.py` / `project.config.json`, no code change needed to add a project or user. See [[decision-multi-project-app-structure]], [[_reuse]].

### Integrated as a login landing page (2026-06-15)
At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]) the permission layer was wired into the integrated wiki as a **login landing page** — users must **log in before entering the wiki**. **Dummy accounts** are used for the demo, with a suggestion to add **group members + Sanne** as real users in the wiki. ⚠️ Crucially, the live wiki currently contains **only public + internal pages** — **restricted pages still need to be added** to test the full leakage-prevention functionality end-to-end in the live app. See [[_gaps]].

### UI + authentication layer — BUILT (2026-06-12)
The 2026-06-12 mock-up artifact (see [[mockup-artifact-2026-06-12]]) adds a concrete **UI + auth** dimension on top of the two-layer leakage design:
- **Login** with `user_id` + password; for KickstartAI, **`user_id` = email** in the format `first_name.last_name@kickstart.ai`. The session identifies the user automatically for all subsequent actions.
- Two tabs: **Ingestion** (upload a document, assign a visibility label **public / internal / restricted**; restricted documents require selecting an existing project from a dropdown or typing a new project name) and **Generator** (request a wiki page; for restricted pages the user selects a project from a dropdown that **only shows authorized projects**, so **cross-project access is impossible**).
- **User lifecycle:** when a user joins the company/project they are added to the auth system (granted the corresponding restricted access); when they leave, their account is removed and access revoked.
- **Three passwordless demo accounts** demonstrate the prototype; **production authentication is explicitly out of scope** (KickstartAI future work). Xiaojing plans to add all group members + Sanne to the system for the final artifact.
- Sanne's 2026-06-07 suggestions folded in: **email-as-user-id** and **dummy accounts** (Sanne advised against assigning separate IDs/passwords to every member for this thesis).

### Integration into the wiki architecture (2026-06-11)
At the 2026-06-11 team meeting (see [[team-meeting-2026-06-11]]) the permission layer entered **integration**: **Xiaojing shares her MVP + a precise description** of what it does, and **Laurenz merges it** into the wiki architecture (using **Claude and VS Code**). Xiaojing is to **fold Sanne's 2026-06-07 feedback** (the five critiques below) into the version she sends to Laurenz before integration. Integration was realized in the 2026-06-15 fully-integrated demo (see [[team-meeting-2026-06-15]]). See [[wiki-generation-engine]], [[_gaps]].

### Concrete two-layer design — BUILT & EVALUATED (Xiaojing, 2026-06-07)
The most detailed source on this component is the 2026-06-07 → 2026-06-08 design-review thread between Xiaojing and Sanne (see [[xiaojing-sanne-permission-email-2026-06-07]]). Xiaojing **self-identifies as the permission-layer owner** and presents a fully-articulated, evaluated proof-of-concept. This realizes the 2026-06-04 "user-id connection" hint as `user_id` + `project_id` pre-filtering.

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
- **User-id connection — first concrete mechanism signal (2026-06-04):** At the 2026-06-04 meeting (see [[team-meeting-2026-06-04]]), **Xiaojing** proposed a **connection to a user-id**. This is now fully realized in the two-layer design + UI auth above (`user_id`/email + `project_id`). See [[permission-model]], [[_gaps]].
- **External-data-flow concern — concrete (2026-05-15):** The MVP runs on **Claude Code + Anthropic API** (see [[wiki-generation-engine]]), so **any ingested document is passed to Anthropic's LLM via API**. Fine for the team's own project docs, but a real concern for a **deployable artifact handling sensitive partner data / NDA-covered materials**. See [[laurenz-sanne-email-2026-05-15]].
- **Design directions from Sanne (2026-05-15):**
  - **Zero-data-retention (ZDR)** — check what Anthropic tier Claude Code falls under and whether ZDR is feasible.
  - **Configurable / swappable backend** — swap in a **self-hosted or VPC-deployed model** when needed; connects directly to the permission layer (Member 4 scope) and the configuration-not-rewrite reuse model (see [[_reuse]], [[permission-model]]).
  - **Data-flow documentation as a thesis artifact** — document which operations send data externally vs. stay local.
- **Deployment governance — admin-per-project (2026-05-14):** each project assigned an **admin who governs the wiki page** (mechanism unspecified — see [[permission-model]], [[_gaps]]).
- **MoSCoW (Assignment 1, 2026-04-22):** Permission-layer **design** = **Should Have**; a **fully working/programmed permission layer** = **Won't Have (this iteration)**. The 2026-06-07 PoC, 2026-06-12 UI, and 2026-06-17 API-level enforcement **exceed** the "design-only" framing; recorded as a thesis-level component prototype, consistent with "design + optional partial implementation." The MoSCoW record is **kept, not overwritten** — see [[_gaps]].
- **Research framing (Member 4 RQ):** "How can a permission-aware architecture be designed for an LLM-maintained knowledge base to mitigate **information leakage from restricted source documents into synthesized wiki pages**?" The report sharpens it: because the wiki serves **synthesised content rather than raw documents**, **traditional access control is insufficient**. The 2026-06-07 design directly operationalizes this. See [[assignment-1-report-2026-04-22]].
- **Ownership — RESOLVED-BY-PRECEDENCE (Member 4 individual), self-asserted:** The 2026-04-16 supervisor kickoff recorded sub-deliverable #5 as **collaborative**. Both later student-authored sources (deck + report) assign it **individually to Member 4** and name the **evaluation framework** as the collaborative deliverable. The 2026-06-07 thread adds **self-asserted ownership by Xiaojing**. See [[project-team]], [[user-journeys]], [[_gaps]].
- **Design principles grounding (report):** security, privacy & data protection grounded in GDPR (EU 2016), NIST SP 800-53, ISO/IEC 27001:2013, and Kroll et al. (2017). See [[assignment-1-report-2026-04-22]].
- **Critical-thinking emphasis:** Sanne advised the students **not to rely solely on LLMs** here — corroborated by her detailed 2026-06-07 critique.
- **Mechanism — now substantially specified:** effectively a **paragraph-level tier model (public/internal/restricted) + pre-filtering ACL by `project_id`/`user_id` + LLM self-audit**, with an **email-based login + project-scoped UI** (a login landing page in the integrated app) and **config-driven per-project membership** in the multi-project app. Open refinements (aggregation leakage, label correctness, eval scale, cross-model audit, usability for non-technical staff, restricted pages not yet added to the live wiki) — see [[_gaps]].

## Related
- [[permission-model]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[mockup-artifact-2026-06-12]]
- [[team-meeting-2026-06-15]]
- [[multi-project-app-2026-06-17]]
- [[decision-multi-project-app-structure]]
- [[kickoff-meeting-2026-04-13]]
- [[supervisor-kickoff-2026-04-16]]
- [[team-meeting-2026-05-14]]
- [[team-meeting-2026-06-04]]
- [[team-meeting-2026-06-11]]
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
- 2026-06-11-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-12-mock-up-artifact.md (Living Wiki UI mock-up artifact description + Sanne feedback, development phase)
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
- 2026-06-17-MULTI-APP.md (multi-project Living Wiki app README / architecture overview, 2026-06-17)
