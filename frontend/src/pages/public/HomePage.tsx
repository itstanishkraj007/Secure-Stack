import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  UserCheck,
  FileCheck2,
  Clock,
  ArrowRight,
  Lock,
  ChevronRight,
  Scale,
  Layers,
  FileText,
  Award,
  Shield,
} from 'lucide-react';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';
import { AicteEmblem } from '../../components/common/AicteLogo';

export default function HomePage() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the statutory requirement for Fixed Deposit Receipts (FDRs) under AICTE?',
      a: 'Per Chapter 1 of the AICTE Approval Process Handbook (APH), all approved technical institutions must create and pledge a fixed deposit receipt in joint lien with the Regional Officer (AICTE) as a permanent security deposit guaranteeing operational compliance and student welfare.',
    },
    {
      q: 'How does the Secure Stack Automated Reconciliation engine prevent deposit fraud?',
      a: 'The portal performs independent triple-source reconciliation: comparing the institution submitted values against automated OCR extracted text (Tesseract) and authoritative core banking system (CBS) / Account Aggregator responses. Discrepancies in principal, lien status, or maturity are auto-routed to regional officer scrutiny.',
    },
    {
      q: 'What happens when an instrument approaches its maturity date?',
      a: 'The Automated Lifecycle Watchdog triggers sequential notifications at T-90, T-60, T-30, T-15, and T-0. If not renewed or extended by the institution, automated policy holds prevent unauthorized withdrawal and notify state regulatory bodies.',
    },
    {
      q: 'Can an individual officer authorize the release of an FDR deposit alone?',
      a: 'No. Release authorization enforces a strict multi-cell clearance gate workflow requiring independent clearance sign-offs from Scrutiny Cell, Public Grievance Redressal Cell (PGRC), Vigilance Division, Finance/Grants, and Legal Cell before a digital Bank NOC can be signed.',
    },
    {
      q: 'How does the portal guarantee audit integrity against insider alteration?',
      a: 'Every administrative action, check outcome, and gate transition is recorded into an append-only cryptographic ledger where each event hash incorporates the previous event hash: SHA256(previous_hash || canonical_payload). Any database alteration invalidates the entire mathematical chain.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      {/* 1. Official Notification Ticker */}
      <div className="bg-[#FFFBEB] border-b border-[#FDE68A] py-1.5 px-4 sm:px-8 text-xs text-[#92400E] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-2 overflow-hidden">
          <span className="bg-[#E65100] text-white text-xxs font-extrabold px-1.5 py-0.2 rounded uppercase flex-shrink-0 animate-pulse">
            AICTE NOTIFICATION
          </span>
          <div className="truncate font-medium text-xxs sm:text-xs">
            Mandatory annual verification of joint FDR liens for AY 2024-25 in progress under Clause 1.4 APH. Institutions must review pending scrutiny notices before 15 November 2024.
          </div>
        </div>
      </div>

      {/* 2. Official AICTE Blue Hero Section */}
      <section className="bg-gradient-to-b from-[#003366] via-[#002A54] to-[#001F3F] text-white py-12 px-4 sm:px-8 relative overflow-hidden border-b-3 border-[#FF8A00]">
        {/* Subtle decorative emblem background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-center">
          <AicteEmblem className="h-96 w-auto" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#FF9933] px-3 py-1 rounded-full text-xxs font-bold tracking-wider uppercase">
              <Shield size={12} />
              AICTE SMART GOVERNANCE INITIATIVE • SIH 2026
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Security Deposit & FDR Management Portal (SDMS)
            </h1>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl font-light leading-relaxed">
              An intelligent statutory platform automating Fixed Deposit Receipt intake, triple-source core banking
              reconciliation, continuous maturity surveillance, and multi-cell clearance gating for India's technical educational institutions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="btn-gold text-xs sm:text-sm font-bold px-5 py-2.5 rounded shadow-lg flex items-center gap-2"
              >
                <span>Access SDMS Portal</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/features"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded transition-colors flex items-center gap-1.5"
              >
                <Layers size={15} className="text-[#FF9933]" />
                <span>Architecture & Innovations</span>
              </Link>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xxs text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#FF9933]" /> PAdES-B-LT LTV Signatures
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck2 size={14} className="text-[#FF9933]" /> Automated OCR Extraction
              </span>
              <span className="flex items-center gap-1.5">
                <Lock size={14} className="text-[#FF9933]" /> SHA-256 Tamper-Evident Chain
              </span>
            </div>
          </div>

          {/* Quick Login Gateway Card */}
          <div className="lg:col-span-4 card bg-white text-gray-900 p-5 shadow-xl border-t-4 border-t-[#FF8A00]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <UserCheck size={18} className="text-[#003366]" />
                <h3 className="font-bold text-sm text-gray-900">Official Portal Login</h3>
              </div>
              <span className="text-xxs font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded font-semibold">
                AICTE SSO
              </span>
            </div>

            <p className="text-xxs text-gray-600 my-3">
              Select your designated administrative role to proceed to the authenticated workspace:
            </p>

            <div className="space-y-2 text-xs">
              <Link
                to="/login?role=INSTITUTION"
                className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded hover:border-[#003366] hover:bg-[#EFF6FF] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Building size={16} className="text-[#003366]" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 group-hover:text-[#003366]">1. Technical Institution Desk</div>
                    <div className="text-xxs text-gray-500">Colleges & Polytechnics</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-[#003366]" />
              </Link>

              <Link
                to="/login?role=SCRUTINY"
                className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded hover:border-[#003366] hover:bg-[#EFF6FF] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck size={16} className="text-[#003366]" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 group-hover:text-[#003366]">2. Regional Scrutiny Officer</div>
                    <div className="text-xxs text-gray-500">WRO, SRO, NRO Scrutiny Cell</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-[#003366]" />
              </Link>

              <Link
                to="/login?role=EXECUTIVE"
                className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded hover:border-[#003366] hover:bg-[#EFF6FF] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Scale size={16} className="text-[#003366]" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 group-hover:text-[#003366]">3. Fund Release Authority</div>
                    <div className="text-xxs text-gray-500">Drawing & Disbursing Officer (DDO)</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-[#003366]" />
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
              <Link to="/login" className="text-xxs text-[#003366] font-bold hover:underline">
                View All 5 Login Roles & Clearance Desks →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. National Statistics Bar */}
      <section className="bg-white border-b border-[#E2E8F0] py-5 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2 border-r last:border-r-0 border-gray-200">
            <div className="text-xl sm:text-2xl font-extrabold text-[#003366] font-mono">₹3,247.2 Cr</div>
            <div className="text-xxs sm:text-xs text-gray-600 uppercase font-semibold mt-0.5">
              Total Deposits Under AICTE Joint Lien
            </div>
          </div>
          <div className="p-2 border-r last:border-r-0 border-gray-200">
            <div className="text-xl sm:text-2xl font-extrabold text-gray-900 font-mono">1,847</div>
            <div className="text-xxs sm:text-xs text-gray-600 uppercase font-semibold mt-0.5">
              Approved Technical Institutions
            </div>
          </div>
          <div className="p-2 border-r last:border-r-0 border-gray-200">
            <div className="text-xl sm:text-2xl font-extrabold text-[#15803D] font-mono">99.4%</div>
            <div className="text-xxs sm:text-xs text-gray-600 uppercase font-semibold mt-0.5">
              Automated Verification Precision
            </div>
          </div>
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-extrabold text-[#E65100] font-mono">Zero</div>
            <div className="text-xxs sm:text-xs text-gray-600 uppercase font-semibold mt-0.5">
              Unauthorized Deposit Encumbrances
            </div>
          </div>
        </div>
      </section>

      {/* 4. Five Core Platform Pillars */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xxs font-bold text-[#003366] uppercase tracking-wider">
            AICTE STATUTORY CAPABILITIES
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            End-to-End Governance for Security Deposit Lifecycle
          </h2>
          <p className="text-xs text-gray-600">
            Built strictly in adherence with AICTE Approval Process Handbook guidelines, ReBIT financial schemas, and the DPDP Act 2023.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card p-5 space-y-3 hover:shadow-md transition-shadow border-t-3 border-t-[#003366]">
            <div className="w-9 h-9 rounded bg-[#EFF6FF] text-[#003366] flex items-center justify-center font-bold">
              <FileCheck2 size={20} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">1. OCR Field Extraction & Pre-Flight</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Institutions upload original bank receipts. PyMuPDF extracts structure while Tesseract captures 9 key fields
              with confidence metrics. Uncertain fields require human officer confirmation before record creation.
            </p>
            <div className="text-xxs text-[#003366] font-semibold flex items-center gap-1 pt-1">
              <span>Human-in-the-Loop Validation</span>
            </div>
          </div>

          <div className="card p-5 space-y-3 hover:shadow-md transition-shadow border-t-3 border-t-[#E65100]">
            <div className="w-9 h-9 rounded bg-[#FFFBEB] text-[#E65100] flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">2. Triple-Source Dual Reconciliation</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Reconciles submitted claims against visual OCR extraction and core banking adapter records.
              Discrepancies in principal amounts, tenure, or lien clauses route immediately to the Regional Scrutiny desk.
            </p>
            <div className="text-xxs text-[#E65100] font-semibold flex items-center gap-1 pt-1">
              <span>Zero-Blind-Pass Policy</span>
            </div>
          </div>

          <div className="card p-5 space-y-3 hover:shadow-md transition-shadow border-t-3 border-t-[#15803D]">
            <div className="w-9 h-9 rounded bg-[#F0FDF4] text-[#15803D] flex items-center justify-center font-bold">
              <Clock size={20} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">3. Automated T-Countdown Watchdog</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Escalates notices at T-90, T-60, T-30, T-15, and T-0. Tracks multi-year parent-child renewal lineage
              to ensure zero coverage gaps while institutions maintain ongoing educational operations.
            </p>
            <div className="text-xxs text-[#15803D] font-semibold flex items-center gap-1 pt-1">
              <span>Continuous Coverage Surveillance</span>
            </div>
          </div>

          <div className="card p-5 space-y-3 hover:shadow-md transition-shadow border-t-3 border-t-[#003366]">
            <div className="w-9 h-9 rounded bg-[#EFF6FF] text-[#003366] flex items-center justify-center font-bold">
              <Scale size={20} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">4. 5-Gate Sequential Clearance Hub</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Deposit release is locked until 5 independent cells (Scrutiny, PGRC, Vigilance, Finance, Legal)
              certify zero outstanding encumbrance or student grievances. Includes candidate statutory penalty simulation.
            </p>
            <div className="text-xxs text-[#003366] font-semibold flex items-center gap-1 pt-1">
              <span>Multi-Stakeholder Gating</span>
            </div>
          </div>

          <div className="card p-5 space-y-3 hover:shadow-md transition-shadow border-t-3 border-t-[#071E36]">
            <div className="w-9 h-9 rounded bg-gray-100 text-[#071E36] flex items-center justify-center font-bold">
              <Lock size={20} />
            </div>
            <h3 className="font-bold text-sm text-gray-900">5. Cryptographic SHA-256 Audit Trail</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every decision, document ingress, and gate clearance is committed to an append-only hash chain.
              System auditors can mathematically verify historical ledger integrity with one-click verification.
            </p>
            <div className="text-xxs text-gray-700 font-semibold flex items-center gap-1 pt-1">
              <span>Mathematically Tamper-Evident</span>
            </div>
          </div>

          <div className="card p-5 space-y-3 bg-[#EFF6FF]/70 border border-[#BAE6FD] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xxs font-bold text-[#003366] uppercase">EXPLORE LIVE SYSTEM</span>
              <h3 className="font-bold text-sm text-gray-900">Demonstration Ready Prototype</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Step through realistic Indian university test fixtures, test OCR ingestion, examine active discrepancies,
                and inspect cryptographic chain checks.
              </p>
            </div>
            <Link to="/login" className="btn-primary text-xs w-full justify-center mt-2">
              <span>Launch Demo Desks</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Regulatory Rules Register Section */}
      <section id="regulations" className="bg-white border-y border-[#E2E8F0] py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xxs font-bold text-[#003366] uppercase tracking-wider">
                COMPLIANCE & STATUTE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                AICTE Regulatory Rules Register & Deposit Norms
              </h2>
              <p className="text-xs text-gray-600">
                Summary of statutory rules governing technical institution security deposits
              </p>
            </div>
            <div className="text-xxs font-mono text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded font-semibold">
              APH 2024-27 REGISTER
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded space-y-1.5 border-l-3 border-l-[#003366]">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#003366]">RULE-02 • Table 1.4 APH</span>
                <span className="text-xxs bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded border border-green-200">
                  STATUTORY SLAB
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-xs">Security Deposit Amount Determination</h4>
              <p className="text-xxs text-gray-600 leading-relaxed">
                Mandates security deposit slabs ranging from ₹15 Lakhs to ₹75 Lakhs based on institution category
                (Engineering & Technology, Management, Pharmacy, Architecture) and whether built on leased vs owned land.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded space-y-1.5 border-l-3 border-l-[#003366]">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#003366]">RULE-03 • Clause 2.22</span>
                <span className="text-xxs bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded border border-green-200">
                  JOINT LIEN
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-xs">8 to 10 Year Lock-In & Joint RO Lien Mandate</h4>
              <p className="text-xxs text-gray-600 leading-relaxed">
                FDRs must be created in joint names of the institution society and the designated AICTE Regional Officer,
                with an irrevocable clause preventing liquidation, loan lien, or overdraft without express Council NOC.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded space-y-1.5 border-l-3 border-l-[#E65100]">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#E65100]">RULE-04 • Clause 2.22(h)</span>
                <span className="text-xxs bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-300">
                  CANDIDATE PENALTY
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-xs">Statutory Penalty for Missing Extension of Approval</h4>
              <p className="text-xxs text-gray-600 leading-relaxed">
                Institutions failing to maintain continuous Extension of Approval (EoA) face a 10% statutory penalty
                deducted from the principal deposit upon release, simulated in the portal before officer sign-off.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded space-y-1.5 border-l-3 border-l-[#003366]">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#003366]">RULE-07 • Multi-Cell Clearance</span>
                <span className="text-xxs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
                  RELEASE GATE
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-xs">Mandatory PGRC & Vigilance Certification</h4>
              <p className="text-xxs text-gray-600 leading-relaxed">
                FDR maturity or closure clearance requires written electronic certification that zero student fee disputes
                or vigilance inquiries are pending against the technical campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section id="faq" className="py-12 px-4 sm:px-8 max-w-4xl mx-auto w-full space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xxs font-bold text-[#003366] uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Frequently Asked Questions by Institutions & Officers
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = selectedFaq === i;
            return (
              <div
                key={i}
                className="card border border-[#E2E8F0] rounded overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setSelectedFaq(isOpen ? null : i)}
                  className="w-full text-left p-3.5 flex items-center justify-between gap-3 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm text-gray-900">{faq.q}</span>
                  <span className="text-gray-400 font-bold text-sm">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="p-3.5 bg-gray-50 border-t border-[#E2E8F0] text-xs text-gray-700 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
