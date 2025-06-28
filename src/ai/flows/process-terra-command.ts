'use server';

/**
 * @fileOverview A master AI agent to process user commands.
 *
 * - processTerraCommand - A function that takes a user command and returns a text response.
 * - ProcessTerraCommandInput - The input type for the processTerraCommand function.
 * - ProcessTerraCommandOutput - The return type for the processTerraCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessTerraCommandInputSchema = z.object({
  command: z.string().describe('The user command to be processed.'),
});
export type ProcessTerraCommandInput = z.infer<typeof ProcessTerraCommandInputSchema>;

const ProcessTerraCommandOutputSchema = z.object({
  responseText: z.string().describe('The AI-generated response to the user command.'),
});
export type ProcessTerraCommandOutput = z.infer<typeof ProcessTerraCommandOutputSchema>;


export async function processTerraCommand(input: ProcessTerraCommandInput): Promise<ProcessTerraCommandOutput> {
  return processTerraCommandFlow(input);
}


const prompt = ai.definePrompt({
  name: 'processTerraCommandPrompt',
  input: {schema: ProcessTerraCommandInputSchema},
  output: {schema: ProcessTerraCommandOutputSchema},
  prompt: `You are Terra, a helpful real estate AI assistant.
  The user has given you a command. Acknowledge the command and provide a brief, friendly confirmation that you are working on it.
  
  For example, if the user says "Call my 3 hottest leads", you could respond with "On it. I'm calling your top 3 leads now and will schedule appointments if they are available."
  
  Do not try to actually perform the action, just provide a natural language confirmation.
  
  User command: {{{command}}}
  `,
});


const processTerraCommandFlow = ai.defineFlow(
  {
    name: 'processTerraCommandFlow',
    inputSchema: ProcessTerraCommandInputSchema,
    outputSchema: ProcessTerraCommandOutputSchema,
  },
  async input => {
    // In a real application, this is where you would add complex logic,
    // like using Genkit tools to interact with a database (e.g., Supabase),
    // a CRM, or other APIs (e.g., Twilio for calls).
    const {output} = await prompt(input);
    return output!;
  }
);
