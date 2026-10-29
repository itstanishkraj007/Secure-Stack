import { useState, useEffect } from 'react';
import { Bell, LogOut, Shield, RotateCcw, Building, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
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

  const rolesList: { role: UserRole; label: string; icon: string }[] = [
    { role: 'INSTITUTION', label: '1. Institution Nodal Desk', icon: '🏛️' },
    { role: 'SCRUTINY', label: '2. Scrutiny Officer', icon: '🔍' },
    { role: 'CLEARANCE', label: '3. Clearance Bureau', icon: '📋' },
    { role: 'EXECUTIVE', label: '4. Executive Command', icon: '📊' },
    { role: 'AUDIT_ADMIN', label: '5. Audit Admin', icon: '🔐' },
  ];

  return (
    <header className="flex-shrink-0 z-30 shadow-md select-none border-b border-[#0B2C4F]">
      {/* 1. Indian Tricolor Stripe */}
      <div className="flex h-[3.5px] w-full">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* 2. Top Government of India Strip */}
      <div className="bg-[#FAF8F5] border-b border-[#E2D9C8] px-4 py-1 flex items-center justify-between text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">भारत सरकार</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-700">Government of India</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-600 hidden sm:inline">शिक्षा मंत्रालय • Ministry of Education</span>
          <span className="text-gray-300 hidden md:inline">|</span>
          <span className="text-gray-500 font-mono text-xxs hidden md:inline">GIGW 3.0 & CERT-In Compliant</span>
        </div>
        <div className="flex items-center gap-3 text-xxs text-gray-600">
          <Link to="/" className="text-[#003366] hover:underline flex items-center gap-1 font-semibold">
            <span>Public Home</span>
          </Link>
          <span className="text-gray-300">•</span>
          <span>EMP ID: <strong className="text-gray-900 font-mono">{user.employeeId}</strong></span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="font-mono text-gray-700 hidden sm:inline">{timeStr}</span>
        </div>
      </div>

      {/* 3. Main AICTE Royal Navy Bar */}
      <div className="bg-[#003366] px-4 py-2.5 flex items-center justify-between text-white">
        <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
          <AicteEmblem className="h-10 w-auto flex-shrink-0" />
          <div>
            <div className="text-white/80 text-xxs leading-none mb-0.5">अखिल भारतीय तकनीकी शिक्षा परिषद</div>
            <div className="text-white text-sm font-bold tracking-tight leading-tight uppercase font-sans">
              All India Council for Technical Education
            </div>
            <div className="text-[#FF9933] text-xxs font-semibold leading-none mt-0.5">
              Security Deposit & FDR Management Portal (SDMS)
            </div>
          </div>
        </Link>

        {/* Right Session Controls & Quick Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher Buttons (Human-engineered convenience) */}
          <div className="hidden lg:flex items-center bg-[#071E36] rounded border border-white/20 p-0.5 text-xs">
            {rolesList.map((r) => {
              const isSelected = activeRole === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => onRoleChange(r.role)}
                  className={`px-2.5 py-1 rounded text-xxs font-semibold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#FF8A00] text-gray-950 shadow-sm font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={`Switch to ${r.label}`}
                >
                  <span>{r.icon}</span>
                  <span>{r.role === 'INSTITUTION' ? 'Institution' : r.role === 'SCRUTINY' ? 'Scrutiny' : r.role === 'CLEARANCE' ? 'Clearance' : r.role === 'EXECUTIVE' ? 'Executive' : 'Audit'}</span>
                </button>
              );
            })}
          </div>

          <div className="h-5 w-px bg-white/20 hidden lg:block" />

          {/* Reset Demo State Button */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="text-white/70 hover:text-white hover:bg-white/10 px-2 py-1 rounded text-xxs flex items-center gap-1 border border-white/15"
            title="Reset simulated data to seed defaults"
          >
            <RotateCcw size={11} />
            <span className="hidden xl:inline">Reset Seed Data</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-1 text-white/80 hover:text-white transition-colors"
            title="System alerts"
          >
            <Bell size={16} />
            <span className="absolute top-0 right-0 bg-[#E65100] text-white text-xxs w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          <div className="h-5 w-px bg-white/20" />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 text-white">
            <div className="w-7 h-7 rounded-full bg-[#FF8A00] text-gray-950 font-bold flex items-center justify-center text-xs shadow-inner">
              {user.name.charAt(0)}
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs font-semibold leading-tight">{user.name}</div>
              <div className="text-xxs text-[#FF9933] font-medium leading-none">{user.designation}</div>
            </div>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleLogout}
            className="text-white/80 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded transition-colors ml-1 flex items-center gap-1 text-xs font-semibold border border-white/20"
            title="Sign Out / Exit Workspace"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* 4. Active Workspace Department Context Strip */}
      <div className="bg-[#09223D] border-b border-[#0B2C4F] px-4 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/90 gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-sm">{currentMeta.icon}</span>
          <span className="font-bold text-[#FF9933] uppercase tracking-wider text-xxs">
            ACTIVE WORKSPACE:
          </span>
          <span className="font-semibold text-white text-xs">{currentMeta.title}</span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-white/70 text-xxs hidden md:inline">{currentMeta.subtitle}</span>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xxs text-white/80">
          {activeRole === 'INSTITUTION' && (
            <span>AISHE Code: <strong className="text-white font-mono">1-348910283 (Pune Inst. of Tech)</strong></span>
          )}
          {activeRole === 'SCRUTINY' && (
            <span>Open Exceptions: <strong className="text-[#FF9933] font-bold font-mono">{scrutinyCases.filter(c => c.status !== 'RESOLVED').length} Cases</strong></span>
          )}
          {activeRole === 'CLEARANCE' && (
            <span>Release Pipeline: <strong className="text-[#FF9933] font-bold font-mono">{releaseRequests.length} Active Dossiers</strong></span>
          )}
          {activeRole === 'EXECUTIVE' && (
            <span>National Pool: <strong className="text-[#FF9933] font-bold font-mono">₹3,247.2 Cr Monitored</strong></span>
          )}
          {activeRole === 'AUDIT_ADMIN' && (
            <span>Cryptographic Chain: <strong className="text-emerald-400 font-bold font-mono">{auditEvents.length} Verified Hashes</strong></span>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-[#E2E8F0] max-w-md w-full p-5 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-gray-900">Reset Demo Data to Factory State?</h3>
            <p className="text-xs text-gray-600">
              This will restore all simulated FDR submissions, scrutiny rulings, clearance gate statuses, and
              audit logs back to the clean initial seed state.
            </p>
            <div className="flex justify-end gap-2 pt-2">
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
