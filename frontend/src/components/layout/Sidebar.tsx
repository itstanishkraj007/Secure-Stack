import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  ShieldAlert,
  BarChart3,
  History,
  AlertTriangle,
  UserCheck,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { UserPersona, UserRole } from '../../types';
import { usePortalData } from '../../context/PortalDataContext';

interface SidebarProps {
  user: UserPersona;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function Sidebar({ user, activeRole, onRoleChange }: SidebarProps) {
  const { instruments, scrutinyCases, releaseRequests, auditEvents } = usePortalData();

  const openScrutinyCount = scrutinyCases.filter((c) => c.status !== 'RESOLVED').length;
  const expiringCount = instruments.filter((i) => i.lifecycleStatus === 'EXPIRING_SOON').length;

  const roleNavItems: Record<
    UserRole,
    { label: string; to: string; icon: any; count?: number }[]
  > = {
    INSTITUTION: [
      { label: 'My FDR Portfolio', to: '/institution/dashboard', icon: FileText, count: instruments.length },
      { label: 'Submit FDR Instrument', to: '/institution/submit', icon: Upload },
      { label: 'Maturity Watchdog', to: '/lifecycle', icon: Clock, count: expiringCount },
    ],
    SCRUTINY: [
      { label: 'Exception Scrutiny Queue', to: '/scrutiny/queue', icon: AlertTriangle, count: openScrutinyCount },
      { label: 'Flagship Case (SCR-089)', to: '/scrutiny/cases/SCR-2024-089', icon: CheckCircle2 },
      { label: 'Deposit Lifecycle Watch', to: '/lifecycle', icon: Clock },
      { label: 'Institutional Registry', to: '/institution/dashboard', icon: FileText },
    ],
    CLEARANCE: [
      { label: 'Multi-Cell Clearance Hub', to: '/clearance', icon: ShieldAlert, count: releaseRequests.length },
      { label: 'Deposit Lifecycle Watch', to: '/lifecycle', icon: Clock },
      { label: 'Audit Hash Records', to: '/audit', icon: History },
    ],
    EXECUTIVE: [
      { label: 'Executive Command Center', to: '/executive', icon: BarChart3 },
      { label: 'Sanction & Release Desks', to: '/clearance', icon: ShieldAlert, count: releaseRequests.length },
      { label: 'Maturity Surveillance', to: '/lifecycle', icon: Clock },
      { label: 'Audit Trail Ledger', to: '/audit', icon: History, count: auditEvents.length },
    ],
    AUDIT_ADMIN: [
      { label: 'Tamper-Evident Ledger', to: '/audit', icon: History, count: auditEvents.length },
      { label: 'Regional Scrutiny Overview', to: '/scrutiny/queue', icon: AlertTriangle, count: openScrutinyCount },
      { label: 'National Portfolio Command', to: '/executive', icon: BarChart3 },
    ],
  };

  const navs = roleNavItems[activeRole] || [];

  return (
    <aside className="w-64 bg-white text-slate-700 flex flex-col flex-shrink-0 border-r border-slate-200/80 select-none h-full shadow-[2px_0_8px_rgba(0,0,0,0.02)]">
      {/* Role Switcher with direct role switching */}
      <div className="p-3.5 border-b border-slate-200/70 bg-slate-50/70">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck size={13} className="text-[#10B981]" /> Active Role Desk:
          </span>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
            LIVE DEMO
          </span>
        </div>
        <div className="relative">
          <select
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-2xs appearance-none transition-all"
          >
            <option value="INSTITUTION">🏛️ 1. Institution Nodal Desk</option>
            <option value="SCRUTINY">🔍 2. Regional Scrutiny Officer</option>
            <option value="CLEARANCE">📋 3. Clearance Cell Officer</option>
            <option value="EXECUTIVE">📊 4. Regulation Bureau Head</option>
            <option value="AUDIT_ADMIN">🔐 5. System Auditor & Admin</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-slate-400">
            <ChevronRight size={14} className="rotate-90" />
          </div>
        </div>
        <p className="text-[10px] text-slate-500 mt-1.5 leading-tight">
          Role switch automatically transforms the active portal desk view.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-3 px-2.5 space-y-1 overflow-y-auto">
        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Active Role Modules</span>
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">v2.4</span>
        </div>

        {navs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all relative ${
                  isActive
                    ? 'bg-[#ECFDF5] text-[#065F46] font-semibold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Modern Finovate-style left vertical accent pill */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#10B981] rounded-r-full" />
                  )}
                  <div className="flex items-center gap-2.5 truncate pl-1">
                    <Icon
                      size={16}
                      className={`flex-shrink-0 transition-colors ${
                        isActive ? 'text-[#10B981]' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-200/60 text-emerald-900'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          All Workspace Desks
        </div>

        <NavLink
          to="/institution/dashboard"
          onClick={() => onRoleChange('INSTITUTION')}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              isActive
                ? 'text-emerald-900 font-semibold bg-emerald-50/60'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <FileText size={15} className="text-slate-400" />
          <span>Institutions View</span>
        </NavLink>

        <NavLink
          to="/scrutiny/queue"
          onClick={() => onRoleChange('SCRUTINY')}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              isActive
                ? 'text-emerald-900 font-semibold bg-emerald-50/60'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <AlertTriangle size={15} className="text-slate-400" />
          <span>Scrutiny Queue</span>
        </NavLink>

        <NavLink
          to="/clearance"
          onClick={() => onRoleChange('CLEARANCE')}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              isActive
                ? 'text-emerald-900 font-semibold bg-emerald-50/60'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <ShieldAlert size={15} className="text-slate-400" />
          <span>Clearance Bureau</span>
        </NavLink>

        <NavLink
          to="/executive"
          onClick={() => onRoleChange('EXECUTIVE')}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              isActive
                ? 'text-emerald-900 font-semibold bg-emerald-50/60'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <BarChart3 size={15} className="text-slate-400" />
          <span>Executive Command</span>
        </NavLink>

        <NavLink
          to="/audit"
          onClick={() => onRoleChange('AUDIT_ADMIN')}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              isActive
                ? 'text-emerald-900 font-semibold bg-emerald-50/60'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <History size={15} className="text-slate-400" />
          <span>Audit Ledger</span>
        </NavLink>

        <div className="pt-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Public Portal Views
        </div>

        <NavLink
          to="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
        >
          <span className="text-xs">🏛️</span>
          <span>Official Public Home</span>
        </NavLink>

        <NavLink
          to="/features"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
        >
          <span className="text-xs">⚡</span>
          <span>Architecture & Features</span>
        </NavLink>
      </div>

      {/* User Footer Card */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/80 text-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-500">Authorized Officer:</span>
          <span className="font-bold text-emerald-700 font-mono text-[10px] bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
            {user.employeeId}
          </span>
        </div>
        <div className="text-slate-900 font-semibold text-xs truncate">{user.name}</div>
        <div className="text-slate-500 text-[11px] truncate leading-tight mt-0.5">{user.designation}</div>
      </div>
    </aside>
  );
}
