# The Living Project Wiki:

# Designing a Self-Documenting AI System for Automated Project Knowledge Management

Project Definition — Assignment 1a 

BSc Business Analytics Thesis 

University of Amsterdam 

<table><tr><td>Student Names</td><td>Laurenz Ruckensteiner-Geyer, Quinten van den Heuvel, Meng Cheng, Xiaojing Li</td></tr><tr><td>Student Numbers</td><td>13762931, 15150658, 14025906, 14851199</td></tr><tr><td>Date</td><td>April 2026</td></tr><tr><td>UvA Supervisor</td><td>Hongyi Zhu</td></tr><tr><td>Company</td><td>KickstartAI (Stichting Kickstart AI)</td></tr><tr><td>Company Contact</td><td>Sanne Wielinga</td></tr></table>

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/cc319c60-2c2c-4a59-af3d-3877564ee473/e628eaca2d9f130ffb94157a4643e2d44f6a7d981dceca20c833de99bdbbac10.jpg)


UNIVERSITEIT VAN AMSTERDAM 

KickstartAl 

## 1. Introduction

KickstartAI is a Dutch non-profit foundation dedicated to accelerating AI adoption in the Netherlands, working with partners including KLM, ING, Ahold Delhaize, and NS. Running multiple applied AI projects simultaneously, the organisation faces a fundamental challenge: project knowledge is fragmented across documents, meeting notes, code repositories, and people's minds, making it difficult to access, synthesise, and act upon. Existing solutions such as static wikis and document repositories rely on manual authoring, which does not scale in fast-moving project environments. 

This project addresses that challenge by designing and building a Living Project Wiki: a self-updating, AI-powered knowledge base that continuously ingests project documents and produces structured, current wiki pages without requiring continuous human effort to maintain it. Inspired by Karpathy's (2026) concept of an LLM Wiki, the system extends Retrieval-Augmented Generation (Lewis et al., 2020) with a persistent, compiled knowledge layer that addresses the statelessness limitation of conventional RAG systems. The first knowledge base this system documents is the project itself, ingesting KickstartAI's onboarding materials and every artefact the student team produces throughout the project. 

The research question guiding this project is: how can a modular LLM-powered system turn heterogeneous project documents into a continuously updated structured knowledge base? To answer this, the system is developed as five interconnected components, each the individual research focus of one group member. The ingestion and wiki generation engine handles document preprocessing, indexing, and synthesis into structured wiki pages. The generator module produces periodic outputs such as weekly digests and blog post drafts. The gap detector identifies underdocumented areas, missing rationale, and unresolved decisions within the knowledge base. The permission layer designs and implements document-level access control, ensuring the architecture is ready for deployment to sensitive projects. Finally, the evaluation framework, developed collectively, assesses the integrated system across dimensions of coverage, freshness, accuracy, and usefulness. Together these components form a modular, production-oriented system designed for reuse across KickstartAI projects with minimal reconfiguration. 

## 2. Business Understanding

## 2.1 Domain, Design & Artifact Literature

Large language models (LLMs) have emerged as highly capable systems for processing and synthesising natural language across a wide range of tasks. Brown et al. (2020) demonstrated that increasing model scale substantially improves performance on tasks without task-specific training, in some cases reaching competitiveness with models that were explicitly fine-tuned for those tasks, making LLMs practical for tasks such as document summarisation, question answering and content generation across heterogeneous input types. These are precisely the operations the Living Project Wiki must perform over meeting notes, presentations and design decisions. However, LLMs are trained on publicly available data and have no access to private organisational documents at inference time, and they are prone to generating plausible but factually unsupported outputs, commonly referred to as hallucination, when operating outside their training distribution (Ji et al., 2023). 

RAG was introduced to address both limitations by combining parametric LLM knowledge with a dynamically queried external document index. Lewis et al. (2020) proposed combining pre-trained parametric and non-parametric memory for language generation, demonstrating that RAG models generate more specific, diverse, and factual language than parametric-only baselines. The pipeline chunks and embeds documents into a vector index, retrieves the most relevant passages at query time, and passes them to the LLM to base its generation on verified source material. Gao et al. (2023) provide an overview of the evolution of RAG from naïve to advanced and modular architectures, noting that design choices across indexing, retrieval, and generation, such as chunking strategy, embedding model, and retrieval ranking, substantially affect output quality, and that RAG allows continuous knowledge updates as new documents are added to the index. 

