/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { GoogleGenAI } from "@google/genai";

const apiKey =  import.meta.env.VITE_GEMINI_API_KEY;  // replace with your real API key
const ai = new GoogleGenAI({ apiKey });

// Example model — you might need to pick a different one based on availability
const MODEL = "gemini-2.0-flash-001";  

async function run(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      // you can pass generation config if supported:
      extraGenerationParams: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      },
    });

    console.log("Response object:", response);

    const text = response.text;  // in this SDK, response has `text` property
    console.log("Text result:", text);
    return text;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

// Optional: list models (using the new SDK)
async function listModels() {
  try {
    const modelList = await ai.models.list();
    console.log("Available models:", modelList);
  } catch (err) {
    console.error("Could not list models:", err);
  }
}

listModels();

export default run;
