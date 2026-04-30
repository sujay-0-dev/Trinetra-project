import React from 'react';
import './AnalysisDetails.css';

export default function AnalysisDetails({ result }) {
  if (!result) return null;

  const { evidence = [], kpiMapping = [], gaps = [], followUpQuestions = [] } = result;

  return (
    <div className="analysis-details">
      
      {/* Evidence Section */}
      {evidence && evidence.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">
            <span className="section-icon">🔍</span> Key Evidence Found
          </h3>
          <div className="grid-list">
            {evidence.map((item, idx) => (
              <div key={idx} className="detail-card">
                <div className="card-header">
                  <span className={`signal-badge signal-${item.signal?.toLowerCase()}`}>
                    {item.signal}
                  </span>
                  <span className="dimension-tag">{item.dimension}</span>
                </div>
                <blockquote className="quote-text">"{item.quote}"</blockquote>
                <p className="interpretation-text"><strong>Interpretation:</strong> {item.interpretation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KPI Section */}
      {kpiMapping && kpiMapping.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">
            <span className="section-icon">📈</span> Business KPI Impact
          </h3>
          <div className="grid-list">
            {kpiMapping.map((item, idx) => {
              if (!item.evidence && !item.systemOrPersonal) return null; // Skip empty KPIs
              return (
                <div key={idx} className="detail-card kpi-card">
                  <div className="kpi-header">
                    <h4 className="kpi-name">{item.kpi}</h4>
                    {item.systemOrPersonal && (
                      <span className="system-tag">{item.systemOrPersonal}</span>
                    )}
                  </div>
                  {item.evidence ? (
                    <p className="kpi-evidence">{item.evidence}</p>
                  ) : (
                    <p className="kpi-evidence empty">No specific evidence mentioned for this KPI.</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Gaps Section */}
      {gaps && gaps.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">
            <span className="section-icon">⚠️</span> Identified Gaps
          </h3>
          <div className="gaps-list">
            {gaps.map((item, idx) => (
              <div key={idx} className="gap-item">
                <div className="gap-content">
                  <span className="gap-dimension">{item.dimension}</span>
                  <p className="gap-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Follow-up Questions Section */}
      {followUpQuestions && followUpQuestions.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">
            <span className="section-icon">💬</span> Recommended Follow-up Questions
          </h3>
          <div className="questions-list">
            {followUpQuestions.map((item, idx) => (
              <div key={idx} className="question-card">
                <div className="question-text">
                  <strong>Q:</strong> {item.question}
                </div>
                <div className="question-meta">
                  <span className="meta-pill"><strong>Target Gap:</strong> {item.targetGap}</span>
                  <span className="meta-pill"><strong>Looking For:</strong> {item.lookingFor}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
