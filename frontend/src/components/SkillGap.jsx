import React from 'react';

const SkillGap = ({
  selectedJob,
  skillGap,
  triggerSkillGap,
  setActiveTab
}) => {
  return (
    <section id="panel-skill-gap">
      <div className="page-header">
        <div>
          <h1 className="page-title">Skill Gap Roadmap Agent</h1>
          <p className="page-subtitle">Audits profile skills against target job description requirements and generates roadmap guides.</p>
        </div>
      </div>

      {!selectedJob ? (
        <div className="glass-card empty-state">
          <img src="/job_matcher.png" alt="Skill Gap" className="empty-state-img" style={{ filter: 'hue-rotate(90deg)' }} />
          <h4 className="empty-state-title">No Job Selected</h4>
          <p>Select a job vacancy from the Job Matcher list to analyze skill gaps.</p>
          <button onClick={() => setActiveTab('services-jobs')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Go to Job Matcher
          </button>
        </div>
      ) : (
        <div className="panel-layout">
          <div className="glass-card selected-job-sticky">
            <h3 className="card-title">💼 Evaluation Target</h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--text-bright)', fontSize: '1.1rem' }}>{selectedJob.title}</h4>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedJob.company}</div>
            </div>
            <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {selectedJob.description}
            </p>
            <button onClick={() => triggerSkillGap(selectedJob)} className="btn btn-primary btn-block">
              ⚡ Recalculate Skill Gaps
            </button>
          </div>

          <div className="glass-card">
            <h3 className="card-title" style={{ margin: 0, paddingBottom: '0.5rem' }}>⚙ Capability Gap Audit</h3>
            
            {skillGap ? (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="form-label">Identified Missing Skills:</span>
                  <div className="badge-container">
                    {skillGap.missingSkills && skillGap.missingSkills.map((sk, index) => (
                      <span key={index} className="badge badge-warning">{sk}</span>
                    ))}
                  </div>
                </div>

                <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem' }}>📚 Structured Learning Roadmap</h4>
                <div className="roadmap-grid">
                  {skillGap.learningRoadmap && skillGap.learningRoadmap.map((item, index) => (
                    <div key={index} className="roadmap-card">
                      <div className="roadmap-phase">{item.phase}</div>
                      <div className="roadmap-title">Key Core Topics</div>
                      <ul className="roadmap-topics">
                        {item.topics.map((t, idx) => (
                          <li key={idx} className="roadmap-topic-item">{t}</li>
                        ))}
                      </ul>
                      <div className="roadmap-resources">
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-bright)', display: 'block', marginBottom: '0.35rem' }}>Recommended Resources:</span>
                        {item.resources.map((resLink, idx) => (
                          <a key={idx} href="#roadmap" className="roadmap-resource-link" onClick={(e) => { e.preventDefault(); alert(`Resource URL: ${resLink}`); }}>
                            🔗 {resLink}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>Click "Recalculate Skill Gaps" to generate roadmap analysis...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillGap;
