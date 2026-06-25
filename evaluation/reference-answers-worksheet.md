# Reference-answer worksheet (T1 + T2) — UvA corpus

Write the 20 reference answers **from the source documents in `sources/uva/`** listed under
each question. **Do not read the wiki pages first** — the wiki is the system output we're
testing, so deriving answers from it would bias the experiment toward C2 (Sanne's point).

Keep answers short and factual (1–3 sentences): the actual decision/value, the people,
dates, and reasons. When done, hand this back and the answers go into the `reference_answer`
fields in `questions.json`.

> **Rebuilt for the fresh corpus.** All sources are now `.md` in `sources/uva/` — the same
> files C1/C1r read and the wiki was ingested from, so there's no `.pptx`/`.docx` mismatch
> anymore. The old worksheet pointed at PDF/DOCX/PPTX names from the previous folder; those
> are gone.

> **Note on T2-4 (reframed).** The original T2-4 asked about the "three-layer architecture
> (/sources, CLAUDE.md, /wiki)" — but that framing lives in `CLAUDE.md`/`README.md`, which
> are **not** in `sources/uva/`. It was reframed to a corpus-grounded version (sources → wiki,
> and what performs the operations). All other questions map to facts present in `sources/uva/`.

---

## T1 — single-fact

### T1-1 — Which platform was chosen to deploy the app, and what over?
**Read:** `sources/uva/2026-06-10-meeting-notes.md` (Vercel chosen) · `sources/uva/2026-06-18-meeting-notes.md` (later decided against deploying it)
**Answer:** Vercel was chosen as the deployment platform (10 June), over complex enterprise cloud providers such as AWS. (The team later, on 18 June, decided against actually deploying to Vercel for now, to prioritise individual thesis work and testing.)
_____

### T1-2 — Who is the UvA thesis supervisor?
**Read:** `sources/uva/2026-04-13-KAI-UvA-Kickoff-meeting-notes.md` · `sources/uva/2026-04-16-supervisor-kickoff.md`
**Answer:** Hongyi Zhu
_____

### T1-3 — Authentication approach for the prototype, and why not full auth?
**Read:** `sources/uva/2026-06-10-meeting-notes.md`
**Answer:** Use dummy accounts representing different team members. Full auth not necessary for demo
_____

### T1-4 — KickstartAI technical mentor / main contact?
**Read:** `sources/uva/2026-04-10-Intro-email.md` · `sources/uva/2026-04-13-KAI-UvA-Kickoff-meeting-notes.md`
**Answer:** Sanne Wielinga 
_____

### T1-5 — Process methodology adopted for the project phases?
**Read:** `sources/uva/2026-04-13-KAI-Intro.md` · `sources/uva/2026-04-13-Gantt_chart.md` · `sources/uva/2026-04-22-presentation-slides.md`
**Answer:**  Design Science Research / CRISP-DM
_____

### T1-6 — Date of the project kickoff meeting?
**Read:** `sources/uva/2026-04-13-KAI-UvA-Kickoff-meeting-notes.md`
**Answer:** 2026-04-13
_____

### T1-7 — Which LLM does the system use, and is it fine-tuned?
**Read:** `sources/uva/2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md` · `sources/uva/2026-04-22-problem-definition.md`
**Answer:** Claude model Sonnet 4.6 form Anthropic. Not fine tuned
_____

### T1-8 — Final demo and thesis deadline?
**Read:** `sources/uva/2026-06-15-meeting-notes.md` · `sources/uva/2026-06-18-meeting-notes.md`
**Answer:** Final demo 2026.06.18. Thesis dedaline 2026.06.25
_____

### T1-9 — Interface / tooling layer the team uses to operate the wiki?
**Read:** `sources/uva/2026-06-17-MULTI-APP.md` · `sources/uva/2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md`
**Answer:** The team operates the wiki through a web application — a React/Vite frontend with an active-project switcher and four views (Wiki, Operations, Gaps, Artifact) — backed by a FastAPI service (run with uvicorn) whose endpoints implement the ingest/query/lint/generate operations per project. It runs locally (backend on port 8000, frontend on 5173).


_____

### T1-10 — What is sub-deliverable 4, and who owns it?
**Read:** `sources/uva/2026-04-22-problem-definition.md` · `sources/uva/2026-04-22-presentation-slides.md`
**Answer:** Gap detector owned by Cara. Identifies underdocumented areas, unresolved decisions, or missing rationale — e.g., decisions without rationale, PRs without explanations, meetings without recorded outcomes. Outputs a structured, ranked gap report highlighting missing or incomplete knowledge.

_____

---

## T2 — synthesis / connection

### T2-1 — Who owns each of the six sub-deliverables?
**Read:** `sources/uva/2026-04-22-problem-definition.md` · `sources/uva/2026-04-22-presentation-slides.md`
**Answer:** Laurenz: Ingetion + wiki engine, Quinten: Generator module, Xiaoujing: Permission Layer, Cara: Gap Detector
_____

### T2-2 — Why was the gap detector reworked, and what changed?
**Read:** `sources/uva/2026-06-17-MULTI-APP.md` · `sources/uva/2026-06-10-meeting-notes.md` · `sources/uva/2026-06-12-mock-up-artifact.md`
**Answer:** The gap detector built by Cara was initially built fro raw source data and not adapted for the structure of the wiki pages. Therefore when integrating the feature the gaps where showing too many and worng gaps. The Semantic layer was changed and the Raning layer scoring formula was fine tuned. Also the UI needed to be mpre user friendly for non-technical stakeholders.
_____

### T2-3 — How does the permission layer decide who can see a generated output (e.g. a LinkedIn post)?
**Read:** `sources/uva/2026-06-12-mock-up-artifact.md` (Permission Layer section) · `sources/uva/2026-06-17-MULTI-APP.md` (accounts / per-project access)
**Answer:** Each document — and the wiki pages/outputs generated from it — carries a visibility label: public, internal, or restricted. The user is identified from their login session (user_id = their KickstartAI email). Public and internal outputs are available to any logged-in user, and the system auto-selects the appropriate documents. Restricted outputs are tied to a specific project, and only users authorized for that project can see them — when generating, the project dropdown only shows the projects the user is authorized for, so there is no cross-project access. A public-facing output like a LinkedIn post is generated from public content, so it is visible to everyone.
_____

### T2-4 — How does the system turn raw project documents into the wiki, and what performs the operations?  *(reframed — was "three-layer architecture"; CLAUDE.md isn't in the corpus)*
**Read:** `sources/uva/2026-06-17-MULTI-APP.md` (per-project subtrees) · `sources/uva/2026-05-15-Laurenz-Sanne-email-content.md` (Claude Code performs operations) · `sources/uva/2026-06-18-Laurenz-evaluation-plan.md` (wiki = compiled form of sources)
**Answer:** Raw project documents live in /sources (per project, e.g. sources/uva/) as immutable inputs. Claude Code — Anthropic's terminal agent linked to the GitHub repo — reads the sources and performs all operations, generating the structured pages in /wiki (per project, wiki/uva/). The wiki is the compiled form of exactly the sources, and the multi-project app keeps each project's sources, wiki, and access labels in separate subtrees.
_____

### T2-5 — Steps the pipeline follows when a new source is ingested?
**Read:** `sources/uva/2026-06-12-mock-up-artifact.md` (Ingest = three streamed phases, lines 15 & 46)
**Answer:** A source is dropped into /sources, then processed in three streamed phases: (1) Analyse — Claude reads the new document against the existing wiki and streams its classification, key takeaways, conflicts, and planned page changes; (2) Apply — the planned changes are written as complete wiki files (with a live progress indicator), reporting which pages were created/updated; (3) Commit & push — the updated wiki is committed and pushed to the main branch by a wiki bot, so the repository always reflects the latest knowledge state.
_____

### T2-6 — Relationship between KickstartAI and the UvA AI4Business Lab?
**Read:** `sources/uva/2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md` · `sources/uva/2026-04-10-Intro-email.md`
**Answer:** KickstartAI — a non-profit accelerating AI adoption in the Dutch ecosystem (partners like KLM, ING, Ahold Delhaize, NS) — is the industry partner: it set the challenge brief and provides the project context (its onboarding materials / two-pager, a real use case) and a technical mentor for engineering guidance. The UvA AI4Business Lab students build the Living Wiki as their thesis project, with the architecture intended for reuse across KickstartAI's other projects.
_____

### T2-7 — How did the permission layer's scope change over the project?
**Read:** `sources/uva/2026-04-22-problem-definition.md` (original ambition) · `sources/uva/2026-06-04-meeting-notes.md` (user-id added) · `sources/uva/2026-06-12-mock-up-artifact.md` (implemented scope)
**Answer:** It started as an ambition to prevent information leakage through LLM synthesis via document-level access control (problem definition). For the prototype it was scoped down to visibility labels — public / internal / restricted — tied to projects, with a user-id connection added (Xiaojing, 4 Jun) and login by email using dummy accounts; full authentication (passwords, 2FA) was deferred to KickstartAI as future work.
_____

### T2-8 — Deployment/hosting concern still open, and why?
**Read:** `sources/uva/2026-06-18-meeting-notes.md` (deferred Vercel) · `sources/uva/2026-06-10-meeting-notes.md` (Vercel chosen + deploy-backend action) · `sources/uva/2026-06-12-mock-up-artifact.md` (runs locally, line 92)
**Answer:** The app still runs locally (on a laptop), so only the person running it can use it — the open step is deploying the backend to a central host so the wider team can use it without local installs. Vercel was chosen as the platform, but near the deadline the team deliberately decided against actually deploying to Vercel, to prioritise individual thesis work and testing.
_____

### T2-9 — Team's evaluation approach for the knowledge pipeline?
**Read:** `sources/uva/2026-06-18-Laurenz-evaluation-plan.md` · `sources/uva/2026-06-15-meeting-notes.md`
**Answer:** A headline experiment compares answering from the compiled wiki vs raw context across four conditions — C0 closed-book, C1 all raw sources, C1r retrieved raw chunks, C2 retrieved wiki pages — with the same answer model and prompt so only the context differs (C1r-vs-C2 isolates the wiki's value). Answers are scored by an LLM-as-judge (a separate model) on Correctness (primary, vs human references written from the sources) and Faithfulness (groundedness); the gap detector and permission layer are evaluated separately at component level.
_____

### T2-10 — Which Anthropic model is the system migrating to, and what is uncertain?
**Read:** `sources/uva/2026-06-10-meeting-notes.md` · `sources/uva/2026-06-11-meeting-notes.md`
**Answer:** It is migrating to Anthropic's Claude Sonnet (noted as Claude 3.5 Sonnet) for generation. What's uncertain is whether to adopt the newer model Anthropic just released ("Fable 5"), available via the shared API key — it performs better but uses about twice the tokens, so the team is weighing the higher token cost against the quality gain.
_____
