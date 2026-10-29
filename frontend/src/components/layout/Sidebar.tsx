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
    <aside className="w-64 bg-[#071E36] text-gray-300 flex flex-col flex-shrink-0 border-r border-[#0B2C4F] select-none h-full">
      {/* Role Switcher with direct role switching */}
      <div className="p-3 border-b border-white/10 bg-[#09223D]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xxs font-bold text-[#FF9933] uppercase tracking-wider flex items-center gap-1">
            <UserCheck size={12} /> Active Role:
          </span>
          <span className="text-xxs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
            Switch Updates View
          </span>
        </div>
        <select
          value={activeRole}
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
          className="w-full bg-[#041324] border border-[#FF9933]/60 text-white text-xs font-semibold rounded px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF9933] cursor-pointer"
        >
          <option value="INSTITUTION">🏛️ 1. Institution Nodal Desk</option>
          <option value="SCRUTINY">🔍 2. Regional Scrutiny Officer</option>
          <option value="CLEARANCE">📋 3. Clearance Cell Officer</option>
          <option value="EXECUTIVE">📊 4. Regulation Bureau Head</option>
          <option value="AUDIT_ADMIN">🔐 5. System Auditor & Admin</option>
        </select>
        <p className="text-xxs text-white/50 mt-1 italic">
          Selecting a role automatically shifts your primary workspace view.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className="px-2.5 py-1 text-xxs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
          <span>Active Role Modules</span>
          <span className="text-xxs font-mono text-[#FF9933]">v2.4</span>
        </div>

        {navs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#003366] text-white border-l-4 border-[#FF8A00] font-semibold shadow-inner'
                    : 'text-gray-300 hover:bg-[#0B2C4F] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon size={15} className="flex-shrink-0 text-[#FF9933]" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-xxs font-mono font-bold bg-white/15 text-white px-1.5 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-2.5 py-1 text-xxs font-bold uppercase tracking-wider text-gray-400">
          All Workspace Desks
        </div>

        <NavLink
          to="/institution/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold bg-[#0B2C4F]/60' : 'text-gray-400 hover:text-gray-200 hover:bg-[#0B2C4F]/30'
            }`
          }
        >
          <FileText size={13} className="text-gray-400" />
          <span>Institutions View</span>
        </NavLink>

        <NavLink
          to="/scrutiny/queue"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold bg-[#0B2C4F]/60' : 'text-gray-400 hover:text-gray-200 hover:bg-[#0B2C4F]/30'
            }`
          }
        >
          <AlertTriangle size={13} className="text-gray-400" />
          <span>Scrutiny Queue</span>
        </NavLink>

        <NavLink
          to="/clearance"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold bg-[#0B2C4F]/60' : 'text-gray-400 hover:text-gray-200 hover:bg-[#0B2C4F]/30'
            }`
          }
        >
          <ShieldAlert size={13} className="text-gray-400" />
          <span>Clearance Bureau</span>
        </NavLink>

        <NavLink
          to="/executive"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold bg-[#0B2C4F]/60' : 'text-gray-400 hover:text-gray-200 hover:bg-[#0B2C4F]/30'
            }`
          }
        >
          <BarChart3 size={13} className="text-gray-400" />
          <span>Executive Command</span>
        </NavLink>

        <NavLink
          to="/audit"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold bg-[#0B2C4F]/60' : 'text-gray-400 hover:text-gray-200 hover:bg-[#0B2C4F]/30'
            }`
          }
        >
          <History size={13} className="text-gray-400" />
          <span>Audit Ledger</span>
        </NavLink>

        <div className="pt-3 px-2.5 py-1 text-xxs font-bold uppercase tracking-wider text-gray-400">
          Public Portal Views
        </div>

        <NavLink
          to="/"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded text-xs text-[#FF9933] hover:text-white hover:bg-[#0B2C4F] transition-colors"
        >
          <span className="text-xs">🏛️</span>
          <span>Official Public Home</span>
        </NavLink>

        <NavLink
          to="/features"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded text-xs text-gray-300 hover:text-white hover:bg-[#0B2C4F] transition-colors"
        >
          <span className="text-xs">⚡</span>
          <span>Architecture & Features</span>
        </NavLink>
      </div>

      {/* User Footer Card */}
      <div className="p-3 border-t border-white/10 bg-[#041324] text-xxs space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Signed In As:</span>
          <span className="font-bold text-[#FF9933] font-mono">{user.employeeId}</span>
        </div>
        <div className="text-white font-semibold truncate">{user.name}</div>
        <div className="text-gray-400 truncate">{user.designation}</div>
      </div>
    </aside>
  );
}
