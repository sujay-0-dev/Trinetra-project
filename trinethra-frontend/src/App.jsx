import { useState } from 'react'
import TranscriptInput from './components/TranscriptInput'
import './App.css'

function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#111827' }}>Trinethra</h1>
      
      <TranscriptInput onResult={setResult} />
      
      {result && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '2rem auto 0',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ marginTop: 0, color: '#374151' }}>Analysis Result:</h2>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            overflowX: 'auto'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default App
