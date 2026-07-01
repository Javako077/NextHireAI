const mockJobs = [
  { id: 1, title: 'Frontend Developer', company: 'TechCorp', requiredSkills: ['React', 'JavaScript', 'CSS', 'TypeScript'], experienceLevel: 'Entry Level', location: 'San Francisco', remoteOnsite: 'Onsite', salary: 95000, description: 'Build modern web applications with React.' },
  { id: 2, title: 'Backend Developer', company: 'DataSystems', requiredSkills: ['Node.js', 'Express', 'MongoDB', 'REST API'], experienceLevel: 'Mid Level', location: 'New York', remoteOnsite: 'Hybrid', salary: 125000, description: 'Develop scalable APIs and manage database operations.' },
  { id: 3, title: 'Full Stack Engineer', company: 'WebSolutions', requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker'], experienceLevel: 'Mid Level', location: 'Remote', remoteOnsite: 'Remote', salary: 140000, description: 'Work on end-to-end features and containerized deployments.' },
  { id: 4, title: 'UI/UX Designer', company: 'CreativeMinds', requiredSkills: ['Figma', 'CSS', 'Design Thinking'], experienceLevel: 'Entry Level', location: 'Austin', remoteOnsite: 'Onsite', salary: 85000, description: 'Design user-centric interfaces and map user journeys.' },
  { id: 5, title: 'Senior React Developer', company: 'AppStudio', requiredSkills: ['React', 'TypeScript', 'Redux', 'CSS Grid', 'Webpack'], experienceLevel: 'Senior Level', location: 'San Francisco', remoteOnsite: 'Remote', salary: 175000, description: 'Lead frontend engineering teams and set coding standards.' },
  { id: 6, title: 'DevOps Engineer', company: 'CloudOps', requiredSkills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux'], experienceLevel: 'Mid Level', location: 'Remote', remoteOnsite: 'Remote', salary: 150000, description: 'Maintain infrastructure pipelines and monitor cloud deployments.' },
  { id: 7, title: 'Backend Lead', company: 'GlobalCorp', requiredSkills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'], experienceLevel: 'Senior Level', location: 'Seattle', remoteOnsite: 'Hybrid', salary: 190000, description: 'Architect back-end services and orchestrate system integrations.' },
  { id: 8, title: 'Associate Web Dev', company: 'StartUpHub', requiredSkills: ['JavaScript', 'HTML5', 'CSS3', 'Git'], experienceLevel: 'Entry Level', location: 'New York', remoteOnsite: 'Onsite', salary: 75000, description: 'Maintain and add features to client web pages.' }
];

const findMatchingJobs = async (userProfile, filters = {}) => {
  const { skills = [], softSkills = [] } = userProfile;
  const allUserSkills = [...skills, ...softSkills].map(s => s.toLowerCase());

  const { location, experienceLevel, remoteOnsite, minSalary } = filters;

  console.log(`[MCP Tool Called] google-developer-knowledge/search_documents with query: "jobs matching skills: ${skills.slice(0, 5).join(', ')}"`);
  if (Object.keys(filters).length > 0) {
    console.log(`[MCP Filters Applied] Location: ${location || 'Any'}, Experience: ${experienceLevel || 'Any'}, Remote/Onsite: ${remoteOnsite || 'Any'}, Min Salary: ${minSalary || 'Any'}`);
  }

  // 1. Filter jobs based on filter criteria
  let filteredJobs = mockJobs.filter(job => {
    // Location filter (case-insensitive substring match)
    if (location && location.trim() !== '') {
      const locQuery = location.toLowerCase().trim();
      const jobLoc = job.location.toLowerCase();
      if (!jobLoc.includes(locQuery) && locQuery !== 'any') {
        return false;
      }
    }

    // Experience level filter (exact match if selected)
    if (experienceLevel && experienceLevel !== 'Any') {
      if (job.experienceLevel !== experienceLevel) {
        return false;
      }
    }

    // Remote/Onsite filter (exact match if selected)
    if (remoteOnsite && remoteOnsite !== 'Any') {
      if (job.remoteOnsite !== remoteOnsite) {
        return false;
      }
    }

    // Salary filter (minimum salary match)
    if (minSalary && minSalary !== '') {
      const parsedSalary = parseInt(minSalary);
      if (!isNaN(parsedSalary) && job.salary < parsedSalary) {
        return false;
      }
    }

    return true;
  });

  // 2. Rank remaining jobs based on skill match overlap
  const rankedJobs = filteredJobs.map(job => {
    const matchedSkills = job.requiredSkills.filter(reqSkill => 
      allUserSkills.some(userSkill => userSkill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(userSkill))
    );
    const score = matchedSkills.length;
    const matchPercentage = Math.round((score / job.requiredSkills.length) * 100);

    return {
      ...job,
      matchedSkills,
      matchPercentage,
      score
    };
  });

  // Sort by match percentage (descending)
  rankedJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return rankedJobs;
};

module.exports = { findMatchingJobs };
