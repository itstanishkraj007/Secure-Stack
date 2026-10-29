# Security, Privacy and Audit Design

## 1. Threat model

Protect against:
- forged or modified uploads;
- malicious PDFs, images, QR payloads and decompression bombs;
- unauthorized access to another institution's records;
- credential leakage and privilege escalation;
- replayed or duplicate requests;
- compromised or spoofed external provider responses;
- unsafe bulk processing and denial of service;
- accidental disclosure through logs, reports, URLs or browser storage;
- insider misuse and unauthorized release decisions;
- audit-event deletion or alteration.

## 2. Minimum controls for prototype

- Validate file extension, MIME signature, size and page count; never trust filename alone.
- Use random object keys and private buckets.
- Calculate SHA-256 at upload; verify the stored object when needed.
- Set upload, extraction, page-count, CPU and wall-clock limits.
- Run malware scanning before production acceptance.
- Keep OCR/PDF processing isolated from the public API; treat documents as untrusted input.
- Require authentication for non-public API routes.
- Enforce role authorization on the server, not only in React.
- Enforce institution-level data access in every read/write query.
- Use CSRF protection where cookie-based sessions are used; use secure token practices for the selected auth design.
- Rate-limit authentication, uploads and expensive processing endpoints.
- Do not log tokens, passwords, OTPs, raw AA payloads or full bank details.
- Use HTTPS in deployed environments.
- Keep secrets in a managed secret store; rotate them.
- Separate local, preview, staging and production environments.
- Back up the database and test restoration.
- Record security-relevant actions in audit events.

## 3. Audit hash-chain concept

For each event, canonicalize the permitted event payload and calculate:

`event_hash = SHA256(previous_event_hash || canonical_event_payload)`

Store the previous hash and current hash. A verifier recomputes the chain and reports the first mismatch. Use deterministic canonicalization, fixed timestamp formatting, UTF-8 and a documented serialization format.

A hash chain alone does not prevent a privileged attacker from rewriting the entire database and recomputing hashes. For stronger tamper evidence, periodically anchor hashes to a separately controlled system, immutable storage or independently administered log destination.

## 4. Account Aggregator and financial data

- Store consent handle, status, purpose, expiry and approved metadata—not unnecessary raw transaction payloads.
- Validate provider response authenticity and schema.
- Process only data fields necessary for the stated purpose.
- Clear sensitive transient buffers as far as the runtime permits; do not claim memory wiping guarantees that the runtime cannot provide.
- Make consent revocation visible and stop future fetches when required.
- Treat missing, stale or failed provider data as `UNKNOWN`/`ERROR`, not compliant.
- Obtain legal/privacy/security review of applicable DPDP obligations and AA ecosystem requirements before live data access.

## 5. AI and human oversight

- Keep model version, input evidence, confidence and limitations.
- Avoid training on sensitive institutional/financial data without an approved lawful basis and governance.
- Do not automatically reject or release an instrument solely on a model score.
- Allow reviewers to see source fields, mismatch details and explanation.
- Record overrides with actor, timestamp and reason.
