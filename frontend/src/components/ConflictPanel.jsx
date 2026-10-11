import React from 'react';

export default function ConflictPanel({ conflicts }) {
  if (!conflicts || conflicts.length === 0) {
    return (
      <div className="card" style={{ color: 'var(--accent-emerald)', padding: '2rem', textAlign: 'center' }}>
        ✓ No date or testimony contradictions detected across the active records.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {conflicts.map((cnf) => (
        <div key={cnf.id} className="card" style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-danger">Contradiction: {cnf.severity.toUpperCase()}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ID: {cnf.id}</span>
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{cnf.topic}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{cnf.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Record A Entry</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>{cnf.date_a}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cnf.source_a}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Record B Entry</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-rose)' }}>{cnf.date_b}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cnf.source_b}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
