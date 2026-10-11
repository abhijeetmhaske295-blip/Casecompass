import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Analyzing legal documents...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-12 h-12 rounded-xl bg-midnight-50 dark:bg-midnight-950/60 border border-midnight-100 dark:border-midnight-800 flex items-center justify-center mb-4 shadow-sm">
        <Loader2 className="w-6 h-6 text-[#191970] dark:text-cyan-400 animate-spin" />
      </div>
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
        Processing Case Intelligence
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
        {message}
      </p>
    </div>
  );
}
