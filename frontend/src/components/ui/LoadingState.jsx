import React from 'react';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem 2rem',
  gap: '1rem',
};

const spinnerStyles = (size, color) => ({
  width: size,
  height: size,
  border: '3px solid var(--color-border-default)',
  borderTopColor: color || 'var(--color-accent-blue)',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
});

const textStyles = {
  fontSize: '0.95rem',
  color: 'var(--color-text-muted)',
  textAlign: 'center',
  maxWidth: '280px',
};

export default function LoadingState({
  message = 'Processing...',
  size = 'md',
  inline = false,
  color,
  className = '',
  style = {},
}) {
  const sizes = {
    sm: '24px',
    md: '40px',
    lg: '56px',
  };

  const combinedStyle = inline
    ? { display: 'inline-flex', flexDirection: 'row', gap: '0.75rem', padding: 0, ...style }
    : { ...containerStyles, ...style };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div
      style={combinedStyle}
      className={className}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div
        style={spinnerStyles(spinnerSize, color)}
        aria-hidden="true"
      />
      {!inline && <p style={textStyles}>{message}</p>}
      {inline && <span style={{ ...textStyles, fontSize: '0.85rem' }}>{message}</span>}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function LoadingOverlay({ isVisible, message = 'Loading...', children }) {
  if (!isVisible) return <>{children}</>;

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(var(--color-bg-primary), 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 'var(--z-modal)',
          borderRadius: 'var(--radius-lg)',
          animation: 'fadeIn var(--transition-fast)',
        }}
        role="status"
        aria-live="polite"
        aria-label={message}
      >
        <LoadingState message={message} size="lg" />
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function Skeleton({ variant = 'text', width = '100%', height, className = '', style = {} }) {
  const baseStyle = {
    background: 'linear-gradient(90deg, var(--color-bg-card) 25%, var(--color-bg-card-hover) 50%, var(--color-bg-card) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: 'var(--radius-sm)',
  };

  const variants = {
    text: { height: height || '1rem', width },
    title: { height: height || '1.5rem', width: width || '60%' },
    card: { height: height || '120px', width: width || '100%', borderRadius: 'var(--radius-lg)' },
    avatar: { height: height || '40px', width: width || '40px', borderRadius: '50%' },
    button: { height: height || '40px', width: width || '120px', borderRadius: 'var(--radius-md)' },
    badge: { height: height || '24px', width: width || '80px', borderRadius: 'var(--radius-full)' },
  };

  return (
    <div
      style={{
        ...baseStyle,
        ...variants[variant],
        ...style,
      }}
      className={className}
      aria-hidden="true"
    />
    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  );
}

export function SkeletonCard({ lines = 3, className = '', style = {} }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        ...style,
      }}
      className={className}
      aria-hidden="true"
    >
      <Skeleton variant="title" style={{ marginBottom: '1rem' }} />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" style={{ marginBottom: i === lines - 1 ? 0 : '0.75rem' }} />
      ))}
    </div>
  );
}