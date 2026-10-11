import React from 'react';
import { Search, FilePlus, FilterX, AlertTriangle, Inbox, CalendarX, Scale } from './Icons.jsx';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem',
  textAlign: 'center',
  background: 'var(--color-bg-card)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-lg)',
};

const iconWrapperStyles = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1.5rem',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border-default)',
};

const titleStyles = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  marginBottom: '0.5rem',
  letterSpacing: '-0.02em',
};

const descriptionStyles = {
  fontSize: '0.95rem',
  color: 'var(--color-text-muted)',
  maxWidth: '320px',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className = '',
  style = {},
}) {
  const iconComponents = {
    search: Search,
    upload: FilePlus,
    filter: FilterX,
    warning: AlertTriangle,
    inbox: Inbox,
    calendar: CalendarX,
    scale: Scale,
  };

  const IconComponent = icon && iconComponents[icon] ? iconComponents[icon] : icon;

  const iconColors = {
    default: 'var(--color-text-muted)',
    warning: 'var(--color-accent-amber)',
    error: 'var(--color-accent-rose)',
    success: 'var(--color-accent-emerald)',
    info: 'var(--color-accent-blue)',
  };

  return (
    <div
      style={{
        ...containerStyles,
        ...style,
      }}
      className={className}
    >
      {IconComponent && (
        <div style={iconWrapperStyles}>
          <IconComponent
            size={32}
            style={{ color: iconColors[variant] }}
            aria-hidden="true"
          />
        </div>
      )}
      {title && <h3 style={titleStyles}>{title}</h3>}
      {description && <p style={descriptionStyles}>{description}</p>}
      {action && (
        <div style={{ marginTop: '0.5rem' }}>
          {action}
        </div>
      )}
    </div>
  );
}

export function NoResultsEmptyState({ onClearFilters, filterCount }) {
  return (
    <EmptyState
      icon="filter"
      title="No Results Found"
      description={
        filterCount > 0
          ? `Your ${filterCount} active filter${filterCount !== 1 ? 's' : ''} returned no matches.`
          : 'Try adjusting your search or filters to find what you need.'
      }
      action={filterCount > 0 && (
        <button
          onClick={onClearFilters}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.85rem',
            background: 'transparent',
            color: 'var(--color-accent-blue)',
            border: '1px solid var(--color-accent-blue)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-accent-blue)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-accent-blue)';
          }}
        >
          Clear Filters
        </button>
      )}
    />
  );
}

export function NoDocumentsEmptyState({ onUpload }) {
  return (
    <EmptyState
      icon="upload"
      title="No Documents Yet"
      description="Upload your first legal document to begin building the case timeline and extracting key intelligence."
      action={onUpload && (
        <button
          onClick={onUpload}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.9rem',
            background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-blue-hover))',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.05)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'none';
            e.currentTarget.style.transform = 'none';
          }}
        >
          Upload Document
        </button>
      )}
    />
  );
}

export function NoTimelineEventsEmptyState() {
  return (
    <EmptyState
      icon="inbox"
      title="No Timeline Events"
      description="Upload documents and run analysis to automatically extract key dates, milestones, and events for your case timeline."
    />
  );
}

export function NoDeadlinesEmptyState() {
  return (
    <EmptyState
      icon="calendar"
      title="No Active Deadlines"
      description="All caught up. New deadlines will appear here as documents are analyzed and key dates are extracted."
    />
  );
}

export function NoConflictsEmptyState() {
  return (
    <EmptyState
      icon="scale"
      variant="success"
      title="No Contradictions Detected"
      description="✓ No date or testimony contradictions detected across the active records. Your evidentiary timeline is consistent."
    />
  );
}