The Living Project Wiki builds directly on this architecture but extends it to address a limitation Karpathy (2026) identifies with conventional RAG systems. In standard RAG, every query retrieves and synthesises from raw documents independently, with no accumulated understanding between queries. The artifact instead uses LLM and RAG capabilities as the foundation for a compiled, persistent knowledge layer, ingesting documents once, synthesising their content into structured wiki pages, and updating those pages as new information arrives. RAG principles remain central to grounding wiki page generation in verified source documents, but the system's contribution lies in the persistent, auto-updating knowledge structure that allows understanding to compound over time rather than being rediscovered on every query. 

## 2.2 Domain Context and Business Value

KickstartAI operates in an environment where multiple AI projects generate knowledge at a rate that outpaces manual documentation. The cost of fragmented knowledge is significant as stakeholders spend substantial time compiling status updates, cross-project learnings are not systematically captured, and onboarding new team members requires extensive effort. 

The proposed system targets three distinct value streams. First, it can eliminate the manual work of knowledge compilation. The most up-to-date decisions can be summarized and synthesized by the wiki without manual effort. Periodic summaries and opinionated content drafts are generated automatically from the wiki rather than written by engineers. Second, it creates a persistent, compounding knowledge infrastructure. Once built, the architecture can be deployed across all KickstartAI projects through configuration instead of rewriting it every time. Learnings from one project become accessible to others. This solid and well-organized knowledge wiki can deliver more robust and consistent value. Third, by providing this wiki as a best practice to its partners, KickstartAI can further demonstrate its leading position in the AI research field and accelerate AI adoption in the Dutch ecosystem. It can also accelerate innovation, feed back into the creation of new ideas, and support the overall development of the AI industry. 

Below is a GenAI-Analytic Problem Structure (GAPS) diagram (Mast & Lokkerbol, 2024) that provides a more detailed understanding of the problem definition. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/cc319c60-2c2c-4a59-af3d-3877564ee473/1819493fb68505c2b1bb44f7bfab5773d365427501018e439cf8d4db30784be3.jpg)


## 2.3 Goals, Requirements, Gaps, Design Principles and MoSCoW Prioritisation

The goal of this project is to build a production-ready, modular GenAI system that can be reused as a knowledge infrastructure for KickstartAI. The system must handle heterogeneous document types, maintain current wiki pages as source documents evolve, and generate periodic structured outputs. 

The core principles of this project are modularity, continuous learning and scalability. Modularity ensures that each component can function independently, developing, testing and maintenance without affecting the overall architecture (Bass, Clements, & Kazman, 2012). Continuous learning enables the system to adapt and improve over time by incorporating new data (Parisi et al., 2019). Scalability refers to the system’s ability to efficiently handle increasing amounts of data, users and computational demands (Dean & Ghemawat, 2008). Additional key principles include security, privacy and data protection, reliability and transparency (European Union, 2016; Kroll et al., 2017; NIST, 2020; ISO/IEC, 2019). 

The following MoSCoW prioritisation captures the core requirements: 

Must Have: Ingestion pipeline supporting PDFs, markdown, and meeting notes; LLM-powered wiki generation engine with daily refresh; basic evaluation framework measuring accuracy and freshness. 

Should Have: Generator module producing weekly digests and stakeholder summaries; gap detector identifying underdocumented areas; permission layer design for access-controlled deployment. 

Could Have: Blog post draft generation with tone alignment; human-in-the-loop feedback integration; comparative evaluation of generated vs. human-written content. 

Won't Have (this iteration): Full deployment to production KickstartAI projects; real-time (sub-daily) wiki updates; completely programmed and working permission layer. 

## 3. Research Questions and Artifact

## 3.1 Overall Group Research Question

The overarching research question guiding this project is: 

## How can a modular LLM-powered system turn heterogeneous project documents into a continuously updated structured knowledge base?

Each group member addresses one of the four core sub-systems that together compose the answer to this question. The individual research questions are detailed below. 

## 3.2 Individual Research Questions

## Member 1 — Ingestion Pipeline & Wiki Generation Engine

Research Question: How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base? 

This thesis investigates how a wiki generation system can detect changes in a heterogeneous document corpus and translate those changes into structured, updated wiki pages. The student researches change detection mechanisms, document versioning approaches, and wiki update strategies, comparing full page regeneration against incremental updates to evaluate their effect on the quality and consistency of the resulting knowledge base. 

## Member 2 — Generator Module

Research Question: How can different LLM-based generation methods effectively produce periodic, stakeholder-specific project outputs, and how can the quality of these outputs be systematically evaluated? 

The Generator Module is designed to produce periodic, stakeholder-specific outputs such as weekly project digests, stakeholder summaries, and draft blog posts. It transforms information from a continuously evolving project knowledge base into coherent, up-to-date content, tailored to different audiences, with configurable tone and level of detail. This research investigates multiple LLM-based generation strategies, including direct prompting, retrieval-augmented generation (RAG) or template-driven generation. Output quality is systematically evaluated across dimensions such as factual accuracy, freshness, coverage, and usefulness. 

