const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE}/analysis/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchTimelineEvents(search = '', docId = '') {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (docId) params.append('doc_id', docId);
  const res = await fetch(`${API_BASE}/analysis/timeline?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch timeline');
  return res.json();
}

export async function fetchDeadlines() {
  const res = await fetch(`${API_BASE}/analysis/deadlines`);
  if (!res.ok) throw new Error('Failed to fetch deadlines');
  return res.json();
}

export async function fetchConflicts() {
  const res = await fetch(`${API_BASE}/analysis/conflicts`);
  if (!res.ok) throw new Error('Failed to fetch conflicts');
  return res.json();
}

export async function fetchGaps() {
  const res = await fetch(`${API_BASE}/analysis/gaps`);
  if (!res.ok) throw new Error('Failed to fetch gaps');
  return res.json();
}

export async function updateReviewStatus(eventId, status) {
  const res = await fetch(`${API_BASE}/analysis/review-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_id: eventId, status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}
