import { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  FileCheck,
  FileText,
  UserCheck,
  Scale,
  Printer,
  X,
  Send,
  Download,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { usePortalData } from '../../context/PortalDataContext';
import { useAuth } from '../../context/AuthContext';
import { ClearanceGate } from '../../types';
import StatusBadge from '../../components/ui/StatusBadge';
import MockLabel from '../../components/ui/MockLabel';
import { AicteEmblem } from '../../components/common/AicteLogo';

export default function ClearanceHub() {
  const { user } = useAuth();
  const { releaseRequests, updateClearanceGate, issueSanctionOrder } = usePortalData();

  const [selectedRequestId, setSelectedRequestId] = useState<string>('REL-2024-012');
  const [showNocModal, setShowNocModal] = useState<boolean>(false);
  const [selectedGateForAction, setSelectedGateForAction] = useState<ClearanceGate | null>(null);
  const [complianceNote, setComplianceNote] = useState(
    'PGRC compliance certificate for AY 2023-24 received and cross-verified against State DTE records. Encumbrance cleared.'
  );

  const activeRequest = releaseRequests.find((r) => r.id === selectedRequestId) || releaseRequests[0];

  const allCleared = activeRequest.gates.every((g) => g.status === 'CLEARED');
  const hasHold = activeRequest.gates.some((g) => g.status === 'ON_HOLD');
  const hasRejected = activeRequest.gates.some((g) => g.status === 'REJECTED');

  const handleResolveGateHold = () => {
    if (!selectedGateForAction) return;
    updateClearanceGate(
      activeRequest.id,
      selectedGateForAction.number,
      'CLEARED',
      user.name,
      undefined
    );
    setSelectedGateForAction(null);
  };

  const handleClearGate5 = () => {
    updateClearanceGate(
      activeRequest.id,
      5,
      'CLEARED',
      'Adv. Priya Mehta',
      undefined
    );
  };

  const handleFinalApprove = () => {
    issueSanctionOrder(activeRequest.id, user.name);
    setShowNocModal(true);
  };

  return (
    <div className="page-content space-y-5">
      {/* Title (Finovate White Card) */}
      <div className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              SETTLEMENT & CLEARANCE DESK
            </span>
            <span className="text-xs text-slate-500 font-mono">REGULATION BUREAU • MULTI-CELL GATING</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 mt-1">
            Multi-Cell Clearance Hub & Release Authorization
          </h1>
          <p className="text-xs text-slate-500">
            Multi-stakeholder clearance gates (PGRC, Vigilance, Finance, Legal) enforcing zero-unauthorized deposit release
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            Requests in Bureau: <strong className="text-emerald-700 font-bold">{releaseRequests.length}</strong>
          </span>
        </div>
      </div>

      <MockLabel text="Clearance gates are strictly sequential. Settlement authorization is locked until all required cells approve with signed audit hash." />

      {/* Select Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {releaseRequests.map((req) => {
          const isSelected = req.id === selectedRequestId;
          return (
            <div
              key={req.id}
              onClick={() => setSelectedRequestId(req.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'border-[#10B981] bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono font-bold text-slate-900">{req.id}</span>
                <StatusBadge status={req.overallStatus} />
              </div>
              <div className="font-semibold text-slate-900 text-xs truncate">{req.institution}</div>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                <span>Principal: <strong className="font-mono text-slate-900 font-bold">₹{req.amount.toLocaleString('en-IN')}</strong></span>
                <span className="font-mono text-[11px] text-slate-400">{req.fdrNumber}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Clearance Dossier */}
      <div className="card p-6 space-y-6">
        {/* Release Request Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 font-mono">{activeRequest.id}</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-bold text-slate-800">{activeRequest.institution}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Instrument: <strong className="font-mono text-slate-700">{activeRequest.fdrNumber}</strong> • Requested by:{' '}
              <strong className="text-slate-700">{activeRequest.requestedBy}</strong> ({activeRequest.requestedAt})
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-500">Security Deposit Value:</span>
            <span className="text-lg font-bold text-emerald-700 font-mono">
              ₹{activeRequest.amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Blocking Alert if held or blocked */}
        {!allCleared ? (
          <div className="alert-box-red space-y-1.5 shadow-2xs">
            <div className="font-bold text-rose-950 text-xs flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-600" /> RELEASE BLOCKED BY STATUTORY GOVERNANCE POLICY
            </div>
            <p className="text-xs text-rose-900 leading-relaxed">
              The release of principal funds and issuance of the Bank NOC is{' '}
              <strong>strictly blocked</strong> until every applicable institutional clearance gate is certified.
              No individual officer possesses override authority without clearing outstanding holds.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-950 font-semibold flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={20} className="text-emerald-700" />
              <span>
                ALL 5 CLEARANCE GATES CERTIFIED — OFFICIAL RELEASE SANCTION UNLOCKED
              </span>
            </div>
            <span className="text-[11px] font-mono bg-emerald-200/80 text-emerald-950 px-3 py-1 rounded-full font-bold">
              READY FOR NOC
            </span>
          </div>
        )}

        {/* Clearance Gates Table */}
        <div>
          <div className="section-header">
            <div>
              <h3 className="section-title">Cell-Wise Clearance Gate Evaluation</h3>
              <p className="text-xs text-slate-500">Five independent statutory cells must sign off in sequence</p>
            </div>
            <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              GATE POLICY v2.4 (APH Cl. 2.22)
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs mt-3">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12 text-center">Gate</th>
                  <th>Clearance Domain</th>
                  <th>Responsible Cell</th>
                  <th>Designated Officer</th>
                  <th>Current Status</th>
                  <th>Hold / Scrutiny Reason</th>
                  <th>Updated On</th>
                  <th className="text-right">Officer Action</th>
                </tr>
              </thead>
              <tbody>
                {activeRequest.gates.map((g) => {
                  const isHold = g.status === 'ON_HOLD';
                  const isBlocked = g.isSequentiallyBlocked;

                  return (
                    <tr key={g.id} className={`hover:bg-emerald-50/20 transition-colors ${isHold ? 'bg-rose-50/40' : ''}`}>
                      <td className="text-center font-bold text-slate-500 font-mono">#{g.number}</td>
                      <td className="font-semibold text-slate-900">{g.gateName}</td>
                      <td className="text-slate-700 text-xs">{g.responsibleCell}</td>
                      <td>
                        {g.officerName ? (
                          <span className="text-xs text-slate-800 font-medium">{g.officerName}</span>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Pending Assignment</span>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={g.status} />
                      </td>
                      <td className="text-xs text-slate-700 max-w-xs leading-relaxed">
                        {g.holdReason ? (
                          <div className="text-rose-900 bg-rose-50 p-2 rounded-xl text-[11px] font-medium border border-rose-200">
                            {g.holdReason}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">No encumbrance noted</span>
                        )}
                      </td>
                      <td className="text-[11px] font-mono text-slate-400">
                        {g.updatedAt || '—'}
                      </td>
                      <td className="text-right">
                        {isHold ? (
                          <button
                            type="button"
                            onClick={() => setSelectedGateForAction(g)}
                            className="btn-danger text-[11px] py-1 px-3 inline-flex items-center gap-1.5 font-bold shadow-2xs"
                            title="Review compliance documents and resolve hold"
                          >
                            <Unlock size={12} />
                            <span>Resolve Hold</span>
                          </button>
                        ) : g.number === 5 && g.status === 'PENDING' ? (
                          <button
                            type="button"
                            onClick={handleClearGate5}
                            className="btn-primary text-[11px] py-1 px-3 inline-flex items-center gap-1.5 font-bold shadow-2xs"
                            title="Sign legal clearance"
                          >
                            <CheckCircle2 size={12} />
                            <span>Certify Gate 5</span>
                          </button>
                        ) : isBlocked ? (
                          <span className="text-xs text-slate-400 font-mono italic">
                            🔒 Blocked by Gate #{g.number - 1}
                          </span>
                        ) : (
                          <span className="text-emerald-700 text-xs font-bold inline-flex items-center gap-1">
                            ✓ Certified
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

        {/* Penalty Simulation Engine Box */}
        <div className="card p-5 bg-amber-50/50 border border-amber-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
              <Scale size={18} className="text-amber-700" />
              <span>Automated Statutory Penalty Assessment (Simulation Engine)</span>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              CANDIDATE RULE (SIMULATION MODE)
            </span>
          </div>

          <div className="text-xs text-amber-950 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-white p-3 rounded-xl border border-amber-200 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Applicable Clause:</span>{' '}
                <div className="text-slate-900 font-mono font-bold mt-0.5">RULE-04 (APH Cl. 2.22h)</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Violation Category:</span>{' '}
                <div className="text-slate-900 font-semibold mt-0.5">Missing Extension of Approval (EoA)</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Statutory Assessment:</span>{' '}
                <div className="text-rose-700 font-bold font-mono text-sm mt-0.5">10% of Principal (₹2,50,000)</div>
              </div>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              <em>Note:</em> Per product principles, candidate rules execute strictly in non-binding simulation mode
              until authoritative legal sign-off from Regulation Bureau is committed.
            </p>
          </div>
        </div>

        {/* Final Release Action Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {allCleared ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={16} /> All 5 clearance gates certified. Settlement authorization active.
              </span>
            ) : (
              <span className="text-rose-700 font-bold flex items-center gap-1.5">
                <Lock size={15} /> Settlement Action Gated: Pending resolution of held cells.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!allCleared}
              onClick={handleFinalApprove}
              className={allCleared ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}
            >
              {allCleared ? <Unlock size={14} /> : <Lock size={14} />}
              <span>Generate Bank NOC & Sanction Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* RESOLVE HOLD MODAL (Interactive Gate Sign-off) */}
      {selectedGateForAction && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Unlock size={18} className="text-[#10B981]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Resolve Gate #{selectedGateForAction.number} Hold ({selectedGateForAction.responsibleCell})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGateForAction(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-xl"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
              <div className="font-bold">Original Hold Justification:</div>
              <p className="text-xs leading-relaxed text-rose-900">{selectedGateForAction.holdReason}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="field-label">Compliance Clearance Verification Note:</label>
              <textarea
                rows={3}
                value={complianceNote}
                onChange={(e) => setComplianceNote(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedGateForAction(null)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResolveGateHold}
                className="btn-primary text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 size={13} />
                <span>Certify Gate Clearance & Unlock Next Stage</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOC SANCTION ORDER MODAL (Official Document) */}
      {showNocModal && (
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
                    Official Release Sanction Order & Bank NOC
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono">
                    SANCTION ORDER REF: AICTE/RO/REL/2024/NOC-012
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNocModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Official NOC Document Body */}
            <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-300 rounded-2xl p-6 space-y-4 text-xs shadow-xs font-serif">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3 text-xs text-slate-700 font-sans">
                <div>
                  <strong>TO:</strong><br />
                  The Branch Manager,<br />
                  State Bank of India,<br />
                  Shivajinagar Branch, Pune - 411005
                </div>
                <div className="text-right">
                  <strong>DATE:</strong> 28 October 2024<br />
                  <strong>FILE REF:</strong> REL-2024-012<br />
                  <strong>STATUS:</strong> <span className="text-emerald-700 font-bold">RELEASE SANCTIONED</span>
                </div>
              </div>

              <div className="text-center font-bold text-sm text-slate-900 uppercase tracking-wider font-sans">
                NO OBJECTION CERTIFICATE (NOC) FOR FDR RELEASE
              </div>

              <p className="text-xs leading-relaxed text-slate-800">
                This is to officially certify that the All India Council for Technical Education (AICTE) has{' '}
                <strong>NO OBJECTION</strong> to the release, liquidation, or unencumbering of the following Fixed Deposit Receipt held under joint lien:
              </p>

              {/* Deposit Specifications */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-1.5 font-sans shadow-2xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Institution Name:</span>
                  <strong className="text-slate-900 font-bold">{activeRequest.institution}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deposit Certificate No:</span>
                  <strong className="text-slate-900">{activeRequest.fdrNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Principal Deposit Amount:</span>
                  <strong className="text-emerald-700 text-sm font-bold">₹{activeRequest.amount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Multi-Cell Clearance Protocol:</span>
                  <strong className="text-emerald-700 font-semibold">5/5 Statutory Cells Certified</strong>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-700 font-sans">
                The Bank is hereby authorized to release the principal sum along with accrued interest to the credit of the institution's designated operational account, subject to standard KYC norms.
              </p>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-sans text-slate-600">
                <div>
                  <strong>Dr. Krishnamurthy Iyer</strong><br />
                  Head, Regulation Bureau<br />
                  All India Council for Technical Education, New Delhi
                </div>
                <div className="text-right font-mono">
                  <div className="text-emerald-700 font-bold">DIGITALLY SIGNED & NOTARIZED</div>
                  <div className="text-slate-400 text-[10px]">HASH: 3f9ad1b2c4e5f6a7...</div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-mono">
                Cryptographically registered in AICTE Tamper-Evident Ledger
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-secondary text-xs flex items-center gap-1.5"
                >
                  <Printer size={13} />
                  <span>Print Sanction Order</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowNocModal(false)}
                  className="btn-primary text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
