import React from 'react';
import { Filter } from 'lucide-react';

export default function TimelineFilters({ documents = [], selectedDoc, onSelectDoc }) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
      <select
        value={selectedDoc}
        onChange={(e) => onSelectDoc(e.target.value)}
        aria-label="Filter events by document"
        className="text-xs sm:text-sm font-semibold py-2 px-3 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#191970] dark:focus:ring-cyan-400 cursor-pointer shadow-sm transition-all"
      >
        <option value="">All Filings & Exhibits ({documents.length})</option>
        {documents.map((d) => (
          <option key={d.id} value={d.id}>
            {d.filename || d.name}
          </option>
        ))}
      </select>
    </div>
  );
}
