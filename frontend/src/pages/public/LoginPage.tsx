import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  UserCheck,
  Scale,
  Lock,
  ArrowRight,
  HelpCircle,
  KeyRound,
  FileCheck2,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginAs } = useAuth();

  const initialRoleParam = searchParams.get('role') as UserRole;
  const [activeTab, setActiveTab] = useState<UserRole>(
    ['INSTITUTION', 'SCRUTINY', 'EXECUTIVE', 'CLEARANCE', 'AUDIT_ADMIN'].includes(initialRoleParam)
      ? initialRoleParam
      : 'INSTITUTION'
  );

  // Form states
  const [username, setUsername] = useState(
    activeTab === 'INSTITUTION' ? '1-348910283' : activeTab === 'SCRUTINY' ? 'ravi.prasad@aicte.gov.in' : 'dr.iyer@aicte.gov.in'
  );
  const [password, setPassword] = useState('••••••••••••');
  const [captcha, setCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState('8 K 4 M 9');
  const [errorMessage, setErrorMessage] = useState('');

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let res = '';
    for (let i = 0; i < 5; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length)) + ' ';
    }
    setCaptchaText(res.trim());
  };

  const handleTabChange = (role: UserRole) => {
    setActiveTab(role);
    setErrorMessage('');
    if (role === 'INSTITUTION') setUsername('1-348910283');
    else if (role === 'SCRUTINY') setUsername('ravi.prasad@aicte.gov.in');
    else if (role === 'EXECUTIVE') setUsername('dr.iyer@aicte.gov.in');
    else if (role === 'CLEARANCE') setUsername('meena.agarwal@aicte.gov.in');
    else if (role === 'AUDIT_ADMIN') setUsername('k.narayanan@aicte.gov.in');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAndRedirect(activeTab);
  };

  const loginAndRedirect = (roleToLogin: UserRole) => {
    loginAs(roleToLogin);
    if (roleToLogin === 'INSTITUTION') {
      navigate('/institution/dashboard');
    } else if (roleToLogin === 'SCRUTINY') {
      navigate('/scrutiny/queue');
    } else if (roleToLogin === 'EXECUTIVE') {
      navigate('/executive');
    } else if (roleToLogin === 'CLEARANCE') {
      navigate('/clearance');
    } else if (roleToLogin === 'AUDIT_ADMIN') {
      navigate('/audit');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 sm:px-8 py-8 space-y-6">
        {/* Breadcrumb strip */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700 font-medium transition-colors">Home</Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900">Official Portal Sign In</span>
        </div>

        {/* Security Banner */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-3 text-xs text-emerald-950 shadow-2xs">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#10B981] flex-shrink-0" />
            <div>
              <strong>Government of India Secure Access Portal:</strong> Authorized personnel only.
              All authentication attempts are logged with IP, browser fingerprint, and timestamp per CERT-In cybersecurity directives.
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200 hidden sm:inline shadow-2xs font-bold">
            TLS 1.3 / 256-BIT
          </span>
        </div>

        {/* Main Login Card with Tabs (Finovate White Style) */}
        <div className="card shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-200/80 rounded-2xl">
          {/* Left / Main Column (7 cols): Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                CENTRALIZED SINGLE SIGN-ON (SSO)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                Sign In to Security Deposit Management System
              </h2>
              <p className="text-xs text-slate-500">
                Select your designated role and provide authenticated credentials
              </p>
            </div>

            {/* Role Tabs */}
            <div className="flex bg-slate-100/80 p-1 rounded-xl text-xs font-semibold gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() => handleTabChange('INSTITUTION')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'INSTITUTION'
                    ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Building size={14} />
                <span>1. Institution Nodal</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('SCRUTINY')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'SCRUTINY'
                    ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <UserCheck size={14} />
                <span>2. Scrutiny Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('EXECUTIVE')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'EXECUTIVE'
                    ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Scale size={14} />
                <span>3. Bureau Head</span>
              </button>
            </div>

            {/* Actual Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
              <div>
                <label className="field-label text-slate-700">
                  {activeTab === 'INSTITUTION'
                    ? 'AICTE Permanent Institution ID / AISHE Code'
                    : activeTab === 'SCRUTINY'
                    ? 'Official AICTE / NIC Email ID'
                    : 'Bureau Head / DDO Access ID'}
                </label>
                <div className="relative mt-1.5">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition-all"
                    placeholder={
                      activeTab === 'INSTITUTION'
                        ? 'e.g., 1-348910283 or C-41235'
                        : 'e.g., officer.name@aicte.gov.in'
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="field-label text-slate-700">Password / Digital Token Pin</label>
                  <a
                    href="#help"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Please contact AICTE Central IT Helpdesk at helpdesk-fdr@aicte-india.org for password recovery.');
                    }}
                    className="text-xs text-emerald-700 hover:underline font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative mt-1.5">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition-all"
                    placeholder="Enter secure password"
                  />
                </div>
              </div>

              {/* Captcha Box */}
              <div>
                <label className="field-label text-slate-700">Security Captcha</label>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl font-mono font-bold text-base tracking-widest text-slate-900 select-none line-through shadow-2xs">
                    {captchaText}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-slate-500 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                    title="Refresh Captcha"
                  >
                    <RefreshCw size={15} />
                  </button>
                  <input
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    placeholder="Enter Captcha"
                    className="w-32 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase font-mono text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-2.5 text-xs font-bold shadow-xs"
                >
                  <Lock size={14} />
                  <span>
                    Sign In as{' '}
                    {activeTab === 'INSTITUTION'
                      ? 'Institution Nodal Officer'
                      : activeTab === 'SCRUTINY'
                      ? 'Regional Scrutiny Officer'
                      : 'Regulation Bureau Head'}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (5 cols): 1-Click Demo Login Bar */}
          <div className="lg:col-span-5 bg-slate-50/80 border-t lg:border-t-0 lg:border-l border-slate-200/80 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
                <ShieldCheck size={12} className="text-[#10B981]" />
                <span>SIH 2026 JURY EVALUATION GATEWAY</span>
              </div>

              <h3 className="font-bold text-sm text-slate-900">
                1-Click Preset Roles for Evaluator Demo
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                For the product video recording and SIH jury evaluation, click any preset below to
                instantly authenticate into that role's live workspace:
              </p>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => loginAndRedirect('INSTITUTION')}
                  className="w-full text-left p-3 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl transition-all shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 flex items-center gap-1.5">
                      <Building size={14} className="text-[#10B981]" /> 1. Institution Nodal Officer
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.2 rounded-full font-bold">
                      LIVE
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Dr. Anil Sharma • Pune Institute of Technology (FDR Intake, T-15 Alert)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('SCRUTINY')}
                  className="w-full text-left p-3 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl transition-all shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 flex items-center gap-1.5">
                      <UserCheck size={14} className="text-[#10B981]" /> 2. Regional Scrutiny Officer
                    </span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.2 rounded-full font-bold">
                      FLAGSHIP
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Ravi Shankar Prasad • WRO Desk (Triple-Source Mismatch & Case SCR-089)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('EXECUTIVE')}
                  className="w-full text-left p-3 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl transition-all shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 flex items-center gap-1.5">
                      <Scale size={14} className="text-[#10B981]" /> 3. Fund Release Authority
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.2 rounded-full font-bold">
                      PAN-INDIA
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Dr. Krishnamurthy Iyer • Bureau Head (₹3,247 Cr Overview & Sanction Orders)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('CLEARANCE')}
                  className="w-full text-left p-3 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl transition-all shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 flex items-center gap-1.5">
                      <FileCheck2 size={14} className="text-[#10B981]" /> 4. Clearance Cell Officer
                    </span>
                    <span className="text-[10px] bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.2 rounded-full font-bold">
                      5 GATES
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Meena Agarwal • Internal Clearance Hub (Hold Resolutions & Penalty Assessment)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('AUDIT_ADMIN')}
                  className="w-full text-left p-3 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl transition-all shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 flex items-center gap-1.5">
                      <Lock size={14} className="text-[#10B981]" /> 5. System Auditor & Admin
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.2 rounded-full font-bold">
                      SHA-256
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    K.R. Narayanan • Audit Desk (Cryptographic Integrity Verification)
                  </div>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-3">
              🔒 Built with DPDP Act 2023 compliance & ephemeral token isolation.
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
