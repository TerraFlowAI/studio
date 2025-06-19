import { config } from 'dotenv';
config();

import '@/ai/flows/generate-property-description.ts';
import '@/ai/flows/answer-property-query.ts';
import '@/ai/flows/generate-cma-report.ts';
import '@/ai/flows/suggest-properties.ts';