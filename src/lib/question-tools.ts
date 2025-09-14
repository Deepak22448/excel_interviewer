import { generateObject } from "ai";
import { tool } from "ai";
import { z } from "zod";
import { EXCEL_QUESTIONS, getQuestionSelectionInfo } from "./question-bank";
import {
  QuestionSelectionSchema,
  ResponseEvaluationSchema,
} from "./question-schemas";
import { model } from "./model";
import {
  questionSelectionSystemPrompt,
  createQuestionSelectionPrompt,
  responseEvaluationSystemPrompt,
  createResponseEvaluationPrompt,
} from "./prompts";

export const getNextQuestionTool = tool({
  description:
    "Intelligently select the next appropriate Excel interview question based on candidate performance and conversation history",
  inputSchema: z.object({
    usedQuestionIndices: z
      .array(z.number())
      .describe("Array of question IDs already asked"),
    candidatePerformanceSummary: z
      .string()
      .describe("Summary of how the candidate has performed so far"),
    conversationHistory: z
      .string()
      .describe("Recent conversation context for question selection"),
    currentQuestionCount: z
      .number()
      .describe("Current number of questions asked"),
  }),
  execute: async ({
    usedQuestionIndices,
    candidatePerformanceSummary,
    conversationHistory,
    currentQuestionCount,
  }) => {
    try {
      // Filter available questions and create lightweight selection data
      const availableQuestions = EXCEL_QUESTIONS.filter(
        (q) => !usedQuestionIndices.includes(q.id)
      );

      if (availableQuestions.length === 0) {
        return {
          success: false,
          error: "No more questions available",
          selectedQuestion: null,
        };
      }

      // Create lightweight selection info for context efficiency
      const selectionData = getQuestionSelectionInfo(availableQuestions);

      const result = await generateObject({
        model,
        system: questionSelectionSystemPrompt,
        prompt: createQuestionSelectionPrompt(
          selectionData,
          candidatePerformanceSummary,
          conversationHistory,
          currentQuestionCount,
          usedQuestionIndices
        ),

        schema: QuestionSelectionSchema,
      });

      const selectedQuestion = EXCEL_QUESTIONS.find(
        (q) => q.id === result.object.selectedQuestionId
      );

      if (!selectedQuestion) {
        return {
          success: false,
          error: "Selected question not found in question bank",
          selectedQuestion: null,
        };
      }

      return {
        success: true,
        selectedQuestion,
      };
    } catch (error) {
      console.error("Error selecting next question:", error);
      return {
        success: false,
        error: "Failed to select next question",
        selectedQuestion: null,
      };
    }
  },
});

export const evaluateResponseTool = tool({
  description:
    "Comprehensively evaluate candidate's response, provide feedback, and determine next interview action",
  inputSchema: z.object({
    originalQuestion: z
      .string()
      .describe("The original question that was asked"),
    candidateResponse: z
      .string()
      .describe("The candidate's complete response to analyze"),
    expectedComponents: z
      .array(z.string())
      .describe("Expected components of a good answer"),
    followUpTriggers: z
      .array(z.string())
      .describe("Specific triggers that indicate need for follow-up"),
    currentFollowUpCount: z
      .number()
      .describe("Number of follow-ups already asked for this question"),
    questionCategory: z
      .string()
      .describe(
        "Category of the question (formulas, functions, dataAnalysis, bestPractices)"
      ),
    conversationContext: z
      .string()
      .describe("Recent conversation context for better analysis"),
  }),
  execute: async ({
    originalQuestion,
    candidateResponse,
    expectedComponents,
    followUpTriggers,
    currentFollowUpCount,
    questionCategory,
    conversationContext,
  }) => {
    try {
      // Hard limit on follow-ups
      if (currentFollowUpCount >= 2) {
        return {
          success: true,
          evaluation: {
            responseQuality: "Partial" as const,
            candidateFeedback:
              "Thank you for your response. Let's move on to the next question.",
            shouldAskFollowUp: false,
            followUpQuestion: undefined,
            readyForNextQuestion: true,
          },
        };
      }

      const result = await generateObject({
        model,
        system: responseEvaluationSystemPrompt,
        prompt: createResponseEvaluationPrompt(
          originalQuestion,
          candidateResponse,
          expectedComponents,
          followUpTriggers,
          questionCategory,
          currentFollowUpCount,
          conversationContext
        ),

        schema: ResponseEvaluationSchema,
      });

      return {
        success: true,
        evaluation: result.object,
      };
    } catch (error) {
      console.error("Error evaluating response:", error);
      return {
        success: false,
        error: "Failed to evaluate candidate response",
        evaluation: null,
      };
    }
  },
});
