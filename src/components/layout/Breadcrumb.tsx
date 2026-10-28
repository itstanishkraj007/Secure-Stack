import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const routeLabels: Record<string, string> = {
  institution: 'Institution Portal',
  dashboard: 'Dashboard',
  submit: 'Submit FDR Instrument',
  scrutiny: 'Scrutiny Cell',
  queue: 'Exception Queue',
  cases: 'Case Review',
  lifecycle: 'Lifecycle Watchdog',
  clearance: 'Clearance & Settlement Hub',
  executive: 'Executive Command Center',
  audit: 'Tamper-Evident Audit Ledger',
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="bg-white border-b border-[#E2D9C8] px-5 py-2 flex items-center justify-between text-xs text-gray-600 flex-shrink-0">
      <div className="flex items-center gap-1.5 overflow-hidden">
        <Link to="/" className="text-gray-400 hover:text-[#7B1D1D] flex items-center gap-1">
          <Home size={13} />
          <span className="hidden sm:inline">Home</span>
        </Link>

        {pathnames.map((segment, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = routeLabels[segment] || segment;

          return (
            <div key={to} className="flex items-center gap-1.5 truncate">
              <ChevronRight size={12} className="text-gray-400 flex-shrink-0" />
              {isLast ? (
                <span className="font-semibold text-gray-900 truncate">{label}</span>
              ) : (
                <Link to={to} className="text-gray-500 hover:text-[#7B1D1D] truncate">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-2 text-xxs font-mono text-gray-500 bg-gray-50 border border-[#E2D9C8] px-2 py-0.5 rounded">
        <span>MODE:</span>
        <strong className="text-blue-700">SANDBOX_MOCK (DETERMINISTIC)</strong>
      </div>
    </div>
  );
}
