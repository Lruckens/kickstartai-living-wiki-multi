**Living Wiki UI — Mock Up Artifact Description & Feedback**

The Living Wiki UI is a React/Vite web app (with a FastAPI backend on localhost:8000) that gives the team a single interface to read, maintain, and operate the LLM-owned project wiki — without touching the terminal or Claude Code directly.

**Wiki view**

A read-only browser for the /wiki knowledge base. A sidebar groups all markdown pages by category: Overview, Concepts, Decisions, Deliverables, Entities, Meetings, and Generated outputs with live page counts, collapsible sections, and title search. The selected page renders as formatted markdown, and Obsidian-style [[slug]] cross-references are rewritten into clickable internal links, so readers can hop between related decisions, people, and concepts the same way the LLM cross-references them. The content is always the current state on disk: whatever the ingestion pipeline last wrote is what the team sees.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/31062bab7129db7800530e277345dde8fc5e38d59a2d0a1ff04e9ca1afc332c9.png)

**Operations view**

The control surface for the three wiki-maintenance operations defined in CLAUDE.md, each as a tab with live streamed output:

Ingest — drag-and-drop (or pick) a source document; it's uploaded to /sources, then processed in three phases, all streamed live to the screen: (1) Claude analyses the document against the existing wiki and streams its reasoning, classification, key takeaways, conflicts, planned page changes; (2) the planned changes are applied as complete wiki files, with a live character-count progress indicator; (3) the updated wiki is committed and pushed to the main branch by a wiki bot, so the repository always reflects the latest knowledge state. The UI reports created/updated pages and push status, with links back into the Wiki view.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/211a2a44514edd53aefdb4aadf8104a94dfa1cd48ac168294c7ffef370237fe7.png)

Query — ask a natural-language question; Claude answers from the wiki content only, streaming the response token-by-token with [[page]] citations.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/764c1f3a069408363bd3151b12fef1f70f4a98bd2f1e1285f6f606439cd017dd.png)

Lint — one-click wiki health check that streams a report on contradictions, stale content, orphan pages, missing concept pages and cross-references, underdocumented decisions, and unresolved gaps.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/211a2a44514edd53aefdb4aadf8104a94dfa1cd48ac168294c7ffef370237fe7.png)

Together, the two views close the loop of the Karpathy-style LLM-wiki pattern: documents go in through Operations, knowledge compounds in the wiki, and the team reads the always-current result in the Wiki view.

**Technical Description
Stack & local connection**

The frontend is a React/TypeScript app served by Vite; it talks directly to the FastAPI backend on localhost:8000. There's no database — the wiki is the markdown files on disk, and the backend is a thin layer that reads them, calls Claude, and writes them back.

**Wiki view (read path)**

Two simple endpoints: GET /wiki/pages scans wiki/\*\*/\*.md and returns a catalog (title, category, slug); GET /wiki/page?path=… returns one page's raw markdown. The frontend renders it with react-markdown and rewrites [[slug]] cross-references into clickable in-app links — so the LLM's linking convention becomes navigation, without changing the stored files.

**Operations view (write path)**

All three operations stream results live via Server-Sent Events (the backend yields JSON frames, the frontend consumes them with a fetch-based stream reader):

Query / Lint — concatenate the entire wiki into one prompt, stream Claude's answer or health report back token-by-token.

Ingest — three phases in one stream:

Analyse: the uploaded source (PDF/markdown) plus the full wiki go to Claude, which streams its plan — classification, conflicts, pages to update.

Apply: a second Claude call outputs JSON containing complete file contents for every affected page; the backend writes them into /wiki.

Push: the updated wiki is committed to GitHub main.

**GitHub connection**

The push happens through a temporary git worktree: the backend fetches origin/main, checks it out into a temp directory, copies the updated wiki/ (and the new source file) in, commits as a dedicated Wiki Bot identity, and pushes HEAD:main — then deletes the worktree. This keeps the developer's working branch untouched while the wiki on main always reflects the latest ingested knowledge, with an attributable, append-only commit history.

**Generator View**

**MVP showcase:**
Users can configure the output type, stakeholder, tone and length in the UI (created with Lovable). These settings are shown in steps 1, 2 and 3. In step 4, users can mention explicit details that should or should not be included in the output. Whenever a user presses the generate button when configuring the desired output, the result will appear in the panel right to the settings.
 The fixed output types are determined in collaboration with KickstartAI during a discussion.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/72ae86aa417b06e081c1261830518c76855e57d6d7e6646bb32fd2d3612d3397.png)

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/a6499fc563fe4fc50e63935eb11ecdd58fccf4f664d0093a72b1e3bc237aecba.png)

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/ff4809be1781388b849b88267192597f41d4ef9aaabca8a8b07e785bd2d2b0fa.png)

