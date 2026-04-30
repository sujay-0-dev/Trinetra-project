import React from 'react';

export default function KpiMapping({ kpiMapping }) {
  if (!kpiMapping || kpiMapping.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {kpiMapping.map((item, idx) => {
        if (!item.evidence && !item.systemOrPersonal) return null;
        return (
          <div key={idx} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '1.5rem',
            padding: '1rem 1.25rem',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ flex: '1' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#4f46e5' }}>{item.kpi}</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#374151' }}>
                {item.evidence || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>No specific evidence mentioned</span>}
              </p>
            </div>
            {item.systemOrPersonal && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                background: '#ede9fe',
                color: '#5b21b6',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap'
              }}>
                {item.systemOrPersonal}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
