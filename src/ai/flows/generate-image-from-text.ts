
'use server';
/**
 * @fileOverview An AI agent to generate images from text descriptions.
 *
 * - generateImageFromText - A function that handles the image generation process.
 * - GenerateImageFromTextInput - The input type for the generateImageFromText function.
 * - GenerateImageFromTextOutput - The return type for the generateImageFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageFromTextInputSchema = z.object({
  description: z.string().describe('The text description to generate an image from.'),
});
export type GenerateImageFromTextInput = z.infer<typeof GenerateImageFromTextInputSchema>;

const GenerateImageFromTextOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI. Format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateImageFromTextOutput = z.infer<typeof GenerateImageFromTextOutputSchema>;

export async function generateImageFromText(input: GenerateImageFromTextInput): Promise<GenerateImageFromTextOutput> {
  return generateImageFromTextFlow(input);
}

const generateImageFromTextFlow = ai.defineFlow(
  {
    name: 'generateImageFromTextFlow',
    inputSchema: GenerateImageFromTextInputSchema,
    outputSchema: GenerateImageFromTextOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation', // Specific model for image generation
      prompt: `Generate a photorealistic image of a property based on this description: ${input.description}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must include both
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed or returned no media URL.');
    }

    return { imageUrl: media.url };
  }
);
