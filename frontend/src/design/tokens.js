export const colors = {
  dark: {
    bg: {
      primary: '#0b0f19',
      secondary: '#111827',
      card: '#1f293d',
      cardHover: '#26334d',
      input: '#151e2e',
    },
    border: {
      default: '#2b3952',
      accent: '#3b82f6',
      focus: '#3b82f6',
      error: '#f43f5e',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#94a3b8',
      dim: '#64748b',
      inverse: '#0b0f19',
    },
    accent: {
      blue: '#3b82f6',
      blueHover: '#2563eb',
      cyan: '#06b6d4',
      violet: '#8b5cf6',
      amber: '#f59e0b',
      emerald: '#10b981',
      rose: '#f43f5e',
    },
    badge: {
      info: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
      warning: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
      danger: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.3)' },
      success: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
    },
    shadow: {
      glow: '0 0 25px rgba(59, 130, 246, 0.15)',
      card: '0 4px 20px rgba(0, 0, 0, 0.25)',
      dropdown: '0 10px 40px rgba(0, 0, 0, 0.4)',
      focus: '0 0 0 3px rgba(59, 130, 246, 0.4)',
    },
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  light: {
    bg: {
      primary: '#f8fafc',
      secondary: '#ffffff',
      card: '#ffffff',
      cardHover: '#f1f5f9',
      input: '#ffffff',
    },
    border: {
      default: '#e2e8f0',
      accent: '#3b82f6',
      focus: '#3b82f6',
      error: '#f43f5e',
    },
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
      dim: '#94a3b8',
      inverse: '#ffffff',
    },
    accent: {
      blue: '#2563eb',
      blueHover: '#1d4ed8',
      cyan: '#0891b2',
      violet: '#7c3aed',
      amber: '#d97706',
      emerald: '#059669',
      rose: '#e11d48',
    },
    badge: {
      info: { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' },
      warning: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706', border: 'rgba(245, 158, 11, 0.2)' },
      danger: { bg: 'rgba(244, 63, 94, 0.1)', text: '#e11d48', border: 'rgba(244, 63, 94, 0.2)' },
      success: { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669', border: 'rgba(16, 185, 129, 0.2)' },
    },
    shadow: {
      glow: '0 0 25px rgba(59, 130, 246, 0.1)',
      card: '0 2px 12px rgba(0, 0, 0, 0.08)',
      dropdown: '0 10px 40px rgba(0, 0, 0, 0.12)',
      focus: '0 0 0 3px rgba(59, 130, 246, 0.3)',
    },
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
};

export const typography = {
  fontFamilies: {
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  fontSizes: {
    xs: '0.7rem',
    sm: '0.85rem',
    base: '0.95rem',
    lg: '1.1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.85rem',
    '4xl': '2.25rem',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  letterSpacing: {
    tight: '-0.03em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

export const radii = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 12px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 25px rgba(0, 0, 0, 0.15)',
  xl: '0 20px 40px rgba(0, 0, 0, 0.2)',
  glow: '0 0 25px rgba(59, 130, 246, 0.15)',
  focus: '0 0 0 3px rgba(59, 130, 246, 0.4)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
};

export const zIndices = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  toast: 600,
};

export const layout = {
  sidebarWidth: '260px',
  sidebarCollapsedWidth: '72px',
  headerHeight: '65px',
  maxContentWidth: '1400px',
  pagePadding: '2rem 2.5rem',
};

export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  transitions,
  breakpoints,
  zIndices,
  layout,
};

export function getCSSVariables(theme = 'dark') {
  const c = colors[theme];
  return `
    --color-bg-primary: ${c.bg.primary};
    --color-bg-secondary: ${c.bg.secondary};
    --color-bg-card: ${c.bg.card};
    --color-bg-card-hover: ${c.bg.cardHover};
    --color-bg-input: ${c.bg.input};
    --color-border-default: ${c.border.default};
    --color-border-accent: ${c.border.accent};
    --color-border-focus: ${c.border.focus};
    --color-border-error: ${c.border.error};
    --color-text-primary: ${c.text.primary};
    --color-text-secondary: ${c.text.secondary};
    --color-text-muted: ${c.text.muted};
    --color-text-dim: ${c.text.dim};
    --color-text-inverse: ${c.text.inverse};
    --color-accent-blue: ${c.accent.blue};
    --color-accent-blue-hover: ${c.accent.blueHover};
    --color-accent-cyan: ${c.accent.cyan};
    --color-accent-violet: ${c.accent.violet};
    --color-accent-amber: ${c.accent.amber};
    --color-accent-emerald: ${c.accent.emerald};
    --color-accent-rose: ${c.accent.rose};
    --color-badge-info-bg: ${c.badge.info.bg};
    --color-badge-info-text: ${c.badge.info.text};
    --color-badge-info-border: ${c.badge.info.border};
    --color-badge-warning-bg: ${c.badge.warning.bg};
    --color-badge-warning-text: ${c.badge.warning.text};
    --color-badge-warning-border: ${c.badge.warning.border};
    --color-badge-danger-bg: ${c.badge.danger.bg};
    --color-badge-danger-text: ${c.badge.danger.text};
    --color-badge-danger-border: ${c.badge.danger.border};
    --color-badge-success-bg: ${c.badge.success.bg};
    --color-badge-success-text: ${c.badge.success.text};
    --color-badge-success-border: ${c.badge.success.border};
    --color-shadow-glow: ${c.shadow.glow};
    --color-shadow-card: ${c.shadow.card};
    --color-shadow-dropdown: ${c.shadow.dropdown};
    --color-shadow-focus: ${c.shadow.focus};
    --color-overlay: ${c.overlay};
    --font-sans: ${typography.fontFamilies.sans};
    --font-mono: ${typography.fontFamilies.mono};
    --radius-sm: ${radii.sm};
    --radius-md: ${radii.md};
    --radius-lg: ${radii.lg};
    --radius-xl: ${radii.xl};
    --radius-full: ${radii.full};
    --transition-fast: ${transitions.fast};
    --transition-normal: ${transitions.normal};
    --transition-slow: ${transitions.slow};
    --sidebar-width: ${layout.sidebarWidth};
    --header-height: ${layout.headerHeight};
    --max-content-width: ${layout.maxContentWidth};
    --bg-primary: ${c.bg.primary};
    --bg-secondary: ${c.bg.secondary};
    --bg-card: ${c.bg.card};
    --bg-card-hover: ${c.bg.cardHover};
    --border-color: ${c.border.default};
    --border-accent: ${c.border.accent};
    --text-main: ${c.text.primary};
    --text-muted: ${c.text.muted};
    --text-dim: ${c.text.dim};
    --accent-blue: ${c.accent.blue};
    --accent-cyan: ${c.accent.cyan};
    --accent-amber: ${c.accent.amber};
    --accent-emerald: ${c.accent.emerald};
    --accent-rose: ${c.accent.rose};
    --accent-purple: ${c.accent.violet};
    --shadow-glow: ${c.shadow.glow};
  `;
}

export default tokens;