import { model } from "./model";
import { generateObject } from "ai";
import { tool } from "ai";
import { z } from "zod";
import { InterviewFeedbackSchema } from "./feedback-schema";
import {
  feedbackGenerationSystemPrompt,
  createFeedbackGenerationPrompt,
} from "./prompts";

export const generateFeedbackTool = tool({
  description:
    "Generate a comprehensive feedback report based on the interview conversation",
  inputSchema: z.object({
    conversationSummary: z
      .string()
      .describe("A summary of the key points from the interview conversation"),
  }),
  execute: async ({ conversationSummary }) => {
    try {
      const result = await generateObject({
        model,
        system: feedbackGenerationSystemPrompt,
        prompt: createFeedbackGenerationPrompt({ conversationSummary }),
        schema: InterviewFeedbackSchema,
      });

      return {
        success: true,
        feedback: result.object,
      };
    } catch (error) {
      console.error("Feedback generation error:", error);
      return {
        success: false,
        error: "Failed to generate feedback report",
      };
    }
  },
});
