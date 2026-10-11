import React from 'react';
import { formatDate } from '../utils/dateFormat.js';
import ReviewStatusBadge from './ReviewStatusBadge.jsx';
import {
  Calendar,
  Clock,
  FileText,
  Search,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function TimelineEvent({ event, onUpdateStatus, onViewSource }) {
  const isDeadline = Boolean(event.is_deadline);

  return (
    <div className="relative pl-8 sm:pl-10 group">
      {/* Node bullet on vertical line */}
      <div
        className={`absolute left-0 top-6 w-4 h-4 rounded-full border-2 transition-all duration-200 z-10 flex items-center justify-center ${
          isDeadline
            ? 'bg-amber-500 border-amber-200 dark:border-amber-900 ring-4 ring-amber-100 dark:ring-amber-950/60 shadow-md scale-110'
            : 'bg-[#191970] dark:bg-cyan-400 border-slate-100 dark:border-slate-800 ring-4 ring-slate-100 dark:ring-slate-800/80 group-hover:scale-110'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-900"></span>
      </div>

      {/* Event Card */}
      <div
        className={`bg-white dark:bg-[#1E293B] border rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-4 ${
          isDeadline
            ? 'border-amber-300 dark:border-amber-700/60 border-l-4 border-l-amber-500'
            : 'border-slate-200 dark:border-slate-700/60 border-l-4 border-l-[#191970] dark:border-l-cyan-400'
        }`}
      >
        {/* Top bar: Date, Deadline flag, Review Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#191970] dark:text-cyan-400" />
              <span>{formatDate(event.date)}</span>
            </div>

            {event.raw_date_text && event.raw_date_text !== event.date && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                ("{event.raw_date_text}")
              </span>
            )}

            {isDeadline && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Clock className="w-3 h-3 text-amber-500" />
                Statutory Deadline
              </span>
            )}
          </div>

          <ReviewStatusBadge
            status={event.review_status}
            onChange={(newStatus) => onUpdateStatus && onUpdateStatus(event.id, newStatus)}
          />
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {event.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Source Citation Footer */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 truncate">
            <FileText className="w-4 h-4 text-[#191970] dark:text-cyan-400 flex-shrink-0" />
            <span className="truncate">
              Document:{' '}
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                {event.document_name || 'Case Exhibit'}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {event.confidence_score && (
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                {Math.round(event.confidence_score * 100)}% conf
              </span>
            )}

            <button
              type="button"
              onClick={() => onViewSource(event)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-midnight-50 dark:bg-midnight-950/80 text-[#191970] dark:text-cyan-300 border border-midnight-200 dark:border-midnight-800 hover:bg-midnight-100 dark:hover:bg-midnight-900 transition-colors shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Inspect Source Citation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
