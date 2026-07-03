import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

// Import Modular Components
import Auth from './components/Auth';
import SkillGap from './components/SkillGap';
import JobMatcher from './components/JobMatcher';
import CoverLetter from './components/CoverLetter';
import InterviewPrep from './components/InterviewPrep';
import Tracker from './components/Tracker';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Profile from './components/Profile';

const SAMPLE_RESUME = `Jane Doe
Email: jane.doe@example.com
Phone: (555) 123-4567

OBJECTIVE
Enthusiastic and motivated Computer Science graduate seeking a Frontend Developer role to utilize React, JavaScript, and modern CSS skills to build user-friendly web applications.

EDUCATION
Bachelor of Science in Computer Science
State University, Graduated May 2025

TECHNICAL SKILLS
- Programming Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
- Libraries & Frameworks: React.js, Vite, Redux Toolkit
- Tools & Technologies: Git, GitHub, Figma, VS Code
- Styling: Responsive Web Design, CSS Modules, Flexbox, CSS Grid

PROJECTS
Personal Portfolio Website | React & Vite
- Developed a fully responsive portfolio site showcasing personal projects and skills.
- Implemented smooth page transitions, custom themes, and contact form handling.

Weather Dashboard App | React & OpenWeather API
- Created a weather forecasting app displaying real-time data for searched cities.
- Managed application state using React Context API.

EXPERIENCE
Software Engineering Intern | TechStart Solutions (Summer 2024)
- Collaborated with developers to build frontend components for client websites.
- Optimized page loading performance by refactoring legacy CSS code.`;

let rawApiUrl = import.meta.env.VITE_API_URL || '';
if (rawApiUrl.endsWith('/')) {
  rawApiUrl = rawApiUrl.slice(0, -1);
}
const API_BASE = rawApiUrl.endsWith('/api') ? rawApiUrl.slice(0, -4) : rawApiUrl;

