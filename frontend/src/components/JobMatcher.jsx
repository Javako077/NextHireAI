import React, { useState } from 'react';

const JobMatcher = ({
  analysis,
  jobs,
  fetchJobMatches,
  triggerSkillGap,
  triggerCoverLetter,
  triggerInterviewPrep,
  triggerLogApplication,
  setActiveTab
}) => {
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Any');
  const [remoteOnsite, setRemoteOnsite] = useState('Any');
  const [minSalary, setMinSalary] = useState('');

  const handleApplyFilters = () => {
    fetchJobMatches({
      location,
      experienceLevel,
      remoteOnsite,
      minSalary
    });
  };

  const handleResetFilters = () => {
    setLocation('');
    setExperienceLevel('Any');
    setRemoteOnsite('Any');
    setMinSalary('');
    fetchJobMatches({});
  };

  return (
    <section id="panel-jobs">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI-Matched Job Opportunities</h1>
          <p className="page-subtitle">Personalized recommendations tailored to your analyzed profile.</p>
        </div>
        <button onClick={handleApplyFilters} className="btn btn-secondary" id="btn-refresh-jobs">
          🔄 Refresh Matches
        </button>
      </div>

      {!analysis ? (
        <div className="glass-card empty-state">
          <span className="empty-state-icon">🔒</span>
          <h4 className="empty-state-title">Profile Analysis Required</h4>
          <p>Go to the Profile tab, input your profile information, and run analysis first.</p>
          <button onClick={() => setActiveTab('profile')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Go to Profile
          </button>
        </div>
      ) : (
        <>
          {/* Filters Bar */}
          <div className="glass-card filter-bar-card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
            <h4 style={{ color: 'var(--text-bright)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔍</span> Filter Job Vacancies
            </h4>
            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: 0 }}>
              
              {/* Location */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Location</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Remote, Seattle, New York" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>

              {/* Experience */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Experience</label>
                <select 
                  className="form-input" 
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  <option value="Any">Any Experience</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>

              {/* Work Type */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Work Type</label>
                <select 
                  className="form-input" 
                  value={remoteOnsite}
                  onChange={(e) => setRemoteOnsite(e.target.value)}
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  <option value="Any">Any Work Type</option>
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Salary */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Min Salary ($)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="e.g. 100000" 
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button onClick={handleResetFilters} className="btn btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                Clear Filters
              </button>
              <button onClick={handleApplyFilters} className="btn btn-primary" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
                Apply Filters
              </button>
            </div>
          </div>

          {/* Job matches grid */}
          <div className="grid-container" id="jobs-grid">
            {jobs.length > 0 ? (
              jobs.map((job) => {
                const matchedSkillsCount = job.requiredSkills.filter(skill => 
                  analysis.skills.some(s => s.toLowerCase() === skill.toLowerCase())
                ).length;

                const matchPct = job.matchPercentage !== undefined 
                  ? job.matchPercentage 
                  : Math.round((matchedSkillsCount / job.requiredSkills.length) * 100);

                return (
                  <div key={job.id} className="glass-card job-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="job-card-header">
                      <div>
                        <h3 className="job-title">{job.title}</h3>
                        <div className="company-name">{job.company}</div>
                      </div>
                      <span className="job-experience">{job.experienceLevel}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.25rem 0 1rem' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>📍 {job.location}</span>
                      <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>💻 {job.remoteOnsite}</span>
                      <span className="badge badge-warning" style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        💰 ${job.salary ? job.salary.toLocaleString() : 'N/A'}
                      </span>
                    </div>

                    <p className="job-desc" style={{ flexGrow: 1 }}>{job.description}</p>
                    
                    <div className="job-skills">
                      <span className="form-label" style={{ fontSize: '0.8rem' }}>Required Skills:</span>
                      <div className="badge-container">
                        {job.requiredSkills.map((skill, index) => {
                          const isMatched = analysis.skills.some(s => s.toLowerCase() === skill.toLowerCase());
                          return (
                            <span 
                              key={index} 
                              className={`badge ${isMatched ? 'badge-success' : 'badge-primary'}`}
                            >
                              {skill} {isMatched && '✓'}
                            </span>
                          );
                        })}
                      </div>
                      <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-bright)', fontWeight: '600' }}>
                        Match Accuracy: <span style={{ color: matchPct >= 75 ? 'var(--success)' : matchPct >= 40 ? 'var(--warning)' : 'var(--danger)' }}>
                          {matchPct}%
                        </span> <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'normal' }}>
                          ({matchedSkillsCount}/{job.requiredSkills.length} skills)
                        </span>
                      </div>
                    </div>

                    <div className="job-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
                      <button 
                        onClick={() => triggerSkillGap(job)} 
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                        id={`btn-gaps-${job.id}`}
                      >
                        ⚡ Skill Gaps
                      </button>
                      <button 
                        onClick={() => triggerCoverLetter(job)} 
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                        id={`btn-cl-${job.id}`}
                      >
                        📝 Cover Letter
                      </button>
                      <button 
                        onClick={() => triggerInterviewPrep(job)} 
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem', gridColumn: 'span 2' }}
                        id={`btn-prep-${job.id}`}
                      >
                        🎓 Interview Prep
                      </button>
                      <button 
                        onClick={() => triggerLogApplication(job, 'Applied')} 
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem', gridColumn: 'span 2', background: 'var(--success)' }}
                        id={`btn-track-${job.id}`}
                      >
                        📅 Apply & Track
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '3rem 1.5rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No job matches found matching your filters. Try clearing your filters or refining your resume.</p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default JobMatcher;
