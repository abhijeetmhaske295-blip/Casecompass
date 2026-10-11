import React from 'react';
import { downloadReportMarkdown, getCsvExportUrl } from '../api/export.js';
import { triggerDownload } from '../utils/downloadFile.js';
import { FileText, FileSpreadsheet } from 'lucide-react';

export default function ExportReport() {
  const handleMarkdownDownload = async () => {
    try {
      const content = await downloadReportMarkdown();
      triggerDownload(content, 'CaseCompass_Executive_Brief.md', 'text/markdown');
    } catch {
      alert('Failed to export executive report');
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={handleMarkdownDownload}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#191970]"
      >
        <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <span>Executive Brief (.md)</span>
      </button>

      <a
        href={getCsvExportUrl()}
        download="casecompass_timeline.csv"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#191970] hover:bg-[#121255] text-white transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[#191970]"
      >
        <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-300" />
        <span>Timeline CSV</span>
      </a>
    </div>
  );
}
