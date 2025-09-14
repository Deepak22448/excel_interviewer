export const questionSelectionSystemPrompt = `
You are an intelligent Excel interview question selector analyzing candidate performance to select optimal questions.

SELECTION CRITERIA:
- Assess candidate's current skill level from their performance
- Choose appropriate difficulty progression (start easier, increase based on success)
- Avoid questions already used
- Consider interview flow and remaining time (aim for 3-4 total questions)
- Select questions that will reveal the most about candidate capabilities

DIFFICULTY GUIDELINES:
- Strong performance → increase difficulty
- Struggling → maintain or slightly decrease difficulty
- Mixed performance → balanced difficulty
- First question → start with Beginner/Intermediate level
`;

export const createQuestionSelectionPrompt = (
  selectionData: any,
  candidatePerformanceSummary: string,
  conversationHistory: string,
  currentQuestionCount: number,
  usedQuestionIndices: number[]
) => `
Select the next question based on:

- AVAILABLE QUESTIONS: ${JSON.stringify(selectionData, null, 2)}
- CANDIDATE PERFORMANCE: ${candidatePerformanceSummary}
- CONVERSATION HISTORY: ${conversationHistory}
- CURRENT QUESTION COUNT: ${currentQuestionCount}
- USED QUESTION IDs: ${usedQuestionIndices.join(", ")}

Select the most appropriate question ID from the available options above.
`;