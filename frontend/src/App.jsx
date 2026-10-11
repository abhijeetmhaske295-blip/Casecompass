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
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('casecompass_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [stats, setStats] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [events, setEvents] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [gaps, setGaps] = useState([]);

  // Sync dark class with document element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('casecompass_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('casecompass_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

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
        return <Deadlines deadlines={deadlines} onNavigate={setCurrentPage} />;
      case 'issues':
        return <Issues conflicts={conflicts} gaps={gaps} onNavigate={setCurrentPage} />;
      default:
        return <NotFound onGoHome={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 flex font-sans transition-colors duration-200">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        counts={{
          documents: documents.length,
          events: events.length,
          deadlines: deadlines.length,
          issues: conflicts.length + gaps.length,
        }}
      />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />
        <main className="flex-1 pb-16">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
