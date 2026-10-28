import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  LogIn,
  ExternalLink,
  PhoneCall,
  Globe2,
  FileText,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';

export default function PublicHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'small'>('normal');

  return (
    <header className="w-full flex-shrink-0 z-40 shadow-md">
      {/* 1. Indian Tricolor Stripe */}
      <div className="flex h-[3px]">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* 2. Government Accessibility & Official Top Strip */}
      <div className="bg-[#FAF8F5] border-b border-[#E2D9C8] px-4 sm:px-8 py-1 flex items-center justify-between text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">भारत सरकार</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-700">Government of India</span>
          <span className="text-gray-300 hidden md:inline">|</span>
          <span className="text-gray-500 hidden md:inline">शिक्षा मंत्रालय • Ministry of Education</span>
        </div>

        <div className="flex items-center gap-3 text-xxs text-gray-600">
          <div className="hidden sm:flex items-center gap-1.5 border-r border-gray-300 pr-3">
            <span className="text-gray-500">Font:</span>
            <button
              type="button"
              onClick={() => setFontSize('small')}
              className={`px-1 py-0.2 border rounded ${fontSize === 'small' ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200'}`}
              title="Small text"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`px-1 py-0.2 border rounded ${fontSize === 'normal' ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200'}`}
              title="Standard text"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`px-1 py-0.2 border rounded ${fontSize === 'large' ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200'}`}
              title="Large text"
            >
              A+
            </button>
          </div>

          <div className="flex items-center gap-1 text-gray-700 font-medium">
            <Globe2 size={11} className="text-[#B7791F]" />
            <span>English / हिंदी</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 border-l border-gray-300 pl-3 text-gray-600">
            <PhoneCall size={11} className="text-[#7B1D1D]" />
            <span>Toll Free: 1800-11-2026</span>
          </div>
        </div>
      </div>

      {/* 3. Main Government Branding Banner */}
      <div className="bg-[#7B1D1D] px-4 sm:px-8 py-3 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* National AICTE Seal Mock */}
            <div className="w-11 h-11 rounded-full bg-white/10 border-2 border-[#D4A017] flex items-center justify-center flex-shrink-0 shadow-inner">
              <ShieldCheck size={26} className="text-[#D4A017]" />
            </div>

            <div>
              <div className="text-white/80 text-xxs font-medium tracking-wide uppercase leading-none mb-1">
                अखिल भारतीय तकनीकी शिक्षा परिषद • All India Council for Technical Education
              </div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight flex items-baseline gap-2">
                <span>सुरक्षा जमा एवं सावधि जमा पोर्टल</span>
                <span className="text-[#D4A017] font-serif text-sm font-normal hidden sm:inline">• Secure Stack SDMS</span>
              </div>
              <div className="text-white/70 text-xxs font-sans">
                Statutory Security Deposit & FDR Management Portal • Regulation & Approval Bureau
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-right">
            <div className="bg-[#5A1515] border border-white/15 px-3 py-1.5 rounded">
              <div className="text-xxs font-semibold text-[#D4A017] uppercase tracking-wider">National Helpdesk</div>
              <div className="text-xs font-mono font-bold text-white">helpdesk-fdr@aicte-india.org</div>
              <div className="text-xxs text-white/60">Mon-Fri: 09:30 - 18:00 IST</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Public Navigation Bar */}
      <div className="bg-white border-b border-[#E2D9C8] px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-11">
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-gray-700">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded transition-colors ${
                location.pathname === '/'
                  ? 'bg-[#7B1D1D] text-white font-semibold'
                  : 'hover:bg-gray-100 hover:text-[#7B1D1D]'
              }`}
            >
              Portal Home
            </Link>

            <Link
              to="/features"
              className={`px-3 py-1.5 rounded transition-colors ${
                location.pathname === '/features'
                  ? 'bg-[#7B1D1D] text-white font-semibold'
                  : 'hover:bg-gray-100 hover:text-[#7B1D1D]'
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
              className="px-3 py-1.5 rounded hover:bg-gray-100 hover:text-[#7B1D1D] transition-colors"
            >
              APH Rules & Regulations
            </a>

            <a
              href="#circulars"
              onClick={(e) => {
                if (location.pathname !== '/') return;
                e.preventDefault();
                document.getElementById('circulars')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded hover:bg-gray-100 hover:text-[#7B1D1D] transition-colors"
            >
              Official Circulars
            </a>

            <a
              href="#faq"
              onClick={(e) => {
                if (location.pathname !== '/') return;
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded hover:bg-gray-100 hover:text-[#7B1D1D] transition-colors"
            >
              FAQ & Guidelines
            </a>
          </nav>

          {/* Login Button */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn-gold text-xs font-semibold px-4 py-1.5 rounded shadow-sm flex items-center gap-1.5"
            >
              <LogIn size={14} />
              <span>Official Portal Sign In</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#E2D9C8] space-y-1 text-xs">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-gray-800 hover:bg-gray-100 font-medium"
            >
              Portal Home
            </Link>
            <Link
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-gray-800 hover:bg-gray-100 font-medium"
            >
              Key Architecture & Features
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-[#7B1D1D] font-bold hover:bg-[#FEF2F2]"
            >
              Official Portal Sign In →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
