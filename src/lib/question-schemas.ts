import { z } from 'zod';

export const QuestionSelectionSchema = z.object({
  selectedQuestionId: z.number().describe("ID of the selected question from the question bank")
});

export const ResponseEvaluationSchema = z.object({
  responseQuality: z.enum(['Excellent', 'Good', 'Partial', 'Unclear', 'Incorrect']).describe("Overall quality assessment of the candidate's response"),
  candidateFeedback: z.string().describe("Constructive feedback to provide to the candidate about their answer"),
  shouldAskFollowUp: z.boolean().describe("Whether a follow-up question would add value to the assessment"),
  followUpQuestion: z.string().optional().describe("The specific follow-up question to ask (only if shouldAskFollowUp is true)"),
  readyForNextQuestion: z.boolean().describe("Whether to proceed to the next main question")
});

export type QuestionSelection = z.infer<typeof QuestionSelectionSchema>;
export type ResponseEvaluation = z.infer<typeof ResponseEvaluationSchema>;