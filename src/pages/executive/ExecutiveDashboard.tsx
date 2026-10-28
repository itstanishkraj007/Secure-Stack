import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  ShieldCheck,
  Clock,
  AlertTriangle,
  Lock,
  CheckCircle2,
  Download,
  Building,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import {
  kpis,
  regionStats,
  monthlyData,
  interventionCases,
  processingStats,
} from '../../data/fixtures/executive';
import StatCard from '../../components/ui/StatCard';
import MockLabel from '../../components/ui/MockLabel';
import StatusBadge from '../../components/ui/StatusBadge';

export default function ExecutiveDashboard() {
  return (
    <div className="page-content space-y-4">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#003366] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              EXECUTIVE COMMAND CENTER
            </span>
            <span className="text-xs text-gray-500 font-mono">PAN-INDIA REGULATORY OVERSIGHT</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Regulation Bureau Executive KPI & Portfolio Command
          </h1>
          <p className="text-xs text-gray-500">
            Real-time surveillance across 1,847 institutions and ₹3,247.2 Crore in security deposit obligations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Generating Pan-India Security Deposit Compliance Audit Report (PDF)...')}
            className="btn-primary text-xs"
          >
            <Download size={13} />
            <span>Executive Dossier (PDF)</span>
          </button>
        </div>
      </div>

      <MockLabel text="All regional metrics and ingestion rates reflect synthetic national aggregates compiled from regional node replicas." />

      {/* 5 KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard
          label="Active Deposit Instruments"
          value={kpis.active.toLocaleString('en-IN')}
          sublabel="Secured under Joint RO Lien"
          icon={<ShieldCheck size={16} />}
          trend="+12% MoM"
          trendColor="green"
          borderAccent="#003366"
        />
        <StatCard
          label="Expiring (Next 30 Days)"
          value={kpis.expiringSoon}
          sublabel="T-30 Automated notices active"
          icon={<Clock size={16} />}
          trend="Action Reqd"
          trendColor="red"
          borderAccent="#B91C1C"
        />
        <StatCard
          label="Under Scrutiny Queue"
          value={kpis.underScrutiny}
          sublabel="Discrepancy resolution pending"
          icon={<AlertTriangle size={16} />}
          trend="In SLA"
          trendColor="amber"
          borderAccent="#D97706"
        />
        <StatCard
          label="Blocked Clearance Gates"
          value={kpis.blocked}
          sublabel="PGRC or Vigilance holds"
          icon={<Lock size={16} />}
          trend="Gated"
          trendColor="red"
          borderAccent="#7F1D1D"
        />
        <StatCard
          label="Released This FY"
          value={kpis.releasedThisYear}
          sublabel="Completed settlement NOCs"
          icon={<CheckCircle2 size={16} />}
          trend="₹412 Cr"
          trendColor="green"
          borderAccent="#15803D"
        />
      </div>

      {/* Main Two Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (7 cols): Regional Table & Chart */}
        <div className="lg:col-span-7 space-y-4">
          {/* Regional Distribution Table */}
          <div className="card">
            <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="section-title">State-Wise Security Deposit Distribution</h3>
                <p className="text-xxs text-gray-500">Pan-India exposure and regional compliance breakdown</p>
              </div>
              <span className="text-xxs font-mono text-gray-500 font-bold">TOTAL: ₹3,247.2 Cr</span>
            </div>

            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>State / Zone</th>
                    <th className="text-right">Institutions</th>
                    <th className="text-right">Active FDRs</th>
                    <th className="text-right">Total Value</th>
                    <th className="text-center">Expiring ≤30d</th>
                    <th className="text-center">Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {regionStats.map((st, i) => (
                    <tr key={i} className={st.openIssues > 0 ? 'bg-amber-50/20' : ''}>
                      <td className="font-semibold text-gray-900">{st.state}</td>
                      <td className="text-right font-mono text-xs">{st.institutions}</td>
                      <td className="text-right font-mono text-xs font-semibold">{st.activeFDRs}</td>
                      <td className="text-right font-mono text-xs font-bold text-gray-900">₹{st.totalValueCr} Cr</td>
                      <td className="text-center">
                        <span className="font-mono text-xs text-red-700 font-bold">{st.expiring30d}</span>
                      </td>
                      <td className="text-center">
                        {st.openIssues > 0 ? (
                          <span className="text-xxs font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                            {st.openIssues} Case{st.openIssues > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-xxs text-green-700 font-bold">✓ Clear</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Ingestion & Release Chart */}
          <div className="card p-4 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div>
                <h3 className="section-title">12-Month Ingestion vs. Release Trajectory</h3>
                <p className="text-xxs text-gray-500">Deposit registration velocity compared against authorized settlement completions</p>
              </div>
              <div className="flex items-center gap-3 text-xxs font-semibold">
                <span className="flex items-center gap-1 text-[#003366]">
                  <span className="w-2.5 h-2.5 bg-[#003366] rounded-sm inline-block" /> Submissions
                </span>
                <span className="flex items-center gap-1 text-[#15803D]">
                  <span className="w-2.5 h-2.5 bg-[#15803D] rounded-sm inline-block" /> Authorized Releases
                </span>
              </div>
            </div>

            <div className="h-52 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      fontSize: '11px',
                      borderRadius: '4px',
                    }}
                  />
                  <Bar dataKey="submitted" fill="#003366" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="released" fill="#15803D" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Intervention Queue & Quick Reports */}
        <div className="lg:col-span-5 space-y-4">
          {/* Executive Intervention Queue */}
          <div className="card p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div>
                <h3 className="section-title">Intervention & Executive Sanction Queue</h3>
                <p className="text-xxs text-gray-500">Cases requiring Bureau Head / Authority determination</p>
              </div>
              <span className="text-xxs font-bold bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                5 ACTIVE
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {interventionCases.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 bg-gray-50 border border-[#E2E8F0] rounded hover:border-[#003366] transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-900 text-xs">{item.id}</span>
                    <span className="font-mono font-bold text-gray-800 text-xs">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800 text-xs truncate">{item.institution}</div>
                  <div className="text-xxs text-gray-600 line-clamp-2">{item.reason}</div>
                  <div className="pt-1 flex justify-between items-center text-xxs">
                    <StatusBadge status={item.urgency === 'HIGH' ? 'MAJOR' : 'MEDIUM'} />
                    <a href="/clearance" className="text-[#003366] font-bold hover:underline">
                      Review Case →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Regulatory Reports */}
          <div className="card p-4 space-y-3">
            <h3 className="section-title">Statutory Compliance Export Packages</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: 'Pending Verifications', count: '34 Cases', icon: Clock },
                { name: 'Upcoming Maturities', count: '89 Instruments', icon: AlertTriangle },
                { name: 'Missing Documents', count: '12 Notices', icon: FileSpreadsheet },
                { name: 'Intervention Ledger', count: '5 Decisions', icon: ShieldCheck },
              ].map((rep, idx) => {
                const Icon = rep.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => alert(`Downloading CSV: ${rep.name}...`)}
                    className="p-2.5 bg-gray-50 border border-[#E2E8F0] rounded text-left hover:bg-white hover:border-[#003366] transition-colors flex flex-col justify-between"
                  >
                    <Icon size={14} className="text-[#003366] mb-1" />
                    <div className="font-semibold text-gray-900 text-xs">{rep.name}</div>
                    <div className="text-xxs text-gray-500 mt-1">{rep.count} • Export CSV</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Engine Processing Performance */}
      <div className="card">
        <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="section-title">Automated Verification Engines Health & Accuracy</h3>
          <span className="text-xxs font-mono text-gray-500">1,842 RUNS EVALUATED</span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Verification Engine</th>
                <th className="text-right">Total Executions</th>
                <th className="text-center">Pass Rate</th>
                <th className="text-center">Fail Rate</th>
                <th className="text-center">Unknown / Inconclusive</th>
                <th className="text-right">Avg Latency</th>
              </tr>
            </thead>
            <tbody>
              {processingStats.map((p, i) => (
                <tr key={i}>
                  <td className="font-semibold text-gray-900">{p.checkType}</td>
                  <td className="text-right font-mono text-xs">{p.total.toLocaleString('en-IN')}</td>
                  <td className="text-center">
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                      {p.passRate}%
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-xs font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                      {p.failRate}%
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-xs font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                      {p.unknownRate}%
                    </span>
                  </td>
                  <td className="text-right font-mono text-xs text-gray-700">{p.avgMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
