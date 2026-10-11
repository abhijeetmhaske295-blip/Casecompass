import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function DocumentUpload({ onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const [recentUploaded, setRecentUploaded] = useState(null);
  const fileInputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      setError(null);
      setRecentUploaded(null);
      await onUploadSuccess(file);
      setRecentUploaded(file.name);
      setTimeout(() => setRecentUploaded(null), 5000);
    } catch (err) {
      setError(err.message || 'Failed to process and index document.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative bg-white dark:bg-[#1E293B] border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 shadow-sm ${
        dragOver
          ? 'border-[#191970] dark:border-cyan-400 bg-midnight-50/50 dark:bg-midnight-950/40 ring-4 ring-midnight-100 dark:ring-midnight-900/50'
          : 'border-slate-300 dark:border-slate-700/80 hover:border-[#191970] dark:hover:border-cyan-400'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.doc,.docx,.pdf"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
        id="case-doc-upload"
      />

      <div className="flex flex-col items-center max-w-lg mx-auto">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 ${
          dragOver ? 'scale-110' : ''
        } ${
          isUploading
            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
            : 'bg-midnight-50 dark:bg-midnight-950/60 text-[#191970] dark:text-cyan-300'
        }`}>
          {isUploading ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <UploadCloud className="w-7 h-7" />
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {isUploading ? 'Extracting Events & Indexing Evidence...' : 'Upload Case Documents & Evidentiary Filings'}
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed max-w-md">
          Drag and drop court orders, discovery notices, witness affidavits, or exhibits.
          CaseCompass will automatically parse timeline milestones and citation anchors.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <label
            htmlFor="case-doc-upload"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
              isUploading
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-[#191970] hover:bg-[#121255] text-white cursor-pointer hover:shadow-md active:scale-95'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-300" />
            <span>{isUploading ? 'Processing...' : 'Browse Local Filing'}</span>
          </label>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 font-mono">
          Accepted Formats: .TXT, .PDF, .DOCX (up to 25MB)
        </p>

        {recentUploaded && (
          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Successfully ingested and extracted: {recentUploaded}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
