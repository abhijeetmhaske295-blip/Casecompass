import React from 'react';
import { formatDate, getUrgencyBadge } from '../utils/dateFormat.js';

export default function DeadlineList({ deadlines }) {
  if (!deadlines || deadlines.length === 0) {
    return <div className="card" style={{ color: 'var(--text-muted)' }}>No deadlines registered.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {deadlines.map((dl) => {
        const badge = getUrgencyBadge(dl.urgency);
        return (
          <div key={dl.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span className={`badge ${badge.color}`}>{badge.text}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-amber)' }}>
                  Due: {formatDate(dl.due_date)}
                </span>
              </div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{dl.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{dl.notes}</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Source:<br /><strong>{dl.document_name}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}
