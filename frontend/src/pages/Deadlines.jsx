import React, { useState } from 'react';
import DeadlineList from '../components/DeadlineList.jsx';
import ExportReport from '../components/ExportReport.jsx';
import {
  ClockAlert,
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function Deadlines({ deadlines = [], onNavigate }) {
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  const overdueList = deadlines.filter((d) => d.urgency === 'overdue');
  const urgentList = deadlines.filter((d) => d.urgency === 'urgent');

  const filteredDeadlines = deadlines.filter((d) => {
    if (urgencyFilter === 'all') return true;
    return d.urgency === urgencyFilter;
  });

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Statutory Calendar
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              LIMITATION RADAR
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191970] dark:text-white tracking-tight">
            Statutory & Procedural Deadlines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Automated tracking of discovery cut-offs, motion in limine filing windows, and court-mandated witness disclosures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportReport />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Court Deadlines
            </div>
            <div className="text-2xl font-extrabold text-[#191970] dark:text-white mt-0.5">
              {deadlines.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-midnight-50 dark:bg-midnight-950/60 border border-midnight-100 dark:border-midnight-800 flex items-center justify-center text-[#191970] dark:text-cyan-400">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Urgent (&lt; 30 Days)
            </div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
              {urgentList.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <ClockAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Overdue / Past Cut-off
            </div>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
              {overdueList.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setUrgencyFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            urgencyFilter === 'all'
              ? 'bg-[#191970] text-white shadow-sm'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          All Deadlines ({deadlines.length})
        </button>

        <button
          type="button"
          onClick={() => setUrgencyFilter('urgent')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            urgencyFilter === 'urgent'
              ? 'bg-amber-500 text-slate-900 shadow-sm'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          Urgent ({urgentList.length})
        </button>

        <button
          type="button"
          onClick={() => setUrgencyFilter('overdue')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            urgencyFilter === 'overdue'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          Overdue ({overdueList.length})
        </button>
      </div>

      {/* Deadline List */}
      <DeadlineList deadlines={filteredDeadlines} />

      {/* Compliance Advisory Callout */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Procedural Rule 26(a) Compliance Warning
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Failure to submit witness disclosures prior to June 01, 2024 results in mandatory evidentiary preclusion under local rule 37. Inspect chronological exhibits to verify compliance.
            </p>
          </div>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('timeline')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-midnight-50 dark:bg-midnight-950/80 text-[#191970] dark:text-cyan-300 text-xs font-bold hover:bg-midnight-100 dark:hover:bg-midnight-900 transition-colors flex-shrink-0"
          >
            <span>Audit Exhibit Dates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
