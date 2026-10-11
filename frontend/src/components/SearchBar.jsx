import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search events, orders, or parties...' }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.65rem 1rem 0.65rem 2.4rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-main)',
          fontSize: '0.9rem',
          outline: 'none'
        }}
      />
      <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
        🔍
      </span>
    </div>
  );
}
