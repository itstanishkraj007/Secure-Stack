import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck2,
  Clock,
  Lock,
  Layers,
  ArrowRight,
  Shield,
  Server,
  Database,
  Scale,
  Sparkles,
} from 'lucide-react';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      {/* Header Banner (Finovate White Style) */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-[#F1F5F9] text-slate-900 py-12 px-5 sm:px-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Shield size={13} className="text-[#10B981]" /> SYSTEM ARCHITECTURE & INNOVATIONS
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Key Architecture & Technical Capabilities
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Engineered for high-volume technical institution deposit scrutiny. Combines computer vision document parsing,
            cryptographic PDF verification, automated core banking reconciliation, and append-only audit logging.
          </p>
        </div>
      </section>

      {/* Architecture Overview Diagram Card */}
      <section className="py-10 px-5 sm:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="card p-6 border border-slate-200/80 rounded-2xl space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <h2 className="section-title text-base sm:text-lg">Logical System Architecture</h2>
              <p className="text-xs text-slate-500">Multi-tier micro-modular architecture enforcing complete separation of concerns</p>
            </div>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold shadow-2xs">
              REACT + SPRING BOOT + PYTHON OCR + POSTGRESQL + SHA-256
            </span>
          </div>

          {/* Architecture Block Visual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <Layers size={16} className="text-[#10B981]" /> 1. Client Presentation
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Vercel-hosted React + TypeScript SPA. Role-based routing for Institutions, Scrutiny Officers,
                Clearance Cells, and Regulation Bureau.
              </p>
              <div className="text-[11px] font-mono bg-white p-1.5 rounded-xl border border-slate-200 text-slate-600 shadow-2xs">
                HTTPS REST • Zero raw secrets in browser
              </div>
            </div>

            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <Server size={16} className="text-[#10B981]" /> 2. Primary Workflow API
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Java + Spring Boot orchestrating authentication, candidate rule engine, state transitions,
                correlation IDs, and signed S3 URLs.
              </p>
              <div className="text-[11px] font-mono bg-white p-1.5 rounded-xl border border-slate-200 text-slate-600 shadow-2xs">
                Spring Security • RBAC • OpenAPI v3
              </div>
            </div>

            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <FileCheck2 size={16} className="text-[#10B981]" /> 3. Processing Worker
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Python sandboxed service running PyHanko (PAdES signatures), PyMuPDF (metadata),
                OpenCV/ZBar (QR decoding), and Tesseract OCR.
              </p>
              <div className="text-[11px] font-mono bg-white p-1.5 rounded-xl border border-slate-200 text-slate-600 shadow-2xs">
                Celery • Internal only • Untrusted input isolation
              </div>
            </div>

            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <Database size={16} className="text-[#10B981]" /> 4. Data & Audit Ledger
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                PostgreSQL for structured records and candidate rules. AWS S3 private object storage.
                Append-only SHA-256 hash-chained audit ledger.
              </p>
              <div className="text-[11px] font-mono bg-white p-1.5 rounded-xl border border-slate-200 text-slate-600 shadow-2xs">
                Immutable hash blocks • UUID primary keys
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Feature Sections */}
        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
                INNOVATION 01
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Triple-Source Dual Reconciliation Matrix
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traditional portals accept the institution's self-reported figures without cross-verification.
                Secure Stack reconciles three independent vectors:
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong>Vector A (Submitted):</strong> Self-declared FDR numbers, principal, and tenure entered by the institution nodal desk.</li>
                <li><strong>Vector B (Extracted):</strong> Visual OCR claims parsed directly from the scanned/digital PDF receipt with confidence scores.</li>
                <li><strong>Vector C (Confirmed):</strong> Direct Core Banking / Account Aggregator financial telemetry via standardized ReBIT schemas.</li>
              </ul>
              <p className="text-xs text-slate-500 pt-1">
                Any mismatch (e.g. ₹25L submitted vs ₹23.75L bank confirmed) triggers an immediate automatic hold and alerts the scrutiny officer.
              </p>
            </div>
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-mono space-y-2 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 font-sans uppercase">Reconciliation Example</div>
              <div className="text-slate-800">Claimed Principal: ₹25,00,000</div>
              <div className="text-slate-800">OCR Extracted: ₹25,00,000 (94% conf)</div>
              <div className="text-rose-700 font-bold bg-rose-50 border border-rose-200 p-2 rounded-xl">
                Bank Record: ₹23,75,000 [MISMATCH - 5%]
              </div>
              <div className="text-[11px] text-slate-500 font-sans pt-1">
                Status: Auto-routed to WRO Regional Scrutiny Queue
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-mono space-y-2 order-2 lg:order-1 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 font-sans uppercase">Notification Cadence</div>
              <div className="text-emerald-700">✓ T-90: General Intimation Dispatched</div>
              <div className="text-emerald-700">✓ T-60: Bank Paperwork Preparation Alert</div>
              <div className="text-amber-700 font-semibold">⚠ T-30: Formal Statutory Non-Renewal Notice</div>
              <div className="text-rose-700 font-bold bg-rose-50 border border-rose-200 p-2 rounded-xl">
                🔴 T-15: Regional Officer Provisional Hold
              </div>
              <div className="text-slate-400">○ T-0: Encumbrance Lock & DTE Grievance</div>
            </div>
            <div className="lg:col-span-7 space-y-2.5 order-1 lg:order-2">
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 w-fit">
                INNOVATION 02
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Automated Lifecycle Watchdog & Continuous Renewal Lineage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Security deposits often mature unnoticed, creating dangerous coverage gaps where an institution operates
                without collateral protection. Our watchdog service maintains:
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong>Configurable T-Countdown:</strong> Automated escalations at T-90, T-60, T-30, T-15, and T-0.</li>
                <li><strong>Parent-Child Lineage:</strong> Preserves 6+ year historical chains linking initial FDRs to successive renewals.</li>
                <li><strong>Gap Analysis:</strong> Automatically computes whether continuous deposit coverage was maintained during renewal transitions.</li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
                INNOVATION 03
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                5-Cell Clearance Hub with Sequential Gating & Penalty Simulator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminates the risk of unauthorized release by requiring 5 separate clearances before a Bank NOC can be signed:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">1. <strong>Scrutiny Cell:</strong> Document authenticity & signature verification.</div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">2. <strong>PGRC Cell:</strong> Certification of zero pending student fee grievances.</div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">3. <strong>Vigilance Cell:</strong> Confirmation of zero vigilance inquiry holds.</div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">4. <strong>Finance Cell:</strong> Assessment of statutory dues & penalty calculation.</div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl sm:col-span-2">5. <strong>Legal Cell:</strong> Final NOC drafting & PAdES seal generation.</div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-mono space-y-2 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 font-sans uppercase">Statutory Penalty Simulation</div>
              <div className="text-slate-700">Rule: RULE-04 (APH Clause 2.22h)</div>
              <div className="text-slate-700">Principal Deposit: ₹25,00,000</div>
              <div className="text-amber-800 font-bold bg-amber-50 border border-amber-200 p-2 rounded-xl">
                Simulated Penalty (10%): ₹2,50,000
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                Release Blocked: Gate 4 (Finance) on hold
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-mono space-y-2 order-2 lg:order-1 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 font-sans uppercase">Audit Hash Anchor</div>
              <div className="text-slate-500 text-[11px] truncate">Prev: 2c4bf8d9e0f1a2b3c4d5e6f7a8b9c0d1...</div>
              <div className="text-slate-900 text-[11px] font-bold truncate">Hash: 3f9ad1b2c4e5f6a7b8c9d0e1f2a3b4c5...</div>
              <div className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-xs">
                ✓ SHA256(prev || payload) Verified Intact
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                891 Blocks Verified • Zero Deleted Sequences
              </div>
            </div>
            <div className="lg:col-span-7 space-y-2.5 order-1 lg:order-2">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
                INNOVATION 04
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Mathematically Tamper-Evident SHA-256 Audit Trail
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prevents insider tampering and fraudulent audit wipeouts. Every state change (document upload, OCR run,
                officer hold, gate clearance, sanction order) creates a deterministic canonical block cryptographically
                hashed with the preceding event hash.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                System auditors run one-click mathematical verification to detect unauthorized database rewrites or sequence omissions.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="card overflow-hidden border border-slate-200/80 rounded-2xl shadow-xs">
          <div className="p-5 bg-slate-50 border-b border-slate-200">
            <h3 className="section-title">Manual Operational Model vs. Secure Stack Smart Automation</h3>
            <p className="text-xs text-slate-500">Comparative assessment against legacy manual processing identified in SIH Problem 26265</p>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Operational Dimension</th>
                  <th>Legacy Manual Verification Process</th>
                  <th className="bg-emerald-50 text-emerald-800 font-bold">Secure Stack Automated Platform</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50/60">
                  <td className="font-semibold text-slate-900">Ingress & Parsing</td>
                  <td className="text-slate-600">Manual officer transcription from paper receipts; prone to typo errors.</td>
                  <td className="font-semibold text-slate-900 bg-emerald-50/20">OCR parsing with per-field confidence scoring & human confirmation.</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="font-semibold text-slate-900">Bank Verification</td>
                  <td className="text-slate-600">Postal letters to bank branches; average turnaround 45-60 days.</td>
                  <td className="font-semibold text-slate-900 bg-emerald-50/20">Automated Account Aggregator / Core Banking dual-source comparison.</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="font-semibold text-slate-900">Maturity Monitoring</td>
                  <td className="text-slate-600">Periodic physical ledger audits; frequent missed maturities and coverage lapses.</td>
                  <td className="font-semibold text-slate-900 bg-emerald-50/20">T-90 to T-0 automated notification cadence with parent-child lineage tree.</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="font-semibold text-slate-900">Clearance Governance</td>
                  <td className="text-slate-600">Physical file routing between departments; prone to missing vigilance clearance.</td>
                  <td className="font-semibold text-slate-900 bg-emerald-50/20">5-gate sequential electronic checklist; zero release while holds remain active.</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="font-semibold text-slate-900">Audit & Accountability</td>
                  <td className="text-slate-600">Paper registers vulnerable to physical loss, alteration, or retrofitting.</td>
                  <td className="font-semibold text-slate-900 bg-emerald-50/20">Cryptographically chained SHA-256 append-only ledger with one-click verification.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white text-center space-y-3.5 rounded-2xl shadow-lg border border-slate-700/50">
          <h2 className="text-2xl sm:text-3xl font-bold">Experience the Full System in Action</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Log in as an Institution Nodal Officer, Regional Scrutiny Officer, or Bureau Head to walk through live interactive scenarios.
          </p>
          <div className="pt-2">
            <Link to="/login" className="btn-primary text-xs sm:text-sm px-6 py-2.5 shadow-lg inline-flex items-center gap-2">
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
