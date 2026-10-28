import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LogIn,
  PhoneCall,
  Globe2,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { NationalEmblem, AicteEmblem, DigitalIndiaBadge } from '../common/AicteLogo';

export default function PublicHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'small'>('normal');

  return (
    <header className="w-full flex-shrink-0 z-40 bg-white shadow-sm border-b border-[#E2E8F0]">
      {/* 1. Indian Tricolor Stripe */}
      <div className="flex h-[3.5px] w-full">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* 2. Official GoI Accessibility & Top Utility Strip */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 sm:px-8 py-1 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">भारत सरकार</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-700">Government of India</span>
            <span className="text-gray-300 hidden md:inline">|</span>
            <span className="text-gray-600 hidden md:inline">शिक्षा मंत्रालय • Ministry of Education</span>
          </div>

          <div className="flex items-center gap-3 text-xxs text-gray-600">
            <a
              href="#main-content"
              className="text-gray-500 hover:text-[#003366] hidden sm:inline"
            >
              Skip to Main Content
            </a>
            <span className="text-gray-300 hidden sm:inline">•</span>

            <div className="hidden sm:flex items-center gap-1 border-r border-gray-300 pr-3">
              <span className="text-gray-500">Text Size:</span>
              <button
                type="button"
                onClick={() => setFontSize('small')}
                className={`px-1 py-0.2 border border-gray-300 rounded ${fontSize === 'small' ? 'bg-[#003366] text-white font-bold' : 'bg-white hover:bg-gray-100'}`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-1 py-0.2 border border-gray-300 rounded ${fontSize === 'normal' ? 'bg-[#003366] text-white font-bold' : 'bg-white hover:bg-gray-100'}`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-1 py-0.2 border border-gray-300 rounded ${fontSize === 'large' ? 'bg-[#003366] text-white font-bold' : 'bg-white hover:bg-gray-100'}`}
              >
                A+
              </button>
            </div>

            <div className="flex items-center gap-1 text-gray-700 font-semibold cursor-pointer">
              <Globe2 size={12} className="text-[#003366]" />
              <span>English / हिंदी</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official AICTE White Branding Banner */}
      <div className="bg-white px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Official Logos & Bilingual Typography */}
          <Link to="/" className="flex items-center gap-3.5 hover:opacity-95 transition-opacity">
            {/* National Ashoka Emblem */}
            <NationalEmblem className="h-13 sm:h-15 w-auto flex-shrink-0" />

            <div className="h-10 w-px bg-gray-200 hidden sm:block" />

            {/* AICTE Official Diya Logo */}
            <AicteEmblem className="h-13 sm:h-15 w-auto flex-shrink-0" />

            {/* Official Titles */}
            <div className="text-left">
              <div className="text-[#003366] text-xs sm:text-sm font-semibold tracking-wide leading-tight">
                अखिल भारतीय तकनीकी शिक्षा परिषद
              </div>
              <div className="text-[#003366] text-base sm:text-xl font-extrabold tracking-tight leading-tight uppercase font-sans">
                All India Council for Technical Education
              </div>
              <div className="text-gray-600 text-[10px] sm:text-xs font-medium leading-none mt-0.5">
                (वैधानिक निकाय, भारत सरकार) • (A Statutory Body of the Govt. of India) • Ministry of Education
              </div>
            </div>
          </Link>

          {/* Right Campaign Badges */}
          <div className="hidden lg:flex items-center gap-4">
            <DigitalIndiaBadge />

            <div className="h-8 w-px bg-gray-200" />

            <div className="flex flex-col text-right text-xxs">
              <span className="font-bold text-[#003366] flex items-center justify-end gap-1">
                <PhoneCall size={11} className="text-[#E65100]" />
                SDMS Helpline: 011-29581000
              </span>
              <span className="text-gray-500 font-mono">fdr-support@aicte-india.org</span>
              <span className="text-gray-400">Nelson Mandela Marg, New Delhi</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AICTE Signature Deep Royal Navy Navigation Bar */}
      <div className="bg-[#003366] px-4 sm:px-8 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-11">
          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <Link
              to="/"
              className={`px-3 py-2 transition-all relative ${
                location.pathname === '/'
                  ? 'text-white bg-[#002244] border-b-2 border-[#FF8A00]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Portal Home
            </Link>

            <Link
              to="/features"
              className={`px-3 py-2 transition-all relative ${
                location.pathname === '/features'
                  ? 'text-white bg-[#002244] border-b-2 border-[#FF8A00]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
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
              className="px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
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
              className="px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
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
              className="px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              FAQ & Helpdesk
            </a>
          </nav>

          {/* Saffron CTA Button: SDMS Portal Sign In */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn-gold text-xs font-bold px-3.5 py-1.5 rounded shadow flex items-center gap-1.5"
            >
              <LogIn size={13} />
              <span>SDMS Portal Sign In</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/10 space-y-1 text-xs">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-white hover:bg-white/10 font-medium"
            >
              Portal Home
            </Link>
            <Link
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-white hover:bg-white/10 font-medium"
            >
              Key Architecture & Features
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-[#FF9933] font-bold hover:bg-white/10"
            >
              SDMS Portal Sign In →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
