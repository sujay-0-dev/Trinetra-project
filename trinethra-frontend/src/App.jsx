import { useState } from 'react'
import TranscriptInput from './components/TranscriptInput'
import ScoreCard from './components/ScoreCard'
import AnalysisDetails from './components/AnalysisDetails'
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
          <AnalysisDetails result={result} />
        </div>
      )}
    </div>
  )
}

export default App
