# Product Modules, Roles and Workflows

This document consolidates the role and module concepts in the team's `plan.txt` and the presentation. Advanced AI components in the plan are candidates, not commitments to implement all models in the hackathon prototype.

## 1. Four macro-modules

### Macro-module 1 — Institution Onboarding and Instrument Submission
Target route: `/portal/institution/*`

- Institution/entity profile and eligibility details.
- Instrument type selection: FDR, RPGF or RTGS (candidate classification; validate the official workflow).
- Document vault and pre-flight checks.
- Supporting documents and affidavit checklist.
- OCR-assisted field capture with human confirmation.
- Account Aggregator consent initiation, if a valid authorized integration exists.
- Maturity countdown, renewal submission and release request initiation.

### Macro-module 2 — Verification, Account Aggregator Surveillance and Scrutiny
Target route: `/portal/scrutiny/*`

- PDF signature and certificate checks where supported.
- QR decoding and payload validation where a trusted signing scheme exists.
- Submitted-versus-confirmed field comparison.
- Discrepancy codes and severity.
- Exception queue for uncertain or conflicting results.
- Monthly status checks only through an authorized consent-based provider.
- Manual verification path when APIs are unavailable.

### Macro-module 3 — Lifecycle Watchdog and Renewal Lineage
Shared routes: institution, scrutiny and executive dashboards.

- Configurable maturity reminder schedule.
- Escalation tiers and alert history.
- Renewal/replacement chain.
- Parent/child instrument relationships.
- Coverage gap calculation.
- Historical instrument preservation.
- Date simulation restricted to demo/test environments.

### Macro-module 4 — Clearance, Settlement and Executive Command
Target routes: `/portal/clearances/*`, `/portal/executive/*`

- Clearance gate checklist.
- Evidence dossier and officer comments.
- Applicable penalty calculation only after authoritative rules are verified.
- Bank NOC or other settlement artifact workflow where officially applicable.
- Executive KPIs and four proposed reports.
- Audit ledger, role management and integration configuration.

## 2. Five roles in the supplied plan

| Role ID | Role | Proposed route | Core permissions |
|---|---|---|---|
| `ROLE_INSTITUTION` | Institution Nodal Officer | `/portal/institution/*` | Manage institution submission, view own instruments, provide supporting documents, manage renewal and initiate release requests |
| `ROLE_SCRUTINY_RO` | Regional Scrutiny / Discrepancy Officer | `/portal/scrutiny/*` | Review assigned exceptions, compare submitted and confirmed fields, request clarification, record findings |
| `ROLE_CLEARANCE_CELL` | Internal Clearance Officer | `/portal/clearances/*` | Review assigned clearance gate, record clear/hold/reject with evidence |
| `ROLE_REGULATION_BUREAU` | Regulation Bureau Head / Release Authority | `/portal/executive/*` | View aggregate status, review eligible release cases, approve only authorized transitions |
| `ROLE_AUDITOR_ADMIN` | System Auditor / Super Admin | `/portal/executive/audit` | Inspect audit chain, manage system configuration and user access; should not silently alter historical audit events |

The exact role boundaries must be agreed by the product team. Super-admin technical privileges should not automatically imply authority to approve a financial release.

## 3. Proposed 12 mini-modules

### M1.1 — Entity and eligibility verifier
- Store entity identifiers and profile evidence.
- Compare entity names across sources when those sources are authorized.
- Calculate the applicable security-deposit requirement only from a verified, versioned rule set.
- Name matching is a hint for review, not proof of identity.

### M1.2 — Document vault and pre-flight validator
- Accept supported PDF/image formats with size limits.
- Calculate SHA-256 at ingestion.
- Store object metadata and private object key.
- Run file safety checks and document classification.
- Extract FDR fields and mark uncertain fields for confirmation.

### M1.3 — Account Aggregator consent initiator
- Display consent purpose, data types, frequency, duration and revocation status.
- Store consent identifiers and lifecycle metadata.
- Never simulate an active consent as if it were a live provider confirmation.
- Provider-specific FI types and schemas must be checked against current official specifications.

