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
} from 'lucide-react';
import { releaseRequests } from '../../data/fixtures/clearances';
import StatusBadge from '../../components/ui/StatusBadge';
import MockLabel from '../../components/ui/MockLabel';

export default function ClearanceHub() {
  const [selectedRequestId, setSelectedRequestId] = useState<string>('REL-2024-012');
  const [showNocModal, setShowNocModal] = useState<boolean>(false);

  const activeRequest = releaseRequests.find((r) => r.id === selectedRequestId) || releaseRequests[0];

  const allCleared = activeRequest.gates.every((g) => g.status === 'CLEARED');
  const hasHold = activeRequest.gates.some((g) => g.status === 'ON_HOLD');
  const hasRejected = activeRequest.gates.some((g) => g.status === 'REJECTED');

  return (
    <div className="page-content space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#7B1D1D] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
              SETTLEMENT & CLEARANCE DESK
            </span>
            <span className="text-xs text-gray-500 font-mono">REGULATION BUREAU • RELEASE WORKFLOW</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Multi-Cell Clearance Hub & Release Authorization
          </h1>
          <p className="text-xs text-gray-500">
            Multi-stakeholder clearance gates (PGRC, Vigilance, Finance, Legal) enforcing zero-unauthorized deposit release
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700 bg-white border border-[#E2D9C8] px-3 py-1 rounded shadow-sm">
            Requests in Cell: <strong>{releaseRequests.length}</strong>
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
                isSelected ? 'border-l-[#7B1D1D] bg-white ring-1 ring-[#7B1D1D]' : 'border-l-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-gray-900">{req.id}</span>
                <StatusBadge status={req.overallStatus} />
              </div>
              <div className="font-semibold text-gray-900 text-xs truncate">{req.institution}</div>
              <div className="flex items-center justify-between text-xxs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                <span>Principal: <strong className="font-mono">₹{req.amount.toLocaleString('en-IN')}</strong></span>
                <span>FDR: {req.fdrNumber}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Clearance Dossier */}
      <div className="card p-5 space-y-5">
        {/* Release Request Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E2D9C8] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900 font-mono">{activeRequest.id}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm font-bold text-gray-800">{activeRequest.institution}</span>
            </div>
            <div className="text-xxs text-gray-500 mt-0.5">
              Instrument: <strong>{activeRequest.fdrNumber}</strong> • Requested by: <strong>{activeRequest.requestedBy}</strong> ({activeRequest.requestedAt})
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-gray-500">Security Deposit Value:</span>
            <span className="text-base font-bold text-gray-900 font-mono">
              ₹{activeRequest.amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Blocking Alert if held or blocked */}
        {!allCleared && (
          <div className="alert-box-red space-y-1.5">
            <div className="font-bold text-red-900 text-xs flex items-center gap-1.5">
              <AlertTriangle size={15} /> RELEASE BLOCKED BY GOVERNANCE POLICY
            </div>
            <p className="text-xs text-red-800">
              The release of principal funds and issuance of the Bank NOC is{' '}
              <strong>strictly blocked</strong> until every applicable institutional clearance gate is certified.
              No individual officer possesses override authority without clearing outstanding holds.
            </p>
          </div>
        )}

        {/* Clearance Gates Table */}
        <div>
          <div className="section-header">
            <div>
              <h3 className="section-title">Cell-Wise Clearance Gate Evaluation</h3>
              <p className="text-xxs text-gray-500">Five independent clearance cells must sign off in sequence</p>
            </div>
            <span className="text-xxs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
              GATE POLICY v2.1
            </span>
          </div>

          <div className="border border-[#E2D9C8] rounded overflow-hidden">
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
                </tr>
              </thead>
              <tbody>
                {activeRequest.gates.map((g) => (
                  <tr key={g.id} className={g.status === 'ON_HOLD' ? 'bg-red-50/40' : ''}>
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
                        <div className="text-red-800 bg-red-100/60 p-1.5 rounded text-xxs font-medium border border-red-200">
                          {g.holdReason}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xxs">No encumbrance noted</span>
                      )}
                    </td>
                    <td className="text-xxs font-mono text-gray-500">
                      {g.updatedAt || '—'}
                    </td>
                  </tr>
                ))}
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
        <div className="pt-3 border-t border-[#E2D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xxs text-gray-500">
            {allCleared ? (
              <span className="text-green-700 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} /> All 5 clearance gates certified. Ready for Regulation Bureau sanction.
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
              onClick={() => setShowNocModal(true)}
              className={allCleared ? 'btn-primary' : 'btn-secondary opacity-60 cursor-not-allowed'}
            >
              {allCleared ? <Unlock size={14} /> : <Lock size={14} />}
              <span>Generate Bank NOC & Sanction Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* NOC Modal */}
      {showNocModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="card max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2D9C8]">
              <div className="flex items-center gap-2">
                <FileCheck size={20} className="text-green-600" />
                <h3 className="text-sm font-bold text-gray-900">
                  AICTE Formal Bank Release No Objection Certificate (NOC)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNocModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 border border-[#E2D9C8] rounded font-mono text-xxs space-y-3 leading-relaxed text-gray-800">
              <div className="text-center font-bold text-xs uppercase border-b border-gray-300 pb-2">
                ALL INDIA COUNCIL FOR TECHNICAL EDUCATION<br />
                Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070
              </div>

              <div>
                <strong>SANCTION ORDER NO:</strong> AICTE/SDMS/REL/2024/0912<br />
                <strong>DATE:</strong> 28 October 2024<br />
                <strong>TO:</strong> The Branch Manager, {activeRequest.institution} Partner Bank
              </div>

              <p>
                This is to certify that the Council has NO OBJECTION to the unconditional release of the Fixed Deposit
                Receipt bearing No. <strong>{activeRequest.fdrNumber}</strong> amounting to{' '}
                <strong>₹{activeRequest.amount.toLocaleString('en-IN')}</strong> pledged jointly in favor of Regional
                Officer, AICTE.
              </p>

              <div className="pt-2 border-t border-gray-300 flex justify-between">
                <span>DIGITALLY SIGNED (PAdES):<br />Dr. Krishnamurthy Iyer, Bureau Head</span>
                <span>AUDIT HASH ANCHOR:<br />SHA-256: 4a2b9f...89e1</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowNocModal(false)} className="btn-secondary">
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Bank NOC PDF downloaded with SHA-256 digital seal.');
                  setShowNocModal(false);
                }}
                className="btn-primary"
              >
                Download Official Sealed NOC (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
