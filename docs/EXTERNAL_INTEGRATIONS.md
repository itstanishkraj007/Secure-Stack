# External Integrations and Adapter Strategy

## 1. Rule: no assumed access

The team plan lists possible integrations such as MCA21, NGO-DARPAN, SHCIL e-Stamp, Entity DigiLocker, Setu AA, sponsor FIUs, bank CBS, NeSL/CERSAI, AICTE internal ERP, university/state DTE, PFMS, eSign and AISHE/UGC registries.

These are **integration candidates named in the planning file**. Their listed endpoints, credentials, availability and ability to support the proposed use case have not been verified by this foundation pack. Do not copy illustrative URLs or dummy API keys from planning notes into production configuration.

## 2. Adapter contract

Every provider should implement a common interface:
- `providerName`
- `capabilities`
- `healthCheck` (where supported)
- `verifyInstrument` or other narrowly defined operation
- normalized response model
- source reference / provider transaction ID
- fetched timestamp
- freshness metadata
- errors and retryability
- evidence/limitations
- provider schema version

Return a typed outcome such as `CONFIRMED`, `NOT_CONFIRMED`, `UNKNOWN`, `UNAVAILABLE`, `UNAUTHORIZED`, or `ERROR`; never manufacture a successful response in live mode.

## 3. Environment modes

### `SANDBOX_MOCK`
- Default local mode.
- Deterministic synthetic data.
- UI clearly labels results as simulated.
- No outbound provider calls.
- Mock results must include `sourceType=MOCK` and a synthetic source reference.

### `SANDBOX`
- Only actual sandbox endpoint and credentials authorized by the provider.
- Separate configuration from production.
- No production data unless expressly permitted.

### `PRODUCTION`
- Disabled by default.
- Requires approved credentials, endpoint documentation, network/security review, data-protection review, monitoring, timeout/retry policy and named owner.
- Require explicit deployment-time opt-in.
- No silent fallback from live mode to mock success.

## 4. Adapter candidates from planning material

| Provider/domain | Proposed purpose | State |
|---|---|---|
| Bank verification/CBS | Confirm instrument status, amount, lien or maturity | Requires bank authorization and API contract |
| Account Aggregator ecosystem / Setu or other TSP | Consent-based financial information | Requires FIU onboarding, consent design, provider contract and current schema |
| MCA21 / NGO-DARPAN | Entity information cross-check | Confirm public/authorized API availability and lawful purpose |
| SHCIL e-Stamp | Validate stamp certificate where relevant | Confirm actual verification mechanism and access terms |
| AICTE ERP | Institution approval and records | Internal access must be granted by AICTE |
| NeSL/CERSAI | Information/charge checks where legally and technically supported | Confirm entitlement and response semantics |
| University / State DTE | NOC/clearance status | Partner-specific integration required |
| PFMS | Sanction/settlement workflow | Authorized process and production access required |
| eSign provider | Sign generated artifact | Authorized ASP integration and signing ceremony required |
| AISHE/UGC | Institution registry enrichment | Confirm source and permitted use |

## 5. Secret names

Use generic environment names until the actual provider contract is known:
- `BANK_VERIFICATION_BASE_URL`
- `BANK_VERIFICATION_CLIENT_ID`
- `BANK_VERIFICATION_CLIENT_SECRET`
- `AA_PROVIDER_BASE_URL`
- `AA_PROVIDER_CLIENT_ID`
- `AA_PROVIDER_CLIENT_SECRET`
- `AICTE_INTERNAL_ERP_BASE_URL`
- `AICTE_INTERNAL_ERP_API_KEY`
- `PFMS_BASE_URL`
- `PFMS_API_KEY`
- `ESIGN_PROVIDER_BASE_URL`
- `ESIGN_PROVIDER_API_KEY`

Never commit values. Prefer AWS Secrets Manager/Parameter Store and short-lived workload identity where supported.
