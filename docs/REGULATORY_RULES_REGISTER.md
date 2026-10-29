# Regulatory and Business Rules Register

## Read this before implementing rules

The supplied `plan.txt` contains proposed rules and cites APH clauses, RBI directions, ReBIT schemas, DPDP Act 2023, IT Act 2000, CCA standards and other sources. The team presentation names RBI, Sahamati, NPCI, IRDAI and PFRDA as references.

**The presence of a citation or acronym in planning material does not establish that a rule is current, applicable to every instrument, or correctly interpreted.** This register preserves the concepts as candidates and defines how they must be verified. No web/legal validation is claimed in this pack.

For each binding rule, record:
1. exact authoritative source and URL/document identifier;
2. clause/page/paragraph and version/effective date;
3. affected institution, instrument and scenario;
4. approved interpretation and worked examples;
5. data needed and trusted source for each input;
6. exception handling and human-review requirement;
7. named business/legal approver and approval date;
8. automated tests and rule version.

## Candidate rules from the supplied plan

| ID | Candidate concept in `plan.txt` | Status for implementation | Verification required |
|---|---|---|---|
| RULE-01 | Instrument tri-classification: FDR/RPGF/RTGS and different settlement paths | `CANDIDATE / VERIFY` | Confirm permitted instruments, definitions and exact process in official current AICTE instructions |
| RULE-02 | APH Chapter 1 Table 1.4 slab calculation and possible leased-land multiplier | `CANDIDATE / VERIFY` | Confirm applicable APH edition, table, institution category, calculation and exceptions |
| RULE-03 | Long lock-in and joint RO lien mandate; plan states 8–10 years | `CANDIDATE / VERIFY` | Confirm exact tenure, lien wording, beneficiaries, instrument types and transition rules |
| RULE-04 | 10% penalty associated in the plan with Clause 2.22h and missing EoA | `CANDIDATE / VERIFY` | Confirm clause text, trigger, calculation base, exemptions and effective date |
| RULE-05 | 50% penalty associated in the plan with Clause 2.22i and six-year non-EoA | `CANDIDATE / VERIFY` | Confirm exact conditions, calculation base, interaction with other penalties and appeal process |
| RULE-06 | Non-refund lock on co-ed to women conversion | `CANDIDATE / VERIFY` | Confirm authoritative clause, scope, exceptions and approving authority |
| RULE-07 | Mandatory PGRC, Vigilance and Finance/Grants clearance gates | `CANDIDATE / VERIFY` | Confirm organizational process, required gates and evidence |
| RULE-08 | Clause 6.46(e) hard lock for bank/government embezzlement | `CANDIDATE / VERIFY` | Confirm exact clause, trigger source, due process and who can place/remove a hold |
| RULE-09 | Clause 2.22(d) university/state DTE Format-2 NOC | `CANDIDATE / VERIFY` | Confirm applicability and current form/procedure |
| RULE-10 | AA telemetry checks for overdraft, pre-maturity debit and consent revocation; ReBIT deposit/term-deposit schemas | `CANDIDATE / VERIFY` | Confirm current schemas, available fields, authorized purpose, consent scope and false-positive handling |
| RULE-11 | DPDP Act 2023 / AA data minimization and ephemeral processing | `CANDIDATE / VERIFY` | Legal/privacy review of applicable law, rules, commencement, obligations, retention and AA ecosystem requirements |

The plan also mentions IT Act 2000, CCA India trust anchors, PAdES-LTV, RFC 3161 timestamps, RBI NBFC-AA Master Direction, ReBIT DEPA consent, CERT-In logging, and provider-specific requirements. These should be registered as source-specific controls only after validating current official documents and applicability.

## Rule engine design

Represent rules as versioned records rather than hard-coded magic numbers.

Suggested fields:
- `rule_id`
- `title`
- `source_name`
- `source_url_or_document_id`
- `clause_reference`
- `source_version`
- `effective_from`, `effective_to`
- `status`: `DRAFT`, `UNDER_REVIEW`, `APPROVED`, `RETIRED`
- `jurisdiction_and_scope`
- `inputs_schema`
- `evaluation_logic_version`
- `severity`
- `required_evidence`
- `human_approval_required`
- `approved_by`, `approved_at`
- `test_case_ids`

Only `APPROVED` rules can trigger binding workflow gates. Draft rules may be evaluated in simulation mode with a visible label.

## Decision outcomes

Use outcomes such as:
- `PASS`: the check ran and its defined criteria were met.
- `FAIL`: the check ran and criteria were not met.
- `INCONCLUSIVE`: evidence exists but cannot support a reliable conclusion.
- `UNKNOWN`: required data/source is unavailable.
- `NOT_CHECKED`: check has not run.
- `NOT_APPLICABLE`: rule does not apply to this case.
- `ERROR`: processing failed.

A rule engine must not equate `UNKNOWN` with `PASS`.

## Signature and QR controls

- OCR is not authentication.
- QR decoding is not signature verification.
- A valid PDF signature proves integrity under the validated signing certificate and trust policy, not automatically the commercial truth of all document fields.
- Certificate chain, trust anchors, revocation status and timestamp support must be explicit.
- For printed/scanned receipts, use source confirmation and human review; image heuristics are not conclusive proof of forgery.
