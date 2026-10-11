import React from 'react';

const baseStyles = {
  background: 'var(--color-bg-card)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--color-shadow-card)',
  transition: 'all var(--transition-fast)',
};

const paddingStyles = {
  none: '0',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
};

const hoverStyles = {
  borderColor: 'var(--color-border-accent)',
  boxShadow: 'var(--color-shadow-glow), var(--color-shadow-card)',
};

export default function Card({
  children,
  padding = 'md',
  hoverable = false,
  bordered = true,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const isInteractive = typeof onClick === 'function';

  const combinedStyle = {
    ...baseStyles,
    padding: paddingStyles[padding],
    ...(bordered ? {} : { border: 'none' }),
    ...(isInteractive && { cursor: 'pointer' }),
    ...style,
  };

  const handleKeyDown = (e) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  const Component = isInteractive ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
      style={combinedStyle}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = '', style = {}, ...props }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', style = {}, ...props }) {
  return (
    <h3
      style={{
        fontSize: '1.1rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        letterSpacing: '-0.02em',
        margin: 0,
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', style = {}, ...props }) {
  return (
    <p
      style={{
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        margin: '0.25rem 0 0',
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', style = {}, ...props }) {
  return (
    <div
      style={{
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', style = {}, ...props }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '0.75rem',
        paddingTop: '1rem',
        marginTop: '1rem',
        borderTop: '1px solid var(--color-border-default)',
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}