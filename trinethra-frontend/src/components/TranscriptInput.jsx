import { useState } from 'react';

export default function TranscriptInput({ onResult }) {
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      setError('Please enter a transcript.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${response.status}: Failed to analyze transcript`);
      }

      const data = await response.json();
      if (onResult) {
        onResult(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <textarea
        style={{
          width: '100%',
          minHeight: '300px',
          padding: '1rem',
          fontSize: '1rem',
          fontFamily: 'inherit',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical',
          boxSizing: 'border-box'
        }}
        placeholder="Paste supervisor transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        disabled={isLoading}
      />
      <button
        style={{
          alignSelf: 'flex-start',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          backgroundColor: isLoading ? '#9ca3af' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
        onClick={handleAnalyze}
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Run Analysis'}
      </button>
      {error && (
        <div style={{ color: '#dc2626', marginTop: '0.5rem', fontWeight: '500' }}>
          Error: {error}
        </div>
      )}
    </div>
  );
}
