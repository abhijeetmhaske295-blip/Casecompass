import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Documents from './pages/Documents.jsx';
import CaseTimeline from './pages/CaseTimeline.jsx';
import Deadlines from './pages/Deadlines.jsx';
import Issues from './pages/Issues.jsx';
import NotFound from './pages/NotFound.jsx';
import LoadingState from './components/LoadingState.jsx';

import { fetchDocuments, uploadDocument, deleteDocument } from './api/documents.js';
import {
  fetchDashboardStats,
  fetchTimelineEvents,
  fetchDeadlines,
  fetchConflicts,
  fetchGaps,
  updateReviewStatus
} from './api/analysis.js';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [events, setEvents] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [gaps, setGaps] = useState([]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [statsData, docsData, eventsData, deadlinesData, conflictsData, gapsData] = await Promise.all([
        fetchDashboardStats().catch(() => null),
        fetchDocuments().catch(() => []),
        fetchTimelineEvents().catch(() => []),
        fetchDeadlines().catch(() => []),
        fetchConflicts().catch(() => []),
        fetchGaps().catch(() => []),
      ]);

      setStats(statsData);
      setDocuments(docsData);
      setEvents(eventsData);
      setDeadlines(deadlinesData);
      setConflicts(conflictsData);
      setGaps(gapsData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleUpload = async (file) => {
    await uploadDocument(file);
    await loadAllData();
  };

  const handleDelete = async (docId) => {
    await deleteDocument(docId);
    await loadAllData();
  };

  const handleUpdateStatus = async (eventId, newStatus) => {
    await updateReviewStatus(eventId, newStatus);
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, review_status: newStatus } : e))
    );
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Processing legal timeline intelligence..." />;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            stats={stats}
            conflicts={conflicts}
            deadlines={deadlines}
            gaps={gaps}
            onNavigate={setCurrentPage}
          />
        );
      case 'documents':
        return (
          <Documents
            documents={documents}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />
        );
      case 'timeline':
        return (
          <CaseTimeline
            events={events}
            documents={documents}
            onUpdateStatus={handleUpdateStatus}
          />
        );
      case 'deadlines':
        return <Deadlines deadlines={deadlines} />;
      case 'issues':
        return <Issues conflicts={conflicts} gaps={gaps} />;
      default:
        return <NotFound onGoHome={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main-content">
        <Navbar />
        {renderContent()}
      </div>
    </div>
  );
}
