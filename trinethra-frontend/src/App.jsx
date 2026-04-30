import { useState } from 'react'
import TranscriptInput from './components/TranscriptInput'
import ScoreCard from './components/ScoreCard'
import EvidenceList from './components/EvidenceList'
import KpiMapping from './components/KpiMapping'
import GapAnalysis from './components/GapAnalysis'
import FollowUpQuestions from './components/FollowUpQuestions'
import './components/AnalysisDetails.css'
import './App.css'

function App() {
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="container">
      <h1 className="page-title">Trinethra</h1>
      <p className="page-subtitle">AI-powered Fellow Performance Analysis</p>
      
      <TranscriptInput 
        onStart={() => { setIsAnalyzing(true); setResult(null); }}
        onResult={(data) => { setResult(data); setIsAnalyzing(false); }}
        onError={() => setIsAnalyzing(false)}
      />
      
      <div style={{ marginTop: '3rem' }}>
        {isAnalyzing && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: '#6b7280' }}>
            <svg style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem', color: '#4f46e5' }} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <h3 style={{ margin: 0, color: '#4f46e5', fontSize: '1.25rem' }}>Running AI Analysis...</h3>
            <p style={{ marginTop: '0.5rem' }}>This may take 10-20 seconds.</p>
          </div>
        )}

        {!isAnalyzing && !result && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #cbd5e1', color: '#64748b' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1.5rem', opacity: 0.6 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <p style={{ fontSize: '1.15rem', margin: 0 }}>Paste a transcript and click <strong>Run Analysis</strong> to begin.</p>
          </div>
        )}

        {!isAnalyzing && result && (
          <div className="analysis-details" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <section className="detail-section">
              <h3 className="section-title">
                <span className="section-icon">📊</span> 1. Overall Score
              </h3>
              <ScoreCard score={result.score} />
            </section>

            <section className="detail-section">
              <h3 className="section-title">
                <span className="section-icon">🔍</span> 2. Key Evidence Found
              </h3>
              <EvidenceList evidence={result.evidence} />
            </section>

            <section className="detail-section">
              <h3 className="section-title">
                <span className="section-icon">📈</span> 3. Business KPI Impact
              </h3>
              <KpiMapping kpiMapping={result.kpiMapping} />
            </section>

            <section className="detail-section">
              <h3 className="section-title">
                <span className="section-icon">⚠️</span> 4. Identified Gaps
              </h3>
              <GapAnalysis gaps={result.gaps} />
            </section>

            <section className="detail-section">
              <h3 className="section-title">
                <span className="section-icon">💬</span> 5. Recommended Follow-up Questions
              </h3>
              <FollowUpQuestions followUpQuestions={result.followUpQuestions} />
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
