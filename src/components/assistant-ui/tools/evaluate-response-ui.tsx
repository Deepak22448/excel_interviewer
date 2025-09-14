import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { CheckCircle2, MessageCircle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import * as m from "motion/react-m";

export const EvaluateResponseUI: ToolCallMessagePartComponent = ({
  status,
  result,
}) => {
  const [currentStage, setCurrentStage] = useState<
    "processing" | "analyzing" | "complete"
  >("processing");

  useEffect(() => {
    if (status?.type === "running") {
      // Tool is running, show loading stages
      const timer1 = setTimeout(() => setCurrentStage("analyzing"), 800);
      return () => {
        clearTimeout(timer1);
      };
    } else if (status?.type === "complete" || result) {
      setCurrentStage("complete");
    }
  }, [status, result]);

  // Only show the UI when tool is running or just completed
  if (status?.type !== "running" && status?.type !== "complete" && !result) {
    return null;
  }

  if (currentStage === "processing") {
    return (
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex w-full items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950"
      >
        <div className="flex-shrink-0">
          <m.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCircle className="size-5 text-purple-600 dark:text-purple-400" />
          </m.div>
        </div>
        <div className="flex-grow">
          <p className="font-medium text-purple-800 dark:text-purple-200">
            Alex is reviewing your answer...
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-300">
            Checking accuracy and approach
          </p>
        </div>
      </m.div>
    );
  }

  if (currentStage === "analyzing") {
    return (
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex w-full items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950"
      >
        <div className="flex-shrink-0">
          <m.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <TrendingUp className="size-5 text-purple-600 dark:text-purple-400" />
          </m.div>
        </div>
        <div className="flex-grow">
          <p className="font-medium text-purple-800 dark:text-purple-200">
            Alex is formulating feedback...
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-300">
            Preparing constructive insights for you
          </p>
        </div>
      </m.div>
    );
  }

  // Complete stage - show completion indicator only
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 flex w-full items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950"
    >
      <div className="flex-shrink-0">
        <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
      </div>
      <div className="flex-grow">
        <p className="font-medium text-green-800 dark:text-green-200">
          Alex has reviewed your answer!
        </p>
        <p className="text-sm text-green-600 dark:text-green-300">
          Feedback is ready for you
        </p>
      </div>
    </m.div>
  );
};
