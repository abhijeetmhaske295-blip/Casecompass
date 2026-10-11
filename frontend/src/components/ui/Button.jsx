import React from 'react';
import { Loader2 } from './Icons.jsx';

const baseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  borderRadius: 'var(--radius-md)',
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all var(--transition-fast)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
};

const sizeStyles = {
  sm: { padding: '0.4rem 0.8rem', fontSize: '0.8rem' },
  md: { padding: '0.6rem 1.2rem', fontSize: '0.9rem' },
  lg: { padding: '0.8rem 1.5rem', fontSize: '1rem' },
};

const variantStyles = {
  primary: {
    background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-blue-hover))',
    color: '#fff',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
  },
  secondary: {
    background: 'var(--color-bg-card)',
    color: 'var(--color-text-primary)',
    borderColor: 'var(--color-border-default)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-text-primary)',
    borderColor: 'var(--color-border-default)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    borderColor: 'transparent',
  },
  danger: {
    background: 'linear-gradient(135deg, var(--color-accent-rose), #e11d48)',
    color: '#fff',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.35)',
  },
};

const hoverStyles = {
  primary: { filter: 'brightness(1.05)', transform: 'translateY(-1px)' },
  secondary: { background: 'var(--color-bg-card-hover)', borderColor: 'var(--color-text-muted)' },
  outline: { background: 'var(--color-bg-card)', borderColor: 'var(--color-text-muted)' },
  ghost: { background: 'var(--color-bg-card)', color: 'var(--color-text-primary)' },
  danger: { filter: 'brightness(1.05)', transform: 'translateY(-1px)' },
};

const focusStyles = {
  outline: 'none',
  boxShadow: 'var(--color-shadow-focus), 0 0 0 1px var(--color-border-focus)',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) {
  const isDisabled = disabled || loading;

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const combinedStyle = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }),
    ...(fullWidth && { width: '100%' }),
    ...style,
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      aria-label={ariaLabel}
      style={combinedStyle}
      className={className}
      {...props}
    >
      {loading && (
        <Loader2
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
          style={{ animation: 'spin 0.8s linear infinite' }}
          aria-hidden="true"
        />
      )}
      {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}