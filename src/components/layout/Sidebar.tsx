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
      { label: 'My Instruments', to: '/institution/dashboard', icon: FileText, count: 4 },
      { label: 'Submit FDR / Instrument', to: '/institution/submit', icon: Upload },
      { label: 'Maturity Watch & Alerts', to: '/lifecycle', icon: Clock, count: 1 },
    ],
    SCRUTINY: [
      { label: 'Exception Queue', to: '/scrutiny/queue', icon: AlertTriangle, count: 6 },
      { label: 'Active Verification Case', to: '/scrutiny/cases/SCR-2024-089', icon: CheckCircle2 },
      { label: 'Lifecycle & Maturity', to: '/lifecycle', icon: Clock },
    ],
    CLEARANCE: [
      { label: 'Release Clearance Hub', to: '/clearance', icon: ShieldAlert, count: 3 },
      { label: 'Instrument Portfolio', to: '/institution/dashboard', icon: FileText },
    ],
    EXECUTIVE: [
      { label: 'Executive Command Center', to: '/executive', icon: BarChart3 },
      { label: 'Clearance Approvals', to: '/clearance', icon: ShieldAlert, count: 1 },
      { label: 'Lifecycle Watchdog', to: '/lifecycle', icon: Clock },
      { label: 'Audit Chain Records', to: '/audit', icon: History },
    ],
    AUDIT_ADMIN: [
      { label: 'Tamper-Evident Ledger', to: '/audit', icon: History, count: 891 },
      { label: 'Scrutiny Queue View', to: '/scrutiny/queue', icon: AlertTriangle },
      { label: 'Executive Analytics', to: '/executive', icon: BarChart3 },
    ],
  };

  const navs = roleNavItems[activeRole] || [];

  return (
    <aside className="w-60 bg-[#1C0A0A] text-gray-300 flex flex-col flex-shrink-0 border-r border-[#2D1515] select-none h-full">
      {/* Role Switcher for Video Demo */}
      <div className="p-3 border-b border-white/10 bg-[#251010]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xxs font-bold text-[#D4A017] uppercase tracking-wider flex items-center gap-1">
            <UserCheck size={11} /> Video Demo Role:
          </span>
          <span className="text-xxs text-white/50 bg-black/40 px-1 py-0.5 rounded">Quick Switch</span>
        </div>
        <select
          value={activeRole}
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
          className="w-full bg-[#140606] border border-[#B7791F]/40 text-white text-xs font-semibold rounded px-2 py-1.5 focus:outline-none focus:border-[#D4A017] cursor-pointer"
        >
          <option value="INSTITUTION">🏛️ Institution Officer</option>
          <option value="SCRUTINY">🔍 Regional Scrutiny Officer</option>
          <option value="CLEARANCE">📋 Clearance Cell Officer</option>
          <option value="EXECUTIVE">📊 Regulation Bureau Head</option>
          <option value="AUDIT_ADMIN">🔐 System Auditor & Admin</option>
        </select>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className="px-2 py-1 text-xxs font-bold uppercase tracking-wider text-gray-500">
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
                    ? 'bg-[#7B1D1D] text-white border-l-2 border-[#D4A017]'
                    : 'text-gray-300 hover:bg-[#2D1515] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon size={15} className="flex-shrink-0 text-[#D4A017]" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-xxs font-bold bg-white/10 text-white px-1.5 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-2 py-1 text-xxs font-bold uppercase tracking-wider text-gray-500">
          Global Cross-Links
        </div>

        <NavLink
          to="/institution/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors ${
              isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <FileText size={13} className="text-gray-500" />
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
          <AlertTriangle size={13} className="text-gray-500" />
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
          <Layers size={13} className="text-gray-500" />
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
          <BarChart3 size={13} className="text-gray-500" />
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
          <History size={13} className="text-gray-500" />
          <span>Audit Chain Ledger</span>
        </NavLink>
      </div>

      {/* User info footer */}
      <div className="p-3 bg-[#140606] border-t border-white/10 text-xs">
        <div className="text-gray-400 text-xxs uppercase tracking-wider mb-0.5">Active Session</div>
        <div className="font-semibold text-white truncate">{user.name}</div>
        <div className="text-xxs text-[#D4A017] truncate">{user.designation}</div>
        {user.institution && (
          <div className="text-xxs text-gray-400 truncate mt-0.5">{user.institution}</div>
        )}
      </div>
    </aside>
  );
}
