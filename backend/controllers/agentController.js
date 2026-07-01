const { analyzeResume } = require('../agents/resumeAgent');
const { findMatchingJobs } = require('../agents/jobSearchAgent');
const { generateCoverLetter } = require('../agents/coverLetterAgent');
const { generateInterviewQuestions } = require('../agents/interviewAgent');
const User = require('../models/User');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');

const uploadResumeAndAnalyze = async (req, res) => {
  try {
    let resumeText = '';

    if (req.file) {
      const buffer = req.file.buffer;
      if (req.file.mimetype === 'application/pdf') {
        const instance = new PDFParse(new Uint8Array(buffer));
        const data = await instance.getText();
        resumeText = data.text;
      } else if (
        req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        req.file.originalname.endsWith('.docx')
      ) {
        const data = await mammoth.extractRawText({ buffer });
        resumeText = data.value;
      } else {
        return res.status(400).json({ message: 'Unsupported file format. Please upload PDF or DOCX.' });
      }
    } else {
      resumeText = req.body?.resumeText;
    }
    
    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({ message: 'Resume text or file upload is required' });
    }

    const analysis = await analyzeResume(resumeText);
    
    // Update user profile
    const user = await User.findById(req.user._id);
    user.resumeProfile = {
      skills: analysis.skills || [],
      softSkills: analysis.softSkills || [],
      missingSkills: analysis.missingSkills || [],
      experienceLevel: analysis.experienceLevel || 'Entry Level',
      summary: analysis.summary || '',
      atsCompatibility: analysis.atsCompatibility || 70,
      improvements: analysis.improvements || []
    };
    await user.save();

    res.json({ analysis, userProfile: user.resumeProfile });
  } catch (error) {
    console.error('Error parsing/analyzing resume:', error);
    res.status(500).json({ message: error.message });
  }
};

const getJobMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.resumeProfile || !user.resumeProfile.skills) {
      return res.status(400).json({ message: 'Please upload and analyze a resume first.' });
    }

    const { location, experienceLevel, remoteOnsite, minSalary } = req.query;
    const filters = { location, experienceLevel, remoteOnsite, minSalary };

    const matches = await findMatchingJobs(user.resumeProfile, filters);
    res.json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCoverLetter = async (req, res) => {
  try {
    const { jobDetails, tone } = req.body || {};
    const user = await User.findById(req.user._id);
    
    const coverLetter = await generateCoverLetter(user, jobDetails, tone);
    res.json({ coverLetter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInterviewPrep = async (req, res) => {
  try {
    const { jobDetails } = req.body || {};
    const user = await User.findById(req.user._id);
    
    const prepData = await generateInterviewQuestions(jobDetails, user);
    res.json(prepData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResumeAndAnalyze, getJobMatches, createCoverLetter, getInterviewPrep };
