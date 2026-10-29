# Implementation Roadmap — 3 Milestones, 15 Steps

## Milestone 1 — Foundation

### Step 1: Repository and development environment
- Establish monorepo and branching conventions.
- Add documentation, `.gitignore`, `.env.example`, Docker Compose.
- Pin Java, Python, Node and tool versions.
- Define code formatting, linting and tests.
**Exit:** clean clone can start local dependencies.

### Step 2: Spring Boot API foundation
- Generate Java/Spring Boot application.
- Add configuration profiles, structured logging, correlation IDs and health/readiness endpoints.
- Add OpenAPI.
- Configure CORS for local React development.
**Exit:** API starts and health tests pass.

### Step 3: PostgreSQL, migrations and S3 abstraction
- Select Flyway or Liquibase for Spring Boot migrations.
- Add institution, instrument, document and job tables.
- Implement repository/service layer and private object-storage abstraction.
- Use MinIO locally and S3 in AWS.
**Exit:** migrations run from clean database; document metadata persists.

### Step 4: Verification contract and rules-engine skeleton
- Define independent verification checks and statuses.
- Define Python processing API contract.
- Define versioned candidate rules and approval states.
- Keep OCR output separate from confirmed source fields.
**Exit:** contract tests and example responses pass.

### Step 5: Mock adapters, audit design and seed scenarios
- Implement deterministic mock bank/AA/clearance adapters.
- Add audit-event schema and hash-chain verifier.
- Seed synthetic institution/instrument records.
- Add six repeatable demo scenarios.
**Exit:** full mock flow can be reproduced without live credentials.

## Milestone 2 — Core Application

### Step 6: React application shell
- Build routing, layout, accessible navigation and authentication-aware route guards.
- Apply restrained government-administrative visual style without impersonating an official site.
**Exit:** role-based shell and error/loading/empty states work.

### Step 7: Institution dashboard and eligibility workflow
- Instrument overview, submission form, eligibility inputs and supporting-document checklist.
- Use only approved/versioned calculations.
**Exit:** institution can create draft and submit synthetic case.

### Step 8: Document intake and extraction pipeline
- Upload, safe storage, asynchronous job creation and progress.
- OCR and PDF/QR processing.
**Exit:** document produces structured extraction with evidence and limitations.

### Step 9: Signature, QR and dual-source verification
- Run supported cryptographic checks.
- Compare submitted, extracted and trusted-provider fields.
- Create discrepancy records.
**Exit:** mismatch routes to review; unknown provider status stays unknown.

### Step 10: Scrutiny, AA consent and lifecycle workflows
- Exception queue, officer decisions, consent metadata, monthly status mock, maturity scheduler and renewal lineage.
**Exit:** reviewers can resolve a case and the lifecycle state updates with an audit event.

## Milestone 3 — Completion and Demonstration

### Step 11: Release, clearance and settlement
- Implement configurable clearance gates.
- Add rule-versioned penalty calculator only after rules are verified.
- Generate draft NOC/sanction artifacts; external execution remains gated.
**Exit:** release is blocked until every applicable approved gate passes.

### Step 12: Audit and security
- Complete RBAC, tenant isolation, audit hash verification, rate limiting, safe logging and secrets management.
**Exit:** security tests cover access boundaries and audit tampering.

### Step 13: Integration adapters
- Implement authorized sandbox providers as contracts become available.
- Add timeout, retry, idempotency, signature validation and observability.
**Exit:** each provider has contract tests and clear failure states.

### Step 14: End-to-end testing and demo
- Run unit, integration, API, UI and security tests.
- Prepare synthetic fixtures and demo reset script.
**Exit:** all six scenarios pass from a clean environment.

### Step 15: Deployment, documentation and final demo
- Deploy frontend to Vercel and backend/services to AWS.
- Configure secrets, DNS/TLS, logs, backups, monitoring and CI/CD.
- Publish operator/runbook and architecture notes.
**Exit:** tagged demo release can be deployed and recovered from documented instructions.

## Suggested sprint grouping

- Sprint 1: Steps 1–3
- Sprint 2: Steps 4–5
- Sprint 3: Steps 6–8
- Sprint 4: Steps 9–11
- Sprint 5: Steps 12–15

Adjust sprint lengths to the team's actual schedule; the grouping is a planning proposal.
