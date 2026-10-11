import React from 'react';
import TimelineEvent from './TimelineEvent.jsx';

export default function Timeline({ events, onUpdateStatus, onViewSource }) {
  if (!events || events.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
        No timeline events matched the filter criteria.
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
      {/* Central timeline line */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '7px',
        width: '2px',
        background: 'var(--border-color)',
        zIndex: 1
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {events.map((evt) => (
          <TimelineEvent
            key={evt.id}
            event={evt}
            onUpdateStatus={onUpdateStatus}
            onViewSource={onViewSource}
          />
        ))}
      </div>
    </div>
  );
}
