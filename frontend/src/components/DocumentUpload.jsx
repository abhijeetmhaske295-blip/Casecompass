import React, { useState } from 'react';

export default function DocumentUpload({ onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      await onUploadSuccess(file);
    } catch (err) {
      setError(err.message || 'Upload error');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="card" style={{
      border: '2px dashed var(--border-color)',
      textAlign: 'center',
      padding: '2.5rem 1.5rem',
      backgroundColor: 'rgba(31, 41, 61, 0.4)',
      marginBottom: '2rem'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📄</div>
      <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Upload Case Documents</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '460px', margin: '0 auto 1.25rem' }}>
        Upload court orders, notices, witness affidavits, or motions (.txt, .pdf). The parser will automatically extract events, dates, and citation anchors.
      </p>
      
      <label className="btn btn-primary" style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}>
        {isUploading ? 'Parsing Document...' : 'Choose Legal Document'}
        <input
          type="file"
          accept=".txt,.doc,.docx,.pdf"
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ display: 'none' }}
        />
      </label>

      {error && (
        <div style={{ marginTop: '1rem', color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
