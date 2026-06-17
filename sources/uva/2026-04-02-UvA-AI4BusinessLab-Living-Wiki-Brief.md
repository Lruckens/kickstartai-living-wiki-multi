## Challenge title

The Living Project Wiki: The Self-Documenting AI Project 

## Challenge description

KickstartAI is a non-profit foundation on a mission to accelerate AI adoption in the Dutch ecosystem, working with partners like KLM, ING, Ahold Delhaize, and NS. We run multiple applied AI projects simultaneously, each generating a constant stream of documents, meeting notes, design decisions, code repositories, and research findings spread across internal drives and tools. 

Currently, project knowledge lives in people’s heads and scattered documents. When stakeholders need a status update, someone must manually compile it. When learnings from one project could inform another, the connection is not always made. 

Inspired by Andrej Karpathy’s concept of an “LLM Wiki”, we want students to build a system that continuously ingests project documents and produces a living, auto-updating knowledge base – a wiki that rewrites and expands itself daily as new information arrives. The system should go beyond simple document search: it should synthesize, summarize, detect changes, and surface connections across a project’s knowledge base. 

The twist: the first project this system documents is itself. 

Students will start by ingesting KickstartAI’s existing public and internal onboarding materials, our two-pager, and UvA AI4Business Lab documentation. As the project progresses, every student PR, meeting note, design decision, and presentation deck gets added to the knowledge base. By the end of the project, the wiki is a complete, auto-generated record of how this system was built, and the architecture is ready to deploy to other KickstartAI projects. 

The engineering challenges are: (1) building an ingestion pipeline that handles heterogeneous document types (PDFs, markdown, GitHub repos, all meeting notes (transcriptions, notes), emails, slide decks), (2) producing structured wiki-style pages that stay current as source documents change, (3) extending the system with a generator that produces periodic summaries and opinionated content drafts (weekly digests, onboarding briefs, blog post drafts), and (4) designing a permission model so the architecture is ready to handle access-controlled documents when deployed to other projects. 

For students, this is a chance to go beyond "prompt engineering" and build a production-grade GenAI system. The architecture is designed for reuse across all KickstartAI projects once the initial use case is complete. 

## Expected Outcome

With this project we aim to support the following User Journeys: 

1. [THE KNOWLEDGE BASE] As a student joining the project in week 3, I want to query the wiki and get an accurate, synthesized overview of decisions made so far, without reading 40 documents. 

2. [THE CHANGE TRACKER] As a project contributor, I want the system to detect when a new PR is merged or a new meeting note is added, update the relevant wiki pages, and surface a summary of what changed and why it matters. 

3. [THE SUMMARIZER] As a KickstartAI project manager or stakeholder, I want to generate periodic project summaries (weekly digests, milestone reports) from the knowledge base, so that I have an up-to-date overview without requiring engineers to stop and write status reports. 

4. [THE CONTENT GENERATOR] As a KickstartAI content strategist, I want to generate draft blog posts or knowledge-sharing articles based on the project wiki, describing technical approaches, lessons learned, and replicable patterns, so that we can publish our learnings in KickstartAI’s voice, and establish thought leadership. 

5. [THE GAP DETECTOR] As a project lead, I want the system to tell me what’s underdocumented: decisions without rationale, PRs without explanations, and meetings without recorded outcomes, so I know where knowledge is at risk. 

Suggested sub-deliverables: 

1. Ingestion pipeline: A system that connects to internal document sources, handles heterogeneous file types, and maintains a versioned document index with change detection. 

2. Wiki generation engine: An LLM-powered system that processes ingested documents into structured, interlinked wiki pages organized by topic. Pages should regenerate or update on a configurable schedule (e.g., daily) as source material changes. 

3. Generator module: A module that produces periodic outputs from the wiki, such as weekly project digests, stakeholder summaries, or draft blog posts, aligned with a configurable tone and audience. 

4. Gap detector: Identifies underdocumented areas, unresolved decisions, or missing rationale. 

5. Permission layer: Design (and partial implementation) of document-level access control so the system is ready for sensitive projects. 

6. Evaluation framework: Measures coverage (are all important topics represented?), freshness (does the wiki reflect the latest documents?), accuracy (does it faithfully represent source material without hallucination?), and usefulness (do users actually find what they need?). Incorporate human-in-the-loop feedback to improve generation quality over time. 

## Data

## Kickstart Al

The project will utilize the following data sources: 

Project documents: KickstartAI’s two-pager, UvA AI4Business Lab documentation, and any relevant public KickstartAI materials, provided at project start. 

Live project data: Student PRs, meeting notes, design decisions, and presentation decks, added continuously as the project progresses. 

Human feedback data: Evaluation logs and user feedback collected during the project to refine wiki generation quality. 

## Additional comments and/or requirements

Students will be supported by a technical mentor who will provide engineering guidance and access to the source project. 

At KickstartAI we have a strong team of engineers implementing AI at scale. Students will have the opportunity to connect with them and discuss technical approaches. 

Privacy and permissions are a first-class concern, not an afterthought. The architecture must be designed with access controls in mind. The idea is that deploying to a sensitive project later should require configuration, not a rewrite. 

The blog post draft should be evaluated against a human-written version. This makes the creativity/opinion angle measurable. 