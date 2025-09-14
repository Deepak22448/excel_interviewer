import { z } from "zod";

export const InterviewFeedbackSchema = z.object({
  candidate: z.object({
    name: z.string().describe("Candidate's full name"),
    role: z.string().optional().describe("Current role or position"),
    experience: z
      .string()
      .optional()
      .describe("Years of Excel experience mentioned"),
    background: z
      .string()
      .optional()
      .describe("Professional background or industry"),
    qualifications: z
      .array(z.string())
      .describe("Mentioned qualifications, certifications, or skills"),
  }),
  assessment: z.object({
    overallRating: z
      .number()
      .min(1)
      .max(10)
      .describe("Overall performance rating from 1-10"),
    technicalSkills: z.object({
      formulas: z
        .number()
        .min(1)
        .max(5)
        .describe("Excel formulas knowledge (1-5)"),
      functions: z
        .number()
        .min(1)
        .max(5)
        .describe("Excel functions proficiency (1-5)"),
      dataAnalysis: z
        .number()
        .min(1)
        .max(5)
        .describe("Data analysis capabilities (1-5)"),
      bestPractices: z
        .number()
        .min(1)
        .max(5)
        .describe("Excel best practices understanding (1-5)"),
    }),
    communicationSkills: z
      .number()
      .min(1)
      .max(5)
      .describe("Communication and explanation skills (1-5)"),
    skillLevel: z
      .enum(["Beginner", "Intermediate", "Advanced", "Expert"])
      .describe("Overall Excel skill level"),
  }),
  feedback: z.object({
    summary: z
      .string()
      .describe(
        "Brief performance summary, keep the summary as concise as possible"
      ),
    strengths: z.array(z.string()).describe("Key strengths demonstrated"),
    improvementAreas: z.array(z.string()).describe("Areas needing improvement"),
    recommendations: z
      .array(z.string())
      .describe("Specific recommendations for skill development"),
  }),
});

export type InterviewFeedback = z.infer<typeof InterviewFeedbackSchema>;
