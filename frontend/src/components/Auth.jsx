import React from 'react';

const Auth = ({
  authTab,
  setAuthTab,
  authName,
  setAuthName,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  handleLoginSubmit,
  handleRegisterSubmit,
  error,
  success,
  isLoading
}) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <h2 className="auth-sidebar-title">Empower Your Career Search with Multi-Agent AI</h2>
          <p className="auth-sidebar-text">
            JobHunter is a collaborative network of specialized AI agents. Together, they analyze your resume, match opportunities, tailor cover letters, and prepare you for interviews.
          </p>
          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🔍</span>
              <div>
                <h4 className="auth-feature-title">Resume Analyzer</h4>
                <p className="auth-feature-desc">AI scans profile texts to extract technical, soft skills and find improvements.</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">💼</span>
              <div>
                <h4 className="auth-feature-title">Semantic Job Search</h4>
                <p className="auth-feature-desc">Matches your exact skills and profiles with openings.</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">✉</span>
              <div>
                <h4 className="auth-feature-title">Tailored Writing Agent</h4>
                <p className="auth-feature-desc">Creates highly personalized cover letters for every role.</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🎓</span>
              <div>
                <h4 className="auth-feature-title">Interview Coach</h4>
                <p className="auth-feature-desc">Simulates technical, behavioral, and situational reviews.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo-icon">JH</div>
            </div>
            <h1 className="auth-title">Job Hunter</h1>
            <p className="auth-subtitle">AI-Powered Multi-Agent Career Guide</p>
          </div>

          <div className="auth-tabs">
            <button 
              className={`auth-tab-btn ${authTab === 'login' ? 'active' : ''}`}
              onClick={() => setAuthTab('login')}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab-btn ${authTab === 'register' ? 'active' : ''}`}
              onClick={() => setAuthTab('register')}
            >
              Sign Up
            </button>
          </div>

          {error && <div className="alert alert-danger" id="auth-error-alert">{error}</div>}
          {success && <div className="alert alert-success" id="auth-success-alert">{success}</div>}

          {authTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} id="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input 
                  type="email" 
                  id="login-email"
                  className="form-input" 
                  placeholder="name@example.com"
                  value={authEmail} 
                  onChange={(e) => setAuthEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <input 
                  type="password" 
                  id="login-password"
                  className="form-input" 
                  placeholder="••••••••"
                  value={authPassword} 
                  onChange={(e) => setAuthPassword(e.target.value)} 
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} id="register-form">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">Full Name</label>
                <input 
                  type="text" 
                  id="reg-name"
                  className="form-input" 
                  placeholder="John Doe"
                  value={authName} 
                  onChange={(e) => setAuthName(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email Address</label>
                <input 
                  type="email" 
                  id="reg-email"
                  className="form-input" 
                  placeholder="name@example.com"
                  value={authEmail} 
                  onChange={(e) => setAuthEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">Password</label>
                <input 
                  type="password" 
                  id="reg-password"
                  className="form-input" 
                  placeholder="••••••••"
                  value={authPassword} 
                  onChange={(e) => setAuthPassword(e.target.value)} 
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
