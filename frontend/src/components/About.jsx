import React from 'react';

const About = () => {
  return (
    <section id="panel-about" className="about-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">About JobHunter</h1>
          <p className="page-subtitle">A collaborative ecosystem of specialized AI career agents powered by Gemini.</p>
        </div>
      </div>

      <div className="glass-card about-intro-card" style={{ marginBottom: '2rem' }}>
        <h3 className="card-title">🚀 The Mission</h3>
        <p className="card-text">
          JobHunter is designed to bridge the gap between job seekers and their target roles. By automating the tedious parts of the job search—including resume evaluation, skill gap auditing, semantic job matching, cover letter writing, and interview preparation—our network of autonomous agents collaborates to elevate your career opportunities.
        </p>
      </div>

      <h3 className="section-title" style={{ marginBottom: '1.25rem' }}>🤖 Specialized Career Agents</h3>
      <div className="grid-container agents-detailed-grid" style={{ marginBottom: '2.5rem' }}>
        
        <div className="glass-card">
          <h4 style={{ color: '#818cf8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span>📄</span> Resume Analyzer Agent
          </h4>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>
            Scans profile text and resumes to semantically extract technical and soft skills, estimate experience level, and generate professional summaries. It recommends core strengths and highlights critical improvement areas.
          </p>
        </div>

        <div className="glass-card">
          <h4 style={{ color: '#3b82f6', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span>💼</span> Job Search Matcher
          </h4>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>
            Connects to our database of job vacancies, matching your analyzed resume against required qualifications. It scores matches based on skill overlap, listing missing requirements to help you choose the best roles.
          </p>
        </div>

        <div className="glass-card">
          <h4 style={{ color: '#a855f7', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span>⚡</span> Skill Gap Agent
          </h4>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>
            Audits your skills against specific job openings. It isolates missing capabilities and automatically designs a step-by-step learning roadmap loaded with recommended resource tutorials to help you prepare.
          </p>
        </div>

        <div className="glass-card">
          <h4 style={{ color: '#f59e0b', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span>📝</span> Cover Letter Tailor
          </h4>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>
            A dedicated writing agent that crafts hyper-personalized cover letters mapping your specific credentials, past experience, and projects directly to a vacancy's requirements to ensure you stand out.
          </p>
        </div>

        <div className="glass-card">
          <h4 style={{ color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span>🎓</span> Interview Coach Agent
          </h4>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>
            Generates custom preparation guides with technical, behavioral, and situational questions tailored specifically for the selected job, providing hints, recommended answers, and evaluation criteria.
          </p>
        </div>

        <div className="glass-card">
          <h4 style={{ color: '#ef4444', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span>📅</span> Application Tracker
          </h4>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>
            Logs your active job applications, updates tracking status (Applied, Interviewing, Offered, etc.), schedules reminder dates, and helps you organize and execute follow-ups to ensure you stay on top of your search.
          </p>
        </div>

      </div>

      <div className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
        <h3 className="card-title">🔌 Active Model Context Protocol (MCP) Registry</h3>
        <p className="card-text" style={{ fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          JobHunter integrates directly with professional enterprise developer knowledge tools using standard MCP servers to automate task flows:
        </p>
        <div style={{ paddingLeft: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.8' }}>
          <div style={{ color: 'var(--text-bright)', fontWeight: '600' }}>AI Agent System Registry</div>
          <div style={{ color: 'var(--text-muted)' }}> │</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}> ├── </span>
            <span className="badge badge-success" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>google-developer-knowledge</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>// Contextual semantic matching search documents & query responses</span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}> │</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}> ├── </span>
            <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>google-docs-export-mcp</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>// Direct cloud document generation & cover letter export</span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}> │</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}> └── </span>
            <span className="badge badge-warning" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>local-scheduler-mcp</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>// Cron scheduling, email notification alerts, and tracker syncs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
