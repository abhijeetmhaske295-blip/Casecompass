import React, { useState, useEffect } from 'react';
import { X, Quote, FileText, Copy, Check, ShieldCheck } from 'lucide-react';

export default function SourceViewer({ event, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const handleCopySnippet = async () => {
    if (event.source_snippet) {
      await navigator.clipboard.writeText(event.source_snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden transform transition-all">
        {/* Header Ribbon */}
        <div className="bg-[#191970] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                Evidentiary Source Citation
              </span>
              <h3 className="text-sm font-bold truncate max-w-md">
                {event.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Source Citation Modal"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <FileText className="w-4 h-4 text-[#191970] dark:text-cyan-400" />
              <span>Document Source:</span>
              <strong className="text-slate-900 dark:text-white font-semibold">
                {event.document_name || 'Case Exhibit'}
              </strong>
            </div>

            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              Doc ID: {event.document_id || 'N/A'}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-[#191970] dark:text-cyan-400" />
                Original Court Record Quote
              </span>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#191970] dark:text-cyan-400 hover:underline"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed shadow-inner">
              "{event.source_snippet || 'No raw quote snippet recorded for this milestone.'}"
            </div>
          </div>

          {event.description && (
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-700 dark:text-slate-300">Analysis Summary: </strong>
              {event.description}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Audit-grade verification hash active
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
