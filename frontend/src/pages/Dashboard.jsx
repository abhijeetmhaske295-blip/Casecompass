import React from 'react';
import DashboardStats from '../components/DashboardStats.jsx';
import ConflictPanel from '../components/ConflictPanel.jsx';
import DeadlineList from '../components/DeadlineList.jsx';
import MissingDocumentAlert from '../components/MissingDocumentAlert.jsx';
import ExportReport from '../components/ExportReport.jsx';
import {
  AlertTriangle,
  ClockAlert,
  FileSearch,
  Scale,
  Calendar,
  Upload,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function Dashboard({
  stats,
  conflicts,
  deadlines,
  gaps,
  onNavigate,
}) {
  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 transition-colors duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-midnight-50 text-[#191970] dark:bg-midnight-950/80 dark:text-cyan-300 border border-midnight-200 dark:border-midnight-800">
              Litigation Intelligence
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              CASE: CV-2024-08912
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191970] dark:text-white tracking-tight">
            Case Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Unified chronological milestones, pending statutory deadlines, and evidentiary integrity tracking across all filings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('documents')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-[#191970] dark:text-cyan-400" />
            <span>Upload Filing</span>
          </button>
          <ExportReport />
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <DashboardStats stats={stats} />

      {/* Matter Summary Ribbon (Midnight Blue Accent Header) */}
      <div className="rounded-xl bg-gradient-to-r from-[#191970] to-[#1e2a8a] text-white p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-wider uppercase text-cyan-300">
            Current Litigation Posture
          </span>
          <h3 className="text-base font-bold">
            Apex Corp v. Horizon Dynamics LLC (First Judicial District)
          </h3>
          <p className="text-xs text-white/80 max-w-2xl">
            Preliminary injunction in effect since April 15, 2024. Next Case Management Conference set for June 22, 2024 at 10:00 AM.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('timeline')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#191970] text-xs font-bold hover:bg-cyan-50 transition-colors shadow-sm"
          >
            <span>Examine Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left (Conflicts & Gaps) vs Right (Deadlines) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Discrepancies and Evidence Gaps */}
        <div className="lg:col-span-7 space-y-8">
          {/* Factual Contradictions Panel */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Testimony & Milestone Discrepancies
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('issues')}
                className="text-xs font-bold text-[#191970] dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View All Conflicts</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <ConflictPanel conflicts={conflicts} />
          </div>

          {/* Evidentiary Gaps Panel */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                  <FileSearch className="w-4 h-4" />
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Referenced But Unfiled Evidentiary Gaps
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('issues')}
                className="text-xs font-bold text-[#191970] dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Audit Gaps</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <MissingDocumentAlert gaps={gaps} />
          </div>
        </div>

        {/* Right Column (5 cols): Critical Deadlines & Action Checklist */}
        <div className="lg:col-span-5 space-y-8">
          {/* Statutory Deadlines */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <ClockAlert className="w-4 h-4" />
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Upcoming Statutory Deadlines
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('deadlines')}
                className="text-xs font-bold text-[#191970] dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View Schedule</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <DeadlineList deadlines={deadlines} />
          </div>

          {/* Case Record Action Card */}
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
              <Scale className="w-4 h-4 text-[#191970] dark:text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Evidentiary Action Items
              </h3>
            </div>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 font-bold text-[10px] mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Resolve Injunction Notice Gap
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Depose Sarah Lin regarding April 18-22 server downloads vs April 15 court order.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 font-bold text-[10px] mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Demand Exhibit C Production
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Request Protective Order Exhibit C referenced in Plaintiff's Motion in Limine.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 font-bold text-[10px] mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Prepare Witness Disclosures
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Finalize witness list before strict statutory deadline of June 01, 2024.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
