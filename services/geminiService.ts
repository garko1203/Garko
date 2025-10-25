
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    jobTitle: {
      type: Type.STRING,
      description: "The job title or field that was analyzed."
    },
    aiImpact: {
      type: Type.STRING,
      description: "A comprehensive but encouraging summary of how AI is impacting this field, focusing on evolution rather than replacement."
    },
    skillHistory: {
      type: Type.STRING,
      description: "A brief history of the core skills in this field and how they have evolved over time."
    },
    currentAiDevelopments: {
      type: Type.STRING,
      description: "An overview of the current, cutting-edge AI developments and popular AI tools relevant to this field."
    },
    recommendedCourses: {
      type: Type.ARRAY,
      description: "A list of 3-5 highly recommended online courses to learn new skills. Include a mix of free and paid options.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the course." },
          url: { type: Type.STRING, description: "The direct URL to the course." },
          platform: { type: Type.STRING, description: "The platform hosting the course (e.g., Coursera, Udemy, freeCodeCamp)." },
          isFree: { type: Type.BOOLEAN, description: "Whether the course is free or not." }
        },
        required: ["name", "url", "platform", "isFree"]
      }
    },
    relevantApis: {
      type: Type.ARRAY,
      description: "A list of 3-5 relevant free and open APIs that a person in this field could learn or use for projects.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the API." },
          url: { type: Type.STRING, description: "The URL to the API documentation or homepage." },
          description: { type: Type.STRING, description: "A brief description of what the API does." }
        },
        required: ["name", "url", "description"]
      }
    },
    onlineCommunities: {
      type: Type.ARRAY,
      description: "A list of 3-5 valuable online communities (e.g., Discord servers, subreddits, forums) to join for learning and collaboration.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the community." },
          url: { type: Type.STRING, description: "The URL to join or view the community." },
          platform: { type: Type.STRING, description: "The platform where the community is hosted (e.g., Discord, Reddit)." }
        },
        required: ["name", "url", "platform"]
      }
    }
  },
  required: ["jobTitle", "aiImpact", "skillHistory", "currentAiDevelopments", "recommendedCourses", "relevantApis", "onlineCommunities"]
};

export const analyzeJobField = async (jobTitle: string): Promise<AnalysisResult> => {
  const prompt = `
    You are an expert career advisor specializing in the impact of AI on the job market.
    Your goal is to empower and educate, not to scare. Frame your analysis in a positive and proactive way,
    focusing on how professionals can adapt and thrive alongside AI.

    Analyze the job field: "${jobTitle}".

    Provide a comprehensive overview that includes:
    1.  **AI Impact:** How AI is changing the roles and responsibilities. Focus on augmentation and new opportunities.
    2.  **Skill History:** A brief history of the core skills to provide context for the current evolution.
    3.  **Current AI Developments:** Mention specific, popular AI tools and technologies shaping the field.
    4.  **Recommended Courses:** Suggest a few online courses (free and paid) to upskill.
    5.  **Relevant APIs:** Suggest free/open APIs to learn that are relevant to the field.
    6.  **Online Communities:** Recommend active communities for networking and learning.

    Your response MUST be a valid JSON object that adheres to the provided schema. Do not include any text outside of the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    return parsedData as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate analysis from Gemini API.");
  }
};
