import React from 'react';
import DocumentUpload from '../components/DocumentUpload.jsx';
import DocumentList from '../components/DocumentList.jsx';

export default function Documents({ documents, onUpload, onDelete }) {
  const [uploadMessage, setUploadMessage] = React.useState('');

  React.useEffect(() => {
    if (!uploadMessage) return;
    const timer = setTimeout(() => setUploadMessage(''), 5000);
    return () => clearTimeout(timer);
  }, [uploadMessage]);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Legal Records & Filings</h1>
          <p className="page-subtitle">Upload and inspect motions, orders, and sworn statements for event indexing.</p>
        </div>
      </div>

      {uploadMessage && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399', fontSize: '0.88rem' }}>
          {uploadMessage}
        </div>
      )}

      <DocumentUpload onUploadSuccess={(file) => { onUpload(file); setUploadMessage('Uploaded file. The parser will index events and citation anchors.'); }} />
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '1rem' }}>
        Upload court orders, notices, witness affidavits, or motions to index them into the case timeline.
      </p>
      <DocumentList documents={documents} onDelete={onDelete} />
    </div>
  );
}
