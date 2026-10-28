import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  History,
  FileText,
  UserCheck,
  Building,
  Check,
  X,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { scrutinyCases, caseHistory } from '../../data/fixtures/scrutiny';
import StatusBadge from '../../components/ui/StatusBadge';
import MockLabel from '../../components/ui/MockLabel';

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'VERIFICATION' | 'DISCREPANCIES' | 'DECISION' | 'HISTORY'>('VERIFICATION');

  // Decision State
  const [decision, setDecision] = useState<'APPROVE' | 'HOLD' | 'REJECT'>('HOLD');
  const [decisionNote, setDecisionNote] = useState(
    'Principal amount confirmed by bank adapter (₹23,75,000) differs from submitted instrument (₹25,00,000) by ₹1,25,000. Statutory clarification notice issued to institution nodal officer.'
  );
  const [isDecisionSaved, setIsDecisionSaved] = useState(false);

  const scrutinyCase = scrutinyCases.find((c) => c.id === id) || scrutinyCases[0];

  const handleSaveDecision = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDecisionSaved(true);
  };

  return (
    <div className="page-content space-y-4">
      {/* Case Header Card */}
      <div className="card p-4 border-l-4 border-l-[#003366] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-[#003366] text-white px-2 py-0.5 rounded">
              {scrutinyCase.id}
            </span>
            <StatusBadge status={scrutinyCase.severity} />
            <StatusBadge status={isDecisionSaved ? 'RESOLVED' : scrutinyCase.status} />
          </div>

          <h1 className="text-base font-bold text-gray-900 mt-1 flex items-center gap-2">
            <span>{scrutinyCase.institution}</span>
            <span className="text-gray-400 font-normal">|</span>
            <span className="font-mono text-gray-700">{scrutinyCase.fdrNumber}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xxs text-gray-500 mt-1">
            <span>BANK: <strong>{scrutinyCase.bank}</strong></span>
            <span>•</span>
            <span>ASSIGNED: <strong>{scrutinyCase.assignedToName || 'Unassigned'}</strong></span>
            <span>•</span>
            <span>CREATED: <strong>{scrutinyCase.createdAt}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/scrutiny/queue" className="btn-secondary text-xs">
            ← Back to Queue
          </Link>
          <button
            type="button"
            onClick={() => setActiveTab('DECISION')}
            className="btn-primary text-xs"
          >
            Record Decision
          </button>
        </div>
      </div>

      <MockLabel text="Dual-source reconciliation runs against deterministic Mock Bank Adapter and sandboxed PyHanko/Tesseract workers." />

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b border-[#E2E8F0] bg-gray-50/70 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'VERIFICATION', label: '🌟 Triple-Source Reconciliation Panel', icon: ShieldAlert },
            { id: 'DISCREPANCIES', label: `Discrepancy Register (${scrutinyCase.discrepancies.length})`, icon: AlertTriangle },
            { id: 'DECISION', label: 'Officer Scrutiny Decision', icon: UserCheck },
            { id: 'HISTORY', label: 'Case Audit Trail', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-[#003366] text-[#003366] bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#003366]' : 'text-gray-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: TRIPLE SOURCE VERIFICATION (THE STAR) */}
        {activeTab === 'VERIFICATION' && (
          <div className="p-4 space-y-5">
            {/* Discrepancy Highlight Box if present */}
            {scrutinyCase.discrepancies.length > 0 && (
              <div className="alert-box-red flex items-start gap-3">
                <AlertTriangle size={18} className="text-red-700 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-red-900 text-xs">
                    MATERIAL DISCREPANCY DETECTED BY DUAL-SOURCE RECONCILIATION:
                  </div>
                  <div className="text-xs text-red-800">
                    The <strong>Principal Amount</strong> claimed by the institution is{' '}
                    <span className="font-mono font-bold">₹25,00,000</span>, whereas the authoritative mock bank adapter
                    reports a registered active balance of only{' '}
                    <span className="font-mono font-bold">₹23,75,000</span> (Deficit: <strong>₹1,25,000</strong> or 5.00%).
                    Automatic hold initiated under APH Procedural Guideline 2.4.
                  </div>
                </div>
              </div>
            )}

            {/* Triple Source Comparison Table */}
            <div>
              <div className="section-header">
                <div>
                  <h3 className="section-title">Triple-Source Cross-Verification Matrix</h3>
                  <p className="text-xxs text-gray-500">
                    Side-by-side reconciliation between Submitted Claims, OCR Extraction, and Core Bank Records
                  </p>
                </div>
                <span className="text-xxs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
                  RECON-ENGINE v1.4
                </span>
              </div>

              <div className="overflow-x-auto border border-[#E2E8F0] rounded">
                <table className="data-table">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="w-1/4">Field Attribute</th>
                      <th className="w-1/4">1. Submitted (Institution)</th>
                      <th className="w-1/4">2. OCR Extracted (Tesseract)</th>
                      <th className="w-1/4 bg-blue-50/60 text-blue-900">3. Bank Confirmed [MOCK]</th>
                      <th className="text-center">Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrutinyCase.tripleSourceData.map((row, idx) => {
                      const isMismatch = row.match === 'MISMATCH';
                      const isUnavailable = row.match === 'UNAVAILABLE';

                      return (
                        <tr
                          key={idx}
                          className={isMismatch ? 'bg-red-50/60' : ''}
                        >
                          <td className="font-semibold text-gray-800 flex items-center gap-1.5">
                            {isMismatch ? (
                              <X size={13} className="text-red-600 flex-shrink-0" />
                            ) : (
                              <Check size={13} className="text-green-600 flex-shrink-0" />
                            )}
                            <span>{row.displayName}</span>
                          </td>

                          <td className="font-mono text-gray-900 font-medium">
                            {row.submittedValue}
                          </td>

                          <td className="text-gray-800">
                            {row.ocrValue ? (
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-mono">{row.ocrValue}</span>
                                {row.ocrConfidence && (
                                  <span
                                    className={`text-xxs px-1 rounded font-bold ${
                                      row.ocrConfidence > 0.85
                                        ? 'text-green-700 bg-green-50'
                                        : 'text-amber-700 bg-amber-50'
                                    }`}
                                  >
                                    {Math.round(row.ocrConfidence * 100)}%
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 italic">Not in visual layout</span>
                            )}
                          </td>

                          <td className={`font-mono ${isMismatch ? 'font-bold text-red-700 bg-red-100/50' : 'text-gray-900'}`}>
                            {row.bankValue ? row.bankValue : (
                              <span className="text-gray-400 italic">Source Unavailable</span>
                            )}
                          </td>

                          <td className="text-center">
                            {isMismatch ? (
                              <span className="inline-flex items-center gap-1 text-xxs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">
                                ⚠ MISMATCH
                              </span>
                            ) : isUnavailable ? (
                              <span className="inline-flex items-center gap-1 text-xxs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                UNCONFIRMED
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xxs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                                ✓ RECONCILED
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Cryptographic & Adapter Checks */}
            <div>
              <div className="section-header">
                <div>
                  <h3 className="section-title">Detailed Cryptographic & Source Integrity Checks</h3>
                  <p className="text-xxs text-gray-500">
                    Independent verification outcomes — unknown status never converts to pass
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto border border-[#E2E8F0] rounded">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Check Name</th>
                      <th>Outcome</th>
                      <th>Engine / Source</th>
                      <th>Audit Evidence & Diagnostics</th>
                      <th>Timestamp (IST)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrutinyCase.verificationChecks.map((chk, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-gray-900">{chk.displayName}</td>
                        <td>
                          <StatusBadge status={chk.status} />
                        </td>
                        <td>
                          <div className="text-xs font-mono text-gray-700">{chk.source}</div>
                          {chk.isMock && (
                            <span className="text-xxs text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200 font-bold">
                              [MOCK ADAPTER]
                            </span>
                          )}
                        </td>
                        <td className="text-xs text-gray-700 max-w-md">
                          {chk.details}
                        </td>
                        <td className="text-xxs font-mono text-gray-500">{chk.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DISCREPANCIES */}
        {activeTab === 'DISCREPANCIES' && (
          <div className="p-4 space-y-4">
            <h3 className="section-title">Discrepancy Register & Resolution State</h3>

            {scrutinyCase.discrepancies.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <CheckCircle2 size={32} className="mx-auto text-green-600 mb-2" />
                <p className="text-xs font-semibold">No active field discrepancies recorded for this case.</p>
              </div>
            ) : (
              <div className="border border-[#E2E8F0] rounded overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Discrepancy ID</th>
                      <th>Field</th>
                      <th>Submitted Value</th>
                      <th>Observed / Bank Value</th>
                      <th>Detection Source</th>
                      <th>Severity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrutinyCase.discrepancies.map((d) => (
                      <tr key={d.id}>
                        <td className="font-mono text-xs font-bold text-gray-800">{d.id}</td>
                        <td className="font-semibold text-gray-900">{d.fieldName}</td>
                        <td className="font-mono text-gray-700">{d.submittedValue}</td>
                        <td className="font-mono text-red-700 font-bold">{d.observedValue}</td>
                        <td className="text-xs text-gray-600">{d.sourceReference}</td>
                        <td>
                          <StatusBadge status={d.severity} />
                        </td>
                        <td>
                          <StatusBadge status={d.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DECISION FORM */}
        {activeTab === 'DECISION' && (
          <div className="p-4 space-y-4 max-w-2xl">
            <h3 className="section-title">Officer Formal Scrutiny Determination</h3>
            <p className="text-xs text-gray-600">
              Under Regulation 6.46 AICTE APH, decisions require human officer accountability.
              Every submission creates an immutable hash-chained audit record.
            </p>

            {isDecisionSaved ? (
              <div className="alert-box-green p-4 space-y-2">
                <div className="font-bold text-green-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Determination Saved & Audited
                </div>
                <div className="text-xs text-green-800">
                  Officer action <strong>{decision}</strong> has been committed to the ledger with audit sequence{' '}
                  <span className="font-mono font-bold">#0892</span>. Notice dispatched to institution nodal desk.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveDecision} className="space-y-4">
                <div className="space-y-2">
                  <label className="field-label">Scrutiny Ruling</label>
                  <div className="grid grid-cols-3 gap-2">
                    <label
                      className={`border p-3 rounded cursor-pointer flex flex-col items-center gap-1 text-center transition-colors ${
                        decision === 'APPROVE'
                          ? 'border-green-600 bg-green-50/60 text-green-900 font-bold'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ruling"
                        checked={decision === 'APPROVE'}
                        onChange={() => setDecision('APPROVE')}
                        className="hidden"
                      />
                      <CheckCircle2 size={18} className="text-green-600" />
                      <span className="text-xs">Approve for Lifecycle</span>
                    </label>

                    <label
                      className={`border p-3 rounded cursor-pointer flex flex-col items-center gap-1 text-center transition-colors ${
                        decision === 'HOLD'
                          ? 'border-amber-600 bg-amber-50/60 text-amber-900 font-bold'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ruling"
                        checked={decision === 'HOLD'}
                        onChange={() => setDecision('HOLD')}
                        className="hidden"
                      />
                      <AlertCircle size={18} className="text-amber-600" />
                      <span className="text-xs">Hold for Clarification</span>
                    </label>

                    <label
                      className={`border p-3 rounded cursor-pointer flex flex-col items-center gap-1 text-center transition-colors ${
                        decision === 'REJECT'
                          ? 'border-red-600 bg-red-50/60 text-red-900 font-bold'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ruling"
                        checked={decision === 'REJECT'}
                        onChange={() => setDecision('REJECT')}
                        className="hidden"
                      />
                      <X size={18} className="text-red-600" />
                      <span className="text-xs">Reject Instrument</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="field-label">Findings & Regulatory Rationale</label>
                  <textarea
                    rows={4}
                    value={decisionNote}
                    onChange={(e) => setDecisionNote(e.target.value)}
                    className="w-full mt-1 bg-white border border-[#E2E8F0] rounded p-2.5 text-xs text-gray-800 font-sans focus:outline-none focus:border-[#003366]"
                    placeholder="Enter formal reasons, cited clauses, and requested institution evidence..."
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xxs text-gray-500 font-mono">
                    OFFICER: Ravi Shankar Prasad (AICTE-SCR-1023)
                  </div>
                  <button type="submit" className="btn-primary">
                    Commit Scrutiny Ruling
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: CASE AUDIT HISTORY */}
        {activeTab === 'HISTORY' && (
          <div className="p-4 space-y-3">
            <h3 className="section-title">Case Operational Audit Timeline</h3>

            <div className="border-l-2 border-[#003366] ml-2 space-y-4 pl-4 py-2">
              {caseHistory.map((item, idx) => (
                <div key={idx} className="relative text-xs">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#003366] border-2 border-white" />
                  <div className="font-semibold text-gray-800">{item.action}</div>
                  <div className="text-xxs text-gray-500 font-mono">
                    {item.timestamp} • Actor: {item.actor} • Type: {item.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
