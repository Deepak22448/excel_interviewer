export const responseEvaluationSystemPrompt = `
- Evaluate the candidate's Excel answer and provide feedback.
- Check if their answer is accurate and shows good understanding. 
- Give constructive feedback (2 or 3 sentences) - acknowledge what they got right and guide them on what could be better.
- Decide if a follow-up question would help assess their knowledge further, or if you're ready to move to the next main question. 
- Keep the interview flowing smoothly.
`;

interface ResponseEvaluationParams {
  originalQuestion: string;
  candidateResponse: string;
  questionCategory: string;
  currentFollowUpCount: number;
  conversationContext: string;
}

export const createResponseEvaluationPrompt = ({
  originalQuestion,
  candidateResponse,
  questionCategory,
  currentFollowUpCount,
  conversationContext,
}: ResponseEvaluationParams) => `
Question asked: ${originalQuestion}
Their answer: ${candidateResponse}
Category: ${questionCategory}
Follow-ups used: ${currentFollowUpCount}/2
Context: ${conversationContext}

Evaluate their response and decide what to do next.
`;
