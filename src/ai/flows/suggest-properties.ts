'use server';

/**
 * @fileOverview An AI agent that suggests properties based on user preferences and browsing history.
 *
 * - suggestProperties - A function that suggests properties based on user preferences.
 * - SuggestPropertiesInput - The input type for the suggestProperties function.
 * - SuggestPropertiesOutput - The return type for the suggestProperties function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPropertiesInputSchema = z.object({
  preferences: z
    .string()
    .describe('The user preferences for properties, such as location, price range, property type, and desired features.'),
  browsingHistory: z
    .string()
    .describe('The user browsing history on the platform, including viewed properties, saved searches, and interactions.'),
});
export type SuggestPropertiesInput = z.infer<typeof SuggestPropertiesInputSchema>;

const SuggestPropertiesOutputSchema = z.object({
  propertyRecommendations: z
    .string()
    .describe('A list of property recommendations tailored to the user preferences and browsing history.'),
  reasoning: z
    .string()
    .describe('Explanation of why the properties are recommended'),
});
export type SuggestPropertiesOutput = z.infer<typeof SuggestPropertiesOutputSchema>;

export async function suggestProperties(input: SuggestPropertiesInput): Promise<SuggestPropertiesOutput> {
  return suggestPropertiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPropertiesPrompt',
  input: {schema: SuggestPropertiesInputSchema},
  output: {schema: SuggestPropertiesOutputSchema},
  prompt: `You are an expert real estate agent specializing in personalized property recommendations.

You will use the user's stated preferences and browsing history to provide a list of properties that match their needs and interests.

Preferences: {{{preferences}}}
Browsing History: {{{browsingHistory}}}

Based on these details, what properties would you recommend, and why?
`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const suggestPropertiesFlow = ai.defineFlow(
  {
    name: 'suggestPropertiesFlow',
    inputSchema: SuggestPropertiesInputSchema,
    outputSchema: SuggestPropertiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
