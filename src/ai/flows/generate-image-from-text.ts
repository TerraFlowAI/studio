'use server';
/**
 * @fileOverview An AI agent to generate images from text descriptions.
 *
 * - generateImageFromText - A function that handles the image generation process.
 * - GenerateImageFromTextInput - The input type for the generateImageFromText function.
 * - GenerateImageFromTextOutput - The return type for the generateImageFromText function.
 */

import {defineFlow, generate} from 'genkit';
import {z} from 'zod';
import {geminiProVision} from '@genkit-ai/googleai';

const GenerateImageFromTextInputSchema = z.object({
  description: z
    .string()
    .describe('The text description to generate an image from.'),
});
export type GenerateImageFromTextInput = z.infer<
  typeof GenerateImageFromTextInputSchema
>;

const GenerateImageFromTextOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateImageFromTextOutput = z.infer<
  typeof GenerateImageFromTextOutputSchema
>;

export async function generateImageFromText(
  input: GenerateImageFromTextInput
): Promise<GenerateImageFromTextOutput> {
  return generateImageFromTextFlow(input);
}

const generateImageFromTextFlow = defineFlow(
  {
    name: 'generateImageFromTextFlow',
    inputSchema: GenerateImageFromTextInputSchema,
    outputSchema: GenerateImageFromTextOutputSchema,
  },
  async (input) => {
    // Note: Image generation models might have different identifiers in v0.6.0
    // This uses geminiProVision as a placeholder. In a real v0.6.0 scenario,
    // you might need a specific image generation model or plugin.
    // The prompt structure for image generation is also simplified here.
    const llmResponse = await generate({
      prompt: `Generate a photorealistic image of a property based on this description: ${input.description}`,
      model: geminiProVision, // Placeholder for an actual image generation model in v0.6.0
      output: {
        format: 'media', // Assuming media format for image output
      },
    });

    const media = llmResponse.output();
    if (!media?.url) {
      throw new Error('Image generation failed or returned no media URL.');
    }

    return {imageUrl: media.url};
  }
);
