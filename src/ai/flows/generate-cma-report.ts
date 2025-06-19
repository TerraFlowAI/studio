// src/ai/flows/generate-cma-report.ts
'use server';

/**
 * @fileOverview Generates a Comparative Market Analysis (CMA) report using AI.
 *
 * - generateCmaReport - A function that generates the CMA report.
 * - GenerateCmaReportInput - The input type for the generateCmaReport function.
 * - GenerateCmaReportOutput - The return type for the generateCmaReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCmaReportInputSchema = z.object({
  propertyAddress: z.string().describe('The address of the property to analyze.'),
  propertyDetails: z
    .string()
    .describe('Detailed information about the property (e.g., size, features, condition).'),
  marketTrends: z.string().describe('Current market trends and conditions in the area.'),
  comparableProperties: z
    .string()
    .describe(
      'Information about comparable properties in the area (e.g., recent sales, listings).'
    ),
});
export type GenerateCmaReportInput = z.infer<typeof GenerateCmaReportInputSchema>;

const GenerateCmaReportOutputSchema = z.object({
  executiveSummary: z.string().describe('A summary of the CMA findings.'),
  propertyValuation: z.string().describe('The estimated value of the property.'),
  marketAnalysis: z.string().describe('An analysis of the current market conditions.'),
  comparablePropertyAnalysis: z
    .string()
    .describe('An analysis of the comparable properties and their impact on valuation.'),
  recommendation: z.string().describe('A recommendation for pricing and marketing the property.'),
});
export type GenerateCmaReportOutput = z.infer<typeof GenerateCmaReportOutputSchema>;

export async function generateCmaReport(input: GenerateCmaReportInput): Promise<GenerateCmaReportOutput> {
  return generateCmaReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCmaReportPrompt',
  input: {schema: GenerateCmaReportInputSchema},
  output: {schema: GenerateCmaReportOutputSchema},
  prompt: `You are a real estate expert tasked with generating a Comparative Market Analysis (CMA) report.

  Analyze the provided property details, market trends, and comparable properties to determine an accurate property valuation and provide actionable recommendations.

  Property Address: {{{propertyAddress}}}
  Property Details: {{{propertyDetails}}}
  Market Trends: {{{marketTrends}}}
  Comparable Properties: {{{comparableProperties}}}

  Generate a comprehensive CMA report including:
  - An executive summary of the findings.
  - A detailed property valuation.
  - An analysis of the current market conditions.
  - An analysis of comparable properties and their impact on valuation.
  - A clear recommendation for pricing and marketing the property.

  Format the output in a professional and easy-to-understand manner.
  `,
});

const generateCmaReportFlow = ai.defineFlow(
  {
    name: 'generateCmaReportFlow',
    inputSchema: GenerateCmaReportInputSchema,
    outputSchema: GenerateCmaReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

