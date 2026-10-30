import { ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const routeLabels: Record<string, string> = {
  institution: 'Institution Portal',
  dashboard: 'Portfolio Overview',
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
    <div className="bg-white border-b border-slate-200/60 px-6 py-2.5 flex items-center justify-between text-xs text-slate-600 flex-shrink-0">
      <div className="flex items-center gap-1.5 overflow-hidden">
        <Link
          to="/"
          className="text-slate-400 hover:text-emerald-700 flex items-center gap-1 transition-colors"
        >
          <Home size={14} />
          <span className="hidden sm:inline font-medium">Home</span>
        </Link>

        {pathnames.map((segment, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = routeLabels[segment] || segment;

          return (
            <div key={to} className="flex items-center gap-1.5 truncate">
              <ChevronRight size={13} className="text-slate-300 flex-shrink-0" />
              {isLast ? (
                <span className="font-semibold text-slate-900 truncate">{label}</span>
              ) : (
                <Link
                  to={to}
                  className="text-slate-500 hover:text-emerald-700 font-medium truncate transition-colors"
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-slate-400">ENVIRONMENT:</span>
        <strong className="text-emerald-700 font-semibold">SANDBOX_AICTE_MOCK</strong>
      </div>
    </div>
  );
}
