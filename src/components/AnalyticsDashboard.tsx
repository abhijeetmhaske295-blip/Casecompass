import React from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Split, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  BarChart2, 
  ArrowUpRight 
} from 'lucide-react';
import { LegalCaseData } from '../types/legalCase';

interface AnalyticsDashboardProps {
  caseData: LegalCaseData;
  isDark: boolean;
  onNavigateTab: (tab: any) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  caseData,
  isDark,
  onNavigateTab,
}) => {
  const totalEvents = caseData.events.length;
  const verifiedCount = caseData.events.filter((e) => e.reviewStatus === 'VERIFIED').length;
  const pendingCount = caseData.events.filter((e) => e.reviewStatus === 'PENDING').length;
  const flaggedCount = caseData.events.filter((e) => e.reviewStatus === 'FLAGGED').length;
  const conflictCount = caseData.events.filter((e) => e.hasConflict).length;
  const deadlineCount = caseData.explicitDeadlines.length;
  const gapCount = caseData.gaps.length;
  const docCount = caseData.documents.length;

  const verificationRate = totalEvents > 0 ? Math.round((verifiedCount / totalEvents) * 100) : 0;

  // Breakdown by event type
  const filingsCount = caseData.events.filter((e) => e.eventType === 'FILING').length;
  const ordersCount = caseData.events.filter((e) => e.eventType === 'ORDER').length;
  const discoveryCount = caseData.events.filter((e) => e.eventType === 'DISCOVERY').length;
  const hearingsCount = caseData.events.filter((e) => e.eventType === 'HEARING').length;
  const otherCount = totalEvents - (filingsCount + ordersCount + discoveryCount + hearingsCount);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Uploaded Documents */}
        <div
          className={`p-5 rounded-3xl soft-transition ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold font-mono">{docCount}</div>
          <div className="text-xs font-semibold text-neutral-400 mt-0.5">Uploaded Documents</div>
          <div className="text-[10px] text-neutral-400 mt-1">Verified Docket Records</div>
        </div>

        {/* Parsed Chronological Events */}
        <div
          onClick={() => onNavigateTab('ALL')}
          className={`p-5 rounded-3xl soft-transition cursor-pointer ${
            isDark ? 'soft-card-dark hover:bg-neutral-850' : 'soft-card-light hover:bg-white'
          }`}
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold font-mono">{totalEvents}</div>
          <div className="text-xs font-semibold text-neutral-400 mt-0.5">Parsed Events</div>
          <div className="text-[10px] text-blue-600 flex items-center gap-0.5 mt-1">
            <span>View Timeline</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Actionable Explicit Deadlines */}
        <div
          onClick={() => onNavigateTab('DEADLINES')}
          className={`p-5 rounded-3xl soft-transition cursor-pointer ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold font-mono">{deadlineCount}</div>
          <div className="text-xs font-semibold text-neutral-400 mt-0.5">Actionable Deadlines</div>
          <div className="text-[10px] text-neutral-400 mt-1">Direct Court Orders</div>
        </div>

        {/* Flagged Date Conflicts */}
        <div
          onClick={() => onNavigateTab('CONFLICTS')}
          className={`p-5 rounded-3xl soft-transition cursor-pointer ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-3">
            <Split className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold font-mono flex items-center justify-between">
            <span>{conflictCount}</span>
            {conflictCount > 0 && <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />}
          </div>
          <div className="text-xs font-semibold text-neutral-400 mt-0.5">Date Conflicts</div>
          <div className="text-[10px] text-blue-600 flex items-center gap-0.5 mt-1">
            <span>Review Discrepancies</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Progress (Matching Progress Indicator in reference image) */}
        <div
          className={`p-6 sm:p-7 rounded-3xl soft-transition ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Counsel Verification System
              </span>
              <h3 className="text-base font-bold tracking-tight mt-0.5">
                Record Review Progress
              </h3>
            </div>
            <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
              {verificationRate}%
            </div>
          </div>

          {/* Progress Indicator Bar (Matching reference image) */}
          <div
            className={`w-full h-3 rounded-full overflow-hidden p-0.5 mb-3 ${
              isDark ? 'soft-inset-dark' : 'soft-inset-light'
            }`}
          >
            <div
              className="h-full rounded-full bg-blue-600 shadow-sm transition-all duration-500"
              style={{ width: `${verificationRate}%` }}
            />
          </div>
          <div className="text-[11px] text-neutral-400 mb-5">
            {verifiedCount} of {totalEvents} timeline events confirmed by legal counsel.
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div
              className={`p-3 rounded-2xl ${
                isDark ? 'soft-inset-dark' : 'soft-inset-light'
              }`}
            >
              <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {verifiedCount}
              </div>
              <div className="text-[10px] font-medium text-neutral-400">Verified</div>
            </div>

            <div
              className={`p-3 rounded-2xl ${
                isDark ? 'soft-inset-dark' : 'soft-inset-light'
              }`}
            >
              <div className="text-base font-bold font-mono text-amber-600 dark:text-amber-400">
                {pendingCount}
              </div>
              <div className="text-[10px] font-medium text-neutral-400">Pending Review</div>
            </div>

            <div
              className={`p-3 rounded-2xl ${
                isDark ? 'soft-inset-dark' : 'soft-inset-light'
              }`}
            >
              <div className="text-base font-bold font-mono text-blue-600 dark:text-blue-400">
                {flaggedCount}
              </div>
              <div className="text-[10px] font-medium text-neutral-400">Flagged Items</div>
            </div>
          </div>
        </div>

        {/* Event Classification Breakdown */}
        <div
          className={`p-6 sm:p-7 rounded-3xl soft-transition ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Procedural Distribution
            </span>
            <h3 className="text-base font-bold tracking-tight mt-0.5">
              Event Classification Breakdown
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {/* Filings */}
            <div>
              <div className="flex justify-between text-neutral-500 mb-1">
                <span>Pleadings &amp; Filings</span>
                <span className="font-mono font-bold">{filingsCount}</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'soft-inset-dark' : 'soft-inset-light'}`}>
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${totalEvents > 0 ? (filingsCount / totalEvents) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Orders */}
            <div>
              <div className="flex justify-between text-neutral-500 mb-1">
                <span>Judicial Orders &amp; Directives</span>
                <span className="font-mono font-bold">{ordersCount}</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'soft-inset-dark' : 'soft-inset-light'}`}>
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${totalEvents > 0 ? (ordersCount / totalEvents) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Discovery */}
            <div>
              <div className="flex justify-between text-neutral-500 mb-1">
                <span>Discovery &amp; Subpoenas</span>
                <span className="font-mono font-bold">{discoveryCount}</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'soft-inset-dark' : 'soft-inset-light'}`}>
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{ width: `${totalEvents > 0 ? (discoveryCount / totalEvents) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Hearings */}
            <div>
              <div className="flex justify-between text-neutral-500 mb-1">
                <span>Hearings &amp; Minutes</span>
                <span className="font-mono font-bold">{hearingsCount}</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'soft-inset-dark' : 'soft-inset-light'}`}>
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${totalEvents > 0 ? (hearingsCount / totalEvents) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Missing Information / Gap Alerts Card */}
      <div
        className={`p-6 sm:p-7 rounded-3xl soft-transition ${
          isDark ? 'soft-card-dark' : 'soft-card-light'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold tracking-tight">Missing Information Alerts ({gapCount})</h4>
              <p className="text-xs text-neutral-400">Referenced docket items omitted from the record</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('GAPS')}
            className="px-4 py-2 rounded-xl text-xs font-semibold soft-btn-primary cursor-pointer"
          >
            Review Gaps
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {caseData.gaps.map((gap) => (
            <div
              key={gap.id}
              className={`p-3.5 rounded-2xl ${
                isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-[#22252A]'
              }`}
            >
              <div className="font-bold text-xs text-amber-600 dark:text-amber-400 mb-1">
                {gap.title}
              </div>
              <p className="text-neutral-500 text-[11px] leading-relaxed line-clamp-2">
                {gap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
