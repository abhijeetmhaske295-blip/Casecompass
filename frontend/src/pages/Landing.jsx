import React from 'react';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import {
  Compass,
  Zap,
  Clock,
  AlertTriangle,
  Scale,
  FileText,
  Shield,
  ArrowRight,
  CheckCircle,
} from '../components/ui/Icons.jsx';

export default function Landing({ onNavigate }) {
  const capabilities = [
    {
      icon: <Clock size={24} color="var(--color-accent-blue)" />,
      title: 'Intelligent Chronological Timeline',
      description:
        'Automatically transforms disparate motions, orders, and filings into a unified chronological case graph with verified milestone markers.',
      actionLabel: 'Explore Timeline',
      actionPage: 'timeline',
      badge: 'Core Engine',
    },
    {
      icon: <AlertTriangle size={24} color="var(--color-accent-amber)" />,
      title: 'Statutory Deadline Radar',
      description:
        'Extracts court-imposed deadlines and categorizes compliance urgency across overdue, urgent (< 30 days), and upcoming procedural dates.',
      actionLabel: 'View Deadlines',
      actionPage: 'deadlines',
      badge: 'Rule 16 Compliance',
    },
    {
      icon: <Scale size={24} color="var(--color-accent-rose)" />,
      title: 'Contradiction & Conflict Engine',
      description:
        'Cross-checks dates and claims across opposing witness statements and filings to flag timeline inconsistencies before trial.',
      actionLabel: 'Inspect Conflicts',
      actionPage: 'issues',
      badge: 'Evidentiary Integrity',
    },
    {
      icon: <FileText size={24} color="var(--color-accent-cyan)" />,
      title: 'Evidentiary Gap Detection',
      description:
        'Identifies referenced exhibits, past orders, or appendices mentioned in pleadings that have not yet been produced in the master record bundle.',
      actionLabel: 'Review Gaps',
      actionPage: 'issues',
      badge: 'Audit Trail',
    },
    {
      icon: <Shield size={24} color="var(--color-accent-emerald)" />,
      title: 'Human-in-the-Loop Verification',
      description:
        'Empowers litigation teams to review, verify, or dispute AI-extracted milestones with full audit trail provenance and source citations.',
      actionLabel: 'View Case Documents',
      actionPage: 'documents',
      badge: 'Audit-Ready',
    },
    {
      icon: <Zap size={24} color="var(--color-accent-violet)" />,
      title: 'Comprehensive Intelligence Reports',
      description:
        'Generate and download courtroom-ready case audit briefs, executive summaries, and structured chronological timelines in one click.',
      actionLabel: 'Open Dashboard',
      actionPage: 'dashboard',
      badge: 'Export Engine',
    },
  ];

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section
        style={{
          textAlign: 'center',
          padding: '3.5rem 1rem 3rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <Badge variant="info" size="lg" leftIcon={<Compass size={14} />}>
            Legal Timeline & Evidentiary Intelligence
          </Badge>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            color: 'var(--color-text-primary)',
          }}
        >
          Transform Complex Court Records into{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Chronological Certainty
          </span>
        </h1>

        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            marginBottom: '2.25rem',
            maxWidth: '740px',
            margin: '0 auto 2.25rem',
          }}
        >
          CaseCompass parses pleadings, court orders, and depositions to build chronological
          milestone graphs, flag conflicting witness statements, surface approaching deadlines,
          and safeguard evidentiary records.
        </p>

        {/* Action CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          <Button
            size="lg"
            variant="primary"
            onClick={() => onNavigate('dashboard')}
            rightIcon={<ArrowRight size={18} />}
          >
            Enter Case Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('timeline')}
            leftIcon={<Clock size={18} />}
          >
            Inspect Case Timeline
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => onNavigate('documents')}
            leftIcon={<FileText size={18} />}
          >
            Manage Filings
          </Button>
        </div>

        {/* Litigation Status Banner */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 1.25rem',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span style={{ display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-emerald)', boxShadow: '0 0 8px var(--color-accent-emerald)' }}></span>
          <span><strong>Active Case:</strong> Apex Corp v. Horizon Dynamics (CV-2024-08912)</span>
        </div>
      </section>

      {/* Feature Architecture Grid */}
      <section style={{ marginTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            Core Legal Intelligence Capabilities
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Built specifically for complex commercial litigation, arbitration, and appellate review.
          </p>
        </div>

        <div className="grid-cols-3">
          {capabilities.map((cap, idx) => (
            <Card key={idx} hoverable={true} padding="lg">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cap.icon}
                </div>
                <Badge variant="neutral" size="sm">
                  {cap.badge}
                </Badge>
              </div>

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.65rem',
                }}
              >
                {cap.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--color-text-muted)',
                  marginBottom: '1.5rem',
                  minHeight: '4.5rem',
                }}
              >
                {cap.description}
              </p>

              <Button
                variant="outline"
                size="sm"
                fullWidth={true}
                onClick={() => onNavigate(cap.actionPage)}
                rightIcon={<ArrowRight size={14} />}
              >
                {cap.actionLabel}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust & Verification Highlights */}
      <section
        style={{
          marginTop: '3.5rem',
          padding: '2.5rem 2rem',
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '0.2rem' }}>
              <CheckCircle size={20} color="var(--color-accent-emerald)" />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Zero Guesswork Parsing
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Legal dates, judicial orders, and parties parsed with deterministic temporal regex and heuristic extraction.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '0.2rem' }}>
              <CheckCircle size={20} color="var(--color-accent-cyan)" />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Full Source Attribution
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Every extracted event links directly back to the excerpt and line of the source filing.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ marginTop: '0.2rem' }}>
              <CheckCircle size={20} color="var(--color-accent-blue)" />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Statutory Radar Protection
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Categorizes countdowns automatically into Overdue, Urgent (&lt; 30d), and Upcoming windows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

