import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  GitBranch,
  Calendar,
  CheckCircle2,
  Bell,
  ArrowRight,
  ShieldCheck,
  Filter,
  Eye,
  Sparkles,
} from 'lucide-react';
import { usePortalData } from '../../context/PortalDataContext';
import { renewalLineage } from '../../data/fixtures/instruments';
import StatusBadge from '../../components/ui/StatusBadge';
import StatCard from '../../components/ui/StatCard';
import MockLabel from '../../components/ui/MockLabel';

export default function LifecycleDashboard() {
  const { instruments } = usePortalData();
  const [selectedBand, setSelectedBand] = useState<string>('ALL');

  // Filter instruments based on alert tier
  const critical = instruments.filter((i) => i.daysToMaturity >= 0 && i.daysToMaturity <= 15);
  const warning = instruments.filter((i) => i.daysToMaturity > 15 && i.daysToMaturity <= 30);
  const attention = instruments.filter((i) => i.daysToMaturity > 30 && i.daysToMaturity <= 90);
  const scheduled = instruments.filter((i) => i.daysToMaturity > 90);

  // Filtered table data
  const displayedInstruments = instruments.filter((i) => {
    if (selectedBand === 'ALL') return true;
    if (selectedBand === 'CRITICAL') return i.daysToMaturity >= 0 && i.daysToMaturity <= 15;
    if (selectedBand === 'WARNING') return i.daysToMaturity > 15 && i.daysToMaturity <= 30;
    if (selectedBand === 'ATTENTION') return i.daysToMaturity > 30 && i.daysToMaturity <= 90;
    if (selectedBand === 'SCHEDULED') return i.daysToMaturity > 90;
    return true;
  });

  return (
    <div className="page-content space-y-5">
      {/* Page Title (Finovate White Card) */}
      <div className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              LIFECYCLE WATCHDOG
            </span>
            <span className="text-xs text-slate-500 font-mono">AUTOMATED MATURITY CADENCE</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 mt-1">
            Deposit Maturity Surveillance & Renewal Lineage
          </h1>
          <p className="text-xs text-slate-500">
            Escalation dispatcher tracking T-90 to T-0 alerts, coverage gap analysis, and parent-child renewal chains
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            Monitored Instruments: <strong className="text-emerald-700 font-bold">{instruments.length}</strong>
          </span>
        </div>
      </div>

      <MockLabel text="Simulated time-travel and maturity countdowns run with deterministic demo offsets." />

      {/* 4 Maturity Bands Row (Interactive Filter Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div
          onClick={() => setSelectedBand(selectedBand === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
          className={`p-4 rounded-2xl cursor-pointer transition-all border shadow-2xs ${
            selectedBand === 'CRITICAL'
              ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-rose-800 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              CRITICAL (≤ 15 Days)
            </span>
            <span className="bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold font-mono">
              {critical.length}
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2">{critical.length} Instruments</div>
          <div className="text-[11px] text-rose-700 mt-1">
            {selectedBand === 'CRITICAL' ? '✓ Filter active (Click to reset)' : 'Click to filter table'}
          </div>
        </div>

        <div
          onClick={() => setSelectedBand(selectedBand === 'WARNING' ? 'ALL' : 'WARNING')}
          className={`p-4 rounded-2xl cursor-pointer transition-all border shadow-2xs ${
            selectedBand === 'WARNING'
              ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              WARNING (15–30 Days)
            </span>
            <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold font-mono">
              {warning.length}
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2">{warning.length} Instruments</div>
          <div className="text-[11px] text-amber-700 mt-1">
            {selectedBand === 'WARNING' ? '✓ Filter active (Click to reset)' : 'T-30 Automated notice dispatched'}
          </div>
        </div>

        <div
          onClick={() => setSelectedBand(selectedBand === 'ATTENTION' ? 'ALL' : 'ATTENTION')}
          className={`p-4 rounded-2xl cursor-pointer transition-all border shadow-2xs ${
            selectedBand === 'ATTENTION'
              ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-blue-800 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              ATTENTION (30–90 Days)
            </span>
            <span className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold font-mono">
              {attention.length}
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2">{attention.length} Instruments</div>
          <div className="text-[11px] text-blue-700 mt-1">
            {selectedBand === 'ATTENTION' ? '✓ Filter active (Click to reset)' : 'Pre-alert scheduled for T-60'}
          </div>
        </div>

        <div
          onClick={() => setSelectedBand(selectedBand === 'SCHEDULED' ? 'ALL' : 'SCHEDULED')}
          className={`p-4 rounded-2xl cursor-pointer transition-all border shadow-2xs ${
            selectedBand === 'SCHEDULED'
              ? 'border-[#10B981] bg-emerald-50/60 ring-2 ring-emerald-500/20'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-emerald-800 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              SCHEDULED (&gt; 90 Days)
            </span>
            <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold font-mono">
              {scheduled.length}
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-2">{scheduled.length} Instruments</div>
          <div className="text-[11px] text-emerald-700 mt-1">
            {selectedBand === 'SCHEDULED' ? '✓ Filter active (Click to reset)' : 'Normal active surveillance'}
          </div>
        </div>
      </div>

      {/* Two Column Section: Renewal Lineage & Reminder History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Renewal Lineage Tree */}
        <div className="card p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <GitBranch size={18} className="text-[#10B981]" />
            <div>
              <h3 className="section-title">Instrument Renewal & Parent-Child Lineage</h3>
              <p className="text-xs text-slate-500">Track replacement continuity across 6-year history without security gap</p>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {renewalLineage.map((item, idx) => {
              const isCurrent = item.status === 'ACTIVE';
              return (
                <div key={idx} className="relative flex items-start gap-3.5">
                  {idx < renewalLineage.length - 1 && (
                    <div className="absolute left-4 top-7 bottom-0 w-0.5 bg-slate-200" />
                  )}

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 ${
                      isCurrent
                        ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-xs ring-4 ring-emerald-100'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="card flex-1 p-3.5 bg-white border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-slate-900">{item.fdrNumber}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mt-1.5">
                      <span>Principal: <strong className="font-mono text-slate-900">₹{item.amount.toLocaleString('en-IN')}</strong></span>
                      <span className="text-[11px] text-slate-400 font-medium">Tenor: {item.issueDate} — {item.maturityDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs flex items-center gap-2.5 shadow-2xs">
            <CheckCircle2 size={18} className="text-emerald-700 flex-shrink-0" />
            <span className="text-emerald-950 font-medium leading-relaxed">
              Lineage Gap Analysis: <strong>0 Days Gap Detected</strong> (Continuous institutional deposit coverage maintained since 2019)
            </span>
          </div>
        </div>

        {/* Right: Automated Reminder Schedule (T-90 to T-0) */}
        <div className="card p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Bell size={18} className="text-[#10B981]" />
            <div>
              <h3 className="section-title">Automated Notification Cadence (T-Countdown)</h3>
              <p className="text-xs text-slate-500">Notice dispatches for FDR/HDFC/2023/003421 (Expiring 02 Nov 2024)</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { stage: 'T-90 Alert', date: '04 Aug 2024', status: 'DISPATCHED', desc: 'Email notice to institution registrar & nodal officer' },
              { stage: 'T-60 Alert', date: '03 Sep 2024', status: 'DISPATCHED', desc: 'SMS + Portal reminder for bank renewal paperwork' },
              { stage: 'T-30 Notice', date: '03 Oct 2024', status: 'DISPATCHED', desc: 'Formal statutory warning: Non-renewal penalty advisory' },
              { stage: 'T-15 Urgent Notice', date: '18 Oct 2024', status: 'DISPATCHED', desc: 'Regional officer escalation & provisional freeze advisory' },
              { stage: 'T-0 Maturity Day', date: '02 Nov 2024', status: 'SCHEDULED', desc: 'Automated encumbrance lock & grievance cell trigger' },
            ].map((alert, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${alert.status === 'DISPATCHED' ? 'bg-[#10B981]' : 'bg-slate-300'}`} />
                  <div>
                    <span className="font-bold text-slate-800">{alert.stage}</span>{' '}
                    <span className="text-xs text-slate-400 font-mono">({alert.date})</span>
                    <div className="text-[11px] text-slate-500 mt-0.5">{alert.desc}</div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    alert.status === 'DISPATCHED'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {alert.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed shadow-2xs">
            <strong>Escalation Policy:</strong> Failure to submit renewed instrument by T-0 automatically dispatches
            notice to State Directorate of Technical Education (DTE) and University Registrar.
          </div>
        </div>
      </div>

      {/* Monitored Instruments Table (Dynamically Filtered) */}
      <div className="card shadow-sm">
        <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="section-title">Institutional Deposit Instruments Under Surveillance</h2>
            {selectedBand !== 'ALL' && (
              <span className="text-[10px] font-bold bg-[#10B981] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                Band: {selectedBand}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedBand !== 'ALL' && (
              <button
                type="button"
                onClick={() => setSelectedBand('ALL')}
                className="text-xs text-[#10B981] font-bold hover:underline"
              >
                Reset Filter
              </button>
            )}
            <span className="text-xs text-slate-500 font-mono">
              Showing {displayedInstruments.length} of {instruments.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Institution Name</th>
                <th>FDR Number</th>
                <th>Bank & IFSC</th>
                <th>Principal Amount</th>
                <th>Maturity Date</th>
                <th>Days Remaining</th>
                <th>Escalation State</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedInstruments.map((inst) => {
                const daysLeft = inst.daysToMaturity;
                const isUrgent = daysLeft >= 0 && daysLeft <= 15;
                const isOverdue = daysLeft < 0;

                return (
                  <tr key={inst.id} className={`hover:bg-emerald-50/20 transition-colors ${isUrgent ? 'bg-rose-50/40' : ''}`}>
                    <td className="font-semibold text-slate-900">{inst.institution}</td>
                    <td className="font-mono text-slate-800 font-medium">{inst.fdrNumber}</td>
                    <td className="text-slate-600 text-xs">{inst.bankName}</td>
                    <td className="font-mono font-bold text-slate-900">₹{inst.principalAmount.toLocaleString('en-IN')}</td>
                    <td className="text-slate-900 font-semibold text-xs">{inst.maturityDate}</td>
                    <td>
                      <span
                        className={`font-bold font-mono text-xs ${
                          isOverdue
                            ? 'text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full'
                            : isUrgent
                            ? 'text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1'
                            : daysLeft <= 30
                            ? 'text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full'
                            : 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full'
                        }`}
                      >
                        {isOverdue ? `Matured (${Math.abs(daysLeft)}d ago)` : `${daysLeft} Days`}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={inst.lifecycleStatus} />
                    </td>
                    <td className="text-right">
                      <Link
                        to={`/scrutiny/cases/${inst.id === 'ins-002' ? 'SCR-2024-089' : 'SCR-2024-085'}`}
                        className="btn-secondary text-[11px] py-1 px-3 inline-flex items-center gap-1 shadow-2xs"
                      >
                        <Eye size={12} className="text-[#10B981]" />
                        <span>Inspect</span>
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
