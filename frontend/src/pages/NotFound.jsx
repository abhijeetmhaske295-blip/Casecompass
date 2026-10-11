import React from 'react';

export default function NotFound({ onGoHome }) {
  return (
    <div className="page-wrapper" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Requested view does not exist.</p>
      <button onClick={onGoHome} className="btn btn-primary">Return to Dashboard</button>
    </div>
  );
}
