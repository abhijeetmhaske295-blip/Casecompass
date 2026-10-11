import React from 'react';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function ReviewStatusBadge({ status = 'pending', onChange }) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: CheckCircle2,
          text: 'Verified',
          badgeClasses:
            'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      case 'flagged':
        return {
          icon: AlertTriangle,
          text: 'Flagged Discrepancy',
          badgeClasses:
            'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      default:
        return {
          icon: Clock,
          text: 'Review Pending',
          badgeClasses:
            'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${config.badgeClasses}`}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{config.text}</span>
      </span>

      {onChange && (
        <select
          value={status}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Update Review Status"
          className="text-xs font-semibold py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#191970] dark:focus:ring-cyan-400 cursor-pointer transition-all"
        >
          <option value="pending">Mark Pending</option>
          <option value="verified">Verify Entry</option>
          <option value="flagged">Flag Discrepancy</option>
        </select>
      )}
    </div>
  );
}
