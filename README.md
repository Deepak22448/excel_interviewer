# Excel Interviewer - AI-Powered Interview System

An intelligent Excel interviewing system featuring **Alex Morgan**, an AI interviewer that conducts comprehensive Excel skills assessments through interactive conversations.

## 🌟 Features

- **AI-Powered Interviewer**: Alex Morgan persona with intelligent conversation flow
- **Curated Question Bank**: 16 carefully crafted Excel questions across 4 difficulty levels
- **Smart Question Selection**: LLM-powered tools that adapt questions based on candidate performance
- **Real-Time Response Evaluation**: Immediate feedback and constructive assessment
- **Comprehensive Reports**: Detailed skill assessments with ratings, strengths, and recommendations
- **Professional UI**: Custom tool interfaces with loading states and smooth animations
- **Flexible AI Models**: Supports both OpenAI GPT-4o and Google Gemini 2.5 Flash

## 🏗️ Architecture

### Core Components
- **Next.js 15** with App Router and React 19
- **Vercel AI SDK** for streaming AI responses
- **@assistant-ui/react** for chat interface
- **Framer Motion** for smooth animations
- **Tailwind CSS** for styling
- **Zod** for schema validation

### Smart Tools System
- **getNextQuestion**: Selects optimal questions based on performance
- **evaluateResponse**: Provides immediate feedback and determines next steps
- **generateFeedback**: Creates comprehensive assessment reports

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- An API key from either OpenAI or Google AI

### 1. Clone the Repository
```bash
git clone <repository-url>
cd excel-interviewer
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Environment Setup
Copy the example environment file and configure your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API configuration:

```env
# AI Model Configuration
# Choose ONE of the following:

# Option 1: OpenAI (Primary - if set, will use GPT-4o)
OPENAI_API_KEY=your_openai_api_key_here

# Option 2: Google AI (Fallback - used if no OpenAI key)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
```

### 4. Start Development Server
```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:3000` to start interviewing with Alex Morgan!

## 🔧 Configuration

### AI Model Selection
The system automatically selects the AI model based on available API keys:

1. **Primary**: OpenAI GPT-4o (if `OPENAI_API_KEY` is set)
2. **Fallback**: Google Gemini 2.5 Flash (if no OpenAI key)

### Getting API Keys

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env.local` as `OPENAI_API_KEY`

#### Google AI API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Create a new project or select existing
4. Generate an API key
5. Add it to your `.env.local` as `GOOGLE_GENERATIVE_AI_API_KEY`

## 🎯 How It Works

### Interview Flow
1. **Introduction**: Alex Morgan introduces himself and explains the process
2. **Candidate Info**: Collects name, role, experience, and background
3. **Smart Questioning**: Selects 3-4 questions based on skill level
4. **Real-Time Evaluation**: Provides immediate feedback after each response
5. **Comprehensive Assessment**: Generates detailed report with ratings and recommendations

### Question Bank
- **16 curated questions** across Excel topics
- **4 difficulty levels**: Beginner, Intermediate, Advanced, Expert
- **Smart selection** based on candidate performance
- **Context optimization** for efficient AI usage

### Assessment Areas
- **Technical Skills**: Formulas, Functions, Data Analysis, Best Practices
- **Communication Skills**: Clarity of explanations and problem-solving approach
- **Overall Performance**: Comprehensive rating and skill level classification

## 🛠️ Development

### Available Scripts
```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Project Structure
```
src/
├── app/
│   ├── api/chat/route.ts          # AI chat endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page with Alex Morgan
├── components/
│   ├── assistant-ui/
│   │   ├── tools/                 # Custom tool UI components
│   │   ├── thread.tsx             # Chat interface
│   │   └── ...                    # Other UI components
│   └── ui/                        # shadcn/ui components
└── lib/
    ├── feedback-tool.ts           # Assessment report generation
    ├── question-tools.ts          # Question selection & evaluation
    ├── question-bank.ts           # Curated Excel questions
    ├── model.ts                   # AI model configuration
    └── ...                        # Schemas and utilities
```

## 🎨 Customization

### Adding Questions
Edit `src/lib/question-bank.ts` to add new Excel questions:

```typescript
{
  id: 17,
  question: "Your question text...",
  category: "formulas",
  difficulty: "Intermediate",
  constraints: {
    dataSize: "Data size specification",
    excelVersion: "Excel version requirement",
    assumptions: ["Assumption 1", "Assumption 2"],
    limitations: ["Limitation 1", "Limitation 2"]
  },
  hints: {
    approach: "Suggested approach description",
    functions: ["Function1", "Function2"],
    concepts: ["Concept 1", "Concept 2"]
  }
}
```

### Modifying Assessment Criteria
Update `src/lib/feedback-schema.ts` to customize assessment fields and ratings.

### UI Customization
- Modify tool UI components in `src/components/assistant-ui/tools/`
- Update styling in `src/app/globals.css`
- Customize Alex Morgan's personality in `src/app/api/chat/route.ts`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, AI SDK, and modern web technologies**
