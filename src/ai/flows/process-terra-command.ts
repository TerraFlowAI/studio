'use server';

/**
 * @fileOverview A master AI agent to process user commands and perform autonomous actions.
 *
 * - processTerraCommand - A function that takes a user command and returns a text response.
 * - ProcessTerraCommandInput - The input type for the processTerraCommand function.
 * - ProcessTerraCommandOutput - The return type for the processTerraCommand function.
 */

import {defineFlow, run, generate} from 'genkit';
import {defineTool} from 'genkit/tool';
import {z} from 'zod';
import Twilio from 'twilio';
import {geminiPro} from '@genkit-ai/googleai';

// Schemas remain the same as the user command and final response text are simple strings.
const ProcessTerraCommandInputSchema = z.object({
  command: z.string().describe('The user command to be processed.'),
});
export type ProcessTerraCommandInput = z.infer<
  typeof ProcessTerraCommandInputSchema
>;

const ProcessTerraCommandOutputSchema = z.object({
  responseText: z
    .string()
    .describe(
      'The AI-generated response to the user command, summarizing actions taken.'
    ),
});
export type ProcessTerraCommandOutput = z.infer<
  typeof ProcessTerraCommandOutputSchema
>;

// --- Tool Definitions ---

// Placeholder/Mock for finding leads. In a real app, this would query Firestore.
const findLeads = defineTool(
  {
    name: 'findLeads',
    description:
      'Finds leads in the CRM based on status (e.g., "Hot", "New", "Contacted").',
    inputSchema: z.object({status: z.string()}),
    outputSchema: z.array(z.object({name: z.string(), phone: z.string()})),
  },
  async ({status}) => {
    console.log(`TOOL: Finding leads with status: ${status}`);
    // Mock data. Replace with actual Firestore query.
    if (status.toLowerCase() === 'hot') {
      return [
        {name: 'Aarav Sharma', phone: '+919876543210'},
        {name: 'Priya Patel', phone: '+919123456789'},
        {name: 'Rohan Kumar', phone: '+919988776655'},
      ];
    }
    return [];
  }
);

// Twilio Voice Call Tool
const initiateVoiceCall = defineTool(
  {
    name: 'initiateVoiceCall',
    description:
      'Initiates a voice call to a specified phone number with a given script.',
    inputSchema: z.object({
      phoneNumber: z
        .string()
        .describe(
          "The recipient's phone number in E.164 format (e.g., +14155552671)."
        ),
      script: z
        .string()
        .describe(
          'The script for the AI to say when the call connects. Should start with a greeting.'
        ),
    }),
    outputSchema: z.string(),
  },
  async ({phoneNumber, script}) => {
    console.log(`TOOL: Calling ${phoneNumber} with script: "${script}"`);

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      const errorMessage =
        'Error: Twilio credentials not configured in environment variables.';
      console.error(errorMessage);
      return errorMessage;
    }

    const client = Twilio(accountSid, authToken);
    const twiml = `<Response><Say voice="Polly.Aditi">${script}</Say></Response>`;

    try {
      const call = await client.calls.create({
        twiml: twiml,
        to: phoneNumber,
        from: twilioPhoneNumber,
      });
      console.log(`Call initiated with SID: ${call.sid}`);
      return `Successfully initiated call to ${phoneNumber}.`;
    } catch (error) {
      console.error('Twilio call failed:', error);
      return `Failed to initiate call to ${phoneNumber}.`;
    }
  }
);

// Placeholder for sending an email
const sendEmail = defineTool(
  {
    name: 'sendEmail',
    description: 'Sends an email to a specified recipient.',
    inputSchema: z.object({
      recipientEmail: z.string().email(),
      subject: z.string(),
      body: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({recipientEmail, subject}) => {
    console.log(
      `TOOL: Pretending to send email to ${recipientEmail} with subject "${subject}"`
    );
    // In a real app, integrate with Resend, SendGrid, etc.
    return `Email queued for sending to ${recipientEmail}.`;
  }
);

// Placeholder for creating a calendar appointment
const createCalendarAppointment = defineTool(
  {
    name: 'createCalendarAppointment',
    description: "Creates a new event in the user's calendar.",
    inputSchema: z.object({
      title: z.string(),
      dateTime: z.string().datetime(),
      attendees: z.array(z.string().email()),
    }),
    outputSchema: z.string(),
  },
  async ({title, dateTime, attendees}) => {
    console.log(
      `TOOL: Pretending to create calendar event "${title}" at ${dateTime} for ${attendees.join(
        ', '
      )}`
    );
    // In a real app, integrate with Google Calendar API
    return `Successfully scheduled "${title}" in the calendar.`;
  }
);

const systemInstruction = `You are Terra, an autonomous real estate AI assistant. Your goal is to help the user by performing actions on their behalf using the available tools.

Analyze the user's command and determine the sequence of tools required to fulfill the request.

- If a user asks to contact leads, first use the 'findLeads' tool to get their information.
- Then, for each lead, use the appropriate tool like 'initiateVoiceCall' or 'sendEmail'.
- When initiating a call, you must generate a brief, friendly, and professional script to be spoken. For example: "Hi [Lead Name], this is Terra, the AI assistant for your agent. I'm calling about your interest in our properties. Is now a good time to talk for a minute?"
- After using the tools, provide a clear, concise summary of the actions you have taken. Do not just list the tool outputs.
- If you cannot fulfill the request with the available tools, explain what you can do instead.

Example user command: "Call my hot leads."
Your thought process should be:
1. Call 'findLeads' with status: 'Hot'.
2. Receive a list of leads, e.g., [{name: 'Priya', phone: '+91...'}, {name: 'Rohan', phone: '+91...'}].
3. For each lead, call 'initiateVoiceCall' with their phone number and a generated script.
4. Your final response to the user should be a summary, like "I've just initiated calls to 2 of your hot leads: Priya and Rohan. I'll let you know how it goes."`;


export async function processTerraCommand(
  input: ProcessTerraCommandInput
): Promise<ProcessTerraCommandOutput> {
  return processTerraCommandFlow(input);
}

const processTerraCommandFlow = defineFlow(
  {
    name: 'processTerraCommandFlow',
    inputSchema: ProcessTerraCommandInputSchema,
    outputSchema: ProcessTerraCommandOutputSchema,
  },
  async (input) => {
    const llmResponse = await generate({
      prompt: `User command: ${input.command}`,
      model: geminiPro,
      tools: [
        findLeads,
        initiateVoiceCall,
        sendEmail,
        createCalendarAppointment,
      ],
      systemInstruction: systemInstruction,
    });

    const responseText = llmResponse.text();

    if (!responseText) {
      throw new Error('The AI failed to generate a response text.');
    }

    return {responseText};
  }
);
