import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Clock,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import { instruments } from '../../data/fixtures/instruments';
import StatusBadge from '../../components/ui/StatusBadge';
import StatCard from '../../components/ui/StatCard';
import MockLabel from '../../components/ui/MockLabel';

export default function InstitutionDashboard() {
  const [filter, setFilter] = useState<string>('ALL');

  const myInstruments = instruments.filter((i) => i.institutionCode === 'PIT-MH-001' || filter === 'ALL');

  const activeCount = instruments.filter((i) => i.lifecycleStatus === 'ACTIVE').length;
  const expiringCount = instruments.filter((i) => i.lifecycleStatus === 'EXPIRING_SOON').length;
  const scrutinyCount = instruments.filter((i) => i.lifecycleStatus === 'UNDER_SCRUTINY').length;

  return (
    <div className="page-content space-y-4">
      {/* Institution Banner */}
      <div className="card p-4 border-l-4 border-l-[#7B1D1D] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#7B1D1D] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
              INSTITUTION PORTAL
            </span>
            <span className="text-xs text-gray-500">AISHE / AICTE PERMANENT ID: <strong>1-348910283</strong></span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Pune Institute of Technology, Maharashtra
          </h1>
          <p className="text-xs text-gray-600">
            Affiliated to Savitribai Phule Pune University • Approved Security Deposit / FDR Vault
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to="/institution/submit" className="btn-primary">
            <PlusCircle size={14} />
            <span>Submit New FDR</span>
          </Link>
          <Link to="/lifecycle" className="btn-secondary">
            <Clock size={14} />
            <span>Maturity Alerts</span>
          </Link>
        </div>
      </div>

      <MockLabel text="All bank API responses and core banking verification states are simulated for the SIH 2026 prototype." />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Active Deposit"
          value="₹75,00,000"
          sublabel="3 Active Fixed Deposit Receipts"
          icon={<ShieldCheck size={18} />}
          borderAccent="#7B1D1D"
        />
        <StatCard
          label="Expiring (Next 30 Days)"
          value="1 FDR"
          sublabel="Action required: Renewal / Extension"
          icon={<Clock size={18} />}
          trend="T-15 Alert"
          trendColor="red"
          borderAccent="#B91C1C"
        />
        <StatCard
          label="Under Scrutiny"
          value={`${scrutinyCount} Case`}
          sublabel="Regional Officer verification in-progress"
          icon={<FileCheck2 size={18} />}
          trend="In Review"
          trendColor="amber"
          borderAccent="#D97706"
        />
        <StatCard
          label="Total Instruments Filed"
          value={`${instruments.length}`}
          sublabel="Historical & active records maintained"
          icon={<CheckCircle size={18} />}
          borderAccent="#15803D"
        />
      </div>

      {/* Active Maturity Alert Banner if expiring */}
      <div className="alert-box-red flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Clock className="text-red-700 flex-shrink-0" size={18} />
          <div>
            <span className="font-bold text-red-900 text-xs">CRITICAL MATURITY WARNING — T-15 NOTICE:</span>{' '}
            <span className="text-red-800 text-xs">
              Instrument <strong>FDR/HDFC/2023/003421</strong> (Principal ₹25,00,000) matures in <strong>5 days</strong> (02 Nov 2024).
              Non-renewal will trigger Clause 2.22(h) statutory hold.
            </span>
          </div>
        </div>
        <Link to="/institution/submit" className="btn-danger flex-shrink-0">
          Initiate Renewal Form
        </Link>
      </div>

      {/* Instruments Table */}
      <div className="card">
        <div className="p-3 border-b border-[#E2D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="section-title">Security Deposit Instruments Register</h2>
            <p className="text-xxs text-gray-500">Official ledger of submitted FDRs and guarantee instruments</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500 text-xxs font-semibold uppercase">Filter Status:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-50 border border-[#E2D9C8] rounded px-2 py-1 text-xs text-gray-700 font-medium"
            >
              <option value="ALL">All Registered Instruments</option>
              <option value="ACTIVE">Active Only</option>
              <option value="EXPIRING_SOON">Expiring Soon</option>
              <option value="UNDER_SCRUTINY">Under Scrutiny</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>FDR Number</th>
                <th>Bank & Branch</th>
                <th>Principal Amount</th>
                <th>Issue Date</th>
                <th>Maturity Date</th>
                <th>Days Left</th>
                <th>Lien Status</th>
                <th>Lifecycle Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myInstruments.map((inst) => {
                const daysLeft = inst.daysToMaturity;
                const daysColor =
                  daysLeft < 0
                    ? 'text-gray-400 font-normal'
                    : daysLeft <= 15
                    ? 'text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded'
                    : daysLeft <= 30
                    ? 'text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded'
                    : 'text-green-700 font-medium';

                return (
                  <tr key={inst.id}>
                    <td>
                      <div className="font-semibold text-gray-900 font-mono text-xs">{inst.fdrNumber}</div>
                      <div className="text-xxs text-gray-500">{inst.institution}</div>
                    </td>
                    <td>
                      <div className="font-medium text-gray-800">{inst.bankName}</div>
                      <div className="text-xxs text-gray-500 font-mono">{inst.ifsc} • {inst.branch}</div>
                    </td>
                    <td>
                      <div className="font-bold text-gray-900 font-mono">
                        ₹{inst.principalAmount.toLocaleString('en-IN')}
                      </div>
                    </td>
                    <td className="text-gray-600 text-xs">{inst.issueDate}</td>
                    <td className="text-gray-800 font-semibold text-xs">{inst.maturityDate}</td>
                    <td>
                      <span className={daysColor}>
                        {daysLeft < 0 ? `Matured (${Math.abs(daysLeft)}d ago)` : `${daysLeft} days`}
                      </span>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        AICTE Joint Lien
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={inst.lifecycleStatus} />
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/scrutiny/cases/${inst.id === 'ins-002' ? 'SCR-2024-089' : 'SCR-2024-085'}`}
                          className="btn-ghost text-xxs p-1"
                          title="View Verification Dossier"
                        >
                          <ExternalLink size={12} /> View
                        </Link>
                        {inst.lifecycleStatus === 'EXPIRING_SOON' && (
                          <Link to="/institution/submit" className="btn-primary text-xxs py-0.5 px-2">
                            Renew
                          </Link>
                        )}
                      </div>
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
