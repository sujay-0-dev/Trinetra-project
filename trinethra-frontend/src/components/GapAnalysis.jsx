import React from 'react';

export default function GapAnalysis({ gaps }) {
  if (!gaps || gaps.length === 0) {
    return (
      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        padding: '1.25rem',
        borderRadius: '8px',
        color: '#166534',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontWeight: '600'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        No major gaps detected
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {gaps.map((item, idx) => (
        <div key={idx} style={{
          display: 'flex',
          gap: '1rem',
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          padding: '1.25rem',
          borderRadius: '8px'
        }}>
          <div style={{ color: '#e11d48' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ display: 'block', color: '#be123c', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              {item.dimension}
            </strong>
            <p style={{ margin: 0, color: '#881337', fontSize: '1rem', lineHeight: '1.5' }}>
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
