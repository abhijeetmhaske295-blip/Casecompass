import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound({ onGoHome }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-midnight-50 dark:bg-midnight-950/70 border border-midnight-200 dark:border-midnight-800 flex items-center justify-center text-[#191970] dark:text-cyan-400 mb-6 shadow-sm">
        <Compass className="w-8 h-8 animate-spin-slow" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono">
        HTTP 404
      </span>
      <h1 className="text-3xl font-extrabold text-[#191970] dark:text-white mt-1">
        Litigation Record Not Found
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md leading-relaxed">
        The requested case view or document workspace does not exist in the active docket registry.
      </p>
      <button
        type="button"
        onClick={onGoHome}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#191970] hover:bg-[#121255] text-white text-xs font-bold transition-all shadow-md active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Case Intelligence Dashboard</span>
      </button>
    </div>
  );
}
