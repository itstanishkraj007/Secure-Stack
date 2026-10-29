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
    <div className="page-content space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#003366] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              SETTLEMENT & CLEARANCE DESK
            </span>
            <span className="text-xs text-gray-500 font-mono">REGULATION BUREAU • MULTI-CELL GATING</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Multi-Cell Clearance Hub & Release Authorization
          </h1>
          <p className="text-xs text-gray-500">
            Multi-stakeholder clearance gates (PGRC, Vigilance, Finance, Legal) enforcing zero-unauthorized deposit release
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700 bg-white border border-[#E2E8F0] px-3 py-1 rounded shadow-sm">
            Requests in Bureau: <strong>{releaseRequests.length}</strong>
          </span>
        </div>
      </div>

      <MockLabel text="Clearance gates are strictly sequential. Settlement authorization is locked until all required cells approve with signed audit hash." />

      {/* Select Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {releaseRequests.map((req) => {
          const isSelected = req.id === selectedRequestId;
          return (
            <div
              key={req.id}
              onClick={() => setSelectedRequestId(req.id)}
              className={`card p-3.5 cursor-pointer transition-all border-l-4 ${
                isSelected ? 'border-l-[#003366] bg-white ring-2 ring-[#003366]' : 'border-l-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-gray-900">{req.id}</span>
                <StatusBadge status={req.overallStatus} />
              </div>
              <div className="font-semibold text-gray-900 text-xs truncate">{req.institution}</div>
              <div className="flex items-center justify-between text-xxs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                <span>Principal: <strong className="font-mono text-gray-900">₹{req.amount.toLocaleString('en-IN')}</strong></span>
                <span className="font-mono">{req.fdrNumber}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Clearance Dossier */}
      <div className="card p-5 space-y-5 shadow-sm">
        {/* Release Request Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900 font-mono">{activeRequest.id}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm font-bold text-gray-800">{activeRequest.institution}</span>
            </div>
            <div className="text-xxs text-gray-500 mt-0.5">
              Instrument: <strong className="font-mono">{activeRequest.fdrNumber}</strong> • Requested by: <strong>{activeRequest.requestedBy}</strong> ({activeRequest.requestedAt})
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-gray-500">Security Deposit Value:</span>
            <span className="text-base font-bold text-green-700 font-mono">
              ₹{activeRequest.amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Blocking Alert if held or blocked */}
        {!allCleared ? (
          <div className="alert-box-red space-y-1.5 shadow-sm">
            <div className="font-bold text-red-900 text-xs flex items-center gap-1.5">
              <AlertTriangle size={15} /> RELEASE BLOCKED BY STATUTORY GOVERNANCE POLICY
            </div>
            <p className="text-xs text-red-800">
              The release of principal funds and issuance of the Bank NOC is{' '}
              <strong>strictly blocked</strong> until every applicable institutional clearance gate is certified.
              No individual officer possesses override authority without clearing outstanding holds.
            </p>
          </div>
        ) : (
          <div className="p-3 bg-green-50 border border-green-300 rounded text-xs text-green-900 font-semibold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-700" />
              <span>
                ALL 5 CLEARANCE GATES CERTIFIED — OFFICIAL RELEASE SANCTION UNLOCKED
              </span>
            </div>
            <span className="text-xxs font-mono bg-green-200 text-green-900 px-2 py-0.5 rounded font-bold">
              READY FOR NOC
            </span>
          </div>
        )}

        {/* Clearance Gates Table */}
        <div>
          <div className="section-header">
            <div>
              <h3 className="section-title">Cell-Wise Clearance Gate Evaluation</h3>
              <p className="text-xxs text-gray-500">Five independent statutory cells must sign off in sequence</p>
            </div>
            <span className="text-xxs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
              GATE POLICY v2.4 (APH Cl. 2.22)
            </span>
          </div>

          <div className="border border-[#E2E8F0] rounded overflow-hidden">
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
                    <tr key={g.id} className={isHold ? 'bg-red-50/50' : ''}>
                      <td className="text-center font-bold text-gray-500 font-mono">#{g.number}</td>
                      <td className="font-semibold text-gray-900">{g.gateName}</td>
                      <td className="text-gray-700 text-xs">{g.responsibleCell}</td>
                      <td>
                        {g.officerName ? (
                          <span className="text-xs text-gray-800 font-medium">{g.officerName}</span>
                        ) : (
                          <span className="text-xxs text-gray-400 italic">Pending Assignment</span>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={g.status} />
                      </td>
                      <td className="text-xs text-gray-700 max-w-xs">
                        {g.holdReason ? (
                          <div className="text-red-800 bg-red-100/70 p-1.5 rounded text-xxs font-medium border border-red-200">
                            {g.holdReason}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xxs">No encumbrance noted</span>
                        )}
                      </td>
                      <td className="text-xxs font-mono text-gray-500">
                        {g.updatedAt || '—'}
                      </td>
                      <td className="text-right">
                        {isHold ? (
                          <button
                            type="button"
                            onClick={() => setSelectedGateForAction(g)}
                            className="btn-danger text-xxs py-1 px-2.5 inline-flex items-center gap-1 font-bold shadow-sm"
                            title="Review compliance documents and resolve hold"
                          >
                            <Unlock size={11} />
                            <span>Resolve Hold</span>
                          </button>
                        ) : g.number === 5 && g.status === 'PENDING' ? (
                          <button
                            type="button"
                            onClick={handleClearGate5}
                            className="btn-primary text-xxs py-1 px-2.5 inline-flex items-center gap-1 font-bold shadow-sm"
                            title="Sign legal clearance"
                          >
                            <CheckCircle2 size={11} />
                            <span>Certify Gate 5</span>
                          </button>
                        ) : isBlocked ? (
                          <span className="text-xxs text-gray-400 font-mono italic">
                            🔒 Blocked by Gate #{g.number - 1}
                          </span>
                        ) : (
                          <span className="text-green-700 text-xxs font-bold">✓ Certified</span>
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
        <div className="card p-4 bg-amber-50/40 border border-amber-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
              <Scale size={16} className="text-amber-700" />
              <span>Automated Statutory Penalty Assessment (Simulation Engine)</span>
            </div>
            <span className="text-xxs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
              CANDIDATE RULE (SIMULATION MODE)
            </span>
          </div>

          <div className="text-xs text-amber-900 space-y-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white/80 p-2.5 rounded border border-amber-200 text-xxs">
              <div>
                <span className="text-gray-500">Applicable Clause:</span>{' '}
                <strong className="text-gray-900 font-mono">RULE-04 (APH Cl. 2.22h)</strong>
              </div>
              <div>
                <span className="text-gray-500">Violation Category:</span>{' '}
                <strong>Missing Extension of Approval (EoA)</strong>
              </div>
              <div>
                <span className="text-gray-500">Statutory Assessment:</span>{' '}
                <strong className="text-red-700 font-bold font-mono">10% of Principal (₹2,50,000)</strong>
              </div>
            </div>
            <p className="text-xxs text-amber-800 pt-1">
              <em>Note:</em> Per product principles, candidate rules execute strictly in non-binding simulation mode
              until authoritative legal sign-off from Regulation Bureau is committed.
            </p>
          </div>
        </div>

        {/* Final Release Action Bar */}
        <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xxs text-gray-500">
            {allCleared ? (
              <span className="text-green-700 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} /> All 5 clearance gates certified. Settlement authorization active.
              </span>
            ) : (
              <span className="text-red-700 font-bold flex items-center gap-1">
                <Lock size={13} /> Settlement Action Gated: Pending resolution of held cells.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!allCleared}
              onClick={handleFinalApprove}
              className={allCleared ? 'btn-primary' : 'btn-secondary opacity-60 cursor-not-allowed'}
            >
              {allCleared ? <Unlock size={14} /> : <Lock size={14} />}
              <span>Generate Bank NOC & Sanction Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* RESOLVE HOLD MODAL (Interactive Gate Sign-off) */}
      {selectedGateForAction && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-[#E2E8F0] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Unlock size={18} className="text-[#003366]" />
                <h3 className="text-sm font-bold text-gray-900">
                  Resolve Gate #{selectedGateForAction.number} Hold ({selectedGateForAction.responsibleCell})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGateForAction(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X size={16} />
              </button>
            </div>

            <div className="bg-red-50 p-3 rounded border border-red-200 text-xs text-red-900 space-y-1">
              <div className="font-bold">Original Hold Justification:</div>
              <p className="text-xxs">{selectedGateForAction.holdReason}</p>
            </div>

            <div className="space-y-1 text-xs">
              <label className="field-label">Compliance Clearance Verification Note:</label>
              <textarea
                rows={3}
                value={complianceNote}
                onChange={(e) => setComplianceNote(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded p-2 text-xs text-gray-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
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
                    Official Release Sanction Order & Bank NOC
                  </h3>
                  <div className="text-xxs text-gray-500 font-mono">
                    SANCTION ORDER REF: AICTE/RO/REL/2024/NOC-012
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNocModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Official NOC Document Body */}
            <div className="bg-[#FAF8F5] border-2 border-[#D4C4A8] rounded p-6 space-y-4 text-xs shadow-inner font-serif">
              <div className="flex items-start justify-between border-b border-[#D4C4A8] pb-3 text-xxs text-gray-700 font-sans">
                <div>
                  <strong>TO:</strong><br />
                  The Branch Manager,<br />
                  State Bank of India,<br />
                  Shivajinagar Branch, Pune - 411005
                </div>
                <div className="text-right">
                  <strong>DATE:</strong> 28 October 2024<br />
                  <strong>FILE REF:</strong> REL-2024-012<br />
                  <strong>STATUS:</strong> RELEASE SANCTIONED
                </div>
              </div>

              <div className="text-center font-bold text-sm text-[#003366] uppercase tracking-wider font-sans">
                NO OBJECTION CERTIFICATE (NOC) FOR FDR RELEASE
              </div>

              <p className="text-xs leading-relaxed text-gray-800">
                This is to officially certify that the All India Council for Technical Education (AICTE) has{' '}
                <strong>NO OBJECTION</strong> to the release, liquidation, or unencumbering of the following Fixed Deposit Receipt held under joint lien:
              </p>

              {/* Deposit Specifications */}
              <div className="bg-white p-3.5 rounded border border-[#D4C4A8] text-xs font-mono space-y-1 font-sans">
                <div className="flex justify-between">
                  <span className="text-gray-600">Institution Name:</span>
                  <strong className="text-gray-900">{activeRequest.institution}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deposit Certificate No:</span>
                  <strong className="text-gray-900">{activeRequest.fdrNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Principal Deposit Amount:</span>
                  <strong className="text-green-700 text-sm">₹{activeRequest.amount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Multi-Cell Clearance Protocol:</span>
                  <strong className="text-green-700">5/5 Statutory Cells Certified</strong>
                </div>
              </div>

              <p className="text-xxs leading-relaxed text-gray-700 font-sans">
                The Bank is hereby authorized to release the principal sum along with accrued interest to the credit of the institution's designated operational account, subject to standard KYC norms.
              </p>

              <div className="pt-4 border-t border-[#D4C4A8] flex items-center justify-between text-xxs font-sans text-gray-600">
                <div>
                  <strong>Dr. Krishnamurthy Iyer</strong><br />
                  Head, Regulation Bureau<br />
                  All India Council for Technical Education, New Delhi
                </div>
                <div className="text-right font-mono">
                  <div className="text-green-700 font-bold">DIGITALLY SIGNED & NOTARIZED</div>
                  <div className="text-gray-400">HASH: 3f9ad1b2c4e5f6a7...</div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xxs text-gray-500 font-mono">
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
