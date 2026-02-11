import { GoogleGenerativeAI } from "@google/generative-ai";

// API ачкычын Vite чөйрөсүнөн коопсуз түрдө алабыз
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const getAIRecommendation = async (prompt: string) => {
  if (!API_KEY) {
    console.error("API Key табылган жок! .env.local файлын текшериңиз.");
    return "API Key катасы.";
  }

  try {
    // 1. Моделди тандайбыз
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are an AI advisor for an IT training center. Provide data-driven insights about students, curriculum optimization, and sales growth in Kyrgyz or Russian as requested."
    });

    // 2. Контентти түзөбүз
    const result = await model.generateContent(prompt);
    
    // 3. Жоопту алабыз
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("AI Error:", error);
    return "Кечириңиз, AI менен байланышууда ката кетти.";
  }
};