import React from 'react';
import DashboardStats from '../components/DashboardStats.jsx';
import ConflictPanel from '../components/ConflictPanel.jsx';
import DeadlineList from '../components/DeadlineList.jsx';
import MissingDocumentAlert from '../components/MissingDocumentAlert.jsx';
import ExportReport from '../components/ExportReport.jsx';

export default function Dashboard({ stats, conflicts, deadlines, gaps, onNavigate }) {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Case Intelligence Dashboard</h1>
          <p className="page-subtitle">Unified timeline milestones, pending deadlines, and evidentiary integrity tracking.</p>
        </div>
        <ExportReport />
      </div>

      <DashboardStats stats={stats} />

      <section className="card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Key Milestones</h2>
          <button onClick={() => onNavigate('timeline')} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem' }}>
            View Timeline
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{stats ? stats.total_events : 0}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Timeline Events</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{stats ? stats.total_deadlines : 0}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Deadlines</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{stats ? stats.total_conflicts : 0}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contradictions</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-purple)' }}>{stats ? stats.missing_records : 0}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Missing Records</div>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.75rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>⚠️ Contradictions & Discrepancies</h2>
            <button onClick={() => onNavigate('issues')} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem' }}>
              View All
            </button>
          </div>
          <ConflictPanel conflicts={conflicts} />

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>🔍 Evidentiary Gaps (Missing Records)</h2>
            <MissingDocumentAlert gaps={gaps} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>⚡ Critical Deadlines</h2>
            <button onClick={() => onNavigate('deadlines')} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem' }}>
              View All
            </button>
          </div>
          <DeadlineList deadlines={deadlines} />
        </div>
      </div>
    </div>
  );
}
