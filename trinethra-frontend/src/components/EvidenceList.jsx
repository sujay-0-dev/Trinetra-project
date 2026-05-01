import React, { useState } from 'react';

export default function EvidenceList({ evidence }) {
  const [flaggedItems, setFlaggedItems] = useState(new Set());

  if (!evidence || evidence.length === 0) return null;

  const toggleFlag = (idx) => {
    const newFlags = new Set(flaggedItems);
    if (newFlags.has(idx)) {
      newFlags.delete(idx);
    } else {
      newFlags.add(idx);
    }
    setFlaggedItems(newFlags);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {evidence.map((item, idx) => {
        const isFlagged = flaggedItems.has(idx);
        
        let signalBg = '#f3f4f6';
        let signalText = '#6b7280';
        if (item.signal?.toLowerCase() === 'positive') {
          signalBg = '#f0fdf4';
          signalText = '#16a34a';
        } else if (item.signal?.toLowerCase() === 'negative') {
          signalBg = '#fef2f2';
          signalText = '#dc2626';
        }
        
        return (
          <div key={idx} style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius)',
            border: `1px solid ${isFlagged ? 'var(--color-amber)' : 'var(--color-border)'}`,
            padding: '16px',
            position: 'relative'
          }}>
            <button
              onClick={() => toggleFlag(idx)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: `1px solid ${isFlagged ? 'var(--color-amber)' : 'var(--color-border)'}`,
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: '600',
                color: isFlagged ? 'var(--color-amber)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              🚩 {isFlagged ? 'Flagged' : 'Flag'}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{
                backgroundColor: signalBg,
                color: signalText,
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {item.signal}
              </span>
              <span style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                fontWeight: '500'
              }}>
                {item.dimension}
              </span>
            </div>
            
            <blockquote style={{
              margin: '10px 0',
              fontStyle: 'italic',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              borderLeft: '3px solid var(--color-border)',
              paddingLeft: '12px',
              lineHeight: '1.6'
            }}>
              "{item.quote}"
            </blockquote>
            
            <p style={{
              margin: '10px 0 0 0',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              lineHeight: '1.6'
            }}>
              <strong style={{ fontWeight: '600' }}>Interpretation:</strong> {item.interpretation}
            </p>
          </div>
        );
      })}
    </div>
  );
}
