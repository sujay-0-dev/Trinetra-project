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
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', fontSize: '1.15rem', color: '#374151' }}>
          Enter Supervisor Transcript
        </label>
        <textarea
          className="textarea-input"
          placeholder="Paste the supervisor's feedback or interview transcript here. Try to include detailed notes for better analysis..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className="btn-primary"
          onClick={handleAnalyze}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg style={{ animation: 'spin 1s linear infinite', marginRight: '0.75rem' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
              Analyzing Profile...
            </>
          ) : 'Run Analysis'}
        </button>
        {error && (
          <div style={{ color: '#dc2626', fontWeight: '600', background: '#fee2e2', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}
