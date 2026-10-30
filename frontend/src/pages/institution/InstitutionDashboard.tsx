import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Clock,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
  ExternalLink,
  Search,
  Building,
  FileText,
  Download,
  Printer,
  X,
  AlertTriangle,
  Lock,
  Wifi,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Instrument } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { usePortalData } from '../../context/PortalDataContext';
import StatusBadge from '../../components/ui/StatusBadge';
import StatCard from '../../components/ui/StatCard';
import MockLabel from '../../components/ui/MockLabel';
import { AicteEmblem } from '../../components/common/AicteLogo';

export default function InstitutionDashboard() {
  const { role } = useAuth();
  const { instruments, selectedInstitution, setSelectedInstitution } = usePortalData();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);

  // Institution filter logic
  const institutionFiltered = instruments.filter((inst) => {
    if (selectedInstitution === 'ALL') return true;
    return inst.institutionCode === selectedInstitution;
  });

  // Status and search filtering
  const filteredInstruments = institutionFiltered.filter((inst) => {
    if (statusFilter !== 'ALL' && inst.lifecycleStatus !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchFdr = inst.fdrNumber.toLowerCase().includes(term);
      const matchBank = inst.bankName.toLowerCase().includes(term);
      const matchInst = inst.institution.toLowerCase().includes(term);
      const matchBranch = inst.branch.toLowerCase().includes(term);
      if (!matchFdr && !matchBank && !matchInst && !matchBranch) {
        return false;
      }
    }
    return true;
  });

  // Dynamic calculations based on active institution view
  const totalPrincipal = institutionFiltered.reduce((sum, i) => sum + i.principalAmount, 0);
  const activeCount = institutionFiltered.filter((i) => i.lifecycleStatus === 'ACTIVE').length;
  const expiringCount = institutionFiltered.filter((i) => i.lifecycleStatus === 'EXPIRING_SOON').length;
  const scrutinyCount = institutionFiltered.filter((i) => i.lifecycleStatus === 'UNDER_SCRUTINY').length;

  // Primary active instrument for the Finovate-style card widget
  const primaryInstrument =
    institutionFiltered.find((i) => i.lifecycleStatus === 'ACTIVE') || institutionFiltered[0] || instruments[0];

  return (
    <div className="page-content space-y-5">
      {/* Role Oversight Advisory (if viewing as non-institution) */}
      {role !== 'INSTITUTION' && (
        <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Building size={16} className="text-[#10B981] flex-shrink-0" />
            <div>
              <strong>Administrative Oversight Mode:</strong> You are inspecting the Institutional Deposit Register
              as <strong className="text-emerald-950 font-bold">{role}</strong>. All field queries and audit inspections are logged.
            </div>
          </div>
          <span className="text-[10px] font-mono bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 text-emerald-800 font-semibold shadow-2xs">
            READ-ONLY INSPECTION
          </span>
        </div>
      )}

      {/* Institution Banner & Switcher (Finovate Header Style) */}
      <div className="card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              INSTITUTION PORTAL
            </span>
            <span className="text-xs text-slate-500 font-mono">
              AISHE / AICTE CODE:{' '}
              <strong className="text-slate-900 font-semibold">
                {selectedInstitution === 'PIT-MH-001'
                  ? '1-348910283'
                  : selectedInstitution === 'MITCOE-MH-014'
                  ? '1-748190241'
                  : selectedInstitution === 'COEP-MH-002'
                  ? '1-102948122'
                  : 'PAN-INDIA REGISTRY'}
              </strong>
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            {selectedInstitution === 'PIT-MH-001'
              ? 'Pune Institute of Technology, Maharashtra'
              : selectedInstitution === 'MITCOE-MH-014'
              ? 'MIT College of Engineering, Pune'
              : selectedInstitution === 'COEP-MH-002'
              ? 'COEP Technological University, Pune'
              : 'All Registered Technical Institutions (Consolidated National View)'}
          </h1>
          <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
            Statutory Security Deposit & FDR Joint Lien Register under AICTE Approval Process Handbook (APH 2024–27).
            Continuous automated verification against Core Banking systems.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-slate-500 px-1">Switch:</span>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="PIT-MH-001">Pune Institute of Technology</option>
              <option value="MITCOE-MH-014">MIT College of Engineering</option>
              <option value="COEP-MH-002">COEP Technological University</option>
              <option value="ALL">All Registered Institutions (National)</option>
            </select>
          </div>

          <Link to="/institution/submit" className="btn-primary text-xs">
            <PlusCircle size={14} />
            <span>Submit New FDR</span>
          </Link>
          <Link to="/lifecycle" className="btn-secondary text-xs">
            <Clock size={14} />
            <span>Maturity Alerts</span>
          </Link>
        </div>
      </div>

      <MockLabel text="All bank API responses and core banking verification states are simulated for the SIH 2026 prototype." />

      {/* Top Section: Finovate-Style Digital Security Deposit Card + Modern KPI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Digital Security Deposit Card Widget (inspired directly by Finovate 'My Cards' in fdr5.webp) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-5 shadow-lg border border-slate-700/50 flex-1 flex flex-col justify-between min-h-[220px]">
            {/* Holographic Security Waves Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="sec-waves" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 0 20 Q 10 10 20 20 T 40 20" fill="none" stroke="#10B981" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#sec-waves)" />
              </svg>
            </div>

            {/* Glowing Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#10B981]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#10B981]/30 border border-[#10B981]/60 flex items-center justify-center text-emerald-400 font-bold text-[10px]">
                  AS
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 leading-none">
                    AICTE SECURITY DEPOSIT
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">STATUTORY LIEN HOLD</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Wifi size={14} className="rotate-90 text-emerald-400" />
              </div>
            </div>

            {/* EMV Chip & Masked Certificate */}
            <div className="my-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                {/* Chip graphic */}
                <div className="w-9 h-7 rounded bg-gradient-to-br from-amber-300 to-amber-500 border border-amber-600/60 shadow-xs flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-px bg-amber-700/50 absolute top-2" />
                  <div className="w-full h-px bg-amber-700/50 absolute bottom-2" />
                  <div className="h-full w-px bg-amber-700/50 absolute left-3" />
                  <div className="h-full w-px bg-amber-700/50 absolute right-3" />
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-slate-200">
                  {primaryInstrument ? primaryInstrument.fdrNumber : 'FDR/SBI/2024/001847'}
                </span>
              </div>
              <div className="text-2xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span>₹</span>
                <span>{primaryInstrument ? primaryInstrument.principalAmount.toLocaleString('en-IN') : '25,00,000'}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-end justify-between relative z-10 text-[10px] pt-2 border-t border-white/10">
              <div>
                <div className="text-slate-400 uppercase tracking-wider text-[8px]">ISSUING BANK & BRANCH</div>
                <div className="font-semibold text-slate-200 truncate max-w-[170px]">
                  {primaryInstrument ? `${primaryInstrument.bankName} (${primaryInstrument.branch})` : 'State Bank of India'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-400 uppercase tracking-wider text-[8px]">MATURITY DATE</div>
                <div className="font-mono font-bold text-emerald-400">
                  {primaryInstrument ? primaryInstrument.maturityDate : '15 Jan 2026'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 4 Finovate-Style Stat Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <StatCard
            label="Total Active Deposit Value"
            value={`₹${totalPrincipal.toLocaleString('en-IN')}`}
            sublabel={`${activeCount} Active Verified Instruments`}
            icon={<ShieldCheck size={18} />}
            trend="100% Guaranteed"
            trendColor="green"
            borderAccent="#10B981"
          />
          <StatCard
            label="Expiring (Next 30 Days)"
            value={`${expiringCount} FDR`}
            sublabel="Immediate renewal/extension required"
            icon={<Clock size={18} />}
            trend="T-15 Notice"
            trendColor="red"
            borderAccent="#EF4444"
          />
          <StatCard
            label="Under Scrutiny"
            value={`${scrutinyCount} Case`}
            sublabel="Regional Officer verification active"
            icon={<FileCheck2 size={18} />}
            trend="In Review"
            trendColor="amber"
            borderAccent="#F59E0B"
          />
          <StatCard
            label="Total Filed Instruments"
            value={`${institutionFiltered.length}`}
            sublabel="Historical & active records maintained"
            icon={<CheckCircle size={18} />}
            trend="Synchronized"
            trendColor="blue"
            borderAccent="#10B981"
          />
        </div>
      </div>

      {/* Active Maturity Alert Banner if expiring */}
      {expiringCount > 0 && (
        <div className="alert-box-red flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 text-red-700">
              <Clock size={18} />
            </div>
            <div>
              <span className="font-bold text-red-950 text-xs">CRITICAL MATURITY WARNING — T-15 NOTICE:</span>{' '}
              <span className="text-red-900 text-xs">
                Instrument <strong>FDR/HDFC/2023/003421</strong> (Principal ₹25,00,000) matures in <strong>5 days</strong> (02 Nov 2024).
                Non-renewal will trigger Clause 2.22(h) statutory hold on academic admissions.
              </span>
            </div>
          </div>
          <Link to="/institution/submit" className="btn-danger flex-shrink-0 text-xs">
            Initiate Renewal Form
          </Link>
        </div>
      )}

      {/* Instruments Table with search & status filter */}
      <div className="card">
        {/* Card Header & Controls */}
        <div className="p-4 border-b border-slate-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Security Deposit Instruments Register</h2>
            <p className="text-xs text-slate-500">Official statutory ledger of pledged FDRs and guarantee instruments</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search FDR, bank, branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition-all"
              />
            </div>

            {/* Modern Filter Tabs Bar */}
            <div className="flex items-center bg-slate-100/90 rounded-xl p-1 border border-slate-200/80">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'ACTIVE', label: 'Active' },
                { id: 'EXPIRING_SOON', label: 'Expiring Soon' },
                { id: 'UNDER_SCRUTINY', label: 'Scrutiny' },
                { id: 'MATURED', label: 'Matured' },
                { id: 'RELEASED', label: 'Released' },
              ].map((tab) => {
                const isActive = statusFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>FDR Number</th>
                <th>Bank & Branch</th>
                <th>Principal Amount</th>
                <th>Issue Date</th>
                <th>Maturity Date</th>
                <th>Days Remaining</th>
                <th>Lien Endorsement</th>
                <th>Lifecycle Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstruments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-500 text-xs">
                    No instruments match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredInstruments.map((inst) => {
                  const daysLeft = inst.daysToMaturity;
                  const daysBadge =
                    daysLeft < 0 ? (
                      <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full text-xs font-mono font-medium">
                        Matured ({Math.abs(daysLeft)}d ago)
                      </span>
                    ) : daysLeft <= 15 ? (
                      <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-xs font-mono font-bold inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        {daysLeft} days
                      </span>
                    ) : daysLeft <= 30 ? (
                      <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                        {daysLeft} days
                      </span>
                    ) : (
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-mono font-semibold">
                        {daysLeft} days
                      </span>
                    );

                  return (
                    <tr key={inst.id} className="hover:bg-emerald-50/20 transition-colors">
                      <td>
                        <div className="font-bold text-slate-900 font-mono text-xs">{inst.fdrNumber}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{inst.institution}</div>
                      </td>
                      <td>
                        <div className="font-semibold text-slate-800">{inst.bankName}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {inst.ifsc} • {inst.branch}
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-slate-900 font-mono text-sm">
                          ₹{inst.principalAmount.toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="text-slate-600 text-xs font-medium">{inst.issueDate}</td>
                      <td className="text-slate-900 font-semibold text-xs">{inst.maturityDate}</td>
                      <td>{daysBadge}</td>
                      <td>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          AICTE Joint Lien
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={inst.lifecycleStatus} />
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedInstrument(inst)}
                            className="btn-secondary text-[11px] py-1 px-2.5 inline-flex items-center gap-1 shadow-2xs"
                            title="Open Official Instrument Dossier"
                          >
                            <FileText size={12} className="text-[#10B981]" />
                            <span>Dossier</span>
                          </button>
                          {inst.lifecycleStatus === 'UNDER_SCRUTINY' && (
                            <Link
                              to={`/scrutiny/cases/${inst.id === 'ins-002' ? 'SCR-2024-089' : 'SCR-2024-087'}`}
                              className="btn-primary text-[11px] py-1 px-2.5 inline-flex items-center gap-1 shadow-2xs"
                              title="Inspect Scrutiny Case"
                            >
                              <ExternalLink size={11} />
                              <span>Scrutiny</span>
                            </Link>
                          )}
                          {inst.lifecycleStatus === 'EXPIRING_SOON' && (
                            <Link to="/institution/submit" className="btn-danger text-[11px] py-1 px-2.5 font-semibold shadow-2xs">
                              Renew
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Instrument Dossier Modal (Redesigned with Modern Finovate Aesthetics) */}
      {selectedInstrument && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <AicteEmblem className="h-10 w-auto" />
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                    ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Statutory Fixed Deposit Receipt Dossier
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    REF: AICTE/FDR-VAULT/{selectedInstrument.fdrNumber.replace(/\//g, '-')}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInstrument(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate Parchment Box */}
            <div className="bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-slate-300 rounded-2xl p-5 space-y-3 relative shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">ISSUING BANK</span>
                  <div className="font-bold text-base text-slate-900">{selectedInstrument.bankName}</div>
                  <div className="text-[11px] font-mono text-slate-500">{selectedInstrument.branch} • IFSC: {selectedInstrument.ifsc}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">DEPOSIT CERTIFICATE NO.</span>
                  <div className="font-mono font-bold text-xs text-slate-900">{selectedInstrument.fdrNumber}</div>
                  <div className="mt-1">
                    <StatusBadge status={selectedInstrument.lifecycleStatus} />
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-slate-500 text-[10px] font-semibold uppercase">Principal Amount:</span>
                  <div className="font-mono font-bold text-base text-slate-900">
                    ₹{selectedInstrument.principalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-semibold uppercase">Issue Date:</span>
                  <div className="font-medium text-slate-900 text-xs">{selectedInstrument.issueDate}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-semibold uppercase">Maturity Date:</span>
                  <div className="font-bold text-slate-900 text-xs">{selectedInstrument.maturityDate}</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 text-[10px] font-semibold uppercase">Pledged In Favor Of:</span>
                  <div className="font-semibold text-slate-900 text-xs">
                    Regional Officer, AICTE & {selectedInstrument.holderName} (Joint Lien)
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-semibold uppercase">Days to Maturity:</span>
                  <div className="font-mono font-bold text-slate-900 text-xs">
                    {selectedInstrument.daysToMaturity < 0
                      ? `Overdue (${Math.abs(selectedInstrument.daysToMaturity)}d)`
                      : `${selectedInstrument.daysToMaturity} Days`}
                  </div>
                </div>
              </div>

              {/* Statutory Endorsement Block */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1 text-slate-700 shadow-2xs">
                <div className="font-bold text-emerald-800 uppercase flex items-center gap-1.5 text-[11px]">
                  <Lock size={12} className="text-[#10B981]" /> Statutory Lien Declaration (Clause 1.4 APH):
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  "The principal sum of ₹{selectedInstrument.principalAmount.toLocaleString('en-IN')} is irrevocably pledged to the All India Council for Technical Education as a permanent security deposit. No premature liquidation, loan against deposit, or revocation is permissible without official written Sanction Order & Bank NOC issued by the AICTE Regulation Bureau."
                </p>
              </div>

              {/* Official Stamp */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <ShieldCheck size={12} /> DIGITALLY CERTIFIED VIA CCA-APPROVED BANK CA CHAIN
                </span>
                <span className="font-mono text-slate-400">HASH: 3f9ad1b2c4e5f6a7...</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                Verified against Core Banking simulated adapter • CERT-In certified vault
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-secondary text-xs"
                >
                  <Printer size={13} />
                  <span>Print Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInstrument(null)}
                  className="btn-primary text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
