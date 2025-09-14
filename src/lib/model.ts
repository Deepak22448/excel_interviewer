import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";

export const model = process.env.OPENAI_API_KEY
  ? openai("gpt-4o")
  : google("gemini-2.5-flash");
