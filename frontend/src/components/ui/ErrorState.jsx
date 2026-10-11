import React from 'react';
import { AlertTriangle, RefreshCw, XCircle, WifiOff, Server, FileQuestion } from './Icons.jsx';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem 2rem',
  textAlign: 'center',
  background: 'var(--color-bg-card)',
  border: '1px solid var(--color-border-error)',
  borderRadius: 'var(--radius-lg)',
};

const iconWrapperStyles = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1.25rem',
  background: 'rgba(244, 63, 94, 0.1)',
  border: '1px solid rgba(244, 63, 94, 0.2)',
};

const titleStyles = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  marginBottom: '0.5rem',
  letterSpacing: '-0.02em',
};

const messageStyles = {
  fontSize: '0.9rem',
  color: 'var(--color-text-muted)',
  maxWidth: '360px',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
};

const buttonStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.6rem 1.2rem',
  borderRadius: 'var(--radius-md)',
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
};

const buttonVariants = {
  primary: {
    background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-blue-hover))',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
  },
  secondary: {
    background: 'var(--color-bg-card)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border-default)',
  },
};

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  icon = 'alert',
  variant = 'default',
  action,
  secondaryAction,
  className = '',
  style = {},
}) {
  const icons = {
    alert: AlertTriangle,
    network: WifiOff,
    server: Server,
    notFound: FileQuestion,
    forbidden: XCircle,
  };

  const IconComponent = icons[icon] || icons.alert;

  return (
    <div
      style={{
        ...containerStyles,
        ...style,
      }}
      className={className}
      role="alert"
    >
      <div style={iconWrapperStyles}>
        <IconComponent size={24} style={{ color: 'var(--color-accent-rose)' }} aria-hidden="true" />
      </div>
      <h3 style={titleStyles}>{title}</h3>
      <p style={messageStyles}>{message}</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {action && (
          <button
            onClick={action.onClick}
            disabled={action.disabled}
            style={{
              ...buttonStyles,
              ...buttonVariants[action.variant || 'primary'],
              opacity: action.disabled ? 0.5 : 1,
              cursor: action.disabled ? 'not-allowed' : 'pointer',
            }}
            aria-label={action['aria-label']}
          >
            {action.loading && <RefreshCw size={16} style={{ animation: 'spin 0.8s linear infinite' }} aria-hidden="true" />}
            <span>{action.label || 'Try Again'}</span>
            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            style={{
              ...buttonStyles,
              ...buttonVariants.secondary,
            }}
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}

export function NetworkError({ onRetry, onOffline }) {
  return (
    <ErrorState
      title="Connection Lost"
      message="Unable to reach the server. Please check your internet connection and try again."
      icon="network"
      action={{ label: 'Retry', onClick: onRetry }}
      secondaryAction={{ label: 'Work Offline', onClick: onOffline }}
    />
  );
}

export function ServerError({ onRetry, onReport }) {
  return (
    <ErrorState
      title="Server Error"
      message="Our servers encountered an issue. We've been notified and are working on a fix."
      icon="server"
      action={{ label: 'Retry', onClick: onRetry }}
      secondaryAction={onReport ? { label: 'Report Issue', onClick: onReport } : undefined}
    />
  );
}

export function NotFoundError({ resource = 'Resource', onGoBack }) {
  return (
    <ErrorState
      title={`${resource} Not Found`}
      message={`The ${resource.toLowerCase()} you're looking for doesn't exist or has been moved.`}
      icon="notFound"
      action={onGoBack ? { label: 'Go Back', onClick: onGoBack, variant: 'secondary' } : undefined}
    />
  );
}

export function ForbiddenError({ onLogin }) {
  return (
    <ErrorState
      title="Access Denied"
      message="You don't have permission to access this resource. Please contact your administrator or log in with appropriate credentials."
      icon="forbidden"
      action={onLogin ? { label: 'Log In', onClick: onLogin } : undefined}
    />
  );
}

export function InlineError({ message, onDismiss, className = '', style = {} }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        background: 'rgba(244, 63, 94, 0.1)',
        border: '1px solid rgba(244, 63, 94, 0.3)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-accent-rose)',
        fontSize: '0.85rem',
        ...style,
      }}
      className={className}
      role="alert"
    >
      <AlertTriangle size={16} aria-hidden="true" flexShrink={0} />
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            opacity: 0.6,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
          aria-label="Dismiss error"
        >
          <XCircle size={16} />
        </button>
      )}
    </div>
  );
}