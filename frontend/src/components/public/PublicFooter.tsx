import { AicteEmblem } from '../common/AicteLogo';

export default function PublicFooter() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 text-xs border-t-2 border-emerald-500 flex-shrink-0">
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-3">
            <AicteEmblem className="h-9 w-auto" />
            <div>
              <div className="text-white text-xs font-bold leading-tight uppercase font-sans">
                Secure <span className="text-[#10B981]">Stack</span>
              </div>
              <div className="text-emerald-400 text-[10px] font-medium leading-none mt-0.5">
                AICTE Security Deposit Portal
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Official statutory security deposit & FDR surveillance system for technical educational institutions
            regulated under the AICTE Act 1987, Ministry of Education, Government of India.
          </p>
          <div className="text-[11px] text-slate-500 font-mono">
            Smart India Hackathon 2026 • Problem ID 26265<br />
            Team: Secure Stack (Theme: Smart Automation)
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-emerald-400">
            APH Regulatory Mandates
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#regulations" className="hover:text-[#10B981] transition-colors">
                Approval Process Handbook (APH 2024-27)
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#10B981] transition-colors">
                Chapter 1 Table 1.4: Security Deposit Slabs
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#10B981] transition-colors">
                Clause 2.22: Joint RO Lien & Irrevocable Mandate
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#10B981] transition-colors">
                Clause 2.22(h): 10% Penalty on Missing EoA
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#10B981] transition-colors">
                Digital Personal Data Protection Act (DPDP) 2023
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-emerald-400">
            System Divisions & Cells
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="/login" className="hover:text-[#10B981] transition-colors">
                Institutional FDR Ingress & OCR Pre-Flight
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#10B981] transition-colors">
                Regional Scrutiny Cell (WRO / SRO / NRO)
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#10B981] transition-colors">
                Public Grievance Redressal Cell (PGRC)
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#10B981] transition-colors">
                Finance & Drawing Disbursing Officer (DDO)
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#10B981] transition-colors">
                Cryptographic SHA-256 Audit Desk
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-emerald-400">
            AICTE Headquarters
          </h4>
          <div className="space-y-2.5 text-xs text-slate-400">
            <div>
              <strong className="text-slate-200">Head Office:</strong><br />
              All India Council for Technical Education<br />
              Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070
            </div>
            <div>
              <strong className="text-slate-200">Phone Support:</strong> 011-29581000<br />
              <strong className="text-slate-200">Email:</strong> fdr-support@aicte-india.org
            </div>
            <div className="pt-1">
              <span className="inline-block bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-mono border border-slate-800">
                Security Anchor: SHA-256 3f9ad1b2c4e5...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Compliance Strip */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-3.5 px-5 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-center md:text-left">
          <div>
            Website Content Managed by <strong>All India Council for Technical Education, Ministry of Education, Govt. of India</strong>.
            SIH 2026 Prototype.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>GIGW 3.0 Guidelines Compliant</span>
            <span>•</span>
            <span>WCAG 2.1 Level AA</span>
            <span>•</span>
            <span>DPDP Act 2023 Ephemeral Processing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
