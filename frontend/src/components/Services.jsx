import React from 'react';

const Services = ({ setActiveTab }) => {
  const serviceItems = [
    {
      id: 'profile', // We send them to Profile where resume parser lives
      title: 'Resume Analyzer',
      desc: 'Upload or paste your resume text to extract skills, experience levels, strengths, and improvement areas via advanced LLM agents.',
      img: '/resume_agent.png',
      badge: 'Profile Hub',
      btnText: 'Open Resume Analyzer'
    },
    {
      id: 'services-jobs',
      title: 'Job Matcher',
      desc: 'Compare your extracted skills against our database of vacancies. View matching scores and isolated gaps to prioritize applications.',
      img: '/job_matcher.png',
      badge: 'Semantic Scoring',
      btnText: 'Find Job Matches'
    },
    {
      id: 'services-skill-gap',
      title: 'Skill Gap Auditor & Roadmap',
      desc: 'Audit required vs. personal skills for a specific opening. Generates a custom training roadmap complete with tutorial resource links.',
      img: '/job_matcher.png', // Fallback or rotated hue
      style: { filter: 'hue-rotate(90deg)' },
      badge: 'Roadmap Builder',
      btnText: 'Auditor Workspace'
    },
    {
      id: 'services-cover-letter',
      title: 'Cover Letter Tailor',
      desc: 'Generate a highly personalized cover letter matching your credentials and highlights to specific job descriptions with one-click export.',
      img: '/cover_letter.png',
      badge: 'Copywriter Agent',
      btnText: 'Draft Cover Letter'
    },
    {
      id: 'services-interview',
      title: 'Interview Coach',
      desc: 'Simulate coding reviews, behavioral, and situational questions designed for your selected role. Practice with model answers and hints.',
      img: '/interview_agent.png',
      badge: 'Preparation Guide',
      btnText: 'Start Interview Prep'
    },
    {
      id: 'services-tracker',
      title: 'Job Tracker',
      desc: 'Track application states, log submission timestamps, log interview reminder schedules, and configure local notification systems.',
      img: '/icons.svg', // Simple icon
      badge: 'Tracker Desk',
      btnText: 'Manage Job Tracker'
    }
  ];

  return (
    <section id="panel-services" className="services-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Career Agent Services</h1>
          <p className="page-subtitle">Select and launch any specialized autonomous career sub-agent.</p>
        </div>
      </div>

      <div className="grid-container services-detailed-grid">
        {serviceItems.map((service, idx) => (
          <div key={idx} className="glass-card agent-showcase-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <img 
              src={service.img} 
              alt={service.title} 
              className="agent-showcase-img" 
              style={service.style} 
            />
            <div className="agent-showcase-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 className="agent-showcase-title" style={{ margin: 0 }}>{service.title}</h4>
                <span className="agent-showcase-badge" style={{ margin: 0 }}>{service.badge}</span>
              </div>
              <p className="agent-showcase-desc" style={{ fontSize: '0.85rem', flexGrow: 1 }}>
                {service.desc}
              </p>
              <button 
                onClick={() => setActiveTab(service.id)} 
                className="btn btn-primary btn-block"
                style={{ marginTop: '1rem' }}
              >
                {service.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
