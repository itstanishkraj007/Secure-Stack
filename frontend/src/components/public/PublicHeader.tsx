import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LogIn,
  PhoneCall,
  Globe2,
  Menu,
  X,
  ExternalLink,
  Shield,
  Sparkles,
} from 'lucide-react';
import { NationalEmblem, AicteEmblem, DigitalIndiaBadge } from '../common/AicteLogo';

export default function PublicHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'small'>('normal');

  return (
    <header className="w-full flex-shrink-0 z-40 bg-white shadow-xs border-b border-slate-200/80">
      {/* 1. Indian Tricolor Stripe */}
      <div className="flex h-[3px] w-full">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* 2. Official GoI Accessibility & Top Utility Strip */}
      <div className="bg-[#FAF8F5] border-b border-slate-200/60 px-5 sm:px-8 py-1 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-slate-900">भारत सरकार</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700">Government of India</span>
            <span className="text-slate-300 hidden md:inline">|</span>
            <span className="text-slate-600 hidden md:inline">शिक्षा मंत्रालय • Ministry of Education</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <a
              href="#main-content"
              className="text-slate-500 hover:text-emerald-700 hidden sm:inline transition-colors"
            >
              Skip to Main Content
            </a>
            <span className="text-slate-300 hidden sm:inline">•</span>

            <div className="hidden sm:flex items-center gap-1 border-r border-slate-200 pr-3">
              <span className="text-slate-500 text-[11px]">Text Size:</span>
              <button
                type="button"
                onClick={() => setFontSize('small')}
                className={`px-1.5 py-0.2 border border-slate-200 rounded text-[11px] font-mono ${
                  fontSize === 'small' ? 'bg-[#10B981] text-white font-bold' : 'bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.2 border border-slate-200 rounded text-[11px] font-mono ${
                  fontSize === 'normal' ? 'bg-[#10B981] text-white font-bold' : 'bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.2 border border-slate-200 rounded text-[11px] font-mono ${
                  fontSize === 'large' ? 'bg-[#10B981] text-white font-bold' : 'bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                A+
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700 font-semibold cursor-pointer hover:text-emerald-700 transition-colors">
              <Globe2 size={13} className="text-[#10B981]" />
              <span>English / हिंदी</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official AICTE White Branding Banner */}
      <div className="bg-white px-5 sm:px-8 py-3.5 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Official Logos & Bilingual Typography */}
          <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
            <NationalEmblem className="h-12 sm:h-14 w-auto flex-shrink-0" />
            <div className="h-10 w-px bg-slate-200 hidden sm:block" />
            <AicteEmblem className="h-12 sm:h-14 w-auto flex-shrink-0" />

            <div className="text-left">
              <div className="text-slate-600 text-xs sm:text-sm font-semibold tracking-wide leading-tight">
                अखिल भारतीय तकनीकी शिक्षा परिषद
              </div>
              <div className="text-slate-900 text-base sm:text-lg font-extrabold tracking-tight leading-tight uppercase font-sans">
                All India Council for Technical Education
              </div>
              <div className="text-slate-500 text-[11px] sm:text-xs font-medium leading-none mt-1">
                (वैधानिक निकाय, भारत सरकार) • (A Statutory Body of the Govt. of India) • Ministry of Education
              </div>
            </div>
          </Link>

          {/* Right Badges */}
          <div className="hidden lg:flex items-center gap-4">
            <DigitalIndiaBadge />
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex flex-col text-right text-xs">
              <span className="font-bold text-slate-900 flex items-center justify-end gap-1.5">
                <PhoneCall size={12} className="text-[#10B981]" />
                SDMS Helpline: 011-29581000
              </span>
              <span className="text-slate-500 font-mono text-[11px]">fdr-support@aicte-india.org</span>
              <span className="text-slate-400 text-[10px]">Nelson Mandela Marg, New Delhi</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Modern White-Dominant Navigation Bar with Mint Accents */}
      <div className="bg-white px-5 sm:px-8 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-13">
          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                location.pathname === '/'
                  ? 'text-emerald-900 bg-emerald-50 font-bold border border-emerald-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Portal Home
            </Link>

            <Link
              to="/features"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                location.pathname === '/features'
                  ? 'text-emerald-900 bg-emerald-50 font-bold border border-emerald-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Key Architecture & Features
            </Link>

            <a
              href="#regulations"
              onClick={(e) => {
                if (location.pathname !== '/') return;
                e.preventDefault();
                document.getElementById('regulations')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              APH Rules & FDR Mandates
            </a>

            <a
              href="#circulars"
              onClick={(e) => {
                if (location.pathname !== '/') return;
                e.preventDefault();
                document.getElementById('circulars')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Circulars & Guidelines
            </a>

            <a
              href="#faq"
              onClick={(e) => {
                if (location.pathname !== '/') return;
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              FAQ & Helpdesk
            </a>
          </nav>

          {/* Mint Green CTA Button: SDMS Portal Sign In */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="btn-primary text-xs font-bold px-4 py-2 flex items-center gap-1.5"
            >
              <LogIn size={14} />
              <span>SDMS Portal Sign In</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1.5 text-xs">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2 rounded-xl text-slate-800 hover:bg-slate-50 font-medium"
            >
              Portal Home
            </Link>
            <Link
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2 rounded-xl text-slate-800 hover:bg-slate-50 font-medium"
            >
              Key Architecture & Features
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2 rounded-xl text-emerald-700 font-bold hover:bg-emerald-50"
            >
              SDMS Portal Sign In →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
