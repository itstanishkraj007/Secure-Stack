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
  FileCheck,
  Printer,
  Send,
  Lock,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { usePortalData } from '../../context/PortalDataContext';
import { useAuth } from '../../context/AuthContext';
import { caseHistory } from '../../data/fixtures/scrutiny';
import StatusBadge from '../../components/ui/StatusBadge';
import MockLabel from '../../components/ui/MockLabel';
import { AicteEmblem } from '../../components/common/AicteLogo';

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { scrutinyCases, recordScrutinyDecision } = usePortalData();

  const [activeTab, setActiveTab] = useState<'VERIFICATION' | 'DISCREPANCIES' | 'DECISION' | 'HISTORY'>('VERIFICATION');

  // Decision State
  const [decision, setDecision] = useState<'APPROVE' | 'HOLD' | 'REJECT'>('HOLD');
  const [decisionNote, setDecisionNote] = useState(
    'Principal amount confirmed by core banking system (₹23,75,00,000) differs from submitted FDR claim (₹25,00,000) by ₹1,25,000. Statutory deficit notice (Form DEF-1) issued to institutional nodal officer.'
  );
  const [isDecisionSaved, setIsDecisionSaved] = useState(false);
  const [showDeficitNotice, setShowDeficitNotice] = useState(false);
  const [memoDispatched, setMemoDispatched] = useState(false);

  const scrutinyCase = scrutinyCases.find((c) => c.id === id) || scrutinyCases[0];

  const handleSaveDecision = (e: React.FormEvent) => {
    e.preventDefault();
    const mappedStatus = decision === 'APPROVE' ? 'RESOLVED' : decision === 'HOLD' ? 'HOLD' : 'ESCALATED';
    recordScrutinyDecision(scrutinyCase.id, mappedStatus, decisionNote, user.email);
    setIsDecisionSaved(true);
  };

  const handleDispatchMemo = () => {
    setMemoDispatched(true);
    recordScrutinyDecision(scrutinyCase.id, 'HOLD', 'Form DEF-1 Deficit Memo formally dispatched to institution.', user.email);
  };

  return (
    <div className="page-content space-y-5">
      {/* Case Header Card (Finovate Style) */}
      <div className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
              {scrutinyCase.id}
            </span>
            <StatusBadge status={scrutinyCase.severity} />
            <StatusBadge status={isDecisionSaved ? (decision === 'APPROVE' ? 'RESOLVED' : 'HOLD') : scrutinyCase.status} />
          </div>

          <h1 className="text-lg font-bold text-slate-900 mt-2 flex items-center gap-2 flex-wrap">
            <span>{scrutinyCase.institution}</span>
            <span className="text-slate-300 font-normal">|</span>
            <span className="font-mono text-emerald-700">{scrutinyCase.fdrNumber}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
            <span>BANK: <strong className="text-slate-800">{scrutinyCase.bank}</strong></span>
            <span>•</span>
            <span>OFFICER: <strong className="text-slate-800">{scrutinyCase.assignedToName || user.name}</strong></span>
            <span>•</span>
            <span>INGRESS: <strong className="text-slate-800 font-mono">{scrutinyCase.createdAt}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link to="/scrutiny/queue" className="btn-secondary text-xs flex items-center gap-1.5">
            <ArrowLeft size={14} />
            <span>Back to Queue</span>
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

      {/* Tabs (Finovate Pill Style) */}
      <div className="card">
        <div className="flex border-b border-slate-200/80 bg-slate-50/70 p-2 gap-1 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'VERIFICATION', label: 'Triple-Source Reconciliation Panel', icon: ShieldAlert },
            { id: 'DISCREPANCIES', label: `Discrepancy Register (${scrutinyCase.discrepancies.length})`, icon: AlertTriangle },
            { id: 'DECISION', label: 'Officer Scrutiny Ruling', icon: UserCheck },
            { id: 'HISTORY', label: 'Case Audit Trail', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: TRIPLE SOURCE VERIFICATION */}
        {activeTab === 'VERIFICATION' && (
          <div className="p-5 space-y-6">
            {/* Discrepancy Highlight Box if present */}
            {scrutinyCase.discrepancies.length > 0 && (
              <div className="alert-box-red flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 text-red-700 mt-0.5">
                    <AlertTriangle size={18} />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-red-950 text-xs">
                      STATUTORY DISCREPANCY DETECTED — PRINCIPAL DEPOSIT DEFICIT
                    </div>
                    <p className="text-xs text-red-900 leading-relaxed">
                      The institution submitted a claimed deposit of <strong>₹25,00,000</strong>. However, authoritative
                      core banking confirmation indicates an actual balance of <strong>₹23,75,000</strong> (Net Deficit:{' '}
                      <strong className="text-red-700">-₹1,25,000</strong>).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDeficitNotice(true)}
                  className="btn-danger text-xs flex-shrink-0 py-2 px-3.5 flex items-center gap-1.5 shadow-2xs"
                >
                  <FileText size={13} />
                  <span>Preview Deficit Memo (Form DEF-1)</span>
                </button>
              </div>
            )}

            {/* Reconciliation Table */}
            <div>
              <div className="section-header">
                <div>
                  <h3 className="section-title">Field-by-Field Dual Source Verification Matrix</h3>
                  <p className="text-xs text-slate-500">
                    Compares Submitted Institution Claim against Tesseract OCR Vision and Core Banking System (CBS)
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs font-semibold">
                  RECONCILIATION ENGINE v1.2
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs mt-3">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Document Field</th>
                      <th>1. Submitted Claim</th>
                      <th>2. OCR Extracted Value</th>
                      <th>OCR Confidence</th>
                      <th>3. Core Banking Record</th>
                      <th className="text-right">Reconciliation Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrutinyCase.tripleSourceData.map((field, idx) => {
                      const isMismatch = field.match === 'MISMATCH';
                      return (
                        <tr
                          key={idx}
                          className={`hover:bg-emerald-50/20 transition-colors ${
                            isMismatch ? 'bg-rose-50/50 font-semibold' : ''
                          }`}
                        >
                          <td className="font-semibold text-slate-900">
                            {field.displayName}
                          </td>
                          <td className="font-mono text-slate-900">
                            {field.submittedValue}
                          </td>
                          <td className="font-mono text-slate-800">
                            {field.ocrValue || <span className="text-slate-400 italic">Not extracted</span>}
                          </td>
                          <td>
                            {field.ocrConfidence ? (
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-full font-mono ${
                                  field.ocrConfidence >= 0.9
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : field.ocrConfidence >= 0.7
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {(field.ocrConfidence * 100).toFixed(0)}%
                              </span>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td className={`font-mono ${isMismatch ? 'text-rose-700 font-bold' : 'text-slate-800'}`}>
                            {field.bankValue || <span className="text-slate-400 italic">Unreachable</span>}
                          </td>
                          <td className="text-right">
                            {field.match === 'FULL_MATCH' ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                                <Check size={12} /> MATCH
                              </span>
                            ) : field.match === 'MISMATCH' ? (
                              <span className="inline-flex items-center gap-1 text-rose-700 text-xs font-bold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-300 shadow-2xs">
                                <X size={12} /> VARIANCE DEFICIT
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-600 text-xs font-bold bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
                                UNAVAILABLE
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

            {/* Verification Pipeline Checks Table */}
            <div>
              <div className="section-header">
                <div>
                  <h3 className="section-title">Automated Verification Pipeline Checks</h3>
                  <p className="text-xs text-slate-500">Automated pre-flight security, signature, and cryptographic checks</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs mt-3">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Verification Domain</th>
                      <th>Evaluator / Worker</th>
                      <th>Status</th>
                      <th>Detailed Finding & Cryptographic Evidence</th>
                      <th className="text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrutinyCase.verificationChecks.map((chk, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/20 transition-colors">
                        <td className="font-semibold text-slate-900 text-xs">
                          {chk.displayName}
                        </td>
                        <td className="text-slate-600 text-[11px] font-mono">
                          {chk.source}
                        </td>
                        <td>
                          <StatusBadge status={chk.status} />
                        </td>
                        <td className="text-slate-700 text-xs max-w-md leading-relaxed">
                          {chk.details}
                        </td>
                        <td className="text-right text-[11px] font-mono text-slate-400">
                          {chk.timestamp}
                        </td>
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
          <div className="p-5 space-y-4">
            <div className="section-header">
              <div>
                <h3 className="section-title">Discrepancy Exception Register</h3>
                <p className="text-xs text-slate-500">Formal legal exceptions logged by the automated engine</p>
              </div>
            </div>

            {scrutinyCase.discrepancies.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200">
                No unresolved discrepancies logged for this instrument dossier.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Field</th>
                      <th>Submitted Claim</th>
                      <th>Observed Authority Value</th>
                      <th>Source Origin</th>
                      <th>Severity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrutinyCase.discrepancies.map((d) => (
                      <tr key={d.id} className="bg-rose-50/40">
                        <td className="font-mono font-bold text-slate-900">{d.id}</td>
                        <td className="font-semibold text-slate-900">{d.fieldName}</td>
                        <td className="font-mono text-slate-800">{d.submittedValue}</td>
                        <td className="font-mono font-bold text-rose-700">{d.observedValue}</td>
                        <td className="text-[11px] text-slate-600 font-mono">{d.sourceReference}</td>
                        <td><StatusBadge status={d.severity} /></td>
                        <td><StatusBadge status={d.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OFFICER DECISION */}
        {activeTab === 'DECISION' && (
          <div className="p-6 max-w-3xl space-y-6">
            <div className="space-y-1">
              <h3 className="section-title text-base">Official Regional Scrutiny Ruling</h3>
              <p className="text-xs text-slate-500">
                Record your administrative determination under Section 10(k) of the AICTE Act 1987:
              </p>
            </div>

            <form onSubmit={handleSaveDecision} className="space-y-5">
              <div className="space-y-2">
                <label className="field-label">Scrutiny Determination:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      decision === 'HOLD'
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decision"
                      value="HOLD"
                      checked={decision === 'HOLD'}
                      onChange={() => setDecision('HOLD')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-amber-950">Place on Hold (DEF-1)</div>
                      <div className="text-[11px] text-slate-500">Require institutional cure</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      decision === 'APPROVE'
                        ? 'border-[#10B981] bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decision"
                      value="APPROVE"
                      checked={decision === 'APPROVE'}
                      onChange={() => setDecision('APPROVE')}
                      className="text-[#10B981] focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-emerald-950">Approve & Certify</div>
                      <div className="text-[11px] text-slate-500">All covenants verified</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      decision === 'REJECT'
                        ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decision"
                      value="REJECT"
                      checked={decision === 'REJECT'}
                      onChange={() => setDecision('REJECT')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-rose-950">Reject Instrument</div>
                      <div className="text-[11px] text-slate-500">Critical non-compliance</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="field-label">Official Scrutiny Note & Statutory Directives:</label>
                <textarea
                  rows={4}
                  value={decisionNote}
                  onChange={(e) => setDecisionNote(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 mt-1 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Signed as: <strong className="text-slate-800">{user.name}</strong> ({user.designation})
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="btn-primary text-xs"
                  >
                    Commit Scrutiny Ruling to Ledger
                  </button>
                </div>
              </div>

              {isDecisionSaved && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-950 font-semibold flex items-center gap-2.5 shadow-2xs">
                  <CheckCircle2 size={18} className="text-emerald-700" />
                  <span>
                    Scrutiny ruling successfully committed. Case status updated and cryptographic audit event appended to ledger.
                  </span>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB 4: CASE AUDIT TRAIL */}
        {activeTab === 'HISTORY' && (
          <div className="p-6 max-w-3xl space-y-4">
            <div className="section-header">
              <div>
                <h3 className="section-title text-base">Case Operational Event Log</h3>
                <p className="text-xs text-slate-500">Immutable lifecycle sequence tracking every touchpoint</p>
              </div>
            </div>

            <div className="space-y-3">
              {caseHistory.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                  <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{item.action}</span>
                      <span className="text-[11px] font-mono text-slate-500">{item.timestamp}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Actor: <span className="font-mono text-slate-800 font-semibold">{item.actor}</span> • Type: {item.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FORM DEF-1 DEFICIT MEMO MODAL (High-Fidelity Document) */}
      {showDeficitNotice && (
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
                    Form DEF-1: Statutory Deficit & Variance Scrutiny Memo
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono">
                    DISPATCH REF: AICTE/WRO/SCR/2024/DEF-089
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeficitNotice(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Official Letterhead Body */}
            <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-300 rounded-2xl p-5 space-y-3.5 text-xs shadow-xs">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3 text-xs text-slate-700">
                <div>
                  <strong>TO:</strong><br />
                  The Principal / Director,<br />
                  MIT College of Engineering, Pune,<br />
                  Maharashtra - 411038
                </div>
                <div className="text-right">
                  <strong>DATE:</strong> 28 October 2024<br />
                  <strong>ZONE:</strong> Western Regional Office (Pune)<br />
                  <strong>STATUS:</strong> <span className="text-rose-700 font-bold">PROVISIONAL ENCUMBRANCE</span>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-900">
                SUBJECT: Shortfall in Fixed Deposit Receipt (FDR) Deposit Security under Clause 1.4 APH 2024–27
              </div>

              <p className="text-xs leading-relaxed text-slate-700">
                During automated dual-source scrutiny of instrument <strong>FDR/HDFC/2023/003421</strong>, a material variance was certified between your submitted claim and the actual balance confirmed by HDFC Bank Core Banking System:
              </p>

              {/* Variance Math Card */}
              <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 text-xs font-mono space-y-1.5 shadow-2xs">
                <div className="flex justify-between">
                  <span>1. Claimed Deposit Amount:</span>
                  <strong>₹25,00,000</strong>
                </div>
                <div className="flex justify-between text-rose-700">
                  <span>2. Bank Confirmed Ledger:</span>
                  <strong>- ₹23,75,000</strong>
                </div>
                <div className="flex justify-between border-t border-rose-200 pt-1.5 font-bold text-rose-900">
                  <span>NET STATUTORY SHORTFALL:</span>
                  <span>- ₹1,25,000 (5.00% Deficit)</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-700">
                <strong>STATUTORY DIRECTIVE:</strong> You are hereby instructed under Section 10(k) of the AICTE Act 1987 to cure this shortfall within <strong>15 calendar days</strong> by depositing an additional FDR of <strong>₹1,25,000</strong> drawn in joint lien with the Regional Officer, AICTE. Failure to comply shall result in withholding of Extension of Approval (EoA) for AY 2024–25.
              </p>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div>
                  <strong>Ravi Shankar Prasad</strong><br />
                  Regional Scrutiny Officer, Western Regional Office (Pune)
                </div>
                <div className="text-right font-mono">
                  <div className="font-semibold text-emerald-700">VERIFIED SECURE STACK DIGITAL SEAL</div>
                  <div className="text-slate-400 text-[10px]">HASH: 3f9ad1b2c4e5f6a7...</div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-secondary text-xs flex items-center gap-1.5"
              >
                <Printer size={13} />
                <span>Print Official Memo</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={memoDispatched}
                  onClick={handleDispatchMemo}
                  className="btn-danger text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Send size={13} />
                  <span>{memoDispatched ? 'Dispatched via Speed Post & Portal ✓' : 'Dispatch Statutory Notice'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeficitNotice(false)}
                  className="btn-secondary text-xs"
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
