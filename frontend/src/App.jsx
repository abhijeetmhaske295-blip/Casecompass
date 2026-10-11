import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Documents from './pages/Documents.jsx';
import CaseTimeline from './pages/CaseTimeline.jsx';
import Deadlines from './pages/Deadlines.jsx';
import Issues from './pages/Issues.jsx';
import NotFound from './pages/NotFound.jsx';
import Landing from './pages/Landing.jsx';
import LoadingState from './components/ui/LoadingState.jsx';
import ErrorState from './components/ui/ErrorState.jsx';

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
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [stats, setStats] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [events, setEvents] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [gaps, setGaps] = useState([]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
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
      setError('Failed to load case data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleUpload = async (file) => {
    try {
      await uploadDocument(file);
      await loadAllData();
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload document. Please try again.');
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDocument(docId);
      await loadAllData();
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete document. Please try again.');
    }
  };

  const handleUpdateStatus = async (eventId, newStatus) => {
    try {
      await updateReviewStatus(eventId, newStatus);
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, review_status: newStatus } : e))
      );
    } catch (err) {
      console.error('Status update failed:', err);
      setError('Failed to update review status. Please try again.');
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <ErrorState
          title="Error Loading Data"
          message={error}
          action={{ label: 'Retry', onClick: loadAllData }}
        />
      );
    }

    if (loading) {
      return <LoadingState message="Processing legal timeline intelligence..." size="lg" />;
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
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      default:
        return <NotFound onGoHome={() => setCurrentPage('dashboard')} />;
    }
  };

  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div className="main-content">
        <Navbar
          onMenuClick={handleMenuClick}
          onProfileClick={() => console.log('Profile clicked')}
          onSettingsClick={() => console.log('Settings clicked')}
          onHelpClick={() => console.log('Help clicked')}
          onLogout={() => console.log('Logout clicked')}
        />
        <main id="main-content" role="main" tabIndex={-1}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}