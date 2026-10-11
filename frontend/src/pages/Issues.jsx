import React from 'react';
import ConflictPanel from '../components/ConflictPanel.jsx';
import MissingDocumentAlert from '../components/MissingDocumentAlert.jsx';

export default function Issues({ conflicts, gaps }) {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Discrepancies & Evidentiary Gaps</h1>
          <p className="page-subtitle">Identify conflicting testimonies and uncited exhibit references.</p>
        </div>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Testimony & Timeline Inconsistencies</h2>
        <ConflictPanel conflicts={conflicts} />
      </div>

      <div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Referenced But Unfiled Documents</h2>
        <MissingDocumentAlert gaps={gaps} />
      </div>
    </div>
  );
}
