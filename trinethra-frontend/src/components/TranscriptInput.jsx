import { useState } from 'react';

export default function TranscriptInput({ onResult, onStart, onError }) {
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      setError('Please enter a transcript before analyzing.');
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '860px', margin: '0 auto' }}>
      <div 
        style={{ 
          backgroundColor: '#ffffff',
          border: `1px solid ${isFocused ? 'var(--color-border-focus)' : 'var(--color-border)'}`,
          borderRadius: '24px',
          boxShadow: isFocused 
            ? '0 10px 40px -10px rgba(79, 70, 229, 0.15)' 
            : '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <textarea
          style={{
            border: 'none',
            minHeight: '240px',
            fontSize: '16px',
            lineHeight: '1.7',
            resize: 'vertical',
            width: '100%',
            padding: '24px 24px 80px 24px', // extra bottom padding for the button
            outline: 'none',
            background: 'transparent',
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit'
          }}
          placeholder="Paste the supervisor's feedback or interview transcript here to generate a comprehensive performance analysis..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
        />
        
        <div style={{ 
          position: 'absolute', 
          bottom: '16px', 
          right: '16px',
          left: '16px',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: 'var(--color-red)', fontSize: '13px', fontWeight: '500', paddingLeft: '8px' }}>
            {error && `⚠️ ${error}`}
          </div>
          
          <button
            style={{
              background: 'linear-gradient(135deg, var(--color-accent) 0%, #6366f1 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '10px 20px',
              fontWeight: '600',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.8 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateY(0)',
              marginLeft: 'auto'
            }}
            onMouseEnter={(e) => { 
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.5)';
              }
            }}
            onMouseLeave={(e) => { 
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(79, 70, 229, 0.39)';
              }
            }}
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                Run AI Analysis
                <svg style={{ marginLeft: '6px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
        Analyses are powered by Ollama and run entirely locally.
      </div>
    </div>
  );
}
