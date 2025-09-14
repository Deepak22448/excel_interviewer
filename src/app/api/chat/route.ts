import { convertToModelMessages, streamText, stepCountIs } from "ai";
import { generateFeedbackTool } from "@/lib/feedback-tool";
import {
  getNextQuestionTool,
  evaluateResponseTool,
} from "@/lib/question-tools";
import { model } from "@/lib/model";
import { alexMorganSystemPrompt } from "@/lib/prompts";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model,
    system: alexMorganSystemPrompt,
    messages: convertToModelMessages(messages),
    tools: {
      generateFeedback: generateFeedbackTool,
      getNextQuestion: getNextQuestionTool,
      evaluateResponse: evaluateResponseTool,
    },
    toolChoice: "auto",
    stopWhen: stepCountIs(7),
  });
  return result.toUIMessageStreamResponse();
}
