# Technology Stack and Architecture

## 1. Stack decisions

| Layer | Technology | Decision |
|---|---|---|
| Web frontend | React + TypeScript | Confirmed from team deck |
| Frontend hosting | Vercel | Confirmed by team |
| Primary API | Java + Spring Boot | Confirmed by team |
| Document-processing API/worker | Python | Confirmed by team deck architecture |
| Database | PostgreSQL | Confirmed from team deck |
| Object storage | AWS S3 | AWS selected; S3 chosen over GCS |
| Async tasks | Celery + broker | Confirmed conceptually in team deck; broker choice remains open |
| PDF signature and inspection | PyHanko + PyMuPDF | From team deck; validate versions and support matrix |
| QR decoding | OpenCV + ZBar | From team deck |
| OCR | Tesseract initially; cloud document AI optional | Deck lists Tesseract / Doc AI as options |
| Containers | Docker | From team deck |
| Version control | GitHub | Confirmed by team |
| CI/CD | GitHub Actions | From team deck |
| AWS backend hosting | AWS compute service to be selected | Team confirmed AWS, but exact service is open |
| Managed database | Amazon RDS for PostgreSQL | Recommended, not yet confirmed |
| Message broker | Redis or RabbitMQ | Decision open; validate Celery support and operational needs |

## 2. Logical architecture

```text
Browser
  └── Vercel: React + TypeScript
       └── HTTPS REST API
            └── AWS: Spring Boot API
                 ├── PostgreSQL (structured data)
                 ├── S3 (original files and evidence artifacts)
                 ├── Job queue / broker
                 ├── Python processing service / Celery workers
                 │    ├── PyMuPDF / PyHanko
                 │    ├── OpenCV / ZBar
                 │    └── Tesseract / optional cloud OCR
                 └── External adapter interfaces
                      ├── Authorized bank verification
                      ├── Account Aggregator FIU/TSP
                      ├── authorized registries / clearance sources
                      └── settlement / eSign providers (future, gated)
```

## 3. Service responsibilities

### React frontend
- institution portal;
- scrutiny and discrepancy desk;
- clearance workflow;
- executive overview and reports;
- audit/configuration views;
- accessible form validation and clear state labels.

### Spring Boot API
- authentication and role authorization;
- institution, instrument and submission APIs;
- lifecycle and workflow transitions;
- rule evaluation orchestration;
- reconciliation;
- adapter orchestration;
- audit-event creation;
- signed URL issuance for authorized object access;
- job status and report APIs.

### Python processing service
- safe file-type inspection and limits;
- PDF metadata and signature inspection;
- QR detection/decoding;
- OCR and field extraction;
- normalized extraction output with confidence/evidence;
- optional image-quality/tamper-assistance experiments, clearly labeled as heuristic;
- Celery tasks for asynchronous/bulk work.

### PostgreSQL
- institution master;
- instrument records and versions;
- document metadata and cryptographic hashes;
- extraction runs;
- individual verification checks;
- source responses/summary evidence;
- discrepancies;
- review and clearance decisions;
- consent metadata (not unnecessary raw financial payloads);
- maturity alerts;
- audit events and rule versions.

### S3
- original submitted files;
- normalized derivatives only where justified;
- generated reports and evidence bundles;
- lifecycle/retention controls, private bucket, encryption, least-privilege access and audit logging.

## 4. AWS deployment direction

The team has confirmed AWS for backend hosting and Vercel for frontend deployment. The exact AWS service has not been selected.

Recommended prototype deployment choices:
- Spring Boot: AWS App Runner for simpler deployment, or ECS Fargate for more control.
- Python worker: ECS Fargate or the same container platform as a separate worker service.
- PostgreSQL: Amazon RDS for PostgreSQL.
- Files: Amazon S3 private bucket.
- Secrets: AWS Secrets Manager or Parameter Store.
- Logs/metrics: Amazon CloudWatch.
- Queue: Amazon ElastiCache for Redis if using Redis, or a managed RabbitMQ option if chosen.
- CI/CD: GitHub Actions with OIDC role assumption where feasible; avoid long-lived AWS keys in GitHub secrets.
- Network: private database and worker access; only required API ingress exposed publicly.

These are recommendations, not existing deployed resources.

## 5. Cross-service API contracts

Keep the Python service internal. The frontend should not call it directly.

Suggested first contracts:

`POST /internal/v1/process-jobs`
```json
{
  "documentId": "uuid",
  "objectKey": "private/object/key",
  "sha256": "hex-digest",
  "requestedChecks": ["PDF_METADATA", "SIGNATURE_INSPECTION", "QR_DECODE", "OCR"]
}
```

Example processing response:
```json
{
  "jobId": "uuid",
  "documentId": "uuid",
  "status": "COMPLETED",
  "checks": [
    {
      "checkType": "OCR",
      "status": "COMPLETED",
      "result": "FIELDS_EXTRACTED",
      "confidence": 0.91,
      "evidence": [{"page": 1, "field": "principalAmount", "value": "1000000.00"}],
      "limitations": ["OCR output is not proof of authenticity"]
    }
  ]
}
```

Use OpenAPI and JSON Schema to make the contract explicit. The sample values above are illustrative only.

## 6. Core status vocabulary

Prefer independent check statuses:
- `PASS`
- `FAIL`
- `INCONCLUSIVE`
- `NOT_APPLICABLE`
- `NOT_CHECKED`
- `UNKNOWN`
- `ERROR`

Avoid a single `verified=true` field that collapses different evidence sources into one conclusion.

## 7. Design constraints

- Idempotent job submission.
- Upload size and MIME validation.
- Malware scanning strategy before production.
- Strict timeouts and retry policies on provider calls.
- Correlation IDs across frontend/API/worker.
- Do not log secrets, raw bank statements, OTPs, tokens or unnecessary personal data.
- All timestamps in UTC in storage; render in the user's configured timezone.
- Amounts use decimal types, never binary floating point.
- Use migrations; do not rely on ad-hoc schema creation.
