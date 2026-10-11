import React from 'react';

export default function ReviewStatusBadge({ status, onChange }) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'verified':
        return { text: '✓ Verified', color: 'var(--accent-emerald)', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'flagged':
        return { text: '⚠️ Flagged', color: 'var(--accent-rose)', bg: 'rgba(244, 63, 94, 0.15)' };
      default:
        return { text: '⏳ Review Pending', color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.15)' };
    }
  };

  const style = getBadgeStyle();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{
        padding: '0.25rem 0.65rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.color}40`
      }}>
        {style.text}
      </span>
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          padding: '0.2rem 0.4rem',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        <option value="pending">Set Pending</option>
        <option value="verified">Verify Entry</option>
        <option value="flagged">Flag Discrepancy</option>
      </select>
    </div>
  );
}
