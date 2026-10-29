# Prompt 06 — Integration Tests and Six Demo Scenarios

Read `docs/DEMO_SCENARIOS.md` and `docs/ACCEPTANCE_CRITERIA.md`.

Implement deterministic synthetic fixtures for:
1. clean submission;
2. field mismatch;
3. provider unavailable;
4. maturity reminder;
5. renewal lineage;
6. release gate blocked.

## Requirements
- Provide a repeatable seed/reset command.
- Test complete API workflow from instrument submission to processing result and review.
- Use mock adapters only; every mock response visibly identifies itself.
- Add negative tests for unknown provider state, unauthorized role, cross-institution access, duplicate job submission and pending release gates.
- Add audit verification to the demo flow.
- Add frontend E2E tests for at least the main submission and blocked-release flows.
- Document how to run each scenario and what the user should see.
- Do not claim performance or accuracy targets unless measured and reproducible.

## Acceptance
- A clean local setup can run all six scenarios.
- Tests pass without external network access or live credentials.
- Demo reset produces the same IDs/data relationships or a documented deterministic seed.
