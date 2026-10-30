export type StatusType =
  | 'PASS'
  | 'FAIL'
  | 'INCONCLUSIVE'
  | 'UNKNOWN'
  | 'NOT_CHECKED'
  | 'NOT_APPLICABLE'
  | 'ERROR'
  | 'HEURISTIC'
  | 'CLEARED'
  | 'PENDING'
  | 'ON_HOLD'
  | 'NOT_STARTED'
  | 'REJECTED'
  | 'ACTIVE'
  | 'EXPIRING_SOON'
  | 'UNDER_SCRUTINY'
  | 'MATURED'
  | 'RELEASED'
  | 'DRAFT'
  | 'SUBMITTED'
  | 'BLOCKED'
  | 'MOCK'
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'MAJOR'
  | 'MEDIUM'
  | 'LOW'
  | 'CRITICAL'
  | 'INFO'
  | 'CANDIDATE';

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
}

const config: Record<string, { label: string; className: string; dot: string }> = {
  // Positive / Mint Green Themes
  PASS: { label: 'PASS', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80', dot: 'bg-emerald-500' },
  CLEARED: { label: 'CLEARED', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80', dot: 'bg-emerald-500' },
  ACTIVE: { label: 'ACTIVE', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80', dot: 'bg-emerald-500' },
  RESOLVED: { label: 'RESOLVED', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80', dot: 'bg-emerald-500' },
  INFO: { label: 'INFO', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80', dot: 'bg-emerald-500' },

  // Warnings / Amber Themes
  PENDING: { label: 'PENDING', className: 'bg-amber-50 text-amber-700 border border-amber-200/80', dot: 'bg-amber-500' },
  EXPIRING_SOON: { label: 'EXPIRING SOON', className: 'bg-amber-50 text-amber-700 border border-amber-200/80', dot: 'bg-amber-500' },
  MEDIUM: { label: 'MEDIUM', className: 'bg-amber-50 text-amber-700 border border-amber-200/80', dot: 'bg-amber-500' },
  HEURISTIC: { label: 'HEURISTIC', className: 'bg-amber-50 text-amber-700 border border-amber-200/80', dot: 'bg-amber-500' },
  CANDIDATE: { label: 'CANDIDATE', className: 'bg-amber-50 text-amber-700 border border-amber-200/80', dot: 'bg-amber-500' },
  MATURED: { label: 'MATURED', className: 'bg-amber-50 text-amber-800 border border-amber-200/80', dot: 'bg-amber-600' },

  // Critical / Rose Themes
  FAIL: { label: 'FAIL', className: 'bg-rose-50 text-rose-700 border border-rose-200/80', dot: 'bg-rose-500' },
  ON_HOLD: { label: 'ON HOLD', className: 'bg-rose-50 text-rose-700 border border-rose-200/80', dot: 'bg-rose-500' },
  REJECTED: { label: 'REJECTED', className: 'bg-rose-50 text-rose-700 border border-rose-200/80', dot: 'bg-rose-500' },
  BLOCKED: { label: 'BLOCKED', className: 'bg-rose-50 text-rose-700 border border-rose-200/80', dot: 'bg-rose-500' },
  ERROR: { label: 'ERROR', className: 'bg-rose-50 text-rose-800 border border-rose-300', dot: 'bg-rose-600' },
  CRITICAL: { label: 'CRITICAL', className: 'bg-rose-50 text-rose-800 border border-rose-300', dot: 'bg-rose-600' },
  MAJOR: { label: 'MAJOR', className: 'bg-rose-50 text-rose-700 border border-rose-200/80', dot: 'bg-rose-500' },

  // Informational / Cyan & Slate Themes
  UNDER_SCRUTINY: { label: 'UNDER SCRUTINY', className: 'bg-teal-50 text-teal-700 border border-teal-200/80', dot: 'bg-teal-500' },
  OPEN: { label: 'OPEN', className: 'bg-teal-50 text-teal-700 border border-teal-200/80', dot: 'bg-teal-500' },
  IN_PROGRESS: { label: 'IN PROGRESS', className: 'bg-purple-50 text-purple-700 border border-purple-200/80', dot: 'bg-purple-500' },
  INCONCLUSIVE: { label: 'INCONCLUSIVE', className: 'bg-purple-50 text-purple-700 border border-purple-200/80', dot: 'bg-purple-500' },
  SUBMITTED: { label: 'SUBMITTED', className: 'bg-sky-50 text-sky-700 border border-sky-200/80', dot: 'bg-sky-500' },
  MOCK: { label: 'SIMULATED', className: 'bg-sky-50 text-sky-700 border border-sky-200/80', dot: 'bg-sky-500' },
  LOW: { label: 'LOW', className: 'bg-slate-100 text-slate-600 border border-slate-200/80', dot: 'bg-slate-400' },
  UNKNOWN: { label: 'UNKNOWN', className: 'bg-slate-100 text-slate-600 border border-slate-200/80', dot: 'bg-slate-400' },
  NOT_CHECKED: { label: 'NOT CHECKED', className: 'bg-slate-50 text-slate-400 border border-slate-200/80', dot: 'bg-slate-300' },
  NOT_APPLICABLE: { label: 'N/A', className: 'bg-slate-50 text-slate-400 border border-slate-200/80', dot: 'bg-slate-300' },
  NOT_STARTED: { label: 'NOT STARTED', className: 'bg-slate-50 text-slate-400 border border-slate-200/80', dot: 'bg-slate-300' },
  RELEASED: { label: 'RELEASED', className: 'bg-slate-100 text-slate-600 border border-slate-200/80', dot: 'bg-slate-400' },
  DRAFT: { label: 'DRAFT', className: 'bg-slate-100 text-slate-500 border border-slate-200/80', dot: 'bg-slate-400' },
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const c = config[status] || {
    label: status,
    className: 'bg-slate-100 text-slate-600 border border-slate-200',
    dot: 'bg-slate-400',
  };

  const pad = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide whitespace-nowrap shadow-2xs transition-colors ${pad} ${c.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${c.dot}`} />
      {c.label}
    </span>
  );
}