Below is an example of a brief and conversational LinkedIn draft.
Note:The June demo is not yet recorded in our wiki here; therefore, the draft mentions we are in the final stretch.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/3f4a57ef9944ef3f3200b0108a58b0e80d158f3950713f37e2e57e3a8fd26ca8.png)

**Generator module technical explanation:**

Step 1: Added the ‘generate’ operation with the instructions to the CLAUDE.md file. These instructions are based on the functional design written in Quinten’s thesis. Claude follows these instructions from CLAUDE.md before generating content, such that it always performs the operation correctly.

Step 2: The wiki/generator directory is added. Once a generated output needs to be saved, they are stored in this directory.

Step 3: The API key we received from KickstartAI is stored in .env, which is gitignored so it won’t get committed or pushed to the GitHub page. The .env.example is a template of the API key that is committed to show what variables are needed but with placeholder values.

Step 4: The Lovable UI was connected to a GitHub repo to easier observe and modify the code behind it. The functional code of the UI serves as the frontend, where the user configures the desired output. In the visual mock-up, a backend was missing to connect the UI to the actual content.

Step 5: Python and FastAPI (Python framework for building backend APIs) were installed on my laptop. The backend server runs on local laptops (which is where the challenge comes in). The UI sends a configured request to the backend, the backend sends the real prompt (which consists of the instructions based on the CLAUDE.md file, the relevant wiki pages/content, and the configuration of the desired output in the frontend) to Anthropic and passes the result back to the UI. Note that the relevant wiki pages/content are gathered by a separate wiki-reader Python code such that the LLM has a real project context to generate upon.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/2b127a80b383e7d80f5328def02051892bf70dac9f53bac0a497f76b139659d0.png)

To summarize: the Lovable UI sends a request to my local backend, which calls Anthropic using the guarded API key and sends the instructions, relevant context and output configuration in a prompt. The Anthropic LLM then generates the output and passes it to the backend, who passes it back to the frontend. See image on the right for the workflow.

Step 6: I have sent these transformations in a pull request to Laurenz’ main GitHub so that it was integrated into the actual wiki and not just my clone.

**Problem:**
Currently, this backend runs locally on my laptop, meaning the generator only works while I'm running it. The next step would be deploying it somewhere centrally accessible so the wider team can use it. Otherwise, each member needs to have the right installations to use it.

**Permission Layer**

**Design**

Below are the screenshots of the UI.

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/55a0252096d8c124092745f5ab81b9d992edbf69055dcb6ab3ed300ca60c1c5e.png)

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/1a2553d21edc9d59273414730167d2d6226cfd31ffce5080f796806878f474cc.png)

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/13cc1cb58422056589133407a810ab3054377279a311d135b9177d72fcd575e0.png)

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/d17d50284c82b1eecb4773d0733c6e349adaf2d5724e61e3854fcf8f13de7922.png)

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/65b92ef50d9636c66f5bbef4f5c1705c078f02a79ce11f2d170cd6b5d9cf04f8.png)

**Description**

To use the wiki, users log in with their assigned user\_id and password. For KickstartAI, the use\_id is the email, which follows the format first\_name.last\_name@kickstart.ai. Once logged in, the system identifies the user automatically for all subsequent actions.

The interface has two tabs: Ingestion and Generator.

Ingestion is where users upload new documents to the wiki. Each document must be assigned a visibility label: public, internal, or restricted. For restricted documents, the user must also specify the project the document belongs to. If it is a new project, the name can be typed in manually; if the project already exists, it can be selected from a dropdown. This ensures that restricted content is always tied to a specific project, and only users authorized for that project can access it.

Generator allows users to request a wiki page. The user's identity is already known from the session. For public and internal pages, no additional input is needed, the system automatically selects the appropriate documents and passes them to the generator. For restricted pages, the user selects the relevant project from a dropdown. The dropdown only shows projects the user is authorized for, so cross-project access is not possible.

When a new user joins the company or a project, they are added to the authentication system, which grants them access to the corresponding restricted content. When a user leaves, their account is removed and access is revoked.

For this prototype, three demo accounts have been created without passwords to demonstrate the functionality. Authentication setup for production deployment is outside the scope of this thesis and it can be done by KickstartAI for future work.

**Feedback**

I showed the UI to Sanne and we discussed how user login should work. My initial concern was that assigning separate user IDs and passwords to every KickstartAI member would be impractical for this thesis. Sanne suggested using the email address as the user ID and setting up a few dummy accounts to demonstrate the functionality. I updated the prototype based on this, adding a login page that takes an email address, without requiring a password for now.

For the final artifact, I plan to add all group members and Sanne to the system and assign project access accordingly. Any further authentication work, such as password setup and access control integration, can be taken up by KickstartAI.

