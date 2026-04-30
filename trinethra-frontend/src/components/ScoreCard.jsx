import React from 'react';

export default function ScoreCard({ score }) {
  if (!score) return null;

  const value = score.value || 0;
  
  // Determine colors based on score value
  let circleColor = 'var(--color-amber)';
  if (value >= 7) circleColor = 'var(--color-green)';
  if (value <= 3) circleColor = 'var(--color-red)';

  const confidenceClass = score.confidence?.toLowerCase() === 'high' ? 'badge-high' : 
                          score.confidence?.toLowerCase() === 'medium' ? 'badge-medium' : 
                          'badge-low';

  return (
    <div className="card score-card">
      <div className="score-header">
        <div className="score-circle" style={{ backgroundColor: circleColor }}>
          {value}
        </div>
        <div className="score-info">
          <h2 className="score-label">{score.label || 'Unlabeled'}</h2>
          {score.band && <p className="score-band">{score.band}</p>}
          <span className={`badge ${confidenceClass}`}>
            {score.confidence || 'Unknown'} Confidence
          </span>
        </div>
      </div>
      
      <p className="score-justification">
        {score.justification}
      </p>

      <div className="draft-note">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        This is a draft — review each section before finalizing.
      </div>
    </div>
  );
}
