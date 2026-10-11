import React from 'react';

export default function SourceViewer({ event, onClose }) {
  if (!event) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="card" style={{ maxWidth: '650px', width: '90%', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>AUDIT TRAIL CITATION</span>
            <h3 style={{ fontSize: '1.25rem' }}>{event.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--text-dim)' }}>
          Document Source: <strong style={{ color: 'var(--text-main)' }}>{event.document_name}</strong>
        </div>

        <div style={{
          background: 'var(--bg-secondary)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid var(--accent-blue)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.88rem',
          lineHeight: '1.7',
          color: 'var(--text-main)',
          marginBottom: '1.5rem',
          whiteSpace: 'pre-wrap'
        }}>
          "{event.source_snippet}"
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary">
            Close Citation
          </button>
        </div>
      </div>
    </div>
  );
}
