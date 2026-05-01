import React from 'react';

export default function ScoreCard({ score }) {
  if (!score) return null;

  const value = score.value || 0;
  
  // Determine colors based on score value
  let scoreColor = 'var(--color-amber)';
  if (value >= 7) scoreColor = 'var(--color-green)';
  if (value <= 3) scoreColor = 'var(--color-red)';

  let confBg = '#f3f4f6';
  let confText = '#6b7280';
  if (score.confidence?.toLowerCase() === 'high') {
    confBg = '#f0fdf4';
    confText = '#16a34a';
  } else if (score.confidence?.toLowerCase() === 'medium') {
    confBg = '#fffbeb';
    confText = '#d97706';
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow-sm)',
      padding: '24px',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ width: '120px', flexShrink: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '64px', fontWeight: '700', color: scoreColor, lineHeight: '1' }}>
            {value}
          </div>
          {score.band && (
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {score.band}
            </div>
          )}
        </div>
        
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {score.label || 'Unlabeled'}
            </h2>
            <span style={{ 
              backgroundColor: confBg, 
              color: confText, 
              padding: '4px 10px', 
              borderRadius: '9999px', 
              fontSize: '12px', 
              fontWeight: '600',
              border: `1px solid ${confText}33`
            }}>
              {score.confidence || 'Unknown'} Confidence
            </span>
          </div>
          
          <p style={{ 
            color: 'var(--color-text-secondary)', 
            fontSize: '14px', 
            lineHeight: '1.6', 
            margin: 0,
            marginTop: '12px'
          }}>
            {score.justification}
          </p>
        </div>
      </div>

      <div style={{ 
        marginTop: '24px',
        backgroundColor: 'var(--color-amber-light)',
        borderLeft: '3px solid var(--color-amber)',
        padding: '10px 14px',
        color: '#b45309',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        ⚠ Draft assessment — review each section before finalizing.
      </div>
    </div>
  );
}
