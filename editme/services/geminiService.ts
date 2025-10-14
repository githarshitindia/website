import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64.split(',')[1],
      mimeType,
    },
  };
};

export const generateImage = async (prompt: string, images: string[]): Promise<string> => {
  const model = 'gemini-2.5-flash-image';
  
  const imageParts = images.map(img => {
      // Basic check for image format from data URL
      const mimeType = img.startsWith('data:image/jpeg') ? 'image/jpeg' : 'image/png';
      return fileToGenerativePart(img, mimeType);
  });

  const contents = {
    parts: [...imageParts, { text: prompt }],
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }
    throw new Error("No image data found in the response.");
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("The AI failed to generate an image. This might be due to a safety policy violation or an internal error.");
  }
};
