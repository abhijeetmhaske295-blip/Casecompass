import React, { useEffect, useRef, useCallback } from 'react';
import { X } from './Icons.jsx';
import { createPortal } from 'react-dom';

const overlayStyles = {
  position: 'fixed',
  inset: 0,
  background: 'var(--color-overlay)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
  zIndex: 'var(--z-modal)',
  animation: 'fadeIn var(--transition-fast)',
};

const modalStyles = {
  background: 'var(--color-bg-card)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-xl)',
  boxShadow: 'var(--color-shadow-dropdown)',
  maxWidth: '100%',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  animation: 'slideUp var(--transition-normal)',
};

const sizeStyles = {
  sm: { width: '100%', maxWidth: '400px' },
  md: { width: '100%', maxWidth: '560px' },
  lg: { width: '100%', maxWidth: '720px' },
  xl: { width: '100%', maxWidth: '900px' },
  full: { width: '100%', maxWidth: '100%', maxHeight: '100%', height: '100%' },
};

function FocusTrap({ children, active, onDeactivate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTab);
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  style = {},
}) {
  const previousActiveElement = useRef(null);

  const handleClose = useCallback(() => {
    onClose?.();
    previousActiveElement.current?.focus();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, handleClose]);

  if (!isOpen) return null;

  const modalContent = (
    <FocusTrap active={isOpen} onDeactivate={handleClose}>
      <div
        style={{
          ...overlayStyles,
          ...style,
        }}
        className={className}
        onClick={(e) => {
          if (e.target === e.currentTarget && closeOnOverlayClick) {
            handleClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <div style={{ ...modalStyles, ...sizeStyles[size] }}>
          {(title || showCloseButton) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '1.5rem',
                borderBottom: '1px solid var(--color-border-default)',
              }}
            >
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      margin: '0.35rem 0 0',
                    }}
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent',
                    border: '1px solid transparent',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-bg-card-hover)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }}
                  aria-label="Close modal"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '1.5rem',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>
  );

  if (typeof window === 'undefined') return null;

  return createPortal(modalContent, document.body);
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button
          onClick={onClose}
          disabled={loading}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            background: 'var(--color-bg-card)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-default)',
            opacity: loading ? 0.5 : 1,
            transition: 'all var(--transition-fast)',
          }}
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            background: variant === 'danger'
              ? 'linear-gradient(135deg, var(--color-accent-rose), #e11d48)'
              : 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-blue-hover))',
            color: '#fff',
            border: 'none',
            opacity: loading ? 0.5 : 1,
            transition: 'all var(--transition-fast)',
          }}
        >
          {loading ? 'Processing...' : confirmText}
        </button>
      </div>
    </Modal>
  );
}