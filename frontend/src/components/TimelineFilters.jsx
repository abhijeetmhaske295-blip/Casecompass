import React from 'react';

export default function TimelineFilters({ documents, selectedDoc, onSelectDoc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter by Doc:</span>
      <select
        value={selectedDoc}
        onChange={(e) => onSelectDoc(e.target.value)}
        style={{
          padding: '0.55rem 0.9rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-main)',
          fontSize: '0.85rem',
          cursor: 'pointer'
        }}
      >
        <option value="">All Documents ({documents.length})</option>
        {documents.map((d) => (
          <option key={d.id} value={d.id}>
            {d.filename}
          </option>
        ))}
      </select>
    </div>
  );
}
