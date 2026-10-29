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

  return (
    <div className="page-content space-y-4">
      {/* Role Oversight Advisory (if viewing as non-institution) */}
      {role !== 'INSTITUTION' && (
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded flex items-center justify-between text-xs text-[#1E40AF]">
          <div className="flex items-center gap-2">
            <Building size={16} className="text-[#003366] flex-shrink-0" />
            <div>
              <strong>Administrative Oversight Mode:</strong> You are inspecting the Institutional Deposit Register
              as <strong>{role}</strong>. All field queries and audit inspections are logged.
            </div>
          </div>
          <span className="text-xxs font-mono bg-white px-2 py-0.5 rounded border border-[#BFDBFE]">
            READ-ONLY INSPECTION
          </span>
        </div>
      )}

      {/* Institution Banner & Switcher */}
      <div className="card p-4 border-l-4 border-l-[#003366] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xxs font-bold text-[#003366] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              INSTITUTION PORTAL
            </span>
            <span className="text-xs text-gray-500 font-mono">
              AISHE / AICTE CODE:{' '}
              <strong className="text-gray-900">
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
          <h1 className="text-base font-bold text-[#003366]">
            {selectedInstitution === 'PIT-MH-001'
              ? 'Pune Institute of Technology, Maharashtra'
              : selectedInstitution === 'MITCOE-MH-014'
              ? 'MIT College of Engineering, Pune'
              : selectedInstitution === 'COEP-MH-002'
              ? 'COEP Technological University, Pune'
              : 'All Registered Technical Institutions (Consolidated National View)'}
          </h1>
          <p className="text-xs text-gray-600">
            Mandatory Security Deposit & FDR Joint Lien Register under AICTE Approval Process Handbook (APH 2024–27)
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 bg-gray-50 border border-[#E2E8F0] p-1 rounded text-xs">
            <span className="text-xxs font-semibold uppercase text-gray-500 px-1">Switch College:</span>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="bg-white border border-[#E2E8F0] rounded px-2 py-1 text-xs text-gray-800 font-medium cursor-pointer"
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Active Deposit Value"
          value={`₹${totalPrincipal.toLocaleString('en-IN')}`}
          sublabel={`${activeCount} Active Verified Instruments`}
          icon={<ShieldCheck size={18} />}
          borderAccent="#003366"
        />
        <StatCard
          label="Expiring (Next 30 Days)"
          value={`${expiringCount} FDR`}
          sublabel="Immediate renewal/extension required"
          icon={<Clock size={18} />}
          trend="T-15 Notice"
          trendColor="red"
          borderAccent="#B91C1C"
        />
        <StatCard
          label="Under Scrutiny"
          value={`${scrutinyCount} Case`}
          sublabel="Regional Officer verification active"
          icon={<FileCheck2 size={18} />}
          trend="In Review"
          trendColor="amber"
          borderAccent="#D97706"
        />
        <StatCard
          label="Total Filed Instruments"
          value={`${institutionFiltered.length}`}
          sublabel="Historical & active records maintained"
          icon={<CheckCircle size={18} />}
          borderAccent="#15803D"
        />
      </div>

      {/* Active Maturity Alert Banner if expiring */}
      {expiringCount > 0 && (
        <div className="alert-box-red flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Clock className="text-red-700 flex-shrink-0" size={18} />
            <div>
              <span className="font-bold text-red-900 text-xs">CRITICAL MATURITY WARNING — T-15 NOTICE:</span>{' '}
              <span className="text-red-800 text-xs">
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
        <div className="p-3 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Security Deposit Instruments Register</h2>
            <p className="text-xxs text-gray-500">Official statutory ledger of pledged FDRs and guarantee instruments</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search FDR, bank, branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-[#E2E8F0] rounded pl-8 pr-3 py-1 text-xs text-gray-800"
              />
            </div>

            {/* Filter by Status */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 text-xxs font-semibold uppercase">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-50 border border-[#E2E8F0] rounded px-2 py-1 text-xs text-gray-700 font-medium cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active Only</option>
                <option value="EXPIRING_SOON">Expiring Soon (≤30d)</option>
                <option value="UNDER_SCRUTINY">Under Scrutiny</option>
                <option value="MATURED">Matured / Overdue</option>
                <option value="RELEASED">Released</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>
        </div>

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
                  <td colSpan={9} className="text-center py-6 text-gray-500 text-xs">
                    No instruments match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredInstruments.map((inst) => {
                  const daysLeft = inst.daysToMaturity;
                  const daysColor =
                    daysLeft < 0
                      ? 'text-gray-400 font-normal'
                      : daysLeft <= 15
                      ? 'text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded'
                      : daysLeft <= 30
                      ? 'text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded'
                      : 'text-green-700 font-medium';

                  return (
                    <tr key={inst.id}>
                      <td>
                        <div className="font-semibold text-gray-900 font-mono text-xs">{inst.fdrNumber}</div>
                        <div className="text-xxs text-gray-500">{inst.institution}</div>
                      </td>
                      <td>
                        <div className="font-medium text-gray-800">{inst.bankName}</div>
                        <div className="text-xxs text-gray-500 font-mono">
                          {inst.ifsc} • {inst.branch}
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-gray-900 font-mono">
                          ₹{inst.principalAmount.toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="text-gray-600 text-xs">{inst.issueDate}</td>
                      <td className="text-gray-800 font-semibold text-xs">{inst.maturityDate}</td>
                      <td>
                        <span className={daysColor}>
                          {daysLeft < 0 ? `Matured (${Math.abs(daysLeft)}d ago)` : `${daysLeft} days`}
                        </span>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
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
                            className="btn-secondary text-xxs py-1 px-2.5 inline-flex items-center gap-1"
                            title="Open Official Instrument Dossier"
                          >
                            <FileText size={12} className="text-[#003366]" />
                            <span>Dossier</span>
                          </button>
                          {inst.lifecycleStatus === 'UNDER_SCRUTINY' && (
                            <Link
                              to={`/scrutiny/cases/${inst.id === 'ins-002' ? 'SCR-2024-089' : 'SCR-2024-087'}`}
                              className="btn-primary text-xxs py-1 px-2 inline-flex items-center gap-1"
                              title="Inspect Scrutiny Case"
                            >
                              <ExternalLink size={11} />
                              <span>Scrutiny</span>
                            </Link>
                          )}
                          {inst.lifecycleStatus === 'EXPIRING_SOON' && (
                            <Link to="/institution/submit" className="btn-danger text-xxs py-1 px-2 font-semibold">
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

      {/* Official Instrument Dossier Modal */}
      {selectedInstrument && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-[#E2E8F0] max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <AicteEmblem className="h-10 w-auto" />
                <div>
                  <span className="text-xxs font-bold text-[#003366] uppercase tracking-wider">
                    ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                  </span>
                  <h3 className="text-sm font-bold text-gray-900">
                    Statutory Fixed Deposit Receipt Dossier
                  </h3>
                  <div className="text-xxs text-gray-500 font-mono">
                    REF: AICTE/FDR-VAULT/{selectedInstrument.fdrNumber.replace(/\//g, '-')}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInstrument(null)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate Parchment Box */}
            <div className="bg-[#FAF8F5] border-2 border-[#D4C4A8] rounded p-5 space-y-3 relative shadow-inner">
              <div className="flex items-center justify-between border-b border-[#D4C4A8] pb-2">
                <div>
                  <span className="text-xxs uppercase tracking-wider font-semibold text-gray-600">ISSUING BANK</span>
                  <div className="font-bold text-sm text-[#003366]">{selectedInstrument.bankName}</div>
                  <div className="text-xxs font-mono text-gray-500">{selectedInstrument.branch} • IFSC: {selectedInstrument.ifsc}</div>
                </div>
                <div className="text-right">
                  <span className="text-xxs uppercase tracking-wider font-semibold text-gray-600">DEPOSIT CERTIFICATE NO.</span>
                  <div className="font-mono font-bold text-xs text-gray-900">{selectedInstrument.fdrNumber}</div>
                  <StatusBadge status={selectedInstrument.lifecycleStatus} />
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-gray-500 text-xxs">Principal Amount:</span>
                  <div className="font-mono font-bold text-sm text-gray-900">
                    ₹{selectedInstrument.principalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-xxs">Issue Date:</span>
                  <div className="font-medium text-gray-900">{selectedInstrument.issueDate}</div>
                </div>
                <div>
                  <span className="text-gray-500 text-xxs">Maturity Date:</span>
                  <div className="font-bold text-gray-900">{selectedInstrument.maturityDate}</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-500 text-xxs">Pledged In Favor Of:</span>
                  <div className="font-semibold text-gray-900">
                    Regional Officer, AICTE & {selectedInstrument.holderName} (Joint Lien)
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-xxs">Days to Maturity:</span>
                  <div className="font-mono font-bold text-gray-900">
                    {selectedInstrument.daysToMaturity < 0
                      ? `Overdue (${Math.abs(selectedInstrument.daysToMaturity)}d)`
                      : `${selectedInstrument.daysToMaturity} Days`}
                  </div>
                </div>
              </div>

              {/* Statutory Endorsement Block */}
              <div className="p-3 bg-white/90 border border-[#D4C4A8] rounded text-xxs space-y-1 text-gray-700">
                <div className="font-bold text-[#003366] uppercase flex items-center gap-1">
                  <Lock size={12} className="text-[#003366]" /> Statutory Lien Declaration (Clause 1.4 APH):
                </div>
                <p>
                  "The principal sum of ₹{selectedInstrument.principalAmount.toLocaleString('en-IN')} is irrevocably pledged to the All India Council for Technical Education as a permanent security deposit. No premature liquidation, loan against deposit, or revocation is permissible without official written Sanction Order & Bank NOC issued by the AICTE Regulation Bureau."
                </p>
              </div>

              {/* Official Stamp */}
              <div className="flex items-center justify-between pt-2 border-t border-[#D4C4A8] text-xxs text-gray-500">
                <span>DIGITALLY CERTIFIED VIA CCA-APPROVED BANK CA CHAIN</span>
                <span className="font-mono">HASH: 3f9ad1b2c4e5f6a7...</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xxs text-gray-500">
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
