# Prompt 04 — Versioned Rules Engine and Tamper-Evident Audit

Read `docs/REGULATORY_RULES_REGISTER.md`, `docs/SECURITY_PRIVACY_AND_AUDIT.md` and `docs/DATA_MODEL_BLUEPRINT.md`.

## Requirements
- Implement a generic versioned rule registry with `DRAFT`, `UNDER_REVIEW`, `APPROVED`, `RETIRED`.
- Only approved rules can drive binding workflow gates. Draft rules can run in explicitly labeled simulation mode.
- Store source name, URL/document ID, clause, source version, effective dates, scope, input schema, logic version, approver and tests.
- Implement check statuses `PASS`, `FAIL`, `INCONCLUSIVE`, `UNKNOWN`, `NOT_CHECKED`, `NOT_APPLICABLE`, `ERROR`.
- Ensure unknown/unavailable data does not pass a rule.
- Implement audit events with canonical serialization and SHA-256 hash chaining.
- Add a verifier that detects event modification, deletion, reordering and incorrect previous hashes in tests.
- Do not store unnecessary full snapshots or raw financial payloads in audit events.
- Add RBAC policy checks and tests for institution-level data isolation.
- Do not implement 10%/50% penalties or release hard locks as binding until sources have been verified and approved.

## Acceptance
- Rule status and approval gate are covered by tests.
- Audit chain tampering tests fail as expected.
- No unverified rule can authorize release.
