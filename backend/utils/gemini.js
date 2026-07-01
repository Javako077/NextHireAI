const { GoogleGenAI } = require('@google/genai');

const initGemini = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not defined in .env");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

const ai = initGemini();

module.exports = { ai };
