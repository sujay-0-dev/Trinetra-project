import { useState } from 'react';

export default function TranscriptInput({ onResult, onStart, onError }) {
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      setError('Please enter a transcript.');
      return;
    }

    if (onStart) onStart();
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
      if (onError) onError(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div 
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: `1px solid ${isFocused ? 'var(--color-accent)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius)',
          boxShadow: isFocused ? '0 0 0 4px var(--color-accent-light), var(--shadow-md)' : 'var(--shadow-sm)',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ padding: '16px 20px 0', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Supervisor Transcript
        </div>
        <textarea
          style={{
            border: 'none',
            minHeight: '220px',
            fontSize: '15px',
            lineHeight: '1.7',
            resize: 'vertical',
            width: '100%',
            padding: '12px 20px 20px',
            outline: 'none',
            background: 'transparent',
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit'
          }}
          placeholder="Paste the supervisor's feedback or interview transcript here. Try to include detailed notes for better analysis..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
        <button
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 28px',
            fontWeight: '600',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '15px',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => { 
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg), 0 0 15px var(--color-accent-glow)';
            }
          }}
          onMouseLeave={(e) => { 
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }
          }}
          onClick={handleAnalyze}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          ) : 'Run AI Analysis'}
        </button>
        {error && (
          <div style={{ color: 'var(--color-red)', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
