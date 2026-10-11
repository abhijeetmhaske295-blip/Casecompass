/**
 * CaseCompass: Legal Case Timeline & Action Organizer
 * Features Specification Implementation
 * Soft UI Design System: Ivory Surfaces & Cobalt Accents
 */

import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  Search, 
  Bell, 
  Plus, 
  Download, 
  Code2, 
  Sun, 
  Moon, 
  Split, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  X, 
  BarChart2, 
  FileSearch, 
  Filter, 
  Calendar,
  Layers,
  Compass,
  Printer
} from 'lucide-react';
import { SAMPLE_CASES } from './data/sampleCases';
import { LegalCaseData, TimelineFilter, CaseEvent, ReviewStatus, EventType } from './types/legalCase';
import { TimelineNodeCard } from './components/TimelineNodeCard';
import { DeadlineCard } from './components/DeadlineCard';
import { GapCard } from './components/GapCard';
import { LegalGlossaryModal } from './components/LegalGlossaryModal';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { DocumentSidePanel } from './components/DocumentSidePanel';
import { ReviewSystemModal } from './components/ReviewSystemModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { KotlinArchitectureViewer } from './components/KotlinArchitectureViewer';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'CONFLICTS' | 'DEADLINES' | 'GAPS' | 'ANALYTICS' | 'KOTLIN_CODE'>('ALL');
  const [casesList, setCasesList] = useState<LegalCaseData[]>(SAMPLE_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(SAMPLE_CASES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotice, setShowNotice] = useState<boolean>(true);

  // Filter modifiers
  const [selectedReviewStatus, setSelectedReviewStatus] = useState<string>('ALL');
  const [selectedEventType, setSelectedEventType] = useState<string>('ALL');

  // Side-by-Side Document Viewer state
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
  const [activeInspectedEvent, setActiveInspectedEvent] = useState<CaseEvent | null>(null);

  // Review System Modal state
  const [eventToReview, setEventToReview] = useState<CaseEvent | null>(null);

  // Expanded event ids
  const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(new Set(['e_4']));

  // Legal Term Explainer modal state
  const [activeTermModal, setActiveTermModal] = useState<{
    term: string;
    context: string;
    sourceDoc: string;
  } | null>(null);

  // Document Upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // Active Case
  const currentCase = useMemo(() => {
    return casesList.find((c) => c.id === selectedCaseId) || casesList[0];
  }, [casesList, selectedCaseId]);

  // Handle Event Updates from Review System
  const handleUpdateEvent = (updated: CaseEvent) => {
    setCasesList((prev) =>
      prev.map((c) => {
        if (c.id === currentCase.id) {
          return {
            ...c,
            events: c.events.map((e) => (e.id === updated.id ? updated : e)),
          };
        }
        return c;
      })
    );
  };

  // Filtered events
  const filteredEvents = useMemo(() => {
    let list = [...currentCase.events];

    if (activeTab === 'CONFLICTS') {
      list = list.filter((e) => e.hasConflict);
    }

    // Filter by Review Status
    if (selectedReviewStatus !== 'ALL') {
      list = list.filter((e) => e.reviewStatus === selectedReviewStatus);
    }

    // Filter by Event Type
    if (selectedEventType !== 'ALL') {
      list = list.filter((e) => e.eventType === selectedEventType);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.dateDisplay.toLowerCase().includes(q) ||
          e.sourceSentence.toLowerCase().includes(q) ||
          e.sourceDocument.toLowerCase().includes(q) ||
          e.legalTerms.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [currentCase, activeTab, selectedReviewStatus, selectedEventType, searchQuery]);

  const conflictCount = currentCase.events.filter((e) => e.hasConflict).length;
  const gapCount = currentCase.gaps.length;
  const deadlineCount = currentCase.explicitDeadlines.length;
  const verifiedCount = currentCase.events.filter((e) => e.reviewStatus === 'VERIFIED').length;

  const toggleEventExpansion = (id: string) => {
    setExpandedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Report Exporting (PDF / Markdown clean format)
  const exportCaseReport = () => {
    let report = `# CASE COMPASS: CHRONOLOGY & RECORD AUDIT REPORT\n\n`;
    report += `Case Title: ${currentCase.caseTitle}\n`;
    report += `Docket No: ${currentCase.caseNumber}\n`;
    report += `Jurisdiction: ${currentCase.courtJurisdiction}\n`;
    report += `Presiding Judge: ${currentCase.presidingJudge}\n`;
    report += `Date of Report: ${new Date().toLocaleDateString()}\n\n`;
    report += `STATUTORY NOTICE:\nCaseCompass organizes provided records only. This tool does not offer legal advice or predict legal outcomes.\n\n`;

    report += `=====================================================\n`;
    report += `SUMMARY AUDIT METRICS\n`;
    report += `Total Verified Events: ${currentCase.events.length}\n`;
    report += `Confirmed by Counsel: ${verifiedCount} / ${currentCase.events.length}\n`;
    report += `Parallel Date Conflicts: ${conflictCount}\n`;
    report += `Missing Information Alerts: ${gapCount}\n`;
    report += `Explicit Court Deadlines: ${deadlineCount}\n`;
    report += `=====================================================\n\n`;

    report += `## 1. EXPLICIT ACTIONABLE DEADLINES\n`;
    report += `(Extracted directly from source court orders. No inferred or calculated dates.)\n\n`;
    currentCase.explicitDeadlines.forEach((d, idx) => {
      report += `[${idx + 1}] DUE: ${d.dueDateDisplay}\n`;
      report += `    Action: ${d.title}\n`;
      report += `    Party: ${d.obligatedParty}\n`;
      report += `    Verbatim Sentence: "${d.sourceSentence}"\n`;
      report += `    Source Docket: ${d.sourceDocument}\n\n`;
    });

    report += `## 2. CHRONOLOGICAL EVENT STREAM & VERIFICATION STATUS\n\n`;
    currentCase.events.forEach((e, idx) => {
      report += `[${idx + 1}] ${e.dateDisplay} — ${e.title}\n`;
      report += `    Type: ${e.eventType} | Status: ${e.reviewStatus}\n`;
      report += `    Summary: ${e.summary}\n`;
      if (e.hasConflict && e.conflictDetails) {
        report += `    [!] DATE CONFLICT DETECTED:\n`;
        report += `        - Primary: ${e.conflictDetails.primaryDate} (${e.conflictDetails.primarySource})\n`;
        report += `        - Conflicting: ${e.conflictDetails.conflictingDate} (${e.conflictDetails.conflictingSource})\n`;
        report += `        - Divergence: ${e.conflictDetails.conflictDescription}\n`;
      }
      report += `    Supporting Quote: "${e.sourceSentence}"\n`;
      report += `    Record: ${e.sourceDocument}\n`;
      if (e.verificationNote) {
        report += `    Counsel Note: ${e.verificationNote} (Verified by: ${e.verifiedBy || 'Counsel'})\n`;
      }
      report += `\n`;
    });

    report += `## 3. PROCEDURAL & DOCUMENTARY GAPS\n\n`;
    currentCase.gaps.forEach((g, idx) => {
      report += `[${idx + 1}] Missing Item: ${g.referencedDocument} (${g.severity} Priority)\n`;
      report += `    Details: ${g.description}\n`;
      report += `    Referenced Sentence: "${g.sourceSentence}"\n\n`;
    });

    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentCase.caseNumber.replace(/[^a-zA-Z0-9_-]/g, '_')}_Audit_Report.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`min-h-screen py-6 sm:py-8 px-3 sm:px-6 md:px-8 transition-colors duration-200 select-none ${
        isDark ? 'soft-canvas-dark text-neutral-100' : 'soft-canvas-light text-[#22252A]'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ============================================================ */}
        {/* TOP BRAND HEADER (Soft System Editorial Header)              */}
        {/* ============================================================ */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-widest uppercase">
                CASE <span className="text-blue-600">/</span> COMPASS
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-400 mt-0.5">
              LEGAL CASE TIMELINE &amp; ACTION ORGANIZER
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Side Document Panel Toggle */}
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer soft-transition ${
                isSidePanelOpen
                  ? 'soft-btn-primary'
                  : isDark
                  ? 'soft-btn-secondary-dark'
                  : 'soft-btn-secondary-light'
              }`}
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>{isSidePanelOpen ? 'Hide Doc Viewer' : 'Side-by-Side Doc Viewer'}</span>
            </button>

            {/* Dark / Light Toggle Switch */}
            <button
              onClick={() => setIsDark(!isDark)}
              title="Toggle Theme"
              className={`relative w-14 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                isDark ? 'bg-blue-600' : 'bg-[#E3DFD7]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 flex items-center justify-center text-[10px] ${
                  isDark ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                {isDark ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-amber-500" />}
              </div>
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* STATUTORY NOTICE BANNER                                      */}
        {/* ============================================================ */}
        {showNotice && (
          <div
            className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex items-center justify-between gap-4 soft-transition ${
              isDark ? 'soft-card-dark' : 'soft-card-light'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold tracking-tight">
                  Statutory Notice &amp; Strict Non-Extrapolation Principle
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  CaseCompass organizes provided records only. This tool does not offer legal advice or predict legal outcomes. Deadlines are extracted strictly from verbatim source sentences with zero calculated dates.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 cursor-pointer shrink-0"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* CONTROLS BAR: Sunken Search Pill & Action Buttons            */}
        {/* ============================================================ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Field (Sunken Inset Pill) */}
          <div className="relative grow max-w-lg">
            <Search className="w-4 h-4 absolute left-4 top-3 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records, dates, citations, or legal terms..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-full text-xs outline-none soft-transition ${
                isDark
                  ? 'soft-inset-dark text-white placeholder-neutral-500'
                  : 'soft-inset-light text-[#22252A] placeholder-neutral-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl text-xs font-semibold soft-btn-primary flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ingest Record</span>
            </button>

            <button
              onClick={exportCaseReport}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                isDark ? 'soft-btn-secondary-dark' : 'soft-btn-secondary-light'
              }`}
            >
              <Download className="w-4 h-4 text-neutral-500" />
              <span>Export Audit</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CASE PROFILE CARD                                            */}
        {/* ============================================================ */}
        <div
          className={`p-6 sm:p-7 rounded-3xl soft-transition ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            {/* Avatar & Title */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/30 shrink-0">
                <Scale className="w-7 h-7" />
              </div>

              <div>
                <h2
                  className={`text-base sm:text-xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#22252A]'
                  }`}
                >
                  {currentCase.caseTitle}
                </h2>
                <div className="text-xs text-neutral-500 font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">{currentCase.caseNumber}</span>
                  <span>·</span>
                  <span>{currentCase.presidingJudge}</span>
                  <span>·</span>
                  <span>{currentCase.courtJurisdiction.split('(')[0]}</span>
                </div>
              </div>
            </div>

            {/* Case Selector Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={selectedCaseId}
                onChange={(e) => {
                  setSelectedCaseId(e.target.value);
                  setActiveTab('ALL');
                }}
                className={`w-full md:w-auto px-4 py-2 rounded-2xl text-xs font-semibold outline-none cursor-pointer ${
                  isDark ? 'soft-btn-secondary-dark' : 'soft-btn-secondary-light'
                }`}
              >
                {casesList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.caseTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Metric Counter Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`p-3 rounded-2xl text-left cursor-pointer soft-transition ${
                activeTab === 'ALL'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : isDark
                  ? 'soft-card-dark-sm hover:bg-neutral-800/40'
                  : 'soft-card-light-sm hover:bg-white/80'
              }`}
            >
              <div className="text-lg font-bold font-mono">{currentCase.events.length}</div>
              <div className={`text-[11px] font-medium ${activeTab === 'ALL' ? 'text-white/80' : 'text-neutral-400'}`}>
                Verified Events ({verifiedCount} confirmed)
              </div>
            </button>

            <button
              onClick={() => setActiveTab('CONFLICTS')}
              className={`p-3 rounded-2xl text-left cursor-pointer soft-transition ${
                activeTab === 'CONFLICTS'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : isDark
                  ? 'soft-card-dark-sm hover:bg-neutral-800/40'
                  : 'soft-card-light-sm hover:bg-white/80'
              }`}
            >
              <div className="text-lg font-bold font-mono flex items-center justify-between">
                <span>{conflictCount}</span>
                {conflictCount > 0 && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
              </div>
              <div className={`text-[11px] font-medium ${activeTab === 'CONFLICTS' ? 'text-white/80' : 'text-neutral-400'}`}>
                Date Conflicts (Side-by-Side)
              </div>
            </button>

            <button
              onClick={() => setActiveTab('DEADLINES')}
              className={`p-3 rounded-2xl text-left cursor-pointer soft-transition ${
                activeTab === 'DEADLINES'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : isDark
                  ? 'soft-card-dark-sm hover:bg-neutral-800/40'
                  : 'soft-card-light-sm hover:bg-white/80'
              }`}
            >
              <div className="text-lg font-bold font-mono">{deadlineCount}</div>
              <div className={`text-[11px] font-medium ${activeTab === 'DEADLINES' ? 'text-white/80' : 'text-neutral-400'}`}>
                Explicit Court Deadlines
              </div>
            </button>

            <button
              onClick={() => setActiveTab('GAPS')}
              className={`p-3 rounded-2xl text-left cursor-pointer soft-transition ${
                activeTab === 'GAPS'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : isDark
                  ? 'soft-card-dark-sm hover:bg-neutral-800/40'
                  : 'soft-card-light-sm hover:bg-white/80'
              }`}
            >
              <div className="text-lg font-bold font-mono">{gapCount}</div>
              <div className={`text-[11px] font-medium ${activeTab === 'GAPS' ? 'text-white/80' : 'text-neutral-400'}`}>
                Missing Information Alerts
              </div>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* NAVIGATION TABS & REVIEW FILTERS                             */}
        {/* ============================================================ */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800 pb-1">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-none text-xs font-semibold">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`pb-2.5 relative cursor-pointer soft-transition ${
                  activeTab === 'ALL'
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span>Timeline ({currentCase.events.length})</span>
                {activeTab === 'ALL' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('CONFLICTS')}
                className={`pb-2.5 relative cursor-pointer soft-transition ${
                  activeTab === 'CONFLICTS'
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span>Date Conflicts ({conflictCount})</span>
                {activeTab === 'CONFLICTS' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('DEADLINES')}
                className={`pb-2.5 relative cursor-pointer soft-transition ${
                  activeTab === 'DEADLINES'
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span>Explicit Deadlines ({deadlineCount})</span>
                {activeTab === 'DEADLINES' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('GAPS')}
                className={`pb-2.5 relative cursor-pointer soft-transition ${
                  activeTab === 'GAPS'
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span>Missing Info ({gapCount})</span>
                {activeTab === 'GAPS' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('ANALYTICS')}
                className={`pb-2.5 relative cursor-pointer soft-transition ${
                  activeTab === 'ANALYTICS'
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span>Analytics Dashboard</span>
                {activeTab === 'ANALYTICS' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </div>

            {/* Kotlin Architecture Toggle */}
            <button
              onClick={() => setActiveTab(activeTab === 'KOTLIN_CODE' ? 'ALL' : 'KOTLIN_CODE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer soft-transition ${
                activeTab === 'KOTLIN_CODE'
                  ? 'soft-btn-primary'
                  : isDark
                  ? 'soft-btn-secondary-dark'
                  : 'soft-btn-secondary-light'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kotlin Architecture</span>
            </button>
          </div>

          {/* Filtering Sub-Bar: Review Status & Event Types */}
          {(activeTab === 'ALL' || activeTab === 'CONFLICTS') && (
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-xs">
              {/* Review Status Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mr-1">
                  Review Status:
                </span>
                <button
                  onClick={() => setSelectedReviewStatus('ALL')}
                  className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    selectedReviewStatus === 'ALL'
                      ? 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-neutral-800 text-neutral-400'
                      : 'bg-neutral-200/60 text-neutral-600'
                  }`}
                >
                  All ({currentCase.events.length})
                </button>
                <button
                  onClick={() => setSelectedReviewStatus('VERIFIED')}
                  className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    selectedReviewStatus === 'VERIFIED'
                      ? 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-neutral-800 text-neutral-400'
                      : 'bg-neutral-200/60 text-neutral-600'
                  }`}
                >
                  Verified ({verifiedCount})
                </button>
                <button
                  onClick={() => setSelectedReviewStatus('PENDING')}
                  className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    selectedReviewStatus === 'PENDING'
                      ? 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-neutral-800 text-neutral-400'
                      : 'bg-neutral-200/60 text-neutral-600'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setSelectedReviewStatus('FLAGGED')}
                  className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    selectedReviewStatus === 'FLAGGED'
                      ? 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-neutral-800 text-neutral-400'
                      : 'bg-neutral-200/60 text-neutral-600'
                  }`}
                >
                  Flagged
                </button>
              </div>

              {/* Event Type Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mr-1">
                  Type:
                </span>
                <select
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold outline-none cursor-pointer ${
                    isDark ? 'soft-inset-dark text-neutral-200' : 'soft-inset-light text-neutral-700'
                  }`}
                >
                  <option value="ALL">All Event Types</option>
                  <option value="FILING">Pleadings / Filings</option>
                  <option value="ORDER">Judicial Orders</option>
                  <option value="DISCOVERY">Discovery &amp; Subpoenas</option>
                  <option value="HEARING">Hearings &amp; Minutes</option>
                  <option value="COMMUNICATION">Communications</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* MAIN FEED: TIMELINE WITH OPTIONAL SIDE-BY-SIDE PANEL         */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Column */}
          <div className="grow min-w-0 w-full space-y-4">
            {activeTab === 'KOTLIN_CODE' ? (
              <KotlinArchitectureViewer isDark={isDark} />
            ) : activeTab === 'ANALYTICS' ? (
              <AnalyticsDashboard
                caseData={currentCase}
                isDark={isDark}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            ) : activeTab === 'DEADLINES' ? (
              <div className="space-y-4">
                <div className="text-xs text-neutral-400 px-1">
                  Showing strictly explicit, court-mandated deadlines directly stated in records. Absolutely zero computed or extrapolated dates.
                </div>
                {currentCase.explicitDeadlines.map((dl) => (
                  <DeadlineCard key={dl.id} deadline={dl} isDark={isDark} />
                ))}
              </div>
            ) : activeTab === 'GAPS' ? (
              <div className="space-y-4">
                <div className="text-xs text-neutral-400 px-1">
                  Missing Information Alerts: Identified references to orders or records missing from the docket or sequential chain.
                </div>
                {currentCase.gaps.map((gap) => (
                  <GapCard key={gap.id} gap={gap} isDark={isDark} />
                ))}
              </div>
            ) : (
              <div>
                {filteredEvents.length === 0 ? (
                  <div className="py-16 text-center text-xs text-neutral-400">
                    No records match the active search or filter criteria.
                  </div>
                ) : (
                  filteredEvents.map((event, idx) => (
                    <TimelineNodeCard
                      key={event.id}
                      event={event}
                      isFirst={idx === 0}
                      isLast={idx === filteredEvents.length - 1}
                      isExpanded={expandedEventIds.has(event.id)}
                      isDark={isDark}
                      onToggleExpand={() => toggleEventExpansion(event.id)}
                      onLegalTermClick={(term, context, sourceDoc) => {
                        setActiveTermModal({ term, context, sourceDoc });
                      }}
                      onReviewClick={() => setEventToReview(event)}
                      onViewInDocClick={() => {
                        setActiveInspectedEvent(event);
                        setIsSidePanelOpen(true);
                      }}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Side-by-Side Document Viewer Panel */}
          {isSidePanelOpen && (
            <DocumentSidePanel
              documents={currentCase.documents}
              activeEvent={activeInspectedEvent}
              rawText={currentCase.rawText}
              isDark={isDark}
              onClose={() => setIsSidePanelOpen(false)}
            />
          )}
        </div>

        {/* ============================================================ */}
        {/* FLOATING THUMB NAVIGATION PILL                               */}
        {/* ============================================================ */}
        <div className="sticky bottom-6 flex justify-center pt-4">
          <div
            className={`px-6 py-2.5 rounded-full flex items-center gap-6 sm:gap-8 soft-transition ${
              isDark ? 'soft-card-dark' : 'soft-card-light'
            }`}
          >
            <button
              onClick={() => setActiveTab('ALL')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer soft-transition ${
                activeTab === 'ALL' ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('CONFLICTS')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer soft-transition ${
                activeTab === 'CONFLICTS' ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Split className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Conflicts</span>
            </button>

            <button
              onClick={() => setActiveTab('DEADLINES')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer soft-transition ${
                activeTab === 'DEADLINES' ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Deadlines</span>
            </button>

            <button
              onClick={() => setActiveTab('ANALYTICS')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer soft-transition ${
                activeTab === 'ANALYTICS' ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'KOTLIN_CODE' ? 'ALL' : 'KOTLIN_CODE')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer soft-transition ${
                activeTab === 'KOTLIN_CODE' ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Code2 className="w-5 h-5" />
              <span className="text-[10px] font-semibold">Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODALS                                                       */}
      {/* ============================================================ */}
      {/* 1. Legal Terminology Explainer Modal */}
      {activeTermModal && (
        <LegalGlossaryModal
          term={activeTermModal.term}
          contextSentence={activeTermModal.context}
          sourceDocument={activeTermModal.sourceDoc}
          isDark={isDark}
          onClose={() => setActiveTermModal(null)}
        />
      )}

      {/* 2. Review & Verification Modal */}
      {eventToReview && (
        <ReviewSystemModal
          event={eventToReview}
          isDark={isDark}
          onClose={() => setEventToReview(null)}
          onSaveEvent={handleUpdateEvent}
        />
      )}

      {/* 3. Document Ingestion Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        isDark={isDark}
        onClose={() => setIsUploadModalOpen(false)}
        onCaseLoaded={(newCase) => {
          setCasesList((prev) => [newCase, ...prev]);
          setSelectedCaseId(newCase.id);
          setActiveTab('ALL');
        }}
      />
    </div>
  );
}
