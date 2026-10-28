import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  FileCheck,
} from 'lucide-react';
import { auditEvents } from '../../data/fixtures/audit';
import StatusBadge from '../../components/ui/StatusBadge';
import MockLabel from '../../components/ui/MockLabel';

export default function AuditLedger() {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [chainVerified, setChainVerified] = useState<boolean>(true);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [actionFilter, setActionFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleVerifyChain = () => {
    setIsVerifying(true);
    setChainVerified(false);
    setTimeout(() => {
      setIsVerifying(false);
      setChainVerified(true);
    }, 1400);
  };

  const filteredEvents = auditEvents.filter((e) => {
    if (actionFilter !== 'ALL' && e.action !== actionFilter) return false;
    if (
      searchTerm &&
      !e.correlationId.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !e.actorEmail.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !e.targetId.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="page-content space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#7B1D1D] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
              TAMPER-EVIDENT AUDIT DESK
            </span>
            <span className="text-xs text-gray-500 font-mono">APPEND-ONLY SHA-256 HASH CHAIN</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Cryptographic Audit Ledger & Chain Integrity Verifier
          </h1>
          <p className="text-xs text-gray-500">
            Immutable trace recording actor, role, correlation ID, before/after hashes, and linked SHA-256 hashes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleVerifyChain}
            disabled={isVerifying}
            className="btn-primary text-xs"
          >
            <RefreshCw size={13} className={isVerifying ? 'animate-spin' : ''} />
            <span>{isVerifying ? 'Verifying 891 Hashes...' : 'Re-verify Chain Integrity'}</span>
          </button>
        </div>
      </div>

      <MockLabel text="Cryptographic audit hashing ensures historical event immutability. Each block incorporates previous_event_hash." />

      {/* Verification State Banner (The Mic Drop Feature) */}
      {isVerifying ? (
        <div className="card p-4 bg-amber-50/50 border border-amber-300 flex items-center gap-3">
          <RefreshCw size={20} className="text-amber-700 animate-spin flex-shrink-0" />
          <div>
            <div className="font-bold text-amber-900 text-xs">Re-calculating SHA-256 Hash Chain Integrity...</div>
            <div className="text-xxs text-amber-800">
              Iterating across sequence blocks #0001 to #0891 • Validating previous_event_hash references & UTF-8 canonical ordering...
            </div>
          </div>
        </div>
      ) : chainVerified ? (
        <div className="card p-4 bg-green-50/60 border border-green-300 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0 text-green-700">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="font-bold text-green-900 text-xs flex items-center gap-2">
                <span>AUDIT CHAIN INTACT — NO TAMPERING DETECTED</span>
                <span className="bg-green-700 text-white text-xxs font-extrabold px-1.5 py-0.2 rounded">
                  VERIFIED
                </span>
              </div>
              <div className="text-xxs text-green-800 mt-0.5">
                891 events re-evaluated • Previous hash chain matches 100% • Zero sequence deletions or unauthorized retrofits.
                Root Anchor: <strong className="font-mono">3f9ad1b2c4e5...</strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Certificate of Audit Integrity exported (Cryptographically signed by AICTE System Auditor).')}
            className="btn-secondary text-xxs py-1 flex-shrink-0"
          >
            <FileCheck size={13} />
            <span>Export Audit Certificate</span>
          </button>
        </div>
      ) : null}

      {/* Filter and Search Bar */}
      <div className="card p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[220px]">
            <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Correlation ID, Actor, or Target..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-[#E2D9C8] rounded pl-8 pr-3 py-1 text-xs text-gray-800"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 text-xxs uppercase">Action Type:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-gray-50 border border-[#E2D9C8] rounded px-2 py-1 text-xs text-gray-800"
            >
              <option value="ALL">All Recorded Actions</option>
              <option value="DECISION_RECORDED">DECISION_RECORDED</option>
              <option value="OCR_COMPLETED">OCR_COMPLETED</option>
              <option value="DOCUMENT_UPLOADED">DOCUMENT_UPLOADED</option>
              <option value="MATURITY_ALERT_SENT">MATURITY_ALERT_SENT</option>
              <option value="GATE_CLEARED">GATE_CLEARED</option>
              <option value="GATE_HELD">GATE_HELD</option>
              <option value="RELEASE_APPROVED">RELEASE_APPROVED</option>
            </select>
          </div>
        </div>

        <div className="text-xxs font-mono text-gray-500">
          Showing <strong>{filteredEvents.length}</strong> of {auditEvents.length} Events
        </div>
      </div>

      {/* Audit Event Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-16">Seq #</th>
                <th>Timestamp (IST)</th>
                <th>Actor & Role</th>
                <th>Action Code</th>
                <th>Target Entity</th>
                <th>Correlation ID</th>
                <th>Event SHA-256 Hash</th>
                <th className="text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => {
                const isSelected = selectedEventId === evt.id;
                return (
                  <>
                    <tr
                      key={evt.id}
                      onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                      className={`cursor-pointer ${isSelected ? 'bg-amber-50/50' : ''}`}
                    >
                      <td className="font-mono text-xs font-bold text-gray-900">
                        #{evt.sequenceNumber.toString().padStart(4, '0')}
                      </td>
                      <td className="text-xxs font-mono text-gray-600 whitespace-nowrap">
                        {evt.timestampIst}
                      </td>
                      <td>
                        <div className="font-semibold text-gray-900 text-xs truncate max-w-[180px]">
                          {evt.actorEmail}
                        </div>
                        <div className="text-xxs text-gray-400 font-mono uppercase">{evt.actorRole}</div>
                      </td>
                      <td>
                        <span className="font-mono text-xxs font-bold bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded border border-gray-300">
                          {evt.action}
                        </span>
                      </td>
                      <td>
                        <div className="text-xs text-gray-800 font-medium">{evt.targetType}</div>
                        <div className="text-xxs font-mono text-gray-500">{evt.targetId}</div>
                      </td>
                      <td>
                        <span className="text-xxs font-mono text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          {evt.correlationId}
                        </span>
                      </td>
                      <td className="font-mono text-xxs text-gray-600 truncate max-w-[130px]">
                        {evt.eventHash.slice(0, 8)}...{evt.eventHash.slice(-6)}
                      </td>
                      <td className="text-right">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-700"
                        >
                          {isSelected ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      </td>
                    </tr>

                    {isSelected && (
                      <tr className="bg-gray-50/80">
                        <td colSpan={8} className="p-3 text-xs space-y-2 border-b border-[#E2D9C8]">
                          <div className="bg-white p-3 rounded border border-[#E2D9C8] space-y-2 text-xxs font-mono">
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-500 font-sans font-bold">Canonical Event Payload Hash:</span>
                              <span className="text-gray-900 font-bold">{evt.eventHash}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-500 font-sans font-bold">Previous Linked Block Hash:</span>
                              <span className="text-gray-600">{evt.prevHash}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-sans font-bold">Cryptographic Anchor Check:</span>
                              <span className="text-green-700 font-bold">
                                SHA256(prevHash || canonicalPayload) === eventHash ✓ (VALIDATED)
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
