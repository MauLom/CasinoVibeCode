// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered 'Fairness Oracle' tool to dynamically adjust game parameters.
 *
 * - adjustGameParameters - A function that handles the game parameter adjustment process.
 * - AdjustGameParametersInput - The input type for the adjustGameParameters function.
 * - AdjustGameParametersOutput - The return type for the adjustGameParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustGameParametersInputSchema = z.object({
  gameName: z.string().describe('The name of the game to adjust parameters for.'),
  totalBets: z.number().describe('The total amount bet on the game.'),
  totalPayouts: z.number().describe('The total amount paid out in the game.'),
  currentHouseEdge: z.number().describe('The current house edge of the game (percentage).'),
});
export type AdjustGameParametersInput = z.infer<typeof AdjustGameParametersInputSchema>;

const AdjustGameParametersOutputSchema = z.object({
  newHouseEdge: z.number().describe('The suggested new house edge for the game (percentage).'),
  reasoning: z.string().describe('The reasoning behind the suggested adjustment.'),
});
export type AdjustGameParametersOutput = z.infer<typeof AdjustGameParametersOutputSchema>;

export async function adjustGameParameters(input: AdjustGameParametersInput): Promise<AdjustGameParametersOutput> {
  return adjustGameParametersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustGameParametersPrompt',
  input: {schema: AdjustGameParametersInputSchema},
  output: {schema: AdjustGameParametersOutputSchema},
  prompt: `You are an AI-powered fairness oracle for a crypto casino. Your role is to dynamically adjust game parameters to ensure fairness and adherence to the 80/20 redistribution rule (80% of total bets are redistributed as prizes, and 20% is retained as profit).

  You are provided with the following information about a game:
  - Game Name: {{{gameName}}}
  - Total Bets: {{{totalBets}}}
  - Total Payouts: {{{totalPayouts}}}
  - Current House Edge: {{{currentHouseEdge}}}%

  Based on this information, suggest a new house edge for the game that will help maintain the 80/20 redistribution rule. Explain your reasoning for the suggested adjustment.

  Ensure that the newHouseEdge is a valid number between 0 and 100.`,
});

const adjustGameParametersFlow = ai.defineFlow(
  {
    name: 'adjustGameParametersFlow',
    inputSchema: AdjustGameParametersInputSchema,
    outputSchema: AdjustGameParametersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
