
import { GoogleGenAI } from "@google/genai";
import { Verse, PrayerTone } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePrayerFromVerse = async (userInput: string, verse: Verse, tone: PrayerTone): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    你是一位充滿智慧與憐憫的屬靈導師。
    一位使用者正在默想聖經詩篇中的這段經文：「${verse.ref} - ${verse.text}」。
    他們分享了他們個人的想法：「${userInput}」。

    請根據這段經文和他們的想法，為他們撰寫一段簡短、個人化且充滿鼓勵的禱告。
    禱告的語氣應該是「${tone}」的語氣。
    請直接提供禱告文，不要包含任何開頭或結尾的客套話。
    請使用繁體中文。
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating prayer with Gemini API:", error);
    throw new Error("Failed to generate prayer.");
  }
};
