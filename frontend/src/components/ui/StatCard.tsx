import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: ReactNode;
  trend?: string;
  trendColor?: 'green' | 'amber' | 'red' | 'gray';
  borderAccent?: string;
}

export default function StatCard({
  label,
  value,
  sublabel,
  icon,
  trend,
  trendColor = 'gray',
  borderAccent,
}: StatCardProps) {
  const trendClass = {
    green: 'text-green-700 bg-green-50',
    amber: 'text-amber-700 bg-amber-50',
    red: 'text-red-700 bg-red-50',
    gray: 'text-gray-600 bg-gray-50',
  }[trendColor];

  return (
    <div
      className="card p-3.5 flex flex-col justify-between"
      style={{ borderLeftWidth: borderAccent ? '3px' : '1px', borderLeftColor: borderAccent }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="field-label text-gray-500">{label}</span>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="my-1.5 flex items-baseline justify-between gap-2">
        <div className="text-xl font-bold text-gray-900 tracking-tight">{value}</div>
        {trend && (
          <span className={`text-xxs font-semibold px-1.5 py-0.5 rounded ${trendClass}`}>
            {trend}
          </span>
        )}
      </div>

      {sublabel && <div className="text-xxs text-gray-500 font-medium">{sublabel}</div>}
    </div>
  );
}
