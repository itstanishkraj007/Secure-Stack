import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  ShieldAlert,
  BarChart3,
  Layers,
  History,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { UserPersona, UserRole } from '../../types';

interface SidebarProps {
  user: UserPersona;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function Sidebar({ user, activeRole, onRoleChange }: SidebarProps) {
  const roleNavItems: Record<
    UserRole,
    { label: string; to: string; icon: any; count?: number }[]
  > = {
    INSTITUTION: [
      { label: 'My FDR Portfolio', to: '/institution/dashboard', icon: FileText, count: 4 },
      { label: 'Submit FDR Instrument', to: '/institution/submit', icon: Upload },
      { label: 'Maturity Watchdog', to: '/lifecycle', icon: Clock, count: 1 },
    ],
    SCRUTINY: [
      { label: 'Exception Scrutiny Queue', to: '/scrutiny/queue', icon: AlertTriangle, count: 6 },
      { label: 'Triple-Source Case (SCR-089)', to: '/scrutiny/cases/SCR-2024-089', icon: CheckCircle2 },
      { label: 'Deposit Lifecycle Watch', to: '/lifecycle', icon: Clock },
    ],
    CLEARANCE: [
      { label: 'Multi-Cell Clearance Hub', to: '/clearance', icon: ShieldAlert, count: 3 },
      { label: 'Institution Registry', to: '/institution/dashboard', icon: FileText },
    ],
    EXECUTIVE: [
      { label: 'Executive Command Center', to: '/executive', icon: BarChart3 },
      { label: 'Sanction & Release Desks', to: '/clearance', icon: ShieldAlert, count: 1 },
      { label: 'Maturity Surveillance', to: '/lifecycle', icon: Clock },
      { label: 'SHA-256 Audit Records', to: '/audit', icon: History },
    ],
    AUDIT_ADMIN: [
      { label: 'Tamper-Evident Ledger', to: '/audit', icon: History, count: 891 },
      { label: 'Regional Scrutiny Overview', to: '/scrutiny/queue', icon: AlertTriangle },
      { label: 'National Analytics', to: '/executive', icon: BarChart3 },
    ],
  };

  const navs = roleNavItems[activeRole] || [];

  return (
    <aside className="w-60 bg-[#071E36] text-gray-300 flex flex-col flex-shrink-0 border-r border-[#0B2C4F] select-none h-full">
      {/* Role Switcher for Video Demo */}
      <div className="p-3 border-b border-white/10 bg-[#09223D]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xxs font-bold text-[#FF9933] uppercase tracking-wider flex items-center gap-1">
            <UserCheck size={11} /> Active Workspace:
          </span>
          <span className="text-xxs text-white/60 bg-black/30 px-1 py-0.2 rounded">Demo Role</span>
        </div>
        <select
          value={activeRole}
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
          className="w-full bg-[#041324] border border-[#FF9933]/40 text-white text-xs font-semibold rounded px-2 py-1.5 focus:outline-none focus:border-[#FF9933] cursor-pointer"
        >
          <option value="INSTITUTION">🏛️ Institution Nodal Desk</option>
          <option value="SCRUTINY">🔍 Regional Scrutiny Officer</option>
          <option value="CLEARANCE">📋 Clearance Cell Officer</option>
          <option value="EXECUTIVE">📊 Regulation Bureau Head</option>
          <option value="AUDIT_ADMIN">🔐 System Auditor & Admin</option>
        </select>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className="px-2 py-1 text-xxs font-bold uppercase tracking-wider text-gray-400">
          Module Navigation
        </div>

        {navs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-2.5 py-2 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#003366] text-white border-l-3 border-[#FF8A00] font-semibold'
                    : 'text-gray-300 hover:bg-[#0B2C4F] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon size={15} className="flex-shrink-0 text-[#FF9933]" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-xxs font-bold bg-white/15 text-white px-1.5 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-2 py-1 text-xxs font-bold uppercase tracking-wider text-gray-400">
          Public Portal Views
        </div>

        <NavLink
          to="/"
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs text-[#FF9933] hover:text-white hover:bg-[#0B2C4F] transition-colors"
        >
          <span className="text-sm">🏛️</span>
          <span>Official Public Home</span>
        </NavLink>

        <NavLink
          to="/features"
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs text-gray-300 hover:text-white hover:bg-[#0B2C4F] transition-colors"
        >
          <span className="text-sm">⚡</span>
          <span>Architecture & Features</span>
        </NavLink>

        <div className="pt-3 px-2 py-1 text-xxs font-bold uppercase tracking-wider text-gray-400">
          All Workspace Desks
        </div>

        <NavLink
          to="/institution/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <FileText size={13} className="text-gray-400" />
          <span>Institutions View</span>
        </NavLink>

        <NavLink
          to="/scrutiny/queue"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <AlertTriangle size={13} className="text-gray-400" />
          <span>Scrutiny Queue</span>
        </NavLink>

        <NavLink
          to="/clearance"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <Layers size={13} className="text-gray-400" />
          <span>Clearance Gates</span>
        </NavLink>

        <NavLink
          to="/executive"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <BarChart3 size={13} className="text-gray-400" />
          <span>Executive Center</span>
        </NavLink>

        <NavLink
          to="/audit"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <History size={13} className="text-gray-400" />
          <span>Audit Chain Ledger</span>
        </NavLink>
      </div>

      {/* User Session Info footer */}
      <div className="p-3 bg-[#041324] border-t border-white/10 text-xs">
        <div className="text-gray-400 text-xxs uppercase tracking-wider mb-0.5">Active Session</div>
        <div className="font-semibold text-white truncate">{user.name}</div>
        <div className="text-xxs text-[#FF9933] truncate">{user.designation}</div>
        {user.institution && (
          <div className="text-xxs text-gray-400 truncate mt-0.5">{user.institution}</div>
        )}
      </div>
    </aside>
  );
}
