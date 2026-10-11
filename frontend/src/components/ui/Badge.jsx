import React from 'react';

const baseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  borderRadius: 'var(--radius-full)',
  border: '1px solid',
  whiteSpace: 'nowrap',
};

const variantStyles = {
  info: {
    background: 'var(--color-badge-info-bg)',
    color: 'var(--color-badge-info-text)',
    borderColor: 'var(--color-badge-info-border)',
  },
  warning: {
    background: 'var(--color-badge-warning-bg)',
    color: 'var(--color-badge-warning-text)',
    borderColor: 'var(--color-badge-warning-border)',
  },
  danger: {
    background: 'var(--color-badge-danger-bg)',
    color: 'var(--color-badge-danger-text)',
    borderColor: 'var(--color-badge-danger-border)',
  },
  success: {
    background: 'var(--color-badge-success-bg)',
    color: 'var(--color-badge-success-text)',
    borderColor: 'var(--color-badge-success-border)',
  },
  neutral: {
    background: 'var(--color-bg-card)',
    color: 'var(--color-text-muted)',
    borderColor: 'var(--color-border-default)',
  },
};

const sizeStyles = {
  sm: { padding: '0.15rem 0.5rem', fontSize: '0.65rem' },
  md: { padding: '0.25rem 0.65rem', fontSize: '0.7rem' },
  lg: { padding: '0.35rem 0.85rem', fontSize: '0.75rem' },
};

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  style = {},
  ...props
}) {
  const combinedStyle = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <span
      style={combinedStyle}
      className={className}
      {...props}
    >
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </span>
  );
}

export function StatusBadge({ status, ...props }) {
  const statusMap = {
    active: { variant: 'success', label: 'Active' },
    pending: { variant: 'warning', label: 'Pending' },
    completed: { variant: 'info', label: 'Completed' },
    failed: { variant: 'danger', label: 'Failed' },
    draft: { variant: 'neutral', label: 'Draft' },
    review: { variant: 'info', label: 'Under Review' },
    approved: { variant: 'success', label: 'Approved' },
    rejected: { variant: 'danger', label: 'Rejected' },
  };

  const config = statusMap[status] || { variant: 'neutral', label: status };
  return <Badge variant={config.variant} {...props}>{config.label}</Badge>;
}

export function UrgencyBadge({ urgency, ...props }) {
  const urgencyMap = {
    critical: { variant: 'danger', label: 'Critical' },
    high: { variant: 'danger', label: 'High' },
    medium: { variant: 'warning', label: 'Medium' },
    low: { variant: 'info', label: 'Low' },
    none: { variant: 'success', label: 'None' },
  };

  const config = urgencyMap[urgency] || { variant: 'neutral', label: urgency };
  return <Badge variant={config.variant} {...props}>{config.label}</Badge>;
}