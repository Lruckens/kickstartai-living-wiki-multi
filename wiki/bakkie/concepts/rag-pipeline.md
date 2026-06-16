# RAG pipeline

**Type:** Concept (technical approach)

## Summary
Retrieval-Augmented Generation (RAG) is the core technical approach for Project Bakkie. The chatbot retrieves relevant content from [[gemeente-westerwoude]]'s public web pages and uses it to ground generated answers about permits and waste collection.

## Why it matters
- Foundation of the citizen Q&A chatbot (see [[2026-06-16-build-citizen-chatbot]]).
- Keeps answers grounded in authoritative municipal content rather than model knowledge alone.

## Open questions
- Which specific web pages / domains are crawled?
- LLM, vector store, and embedding model choices not yet decided. See [[_gaps]].

## Related
- [[2026-06-16-kickoff]]
