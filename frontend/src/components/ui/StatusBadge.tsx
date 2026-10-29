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
  PASS: { label: 'PASS', className: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500' },
  FAIL: { label: 'FAIL', className: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-500' },
  INCONCLUSIVE: { label: 'INCONCLUSIVE', className: 'bg-purple-50 text-purple-700 border border-purple-200', dot: 'bg-purple-500' },
  UNKNOWN: { label: 'UNKNOWN', className: 'bg-gray-100 text-gray-600 border border-gray-300', dot: 'bg-gray-400' },
  NOT_CHECKED: { label: 'NOT CHECKED', className: 'bg-gray-50 text-gray-400 border border-gray-200', dot: 'bg-gray-300' },
  NOT_APPLICABLE: { label: 'N/A', className: 'bg-gray-50 text-gray-400 border border-gray-200', dot: 'bg-gray-300' },
  ERROR: { label: 'ERROR', className: 'bg-red-50 text-red-800 border border-red-300', dot: 'bg-red-700' },
  HEURISTIC: { label: 'HEURISTIC', className: 'bg-orange-50 text-orange-700 border border-orange-200', dot: 'bg-orange-400' },
  CLEARED: { label: 'CLEARED', className: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500' },
  PENDING: { label: 'PENDING', className: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
  ON_HOLD: { label: 'ON HOLD', className: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-500' },
  NOT_STARTED: { label: 'NOT STARTED', className: 'bg-gray-50 text-gray-400 border border-gray-200', dot: 'bg-gray-300' },
  REJECTED: { label: 'REJECTED', className: 'bg-red-100 text-red-800 border border-red-300', dot: 'bg-red-700' },
  ACTIVE: { label: 'ACTIVE', className: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500' },
  EXPIRING_SOON: { label: 'EXPIRING SOON', className: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
  UNDER_SCRUTINY: { label: 'UNDER SCRUTINY', className: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500' },
  MATURED: { label: 'MATURED', className: 'bg-orange-50 text-orange-700 border border-orange-200', dot: 'bg-orange-500' },
  RELEASED: { label: 'RELEASED', className: 'bg-gray-100 text-gray-600 border border-gray-300', dot: 'bg-gray-500' },
  DRAFT: { label: 'DRAFT', className: 'bg-gray-50 text-gray-400 border border-gray-200', dot: 'bg-gray-300' },
  SUBMITTED: { label: 'SUBMITTED', className: 'bg-blue-50 text-blue-600 border border-blue-200', dot: 'bg-blue-400' },
  BLOCKED: { label: 'BLOCKED', className: 'bg-red-100 text-red-800 border border-red-300', dot: 'bg-red-700' },
  MOCK: { label: 'SIMULATED', className: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500' },
  OPEN: { label: 'OPEN', className: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500' },
  IN_PROGRESS: { label: 'IN PROGRESS', className: 'bg-purple-50 text-purple-700 border border-purple-200', dot: 'bg-purple-500' },
  RESOLVED: { label: 'RESOLVED', className: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500' },
  MAJOR: { label: 'MAJOR', className: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-500' },
  MEDIUM: { label: 'MEDIUM', className: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
  LOW: { label: 'LOW', className: 'bg-gray-50 text-gray-600 border border-gray-200', dot: 'bg-gray-400' },
  CRITICAL: { label: 'CRITICAL', className: 'bg-red-100 text-red-800 border border-red-300', dot: 'bg-red-700' },
  INFO: { label: 'INFO', className: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500' },
  CANDIDATE: { label: 'CANDIDATE/VERIFY', className: 'bg-orange-50 text-orange-700 border border-orange-200', dot: 'bg-orange-400' },
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const c = config[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-600 border border-gray-200',
    dot: 'bg-gray-400',
  };

  const pad = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-xxs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider whitespace-nowrap ${pad} ${c.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}
