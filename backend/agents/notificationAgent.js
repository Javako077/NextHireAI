const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { findMatchingJobs } = require('./jobSearchAgent');

const startNotificationService = () => {
  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host/port for other services
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Run every day at 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('Running Daily Career Assistant Cron Job...');
    try {
      const users = await User.find({});
      
      for (const user of users) {
        if (!user.resumeProfile || !user.resumeProfile.skills || user.resumeProfile.skills.length === 0) continue;

        const matchedJobs = await findMatchingJobs(user.resumeProfile);
        
        if (matchedJobs.length > 0) {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your Daily Job Matches - AI Job Hunter Agent',
            html: `
              <h2>Hello ${user.name},</h2>
              <p>Here are your top job matches for today based on your skills:</p>
              <ul>
                ${matchedJobs.map(job => `<li><strong>${job.title}</strong> at ${job.company} - ${job.experienceLevel}</li>`).join('')}
              </ul>
              <p>Log in to your dashboard to generate cover letters and prepare for interviews!</p>
              <br/>
              <p>Best Regards,</p>
              <p>AI Job Hunter Agent</p>
            `
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(`Error sending email to ${user.email}:`, error);
            } else {
              console.log(`Email sent to ${user.email}:`, info.response);
            }
          });
        }
      }
    } catch (error) {
      console.error('Error in Notification Service:', error);
    }
  });
  
  console.log('Notification Service Started.');
};

module.exports = { startNotificationService };
