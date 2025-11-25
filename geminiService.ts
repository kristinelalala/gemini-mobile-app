import { GoogleGenAI } from "@google/genai";
import { ITINERARY_DATA } from "./constants";

// Construct a context string from the itinerary data
const ITINERARY_CONTEXT = JSON.stringify(ITINERARY_DATA, null, 2);

const SYSTEM_INSTRUCTION = `
You are an expert local guide and travel assistant for a user visiting Tokyo from Taiwan.
The user has a specific itinerary loaded into their app, which is provided below in JSON format.

ITINERARY_CONTEXT:
${ITINERARY_CONTEXT}

Your Goal:
Answer the user's questions about their trip, providing navigation advice, cultural tips, or weather info relevant to their specific schedule.
If they ask "Where do I go next?", check the time context or explain the sequence.
Keep answers concise and mobile-friendly (short paragraphs, bullet points).
Be enthusiastic and polite.
If the user asks about a location not in the itinerary, provide general advice but mention it's an extra stop.

IMPORTANT:
Always respond in Traditional Chinese (Taiwanese Mandarin usage).
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return "很抱歉，我現在無法連線。請檢查您的 API 金鑰設定。";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "無法產生回應，請再試一次。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，處理您的請求時發生錯誤。";
  }
};
