import { Bell, LogOut, ChevronDown, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPersona } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { AicteEmblem } from '../common/AicteLogo';

interface GovHeaderProps {
  user: UserPersona;
}

export default function GovHeader({ user }: GovHeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex-shrink-0 z-30 shadow-md">
      {/* 1. Indian Tricolor Stripe */}
      <div className="flex h-[3.5px] w-full">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* 2. Top Government of India Strip */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-1 flex items-center justify-between text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">भारत सरकार</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-700">Government of India</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-600 hidden sm:inline">शिक्षा मंत्रालय • Ministry of Education</span>
        </div>
        <div className="flex items-center gap-3 text-xxs text-gray-500">
          <Link to="/" className="text-gray-600 hover:text-[#003366] flex items-center gap-1 font-semibold">
            <Home size={11} />
            <span>Public Home</span>
          </Link>
          <span className="text-gray-300">•</span>
          <span>EMP ID: <strong className="text-gray-800">{user.employeeId}</strong></span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="hidden sm:inline">28 OCT 2024, 21:32 IST</span>
        </div>
      </div>

      {/* 3. Main AICTE Royal Navy Bar */}
      <div className="bg-[#003366] px-4 py-2.5 flex items-center justify-between text-white">
        <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
          {/* AICTE Official Logo */}
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

        {/* Right Session Controls */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            className="relative p-1 text-white/80 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell size={16} />
            <span className="absolute 0 top-0 right-0 bg-[#E65100] text-white text-xxs w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          <div className="h-5 w-px bg-white/20" />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded-full bg-[#E65100] flex items-center justify-center text-white text-xxs font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs font-semibold leading-tight">{user.name}</div>
              <div className="text-xxs text-white/70 leading-none">{user.designation}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-white/80 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded transition-colors ml-1 flex items-center gap-1.5 text-xs font-semibold border border-white/20"
            title="Sign Out / Exit Workspace"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
