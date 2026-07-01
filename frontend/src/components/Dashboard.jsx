import React from 'react';

const Dashboard = ({
  resumeText,
  setResumeText,
  triggerResumeAnalysis,
  loadSampleResume,
  analysis,
  user
}) => {
  return (
    <section id="panel-dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Resume Analysis Agent</h1>
          <p className="page-subtitle">Upload or paste details of your resume to extract key details and suggestions.</p>
        </div>
        <button onClick={loadSampleResume} className="btn btn-secondary" id="btn-load-sample">
          Load Sample Resume
        </button>
      </div>

      {/* Agent Showcase Row */}
      <div className="agent-showcase-grid">
        <div className="agent-showcase-card">
          <img src="/resume_agent.png" alt="Resume Analyzer Agent" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Resume Analyzer</h4>
            <p className="agent-showcase-desc">AI scans profile texts to extract technical, soft skills and find improvements.</p>
            <span className="agent-showcase-badge">Gemini Flash 2.5</span>
          </div>
        </div>
        <div className="agent-showcase-card">
          <img src="/job_matcher.png" alt="Job Search Matcher" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Job Search Matcher</h4>
            <p className="agent-showcase-desc">Filters job databases matching extracted expertise to rank applications.</p>
            <span className="agent-showcase-badge">Semantic Scoring</span>
          </div>
        </div>
        <div className="agent-showcase-card">
          <img src="/cover_letter.png" alt="Cover Letter Tailor" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Cover Letter Tailor</h4>
            <p className="agent-showcase-desc">Drafts highly specific messages mapping requirements to credentials.</p>
            <span className="agent-showcase-badge">Writing Agent</span>
          </div>
        </div>
        <div className="agent-showcase-card">
          <img src="/interview_agent.png" alt="Interview Coach Agent" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Interview Coach</h4>
            <p className="agent-showcase-desc">Creates coding, situational, and behavioral preps with key focus hints.</p>
            <span className="agent-showcase-badge">Interactive Agent</span>
          </div>
        </div>
      </div>

      <div className="panel-layout">
        <div className="glass-card">
          <h3 className="card-title">📝 Resume Text Input</h3>
          <div className="form-group">
            <textarea 
              className="form-input form-textarea"
              placeholder="Paste resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              id="resume-textarea"
            />
          </div>
          <button 
            onClick={triggerResumeAnalysis} 
            className="btn btn-primary btn-block" 
            id="btn-analyze-resume"
          >
            🚀 Analyze Profile
          </button>
        </div>

        <div className="analysis-results">
          {analysis ? (
            <>
              <div className="glass-card summary-card">
                <h3 className="card-title">🔍 Professional Summary</h3>
                <p className="card-text">{analysis.summary}</p>
                <div style={{ marginTop: '1.25rem' }}>
                  <span className="form-label" style={{ display: 'inline', marginRight: '0.5rem' }}>Experience Level:</span>
                  <span className="badge badge-primary">{analysis.experienceLevel}</span>
                </div>
              </div>

              <div className="glass-card">
                <h3 className="card-title">💡 Technical & Soft Skills</h3>
                <p className="card-text" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Identified skills extracted by agent:</p>
                <div className="badge-container">
                  {analysis.skills.map((skill, i) => (
                    <span key={i} className="badge badge-primary">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="grid-container" style={{ margin: 0 }}>
                <div className="glass-card" style={{ borderLeft: '4px solid var(--success)' }}>
                  <h3 className="card-title" style={{ color: 'var(--success)' }}>✔ Core Strengths</h3>
                  <div>
                    {analysis.strengths && analysis.strengths.map((str, i) => (
                      <div key={i} className="list-item">
                        <span className="list-icon success">✔</span>
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card" style={{ borderLeft: '4px solid var(--warning)' }}>
                  <h3 className="card-title" style={{ color: 'var(--warning)' }}>⚠ Improvement Areas</h3>
                  <div>
                    {analysis.areasForImprovement && analysis.areasForImprovement.map((imp, i) => (
                      <div key={i} className="list-item">
                        <span className="list-icon warning">⚠</span>
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card cron-card">
                <h3 className="card-title">
                  🔔 Daily Career Assistant
                </h3>
                <div className="cron-status-badge">
                  <span className="cron-status-dot"></span> Active background agent scheduler
                </div>
                <p className="card-text" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Our agent runs a daily cron schedule to search for matches and automatically email suggestions directly to <strong>{user?.email}</strong>.
                </p>
              </div>

              <div className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                <h3 className="card-title">🔌 Active Agent Tool Registry</h3>
                <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Each career agent utilizes specialized Model Context Protocol (MCP) tools:
                </p>
                <div style={{ paddingLeft: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  <div style={{ color: 'var(--text-bright)', fontWeight: '600' }}>AI Agent System</div>
                  <div style={{ color: 'var(--text-muted)' }}> │</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}> ├── </span>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>Resume Parser Tool</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>// Extracts skills & experience profiles</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}> │</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}> ├── </span>
                    <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>Job Search Tool</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>// Queries job matching database</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}> │</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}> └── </span>
                    <span className="badge badge-warning" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>Email Notification Tool</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>// Dispatches daily matching reports</span>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <h3 className="card-title">🤖 Multi-Agent Orchestration Flow</h3>
                <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  The Orchestrator Agent acts as the central gateway dispatching tasks to specialized sub-agents:
                </p>
                <div style={{ paddingLeft: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  <div style={{ color: 'var(--text-bright)', fontWeight: '600' }}>User Interface</div>
                  <div style={{ color: 'var(--text-muted)' }}> │</div>
                  <div style={{ color: 'var(--primary)', fontWeight: '600' }}>{" └──> Orchestrator Agent (Gateway Router)"}</div>
                  <div style={{ color: 'var(--text-muted)' }}>       │</div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>{"       ├──> "}</span>
                    <span style={{ color: '#818cf8', fontWeight: '600' }}>Resume Agent</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>// Extract skills, Analyze resume</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>       │</div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>{"       ├──> "}</span>
                    <span style={{ color: '#3b82f6', fontWeight: '600' }}>Job Search Agent</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>// Find matching jobs</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>       │</div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>{"       ├──> "}</span>
                    <span style={{ color: '#a855f7', fontWeight: '600' }}>Cover Letter Agent</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>// Generate cover letters</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>       │</div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>{"       └──> "}</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>Interview Agent</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>// Create interview questions</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card empty-state" style={{ gridColumn: 'span 2' }}>
              <span className="empty-state-icon">📂</span>
              <h4 className="empty-state-title">No Analysis Loaded</h4>
              <p>Fill in the resume details on the left and run analysis to unlock career tools.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
