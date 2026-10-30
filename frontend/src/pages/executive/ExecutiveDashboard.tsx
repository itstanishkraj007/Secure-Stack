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
  Sparkles,
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
    <div className="page-content space-y-5">
      {/* Title Bar (Finovate White Card) */}
      <div className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              EXECUTIVE COMMAND CENTER
            </span>
            <span className="text-xs text-slate-500 font-mono">PAN-INDIA REGULATORY OVERSIGHT</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 mt-1">
            Regulation Bureau Executive KPI & Portfolio Command
          </h1>
          <p className="text-xs text-slate-500">
            Real-time surveillance across 1,847 technical institutions and ₹3,247.2 Crore in security deposit obligations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowExecutiveDossier(true)}
            className="btn-primary text-xs flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Generate Executive Dossier (PDF)</span>
          </button>
        </div>
      </div>

      <MockLabel text="All regional metrics and ingestion rates reflect synthetic national aggregates compiled from regional node replicas." />

      {/* 5 KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <StatCard
          label="Active Deposit Instruments"
          value={kpis.active.toLocaleString('en-IN')}
          sublabel="Secured under Joint RO Lien"
          icon={<ShieldCheck size={18} />}
          trend="+12% MoM"
          trendColor="green"
          borderAccent="#10B981"
        />
        <StatCard
          label="Expiring (Next 30 Days)"
          value={kpis.expiringSoon}
          sublabel="T-30 Automated notices active"
          icon={<Clock size={18} />}
          trend="Action Reqd"
          trendColor="red"
          borderAccent="#EF4444"
        />
        <StatCard
          label="Under Scrutiny Queue"
          value={kpis.underScrutiny}
          sublabel="Discrepancy resolution pending"
          icon={<AlertTriangle size={18} />}
          trend="In SLA"
          trendColor="amber"
          borderAccent="#F59E0B"
        />
        <StatCard
          label="Blocked Clearance Gates"
          value={kpis.blocked}
          sublabel="PGRC or Vigilance holds"
          icon={<Lock size={18} />}
          trend="Gated"
          trendColor="red"
          borderAccent="#991B1B"
        />
        <StatCard
          label="Released This FY"
          value={kpis.releasedThisYear}
          sublabel="Completed settlement NOCs"
          icon={<CheckCircle2 size={18} />}
          trend="₹412 Cr"
          trendColor="green"
          borderAccent="#059669"
        />
      </div>

      {/* Main Two Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (7 cols): Regional Table & Chart */}
        <div className="lg:col-span-7 space-y-4">
          {/* Regional Distribution Table */}
          <div className="card shadow-sm">
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <h3 className="section-title">State-Wise Security Deposit Distribution</h3>
                <p className="text-xs text-slate-500">
                  {selectedState ? `Filtered by ${selectedState} • Click 'Show All' to reset` : 'Click any row to filter regional surveillance'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedState && (
                  <button
                    type="button"
                    onClick={() => setSelectedState(null)}
                    className="text-xs text-emerald-700 font-bold hover:underline"
                  >
                    Show All States
                  </button>
                )}
                <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold shadow-2xs">
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
                          isSelected ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="font-semibold text-slate-900 flex items-center gap-2">
                          <Building size={14} className="text-[#10B981]" />
                          <span>{r.state}</span>
                        </td>
                        <td className="text-right font-mono text-slate-700">{r.institutions}</td>
                        <td className="text-right font-mono text-slate-800 font-medium">{r.activeFDRs}</td>
                        <td className="text-right font-mono font-bold text-slate-900">₹{r.totalValueCr} Cr</td>
                        <td className="text-center">
                          {r.expiring30d > 0 ? (
                            <span className="text-rose-700 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-[11px] font-mono">
                              {r.expiring30d}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs font-mono">0</span>
                          )}
                        </td>
                        <td className="text-center">
                          {r.openIssues > 0 ? (
                            <span className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[11px] font-mono">
                              {r.openIssues}
                            </span>
                          ) : (
                            <span className="text-emerald-700 text-xs font-mono font-bold">✓ 0</span>
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
          <div className="card p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="section-title">Monthly Deposit Ingress vs Settlement NOC Release</h3>
                <p className="text-xs text-slate-500">12-month trailing volume trends across all regional offices</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 inline-block" /> Submissions
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981] inline-block" /> Releases
                </span>
              </div>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="submitted" name="FDR Ingress" fill="#0F172A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="released" name="NOC Releases" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Interventions & Engine Efficiency */}
        <div className="lg:col-span-5 space-y-4">
          {/* Executive Intervention Queue */}
          <div className="card shadow-sm">
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <h3 className="section-title">Bureau Head Intervention Queue</h3>
                <p className="text-xs text-slate-500">Escalated cases requiring statutory executive sign-off</p>
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                {interventionCases.length} Escalations
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {interventionCases.map((c) => (
                <div key={c.id} className="p-4 hover:bg-slate-50 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{c.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.urgency === 'HIGH'
                          ? 'bg-rose-100 text-rose-800'
                          : c.urgency === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {c.urgency} URGENCY
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900">{c.institution}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{c.reason}</div>
                  <div className="flex items-center justify-between pt-1.5">
                    <span className="text-xs font-mono text-slate-700 font-bold">
                      Principal: ₹{c.amount.toLocaleString('en-IN')}
                    </span>
                    <Link
                      to={c.id.startsWith('REL') ? '/clearance' : `/scrutiny/cases/${c.id}`}
                      className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1"
                    >
                      <span>Review Dossier</span>
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engine Processing Efficiency */}
          <div className="card p-4 space-y-3.5 shadow-sm">
            <div className="pb-2 border-b border-slate-200">
              <h3 className="section-title">Automated Verification Pass Rates</h3>
              <p className="text-xs text-slate-500">Performance metrics across 1,842 processed instruments</p>
            </div>

            <div className="space-y-3 text-xs">
              {processingStats.map((stat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-800">{stat.checkType}</span>
                    <span className="font-mono text-slate-500">{stat.passRate}% Pass • {stat.avgMs}ms</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-[#10B981] h-full" style={{ width: `${stat.passRate}%` }} />
                    <div className="bg-rose-500 h-full" style={{ width: `${stat.failRate}%` }} />
                    <div className="bg-slate-300 h-full" style={{ width: `${stat.unknownRate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE COMPLIANCE DOSSIER MODAL (Official Document) */}
      {showExecutiveDossier && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <AicteEmblem className="h-10 w-auto" />
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                    ALL INDIA COUNCIL FOR TECHNICAL EDUCATION • REGULATION BUREAU
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    National Fixed Deposit Security Deposit Compliance Audit Report
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono">
                    REPORT REF: AICTE/REG/EXEC/2024/PAN-INDIA-01
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExecutiveDossier(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dossier Document Body */}
            <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-300 rounded-2xl p-6 space-y-4 text-xs shadow-xs">
              <div className="border-b border-slate-200 pb-3 text-xs flex justify-between text-slate-700">
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
              <div className="space-y-2">
                <div className="font-bold text-slate-900 uppercase text-xs">1. National Aggregate Portfolio Status</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 text-center shadow-2xs">
                  <div>
                    <div className="text-slate-500 text-xs">Active FDR Value</div>
                    <div className="font-mono font-bold text-base text-slate-900">₹3,247.2 Cr</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs">Released This FY</div>
                    <div className="font-mono font-bold text-base text-emerald-700">₹412.8 Cr</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs">Expiring (Next 30d)</div>
                    <div className="font-mono font-bold text-base text-rose-700">89 Instruments</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs">Discrepancy Rate</div>
                    <div className="font-mono font-bold text-base text-amber-700">1.84%</div>
                  </div>
                </div>
              </div>

              {/* Zone Risk Breakdown */}
              <div className="space-y-2">
                <div className="font-bold text-slate-900 uppercase text-xs">2. Regional Exposure & Compliance Matrix</div>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-2 text-left text-slate-500 font-semibold">Zone / State</th>
                        <th className="p-2 text-right text-slate-500 font-semibold">Institutions</th>
                        <th className="p-2 text-right text-slate-500 font-semibold">Total Principal</th>
                        <th className="p-2 text-center text-slate-500 font-semibold">T-30 Alerts</th>
                        <th className="p-2 text-center text-slate-500 font-semibold">Vigilance Holds</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {regionStats.slice(0, 5).map((r) => (
                        <tr key={r.state} className="hover:bg-slate-50/60">
                          <td className="p-2 font-sans font-semibold text-slate-800">{r.state}</td>
                          <td className="p-2 text-right text-slate-700">{r.institutions}</td>
                          <td className="p-2 text-right font-bold text-slate-900">₹{r.totalValueCr} Cr</td>
                          <td className="p-2 text-center text-rose-700 font-semibold">{r.expiring30d}</td>
                          <td className="p-2 text-center text-slate-700">{r.openIssues}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div>
                  Certified for submission to Member Secretary, AICTE & Ministry of Education.<br />
                  Generated via Secure Stack Autonomous Audit Engine.
                </div>
                <div className="text-right font-mono font-bold text-emerald-700">
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
