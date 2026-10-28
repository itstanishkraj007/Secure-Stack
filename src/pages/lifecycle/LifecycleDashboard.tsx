import { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  GitBranch,
  Calendar,
  CheckCircle2,
  Bell,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { instruments, renewalLineage } from '../../data/fixtures/instruments';
import StatusBadge from '../../components/ui/StatusBadge';
import StatCard from '../../components/ui/StatCard';
import MockLabel from '../../components/ui/MockLabel';

export default function LifecycleDashboard() {
  const [selectedBand, setSelectedBand] = useState<string>('CRITICAL');

  // Filter instruments based on alert tier
  const critical = instruments.filter((i) => i.daysToMaturity >= 0 && i.daysToMaturity <= 15);
  const warning = instruments.filter((i) => i.daysToMaturity > 15 && i.daysToMaturity <= 30);
  const attention = instruments.filter((i) => i.daysToMaturity > 30 && i.daysToMaturity <= 90);
  const scheduled = instruments.filter((i) => i.daysToMaturity > 90);

  return (
    <div className="page-content space-y-4">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#7B1D1D] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
              LIFECYCLE WATCHDOG
            </span>
            <span className="text-xs text-gray-500 font-mono">AUTOMATED MATURITY SCHEDULER</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Deposit Maturity Surveillance & Renewal Lineage
          </h1>
          <p className="text-xs text-gray-500">
            Escalation dispatcher tracking T-90 to T-0 alerts, coverage gap analysis, and parent-child renewal chains
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700 bg-white border border-[#E2D9C8] px-3 py-1 rounded shadow-sm">
            Active Monitored FDRs: <strong>{instruments.length}</strong>
          </span>
        </div>
      </div>

      <MockLabel text="Simulated time-travel and maturity countdowns run with deterministic demo offsets." />

      {/* 4 Maturity Bands Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          onClick={() => setSelectedBand('CRITICAL')}
          className={`card p-3.5 cursor-pointer transition-all border-l-4 ${
            selectedBand === 'CRITICAL' ? 'border-l-red-700 bg-red-50/30' : 'border-l-red-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-red-800 font-bold">
            <span>🔴 CRITICAL (≤ 15 Days)</span>
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xxs font-extrabold">
              {critical.length}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">{critical.length} Instruments</div>
          <div className="text-xxs text-red-700 mt-1">Immediate renewal dispatch required</div>
        </div>

        <div
          onClick={() => setSelectedBand('WARNING')}
          className={`card p-3.5 cursor-pointer transition-all border-l-4 ${
            selectedBand === 'WARNING' ? 'border-l-amber-600 bg-amber-50/30' : 'border-l-amber-500 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
            <span>🟡 WARNING (15–30 Days)</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xxs font-extrabold">
              {warning.length}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">{warning.length} Instruments</div>
          <div className="text-xxs text-amber-700 mt-1">T-30 Automated notice dispatched</div>
        </div>

        <div
          onClick={() => setSelectedBand('ATTENTION')}
          className={`card p-3.5 cursor-pointer transition-all border-l-4 ${
            selectedBand === 'ATTENTION' ? 'border-l-blue-600 bg-blue-50/30' : 'border-l-blue-400 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-blue-800 font-bold">
            <span>🟠 ATTENTION (30–90 Days)</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xxs font-extrabold">
              {attention.length}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">{attention.length} Instruments</div>
          <div className="text-xxs text-blue-700 mt-1">Pre-alert scheduled for T-60</div>
        </div>

        <div
          onClick={() => setSelectedBand('SCHEDULED')}
          className={`card p-3.5 cursor-pointer transition-all border-l-4 ${
            selectedBand === 'SCHEDULED' ? 'border-l-green-600 bg-green-50/30' : 'border-l-green-500 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-green-800 font-bold">
            <span>🟢 SCHEDULED (&gt; 90 Days)</span>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xxs font-extrabold">
              {scheduled.length}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">{scheduled.length} Instruments</div>
          <div className="text-xxs text-green-700 mt-1">Normal active surveillance</div>
        </div>
      </div>

      {/* Two Column Section: Renewal Lineage & Reminder History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Renewal Lineage Tree */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2D9C8]">
            <GitBranch size={16} className="text-[#7B1D1D]" />
            <div>
              <h3 className="section-title">Instrument Renewal & Parent-Child Lineage</h3>
              <p className="text-xxs text-gray-500">Track replacement continuity across 6-year history without security gap</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {renewalLineage.map((item, idx) => {
              const isCurrent = item.status === 'ACTIVE';
              return (
                <div key={idx} className="relative flex items-start gap-3">
                  {idx < renewalLineage.length - 1 && (
                    <div className="absolute left-3.5 top-6 bottom-0 w-0.5 bg-gray-300" />
                  )}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 ${
                      isCurrent
                        ? 'bg-[#7B1D1D] text-white ring-2 ring-[#D4A017]'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="card flex-1 p-2.5 bg-white border border-[#E2D9C8]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-gray-900">{item.fdrNumber}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="flex items-center justify-between text-xxs text-gray-600 mt-1">
                      <span>Principal: <strong className="font-mono">₹{item.amount.toLocaleString('en-IN')}</strong></span>
                      <span>Tenure: {item.issueDate} — {item.maturityDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-green-50 border border-green-200 rounded text-xs flex items-center gap-2">
            <CheckCircle2 size={15} className="text-green-700 flex-shrink-0" />
            <span className="text-green-900 font-medium">
              Lineage Gap Analysis: <strong>0 Days Gap Detected</strong> (Continuous institutional deposit coverage maintained since 2019)
            </span>
          </div>
        </div>

        {/* Right: Automated Reminder Schedule (T-90 to T-0) */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2D9C8]">
            <Bell size={16} className="text-[#B7791F]" />
            <div>
              <h3 className="section-title">Automated Notification Cadence (T-Countdown)</h3>
              <p className="text-xxs text-gray-500">Notice dispatches for FDR/HDFC/2023/003421 (Expiring 02 Nov 2024)</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { stage: 'T-90 Alert', date: '04 Aug 2024', status: 'DISPATCHED', desc: 'Email notice to institution registrar & nodal officer' },
              { stage: 'T-60 Alert', date: '03 Sep 2024', status: 'DISPATCHED', desc: 'SMS + Portal reminder for bank renewal paperwork' },
              { stage: 'T-30 Notice', date: '03 Oct 2024', status: 'DISPATCHED', desc: 'Formal statutory warning: Non-renewal penalty advisory' },
              { stage: 'T-15 Urgent Notice', date: '18 Oct 2024', status: 'DISPATCHED', desc: 'Regional officer escalation & provisional freeze advisory' },
              { stage: 'T-0 Maturity Day', date: '02 Nov 2024', status: 'SCHEDULED', desc: 'Automated encumbrance lock & grievance cell trigger' },
            ].map((alert, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 border border-[#E2D9C8] rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${alert.status === 'DISPATCHED' ? 'bg-green-600' : 'bg-gray-400'}`} />
                  <div>
                    <span className="font-bold text-gray-800">{alert.stage}</span>{' '}
                    <span className="text-xxs text-gray-500">({alert.date})</span>
                    <div className="text-xxs text-gray-500">{alert.desc}</div>
                  </div>
                </div>
                <span
                  className={`text-xxs font-bold px-2 py-0.5 rounded border ${
                    alert.status === 'DISPATCHED'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-600 border-gray-300'
                  }`}
                >
                  {alert.status}
                </span>
              </div>
            ))}
          </div>

          <div className="info-box">
            <strong>Escalation Policy:</strong> Failure to submit renewed instrument by T-0 automatically dispatches
            notice to State Directorate of Technical Education (DTE) and University Registrar.
          </div>
        </div>
      </div>

      {/* Monitored Instruments Table */}
      <div className="card">
        <div className="p-3 border-b border-[#E2D9C8] flex items-center justify-between">
          <h2 className="section-title">All Monitored Institutional Deposit Instruments</h2>
          <span className="text-xxs text-gray-500 font-mono">SORTED BY ASCENDING MATURITY</span>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {instruments.map((inst) => {
                const daysLeft = inst.daysToMaturity;
                const isUrgent = daysLeft >= 0 && daysLeft <= 15;
                const isOverdue = daysLeft < 0;

                return (
                  <tr key={inst.id} className={isUrgent ? 'bg-red-50/30' : ''}>
                    <td className="font-semibold text-gray-900">{inst.institution}</td>
                    <td className="font-mono text-gray-800 font-medium">{inst.fdrNumber}</td>
                    <td className="text-gray-600 text-xs">{inst.bankName}</td>
                    <td className="font-mono font-bold text-gray-900">₹{inst.principalAmount.toLocaleString('en-IN')}</td>
                    <td className="text-gray-800 font-semibold">{inst.maturityDate}</td>
                    <td>
                      <span
                        className={`font-bold font-mono text-xs ${
                          isOverdue
                            ? 'text-gray-400'
                            : isUrgent
                            ? 'text-red-700 bg-red-100 px-1.5 py-0.5 rounded'
                            : daysLeft <= 30
                            ? 'text-amber-700'
                            : 'text-green-700'
                        }`}
                      >
                        {isOverdue ? `Matured (${Math.abs(daysLeft)}d ago)` : `${daysLeft} Days`}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={inst.lifecycleStatus} />
                    </td>
                    <td>
                      <a href={`/scrutiny/cases/${inst.id === 'ins-002' ? 'SCR-2024-089' : 'SCR-2024-085'}`} className="btn-secondary text-xxs py-0.5 px-2">
                        Inspect
                      </a>
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
