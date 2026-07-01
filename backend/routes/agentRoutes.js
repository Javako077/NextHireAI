const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { protect } = require('../middleware/authMiddleware');
const { uploadResumeAndAnalyze, getJobMatches, createCoverLetter, getInterviewPrep } = require('../controllers/agentController');

router.post('/resume', protect, upload.single('resumeFile'), uploadResumeAndAnalyze);
router.get('/jobs', protect, getJobMatches);
router.post('/cover-letter', protect, createCoverLetter);
router.post('/interview', protect, getInterviewPrep);

module.exports = router;
