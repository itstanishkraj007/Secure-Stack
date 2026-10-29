import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Printer,
  X,
  FileText,
  ExternalLink,
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
import { AicteEmblem } from '../../components/common/AicteLogo';

export default function ExecutiveDashboard() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showExecutiveDossier, setShowExecutiveDossier] = useState<boolean>(false);

  const displayedRegions = selectedState
    ? regionStats.filter((r) => r.state === selectedState)
    : regionStats;

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
            Real-time surveillance across 1,847 technical institutions and ₹3,247.2 Crore in security deposit obligations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowExecutiveDossier(true)}
            className="btn-primary text-xs flex items-center gap-1.5"
          >
            <Download size={13} />
            <span>Generate Executive Dossier (PDF)</span>
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
          <div className="card shadow-sm">
            <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="section-title">State-Wise Security Deposit Distribution</h3>
                <p className="text-xxs text-gray-500">
                  {selectedState ? `Filtered by ${selectedState} • Click 'Show All' to reset` : 'Click any row to filter regional surveillance'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedState && (
                  <button
                    type="button"
                    onClick={() => setSelectedState(null)}
                    className="text-xxs text-[#003366] font-bold hover:underline"
                  >
                    Show All States
                  </button>
                )}
                <span className="text-xxs font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded border border-gray-300 font-bold">
                  TOTAL: ₹3,247.2 Cr
                </span>
              </div>
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
                  {displayedRegions.map((r) => {
                    const isSelected = selectedState === r.state;
                    return (
                      <tr
                        key={r.state}
                        onClick={() => setSelectedState(isSelected ? null : r.state)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="font-semibold text-gray-900 flex items-center gap-1.5">
                          <Building size={13} className="text-[#003366]" />
                          <span>{r.state}</span>
                        </td>
                        <td className="text-right font-mono text-gray-700">{r.institutions}</td>
                        <td className="text-right font-mono text-gray-800 font-medium">{r.activeFDRs}</td>
                        <td className="text-right font-mono font-bold text-gray-900">₹{r.totalValueCr} Cr</td>
                        <td className="text-center">
                          {r.expiring30d > 0 ? (
                            <span className="text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded text-xxs font-mono">
                              {r.expiring30d}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xxs font-mono">0</span>
                          )}
                        </td>
                        <td className="text-center">
                          {r.openIssues > 0 ? (
                            <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-xxs font-mono">
                              {r.openIssues}
                            </span>
                          ) : (
                            <span className="text-green-700 text-xxs font-mono">✓ 0</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Submissions vs Releases Chart */}
          <div className="card p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div>
                <h3 className="section-title">Monthly Deposit Ingress vs Settlement NOC Release</h3>
                <p className="text-xxs text-gray-500">12-month trailing volume trends across all regional offices</p>
              </div>
              <div className="flex items-center gap-3 text-xxs">
                <span className="flex items-center gap-1 text-gray-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#003366] inline-block" /> Submissions
                </span>
                <span className="flex items-center gap-1 text-gray-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#15803D] inline-block" /> Releases
                </span>
              </div>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#071E36', borderRadius: '4px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="submitted" name="FDR Ingress" fill="#003366" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="released" name="NOC Releases" fill="#15803D" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Interventions & Engine Efficiency */}
        <div className="lg:col-span-5 space-y-4">
          {/* Executive Intervention Queue */}
          <div className="card shadow-sm">
            <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="section-title">Bureau Head Intervention Queue</h3>
                <p className="text-xxs text-gray-500">Escalated cases requiring statutory executive sign-off</p>
              </div>
              <span className="text-xxs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                {interventionCases.length} Escalations
              </span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              {interventionCases.map((c) => (
                <div key={c.id} className="p-3 hover:bg-gray-50 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-900">{c.id}</span>
                    <span
                      className={`text-xxs font-bold px-1.5 py-0.2 rounded ${
                        c.urgency === 'HIGH'
                          ? 'bg-red-100 text-red-800'
                          : c.urgency === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {c.urgency} URGENCY
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800">{c.institution}</div>
                  <div className="text-xxs text-gray-600">{c.reason}</div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xxs font-mono text-gray-700 font-bold">
                      Principal: ₹{c.amount.toLocaleString('en-IN')}
                    </span>
                    <Link
                      to={c.id.startsWith('REL') ? '/clearance' : `/scrutiny/cases/${c.id}`}
                      className="text-xxs font-bold text-[#003366] hover:underline flex items-center gap-1"
                    >
                      <span>Review Dossier</span>
                      <ExternalLink size={10} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engine Processing Efficiency */}
          <div className="card p-3.5 space-y-3 shadow-sm">
            <div className="pb-2 border-b border-[#E2E8F0]">
              <h3 className="section-title">Automated Verification Pass Rates</h3>
              <p className="text-xxs text-gray-500">Performance metrics across 1,842 processed instruments</p>
            </div>

            <div className="space-y-2 text-xs">
              {processingStats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xxs">
                    <span className="font-medium text-gray-800">{stat.checkType}</span>
                    <span className="font-mono text-gray-600">{stat.passRate}% Pass • {stat.avgMs}ms</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
                    <div className="bg-green-600 h-full" style={{ width: `${stat.passRate}%` }} />
                    <div className="bg-red-500 h-full" style={{ width: `${stat.failRate}%` }} />
                    <div className="bg-gray-400 h-full" style={{ width: `${stat.unknownRate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE COMPLIANCE DOSSIER MODAL (Official Document) */}
      {showExecutiveDossier && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-[#E2E8F0] max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <AicteEmblem className="h-10 w-auto" />
                <div>
                  <span className="text-xxs font-bold text-[#003366] uppercase tracking-wider">
                    ALL INDIA COUNCIL FOR TECHNICAL EDUCATION • REGULATION BUREAU
                  </span>
                  <h3 className="text-sm font-bold text-gray-900">
                    National Fixed Deposit Security Deposit Compliance Audit Report
                  </h3>
                  <div className="text-xxs text-gray-500 font-mono">
                    REPORT REF: AICTE/REG/EXEC/2024/PAN-INDIA-01
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExecutiveDossier(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dossier Document Body */}
            <div className="bg-[#FAF8F5] border-2 border-[#D4C4A8] rounded p-6 space-y-4 text-xs shadow-inner">
              <div className="border-b border-[#D4C4A8] pb-3 text-xxs flex justify-between">
                <div>
                  <strong>REPORTING PERIOD:</strong> FY 2024–25 (Q3 Snapshot)<br />
                  <strong>COMPILED BY:</strong> Dr. Krishnamurthy Iyer, Head, Regulation Bureau
                </div>
                <div className="text-right">
                  <strong>COVERAGE:</strong> 1,847 Approved Institutions<br />
                  <strong>TOTAL ESCROW VALUE:</strong> ₹3,247.20 Crore
                </div>
              </div>

              {/* National Summary Table */}
              <div className="space-y-1">
                <div className="font-bold text-[#003366] uppercase text-xxs">1. National Aggregate Portfolio Status</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded border border-[#D4C4A8] text-center">
                  <div>
                    <div className="text-gray-500 text-xxs">Active FDR Value</div>
                    <div className="font-mono font-bold text-sm text-[#003366]">₹3,247.2 Cr</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xxs">Released This FY</div>
                    <div className="font-mono font-bold text-sm text-green-700">₹412.8 Cr</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xxs">Expiring (Next 30d)</div>
                    <div className="font-mono font-bold text-sm text-red-700">89 Instruments</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xxs">Discrepancy Rate</div>
                    <div className="font-mono font-bold text-sm text-amber-700">1.84%</div>
                  </div>
                </div>
              </div>

              {/* Zone Risk Breakdown */}
              <div className="space-y-1">
                <div className="font-bold text-[#003366] uppercase text-xxs">2. Regional Exposure & Compliance Matrix</div>
                <div className="border border-[#D4C4A8] rounded overflow-hidden bg-white">
                  <table className="w-full text-xxs">
                    <thead className="bg-gray-100 border-b border-[#D4C4A8]">
                      <tr>
                        <th className="p-1.5 text-left">Zone / State</th>
                        <th className="p-1.5 text-right">Institutions</th>
                        <th className="p-1.5 text-right">Total Principal</th>
                        <th className="p-1.5 text-center">T-30 Alerts</th>
                        <th className="p-1.5 text-center">Vigilance Holds</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-mono">
                      {regionStats.slice(0, 5).map((r) => (
                        <tr key={r.state}>
                          <td className="p-1.5 font-sans font-semibold text-gray-800">{r.state}</td>
                          <td className="p-1.5 text-right">{r.institutions}</td>
                          <td className="p-1.5 text-right font-bold">₹{r.totalValueCr} Cr</td>
                          <td className="p-1.5 text-center text-red-700">{r.expiring30d}</td>
                          <td className="p-1.5 text-center">{r.openIssues}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D4C4A8] flex items-center justify-between text-xxs text-gray-600">
                <div>
                  Certified for submission to Member Secretary, AICTE & Ministry of Education.<br />
                  Generated via Secure Stack Autonomous Audit Engine.
                </div>
                <div className="text-right font-mono font-bold text-green-700">
                  DIGITALLY CERTIFIED BY REGULATION BUREAU
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
                <span>Print Official Dossier</span>
              </button>
              <button
                type="button"
                onClick={() => setShowExecutiveDossier(false)}
                className="btn-primary text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
