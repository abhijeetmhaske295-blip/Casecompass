import React from 'react';

export default function Navbar({ activeCase = 'Apex Corp v. Horizon Dynamics (CV-2024-08912)' }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'documents', label: 'Documents' },
    { id: 'timeline', label: 'Case Timeline' },
    { id: 'deadlines', label: 'Deadlines' },
    { id: 'issues', label: 'Conflicts & Gaps' },
  ];
  return (
    <header style={{
      height: '65px',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ACTIVE LITIGATION:</span>
        <span style={{ fontWeight: 600, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
          {activeCase}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)' }}></div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Engine Ready</span>
        </div>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
          LC
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.85 }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              fontWeight: 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'; e.currentTarget.style.color = 'var(--text-main)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
