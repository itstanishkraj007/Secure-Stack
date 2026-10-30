import { Info } from 'lucide-react';

interface MockLabelProps {
  text?: string;
  className?: string;
}

export default function MockLabel({
  text = 'SIMULATED DATA — Demonstrative mock adapter response for Smart India Hackathon 2026',
  className = '',
}: MockLabelProps) {
  return (
    <div
      className={`flex items-center gap-2.5 bg-sky-50/70 border border-sky-200/80 text-sky-800 text-xs px-3.5 py-2 rounded-xl font-medium shadow-2xs ${className}`}
    >
      <div className="w-5 h-5 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0 text-sky-700">
        <Info size={13} />
      </div>
      <span className="leading-snug">{text}</span>
      <span className="ml-auto text-[10px] font-mono font-bold bg-white/80 px-2 py-0.5 rounded-md border border-sky-200 text-sky-700 uppercase tracking-wider">
        SANDBOX
      </span>
    </div>
  );
}
