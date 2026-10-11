import React from 'react';

export default function PageWrapper({
  children,
  className = '',
  style = {},
  fullWidth = false,
  padding = 'default',
}) {
  const paddingStyles = {
    none: '0',
    default: 'var(--spacing-6) var(--spacing-8)',
    sm: 'var(--spacing-4) var(--spacing-6)',
    lg: 'var(--spacing-8) var(--spacing-10)',
  };

  const combinedStyle = {
    maxWidth: fullWidth ? 'none' : 'var(--max-content-width)',
    width: '100%',
    margin: '0 auto',
    padding: paddingStyles[padding] || paddingStyles.default,
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <main
      style={combinedStyle}
      className={className}
      role="main"
    >
      {children}
    </main>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
  badge,
  className = '',
  style = {},
}) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        ...style,
      }}
      className={className}
    >
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
          <h1
            style={{
              fontSize: '1.85rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {title}
          </h1>
          {badge}
        </div>
        {subtitle && (
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div style={{ flexShrink: 0, marginTop: 'auto' }}>
          {action}
        </div>
      )}
    </header>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
  count,
  className = '',
  style = {},
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: '1rem',
        ...style,
      }}
      className={className}
    >
      <div>
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {title}
          {count !== undefined && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-badge-info-bg)',
                color: 'var(--color-badge-info-text)',
                border: '1px solid var(--color-badge-info-border)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {count}
            </span>
          )}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              margin: '0.25rem 0 0',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div style={{ flexShrink: 0 }}>
          {action}
        </div>
      )}
    </div>
  );
}