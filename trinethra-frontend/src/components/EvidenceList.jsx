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
    <div className="grid-list">
      {evidence.map((item, idx) => {
        const isFlagged = flaggedItems.has(idx);
        return (
          <div key={idx} className={`detail-card ${isFlagged ? 'flagged-card' : ''}`}>
            <div className="card-header">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className={`signal-badge signal-${item.signal?.toLowerCase()}`}>
                  {item.signal}
                </span>
                <span className="dimension-tag">{item.dimension}</span>
              </div>
              <button 
                className={`flag-btn ${isFlagged ? 'flagged' : ''}`}
                onClick={() => toggleFlag(idx)}
                title="Flag if you disagree with this analysis"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={isFlagged ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
                {isFlagged ? 'Flagged' : 'Flag'}
              </button>
            </div>
            <blockquote className="quote-text">"{item.quote}"</blockquote>
            <p className="interpretation-text"><strong>Interpretation:</strong> {item.interpretation}</p>
          </div>
        );
      })}
    </div>
  );
}
