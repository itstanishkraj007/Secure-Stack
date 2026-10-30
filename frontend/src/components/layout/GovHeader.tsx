import { useState, useEffect } from 'react';
import { Bell, LogOut, RotateCcw, Search, Sparkles, Building2, CheckCircle2, Shield, Command } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPersona, UserRole } from '../../types';
import { useAuth, ROLE_METADATA, ROLE_HOME_ROUTES } from '../../context/AuthContext';
import { usePortalData } from '../../context/PortalDataContext';
import { AicteEmblem } from '../common/AicteLogo';

interface GovHeaderProps {
  user: UserPersona;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function GovHeader({ user, activeRole, onRoleChange }: GovHeaderProps) {
  const { logout } = useAuth();
  const { resetAllData, auditEvents, scrutinyCases, releaseRequests } = usePortalData();
  const navigate = useNavigate();
  const [timeStr, setTimeStr] = useState<string>('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
          ' • ' +
          now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) +
          ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReset = () => {
    resetAllData();
    setShowResetConfirm(false);
  };

  const currentMeta = ROLE_METADATA[activeRole] || ROLE_METADATA.INSTITUTION;

  const rolesList: { role: UserRole; label: string; icon: string; short: string }[] = [
    { role: 'INSTITUTION', label: 'Institution Nodal Desk', icon: '🏛️', short: 'Institution' },
    { role: 'SCRUTINY', label: 'Scrutiny Officer', icon: '🔍', short: 'Scrutiny' },
    { role: 'CLEARANCE', label: 'Clearance Bureau', icon: '📋', short: 'Clearance' },
    { role: 'EXECUTIVE', label: 'Executive Command', icon: '📊', short: 'Executive' },
    { role: 'AUDIT_ADMIN', label: 'Audit Admin', icon: '🔐', short: 'Audit' },
  ];

  return (
    <header className="flex-shrink-0 z-30 select-none bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* 1. Indian Tricolor Stripe for Official Authority */}
      <div className="flex h-[3px] w-full">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* 2. Top Official Strip */}
      <div className="bg-[#FAF8F5] border-b border-slate-200/60 px-5 py-1 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-slate-900">भारत सरकार</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-700">Government of India</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-600 hidden sm:inline">शिक्षा मंत्रालय • Ministry of Education</span>
          <span className="text-slate-300 hidden md:inline">|</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            GIGW 3.0 & CERT-In Compliant
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <Link
            to="/"
            className="text-slate-600 hover:text-emerald-700 flex items-center gap-1 font-medium transition-colors"
          >
            <span>Public Portal</span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-slate-500">
            EMP ID: <strong className="text-slate-900 font-semibold">{user.employeeId}</strong>
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="font-mono text-slate-500 hidden sm:inline">{timeStr}</span>
        </div>
      </div>

      {/* 3. Main White-Dominant Finovate-Style Header */}
      <div className="bg-white px-5 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & AICTE Identity */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-shrink-0">
          <AicteEmblem className="h-9 w-auto flex-shrink-0 drop-shadow-xs" />
          <div className="border-l border-slate-200 pl-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1 font-sans">
                SECURE<span className="text-[#10B981]">STACK</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                AICTE SDMS
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              All India Council for Technical Education • Security Deposit Portal
            </div>
          </div>
        </Link>

        {/* Center: Command Bar / Search Palette */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              readOnly
              onClick={() => navigate('/institution/dashboard')}
              placeholder="Search instruments, IFSC, FDR number, cases..."
              className="w-full pl-9 pr-16 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer shadow-2xs"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shadow-2xs font-mono">
                <Command size={10} /> Space
              </span>
            </div>
          </div>
        </div>

        {/* Right Session Controls & Quick Segmented Role Switcher */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Quick Segmented Role Switcher */}
          <div className="hidden xl:flex items-center bg-slate-100/90 rounded-xl p-1 border border-slate-200/80">
            {rolesList.map((r) => {
              const isSelected = activeRole === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => onRoleChange(r.role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                  title={`Switch to ${r.label}`}
                >
                  <span className="text-xs">{r.icon}</span>
                  <span>{r.short}</span>
                </button>
              );
            })}
          </div>

          {/* Reset Demo State Button */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-slate-200 shadow-2xs transition-all"
            title="Reset simulated data to seed defaults"
          >
            <RotateCcw size={12} className="text-slate-500" />
            <span className="hidden lg:inline">Reset Seed</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/60 bg-white shadow-2xs"
            title="System notifications"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 bg-[#10B981] ring-2 ring-white w-2 h-2 rounded-full" />
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 pl-1.5 pr-3 py-1 rounded-xl shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</div>
              <div className="text-[10px] text-emerald-700 font-medium leading-none mt-0.5">{user.designation}</div>
            </div>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleLogout}
            className="text-slate-600 hover:text-red-700 hover:bg-red-50 p-2 sm:px-2.5 sm:py-1.5 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold border border-slate-200 bg-white shadow-2xs"
            title="Sign Out / Exit Workspace"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* 4. Active Workspace Department Context Strip */}
      <div className="bg-[#F8FAFC] border-t border-b border-slate-200/70 px-5 py-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-base">{currentMeta.icon}</span>
          <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            ACTIVE WORKSPACE
          </span>
          <span className="font-bold text-slate-900 text-xs">{currentMeta.title}</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-slate-500 text-xs hidden md:inline">{currentMeta.subtitle}</span>
        </div>

        {/* Live Counters Styled as Modern Badges */}
        <div className="flex items-center gap-2.5 text-xs">
          {activeRole === 'INSTITUTION' && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AISHE Code: <strong className="text-slate-900 font-mono">1-348910283 (Pune Inst. of Tech)</strong>
            </span>
          )}
          {activeRole === 'SCRUTINY' && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-amber-200 px-2.5 py-1 rounded-lg text-amber-900 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Open Exceptions:{' '}
              <strong className="text-amber-700 font-bold font-mono">
                {scrutinyCases.filter((c) => c.status !== 'RESOLVED').length} Cases
              </strong>
            </span>
          )}
          {activeRole === 'CLEARANCE' && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-blue-200 px-2.5 py-1 rounded-lg text-blue-900 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Release Pipeline:{' '}
              <strong className="text-blue-700 font-bold font-mono">{releaseRequests.length} Active Dossiers</strong>
            </span>
          )}
          {activeRole === 'EXECUTIVE' && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 px-2.5 py-1 rounded-lg text-emerald-900 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              National Portfolio:{' '}
              <strong className="text-emerald-700 font-bold font-mono">₹3,247.2 Cr Monitored</strong>
            </span>
          )}
          {activeRole === 'AUDIT_ADMIN' && (
            <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 px-2.5 py-1 rounded-lg text-emerald-900 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Cryptographic Chain:{' '}
              <strong className="text-emerald-700 font-bold font-mono">{auditEvents.length} Verified Hashes</strong>
            </span>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <RotateCcw size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Reset Demo Data to Factory State?</h3>
                <p className="text-xs text-slate-500">Restore all initial verified cases and audit chains.</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              This will restore all simulated FDR submissions, scrutiny rulings, clearance gate statuses, and audit logs
              back to the clean initial seed state.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-primary text-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
