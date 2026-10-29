# Architecture Decision Records

## ADR-001 — Spring Boot is the primary API
**Status:** Accepted  
**Decision:** Use Java + Spring Boot for the main REST API and business workflows.  
**Reason:** Explicit team decision. Do not build a second primary FastAPI API.  
**Consequence:** Python is a separate internal processing service.

## ADR-002 — Python is a document-processing service
**Status:** Accepted  
**Decision:** Python owns OCR, PDF inspection, QR decoding and processing workers.  
**Consequence:** API contracts must be versioned; internal service is not exposed directly to browsers.

## ADR-003 — React frontend hosted on Vercel
**Status:** Accepted  
**Decision:** React + TypeScript frontend is deployed on Vercel.  
**Consequence:** Configure CORS, API base URL and separate preview/production environment variables.

## ADR-004 — AWS for backend infrastructure
**Status:** Accepted at cloud-provider level; service selection open  
**Decision:** Use AWS for backend hosting and supporting services.  
**Recommendation:** Evaluate App Runner vs ECS Fargate, RDS PostgreSQL, S3, CloudWatch, Secrets Manager and a managed queue/broker.

## ADR-005 — PostgreSQL for structured records
**Status:** Accepted  
**Decision:** PostgreSQL stores structured data and workflow state.  
**Consequence:** Use migrations and decimal types for currency.

## ADR-006 — AWS S3 for private object storage
**Status:** Accepted direction  
**Decision:** Use S3 in AWS and MinIO locally for S3-compatible development.  
**Consequence:** Keep object keys private; issue short-lived authorized access only.

## ADR-007 — Mock-first external integrations
**Status:** Accepted  
**Decision:** Default to deterministic mock adapters; no mock-to-live automatic fallback.  
**Consequence:** Production mode remains disabled until provider access is verified.

## ADR-008 — Candidate rules require approval
**Status:** Accepted  
**Decision:** Every legal/business rule is versioned and has source and approval metadata.  
**Consequence:** Unverified rules may run only in simulation/non-binding mode.
