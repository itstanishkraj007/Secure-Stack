import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Lock,
  Layers,
  ArrowRight,
  Sparkles,
  Server,
  Database,
  FileCheck2,
  Eye,
  GitBranch,
  Scale,
  RefreshCw,
} from 'lucide-react';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <PublicHeader />

      {/* Header Banner */}
      <section className="bg-[#7B1D1D] text-white py-10 px-4 sm:px-8 border-b border-[#5A1515]">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#D4A017] px-2.5 py-0.5 rounded text-xxs font-bold uppercase tracking-wider">
            <Sparkles size={12} /> SYSTEM ARCHITECTURE & INNOVATIONS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Key Architecture & Technical Capabilities
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-3xl leading-relaxed">
            Engineered for high-volume technical institution deposit scrutiny. Combines computer vision document parsing,
            cryptographic PDF verification, automated core banking reconciliation, and append-only audit logging.
          </p>
        </div>
      </section>

      {/* Architecture Overview Diagram Card */}
      <section className="py-8 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="card p-5 border-l-4 border-l-[#7B1D1D] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9C8]">
            <div>
              <h2 className="section-title text-sm sm:text-base">Logical System Architecture</h2>
              <p className="text-xxs text-gray-500">Multi-tier micro-modular architecture enforcing complete separation of concerns</p>
            </div>
            <span className="text-xxs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
              SPRING BOOT + PYTHON PROCESSING + POSTGRESQL + S3
            </span>
          </div>

          {/* Architecture Block Visual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="card p-3.5 bg-white border border-[#E2D9C8] space-y-2">
              <div className="font-bold text-gray-900 flex items-center gap-1.5 text-xs text-[#7B1D1D]">
                <Layers size={15} /> 1. Client Presentation
              </div>
              <p className="text-xxs text-gray-600 leading-relaxed">
                Vercel-hosted React + TypeScript SPA. Role-based routing for Institutions, Scrutiny Officers,
                Clearance Cells, and Regulation Bureau.
              </p>
              <div className="text-xxs font-mono bg-gray-50 p-1 rounded border border-gray-200 text-gray-600">
                HTTPS REST • Zero raw secrets in browser
              </div>
            </div>

            <div className="card p-3.5 bg-white border border-[#E2D9C8] space-y-2">
              <div className="font-bold text-gray-900 flex items-center gap-1.5 text-xs text-[#B7791F]">
                <Server size={15} /> 2. Primary Workflow API
              </div>
              <p className="text-xxs text-gray-600 leading-relaxed">
                Java + Spring Boot orchestrating authentication, candidate rule engine, state transitions,
                correlation IDs, and signed S3 URLs.
              </p>
              <div className="text-xxs font-mono bg-gray-50 p-1 rounded border border-gray-200 text-gray-600">
                Spring Security • RBAC • OpenAPI v3
              </div>
            </div>

            <div className="card p-3.5 bg-white border border-[#E2D9C8] space-y-2">
              <div className="font-bold text-gray-900 flex items-center gap-1.5 text-xs text-[#15803D]">
                <FileCheck2 size={15} /> 3. Processing Worker
              </div>
              <p className="text-xxs text-gray-600 leading-relaxed">
                Python sandboxed service running PyHanko (PAdES signatures), PyMuPDF (metadata),
                OpenCV/ZBar (QR decoding), and Tesseract OCR.
              </p>
              <div className="text-xxs font-mono bg-gray-50 p-1 rounded border border-gray-200 text-gray-600">
                Celery • Internal only • Untrusted input isolation
              </div>
            </div>

            <div className="card p-3.5 bg-white border border-[#E2D9C8] space-y-2">
              <div className="font-bold text-gray-900 flex items-center gap-1.5 text-xs text-[#7B1D1D]">
                <Database size={15} /> 4. Data & Audit Ledger
              </div>
              <p className="text-xxs text-gray-600 leading-relaxed">
                PostgreSQL for structured records and candidate rules. AWS S3 private object storage.
                Append-only SHA-256 hash-chained audit ledger.
              </p>
              <div className="text-xxs font-mono bg-gray-50 p-1 rounded border border-gray-200 text-gray-600">
                Immutable hash blocks • UUID primary keys
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Feature Sections */}
        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="card p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="text-xxs font-bold text-[#7B1D1D] uppercase">INNOVATION 01</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Triple-Source Dual Reconciliation Matrix
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Traditional portals accept the institution's self-reported figures without cross-verification.
                Secure Stack reconciles three independent vectors:
              </p>
              <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-4">
                <li><strong>Vector A (Submitted):</strong> Self-declared FDR numbers, principal, and tenure entered by the institution nodal desk.</li>
                <li><strong>Vector B (Extracted):</strong> Visual OCR claims parsed directly from the scanned/digital PDF receipt with confidence scores.</li>
                <li><strong>Vector C (Confirmed):</strong> Direct Core Banking / Account Aggregator financial telemetry via standardized ReBIT schemas.</li>
              </ul>
              <p className="text-xxs text-gray-500 pt-1">
                Any mismatch (e.g. ₹25L submitted vs ₹23.75L bank confirmed) triggers an immediate automatic hold and alerts the scrutiny officer.
              </p>
            </div>
            <div className="lg:col-span-5 bg-gray-50 border border-[#E2D9C8] rounded p-4 text-xs font-mono space-y-1.5">
              <div className="text-xxs font-bold text-gray-500 font-sans uppercase">Reconciliation Example</div>
              <div className="text-gray-900">Claimed Principal: ₹25,00,000</div>
              <div className="text-gray-900">OCR Extracted: ₹25,00,000 (94% conf)</div>
              <div className="text-red-700 font-bold bg-red-100 p-1 rounded">
                Bank Record: ₹23,75,000 [MISMATCH - 5%]
              </div>
              <div className="text-xxs text-gray-600 font-sans pt-1">
                Status: Auto-routed to WRO Regional Scrutiny Queue
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-gray-50 border border-[#E2D9C8] rounded p-4 text-xs font-mono space-y-1.5 order-2 lg:order-1">
              <div className="text-xxs font-bold text-gray-500 font-sans uppercase">Notification Cadence</div>
              <div className="text-green-700">✓ T-90: General Intimation Dispatched</div>
              <div className="text-green-700">✓ T-60: Bank Paperwork Preparation Alert</div>
              <div className="text-amber-700 font-semibold">⚠ T-30: Formal Statutory Non-Renewal Notice</div>
              <div className="text-red-700 font-bold bg-red-100 p-1 rounded">
                🔴 T-15: Regional Officer Provisional Hold
              </div>
              <div className="text-gray-500">○ T-0: Encumbrance Lock & DTE Grievance</div>
            </div>
            <div className="lg:col-span-7 space-y-2 order-1 lg:order-2">
              <div className="text-xxs font-bold text-[#B7791F] uppercase">INNOVATION 02</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Automated Lifecycle Watchdog & Continuous Renewal Lineage
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Security deposits often mature unnoticed, creating dangerous coverage gaps where an institution operates
                without collateral protection. Our watchdog service maintains:
              </p>
              <ul className="text-xs text-gray-700 space-y-1.5 list-disc pl-4">
                <li><strong>Configurable T-Countdown:</strong> Automated escalations at T-90, T-60, T-30, T-15, and T-0.</li>
                <li><strong>Parent-Child Lineage:</strong> Preserves 6+ year historical chains linking initial FDRs to successive renewals.</li>
                <li><strong>Gap Analysis:</strong> Automatically computes whether continuous deposit coverage was maintained during renewal transitions.</li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="text-xxs font-bold text-[#15803D] uppercase">INNOVATION 03</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                5-Cell Clearance Hub with Sequential Gating & Penalty Simulator
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Eliminates the risk of unauthorized release by requiring 5 separate clearances before a Bank NOC can be signed:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xxs pt-1">
                <div className="p-2 bg-gray-50 border rounded">1. <strong>Scrutiny Cell:</strong> Document authenticity & signature verification.</div>
                <div className="p-2 bg-gray-50 border rounded">2. <strong>PGRC Cell:</strong> Certification of zero pending student fee grievances.</div>
                <div className="p-2 bg-gray-50 border rounded">3. <strong>Vigilance Cell:</strong> Confirmation of zero vigilance inquiry holds.</div>
                <div className="p-2 bg-gray-50 border rounded">4. <strong>Finance Cell:</strong> Assessment of statutory dues & penalty calculation.</div>
                <div className="p-2 bg-gray-50 border rounded sm:col-span-2">5. <strong>Legal Cell:</strong> Final NOC drafting & PAdES seal generation.</div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-gray-50 border border-[#E2D9C8] rounded p-4 text-xs font-mono space-y-1.5">
              <div className="text-xxs font-bold text-gray-500 font-sans uppercase">Statutory Penalty Simulation</div>
              <div className="text-gray-700">Rule: RULE-04 (APH Clause 2.22h)</div>
              <div className="text-gray-700">Principal Deposit: ₹25,00,000</div>
              <div className="text-amber-800 font-bold bg-amber-100 p-1 rounded">
                Simulated Penalty (10%): ₹2,50,000
              </div>
              <div className="text-xxs text-gray-500 font-sans">
                Release Blocked: Gate 4 (Finance) on hold
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="card p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-gray-50 border border-[#E2D9C8] rounded p-4 text-xs font-mono space-y-1.5 order-2 lg:order-1">
              <div className="text-xxs font-bold text-gray-500 font-sans uppercase">Audit Hash Anchor</div>
              <div className="text-gray-600 text-xxs truncate">Prev: 2c4bf8d9e0f1a2b3c4d5e6f7a8b9c0d1...</div>
              <div className="text-gray-900 text-xxs font-bold truncate">Hash: 3f9ad1b2c4e5f6a7b8c9d0e1f2a3b4c5...</div>
              <div className="text-green-700 font-bold bg-green-100 p-1 rounded text-xxs">
                ✓ SHA256(prev || payload) Verified Intact
              </div>
              <div className="text-xxs text-gray-500 font-sans">
                891 Blocks Verified • Zero Deleted Sequences
              </div>
            </div>
            <div className="lg:col-span-7 space-y-2 order-1 lg:order-2">
              <div className="text-xxs font-bold text-[#7B1D1D] uppercase">INNOVATION 04</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Mathematically Tamper-Evident SHA-256 Audit Trail
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Prevents insider tampering and fraudulent audit wipeouts. Every state change (document upload, OCR run,
                officer hold, gate clearance, sanction order) creates a deterministic canonical block cryptographically
                hashed with the preceding event hash.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                System auditors run one-click mathematical verification to detect unauthorized database rewrites or sequence omissions.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="card overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-[#E2D9C8]">
            <h3 className="section-title">Manual Operational Model vs. Secure Stack Smart Automation</h3>
            <p className="text-xxs text-gray-500">Comparative assessment against the legacy workflow identified in SIH Problem 26265</p>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Operational Dimension</th>
                  <th>Legacy Manual Verification Process</th>
                  <th className="bg-[#FEF2F2] text-[#7B1D1D] font-bold">Secure Stack Automated Platform</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold text-gray-900">Ingress & Parsing</td>
                  <td className="text-gray-600">Manual officer transcription from paper receipts; prone to typo errors.</td>
                  <td className="font-semibold text-gray-900 bg-red-50/20">OCR parsing with per-field confidence scoring & human confirmation.</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-900">Bank Verification</td>
                  <td className="text-gray-600">Postal letters to bank branches; average turnaround 45-60 days.</td>
                  <td className="font-semibold text-gray-900 bg-red-50/20">Automated Account Aggregator / Core Banking dual-source comparison.</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-900">Maturity Monitoring</td>
                  <td className="text-gray-600">Periodic physical ledger audits; frequent missed maturities and coverage lapses.</td>
                  <td className="font-semibold text-gray-900 bg-red-50/20">T-90 to T-0 automated notification cadence with parent-child lineage tree.</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-900">Clearance Governance</td>
                  <td className="text-gray-600">Physical file routing between departments; prone to missing vigilance clearance.</td>
                  <td className="font-semibold text-gray-900 bg-red-50/20">5-gate sequential electronic checklist; zero release while holds remain active.</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-900">Audit & Accountability</td>
                  <td className="text-gray-600">Paper registers vulnerable to physical loss, alteration, or retrofitting.</td>
                  <td className="font-semibold text-gray-900 bg-red-50/20">Cryptographically chained SHA-256 append-only ledger with one-click verification.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-r from-[#7B1D1D] to-[#5A1515] text-white text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">Experience the Full System in Action</h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
            Log in as an Institution Nodal Officer, Regional Scrutiny Officer, or Bureau Head to walk through live interactive scenarios.
          </p>
          <div className="pt-2">
            <Link to="/login" className="btn-gold text-xs sm:text-sm px-6 py-2.5 rounded shadow-lg inline-flex items-center gap-2">
              <span>Launch Official Portal Sign In</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
