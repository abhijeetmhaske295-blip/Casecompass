import React from 'react';
import { FileQuestion, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function MissingDocumentAlert({ gaps }) {
  if (!gaps || gaps.length === 0) return null;

  return (
    <div className="space-y-3">
      {gaps.map((gap) => (
        <div
          key={gap.id}
          className="bg-white dark:bg-[#1E293B] border border-purple-200 dark:border-purple-900/40 border-l-4 border-l-purple-500 rounded-xl p-4 shadow-sm hover:shadow transition-all"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <FileQuestion className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {gap.importance} Record Gap
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              {gap.id}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            {gap.title}
          </h4>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Cited in{' '}
            <strong className="text-slate-800 dark:text-slate-100 font-semibold">
              {gap.referenced_in}
            </strong>
            . This order/motion was identified in filings but has not been supplied to the case record.
          </p>
        </div>
      ))}
    </div>
  );
}
