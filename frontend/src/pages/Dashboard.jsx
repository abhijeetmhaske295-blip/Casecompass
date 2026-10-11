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
