import { getQuestionSelectionInfo } from "../question-bank";
import { QUESTIONS_TO_ASK } from "../constants";

export const questionSelectionSystemPrompt = `
- Select the next Excel interview question based on how the candidate is performing.
- Start with Beginner/Intermediate level for the first question. 
- If they're doing well, increase difficulty. 
- If struggling, keep it similar or slightly easier. 
- Avoid questions already used. 
- Aim for ${QUESTIONS_TO_ASK} total questions.
`;

interface QuestionSelectionParams {
  selectionData: ReturnType<typeof getQuestionSelectionInfo>;
  candidatePerformanceSummary: string;
  conversationHistory: string;
  currentQuestionCount: number;
  usedQuestionIndices: number[];
}

export const createQuestionSelectionPrompt = ({
  selectionData,
  candidatePerformanceSummary,
  conversationHistory,
  currentQuestionCount,
  usedQuestionIndices,
}: QuestionSelectionParams) => `
Available questions:
${JSON.stringify(selectionData, null, 2)}

Performance so far: ${candidatePerformanceSummary}
Questions asked: ${currentQuestionCount}
Used question IDs: ${usedQuestionIndices.join(", ") || "none"}
Recent context: ${conversationHistory}

Pick the most appropriate question ID.
`;
