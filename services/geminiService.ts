
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendation = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an AI advisor for an IT training center. Provide data-driven insights about students, curriculum optimization, and sales growth in Kyrgyz or Russian as requested.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "AI кызматында ката кетти. Сураныч, бир аздан кийин кайталаңыз.";
  }
};
