const { ai } = require('../utils/gemini');

const generateCoverLetter = async (userProfile, jobDetails, tone = 'enterprise') => {
  if (!ai) {
    throw new Error('Gemini AI is not initialized.');
  }

  const toneInstruction = tone === 'startup' 
    ? "Tone: Startup/Creative. Enthusiastic, direct, conversational, passionate about innovation, and showing hunger to grow with the company. Avoid overly formal corporate jargon."
    : "Tone: Professional/Enterprise. Formal, structured, authoritative, demonstrating enterprise value alignment, corporate etiquette, and industry expertise.";

  const prompt = `
    You are an expert career coach and professional copywriter. Write a highly tailored, ATS-friendly cover letter for the following job application.
    Make it sound natural, highlight the candidate's skills that match the job, and express strong enthusiasm.
    
    ${toneInstruction}

    Candidate Profile:
    Name: ${userProfile.name}
    Technical Skills: ${userProfile.resumeProfile?.skills?.join(', ') || 'Various technical skills'}
    Soft Skills: ${userProfile.resumeProfile?.softSkills?.join(', ') || 'Collaboration'}
    Summary: ${userProfile.resumeProfile?.summary || 'An enthusiastic professional.'}

    Job Details:
    Title: ${jobDetails.title}
    Company: ${jobDetails.company}
    Description: ${jobDetails.description}
    Required Skills: ${jobDetails.requiredSkills ? jobDetails.requiredSkills.join(', ') : ''}

    Structure rules:
    - Include candidate header placeholders if needed, or format directly as a professional letter.
    - Start with a compelling opening hook matching the chosen tone.
    - Connect the candidate's core skills/experience directly to the job requirements.
    - Express interest in the specific company.
    - Conclude with a strong call-to-action and sign-off.
    - Make sure the cover letter is professional, grammatically perfect, and optimized for Applicant Tracking Systems (ATS) by matching critical keywords from the job details.

    Output ONLY the cover letter text, properly formatted. Do not include markdown tags like \`\`\` or similar at the beginning or end.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Error in generateCoverLetter:', error);
    throw new Error('Failed to generate cover letter.');
  }
};

module.exports = { generateCoverLetter };
