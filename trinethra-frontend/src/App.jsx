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
    <>
      <header className="app-header">
        <div className="header-left">
          <span className="header-brand">Trinethra</span>
          <span className="header-subtitle">Fellow Performance Analyzer</span>
        </div>
        <div className="header-right">
          <span className="header-badge">Powered by Ollama · llama3.2</span>
        </div>
      </header>

      <main className={`main-content ${!result && !isAnalyzing ? 'centered-state' : ''}`}>
        {!result && !isAnalyzing && (
          <div className="tagline fade-in">
            <h1 className="tagline-text">Analyze Performance Instantly</h1>
            <p className="tagline-sub">Paste a supervisor transcript to generate a structured, AI-powered analysis.</p>
          </div>
        )}

        <TranscriptInput 
          onStart={() => { setIsAnalyzing(true); setResult(null); }}
          onResult={(data) => { setResult(data); setIsAnalyzing(false); }}
          onError={() => setIsAnalyzing(false)}
        />
        
        <div style={{ marginTop: result || isAnalyzing ? '2rem' : '0' }}>
          {isAnalyzing && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
              <svg style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem', color: 'var(--color-accent)' }} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
              <h3 style={{ margin: 0, color: 'var(--color-accent)', fontSize: '1.25rem' }}>Running AI Analysis...</h3>
              <p style={{ marginTop: '0.5rem' }}>This may take 10-20 seconds.</p>
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
      </main>
    </>
  )
}

export default App
