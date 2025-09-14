export const feedbackGenerationSystemPrompt = `
- Create a comprehensive Excel interview assessment report. 
- Fill out ALL required fields in the response schema based on the interview conversation.
- Extract the candidate's name, role, experience, background, and qualifications from the conversation. 
- Rate their overall performance (1-10), technical skills in each area (1-5), communication skills (1-5), and assign a skill level (Beginner/Intermediate/Advanced/Expert).
- Provide a summary, list their strengths with examples, identify improvement areas, and give actionable recommendations for development.
- Base everything on what they actually demonstrated during the interview.
`;

interface FeedbackGenerationParams {
  conversationSummary: string;
}

export const createFeedbackGenerationPrompt = ({
  conversationSummary,
}: FeedbackGenerationParams) => `
Interview conversation: ${conversationSummary}

Generate the complete assessment report.
`;
