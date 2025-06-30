'use server';

/**
 * @fileOverview Generates a Comparative Market Analysis (CMA) report using AI.
 *
 * - generateCmaReport - A function that generates the CMA report.
 * - GenerateCmaReportInput - The input type for the generateCmaReport function.
 * - GenerateCmaReportOutput - The return type for the generateCmaReport function.
 */

import {defineFlow, generate} from 'genkit';
import {geminiPro} from '@genkit-ai/googleai';
import {z} from 'zod';

const GenerateCmaReportInputSchema = z.object({
  propertyAddress: z
    .string()
    .describe('The address of the property to analyze.'),
  propertyDetails: z
    .string()
    .describe(
      'Detailed information about the property (e.g., size, features, condition).'
    ),
  marketTrends: z
    .string()
    .describe('Current market trends and conditions in the area.'),
  comparableProperties: z
    .string()
    .describe(
      'Information about comparable properties in the area (e.g., recent sales, listings).'
    ),
});
export type GenerateCmaReportInput = z.infer<
  typeof GenerateCmaReportInputSchema
>;

const GenerateCmaReportOutputSchema = z.object({
  executiveSummary: z.string().describe('A summary of the CMA findings.'),
  propertyValuation: z.string().describe('The estimated value of the property.'),
  marketAnalysis: z
    .string()
    .describe('An analysis of the current market conditions.'),
  comparablePropertyAnalysis: z
    .string()
    .describe(
      'An analysis of the comparable properties and their impact on valuation.'
    ),
  recommendation: z
    .string()
    .describe('A recommendation for pricing and marketing the property.'),
});
export type GenerateCmaReportOutput = z.infer<
  typeof GenerateCmaReportOutputSchema
>;

export async function generateCmaReport(
  input: GenerateCmaReportInput
): Promise<GenerateCmaReportOutput> {
  return generateCmaReportFlow(input);
}

const generateCmaReportFlow = defineFlow(
  {
    name: 'generateCmaReportFlow',
    inputSchema: GenerateCmaReportInputSchema,
    outputSchema: GenerateCmaReportOutputSchema,
  },
  async (input) => {
    const prompt = `You are a real estate expert tasked with generating a Comparative Market Analysis (CMA) report.

    Analyze the provided property details, market trends, and comparable properties to determine an accurate property valuation and provide actionable recommendations.

    Property Address: ${input.propertyAddress}
    Property Details: ${input.propertyDetails}
    Market Trends: ${input.marketTrends}
    Comparable Properties: ${input.comparableProperties}

    Generate a comprehensive CMA report including:
    - An executive summary of the findings.
    - A detailed property valuation.
    - An analysis of the current market conditions.
    - An analysis of comparable properties and their impact on valuation.
    - A clear recommendation for pricing and marketing the property.

    Format the output in a professional and easy-to-understand manner.
    `;

    const llmResponse = await generate({
      prompt,
      model: geminiPro,
      output: {
        format: 'json',
        schema: GenerateCmaReportOutputSchema,
      },
    });

    return llmResponse.output()!;
  }
);
