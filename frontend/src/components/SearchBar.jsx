import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search chronological events, keywords, or orders...',
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#191970] dark:focus:ring-cyan-400 transition-all shadow-sm"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
