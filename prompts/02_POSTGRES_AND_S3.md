# Prompt 02 — PostgreSQL, Migrations and S3-compatible Storage

Read the master prompt, data model and security docs. Extend the Spring Boot service.

## Requirements
- Choose Flyway or Liquibase; explain the choice and do not use both.
- Add first migrations for institutions, instruments, documents, processing jobs, verification checks, discrepancies, rule definitions and audit events.
- Use UUID primary keys and `NUMERIC` for money.
- Add foreign keys, uniqueness constraints and indexes for common queues and maturity searches.
- Add repositories and service methods for one vertical slice: create synthetic institution → create instrument draft → attach document metadata.
- Implement object-storage interface with MinIO/local S3-compatible implementation and AWS S3 implementation using IAM role credentials in AWS.
- Store private object keys, not public URLs.
- Add tests using Testcontainers or a documented local integration-test profile.
- Document file retention metadata and private access approach.
- Ensure tenant/institution scope is enforced in service methods and tested.

## Acceptance
- Migration succeeds on empty PostgreSQL.
- CRUD flow is covered by tests.
- S3 adapter can upload/read/delete a synthetic fixture in local MinIO test mode.
- No public bucket policy and no hard-coded cloud credentials.
