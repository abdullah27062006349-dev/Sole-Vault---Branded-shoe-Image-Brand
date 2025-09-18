import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateShoeImage = async (prompt: string, style: string): Promise<string> => {
  try {
    let styleSuffix = '';
    switch (style) {
      case '3d-render':
        styleSuffix = ', as a detailed 3D product render, octane render, on a clean studio background';
        break;
      case 'illustration':
        styleSuffix = ', as a digital vector illustration, vibrant colors, flat design, on a clean background';
        break;
      case 'line-art':
        styleSuffix = ', as a clean black and white line art drawing, technical sketch style, on a white background';
        break;
      case 'photorealistic':
      default:
        styleSuffix = ', as a professional digital product photograph, studio lighting, clean background';
        break;
    }

    const fullPrompt = `${prompt}${styleSuffix}`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No images were generated.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};