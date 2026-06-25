# Ingestion token usage

Append-only ledger of Claude token usage per ingestion (read from the API `usage` field). `Total fed` = input + cache-read + cache-write — the true context size the model processed; prompt caching lowers the *bill*, not the context size.

| Timestamp | Project | Source | Pages | Input | Output | Cache read | Cache write | Total fed |
|---|---|---|---|---|---|---|---|---|
| 2026-06-19 10:10 | uva | KickstartAI_About_us.md | 6 | 2,570 | 5,960 | 6,936 | 6,936 | 16,442 |
| 2026-06-19 10:12 | uva | KickstartAI_homepage.md | 6 | 2,319 | 6,857 | 8,221 | 8,221 | 18,761 |
| 2026-06-19 10:14 | uva | KickstartAI_News.md | 7 | 2,479 | 9,419 | 9,988 | 9,988 | 22,455 |
| 2026-06-19 10:17 | uva | KickstartAI_Projects.md | 7 | 2,715 | 12,100 | 12,762 | 12,762 | 28,239 |
| 2026-06-19 10:27 | uva | 2026-04-10-Intro-email.md | 8 | 3,985 | 14,430 | 22,623 | 22,623 | 49,231 |
| 2026-06-19 10:34 | uva | 2026-04-13-Gantt_chart.md | 6 | 2,504 | 12,515 | 22,862 | 22,862 | 48,228 |
| 2026-06-19 10:39 | uva | 2026-04-13-KAI-Intro.md | 7 | 3,139 | 18,284 | 27,979 | 27,979 | 59,097 |
| 2026-06-19 10:43 | uva | 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md | 14 | 4,277 | 27,548 | 31,723 | 31,723 | 67,723 |
| 2026-06-19 10:47 | uva | 2026-04-13-KAI-UvA-Kickoff.md | 11 | 3,063 | 22,786 | 33,622 | 33,622 | 70,307 |
| 2026-06-19 10:52 | uva | 2026-04-16-supervisor-kickoff.md | 12 | 3,273 | 26,405 | 38,193 | 38,193 | 79,659 |
| 2026-06-19 10:58 | uva | 2026-04-22-presentation-slides.md | 17 | 4,244 | 35,648 | 45,180 | 45,180 | 94,604 |
| 2026-06-19 11:05 | uva | 2026-04-22-problem-definition.md | 18 | 5,353 | 44,019 | 56,471 | 56,471 | 118,295 |
| 2026-06-19 11:12 | uva | 2026-04-30-group-Sanne-email-content.md | 7 | 2,863 | 24,952 | 59,482 | 59,482 | 121,827 |
| 2026-06-19 11:17 | uva | 2026-05-14-meeting-notes.md | 10 | 3,779 | 32,806 | 61,997 | 61,997 | 127,773 |
| 2026-06-19 11:24 | uva | 2026-05-15-Laurenz-Sanne-email-content.md | 15 | 4,442 | 45,238 | 69,194 | 69,194 | 142,830 |
| 2026-06-19 11:42 | uva | 2026-06-04-meeting-notes.md | 9 | 3,819 | 38,795 | 76,843 | 76,843 | 157,505 |
| 2026-06-19 11:49 | uva | 2026-06-07-Xiaojing-Sanne-email-content.md | 11 | 5,741 | 50,180 | 84,804 | 84,804 | 175,349 |
| 2026-06-19 16:46 | uva | 2026-06-11-meeting-notes.md | 12 | 3,819 | 53,734 | 91,841 | 91,841 | 187,501 |
| 2026-06-19 16:55 | uva | 2026-06-12-mock-up-artifact.md | 14 | 5,862 | 56,556 | 103,944 | 103,944 | 213,750 |
| 2026-06-19 17:04 | uva | 2026-06-15-meeting-notes.md | 14 | 5,035 | 63,608 | 100,265 | 100,265 | 205,565 |
| 2026-06-22 17:02 | uva | 2026-06-17-MULTI-APP.md | 13 | 2,659 | 39,283 | 80,215 | 80,215 | 163,089 |
| 2026-06-22 17:15 | uva | 2026-06-18-Laurenz-evaluation-plan.md | 10 | 3,438 | 41,008 | 87,685 | 87,685 | 178,808 |
| 2026-06-22 17:37 | uva | 2026-06-18-meeting-notes.md | 10 | 2,321 | 38,533 | 95,127 | 95,127 | 192,575 |
