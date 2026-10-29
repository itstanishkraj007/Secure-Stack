# Data Model Blueprint

This is a conceptual schema blueprint for implementation with PostgreSQL and versioned migrations. It is not a ready-to-run production DDL.

## Core entities

### Institution
- `id UUID`
- `aicte_permanent_id`
- `institution_name`
- `entity_type`
- `region_code`
- `profile_status`
- `created_at`, `updated_at`

### Instrument
- `id UUID`
- `institution_id`
- `instrument_type` (`FDR`, `RPGF`, `RTGS` — candidate types; validate)
- `instrument_number` (encrypted/tokenized or access-controlled as appropriate)
- `bank_name`
- `ifsc`
- `principal_amount NUMERIC(18,2)`
- `issue_date`, `maturity_date`
- `holder_name`
- `lien_status`
- `lifecycle_status`
- `parent_instrument_id` nullable
- `created_at`, `updated_at`

### Document
- `id UUID`
- `institution_id`
- `instrument_id` nullable until matched
- `document_type`
- `object_key` (private S3 key; never public URL)
- `original_filename` (sanitize; avoid leaking sensitive names)
- `media_type`
- `size_bytes`
- `sha256`
- `upload_actor_id`
- `uploaded_at`
- `retention_category`
- `malware_scan_status`
- `processing_status`

### ProcessingJob
- `id UUID`
- `document_id`
- `job_type`
- `status`
- `attempt_count`
- `correlation_id`
- `created_at`, `started_at`, `finished_at`
- `error_code` (no sensitive error dump)

### ExtractionRun / ExtractedField
- `id UUID`
- `document_id`
- `engine_name`, `engine_version`
- `status`
- `field_name`
- `field_value_normalized`
- `confidence`
- `page_number`
- `evidence_region_json`
- `human_confirmed_by`, `human_confirmed_at`

### VerificationCheck
- `id UUID`
- `instrument_id`
- `document_id`
- `check_type`
- `status`
- `source_type`
- `source_reference`
- `checked_at`
- `result_summary_json`
- `limitations_json`
- `rule_version_id`

### Discrepancy
- `id UUID`
- `instrument_id`
- `field_name`
- `submitted_value`
- `observed_value`
- `source_reference`
- `severity`
- `status`
- `assigned_to`
- `resolution_note`
- `created_at`, `resolved_at`

### ConsentMetadata
- `id UUID`
- `institution_id`
- `provider`
- `consent_handle`
- `status`
- `purpose`
- `data_types`
- `frequency`
- `valid_from`, `valid_until`
- `revoked_at`
- `created_at`

Do not store raw AA payloads or transaction arrays by default. Any exceptional retention requires explicit legal/privacy approval and documented purpose.

### ClearanceGate / ReleaseRequest
- `id UUID`
- `instrument_id`
- `release_request_id`
- `gate_type`
- `status`
- `evidence_document_id`
- `decision_actor_id`
- `decision_note`
- `decided_at`
- `rule_version_id`

### AuditEvent
- `id UUID`
- `sequence_number`
- `timestamp_utc`
- `actor_id`
- `actor_role`
- `action`
- `target_type`, `target_id`
- `correlation_id`
- `before_snapshot_hash`, `after_snapshot_hash`
- `previous_event_hash`, `event_hash`
- `reason_code`
- `metadata_minimized_json`

Avoid storing full before/after snapshots when they would duplicate sensitive personal or financial data unnecessarily.

## Database conventions

- UUID primary keys.
- `NUMERIC`, not float, for money.
- UTC timestamps.
- Foreign keys and appropriate uniqueness constraints.
- Index instrument lifecycle, maturity date, institution, processing status and assigned queue.
- Use Alembic/Flyway/Liquibase migrations; choose one migration system per service.
- Keep immutable audit events separate from mutable business records.
- Apply row/tenant scoping in repository/service layer and test for cross-institution access leaks.
