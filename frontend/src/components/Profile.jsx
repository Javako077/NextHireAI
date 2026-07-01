import React, { useState } from 'react';

const Profile = ({
  user,
  resumeText,
  setResumeText,
  triggerResumeAnalysis,
  loadSampleResume,
  analysis,
  handleLogout
}) => {
  const [inputMode, setInputMode] = useState('upload'); // upload | paste
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const skillsCount = analysis?.skills?.length || 0;
  const softSkillsCount = analysis?.softSkills?.length || 0;
  const missingSkillsCount = analysis?.missingSkills?.length || 0;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext === 'pdf' || ext === 'docx') {
      setSelectedFile(file);
    } else {
      alert('Unsupported file format. Please upload PDF or DOCX.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleAnalyzeClick = () => {
    if (inputMode === 'upload') {
      if (!selectedFile) {
        alert('Please select a PDF or DOCX file to upload.');
        return;
      }
      triggerResumeAnalysis(selectedFile);
    } else {
      if (!resumeText.trim()) {
        alert('Please paste resume text or click "Load Sample Resume".');
        return;
      }
      triggerResumeAnalysis();
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  // Helper for ATS gauge colors
  const getAtsColorClass = (score) => {
    if (score >= 80) return 'ats-green';
    if (score >= 50) return 'ats-yellow';
    return 'ats-red';
  };

  return (
    <section id="panel-profile" className="profile-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Profile & Resume</h1>
          <p className="page-subtitle">Manage your personal credentials, upload resumes, and audit AI skills.</p>
        </div>
      </div>

      <div className="grid-container profile-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Side: Account info card */}
        <div className="glass-card user-account-card">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="profile-avatar" style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--primary-gradient)',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'var(--text-bright)',
              boxShadow: 'var(--shadow-glow)'
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3 style={{ color: 'var(--text-bright)', fontWeight: '700', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
              {user?.name || 'User Name'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user?.email || 'email@example.com'}</p>
          </div>

          <div className="user-details-list" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status:</span>
              <span className="badge badge-success">Active Account</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Resume Parsed:</span>
              <span className={skillsCount > 0 ? 'badge badge-success' : 'badge badge-warning'}>
                {skillsCount > 0 ? 'Yes' : 'No'}
              </span>
            </div>
            {analysis?.atsCompatibility && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>ATS Score:</span>
                <span className={`badge ${analysis.atsCompatibility >= 80 ? 'badge-success' : 'badge-warning'}`}>
                  {analysis.atsCompatibility}%
                </span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tech Skills Extracted:</span>
              <span style={{ color: 'var(--text-bright)', fontWeight: '600' }}>{skillsCount}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary btn-block" style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }} id="btn-logout-profile">
            🚪 Sign Out of Account
          </button>
        </div>

        {/* Right Side: Resume Input or Parser results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="card-title" style={{ margin: 0 }}>📝 Resume Source</h3>
              <div className="auth-tabs" style={{ margin: 0, borderBottom: 'none' }}>
                <button 
                  className={`auth-tab-btn ${inputMode === 'upload' ? 'active' : ''}`}
                  onClick={() => setInputMode('upload')}
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
                >
                  Document Upload
                </button>
                <button 
                  className={`auth-tab-btn ${inputMode === 'paste' ? 'active' : ''}`}
                  onClick={() => setInputMode('paste')}
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {inputMode === 'upload' ? (
              <div className="upload-container" style={{ marginBottom: '1.5rem' }}>
                <div 
                  className={`dropzone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    border: '2px dashed var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                    borderColor: isDragging ? 'var(--primary)' : 'var(--border-color)',
                    transition: 'var(--transition)'
                  }}
                  onClick={() => document.getElementById('resume-file-input').click()}
                >
                  <input 
                    type="file" 
                    id="resume-file-input" 
                    accept=".pdf,.docx" 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                  />
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📁</div>
                  <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem' }}>
                    Drag & drop your resume file here
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Supports PDF and Word Document (DOCX) formats up to 10MB
                  </p>
                </div>

                {selectedFile && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                      <span style={{ fontSize: '1.2rem' }}>📄</span>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <strong style={{ color: 'var(--text-bright)', fontSize: '0.9rem' }}>{selectedFile.name}</strong>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleClearFile(); }} 
                      className="btn btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--danger)' }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginBottom: '1.5rem' }}>
                <p className="resume-help" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Paste the plain text of your resume or CV inside the text area below.
                </p>
                <div className="form-group">
                  <textarea 
                    className="form-input form-textarea"
                    placeholder="Paste resume details here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    id="profile-resume-textarea"
                    style={{ minHeight: '160px' }}
                  />
                </div>
                <button 
                  onClick={loadSampleResume} 
                  className="btn btn-secondary" 
                  style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }} 
                  id="btn-load-sample-profile"
                >
                  Load Sample Resume
                </button>
              </div>
            )}

            <button 
              onClick={handleAnalyzeClick} 
              className="btn btn-primary btn-block" 
              id="btn-analyze-resume-profile"
            >
              🚀 Analyze Profile Resume
            </button>
          </div>

          {analysis && (
            <div className="analysis-results">
              
              {/* ATS & Executive Summary Row */}
              <div className="grid-container" style={{ margin: 0, gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                {/* ATS Compatibility Meter */}
                {analysis.atsCompatibility !== undefined && (
                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                    <h4 className="card-title" style={{ fontSize: '0.95rem', marginBottom: '1rem', width: '100%', justifyContent: 'center' }}>
                      ATS Score
                    </h4>
                    <div style={{
                      position: 'relative',
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'radial-gradient(closest-side, var(--bg-deep) 79%, transparent 80% 100%), conic-gradient(var(--primary) ' + analysis.atsCompatibility + '%, rgba(255,255,255,0.05) 0)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-bright)' }}>
                        {analysis.atsCompatibility}%
                      </div>
                    </div>
                    <span className="badge badge-primary" style={{ marginTop: '1rem' }}>
                      {analysis.atsCompatibility >= 80 ? 'Excellent Match' : analysis.atsCompatibility >= 60 ? 'Needs Tweaks' : 'Critical Issues'}
                    </span>
                  </div>
                )}

                {/* Professional Summary */}
                <div className="glass-card summary-card" style={{ margin: 0 }}>
                  <h3 className="card-title">🔍 Professional Summary</h3>
                  <p className="card-text" style={{ fontSize: '0.92rem' }}>{analysis.summary}</p>
                  <div style={{ marginTop: '1.25rem' }}>
                    <span className="form-label" style={{ display: 'inline', marginRight: '0.5rem' }}>Experience Level:</span>
                    <span className="badge badge-primary">{analysis.experienceLevel}</span>
                  </div>
                </div>
              </div>

              {/* Technical, Soft & Missing Skills */}
              <div className="glass-card">
                <h3 className="card-title">💡 Skills Audit Profile</h3>
                
                {/* Technical Skills */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span className="form-label" style={{ fontSize: '0.85rem', color: 'var(--text-bright)' }}>🛠 Technical Skills ({skillsCount}):</span>
                  <div className="badge-container" style={{ marginTop: '0.35rem' }}>
                    {skillsCount > 0 ? (
                      analysis.skills.map((skill, i) => (
                        <span key={i} className="badge badge-primary">{skill}</span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None identified.</span>
                    )}
                  </div>
                </div>

                {/* Soft Skills */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span className="form-label" style={{ fontSize: '0.85rem', color: 'var(--text-bright)' }}>🤝 Soft Skills ({softSkillsCount}):</span>
                  <div className="badge-container" style={{ marginTop: '0.35rem' }}>
                    {softSkillsCount > 0 ? (
                      analysis.softSkills.map((skill, i) => (
                        <span key={i} className="badge badge-success">{skill}</span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None identified.</span>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="form-label" style={{ fontSize: '0.85rem', color: 'var(--text-bright)' }}>🚨 Missing Skills ({missingSkillsCount}):</span>
                  <div className="badge-container" style={{ marginTop: '0.35rem' }}>
                    {missingSkillsCount > 0 ? (
                      analysis.missingSkills.map((skill, i) => (
                        <span key={i} className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None detected (Comprehensive profile!).</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Improvements Suggestions */}
              {analysis.improvements && analysis.improvements.length > 0 && (
                <div className="glass-card" style={{ borderLeft: '4px solid var(--warning)' }}>
                  <h3 className="card-title" style={{ color: 'var(--warning)' }}>🛠 Actionable Resume Improvements</h3>
                  <p className="card-text" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Follow these guidelines to improve your ATS scan compatibility score:
                  </p>
                  <div>
                    {analysis.improvements.map((imp, i) => (
                      <div key={i} className="list-item" style={{ marginBottom: '0.85rem' }}>
                        <span className="list-icon warning" style={{ marginTop: '0.15rem' }}>⚡</span>
                        <span style={{ fontSize: '0.92rem', color: 'var(--text-bright)' }}>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths and Weaknesses Grid */}
              <div className="grid-container" style={{ margin: 0, gridTemplateColumns: '1fr 1fr' }}>
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
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Profile;
