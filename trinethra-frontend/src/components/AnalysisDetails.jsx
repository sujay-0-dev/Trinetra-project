import React from 'react';
import EvidenceList from './EvidenceList';
import KpiMapping from './KpiMapping';
import GapAnalysis from './GapAnalysis';
import FollowUpQuestions from './FollowUpQuestions';
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
          <EvidenceList evidence={evidence} />
        </section>
      )}

      {/* KPI Section */}
      {kpiMapping && kpiMapping.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">
            <span className="section-icon">📈</span> Business KPI Impact
          </h3>
          <KpiMapping kpiMapping={kpiMapping} />
        </section>
      )}

      {/* Gaps Section */}
      <section className="detail-section">
        <h3 className="section-title">
          <span className="section-icon">⚠️</span> Identified Gaps
        </h3>
        <GapAnalysis gaps={gaps} />
      </section>

      {/* Follow-up Questions Section */}
      {followUpQuestions && followUpQuestions.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">
            <span className="section-icon">💬</span> Recommended Follow-up Questions
          </h3>
          <FollowUpQuestions followUpQuestions={followUpQuestions} />
        </section>
      )}
    </div>
  );
}
