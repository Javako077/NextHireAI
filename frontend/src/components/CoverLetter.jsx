import React, { useState } from 'react';

const CoverLetter = ({
  selectedJob,
  coverLetter,
  triggerCoverLetter,
  copyToClipboard,
  setActiveTab,
  onApproveCoverLetter
}) => {
  const [tone, setTone] = useState('enterprise');

  return (
    <section id="panel-cover-letter">
      <div className="page-header">
        <div>
          <h1 className="page-title">Personalized Cover Letter</h1>
          <p className="page-subtitle">Generates tailored application messaging matching company criteria.</p>
        </div>
      </div>

      {!selectedJob ? (
        <div className="glass-card empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="empty-state-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</span>
          <h4 className="empty-state-title">No Job Selected</h4>
          <p>Select a job from the Job Matcher list to generate a customized cover letter.</p>
          <button onClick={() => setActiveTab('services-jobs')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Browse Matched Jobs
          </button>
        </div>
      ) : (
        <div className="panel-layout">
          <div className="glass-card selected-job-sticky" style={{ height: 'fit-content' }}>
            <h3 className="card-title">💼 Applying Position</h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--text-bright)', fontSize: '1.1rem' }}>{selectedJob.title}</h4>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedJob.company}</div>
            </div>
            
            <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '1.25rem', opacity: '0.85', borderLeft: '3px solid var(--accent)', paddingLeft: '0.5rem' }}>
              {selectedJob.description}
            </p>

            {/* Tone Selection Group */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Letter Style/Tone:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.35rem' }}>
                <button
                  type="button"
                  className={`btn ${tone === 'enterprise' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setTone('enterprise')}
                  style={{ fontSize: '0.8rem', padding: '0.5rem', borderRadius: '6px' }}
                >
                  🏢 Enterprise
                </button>
                <button
                  type="button"
                  className={`btn ${tone === 'startup' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setTone('startup')}
                  style={{ fontSize: '0.8rem', padding: '0.5rem', borderRadius: '6px' }}
                >
                  🚀 Startup
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                {tone === 'enterprise' 
                  ? 'Professional, structured, industry expert phrasing.' 
                  : 'Passionate, direct, conversational startup-vibe.'}
              </p>
            </div>

            <button onClick={() => triggerCoverLetter(selectedJob, tone)} className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>✨</span> Generate Letter
            </button>
          </div>

          <div className="glass-card">
            <div className="output-area-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <h3 className="card-title" style={{ margin: 0 }}>✉ Tailored Cover Letter</h3>
              {coverLetter && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => copyToClipboard(coverLetter)} 
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    id="btn-copy-cl"
                  >
                    Copy Text
                  </button>
                  <button 
                    onClick={onApproveCoverLetter}
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--success)' }}
                    id="btn-approve-cl"
                  >
                    Approve & Save
                  </button>
                </div>
              )}
            </div>
            {coverLetter ? (
              <div className="output-text-box" id="cl-output-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.95rem' }}>{coverLetter}</div>
            ) : (
              <div className="empty-state" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>Cover Letter generated by AI will appear here after clicking "Generate Letter".</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CoverLetter;
