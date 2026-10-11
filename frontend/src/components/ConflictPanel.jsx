import React from 'react';
import { AlertTriangle, CheckCircle2, GitCompare, ArrowRight } from 'lucide-react';

export default function ConflictPanel({ conflicts }) {
  if (!conflicts || conflicts.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 text-center shadow-sm">
        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Evidentiary Integrity Intact
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          No conflicting dates or contradictory witness statements detected across active exhibits.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conflicts.map((cnf) => (
        <div
          key={cnf.id}
          className="bg-white dark:bg-[#1E293B] border-l-4 border-l-rose-500 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow transition-all"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                Contradiction: {cnf.severity.toUpperCase()}
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                {cnf.id}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Litigation Risk High
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
            {cnf.topic}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            {cnf.description}
          </p>

          {/* Side by side comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-750">
            {/* Record A */}
            <div className="p-2.5 rounded-md bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Exhibit Statement A
              </span>
              <div className="text-sm font-bold text-[#191970] dark:text-cyan-400 mt-0.5 font-mono">
                {cnf.date_a}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 truncate">
                {cnf.source_a}
              </div>
            </div>

            {/* Record B */}
            <div className="p-2.5 rounded-md bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                Contradicting Statement B
              </span>
              <div className="text-sm font-bold text-rose-600 dark:text-rose-400 mt-0.5 font-mono">
                {cnf.date_b}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 truncate">
                {cnf.source_b}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
