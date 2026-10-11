import React from 'react';
import { formatDate } from '../utils/dateFormat.js';
import { Clock, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function DeadlineList({ deadlines }) {
  if (!deadlines || deadlines.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 text-center text-slate-500 dark:text-slate-400">
        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
        <p className="text-xs font-semibold">No statutory deadlines pending.</p>
      </div>
    );
  }

  const getUrgencyClasses = (urgency) => {
    switch (urgency) {
      case 'overdue':
        return {
          badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
          border: 'border-l-rose-500',
          dot: 'bg-rose-500',
        };
      case 'urgent':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
          border: 'border-l-amber-500',
          dot: 'bg-amber-500',
        };
      default:
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
          border: 'border-l-[#191970] dark:border-l-cyan-400',
          dot: 'bg-[#191970] dark:bg-cyan-400',
        };
    }
  };

  return (
    <div className="space-y-3">
      {deadlines.map((dl) => {
        const style = getUrgencyClasses(dl.urgency);
        return (
          <div
            key={dl.id}
            className={`bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 border-l-4 ${style.border} rounded-xl p-4 shadow-sm hover:shadow transition-all`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  {dl.urgency}
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {formatDate(dl.due_date)}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
                {dl.document_name}
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {dl.title}
            </h4>

            {dl.notes && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {dl.notes}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
