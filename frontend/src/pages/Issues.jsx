import React, { useState } from 'react';
import ConflictPanel from '../components/ConflictPanel.jsx';
import MissingDocumentAlert from '../components/MissingDocumentAlert.jsx';
import ExportReport from '../components/ExportReport.jsx';
import {
  AlertTriangle,
  FileSearch,
  Scale,
  ShieldAlert,
  ArrowRight,
  UploadCloud,
} from 'lucide-react';

export default function Issues({ conflicts = [], gaps = [], onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              Integrity Audit
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              EVIDENTIARY GAPS & CONFLICTS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191970] dark:text-white tracking-tight">
            Discrepancies & Evidentiary Gaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Cross-document contradiction detector and missing evidence radar. Flag perjury risks and missing trial exhibits before depositions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportReport />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Detected Factual Contradictions
            </div>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
              {conflicts.length}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Conflicting statements between sworn affidavits and court orders
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Referenced But Unfiled Exhibits
            </div>
            <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">
              {gaps.length}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Orders or exhibits cited in filings without backing documents
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
            <FileSearch className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#191970] text-white shadow-sm'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          All Issues ({conflicts.length + gaps.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('conflicts')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'conflicts'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          Contradictions ({conflicts.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gaps')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'gaps'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          Unfiled Record Gaps ({gaps.length})
        </button>
      </div>

      {/* Section 1: Contradictions */}
      {(activeTab === 'all' || activeTab === 'conflicts') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Factual & Timeline Contradictions
              </h2>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Cross-exhibit analysis
            </span>
          </div>
          <ConflictPanel conflicts={conflicts} />
        </section>
      )}

      {/* Section 2: Evidentiary Gaps */}
      {(activeTab === 'all' || activeTab === 'gaps') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <FileSearch className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Missing / Referenced Evidentiary Records
              </h2>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Subpoena & production radar
            </span>
          </div>
          <MissingDocumentAlert gaps={gaps} />
        </section>
      )}

      {/* Remediation Action Card */}
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-midnight-50 dark:bg-midnight-950/60 text-[#191970] dark:text-cyan-400 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Cure Evidentiary Defects
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Upload cited exhibits to automatically close missing record alerts and resolve contradictory timeline dates.
            </p>
          </div>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('documents')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#191970] hover:bg-[#121255] text-white text-xs font-bold transition-colors shadow-sm flex-shrink-0"
          >
            <UploadCloud className="w-3.5 h-3.5 text-cyan-300" />
            <span>Upload Missing Exhibits</span>
          </button>
        )}
      </div>
    </div>
  );
}
