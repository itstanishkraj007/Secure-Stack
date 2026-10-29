# Project Charter — Secure Stack

## 1. SIH project identity

- Event: Smart India Hackathon 2026 (SIH 2026)
- Problem Statement ID: 26265
- Problem Statement title in the team presentation: “Streamline of security deposit/FDR portal”
- Theme: Smart Automation
- Category: Software
- Team: Secure Stack

This identification is taken from the team's six-page presentation. The supplied deck does not identify a team ID.

## 2. Problem being addressed

The team presentation describes a workflow where institutions submit security-deposit instruments, including Fixed Deposit Receipts (FDRs), and administrative officers must review their details, authenticity, current status, maturity, and release eligibility.

The stated pain points are:
- manual, time-consuming verification;
- high volume of receipts;
- risk of forged or altered documents;
- lack of timely visibility into maturity, closure, lien or encumbrance status;
- inconsistent bank document formats;
- high administrative effort and avoidable errors.

## 3. Product vision

Secure Stack is a role-based portal for submitting, checking, tracking and reviewing institution security-deposit instruments. It combines document extraction, supported PDF signature checks, QR decoding, record reconciliation, authorized status checks where available, lifecycle monitoring, human scrutiny and evidence-backed audit history.

The product should help officials make informed decisions. It must not represent OCR output, a decoded QR, an ML score, or a simulated API response as conclusive proof of authenticity.

## 4. Intended outcomes

1. A standardized submission workflow for supported instrument and supporting-document types.
2. Extracted FDR fields with source page/region and confidence where available.
3. Separate results for PDF signature, QR payload, record reconciliation and current status.
4. Exception-only review queues for mismatches, uncertain extraction, unsupported signatures and unavailable provider responses.
5. Maturity alerts and renewal lineage.
6. Release workflows with explicit, configurable clearance gates.
7. Traceable evidence reports and audit events.
8. A demo that works end-to-end with synthetic fixtures and mock providers.

## 5. Scope boundaries

### Prototype scope
- synthetic institution and FDR records;
- local or AWS-backed development infrastructure;
- role-based UI and API design;
- document processing pipeline and deterministic test fixtures;
- mock bank / AA / clearance adapters;
- candidate rules stored with source and approval status;
- audit event recording and hash-chain verification;
- judge-demo scenarios and operator documentation.

### Not assumed available
- production AICTE ERP credentials;
- direct access to any bank's core banking system;
- a production Account Aggregator FIU relationship;
- PFMS production APIs or signing credentials;
- e-stamp registry API access;
- university/state DTE NOC APIs;
- production eSign access;
- blanket authorization to fetch or retain financial data.

Those require confirmation from the relevant organization and legal/security review.

## 6. Product principles

- **Evidence over claims:** every result should identify how it was obtained.
- **Unknown is a valid outcome:** no response, stale data, unsupported format or failed consent should not be silently treated as compliant.
- **Human accountability:** high-impact decisions such as rejection, hard lock, release, refund and statutory penalty require authorized human approval unless the approved governing process explicitly states otherwise.
- **Least privilege:** users only see and perform authorized actions.
- **Privacy by design:** collect and retain only approved fields for a documented purpose.
- **Replaceable adapters:** integrations must be isolated behind interfaces and provider-specific implementations.
- **Reproducible demos:** deterministic synthetic fixtures; no dependence on live systems for judge demonstrations.
- **Explainable automation:** display evidence and rule IDs, not only an opaque score.

## 7. Success criteria

A prototype is successful when an authorized test user can submit a synthetic instrument, see extraction and verification evidence, observe discrepancies, route the case for review, track maturity/renewal state, and demonstrate a release gate—all with an audit trail and without falsely claiming a live bank check.
