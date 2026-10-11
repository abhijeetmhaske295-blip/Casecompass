import React from 'react';
import DocumentUpload from '../components/DocumentUpload.jsx';
import DocumentList from '../components/DocumentList.jsx';

export default function Documents({ documents, onUpload, onDelete }) {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Legal Records & Filings</h1>
          <p className="page-subtitle">Upload and inspect motions, orders, and sworn statements for event indexing.</p>
        </div>
      </div>

      <DocumentUpload onUploadSuccess={onUpload} />
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '1rem' }}>
        Upload court orders, notices, witness affidavits, or motions to index them into the case timeline.
      </p>
      <DocumentList documents={documents} onDelete={onDelete} />
    </div>
  );
}
