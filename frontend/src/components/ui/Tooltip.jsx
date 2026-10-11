import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const tooltipStyles = {
  position: 'absolute',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-sm)',
  padding: '0.5rem 0.75rem',
  fontSize: '0.8rem',
  fontWeight: 500,
  color: 'var(--color-text-primary)',
  whiteSpace: 'nowrap',
  zIndex: 'var(--z-tooltip)',
  boxShadow: 'var(--color-shadow-dropdown)',
  pointerEvents: 'none',
  animation: 'fadeIn var(--transition-fast)',
};

const arrowStyles = {
  position: 'absolute',
  width: '8px',
  height: '8px',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border-default)',
  transform: 'rotate(45deg)',
  pointerEvents: 'none',
};

const placementPositions = {
  top: { top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
  bottom: { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
  left: { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  right: { right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
};

const containerStyles = {
  position: 'relative',
  display: 'inline-flex',
};

export default function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 200,
  className = '',
  style = {},
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') hide();
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisible]);

  const tooltipContent = isVisible && content && (
    <div
      ref={tooltipRef}
      style={{
        ...tooltipStyles,
        ...(placement === 'top' && { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }),
        ...(placement === 'bottom' && { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }),
        ...(placement === 'left' && { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' }),
        ...(placement === 'right' && { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' }),
        ...style,
      }}
      className={className}
      role="tooltip"
    >
      {content}
      <div
        style={{
          ...arrowStyles,
          ...placementPositions[placement],
          borderTop: 'none',
          borderRight: 'none',
        }}
      />
    </div>
  );

  return (
    <span
      ref={containerRef}
      style={containerStyles}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {typeof window !== 'undefined' && tooltipContent && createPortal(tooltipContent, document.body)}
    </span>
  );
}