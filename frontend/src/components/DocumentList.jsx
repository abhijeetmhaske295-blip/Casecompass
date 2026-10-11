import React from 'react';

export default function DocumentList({ documents, onDelete }) {
  if (!documents || documents.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
        No documents uploaded yet. Upload a sample document to begin analysis.
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
            <th style={{ padding: '1rem 1.25rem' }}>Filename</th>
            <th style={{ padding: '1rem 1.25rem' }}>Size</th>
            <th style={{ padding: '1rem 1.25rem' }}>Events Extracted</th>
            <th style={{ padding: '1rem 1.25rem' }}>Status</th>
            <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}>
              <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📑</span> {doc.filename}
              </td>
              <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)' }}>
                {(doc.size_bytes / 1024).toFixed(1)} KB
              </td>
              <td style={{ padding: '1rem 1.25rem' }}>
                <span className="badge badge-info">{doc.event_count} Events</span>
              </td>
              <td style={{ padding: '1rem 1.25rem' }}>
                <span className="badge badge-success">{doc.status}</span>
              </td>
              <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                <button
                  onClick={() => onDelete(doc.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
