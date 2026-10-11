import React from 'react';
import { downloadReportMarkdown, getCsvExportUrl } from '../api/export.js';
import { triggerDownload } from '../utils/downloadFile.js';

export default function ExportReport() {
  const handleMarkdownDownload = async () => {
    try {
      const content = await downloadReportMarkdown();
      triggerDownload(content, 'CaseCompass_Report.md', 'text/markdown');
    } catch {
      alert('Failed to export report');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <button onClick={handleMarkdownDownload} className="btn btn-outline">
        📝 Export Executive Brief (.md)
      </button>
      <a href={getCsvExportUrl()} download="case_timeline.csv" className="btn btn-primary">
        📊 Export Timeline (.csv)
      </a>
    </div>
  );
}
