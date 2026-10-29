import { AicteEmblem } from '../common/AicteLogo';

export default function PublicFooter() {
  return (
    <footer className="w-full bg-[#001F3F] text-gray-300 text-xs border-t-3 border-[#FF8A00] flex-shrink-0">
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-3">
            <AicteEmblem className="h-9 w-auto" />
            <div>
              <div className="text-white text-xs font-bold leading-tight uppercase font-sans">AICTE SDMS</div>
              <div className="text-[#FF9933] text-[9px] font-medium leading-none">Security Deposit Portal</div>
            </div>
          </div>
          <p className="text-xxs text-gray-300 leading-relaxed mb-3">
            Official statutory security deposit & FDR surveillance system for technical educational institutions
            regulated under the AICTE Act 1987, Ministry of Education, Government of India.
          </p>
          <div className="text-xxs text-gray-400 font-mono">
            Smart India Hackathon 2026 • Problem ID 26265<br />
            Team: Secure Stack (Theme: Smart Automation)
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-[#FF9933]">
            APH Regulatory Mandates
          </h4>
          <ul className="space-y-1.5 text-xxs">
            <li>
              <a href="#regulations" className="hover:text-[#FF9933] transition-colors">
                Approval Process Handbook (APH 2024-27)
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#FF9933] transition-colors">
                Chapter 1 Table 1.4: Security Deposit Slabs
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#FF9933] transition-colors">
                Clause 2.22: Joint RO Lien & Irrevocable Mandate
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#FF9933] transition-colors">
                Clause 2.22(h): 10% Penalty on Missing EoA
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-[#FF9933] transition-colors">
                Digital Personal Data Protection Act (DPDP) 2023
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-[#FF9933]">
            System Divisions & Cells
          </h4>
          <ul className="space-y-1.5 text-xxs">
            <li>
              <a href="/login" className="hover:text-[#FF9933] transition-colors">
                Institutional FDR Ingress & OCR Pre-Flight
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#FF9933] transition-colors">
                Regional Scrutiny Cell (WRO / SRO / NRO)
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#FF9933] transition-colors">
                Public Grievance Redressal Cell (PGRC)
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#FF9933] transition-colors">
                Finance & Drawing Disbursing Officer (DDO)
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#FF9933] transition-colors">
                Cryptographic SHA-256 Audit Desk
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-[#FF9933]">
            AICTE Headquarters
          </h4>
          <div className="space-y-2 text-xxs text-gray-300">
            <div>
              <strong className="text-white">Head Office:</strong><br />
              All India Council for Technical Education<br />
              Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070
            </div>
            <div>
              <strong className="text-white">Phone Support:</strong> 011-29581000<br />
              <strong className="text-white">Email:</strong> fdr-support@aicte-india.org
            </div>
            <div className="pt-1">
              <span className="inline-block bg-[#002D5C] text-[#FF9933] px-2 py-0.5 rounded text-xxs font-mono border border-[#003E7E]">
                Security Anchor: SHA-256 3f9ad1b2c4e5...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Compliance Strip */}
      <div className="border-t border-white/10 bg-[#00152B] py-3 px-4 sm:px-8 text-xxs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div>
            Website Content Managed by <strong>All India Council for Technical Education, Ministry of Education, Govt. of India</strong>.
            SIH 2026 Prototype.
          </div>
          <div className="flex items-center gap-4 text-gray-400">
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
