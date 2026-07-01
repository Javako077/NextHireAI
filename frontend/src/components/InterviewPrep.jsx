import React from 'react';

const InterviewPrep = ({
  selectedJob,
  interviewPrep,
  triggerInterviewPrep,
  activeAccordion,
  setActiveAccordion,
  setActiveTab
}) => {
  return (
    <section id="panel-interview">
      <div className="page-header">
        <div>
          <h1 className="page-title">Interview Preparation Agent</h1>
          <p className="page-subtitle">Generates role-specific, technical, and behavioral interview questions.</p>
        </div>
      </div>

      {!selectedJob ? (
        <div className="glass-card empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="empty-state-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</span>
          <h4 className="empty-state-title">No Job Selected</h4>
          <p>Select a job from the Job Matcher list to generate preparation questions.</p>
          <button onClick={() => setActiveTab('services-jobs')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Browse Matched Jobs
          </button>
        </div>
      ) : (
        <div className="panel-layout">
          <div className="glass-card selected-job-sticky" style={{ height: 'fit-content' }}>
            <h3 className="card-title">💼 Target Role</h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--text-bright)', fontSize: '1.1rem' }}>{selectedJob.title}</h4>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedJob.company}</div>
            </div>
            
            <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '1.25rem', opacity: '0.85', borderLeft: '3px solid var(--accent)', paddingLeft: '0.5rem' }}>
              {selectedJob.description}
            </p>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-bright)', display: 'block', marginBottom: '0.25rem' }}>💰 Job Salary:</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                ${selectedJob.salary ? selectedJob.salary.toLocaleString() : 'N/A'} / year
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.3rem' }}>
                📍 {selectedJob.location} • 💻 {selectedJob.remoteOnsite}
              </span>
            </div>

            <button onClick={() => triggerInterviewPrep(selectedJob)} className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>🔄</span> Regenerate Prep Guide
            </button>
          </div>

          <div className="glass-card">
            <h3 className="card-title">📚 Generated Interview Guide</h3>
            <p className="card-text" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Review these customized questions. Click any question card to reveal the ideal answer guide and suggestions.
            </p>

            {interviewPrep && interviewPrep.questions ? (
              <div className="interview-accordion" id="interview-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {interviewPrep.questions.map((q, index) => {
                  const typeColors = {
                    Technical: { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--accent)', border: '1px solid rgba(59, 130, 246, 0.2)' },
                    Coding: { bg: 'rgba(139, 92, 246, 0.1)', text: 'var(--secondary)', border: '1px solid rgba(139, 92, 246, 0.2)' },
                    Behavioral: { bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)' }
                  };
                  const colorStyle = typeColors[q.type] || typeColors.Technical;

                  return (
                    <div key={index} className="interview-item" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', overflow: 'hidden' }}>
                      <div 
                        className="interview-question-header" 
                        onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                        id={`accordion-header-${index}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.01)', transition: 'background 0.2s' }}
                      >
                        <span className="interview-question-title" style={{ fontWeight: '500', paddingRight: '1rem' }}>
                          {index + 1}. {q.question}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                          <span 
                            className="interview-question-type" 
                            style={{ 
                              fontSize: '0.75rem', 
                              padding: '0.2rem 0.6rem', 
                              borderRadius: '4px',
                              fontWeight: '600',
                              backgroundColor: colorStyle.bg,
                              color: colorStyle.text,
                              border: colorStyle.border
                            }}
                          >
                            {q.type}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {activeAccordion === index ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>
                      
                      {activeAccordion === index && (
                        <div 
                          className="interview-answer-drawer" 
                          id={`accordion-drawer-${index}`}
                          style={{ 
                            padding: '1.25rem', 
                            background: 'rgba(0, 0, 0, 0.2)', 
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)' 
                          }}
                        >
                          <div style={{ marginBottom: '1rem' }}>
                            <span className="drawer-label" style={{ fontWeight: '600', color: 'var(--success)', display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                              💡 Ideal Sample Answer:
                            </span>
                            <p className="drawer-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', opacity: '0.9', fontSize: '0.9rem' }}>
                              {q.sampleAnswer || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <span className="drawer-label" style={{ fontWeight: '600', color: 'var(--warning)', display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                              ⚡ Focus & Improvement Suggestions:
                            </span>
                            <p className="drawer-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', opacity: '0.9', fontSize: '0.9rem' }}>
                              {q.improvementTips || q.expectedAnswerFocus || 'Focus on presenting clear examples using the STAR method.'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>Interview preparation questions generated by AI will appear here after clicking "Regenerate Prep Guide".</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default InterviewPrep;
