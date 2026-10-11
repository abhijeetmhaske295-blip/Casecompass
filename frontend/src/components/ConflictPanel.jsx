import React from "react";

export default function ConflictPanel({ conflicts }) {
  const [filter, setFilter] = React.useState('all');
    const s = String(severity || '').toLowerCase();
    if (s === 'high' || s === 'critical') return 'badge-danger';
    if (s === 'medium') return 'badge-warning';
    return 'badge-info';
  };

  if (!conflicts || conflicts.length === 0) {

  const severities = React.useMemo(() => {
    const set = new Set();
    conflicts.forEach((cnf) => set.add(String(cnf.severity || '').toLowerCase()));
    return ['high', 'medium', 'low'];
  }, [conflicts]);

  const filtered = conflicts.filter((cnf) => {
    if (filter === 'all') return true;
    return String(cnf.severity || '').toLowerCase() === filter;
  });

  const badgeFor = (severity) => {
    const s = String(severity || '').toLowerCase();

  if (!conflicts || conflicts.length === 0) {
    return (
      <div className="card" style={{ color: 'var(--accent-emerald)', padding: '2rem', textAlign: 'center' }}>
        No date or testimony contradictions detected across the active records.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '0.35rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            border: filter === 'all' ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
            background: filter === 'all' ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
            color: filter === 'all' ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          All
        </button>
        {severities.map((sev) => (
          <button
            key={sev}
            onClick={() => setFilter(sev)}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: filter === sev ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
              background: filter === sev ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
              color: filter === sev ? 'var(--accent-blue)' : 'var(--text-muted)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {sev.charAt(0).toUpperCase() + sev.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ color: 'var(--text-muted)', padding: '1.5rem', textAlign: 'center' }}>
          No contradictions match the selected severity filter.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filtered.map((cnf) => (
            <div key={cnf.id} className="card" style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className={`badge ${badgeFor(cnf.severity)}`}>{cnf.severity.toUpperCase()}</span>
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
      )}
    </div>
  );
}
    if (s === 'high' || s === 'critical') return 'badge-danger';
    if (s === 'medium') return 'badge-warning';
    return 'badge-info';
  };


