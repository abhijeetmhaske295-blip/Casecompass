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
  const [currentPage, setCurrentPage] = useState('homepage');
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
      case 'homepage':
        return <Homepage onNavigate={setCurrentPage} />;
      default:
        return <NotFound onGoHome={() => setCurrentPage('dashboard')} />;
    }
  };


function Homepage({ onNavigate }) {
  return (
    <div className="homepage">
      <div className="courtroom-hero">
        <div className="court-floor">
          <div className="bench bench--left"></div>
          <div className="bench bench--right"></div>
          <div className="judge-box"></div>
          <div className="witness-stand"></div>
        </div>
        <div className="hero-content">
          <p className="eyebrow">CaseCompass · Legal Intelligence</p>
          <h1>Deliver the <span>truth</span>, not just the timeline.</h1>
          <p className="hero-sub">
            Unified case management platform mapping deadlines, contradictions, and
            missing records into one auditable narrative for every active litigation.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate('dashboard')}>
              Open Case Portal
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('timeline')}>
              View Case Timeline
            </button>
          </div>
        </div>
      </div>

      <section className="feature-grid">
        <div className="feature-card" onClick={() => onNavigate('deadlines')} role="button" tabIndex={0}>
          <span className="feature-icon">&#128205;</span>
          <h2>Deadline Intelligence</h2>
          <p>Critical statutory and procedural dates tracked across every active case, with overdue and urgent alerts routed to the right owner.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('issues')} role="button" tabIndex={0}>
          <span className="feature-icon">&#9888;&#65039;</span>
          <h2>Contradiction Detection</h2>
          <p>Automated cross-document analysis flags conflicting testimonies, dates, and citations that require human review.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('documents')} role="button" tabIndex={0}>
          <span className="feature-icon">&#128222;</span>
          <h2>Missing-Record Finder</h2>
          <p>Intelligent gap analysis surfaces referenced-but-unfiled documents so no exhibit is left behind in the bundle.</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('timeline')} role="button" tabIndex={0}>
          <span className="feature-icon">&#128247;</span>
          <h2>Source-Verified Timeline</h2>
          <p>Every milestone is tied to a document citation, letting attorneys audit the underlying evidence at a glance.</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How CaseCompass Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Upload Records</h3>
            <p>Ingest motions, orders, and sworn statements. The parser extracts events, dates, and citation anchors automatically.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>AI Analysis</h3>
            <p>The Legal-FastAPI engine indexes milestones, computes urgency, and runs contradiction and gap detection in real time.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Review & Export</h3>
            <p>Verify human-review statuses, compare source citations, and export a single executive brief or CSV export.</p>
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <p>CaseCompass · Built for litigation teams who need clarity under deadline.</p>
        <p>&copy; {new Date().getFullYear()} CaseCompass. All rights reserved.</p>
      </footer>
    </div>
  );
}

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main-content">
        <Navbar onNavigate={setCurrentPage} />
        {renderContent()}
      </div>
    </div>
  );
}
