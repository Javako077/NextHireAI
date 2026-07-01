const { ai } = require('../utils/gemini');

const generateInterviewQuestions = async (jobDetails, userProfile) => {
  if (!ai) {
    throw new Error('Gemini AI is not initialized.');
  }

  const prompt = `
    You are an expert technical interviewer and career coach. Generate 5 highly tailored interview questions for a candidate applying for the following job.
    The candidate's profile is also provided to personalize the questions to their experience.
    
    In corporate guidelines, make sure the questions include:
    - Technical questions (assessing system design, architecture, or tool knowledge)
    - Coding questions (assessing algorithms, logical syntax, or problem-solving)
    - Behavioral questions (assessing teamwork, conflict resolution, or leadership)

    Provide the output strictly in JSON format with the following structure:
    {
      "questions": [
        {
          "type": "Technical" | "Coding" | "Behavioral",
          "question": "The question text",
          "sampleAnswer": "An ideal, detailed sample answer showing how a top-tier candidate should address this question.",
          "improvementTips": "Key concepts to cover, areas of potential pitfalls, or improvement suggestions for the candidate."
        }
      ]
    }

    Job Details:
    Title: ${jobDetails.title}
    Company: ${jobDetails.company}
    Description: ${jobDetails.description}
    Required Skills: ${jobDetails.requiredSkills ? jobDetails.requiredSkills.join(', ') : 'Not specified'}

    Candidate Details:
    Name: ${userProfile.name}
    Skills: ${userProfile.resumeProfile?.skills?.join(', ') || 'Not specified'}
    Soft Skills: ${userProfile.resumeProfile?.softSkills?.join(', ') || 'Not specified'}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error('Error in generateInterviewQuestions:', error);
    throw new Error('Failed to generate interview questions.');
  }
};

module.exports = { generateInterviewQuestions };
