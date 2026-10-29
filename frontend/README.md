# AICTE SDMS — Frontend Application (SecureStack)

Government-grade, high-density React 18 + TypeScript web application for the All India Council for Technical Education (AICTE) Security Deposit / Fixed Deposit Receipt Management System.

Built for **Smart India Hackathon 2026 (Problem Statement 26265)**.

## Live Production Demo
- **URL**: [https://itstanishkraj007.github.io/aicte-sdms-portal/](https://itstanishkraj007.github.io/aicte-sdms-portal/)

## Visual Identity & Design System
- Official Government of India & AICTE branding:
  - Header: Indian Tricolor band (`#FF9933` | `#FFFFFF` | `#138808`)
  - Deep AICTE Maroon (`#7B1D1D`) with subtle gold accents (`#B7791F`)
  - Warm parchment canvas (`#FAF8F5`) with clean white structured cards
  - High data density: Table-first layouts, strict typography, zero AI vibe-coding or decorative fluff
  - Clear simulated data tags (`[SIMULATED]`) for transparent audit compliance

## Five Specialized Role Perspectives
1. **Institution Nodal Officer (`/institution/dashboard`)**:
   - Manage institution security deposit portfolio, submit new FDR receipts with 4-step intake wizard, monitor days to maturity, and inspect official PDF dossiers.
2. **Regional Scrutiny Officer (`/scrutiny/queue`)**:
   - Three-way reconciliation matrix comparing Institution Submitted vs. Computer Vision OCR vs. Bank Core records. Inspect mismatch flags and issue Form DEF-1 clarification demands.
3. **Internal Clearance Officer (`/clearance`)**:
   - Multi-stakeholder 5-Gate sequential approval pipeline:
     1. Scrutiny Verification
     2. PGRC Division Clearance
     3. Chief Vigilance Officer Clearance
     4. Finance / Grants Cell (interactive penalty/hold resolution)
     5. Legal NOC (unlocked sequentially after Gate 4)
   - Generates official AICTE Sanction Order & Bank NOC upon clearance.
4. **Regulation Bureau Head (`/executive`)**:
   - National Executive Command Center: ₹3,247.2 Cr total portfolio tracking, state-by-state heat breakdown, high-priority interventions, and downloadable compliance dossiers.
5. **System Auditor & Super Admin (`/audit`)**:
   - Cryptographically linked immutable ledger. Each lifecycle action generates a SHA-256 hash chaining to the previous record (`prevHash`). Interactive one-click "Verify Entire Chain" feature recalculates hash integrity and renders the official Certificate of Audit Integrity.

## Running Locally

```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173/aicte-sdms-portal/](http://localhost:5173/aicte-sdms-portal/) in your browser.
