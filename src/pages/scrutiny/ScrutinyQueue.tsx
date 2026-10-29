import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  Filter,
  CheckCircle,
  Eye,
  ShieldAlert,
  Search,
  UserPlus,
  CheckCircle2,
} from 'lucide-react';
import { usePortalData } from '../../context/PortalDataContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/ui/StatusBadge';
import MockLabel from '../../components/ui/MockLabel';

export default function ScrutinyQueue() {
  const { user } = useAuth();
  const { scrutinyCases, assignScrutinyCase } = usePortalData();

  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [assignedFilter, setAssignedFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = scrutinyCases.filter((c) => {
    if (severityFilter !== 'ALL' && c.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (assignedFilter === 'ME' && c.assignedTo !== user.email) return false;
    if (assignedFilter === 'UNASSIGNED' && c.assignedTo !== null) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchId = c.id.toLowerCase().includes(term);
      const matchInst = c.institution.toLowerCase().includes(term);
      const matchFdr = c.fdrNumber.toLowerCase().includes(term);
      const matchIssue = c.issue.toLowerCase().includes(term);
      if (!matchId && !matchInst && !matchFdr && !matchIssue) {
        return false;
      }
    }
    return true;
  });

  const openCasesCount = scrutinyCases.filter((c) => c.status !== 'RESOLVED').length;
  const overdueCount = scrutinyCases.filter((c) => c.slaOverdue).length;

  return (
    <div className="page-content space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#003366] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              REGIONAL SCRUTINY DESK
            </span>
            <span className="text-xs text-gray-500 font-mono">WESTERN REGION (WRO PUNE) • ZONE 2</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Exception Queue & Discrepancy Scrutiny Cases
          </h1>
          <p className="text-xs text-gray-500">
            Automated exception-only routing for signature failures, principal mismatches & unverified QR payloads
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700 bg-white border border-[#E2E8F0] px-3 py-1 rounded shadow-sm">
            Active Exceptions: <strong className="text-red-700">{openCasesCount}</strong>
          </span>
          {overdueCount > 0 && (
            <span className="text-xs font-semibold text-red-800 bg-red-100 border border-red-300 px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
              <Clock size={12} className="text-red-700" />
              <span>{overdueCount} Overdue SLA</span>
            </span>
          )}
        </div>
      </div>

      <MockLabel text="All discrepancy detections are verified against candidate rule schemas and simulated core banking responses." />

      {/* Filter Toolbar */}
      <div className="card p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs flex-1">
          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Case ID, college, FDR, issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-[#E2E8F0] rounded pl-8 pr-3 py-1 text-xs text-gray-800"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 text-xxs uppercase font-semibold">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-gray-50 border border-[#E2E8F0] rounded px-2 py-1 text-xs text-gray-800 font-medium cursor-pointer"
            >
              <option value="ALL">All Severities</option>
              <option value="MAJOR">Major Severity</option>
              <option value="MEDIUM">Medium Severity</option>
              <option value="LOW">Low Severity</option>
              <option value="INFO">Ready / Info</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 text-xxs uppercase font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-[#E2E8F0] rounded px-2 py-1 text-xs text-gray-800 font-medium cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="HOLD">Hold (Deficit Memo)</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 text-xxs uppercase font-semibold">Assignment:</span>
            <select
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className="bg-gray-50 border border-[#E2E8F0] rounded px-2 py-1 text-xs text-gray-800 font-medium cursor-pointer"
            >
              <option value="ALL">All Officers</option>
              <option value="ME">Assigned to Me ({user.name.split(' ')[0]})</option>
              <option value="UNASSIGNED">Unassigned Only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xxs font-mono text-gray-500">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" /> 2h Fast-Track Scrutiny SLA Active
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
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500 text-xs">
                    No scrutiny cases match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => {
                  const isOverdue = c.slaOverdue;
                  const isMajor = c.severity === 'MAJOR' || c.severity === 'CRITICAL';
                  const isResolved = c.status === 'RESOLVED';

                  return (
                    <tr
                      key={c.id}
                      className={isResolved ? 'opacity-70 bg-green-50/20' : isMajor ? 'bg-red-50/20' : ''}
                    >
                      <td>
                        <div className="font-mono font-bold text-xs text-[#003366]">{c.id}</div>
                        <div className="text-xxs text-gray-400">{c.createdAt}</div>
                      </td>
                      <td>
                        <div className="font-semibold text-gray-900">{c.institution}</div>
                        <div className="text-xxs font-mono text-gray-500">{c.fdrNumber} • {c.bank}</div>
                      </td>
                      <td>
                        <div className="font-medium text-gray-800 flex items-center gap-1.5">
                          {isResolved ? (
                            <CheckCircle2 size={13} className="text-green-600 flex-shrink-0" />
                          ) : isMajor ? (
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
                          <button
                            type="button"
                            onClick={() => assignScrutinyCase(c.id, user.email, user.name)}
                            className="btn-secondary text-xxs py-0.5 px-2 inline-flex items-center gap-1 text-amber-800 hover:text-amber-950"
                            title="Assign this case to current logged-in officer"
                          >
                            <UserPlus size={11} />
                            <span>Claim Case</span>
                          </button>
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
                          <span>Inspect Dossier</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
