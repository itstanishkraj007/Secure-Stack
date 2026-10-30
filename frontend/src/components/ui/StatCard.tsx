import { ReactNode } from 'react';
import { MoreVertical, Info, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: ReactNode;
  trend?: string;
  trendColor?: 'green' | 'amber' | 'red' | 'gray' | 'blue' | 'mint';
  borderAccent?: string;
}

export default function StatCard({
  label,
  value,
  sublabel,
  icon,
  trend,
  trendColor = 'green',
}: StatCardProps) {
  const isUp = trendColor === 'green' || trendColor === 'mint' || trendColor === 'blue';
  const isDown = trendColor === 'red';

  const trendBadgeClass = {
    green: 'text-emerald-700 bg-emerald-50 border border-emerald-200/80',
    mint: 'text-emerald-700 bg-emerald-50 border border-emerald-200/80',
    blue: 'text-blue-700 bg-blue-50 border border-blue-200/80',
    amber: 'text-amber-700 bg-amber-50 border border-amber-200/80',
    red: 'text-rose-700 bg-rose-50 border border-rose-200/80',
    gray: 'text-slate-600 bg-slate-100 border border-slate-200',
  }[trendColor];

  return (
    <div className="card p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200 group">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 tracking-tight">{label}</span>
          <Info size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors cursor-pointer" />
        </div>
        <div className="flex items-center gap-1">
          {icon && <div className="text-slate-400 p-1 rounded-lg bg-slate-50 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">{icon}</div>}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors" title="Options">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      {/* Main Metric & Trend */}
      <div className="my-3 flex items-baseline justify-between gap-2">
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
          {value}
        </div>
        {trend && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${trendBadgeClass}`}>
            {isUp && <TrendingUp size={11} className="text-emerald-600" />}
            {isDown && <TrendingDown size={11} className="text-rose-600" />}
            <span>{trend}</span>
          </span>
        )}
      </div>

      {/* Footer Sublabel with subtle divider */}
      {sublabel && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="truncate">{sublabel}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 flex-shrink-0" />
        </div>
      )}
    </div>
  );
}
