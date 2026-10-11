import React from 'react';
import DocumentUpload from '../components/DocumentUpload.jsx';
import DocumentList from '../components/DocumentList.jsx';
import { FileText, ShieldAlert, FolderKanban } from 'lucide-react';

export default function Documents({ documents, onUpload, onDelete }) {
  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-midnight-50 text-[#191970] dark:bg-midnight-950/80 dark:text-cyan-300 border border-midnight-200 dark:border-midnight-800">
              Evidence Ingestion
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              MATTER RECORD
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191970] dark:text-white tracking-tight">
            Legal Records & Filings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Upload and audit court orders, affidavits, notices, and pleadings. The natural language engine extracts critical deadlines and detects conflicting statements.
          </p>
        </div>

        {/* Stats chip */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <FolderKanban className="w-5 h-5 text-[#191970] dark:text-cyan-400" />
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {documents?.length || 0} Files Ingested
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">
              Active Case Docket
            </div>
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <DocumentUpload onUploadSuccess={onUpload} />

      {/* Ingested Documents List */}
      <DocumentList documents={documents} onDelete={onDelete} />
    </div>
  );
}
