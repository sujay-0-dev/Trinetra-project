import { useState } from 'react'
import TranscriptInput from './components/TranscriptInput'
import ScoreCard from './components/ScoreCard'
import './App.css'

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1 className="page-title">Trinethra</h1>
      <p className="page-subtitle">AI-powered Fellow Performance Analysis</p>
      
      <TranscriptInput onResult={setResult} />
      
      {result && result.score && (
        <ScoreCard score={result.score} />
      )}
      
      {result && (
        <div className="card">
          <h2 style={{ marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', fontSize: '1.5rem', color: '#111827' }}>
            Raw Developer Data
          </h2>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            backgroundColor: '#f9fafb',
            padding: '1.5rem',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            overflowX: 'auto',
            fontSize: '0.95rem',
            color: '#374151',
            fontFamily: 'monospace'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default App
