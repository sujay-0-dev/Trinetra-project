import React, { useState } from 'react';

export default function FollowUpQuestions({ followUpQuestions }) {
  if (!followUpQuestions || followUpQuestions.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {followUpQuestions.map((item, idx) => (
        <QuestionItem key={idx} item={item} index={idx + 1} />
      ))}
    </div>
  );
}

function QuestionItem({ item, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.question);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.25rem',
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
    }}>
      <div style={{
        flexShrink: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: '#f3f4f6',
        color: '#4b5563',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}>
        {index}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: '#111827', lineHeight: '1.5' }}>
            {item.question}
          </p>
          <button 
            onClick={handleCopy}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: copied ? '#dcfce7' : '#f8fafc',
              color: copied ? '#166534' : '#475569',
              border: `1px solid ${copied ? '#bbf7d0' : '#e2e8f0'}`,
              borderRadius: '6px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy
              </>
            )}
          </button>
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>
          <strong>Looking for:</strong> {item.lookingFor}
        </div>
      </div>
    </div>
  );
}
