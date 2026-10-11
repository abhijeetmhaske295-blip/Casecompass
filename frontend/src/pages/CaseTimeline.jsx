import React, { useState } from 'react';
import Timeline from '../components/Timeline.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TimelineFilters from '../components/TimelineFilters.jsx';
import SourceViewer from '../components/SourceViewer.jsx';
import ExportReport from '../components/ExportReport.jsx';
import { CalendarClock, ShieldCheck, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function CaseTimeline({ events = [], documents = [], onUpdateStatus }) {
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewingSource, setViewingSource] = useState(null);

  const filteredEvents = events.filter((e) => {
    const matchesDoc = !selectedDoc || e.document_id === selectedDoc;
    const matchesStatus = !selectedStatus || e.review_status === selectedStatus;
    const matchesSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      (e.source_snippet && e.source_snippet.toLowerCase().includes(search.toLowerCase()));
    return matchesDoc && matchesStatus && matchesSearch;
  });

  const verifiedCount = events.filter((e) => e.review_status === 'verified').length;
  const deadlineCount = events.filter((e) => e.is_deadline).length;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-midnight-50 text-[#191970] dark:bg-midnight-950/80 dark:text-cyan-300 border border-midnight-200 dark:border-midnight-800">
              Chronological Audit Trail
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              EVENT CHAIN
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191970] dark:text-white tracking-tight">
            Case Chronology & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Strict temporal ordering of procedural orders, witness testimony milestones, and evidentiary citations with human review status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportReport />
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Milestones
            </div>
            <div className="text-2xl font-extrabold text-[#191970] dark:text-white mt-0.5">
              {events.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-midnight-50 dark:bg-midnight-950/60 border border-midnight-100 dark:border-midnight-800 flex items-center justify-center text-[#191970] dark:text-cyan-400">
            <CalendarClock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Verified Entries
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {verifiedCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Statutory Deadlines
            </div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
              {deadlineCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search milestones, witness names, citations..."
        />

        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter by review status"
            className="text-xs sm:text-sm font-semibold py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#191970] dark:focus:ring-cyan-400 cursor-pointer transition-all"
          >
            <option value="">All Review Statuses</option>
            <option value="verified">Verified Only</option>
            <option value="pending">Pending Only</option>
            <option value="flagged">Flagged Only</option>
          </select>

          <TimelineFilters
            documents={documents}
            selectedDoc={selectedDoc}
            onSelectDoc={setSelectedDoc}
          />
        </div>
      </div>

      {/* Timeline Stream */}
      <Timeline
        events={filteredEvents}
        onUpdateStatus={onUpdateStatus}
        onViewSource={(evt) => setViewingSource(evt)}
      />

      {/* Modal for viewing citation */}
      <SourceViewer
        event={viewingSource}
        onClose={() => setViewingSource(null)}
      />
    </div>
  );
}
