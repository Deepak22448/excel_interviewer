import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { BrainCircuit, Search, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import * as m from "motion/react-m";

export const GetNextQuestionUI: ToolCallMessagePartComponent = ({
  status,
  result,
}) => {
  const [currentStage, setCurrentStage] = useState<'analyzing' | 'selecting' | 'complete'>('analyzing');

  useEffect(() => {
    if (status?.type === 'running') {
      // Tool is running, show loading stages
      const timer1 = setTimeout(() => setCurrentStage('selecting'), 1000);
      return () => {
        clearTimeout(timer1);
      };
    } else if (status?.type === 'complete' || result) {
      setCurrentStage('complete');
    }
  }, [status, result]);

  // Only show the UI when tool is running or just completed
  if (status?.type !== 'running' && status?.type !== 'complete' && !result) {
    return null;
  }

  const stages = [
    {
      key: 'analyzing',
      icon: BrainCircuit,
      text: 'Alex is thinking...',
      description: 'Reviewing your Excel knowledge and responses'
    },
    {
      key: 'selecting',
      icon: Search,
      text: 'Choosing the perfect question...',
      description: 'Alex is selecting a question to test your skills'
    },
    {
      key: 'complete',
      icon: CheckCircle,
      text: 'Alex has a question for you!',
      description: 'Ready to continue the interview'
    }
  ];

  const currentStageData = stages.find(s => s.key === currentStage);
  const CurrentIcon = currentStageData?.icon || Clock;

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 flex w-full items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950"
    >
      <div className="flex-shrink-0">
        <m.div
          animate={
            currentStage === 'complete'
              ? { opacity: 1 }
              : { opacity: [1, 0.4, 1] }
          }
          transition={{
            duration: currentStage === 'complete' ? 0.3 : 2,
            repeat: currentStage === 'complete' ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          <CurrentIcon className={`size-5 ${
            currentStage === 'complete'
              ? 'text-green-600 dark:text-green-400'
              : 'text-blue-600 dark:text-blue-400'
          }`} />
        </m.div>
      </div>

      <div className="flex-grow">
        <m.p
          key={currentStage}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="font-medium text-blue-800 dark:text-blue-200"
        >
          {currentStageData?.text}
        </m.p>
        <m.p
          key={`${currentStage}-desc`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm text-blue-600 dark:text-blue-300"
        >
          {currentStageData?.description}
        </m.p>
      </div>

      {currentStage === 'complete' && (
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex-shrink-0"
        >
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </m.div>
      )}
    </m.div>
  );
};