## Member 3 — Gap Detector

Research Question: To what extent can rule-based, semantic and graph-based methods detect knowledge gaps in wiki systems? 

The Gap Detector is a component of the wiki system designed to identify absent or incomplete information within wiki knowledge bases. This includes, but is not limited, to underdocumented areas, missing rationales and unresolved decisions in project documentation. The final module will be integrated into the Wiki system, which can automatically analyse project documents and detect incomplete or incorrectly recorded areas. The system will ultimately generate a structured gap report that highlights missing or incomplete knowledge. This is achieved through an evaluation framework that compares different detection methods based on their accuracy and effectiveness. 

## Member 4 — Permission layer

Research Question: How can a permission-aware architecture be designed for an LLM-maintained knowledge base to mitigate information leakage from restricted source documents into synthesized wiki pages? 

Source documents can be categorized by assigning permission labels, restricting access accordingly. However, since the knowledge wiki provides synthesized and summarized content rather than raw documents, traditional access control is insufficient, and restricted information can be leaked to unauthorized users. This member addresses this problem by defining information leakage in the context of LLM synthesis, designing an architecture to prevent it, and evaluating the proposed solution. The result is a document-level permission layer that makes the system suitable for deployment in projects involving confidential or partner-sensitive information. 

## 3.3 Shared Deliverable: Evaluation Framework

All four members will collaboratively design and execute an integrated evaluation framework assessing the system as a whole across four dimensions: coverage (are all important topics represented in the wiki?), freshness (does the wiki reflect the most recent documents?), accuracy (does the wiki faithfully represent source material without hallucination?), and usefulness (do users find what they need?). Each member will additionally contribute component-level evaluation results for their own sub-system, enabling both local and end-to-end assessment. 

## 3.4 Final Artifact

The primary artifact is a modular, production-oriented GenAI system containing five integrated components: the ingestion pipeline, the wiki generation engine, the generator module, the gap detector, and the permission layer. The system will be documented with a technical README, architecture diagram, and usage guide. A working demonstration of the integrated system, applied to the team's own project documentation, will serve as the proof-of-concept delivery. 

## 4. Methodology and Research Design

## 4.1 Design Science Research

This project adopts Design Science Research (DSR) as its overarching methodology, following Hevner (2007). DSR is well-suited to this project because the central objective is to design, build, and evaluate a novel artifact — the Living Project Wiki system — rather than to test a hypothesis about an existing phenomenon. DSR provides a rigorous framework for iterative artifact development through three cycles: the Relevance Cycle (grounding the design in real business needs), the Rigor Cycle (drawing on and contributing to academic knowledge), and the Design Cycle (iterative design, prototyping, and evaluation). 

The Relevance Cycle is addressed by grounding the system requirements in KickstartAI's actual knowledge management challenges. The Rigor Cycle is addressed through literature reviews on RAG architectures, knowledge graph construction, LLM evaluation, and document change detection. The Design Cycle governs the iterative development and evaluation of each sub-system component. 

## 4.2 CRISP-DM

Within the DSR framework, the team will follow the CRISP-DM process model (Chapman et al., 2000; Martinez-Plumed et al., 2021) to structure the analytical and engineering work. CRISP-DM provides a structured, iterative workflow covering business understanding, data understanding, data preparation, modelling, evaluation, and deployment. This is particularly suitable given the data-intensive nature of the project, as it involves processing heterogeneous and unstructured text data, which the system heavily relies on. 

The project begins with the business understanding phase, in which the problem of fragmented project knowledge is translated into system requirements and its business value. In the data understanding phase, the team analyses a limited but evolving dataset consisting of internally generated materials such as meeting notes and project documentation. Despite its limited size, this data reflects the unstructured and heterogeneous nature of real-world project information. 

During the data preparation phase, these inputs are transformed into structured, machine-readable formats through processes such as text extraction, cleaning, tokenization, and chunking. The modelling phase focuses on developing the core system components, which leverage generative AI to produce outputs such as wiki pages and summaries, progressing from a conceptual mock-up, to a minimum viable product (MVP), and after ingesting the feedback to an artifact. 

In the evaluation phase, the quality of the generated outputs is assessed based on criteria such as coverage, freshness, accuracy, and usefulness, potentially in comparison with human-generated content. Finally, the deployment phase addresses the integration of components into a functional prototype. While full-scale deployment is outside the scope of this project, this phase includes considerations for how the system could be implemented and scaled in a real organizational context. 

