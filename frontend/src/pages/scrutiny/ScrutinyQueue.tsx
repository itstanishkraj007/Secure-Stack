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
  ArrowRight,
  Sparkles,
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
    <div className="page-content space-y-5">
      {/* Page Header (Finovate White Card) */}
      <div className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              REGIONAL SCRUTINY DESK
            </span>
            <span className="text-xs text-slate-500 font-mono">WESTERN REGION (WRO PUNE) • ZONE 2</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 mt-1">
            Exception Queue & Discrepancy Scrutiny Cases
          </h1>
          <p className="text-xs text-slate-500">
            Automated exception-only routing for signature failures, principal mismatches & unverified QR payloads
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            Active Exceptions: <strong className="text-emerald-700 font-bold">{openCasesCount}</strong>
          </span>
          {overdueCount > 0 && (
            <span className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
              <Clock size={13} className="text-rose-600" />
              <span>{overdueCount} Overdue SLA</span>
            </span>
          )}
        </div>
      </div>

      <MockLabel text="All discrepancy detections are verified against candidate rule schemas and simulated core banking responses." />

      {/* Filter Toolbar */}
      <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs flex-1">
          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Case ID, college, FDR, issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium cursor-pointer focus:ring-1 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="ALL">All Severities</option>
              <option value="MAJOR">Major Severity</option>
              <option value="MEDIUM">Medium Severity</option>
              <option value="LOW">Low Severity</option>
              <option value="INFO">Ready / Info</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium cursor-pointer focus:ring-1 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="HOLD">Hold (Deficit Memo)</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Assignment:</span>
            <select
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium cursor-pointer focus:ring-1 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="ALL">All Officers</option>
              <option value="ME">Assigned to Me ({user.name.split(' ')[0]})</option>
              <option value="UNASSIGNED">Unassigned Only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>2h Fast-Track Scrutiny SLA Active</span>
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
                  <td colSpan={8} className="text-center py-10 text-slate-500 text-xs">
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
                      className={`hover:bg-emerald-50/20 transition-colors ${
                        isResolved ? 'opacity-70 bg-emerald-50/10' : isMajor ? 'bg-rose-50/30' : ''
                      }`}
                    >
                      <td>
                        <div className="font-mono font-bold text-xs text-[#10B981]">{c.id}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{c.createdAt}</div>
                      </td>
                      <td>
                        <div className="font-semibold text-slate-900">{c.institution}</div>
                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">{c.fdrNumber} • {c.bank}</div>
                      </td>
                      <td>
                        <div className="font-medium text-slate-800 flex items-center gap-1.5">
                          {isResolved ? (
                            <CheckCircle2 size={14} className="text-[#10B981] flex-shrink-0" />
                          ) : isMajor ? (
                            <AlertTriangle size={14} className="text-rose-600 flex-shrink-0" />
                          ) : (
                            <ShieldAlert size={14} className="text-amber-600 flex-shrink-0" />
                          )}
                          <span>{c.issue}</span>
                        </div>
                      </td>
                      <td>
                        <StatusBadge status={c.severity} />
                      </td>
                      <td>
                        {c.assignedToName ? (
                          <div className="text-xs text-slate-800 font-medium">{c.assignedToName}</div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => assignScrutinyCase(c.id, user.email, user.name)}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold py-1 px-2.5 rounded-lg inline-flex items-center gap-1 shadow-2xs transition-all"
                            title="Assign this case to current logged-in officer"
                          >
                            <UserPlus size={11} />
                            <span>Claim Case</span>
                          </button>
                        )}
                      </td>
                      <td>
                        {isOverdue ? (
                          <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold inline-flex items-center gap-1 shadow-2xs">
                            <Clock size={11} />
                            Overdue ({Math.abs(c.slaHours)}h)
                          </span>
                        ) : (
                          <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full text-xs font-mono font-medium">
                            {c.slaHours}h Remaining
                          </span>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="text-right">
                        <Link
                          to={`/scrutiny/cases/${c.id}`}
                          className="btn-primary text-[11px] py-1 px-3 inline-flex items-center gap-1 shadow-2xs"
                        >
                          <span>Review</span>
                          <ArrowRight size={11} />
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
