# Six Judge-Demo Scenarios

All records must be synthetic. The exact outcomes below are proposed demo expectations, not legal determinations.

## Scenario 1 — Clean synthetic submission
- Upload a synthetic FDR PDF.
- OCR extracts expected fields.
- QR/signature checks show their actual test-fixture results.
- Mock bank adapter returns a clearly labeled simulated confirmation.
- Comparator finds no discrepancy.
**Expected:** `PENDING_REVIEW` or `ACTIVE_VERIFIED` only according to the explicitly configured demo policy; UI labels all mock evidence.

## Scenario 2 — Field mismatch
- Submitted principal differs from extracted or mock-confirmed principal.
**Expected:** discrepancy record with field-level values, evidence source, severity and reviewer queue entry.

## Scenario 3 — Unavailable provider
- Mock bank adapter is configured to time out or return unavailable.
**Expected:** source status `UNKNOWN`/`UNAVAILABLE`; never auto-pass due to missing response.

## Scenario 4 — Maturity reminder
- Set a synthetic instrument maturity date within a configured reminder window.
- Trigger scheduler with a controlled demo clock.
**Expected:** one idempotent alert event, visible countdown and audit record.

## Scenario 5 — Renewal lineage
- Link a replacement instrument to a parent instrument.
- Demonstrate date coverage and historical preservation.
**Expected:** lineage tree with parent retained and gap calculation shown; any policy threshold must be configured and labeled.

## Scenario 6 — Release gate blocked
- Create a release request with one required clearance pending or on hold.
**Expected:** settlement action remains blocked; UI explains which gate is incomplete and who may resolve it.

## Demo hygiene
- Reset fixtures between runs.
- Use synthetic names, identifiers, account numbers and documents.
- Keep `SIMULATED_DATE_OFFSET_DAYS` disabled outside demo/test.
- Label mock responses at every user-visible point.
- Never demonstrate a simulated bank/AA response as a real integration.
