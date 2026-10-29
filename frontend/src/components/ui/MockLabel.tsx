import { AlertCircle } from 'lucide-react';

interface MockLabelProps {
  text?: string;
  className?: string;
}

export default function MockLabel({ text = 'SIMULATED DATA — Demonstrative mock adapter response', className = '' }: MockLabelProps) {
  return (
    <div className={`flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1.5 rounded font-medium ${className}`}>
      <AlertCircle size={14} className="flex-shrink-0 text-blue-600" />
      <span>{text}</span>
    </div>
  );
}
