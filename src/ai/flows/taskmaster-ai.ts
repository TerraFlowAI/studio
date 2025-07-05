'use server';

/**
 * @fileOverview An AI agent for task management, suggesting plans based on task descriptions.
 *
 * - taskmasterAi - A function that handles task management and plan generation.
 * - TaskmasterAiInput - The input type for the taskmasterAi function.
 * - TaskmasterAiOutput - The return type for the taskmasterAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskmasterAiInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task to be managed.'),
});
export type TaskmasterAiInput = z.infer<typeof TaskmasterAiInputSchema>;

const TaskmasterAiOutputSchema = z.object({
  suggestedPlan: z.string().describe('The AI-generated suggested plan for the task.'),
});
export type TaskmasterAiOutput = z.infer<typeof TaskmasterAiOutputSchema>;

export async function taskmasterAi(input: TaskmasterAiInput): Promise<TaskmasterAiOutput> {
  return taskmasterAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taskmasterAiPrompt',
  input: {schema: TaskmasterAiInputSchema},
  output: {schema: TaskmasterAiOutputSchema},
  prompt: `You are an AI taskmaster. Based on the given task description, provide a detailed and actionable plan.

  Task Description: {{{taskDescription}}}

  Suggested Plan:`,
});

const taskmasterAiFlow = ai.defineFlow(
  {
    name: 'taskmasterAiFlow',
    inputSchema: TaskmasterAiInputSchema,
    outputSchema: TaskmasterAiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
