import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  Filter,
  CheckCircle,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import { scrutinyCases } from '../../data/fixtures/scrutiny';
import StatusBadge from '../../components/ui/StatusBadge';
import MockLabel from '../../components/ui/MockLabel';

export default function ScrutinyQueue() {
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [assignedFilter, setAssignedFilter] = useState('ALL');

  const filteredCases = scrutinyCases.filter((c) => {
    if (severityFilter !== 'ALL' && c.severity !== severityFilter) return false;
    if (assignedFilter === 'ME' && c.assignedTo !== 'ravi.prasad@aicte.gov.in') return false;
    if (assignedFilter === 'UNASSIGNED' && c.assignedTo !== null) return false;
    return true;
  });

  return (
    <div className="page-content space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#7B1D1D] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
              REGIONAL SCRUTINY DESK
            </span>
            <span className="text-xs text-gray-500 font-mono">WESTERN REGION (WRO) • ZONE 2</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Exception Queue & Discrepancy Scrutiny Cases
          </h1>
          <p className="text-xs text-gray-500">
            Automated exception-only routing for signature failures, amount discrepancies & unverified QR payloads
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600 bg-white border border-[#E2D9C8] px-2.5 py-1 rounded shadow-sm">
            Pending Cases: <strong className="text-red-700">{scrutinyCases.length}</strong>
          </span>
        </div>
      </div>

      <MockLabel text="All discrepancy detections are verified against candidate rule schemas and simulated core banking responses." />

      {/* Filter Toolbar */}
      <div className="card p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-gray-500 font-semibold">
            <Filter size={13} />
            <span>Filters:</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 text-xxs uppercase">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-gray-50 border border-[#E2D9C8] rounded px-2 py-1 text-xs text-gray-800 font-medium"
            >
              <option value="ALL">All Severities</option>
              <option value="MAJOR">Major Severity</option>
              <option value="MEDIUM">Medium Severity</option>
              <option value="LOW">Low Severity</option>
              <option value="INFO">Ready for Approval (Info)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 text-xxs uppercase">Assignment:</span>
            <select
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className="bg-gray-50 border border-[#E2D9C8] rounded px-2 py-1 text-xs text-gray-800 font-medium"
            >
              <option value="ALL">All Officers</option>
              <option value="ME">Assigned to Me (Ravi Prasad)</option>
              <option value="UNASSIGNED">Unassigned Only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xxs font-mono text-gray-500">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" /> Overdue SLA Alert Active
        </div>
      </div>

      {/* Scrutiny Cases Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Institution & FDR No.</th>
                <th>Primary Discrepancy / Trigger</th>
                <th>Severity</th>
                <th>Assigned Officer</th>
                <th>SLA Countdown</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((c) => {
                const isOverdue = c.slaOverdue;
                const isMajor = c.severity === 'MAJOR' || c.severity === 'CRITICAL';

                return (
                  <tr
                    key={c.id}
                    className={isMajor ? 'bg-red-50/20' : ''}
                  >
                    <td>
                      <div className="font-mono font-bold text-xs text-[#7B1D1D]">{c.id}</div>
                      <div className="text-xxs text-gray-400">{c.createdAt}</div>
                    </td>
                    <td>
                      <div className="font-semibold text-gray-900">{c.institution}</div>
                      <div className="text-xxs font-mono text-gray-500">{c.fdrNumber} • {c.bank}</div>
                    </td>
                    <td>
                      <div className="font-medium text-gray-800 flex items-center gap-1.5">
                        {isMajor ? (
                          <AlertTriangle size={13} className="text-red-600 flex-shrink-0" />
                        ) : (
                          <ShieldAlert size={13} className="text-amber-600 flex-shrink-0" />
                        )}
                        <span>{c.issue}</span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={c.severity} />
                    </td>
                    <td>
                      {c.assignedToName ? (
                        <div className="text-xs text-gray-800 font-medium">{c.assignedToName}</div>
                      ) : (
                        <span className="text-xxs text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold border border-amber-200">
                          UNASSIGNED
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className={isOverdue ? 'text-red-600' : 'text-gray-400'} />
                        <span
                          className={`text-xs font-mono font-semibold ${
                            isOverdue
                              ? 'text-red-700 bg-red-100 px-1.5 py-0.5 rounded'
                              : c.slaHours <= 4
                              ? 'text-amber-700 font-bold'
                              : 'text-gray-700'
                          }`}
                        >
                          {isOverdue ? `OVERDUE (${Math.abs(c.slaHours)}h)` : `${c.slaHours}h remaining`}
                        </span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="text-right">
                      <Link
                        to={`/scrutiny/cases/${c.id}`}
                        className="btn-primary text-xxs py-1 px-2.5 inline-flex items-center gap-1"
                      >
                        <Eye size={12} />
                        <span>Inspect Case</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
