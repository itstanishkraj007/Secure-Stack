# Prompt 03 — Python Document Processing Service

Read the master prompt and architecture/security docs. Implement the internal processing service in `processing-service/`.

## Requirements
- Use FastAPI only for the internal processing service, with Pydantic request/response schemas.
- Add `GET /internal/v1/health/live` and `GET /internal/v1/health/ready`.
- Add a versioned endpoint for submitting/starting a processing job; protect it with an internal service credential or private network policy.
- Define normalized check types and statuses for PDF metadata, signature inspection, QR decode and OCR.
- Use PyMuPDF for PDF inspection, PyHanko for supported signature validation, OpenCV/ZBar for QR, and Tesseract for local OCR.
- If a dependency or system binary is unavailable, return a clear unsupported/error status; never fake success.
- Do not accept arbitrary local paths. Use a narrow object-storage adapter or a controlled test fixture path in tests only.
- Add upload/file/page/image/time limits and safe error handling.
- Return extraction fields with confidence and evidence references when available.
- Include limitations: OCR is not authenticity proof; QR decode is not signed-payload validation.
- Add unit tests for valid, malformed, encrypted, oversized and unsupported files using synthetic fixtures.

## Acceptance
- `pytest` passes.
- OpenAPI schema is available.
- Contract tests validate response shape.
- Service is not configured for public ingress.
