import { z } from 'zod';

export const QuestionSelectionSchema = z.object({
  selectedQuestionId: z.number().describe("ID of the selected question from the question bank")
});

export type QuestionSelection = z.infer<typeof QuestionSelectionSchema>;