import React from 'react';
import { formatDate } from '../utils/dateFormat.js';
import ReviewStatusBadge from './ReviewStatusBadge.jsx';

export default function TimelineEvent({ event, onUpdateStatus, onViewSource }) {
  const isDeadline = event.is_deadline;

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      {/* Node bullet */}
      <div style={{
        position: 'absolute',
        left: '-2rem',
        top: '1.25rem',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: isDeadline ? 'var(--accent-amber)' : 'var(--accent-blue)',
        boxShadow: `0 0 10px ${isDeadline ? 'var(--accent-amber)' : 'var(--accent-blue)'}`,
        border: '3px solid var(--bg-primary)'
      }} />

      <div className="card" style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: isDeadline ? 'rgba(245, 158, 11, 0.35)' : 'var(--border-color)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: isDeadline ? 'var(--accent-amber)' : 'var(--accent-cyan)',
                fontWeight: 600
              }}>
                {formatDate(event.date)}
              </span>
              {isDeadline && <span className="badge badge-warning">Statutory Deadline</span>}
            </div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{event.title}</h3>
          </div>
          <ReviewStatusBadge
            status={event.review_status}
            onChange={(newStatus) => onUpdateStatus(event.id, newStatus)}
          />
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.6' }}>
          {event.description}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontSize: '0.82rem'
        }}>
          <span style={{ color: 'var(--text-dim)' }}>
            Source: <strong style={{ color: 'var(--text-muted)' }}>{event.document_name}</strong>
          </span>
          <button
            onClick={() => onViewSource(event)}
            className="btn btn-outline"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            🔍 View Source Citation
          </button>
        </div>
      </div>
    </div>
  );
}
