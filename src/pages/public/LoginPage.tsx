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

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6">
        {/* Breadcrumb strip */}
        <div className="flex items-center gap-2 text-xxs text-gray-500">
          <Link to="/" className="hover:text-[#003366]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-[#003366]">Official Portal Sign In</span>
        </div>

        {/* Security Banner */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded p-3 flex items-start sm:items-center justify-between gap-3 text-xs text-[#1E40AF]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-[#003366] flex-shrink-0" />
            <div>
              <strong>Government of India Secure Access Portal:</strong> Authorized personnel only.
              All authentication attempts are logged with IP, browser fingerprint, and timestamp per CERT-In cybersecurity directives.
            </div>
          </div>
          <span className="text-xxs font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200 hidden sm:inline">
            TLS 1.3 / 256-BIT
          </span>
        </div>

        {/* Main Login Card with Tabs */}
        <div className="card shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#E2E8F0]">
          {/* Left / Main Column (7 cols): Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 bg-white">
            <div className="space-y-1">
              <span className="text-xxs font-bold text-[#E65100] uppercase tracking-wider">
                CENTRALIZED SINGLE SIGN-ON (SSO)
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#003366]">
                Sign In to Security Deposit Management System
              </h2>
              <p className="text-xxs text-gray-500">
                Select your designated role and provide authenticated credentials
              </p>
            </div>

            {/* Role Tabs */}
            <div className="flex border-b border-[#E2E8F0] text-xs font-semibold overflow-x-auto">
              <button
                type="button"
                onClick={() => handleTabChange('INSTITUTION')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'INSTITUTION'
                    ? 'border-[#003366] text-[#003366] bg-[#EFF6FF]/60'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Building size={14} />
                <span>1. Institution Nodal Desk</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('SCRUTINY')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'SCRUTINY'
                    ? 'border-[#003366] text-[#003366] bg-[#EFF6FF]/60'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserCheck size={14} />
                <span>2. Scrutiny Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('EXECUTIVE')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'EXECUTIVE'
                    ? 'border-[#003366] text-[#003366] bg-[#EFF6FF]/60'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Scale size={14} />
                <span>3. Fund Release Authority</span>
              </button>
            </div>

            {/* Actual Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
              <div>
                <label className="field-label text-gray-700">
                  {activeTab === 'INSTITUTION'
                    ? 'AICTE Permanent Institution ID / AISHE Code'
                    : activeTab === 'SCRUTINY'
                    ? 'Official AICTE / NIC Email ID'
                    : 'Bureau Head / DDO Access ID'}
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-2 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#003366]"
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
                  <label className="field-label text-gray-700">Password / Digital Token Pin</label>
                  <a href="#help" onClick={(e) => { e.preventDefault(); alert('Please contact AICTE Central IT Helpdesk at helpdesk-fdr@aicte-india.org for password recovery.'); }} className="text-xxs text-[#003366] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#003366]"
                    placeholder="Enter secure password"
                  />
                </div>
              </div>

              {/* Captcha Box */}
              <div>
                <label className="field-label text-gray-700">Security Captcha</label>
                <div className="flex items-center gap-3 mt-1">
                  <div className="bg-gray-100 border border-gray-300 px-4 py-1.5 rounded font-mono font-bold text-base tracking-widest text-[#003366] select-none line-through">
                    {captchaText}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-gray-500 hover:text-gray-800 p-1 rounded"
                    title="Refresh Captcha"
                  >
                    <RefreshCw size={15} />
                  </button>
                  <input
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    placeholder="Enter Captcha"
                    className="w-32 bg-white border border-[#CBD5E1] rounded px-2.5 py-1.5 text-xs uppercase font-mono text-center focus:outline-none focus:border-[#003366]"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="text-xxs text-red-700 bg-red-50 p-2 rounded border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-2 text-xs font-bold"
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
          <div className="lg:col-span-5 bg-[#F8FAFC] border-t lg:border-t-0 lg:border-l border-[#E2E8F0] p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xxs font-bold text-[#E65100] uppercase tracking-wider">
                <ShieldCheck size={13} />
                <span>SIH 2026 JURY EVALUATION GATEWAY</span>
              </div>

              <h3 className="font-bold text-sm text-[#003366]">
                1-Click Preset Roles for Evaluator Demo
              </h3>

              <p className="text-xxs text-gray-600 leading-relaxed">
                For the product video recording and SIH jury evaluation, click any preset below to
                instantly authenticate into that role's live workspace:
              </p>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => loginAndRedirect('INSTITUTION')}
                  className="w-full text-left p-2.5 bg-white border border-[#E2E8F0] hover:border-[#003366] rounded transition-all shadow-sm hover:shadow group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900 group-hover:text-[#003366] flex items-center gap-1.5">
                      <Building size={13} className="text-[#003366]" /> 1. Institution Nodal Officer
                    </span>
                    <span className="text-xxs bg-green-50 text-green-700 px-1.5 py-0.2 rounded font-bold">LIVE</span>
                  </div>
                  <div className="text-xxs text-gray-500 mt-0.5">
                    Dr. Anil Sharma • Pune Institute of Technology (FDR Intake, T-15 Alert)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('SCRUTINY')}
                  className="w-full text-left p-2.5 bg-white border border-[#E2E8F0] hover:border-[#003366] rounded transition-all shadow-sm hover:shadow group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900 group-hover:text-[#003366] flex items-center gap-1.5">
                      <UserCheck size={13} className="text-[#003366]" /> 2. Regional Scrutiny Officer
                    </span>
                    <span className="text-xxs bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-bold">STAR</span>
                  </div>
                  <div className="text-xxs text-gray-500 mt-0.5">
                    Ravi Shankar Prasad • WRO Desk (Triple-Source Mismatch & Case SCR-089)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('EXECUTIVE')}
                  className="w-full text-left p-2.5 bg-white border border-[#E2E8F0] hover:border-[#003366] rounded transition-all shadow-sm hover:shadow group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900 group-hover:text-[#003366] flex items-center gap-1.5">
                      <Scale size={13} className="text-[#003366]" /> 3. Fund Release Authority
                    </span>
                    <span className="text-xxs bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded font-bold">PAN-INDIA</span>
                  </div>
                  <div className="text-xxs text-gray-500 mt-0.5">
                    Dr. Krishnamurthy Iyer • Bureau Head (₹3,247 Cr Overview & Sanction Orders)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('CLEARANCE')}
                  className="w-full text-left p-2.5 bg-white border border-[#E2E8F0] hover:border-[#003366] rounded transition-all shadow-sm hover:shadow group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900 group-hover:text-[#003366] flex items-center gap-1.5">
                      <FileCheck2 size={13} className="text-[#003366]" /> 4. Clearance Cell Officer
                    </span>
                    <span className="text-xxs bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded font-bold">5 GATES</span>
                  </div>
                  <div className="text-xxs text-gray-500 mt-0.5">
                    Meena Agarwal • Internal Clearance Hub (Hold Resolutions & Penalty Assessment)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAndRedirect('AUDIT_ADMIN')}
                  className="w-full text-left p-2.5 bg-white border border-[#E2E8F0] hover:border-[#003366] rounded transition-all shadow-sm hover:shadow group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900 group-hover:text-[#003366] flex items-center gap-1.5">
                      <Lock size={13} className="text-[#003366]" /> 5. System Auditor & Admin
                    </span>
                    <span className="text-xxs bg-gray-100 text-gray-800 px-1.5 py-0.2 rounded font-bold">SHA-256</span>
                  </div>
                  <div className="text-xxs text-gray-500 mt-0.5">
                    K.R. Narayanan • Audit Desk (891 Events Cryptographic Integrity Check)
                  </div>
                </button>
              </div>
            </div>

            <div className="text-xxs text-gray-500 border-t border-gray-200 pt-3">
              🔒 Built with DPDP Act 2023 compliance & ephemeral token isolation.
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
