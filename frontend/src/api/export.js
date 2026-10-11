const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function downloadReportMarkdown() {
  const res = await fetch(`${API_BASE}/export/report`);
  if (!res.ok) throw new Error('Failed to fetch report');
  return res.text();
}

export function getCsvExportUrl() {
  return `${API_BASE}/export/csv`;
}
