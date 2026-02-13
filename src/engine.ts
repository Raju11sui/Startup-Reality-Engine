import { gemini20Flash, googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';
import { EVALUATION_SYSTEM_PROMPT, generateEvaluationPrompt } from './engine/prompts';

const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })],
    model: gemini20Flash,
});

export const startupEvaluationFlow = ai.defineFlow(
    {
        name: 'startupEvaluationFlow',
        inputSchema: z.object({
            problem_statement: z.string(),
            target_audience: z.string(),
            unique_differentiation: z.string(),
            business_model_type: z.string(),
            revenue_model: z.string(),
            starting_budget: z.number(),
            monthly_expenses: z.number(),
            team_size: z.number(),
            tech_skill: z.number(),
            marketing_skill: z.number(),
            business_skill: z.number(),
            weekly_hours: z.number(),
            first_startup: z.boolean(),
            country: z.string(),
            industry: z.string(),
            competitors: z.string().optional(),
        }),
        outputSchema: z.string(),
    },
    async (input) => {
        const { text } = await ai.generate({
            system: EVALUATION_SYSTEM_PROMPT,
            prompt: generateEvaluationPrompt(input),
            config: {
                temperature: 0.4,
            },
        });
        return text;
    }
);
