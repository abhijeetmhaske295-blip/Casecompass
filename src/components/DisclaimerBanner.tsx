import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DisclaimerBannerProps {
  isDark: boolean;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ isDark, className = '' }) => {
  return (
    <div
      role="region"
      aria-label="Statutory Legal Disclaimer"
      className={`w-full py-2 px-3 border-b text-center flex items-center justify-center gap-2 select-none transition-colors ${
        isDark
          ? 'bg-black border-neutral-800 text-neutral-400'
          : 'bg-neutral-100 border-neutral-300 text-neutral-700'
      } ${className}`}
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0 opacity-70" />
      <span className="text-[11px] leading-tight font-medium tracking-tight">
        <strong>Statutory Notice:</strong> CaseCompass organizes provided records only. This tool does not offer legal advice or predict legal outcomes.
      </span>
    </div>
  );
};
