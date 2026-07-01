const { ai } = require('../utils/gemini');

const analyzeResume = async (resumeText) => {
  if (!ai) {
    throw new Error('Gemini AI is not initialized. Please check your API key.');
  }

  const prompt = `
    You are an expert HR and technical recruiter. Analyze the following resume text and extract key information.
    Specifically:
    1. Identify all technical skills (languages, frameworks, databases, tools, developer platforms, etc.).
    2. Identify all soft skills (communication, collaboration, leadership, problem solving, etc.).
    3. Detect missing skills commonly expected for a developer with this background/experience level.
    4. Estimate ATS compatibility score out of 100 based on standard recruiter templates and keywords.
    5. Suggest detailed, actionable resume improvements to improve ATS scanning.

    Provide the output strictly in JSON format matching the following structure exactly:
    {
      "skills": ["TypeScript", "React", "Node.js"],
      "softSkills": ["Problem Solving", "Team Leadership"],
      "missingSkills": ["Docker", "CI/CD"],
      "experienceLevel": "Entry Level" | "Mid Level" | "Senior Level",
      "summary": "A brief summary of the candidate's professional profile.",
      "strengths": ["Strong typescript core knowledge", "Practical experience with modern frameworks"],
      "areasForImprovement": ["Highlight metrics in project accomplishments", "Add a dedicated skills section"],
      "atsCompatibility": 85,
      "improvements": [
        "Change the layout to a single-column format for cleaner ATS scanning.",
        "Add numbers and percentages to your experience bullet points to show quantifiable impact."
      ]
    }

    Resume Text:
    """
    ${resumeText}
    """
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error('Error in analyzeResume:', error);
    throw new Error('Failed to analyze resume with AI.');
  }
};

module.exports = { analyzeResume };
