# Integrations

**Concept:** System integration landscape

## Summary
The assistant must integrate with three existing client systems to support both informing and acting:

- **[[afvalkern]]** — collection scheduling and bin registration. Supplied by [[omgevingssoft-bv]], with contractually exclusive read/write access. Required API endpoints do not yet exist and have not been scoped with the vendor.
- **[[mor]]** — meldingen openbare ruimte; the assistant must file meldingen.
- **Generic CMS** — the gemeente website platform hosting the assistant.

## Key dependency / risk
The OmgevingsSoft exclusivity on AfvalKern read/write is a critical-path dependency. No discussion has yet taken place about delivering the new endpoints (scope, cost, timeline unknown). See [[_gaps]].

## Related
- [[scope-fase-1]], [[avg-dpia]], [[pieter-hoogstra]]