**Gap detector:**

<a id="_mnilw1ubwek0"></a>
## **Design :**

A hybrid framework combining rule-based detection, semantic analysis and graph analysis to identify and prioritize knowledge gaps in project documentation. The system is built on top of a wiki ingestion pipeline that extracts, structures and analyzes project knowledge from different documentation sources.

<a id="_ixta3b58sjns"></a>
## **Process:**

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/01b10cbcfe07da21abe710997242b611fe4abe6e98318248d18037f07f5cea5e.png)

**Description:**

<a id="_ku58ipu2ja8t"></a>
### **1. Rule-Based Layer**

The first layer applies deterministic rules to detect explicit, structural and keyword-based gaps. It identifies missing sections, incomplete structures and predefined missing-information patterns based on a fixed gap definition schema.

<a id="_4994615jr5do"></a>
### **2. Semantic Analysis Layer**

<a id="_a4cz7jqm3wst"></a>
### This layer detects implicit expression gaps and semantic inconsistencies that cannot be captured by rule-based methods. It combines: LLM-based reasoning (prompt-driven) and cosine similarity over embeddings. 

<a id="_cuocmzs3zfpb"></a>
### **3. Graph Analysis Layer**

This layer models documents as a knowledge graph. Claude extracts entities and typed relationships from text NetworkX. DiGraph constructs the graph. Graph algorithms detect relational and reasoning gaps. It identifies issues such as missing dependencies, orphan nodes and broken reasoning chains.

<a id="_1u37tblgk67l"></a>
### **4. Gap Aggregation Layer**

This layer merges outputs from all detection layers by: Deduplicating overlapping gaps, merging multi-source evidence, tracking frequency across layers, enriching gaps with affected entities. It produces a unified, structured gap representation.

<a id="_3bw77vrtvexh"></a>
### **5. Ranking Layer (Hybrid)**

A hybrid ranking approach combining LLM reasoning and deterministic scoring. For each gap, the model estimates: Severity, Impact, Confidence and Frequency. Final Score = (0.45 × Severity + 0.40 × Impact + 0.15 × Frequency) × Risk Multiplier

Risk levels: High = 1.1, Medium = 1.0, Low = 0.9

Confidence is reported separately as a reliability indicator.

<a id="_8momq78vfmai"></a>
### **6. Gap Report Layer**

The final layer outputs a ranked list of documentation gaps, prioritised by business impact. Each gap includes: Evidence, Category, Priority score, Root cause and Concrete fix recommendation.

<a id="_b7ao8ra9385c"></a>
## **Final Output**

The system produces a structured, ranked gap report highlighting the most critical knowledge deficiencies and actionable improvements for the documentation system.

**Below are the screenshots of the UI(final report).**

*Individual gap report inside the overview report：*

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/9ea65f73cdd15abc5464c3ad32da13bb26d69ba306b971ef2cc7b8e516fa21e5.png)

*Overview of the gap report：*

![](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/b205dd2c-f05d-418b-b583-e17f2cfe3004/fca281e3994154f951bf20be1e01005eaec4b917efcc73e8f4ec7a1bd021628c.png)

**Feedback:**

The scoring methodology would benefit from greater transparency and justification. Currently, the ranking layer combines importance (significance) and confidence (reliability) into a single score, which may lead to misleading prioritization; these dimensions should be presented separately. In addition, the detection thresholds used for Precision, Recall, and F1 calculations should be clearly justified or empirically validated. The score weights and risk multipliers also appear to be manually defined and would be strengthened by supporting rationale, testing or expert judgment. Overall, documenting the basis for thresholds and weighting choices and separating confidence from impact, would improve the transparency and defensibility of the methodology.

**Overall Feedback form Supervisor**
Overall, the company contact (Sanne) was ‘impressed’ with the work we have done. She did not expect our wiki to be this far and functioning already. She was especially pleased with the connection between the UI and the technical architecture behind the wiki.

She told us that we must be aware that we do not make the usage too technical, as anyone within the company should be able to work with it, without being overwhelmed or not being able to understand the wiki. This was especially the case for the gap detector and the permission layer.

She advised us to investigate Vercel, which provides an AI cloud to build and deploy small apps on a URL-domain. This is relevant because the current host of the backend server is the local laptops of the users, while Vercel provides the URL to host the backend server. As our application is not very large, a free plan should be sufficient.
Although deployment is outside the scope of the project, we would like to try such a tool out and see what will come out of it.

The biggest challenge and focus will be on integrating each of the UIs into one working system. Sanne highlighted this as well.
Besides, we are currently at the stage where evaluation becomes more important. Sanne said that evaluation may be hard to systematically implement in our project, but she advised us to look for circa three metrics in academic sources or the internet and apply them to see what will come out of it.