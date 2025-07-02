'use server';

/**
 * @fileOverview An AI agent to answer user queries related to properties.
 *
 * - answerPropertyQuery - A function that handles answering property-related questions.
 * - AnswerPropertyQueryInput - The input type for the answerPropertyQuery function.
 * - AnswerPropertyQueryOutput - The return type for the answerPropertyQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnswerPropertyQueryInputSchema = z.object({
  query: z.string().describe('The property-related question from the user.'),
  propertyDetails: z
    .string()
    .optional()
    .describe('Optional details about the specific property in question.'),
});
export type AnswerPropertyQueryInput = z.infer<
  typeof AnswerPropertyQueryInputSchema
>;

const AnswerPropertyQueryOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user query.'),
});
export type AnswerPropertyQueryOutput = z.infer<
  typeof AnswerPropertyQueryOutputSchema
>;

export async function answerPropertyQuery(
  input: AnswerPropertyQueryInput
): Promise<AnswerPropertyQueryOutput> {
  return answerPropertyQueryFlow(input);
}

const answerPropertyQueryFlow = ai.defineFlow(
  {
    name: 'answerPropertyQueryFlow',
    inputSchema: AnswerPropertyQueryInputSchema,
    outputSchema: AnswerPropertyQueryOutputSchema,
  },
  async (input) => {
    const prompt = `You are a real estate expert AI chatbot. You answer user questions about properties.

    ${
      input.propertyDetails
        ? `Here are some details about the property in question: ${input.propertyDetails}`
        : ''
    }

    Question: ${input.query}
    Answer:`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-1.5-flash',
      output: {
        format: 'json',
        schema: AnswerPropertyQueryOutputSchema,
      },
    });

    return llmResponse.output!;
  }
);
