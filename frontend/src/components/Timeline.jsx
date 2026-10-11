import React from 'react';
import TimelineEvent from './TimelineEvent.jsx';
import { CalendarX } from 'lucide-react';

export default function Timeline({ events = [], onUpdateStatus, onViewSource }) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-12 text-center shadow-sm">
        <CalendarX className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
          No Timeline Events Found
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          No chronological milestones match your current search terms or document filter selection.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Central continuous spine line */}
      <div
        className="absolute top-4 bottom-4 left-[7px] w-0.5 bg-slate-200 dark:bg-slate-700/80 pointer-events-none"
        aria-hidden="true"
      />

      <div className="space-y-6">
        {events.map((evt) => (
          <TimelineEvent
            key={evt.id}
            event={evt}
            onUpdateStatus={onUpdateStatus}
            onViewSource={onViewSource}
          />
        ))}
      </div>
    </div>
  );
}
