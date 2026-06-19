## The Living Project Wiki

The Self-Documenting AI Project 

KickstartAI × Universiteit van Amsterdam 

## 01 Background & Problem

Why knowledge gets lost at KickstartAI 

## 02 Project Concept

The Living Project Wiki — what it is 

## 03 DAPS Diagram

Problem definition 

## 04 System Architecture

Six integrated components 

## 05 MoSCoW Prioritization

Must · Should · Could · Won't 

## 06 Research Questions

Individual & group-level focus areas 

## 07 Methodology

DSR + CRISP-DM approach 

## About KickstartAI

Dutch non-profit foundation accelerating AI adoption in the Netherlands 

Partners include KLM, ING, Ahold Delhaize and NS 

Runs multiple applied AI projects simultaneously 

Knowledge is the core asset and it's fragmented 

## The Core Problem

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/548d164a-b100-4522-ab6f-7509978d5031/f4bf9fedf2576ec0025e610f2aca0367318ebdf6147b099041ab1eacc71b53f0.jpg)


Documents scattered across repos, drives & notes 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/548d164a-b100-4522-ab6f-7509978d5031/d45b7f1a597734e60523d6ba74aa5211053dbc8cac1b4d0e36aaec504802efed.jpg)


Critical knowledge lives only in people's minds 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/548d164a-b100-4522-ab6f-7509978d5031/93993f646d8b4cbc50c829759052460cfff7927100243658aa5c988baaf2804a.jpg)


No way to search or synthesise across sources 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/548d164a-b100-4522-ab6f-7509978d5031/032f1cc7ca4d759f3eaeec58eda1e1e48ba420ef84dd28b7bcc95da55e63495f.jpg)


Manual documentation can't keep pace with project pace 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/548d164a-b100-4522-ab6f-7509978d5031/97449ebc894a6070b5867634899027dd8a57ca9303dfa4bf6c8487db789b81b4.jpg)


Onboarding new team members is slow & costly 

A self-updating, AI-powered knowledge base that continuously ingests project documents and produces structured, current wiki pages automatically. 

## 01

## Eliminate Manual Work

Most up-to-date decisions summarised automatically. Periodic digests and content drafts generated from the wiki without manual effort. 

## 02

## Compounding Knowledge

Once built, architecture deploys across all KickstartAI projects via configuration. Cross-project learnings become systematically accessible. 

## 03

## The Meta-Twist

The first knowledge base this system documents is the project itself. A live, auto-generated record of how the system was built. 

Persistent Artifact Layer 

Data-Analytic Problem Layer 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/548d164a-b100-4522-ab6f-7509978d5031/68c8875e3ee0325d8d2bceb7ab2e6780d6bd51b567488ed948dab2eef0358ee0.jpg)


## 1

Ingestion Pipeline 

PDFs, markdown, GitHub repos, meeting transcripts 

## 2

Wiki Engine 

LLM-powered, RAG-grounded page generation & refresh 

## 3

Generator Module 

Weekly digests, stakeholder summaries, blog drafts 

## 4

Gap Detector 

Surfaces undocumented decisions & knowledge holes 

## 5

Permission Layer 

Access-controlled synthesis for sensitive content 

## 6

Evaluation Method 

Coverage, freshness, accuracy & usefulness 

## Must Have

Ingestion pipeline supporting PDFs, markdown, and meeting notes 

LLM-powered wiki generation engine with daily refresh 

Basic evaluation framework measuring accuracy and freshness 

## Could Have

Blog post draft generation with tone alignment 

Human-in-the-loop feedback integration 

Comparative evaluation of generated vs. human-written content 

## Should Have

Generator module producing weekly digests and stakeholder summaries 

Gap detector identifying underdocumented areas 

Permission layer design for access-controlled deployment 

## Won't Have

Full deployment to production KickstartAI projects (this iteration) 

Real-time (sub-daily) wiki updates 

Completely programmed and working permission layer 

Group RQ: How can a modular LLM-powered system turn heterogeneous project documents into a continuously updated structured knowledge base? 

## Member 1 — Ingestion Pipeline & Wiki Engine

How can a wiki generation system be designed to detect changes in a heterogeneous document corpus and produce a continuously updated structured knowledge base? 

## Member 2 — Generator Module

How can different LLM-based generation methods effectively produce periodic, stakeholder-specific project outputs, and how can the quality of these outputs be systematically evaluated? 

## Member 3 — Gap Detector

To what extent can rule-based, semantic and graph-based methods detect knowledge gaps in wiki systems? 

## Member 4 — Permission Layer

How can a permission-aware architecture be designed for an LLM-maintained knowledge base to mitigate information leakage from restricted source documents into synthesized wiki pages? 

## Design Science Research (DSR)

Relevance Cycle: Grounded in KickstartAI's real knowledge management challenges 

Rigor Cycle: RAG architectures, LLM evaluation, knowledge graph literature 

Design Cycle: Iterative prototyping and evaluation of each sub-system 

## CRISP-DM Process Model

1. Business Understanding → define fragmented knowledge problem 

2. Data Understanding → heterogeneous internal project documents 

3. Data Preparation → text extraction, tokenization, cleaning 

4. Modelling → build six integrated GenAI components 

5. Evaluation → coverage, freshness, accuracy, usefulness 

6. Deployment → integrated prototype with usage guide 

## Project Timeline — 12 weeks

Phase 1 

Weeks 1–4 · Problem definition & Design 

Phase 2 

Weeks 5–9 · Development & Iteration 

Phase 3 

Weeks 10–12 · Evaluation & Synthesis 

## Primary Deliverables

Modular production-oriented GenAI system (6 components) 

Technical README, architecture diagram & usage guide 

Working demo: system applied to its own documentation 

Group evaluation framework (coverage, freshness, accuracy, usefulness) 

Individual thesis per team member with component-level evaluation 

Reusable architecture deployable to any KickstartAI project 

## Business Impact

## Saves time

Eliminates manual knowledge compilation and status update writing 

## Cross-project learning

Learnings from one project become systematically accessible to all 

## Onboarding speed

New team members get up to speed faster from a live wiki 

## Leadership position

Positions KickstartAI as AI best-practice leader in the Netherlands 

## Reusable infra

Config-based deployment to any project — not a one-off solution 

## Thank You

Questions & Feedback 