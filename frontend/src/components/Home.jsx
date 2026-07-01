import React from 'react';

const Home = ({ user, analysis, jobs, trackerList, setActiveTab }) => {
  // Statistics counts
  const skillsCount = analysis?.skills?.length || 0;
  const matchesCount = jobs?.length || 0;
  const applicationsCount = trackerList?.length || 0;

  // Group applications by status
  const interviewingCount = trackerList?.filter(item => item.status === 'Interviewing').length || 0;
  const appliedCount = trackerList?.filter(item => item.status === 'Applied').length || 0;

  return (
    <section id="panel-home" className="home-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome Back, {user?.name || 'User'}!</h1>
          <p className="page-subtitle">Your AI-powered career hunt dashboard at a glance.</p>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid-container stats-grid">
        <div className="glass-card stat-card" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h4 className="stat-label">Resume Profile</h4>
            <div className="stat-value">{skillsCount > 0 ? `${skillsCount} Skills Extracted` : 'Not Analyzed'}</div>
            <p className="stat-desc">{skillsCount > 0 ? `Level: ${analysis?.experienceLevel || 'Entry Level'}` : 'Upload resume in Profile'}</p>
          </div>
        </div>

        <div className="glass-card stat-card" onClick={() => setActiveTab('services-jobs')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <h4 className="stat-label">AI Job Matches</h4>
            <div className="stat-value">{matchesCount} Opportunities</div>
            <p className="stat-desc">Tailored matches based on your skills</p>
          </div>
        </div>

        <div className="glass-card stat-card" onClick={() => setActiveTab('services-tracker')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h4 className="stat-label">Application Tracker</h4>
            <div className="stat-value">{applicationsCount} Saved</div>
            <p className="stat-desc">
              {interviewingCount} Interviewing | {appliedCount} Applied
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launch Services Grid */}
      <h3 className="section-title">⚡ Quick Launch Agents</h3>
      <div className="agent-showcase-grid">
        <div className="agent-showcase-card" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
          <img src="/resume_agent.png" alt="Resume Analyzer Agent" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Resume Analyzer</h4>
            <p className="agent-showcase-desc">AI scans profile texts to extract technical, soft skills and find improvements.</p>
            <span className="agent-showcase-badge">Profile Screen</span>
          </div>
        </div>
        <div className="agent-showcase-card" onClick={() => setActiveTab('services-jobs')} style={{ cursor: 'pointer' }}>
          <img src="/job_matcher.png" alt="Job Search Matcher" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Job Search Matcher</h4>
            <p className="agent-showcase-desc">Filters job databases matching extracted expertise to rank applications.</p>
            <span className="agent-showcase-badge">Semantic Scoring</span>
          </div>
        </div>
        <div className="agent-showcase-card" onClick={() => setActiveTab('services-cover-letter')} style={{ cursor: 'pointer' }}>
          <img src="/cover_letter.png" alt="Cover Letter Tailor" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Cover Letter Tailor</h4>
            <p className="agent-showcase-desc">Drafts highly specific messages mapping requirements to credentials.</p>
            <span className="agent-showcase-badge">Writing Agent</span>
          </div>
        </div>
        <div className="agent-showcase-card" onClick={() => setActiveTab('services-interview')} style={{ cursor: 'pointer' }}>
          <img src="/interview_agent.png" alt="Interview Coach Agent" className="agent-showcase-img" />
          <div className="agent-showcase-body">
            <h4 className="agent-showcase-title">Interview Coach</h4>
            <p className="agent-showcase-desc">Creates coding, situational, and behavioral preps with key focus hints.</p>
            <span className="agent-showcase-badge">Interactive Agent</span>
          </div>
        </div>
      </div>

      <div className="panel-layout">
        {/* Daily Career Assistant Cron */}
        <div className="glass-card cron-card">
          <h3 className="card-title">🔔 Daily Career Assistant</h3>
          <div className="cron-status-badge">
            <span className="cron-status-dot"></span> Active background agent scheduler
          </div>
          <p className="card-text" style={{ marginTop: '0.75rem', fontSize: '0.95rem' }}>
            Our background career agent runs on a daily cron schedule to search for new matches and automatically email suggestions directly to <strong>{user?.email}</strong>.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setActiveTab('services-jobs')} className="btn btn-secondary btn-block">
              🔍 Run Job Matcher Now
            </button>
          </div>
        </div>

        {/* Multi-Agent Orchestration Flow */}
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
      </div>
    </section>
  );
};

export default Home;
