import React from 'react';

export default function DashboardStats({ stats }) {
  if (!stats) return null;

  const items = [
    { label: 'Documents Ingested', value: stats.total_documents, icon: '📄', color: 'var(--accent-blue)' },
    { label: 'Timeline Milestones', value: stats.total_events, icon: '🗓️', color: 'var(--accent-cyan)' },
    { label: 'Active Deadlines', value: stats.active_deadlines, icon: '⚡', color: 'var(--accent-amber)' },
    { label: 'Contradictions Found', value: stats.detected_conflicts, icon: '⚠️', color: 'var(--accent-rose)' },
    { label: 'Missing Case Records', value: stats.missing_records, icon: '🔍', color: 'var(--accent-purple)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      {items.map((stat, i) => (
        <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
          <div style={{
            fontSize: '1.6rem',
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid var(--border-color)`
          }}>
            {stat.icon}
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