### M2.1 — PDF signature and QR verifier
- Inspect embedded signatures, ByteRange, digest and certificate chain as supported by the library.
- Apply configured trust anchors and revocation checks when available.
- Decode QR payloads and validate a signature only if the payload format and trust keys are documented.
- Keep image-based tamper heuristics separate from cryptographic verification.

### M2.2 — Dual-source comparator and discrepancy workstation
- Compare submitted fields against trusted/authorized evidence.
- Normalize dates, amounts, names and IFSC formats before comparison.
- Record exact field differences, source, timestamp and severity.
- Route material discrepancies to a human reviewer.

### M2.3 — Periodic status surveillance
- Poll only under valid consent and approved provider access.
- Report `UNKNOWN` for unavailable or inconclusive status.
- Flag evidence of liquidation, overdraft linkage or encumbrance only when the source/schema supports it.
- Minimize sensitive data and apply approved retention rules.

### M3.1 — Maturity scheduler and escalation dispatcher
- Configurable reminders (the plan proposes T-90, T-60, T-30, T-15 and T-0).
- Idempotent notification events and delivery logs.
- Escalation based on approved business rules.
- Simulated time travel only in demo/test mode.

### M3.2 — Renewal lineage tracker
- Link parent and replacement instruments.
- Preserve historical records.
- Compute coverage gap from dates and the approved policy.
- Require renewed instrument verification before treating it as valid replacement.

### M4.1 — Multi-cell clearance hub
- Separate clearance gates and evidence per responsible cell.
- Support pending, cleared, hold and rejected states.
- Make required gates configurable and versioned.
- Do not assume every proposed gate applies to every case until officially confirmed.

### M4.2 — Penalty and settlement engine
- Store the rule version, inputs, calculation steps and reviewer approval.
- Distinguish calculated amount from approved amount.
- Generate a draft artifact only after gates are satisfied.
- External bank release, PFMS or eSign execution must remain disabled until authorized.

### M4.3 — Executive dashboard and reports
- Lifecycle counts: Active, Expiring, Matured, Renewed, Released and Pending.
- Reports proposed in the plan: pending verifications, upcoming maturities, missing documents and intervention cases.
- Filters by region, institution and date, subject to access policy.
- CSV/PDF export with privacy controls.

### M4.4 — Audit ledger and RBAC guard
- Record actor, role, action, target, timestamp, correlation ID and before/after summary.
- Hash-chain events or use a tamper-evident external audit mechanism.
- Verify chain integrity.
- Restrict privileged actions and require explicit authorization for role changes.

## 4. Primary workflow

1. Institution creates or selects its profile.
2. Institution submits an instrument and supporting documents.
3. API validates upload metadata and stores the private file.
4. Python worker runs PDF inspection, QR decoding and OCR.
5. Spring Boot stores check results and reconciles submitted versus extracted/confirmed values.
6. Cases with uncertain evidence or discrepancies enter the scrutiny queue.
7. Authorized source checks run only when the adapter is configured and consent/authority is valid.
8. Officer records decision and rationale.
9. Verified instrument enters lifecycle monitoring.
10. Maturity alert or renewal flow starts as configured.
11. Release request enters clearance gates.
12. Authorized authority approves or rejects; settlement artifacts are generated only through the approved process.
13. Audit trail records the material actions.

## 5. AI/ML ideas in the supplied plan

The plan mentions Sentence-BERT/Jaro-Winkler entity matching, vision-language OCR, Legal-BERT lien text checks, CNN/ELA forgery heatmaps, discrepancy triage, Isolation Forest anomaly detection, XGBoost/SHAP risk scoring, RAG summaries, YOLO stamp detection, text-to-SQL and insider-threat anomaly detection.

These are not all necessary for a credible MVP. Prioritize deterministic extraction, signature/QR checks, comparison, evidence and review. Do not claim specific accuracy, latency or automation percentages until measured on representative, legally usable test data. An AI score must not substitute for an authorized source or human decision.