const App = () => {
  // Authentication & Session State
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  
  // Navigation Routing
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Functional/Agent States
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [interviewPrep, setInterviewPrep] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [trackerList, setTrackerList] = useState(() => {
    const saved = localStorage.getItem('trackerList');
    return saved ? JSON.parse(saved) : [
      { id: 101, title: 'Junior React Dev', company: 'DevTech', status: 'Interviewing', appliedDate: '2026-06-20', followUpDate: '2026-06-27' },
      { id: 102, title: 'Full Stack Engineer', company: 'GlobalCorp', status: 'Applied', appliedDate: '2026-06-24', followUpDate: '2026-07-01' }
    ];
  });

  // UI Indicators
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Auth Inputs
  const [authTab, setAuthTab] = useState('login'); // login | register
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Persist tracker list changes
  useEffect(() => {
    localStorage.setItem('trackerList', JSON.stringify(trackerList));
  }, [trackerList]);

  // Save/Load Token helper
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUserProfile();
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  // Fetch User Profile and Resume Analysis
  const fetchUserProfile = async () => {
    setIsLoading(true);
    setLoadingMsg('Loading profile...');
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        if (data.resumeProfile) {
          setAnalysis({
            skills: data.resumeProfile.skills || [],
            experienceLevel: data.resumeProfile.experienceLevel || 'Entry Level',
            summary: data.resumeProfile.summary || '',
            strengths: data.resumeProfile.strengths || ['Strong Technical Skills', 'Adaptability'],
            areasForImprovement: data.resumeProfile.areasForImprovement || ['Build more projects', 'Advanced Algorithms']
          });
          setResumeText(data.resumeProfile.summary || '');
        }
      } else {
        handleLogout();
        setError(data.message || 'Session expired. Please log in.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setLoadingMsg('Logging in...');
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setSuccess('Successfully logged in!');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Server connection error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!authName || !authEmail || !authPassword) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setLoadingMsg('Creating your account...');
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: authName, email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setSuccess('Account created successfully!');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Server connection error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken('');
    setUser(null);
    setAnalysis(null);
    setJobs([]);
    setSelectedJob(null);
    setCoverLetter('');
    setInterviewPrep(null);
    setSkillGap(null);
    setResumeText('');
    setSuccess('Signed out successfully.');
    setActiveTab('home');
  };

  // Resume Parsing Agent
  const triggerResumeAnalysis = async (file = null) => {
    setIsLoading(true);
    setLoadingMsg('Resume Analysis Agent is reviewing your profile...');
    setError('');
    setSuccess('');
    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append('resumeFile', file);
        res = await fetch(`${API_BASE}/api/agent/resume`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      } else {
        if (!resumeText.trim()) {
          setError('Please enter your resume details or upload a file first.');
          setIsLoading(false);
          return;
        }
        res = await fetch(`${API_BASE}/api/agent/resume`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ resumeText })
        });
      }
      
      const data = await res.json();
      if (res.ok) {
        setAnalysis(data.analysis);
        setSuccess('Resume analyzed successfully! Check out your profile details.');
        fetchJobMatches();
      } else {
        setError(data.message || 'Failed to analyze resume.');
      }
    } catch (err) {
      setError('Failed to analyze resume. Check backend server connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch matched jobs
  const fetchJobMatches = async (filters = {}) => {
    setIsLoading(true);
    setLoadingMsg('Job Search Agent is matching opportunities...');
    setError('');
    try {
      // Build query string
      const cleanFilters = {};
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '' && filters[key] !== 'Any') {
          cleanFilters[key] = filters[key];
        }
      });
      const queryParams = new URLSearchParams(cleanFilters).toString();
      const url = queryParams ? `${API_BASE}/api/agent/jobs?${queryParams}` : `${API_BASE}/api/agent/jobs`;

      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(data.matches || []);
      } else {
        setError(data.message || 'Failed to match jobs.');
      }
    } catch (err) {
      setError('Connection issue while searching for jobs.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger Skill Gap Analyzer Agent
  const triggerSkillGap = async (job) => {
    setSelectedJob(job);
    setActiveTab('services-skill-gap');
    setIsLoading(true);
    setLoadingMsg(`Skill Gap Agent is evaluating requirements for ${job.title}...`);
    setError('');
    setSkillGap(null);
    try {
      const res = await fetch(`${API_BASE}/api/agent/skill-gap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobDetails: job })
      });
      const data = await res.json();
      if (res.ok) {
        setSkillGap(data);
        setSuccess('Skill gap roadmap generated!');
      } else {
        setError(data.message || 'Failed to analyze skill gaps.');
      }
    } catch (err) {
      setError('Failed to connect to Skill Gap Agent.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Cover Letter
  const triggerCoverLetter = async (job, tone = 'enterprise') => {
    setSelectedJob(job);
    setActiveTab('services-cover-letter');
    setIsLoading(true);
    setLoadingMsg(`Cover Letter Agent is tailoring a letter for ${job.title} at ${job.company}...`);
    setError('');
    setCoverLetter('');
    try {
      const res = await fetch(`${API_BASE}/api/agent/cover-letter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobDetails: job, tone })
      });
      const data = await res.json();
      if (res.ok) {
        setCoverLetter(data.coverLetter);
        setSuccess('Cover letter tailored successfully!');
      } else {
        setError(data.message || 'Failed to generate cover letter.');
      }
    } catch (err) {
      setError('Error connecting with Cover Letter Agent.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Interview Prep
  const triggerInterviewPrep = async (job) => {
    setSelectedJob(job);
    setActiveTab('services-interview');
    setIsLoading(true);
    setLoadingMsg(`Interview Agent is generating role-specific preparation questions...`);
    setError('');
    setInterviewPrep(null);
    setActiveAccordion(null);
    try {
      const res = await fetch(`${API_BASE}/api/agent/interview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobDetails: job })
      });
      const data = await res.json();
      if (res.ok) {
        setInterviewPrep(data);
        setSuccess('Interview preparation guide generated!');
      } else {
        setError(data.message || 'Failed to generate interview prep.');
      }
    } catch (err) {
      setError('Error connecting with Interview Prep Agent.');
    } finally {
      setIsLoading(false);
    }
  };

  // Application Tracker Action
  const triggerLogApplication = async (job, customStatus = 'Applied') => {
    setIsLoading(true);
    setLoadingMsg(`Application Tracker Agent is logging details and scheduling reminders...`);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/agent/tracker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobDetails: job, status: customStatus })
      });
      const data = await res.json();
      if (res.ok) {
        // Update local list
        setTrackerList(prev => {
          const exists = prev.some(item => item.jobId === job.id);
          if (exists) {
            return prev.map(item => item.jobId === job.id ? { ...item, status: customStatus } : item);
          } else {
            return [...prev, {
              id: Math.floor(Math.random() * 1000),
              jobId: job.id,
              title: job.title,
              company: job.company,
              status: customStatus,
              appliedDate: data.trackerEntry.appliedDate,
              followUpDate: data.trackerEntry.followUpDate
            }];
          }
        });
        setSuccess(data.message);
      } else {
        setError(data.message || 'Failed to log application.');
      }
    } catch (err) {
      setError('Error connecting to Tracker Agent.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update status inside the tracker tab
  const handleTrackerStatusChange = (trackerId, newStatus) => {
    setTrackerList(prev => prev.map(item => item.id === trackerId ? { ...item, status: newStatus } : item));
    setSuccess('Status updated successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  // Human in the Loop Cover Letter Confirmation Callback
  const handleApproveCoverLetter = () => {
    alert('[APPROVED] Draft confirmed! Exporting file CoverLetter_Final.docx via Google Docs MCP...');
    setSuccess('Cover letter approved and synced with cloud drive.');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Copy to clipboard helper
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  // Load sample resume helper
  const loadSampleResume = () => {
    setResumeText(SAMPLE_RESUME);
    setSuccess('Loaded sample resume. Click "Analyze Profile" to begin!');
  };

  // Automatically fetch matches on login if profile exists
  useEffect(() => {
    if (user && user.resumeProfile && user.resumeProfile.skills) {
      fetchJobMatches();
    }
  }, [user]);

  // Auth Guard Screen
  if (!token) {
    return (
      <Auth 
        authTab={authTab}
        setAuthTab={setAuthTab}
        authName={authName}
        setAuthName={setAuthName}
        authEmail={authEmail}
        setAuthEmail={setAuthEmail}
        authPassword={authPassword}
        setAuthPassword={setAuthPassword}
        handleLoginSubmit={handleLoginSubmit}
        handleRegisterSubmit={handleRegisterSubmit}
        error={error}
        success={success}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Top Navbar Navigation */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">JH</div>
            <span className="logo-text">JobHunter</span>
          </div>

          <button 
            className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            id="navbar-toggle-btn"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <button 
              className={`navbar-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
              id="nav-home"
            >
              Home
            </button>
            <button 
              className={`navbar-item ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
              id="nav-about"
            >
              About
            </button>

            <div className="navbar-dropdown-wrapper">
              <button 
                className={`navbar-item dropdown-toggle ${activeTab.startsWith('services') ? 'active' : ''}`}
                onClick={() => { setActiveTab('services'); setIsMobileMenuOpen(false); }}
                id="nav-services"
              >
                Services <span className="dropdown-caret">▼</span>
              </button>
              <div className="navbar-dropdown-menu">
                <button 
                  className="dropdown-item" 
                  onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
                >
                  📄 Resume Analyzer
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => { setActiveTab('services-skill-gap'); setIsMobileMenuOpen(false); }}
                >
                  ⚡ Skill Gap Auditor
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => { setActiveTab('services-jobs'); setIsMobileMenuOpen(false); }}
                >
                  💼 Job Matcher
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => { setActiveTab('services-cover-letter'); setIsMobileMenuOpen(false); }}
                >
                  📝 Cover Letter Tailor
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => { setActiveTab('services-interview'); setIsMobileMenuOpen(false); }}
                >
                  🎓 Interview Coach
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={() => { setActiveTab('services-tracker'); setIsMobileMenuOpen(false); }}
                >
                  📅 Job Tracker
                </button>
              </div>
            </div>

            <button 
              className={`navbar-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
              id="nav-profile"
            >
              Profile
            </button>

            {user && (
              <div className="mobile-user-profile-actions">
                <span className="mobile-user-name">👤 {user.name}</span>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="btn-logout-navbar" id="btn-logout-navbar-mobile">
                  Sign Out
                </button>
              </div>
            )}
          </nav>

          {user && (
            <div className="navbar-user-info">
              <span className="navbar-username" onClick={() => setActiveTab('profile')} title="View Profile">
                👤 {user.name}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm btn-logout-navbar" id="btn-logout-navbar-desktop">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="main-content">
        
        {/* Global Notifications Alert bar */}
        {error && <div className="alert alert-danger" id="global-error-alert">{error}</div>}
        {success && <div className="alert alert-success" id="global-success-alert">{success}</div>}

        {/* Global Loading Overlay */}
        {isLoading && (
          <div className="spinner-container" id="spinner-loader">
            <div className="spinner"></div>
            <p className="spinner-text">{loadingMsg}</p>
          </div>
        )}

        {!isLoading && (
          <>
            {activeTab === 'home' && (
              <Home 
                user={user}
                analysis={analysis}
                jobs={jobs}
                trackerList={trackerList}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'about' && (
              <About />
            )}

            {activeTab === 'services' && (
              <Services setActiveTab={setActiveTab} />
            )}

            {activeTab === 'profile' && (
              <Profile 
                user={user}
                resumeText={resumeText}
                setResumeText={setResumeText}
                triggerResumeAnalysis={triggerResumeAnalysis}
                loadSampleResume={loadSampleResume}
                analysis={analysis}
                handleLogout={handleLogout}
              />
            )}

            {activeTab === 'services-skill-gap' && (
              <SkillGap 
                selectedJob={selectedJob}
                skillGap={skillGap}
                triggerSkillGap={triggerSkillGap}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'services-jobs' && (
              <JobMatcher 
                analysis={analysis}
                jobs={jobs}
                fetchJobMatches={fetchJobMatches}
                triggerSkillGap={triggerSkillGap}
                triggerCoverLetter={triggerCoverLetter}
                triggerInterviewPrep={triggerInterviewPrep}
                triggerLogApplication={triggerLogApplication}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'services-cover-letter' && (
              <CoverLetter 
                selectedJob={selectedJob}
                coverLetter={coverLetter}
                triggerCoverLetter={triggerCoverLetter}
                copyToClipboard={copyToClipboard}
                setActiveTab={setActiveTab}
                onApproveCoverLetter={handleApproveCoverLetter}
              />
            )}

            {activeTab === 'services-interview' && (
              <InterviewPrep 
                selectedJob={selectedJob}
                interviewPrep={interviewPrep}
                triggerInterviewPrep={triggerInterviewPrep}
                activeAccordion={activeAccordion}
                setActiveAccordion={setActiveAccordion}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'services-tracker' && (
              <Tracker 
                trackerList={trackerList}
                handleTrackerStatusChange={handleTrackerStatusChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

// Render React App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
