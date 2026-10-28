import { Bell, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';
import { UserPersona } from '../../types';

interface GovHeaderProps {
  user: UserPersona;
}

export default function GovHeader({ user }: GovHeaderProps) {
  return (
    <header className="flex-shrink-0 z-30 shadow-sm">
      {/* Indian Tricolor stripe */}
      <div className="flex h-[3px]">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* Government of India top strip */}
      <div className="bg-white border-b border-[#E2D9C8] px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">भारत सरकार</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">Government of India</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 font-medium">शिक्षा मंत्रालय • Ministry of Education</span>
        </div>
        <div className="flex items-center gap-3 text-xxs text-gray-500">
          <span>PORTAL: <strong>AICTE-SDMS-PROD-26</strong></span>
          <span className="text-gray-300">•</span>
          <span>EMP ID: <strong className="text-gray-700">{user.employeeId}</strong></span>
          <span className="text-gray-300">•</span>
          <span>DATE: <strong>28 OCT 2024, 19:43 IST</strong></span>
        </div>
      </div>

      {/* Main AICTE maroon bar */}
      <div className="bg-[#7B1D1D] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Emblem seal circle */}
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white font-bold text-xxs tracking-tighter">
            <ShieldCheck size={20} className="text-[#D4A017]" />
          </div>

          <div>
            <div className="text-white/70 text-xxs leading-none mb-0.5">अखिल भारतीय तकनीकी शिक्षा परिषद</div>
            <div className="text-white text-sm font-bold tracking-tight leading-tight">
              All India Council for Technical Education
            </div>
          </div>

          <div className="h-6 w-px bg-white/20 mx-2 hidden sm:block" />

          <div className="hidden sm:block">
            <div className="text-[#D4A017] text-xs font-bold leading-tight">
              Security Deposit & FDR Management Portal (SDMS)
            </div>
            <div className="text-white/60 text-xxs font-mono">
              SIH-2026 Problem ID: 26265 • Team Secure Stack
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <button
            type="button"
            className="relative p-1 text-white/80 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell size={16} />
            <span className="absolute 0 top-0 right-0 bg-[#B91C1C] text-white text-xxs w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          <div className="h-5 w-px bg-white/20" />

          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded-full bg-[#B7791F] flex items-center justify-center text-white text-xxs font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs font-semibold leading-tight">{user.name}</div>
              <div className="text-xxs text-white/70 leading-none">{user.designation}</div>
            </div>
            <ChevronDown size={12} className="text-white/60" />
          </div>

          <button
            type="button"
            className="text-white/60 hover:text-white transition-colors ml-1"
            title="Session Logout"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
