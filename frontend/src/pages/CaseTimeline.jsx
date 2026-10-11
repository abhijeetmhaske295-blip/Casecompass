import React, { useState } from 'react';
import Timeline from '../components/Timeline.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TimelineFilters from '../components/TimelineFilters.jsx';
import SourceViewer from '../components/SourceViewer.jsx';
import ExportReport from '../components/ExportReport.jsx';

export default function CaseTimeline({ events, documents, onUpdateStatus }) {
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [viewingSource, setViewingSource] = useState(null);

  const filteredEvents = events.filter((e) => {
    const matchesDoc = !selectedDoc || e.document_id === selectedDoc;
    const matchesSearch = !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    return matchesDoc && matchesSearch;
  });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Chronological Case Timeline</h1>
          <p className="page-subtitle">Chronologically organized milestone record with audit trails and human review verification.</p>
        </div>
        <ExportReport />
      </div>

      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <SearchBar value={search} onChange={setSearch} />
        <TimelineFilters
          documents={documents}
          selectedDoc={selectedDoc}
          onSelectDoc={setSelectedDoc}
        />
        {(search || selectedDoc) && (
          <button
            onClick={() => { setSearch(''); setSelectedDoc(''); }}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            Clear filters
          </button>
        )}
      </div>

      <Timeline
        events={filteredEvents}
        onUpdateStatus={onUpdateStatus}
        onViewSource={(evt) => setViewingSource(evt)}
      />

      <SourceViewer
        event={viewingSource}
        onClose={() => setViewingSource(null)}
      />
    </div>
  );
}