Overall, CRISP-DM complements the DSR approach by providing a structured and iterative process for developing and evaluating the data-driven artifact ensuring methodological rigor throughout the project (Chapman et al., 2000; Martínez-Plumed et al., 2021). 

## 4.3 Research Procedure

The project will proceed in three broad phases: 

Phase 1 — Problem definition & Design (Weeks 1–4): This phase focuses on establishing a clear understanding of the problem domain and defining the project scope and objectives. Key activities include business understanding, requirement specification, and the division of work across sub-systems. Early project data is collected to establish a cold-start corpus using project definition documents, meeting notes, and onboarding materials 

Phase 2 — Development & Iteration (Weeks 5–9): In this phase, each team member conducts a focused literature review relevant to their assigned sub-system. Based on these insights, multiple design alternatives are explored and translated into a visual mock-up and a minimum viable product (MVP). The system components are developed iteratively, with continuous refinement based on internal testing and feedback. Initial integration between components is also established during this phase. 

Phase 3 — Evaluation and Synthesis (Weeks 10–12): The final phase focuses on completing the integrated system and evaluating its performance. A shared evaluation framework is applied to assess the quality and effectiveness of the system outputs. In 

parallel, the individual thesis components are finalized, and the overall findings are synthesized. The project concludes with the preparation of the final presentation and demonstration of the working prototype. 



ISO/IEC. (2019). ISO/IEC 27001:2013 Information security management systems Requirements. International Organization for Standardization. https://www.iso.org/standard/54534.html 



Each team member is responsible for conducting a literature review for their assigned sub-system, developing and evaluating multiple design alternatives, and documenting their findings in their individual thesis. The evaluation framework is collaboratively defined and applied to ensure consistency across components. 



Hevner, A. R. (2007). A three cycle view of design science research. Scandinavian Journal of Information Systems, 19(2), 87–92. 



## 5. References



Chapman, P., Clinton, J., Kerber, R., Khabaza, T., Reinartz, T., Shearer, C., & Wirth, R. (2000). CRISP-DM 1.0: Step-by-step data mining guide. SPSS Inc. 





KickstartAI. (n.d.). KickstartAI – Driving force for societal impact. https://kickstart.ai/ 





Martínez-Plumed, F., Contreras-Ochando, L., Ferri, C., Hernández-Orallo, J., Kull, M., Lachiche, N., Ramírez-Quintana, M. J., & Flach, P. (2021). CRISP-DM twenty years later: From data mining processes to data science trajectories. IEEE Transactions on Knowledge and Data Engineering, 33(8), 3048–3061. 





Karpathy, A. (2026). LLM knowledge bases [GitHub Gist]. https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f Retrieved April 2026. 





Lewis, P., Perez, E., Piktus, A., et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. Advances in Neural Information Processing Systems, 33, 9459–9474. 





Brown, T. B., Mann, B., Ryder, N., et al. (2020). Language models are few-shot learners. Advances in Neural Information Processing Systems, 33, 1877–1901. 





Ji, Z., Lee, N., Frieske, R., et al. (2023). Survey of hallucination in natural language generation. ACM Computing Surveys, 55(12), Article 248. 





Gao, Y., Xiong, Y., Gao, X., et al. (2023). Retrieval-augmented generation for large language models: A survey. arXiv preprint arXiv:2312.10997. 





de Mast, J., & Lokkerbol, J. (2024). DAPS diagrams for defining Data Science projects. Journal of Big Data, 11(1). https://doi.org/10.1186/s40537-024-00916-7 





Bass, L., Clements, P., & Kazman, R. (2012). Software architecture in practice (3rd ed.). Addison-Wesley. 





Parisi, G. I., Kemker, R., Part, J. L., Kanan, C., & Wermter, S. (2019). Continual lifelong learning with neural networks: A review. Neural Networks, 113, 54–71. https://doi.org/10.1016/j.neunet.2019.01.012 





Dean, J., & Ghemawat, S. (2008). MapReduce: Simplified data processing on large clusters. Communications of the ACM, 51(1), 107–113. https://doi.org/10.1145/1327452.1327492 





European Union. (2016). Regulation (EU) 2016/679 of the European Parliament and of the Council (General Data Protection Regulation). https://eur-lex.europa.eu/ 





Kroll, J. A., Huey, J., Barocas, S., Felten, E. W., Reidenberg, J. R., Robinson, D. G., & Yu, H. (2017). Accountable algorithms. University of Pennsylvania Law Review, 165(3), 633–705. https://doi.org/10.2139/ssrn.2765268 





National Institute of Standards and Technology. (2020). Security and privacy controls for information systems and organizations (NIST SP 800-53 Rev. https://doi.org/10.6028/NIST.SP.800-53r5 

