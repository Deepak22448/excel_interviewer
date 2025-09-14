import { generateObject } from "ai";
import { tool } from "ai";
import { z } from "zod";
import { EXCEL_QUESTIONS, getQuestionSelectionInfo } from "./question-bank";
import {
  QuestionSelectionSchema,
  ResponseEvaluationSchema,
} from "./question-schemas";
import { model } from "./model";

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
        system: `\n
          You are an intelligent Excel interview question selector analyzing candidate performance to select optimal questions.

          SELECTION CRITERIA:
          - Assess candidate's current skill level from their performance
          - Choose appropriate difficulty progression (start easier, increase based on success)
          - Ensure comprehensive skill coverage (formulas, functions, data analysis, best practices)
          - Avoid questions already used
          - Consider interview flow and remaining time (aim for 3-4 total questions)
          - Select questions that will reveal the most about candidate capabilities

          DIFFICULTY GUIDELINES:
          - Strong performance → increase difficulty
          - Struggling → maintain or slightly decrease difficulty
          - Mixed performance → balanced difficulty
          - First question → start with Beginner/Intermediate level

          SKILL AREA PRIORITIES:
          - Cover different areas: formulas, functions, dataAnalysis, bestPractices
          - Adapt based on candidate's demonstrated strengths/weaknesses
          - Ensure well-rounded assessment
        \n`,

        prompt: `\n
          Select the next question based on:

          - AVAILABLE QUESTIONS: ${JSON.stringify(selectionData, null, 2)}
          - CANDIDATE PERFORMANCE: ${candidatePerformanceSummary}
          - CONVERSATION HISTORY: ${conversationHistory}
          - CURRENT QUESTION COUNT: ${currentQuestionCount}
          - USED QUESTION IDs: ${usedQuestionIndices.join(", ")}

          Select the most appropriate question ID from the available options above.
        \n`,

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
        system: `\n
          You are an expert Excel interview response evaluator with comprehensive responsibilities for assessment and candidate guidance.

          RESPONSE EVALUATION CRITERIA:
          - Analyze answer accuracy, depth, and technical understanding
          - Assess completeness against expected components
          - Evaluate practical knowledge vs theoretical understanding
          - Identify strengths and knowledge gaps demonstrated
          - Consider clarity of explanation and communication skills

          FEEDBACK GENERATION GUIDELINES:
          - Provide immediate constructive feedback to the candidate
          - Acknowledge correct aspects and good reasoning
          - Guide toward better understanding where gaps exist
          - Be encouraging while maintaining professional assessment standards
          - Keep feedback concise but meaningful (2-3 sentences)

          INTERVIEW FLOW DECISIONS:
          - Determine if follow-up would reveal deeper insights
          - Balance thoroughness with interview time constraints
          - Generate appropriate follow-up questions when beneficial
          - Signal readiness for next main question when assessment is complete

          QUESTION CATEGORY CONSIDERATIONS:
          - Formulas: Focus on syntax accuracy and logical understanding
          - Functions: Evaluate parameter knowledge and practical application
          - Data Analysis: Assess scalability thinking and methodology
          - Best Practices: Explore reasoning and real-world implications
        \n`,

        prompt: `\n
          Evaluate this candidate response comprehensively:

          - ORIGINAL QUESTION: ${originalQuestion}
          - CANDIDATE RESPONSE: ${candidateResponse}
          - EXPECTED COMPONENTS: ${expectedComponents.join(", ")}
          - FOLLOW-UP TRIGGERS: ${followUpTriggers.join(", ")}
          - QUESTION CATEGORY: ${questionCategory}
          - CURRENT FOLLOW-UP COUNT: ${currentFollowUpCount}/2
          - CONVERSATION CONTEXT: ${conversationContext}

          Provide evaluation, feedback, and determine next interview action.
        \n`,

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
