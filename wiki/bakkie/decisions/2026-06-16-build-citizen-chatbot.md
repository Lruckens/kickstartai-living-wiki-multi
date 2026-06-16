# Decision: Build citizen-facing Q&A chatbot for Gemeente Westerwoude

**Date:** 2026-06-16
**Status:** accepted

## Context
Project Bakkie was kicked off to deliver a tool for [[gemeente-westerwoude]] that helps citizens get answers about municipal services. Recorded at the [[2026-06-16-kickoff]] meeting.

## Decision
Build a citizen-facing Q&A chatbot that answers questions about permits and waste collection. The technical approach is a [[rag-pipeline]] over the municipality's public web pages.

## Milestone
- Working prototype by 2026-07-01.

## Participants
- [[sanne-wielinga]] — project lead
- [[joost-de-vries]] — municipality contact

## Consequences
- Establishes the project scope: permits and waste collection.
- Sets the RAG pipeline as the core technical foundation.
- See [[_gaps]] for open questions on data sources, tech stack, and success criteria.
