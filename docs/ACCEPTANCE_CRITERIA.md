# Acceptance Criteria

## Foundation
- [ ] Repository can be cloned and initialized from README.
- [ ] No secret or real personal/financial data is committed.
- [ ] Docker Compose services have health checks and bind to localhost.
- [ ] Spring Boot API starts with local profile.
- [ ] Python processing service starts independently.
- [ ] React frontend starts independently.
- [ ] PostgreSQL migrations succeed from an empty database.
- [ ] S3-compatible object storage is private and accessible only through service credentials.
- [ ] OpenAPI and Python schema contracts are versioned.
- [ ] All external integrations default to deterministic mock mode.

## Verification
- [ ] OCR outputs are stored as extracted claims, not trusted truth.
- [ ] PDF signature, QR, OCR, source check and reconciliation have separate outcomes.
- [ ] Unknown/unavailable provider state never becomes pass.
- [ ] Every result records source type, time, evidence and limitations.
- [ ] Candidate rules cannot block/release cases until approved.
- [ ] Manual reviewer decisions include actor, time and reason.

## Privacy and security
- [ ] Server enforces role permissions and institution data isolation.
- [ ] Upload type, size and processing limits are enforced.
- [ ] Logs exclude secrets, OTPs, raw AA payloads and unnecessary personal data.
- [ ] Audit-chain verifier detects modified/deleted/reordered events in test fixtures.
- [ ] Consent revocation stops future mock/provider fetches as designed.
- [ ] Release cannot execute while required approved clearance gates are pending/held.

## Delivery
- [ ] Unit and integration tests run in CI.
- [ ] Demo data reset is deterministic.
- [ ] Deployment instructions distinguish local, preview, staging and production.
- [ ] AWS resources and Vercel environment variables are documented.
- [ ] All demo scenarios can be completed without live provider access.
