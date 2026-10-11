import React from 'react';

export default function MissingDocumentAlert({ gaps }) {
  if (!gaps || gaps.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {gaps.map((gap) => (
        <div key={gap.id} className="card" style={{ borderColor: 'rgba(139, 92, 246, 0.4)', background: 'rgba(139, 92, 246, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-warning">{gap.importance}</span>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{gap.title}</h4>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Referenced in: <strong>{gap.referenced_in}</strong>. This filing is cited in proceedings but has not been uploaded to the bundle.
          </p>
        </div>
      ))}
    </div>
  );
}
