import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Compass, Zap, FileText, Clock, AlertTriangle, Scale, Settings, HelpCircle, Moon, Sun } from '../ui/Icons.jsx';
import { useTheme } from '../../context/ThemeContext';
import Badge from '../ui/Badge';
import Tooltip from '../ui/Tooltip';

const navItems = [
  { id: 'landing', label: 'Product Overview', icon: Compass, badge: null },
  { id: 'dashboard', label: 'Dashboard', icon: Zap, badge: null },
  { id: 'documents', label: 'Documents', icon: FileText, badge: null },
  { id: 'timeline', label: 'Case Timeline', icon: Clock, badge: null },
  { id: 'deadlines', label: 'Deadlines', icon: AlertTriangle, badge: null },
  { id: 'issues', label: 'Conflicts & Gaps', icon: Scale, badge: null },
];

export default function Sidebar({ currentPage, onNavigate, isMobileOpen, onMobileClose }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleItemClick = (itemId) => {
    onNavigate(itemId);
    if (isMobileOpen) onMobileClose();
  };

  return (
    <>
      {isMobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-overlay)',
            zIndex: 'calc(var(--z-sticky) - 1)',
            animation: 'fadeIn var(--transition-fast)',
          }}
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      <aside
        style={{
          width: collapsed ? '72px' : '260px',
          minWidth: collapsed ? '72px' : '260px',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border-default)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 1rem',
          transition: 'width var(--transition-normal), min-width var(--transition-normal)',
          zIndex: 'var(--z-sticky)',
          position: isMobileOpen ? 'fixed' : 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          boxShadow: collapsed ? 'var(--color-shadow-dropdown)' : 'none',
        }}
        className="sidebar"
        onMouseEnter={() => !isMobileOpen && setCollapsed(false)}
        onMouseLeave={() => !isMobileOpen && setCollapsed(true)}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          onClick={() => handleItemClick('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 0.75rem 2rem',
            minHeight: '60px',
            cursor: 'pointer',
          }}
          title="Return to Product Overview"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-violet))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <Compass size={20} style={{ color: '#fff' }} />
          </div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', minWidth: 0 }}>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                CaseCompass
              </h2>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-accent-cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Legal Intelligence
              </p>
            </div>
          )}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;

            return (
              <Tooltip
                key={item.id}
                content={collapsed ? item.label : ''}
                placement="right"
                delay={300}
              >
                <button
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: collapsed ? 0 : '0.85rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive
                      ? 'rgba(59, 130, 246, 0.15)'
                      : hoveredItem === item.id
                      ? 'var(--color-bg-card)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--color-accent-blue)'
                      : hoveredItem === item.id
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-muted)',
                    border: isActive
                      ? '1px solid rgba(59, 130, 246, 0.3)'
                      : hoveredItem === item.id
                      ? '1px solid var(--color-border-default)'
                      : '1px solid transparent',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)',
                    border: 'none',
                    width: '100%',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={collapsed ? item.label : undefined}
                >
                  <span style={{ display: 'flex', flexShrink: 0 }}>
                    <Icon size={collapsed ? 20 : 18} aria-hidden="true" />
                  </span>
                  {!collapsed && (
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                  {item.badge && !collapsed && (
                    <Badge variant={item.badge.variant} size="sm">
                      {item.badge.label}
                    </Badge>
                  )}
                </button>
              </Tooltip>
            );
          })}
        </nav>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border-default)',
          }}
        >
          {!collapsed && (
            <div
              style={{
                padding: '1rem',
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-default)',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                AI Model: Legal-FastAPI
              </p>
              <p style={{ margin: 0 }}>Vite + React ES Module</p>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              gap: '0.75rem',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-default)',
              color: 'var(--color-text-muted)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onClick={toggleTheme}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-card-hover)';
              e.currentTarget.style.borderColor = 'var(--color-border-accent)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-card)';
              e.currentTarget.style.borderColor = 'var(--color-border-default)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }}}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span style={{ display: 'flex' }}>
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </span>
            {!collapsed && (
              <span style={{ fontWeight: 500 }}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
          </div>

          {!collapsed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-default)',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg-card-hover)';
                e.currentTarget.style.borderColor = 'var(--color-border-accent)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-bg-card)';
                e.currentTarget.style.borderColor = 'var(--color-border-default)';
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}
            >
              <Settings size={18} aria-hidden="true" />
              <span style={{ fontWeight: 500 }}>Settings</span>
            </div>
          )}

          {!collapsed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-default)',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg-card-hover)';
                e.currentTarget.style.borderColor = 'var(--color-border-accent)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-bg-card)';
                e.currentTarget.style.borderColor = 'var(--color-border-default)';
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}
            >
              <HelpCircle size={18} aria-hidden="true" />
              <span style={{ fontWeight: 500 }}>Help & Docs</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '0.75rem',
              padding: '0.5rem 0.75rem',
              marginTop: '0.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'transparent',
              border: '1px solid transparent',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-card)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            <span style={{ display: 'flex' }}>
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </span>
            {!collapsed && <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}