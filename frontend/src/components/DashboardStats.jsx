import React from 'react';
import {
  FileText,
  CalendarCheck,
  ClockAlert,
  AlertOctagon,
  FileSearch,
  ArrowUpRight,
} from 'lucide-react';

export default function DashboardStats({ stats }) {
  if (!stats) return null;

  const items = [
    {
      label: 'Ingested Documents',
      value: stats.total_documents,
      icon: FileText,
      iconColor: 'text-[#191970] dark:text-cyan-400',
      iconBg: 'bg-midnight-50 dark:bg-midnight-950/60 border border-midnight-100 dark:border-midnight-800',
      badge: 'All parsed',
      badgeClass: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
    },
    {
      label: 'Timeline Milestones',
      value: stats.total_events,
      icon: CalendarCheck,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40',
      badge: 'Chronological',
      badgeClass: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
    },
    {
      label: 'Critical Deadlines',
      value: stats.active_deadlines,
      icon: ClockAlert,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/40',
      badge: 'Statutory radar',
      badgeClass: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
    },
    {
      label: 'Factual Conflicts',
      value: stats.detected_conflicts,
      icon: AlertOctagon,
      iconColor: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/40',
      badge: stats.detected_conflicts > 0 ? 'Requires review' : 'Clean',
      badgeClass: stats.detected_conflicts > 0 
        ? 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40'
        : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
    },
    {
      label: 'Missing Record Gaps',
      value: stats.missing_records,
      icon: FileSearch,
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900/40',
      badge: 'Cited unfiled',
      badgeClass: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {items.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-[#1E293B] border border-slate-200/90 dark:border-slate-700/60 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stat.badgeClass}`}>
                {stat.badge}
              </span>
            </div>

            <div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 truncate">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
