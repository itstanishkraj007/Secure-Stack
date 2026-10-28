import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="w-full bg-[#1C0A0A] text-gray-400 text-xs border-t-2 border-[#D4A017] flex-shrink-0">
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
            <ShieldCheck size={20} className="text-[#D4A017]" />
            <span>AICTE SDMS Portal</span>
          </div>
          <p className="text-xxs text-gray-400 leading-relaxed mb-3">
            Official Security Deposit and Fixed Deposit Receipt (FDR) lifecycle management system for AICTE approved
            technical colleges, universities, and polytechnics across India.
          </p>
          <div className="text-xxs text-gray-500 font-mono">
            Smart India Hackathon 2026 • Problem ID 26265<br />
            Team: Secure Stack (Smart Automation)
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-[#D4A017]">
            Regulatory Mandates
          </h4>
          <ul className="space-y-1.5 text-xxs">
            <li>
              <a href="#regulations" className="hover:text-white transition-colors">
                AICTE Approval Process Handbook (APH 2024-27)
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-white transition-colors">
                Clause 1.4: Establishment of Technical Institutions
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-white transition-colors">
                Clause 2.22(h): Joint Lien Tenure & Renewal Mandate
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-white transition-colors">
                RBI Master Direction: Non-Banking Financial AA Framework
              </a>
            </li>
            <li>
              <a href="#regulations" className="hover:text-white transition-colors">
                Digital Personal Data Protection (DPDP) Act 2023
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-[#D4A017]">
            Portal Modules & Cells
          </h4>
          <ul className="space-y-1.5 text-xxs">
            <li>
              <a href="/login" className="hover:text-white transition-colors">
                Institution FDR Ingress & Document Vault
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition-colors">
                Regional Scrutiny & Discrepancy Desk (WRO/SRO/NRO)
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition-colors">
                Public Grievance Redressal Cell (PGRC) Clearance
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition-colors">
                Regulation Bureau Head & Settlement Sanction Desk
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition-colors">
                Tamper-Evident SHA-256 Audit Chain Ledger
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-[#D4A017]">
            Official Support & Desk
          </h4>
          <div className="space-y-2 text-xxs text-gray-400">
            <div>
              <strong className="text-white">Headquarters:</strong><br />
              All India Council for Technical Education<br />
              Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070
            </div>
            <div>
              <strong className="text-white">Phone Support:</strong> +91-11-29581000<br />
              <strong className="text-white">Email:</strong> helpdesk-sdms@aicte-india.gov.in
            </div>
            <div className="pt-1">
              <span className="inline-block bg-[#2D1515] text-[#D4A017] px-2 py-0.5 rounded text-xxs font-mono">
                Security Hash: 3f9ad1b2c4e5...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Compliance Strip */}
      <div className="border-t border-white/10 bg-[#120505] py-3 px-4 sm:px-8 text-xxs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div>
            Website content managed by <strong>All India Council for Technical Education (AICTE), Ministry of Education, Govt. of India</strong>.
            Prototype built for SIH-2026.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">NIC Guidelines Compliant</span>
            <span>•</span>
            <span className="text-gray-400">DPDP Act 2023 Ephemeral Processing</span>
            <span>•</span>
            <span className="text-gray-400">PAdES-B-LT LTV Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
