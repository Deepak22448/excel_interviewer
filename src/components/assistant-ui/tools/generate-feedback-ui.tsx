import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { FileText, BarChart3, CheckCircle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import * as m from "motion/react-m";

export const GenerateFeedbackUI: ToolCallMessagePartComponent = ({
  status,
  result,
}) => {
  const [currentStage, setCurrentStage] = useState<
    "compiling" | "analyzing" | "finalizing" | "complete"
  >("compiling");

  useEffect(() => {
    if (status?.type === "running") {
      // Tool is running, show loading stages
      const timer1 = setTimeout(() => setCurrentStage("analyzing"), 1200);
      const timer2 = setTimeout(() => setCurrentStage("finalizing"), 2400);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (status?.type === "complete" || result) {
      setCurrentStage("complete");
    }
  }, [status, result]);

  // Only show the UI when tool is running or just completed
  if (status?.type !== "running" && status?.type !== "complete" && !result) {
    return null;
  }

  const stages = [
    {
      key: "compiling",
      icon: FileText,
      text: "Alex is reviewing the entire interview...",
      description: "Going through all your responses and observations",
    },
    {
      key: "analyzing",
      icon: BarChart3,
      text: "Alex is assessing your skills...",
      description: "Evaluating your Excel expertise and communication",
    },
    {
      key: "finalizing",
      icon: TrendingUp,
      text: "Alex is writing your report...",
      description: "Creating a comprehensive assessment with recommendations",
    },
    {
      key: "complete",
      icon: CheckCircle,
      text: "Alex has completed your assessment!",
      description: "Your detailed interview report is ready",
    },
  ];

  if (currentStage !== "complete") {
    const currentStageData = stages.find((s) => s.key === currentStage);
    const CurrentIcon = currentStageData?.icon || FileText;

    return (
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex w-full items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950"
      >
        <div className="flex-shrink-0">
          <m.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CurrentIcon className="size-5 text-indigo-600 dark:text-indigo-400" />
          </m.div>
        </div>
        <div className="flex-grow">
          <m.p
            key={currentStage}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="font-medium text-indigo-800 dark:text-indigo-200"
          >
            {currentStageData?.text}
          </m.p>
          <m.p
            key={`${currentStage}-desc`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-indigo-600 dark:text-indigo-300"
          >
            {currentStageData?.description}
          </m.p>
        </div>
        <div className="flex gap-1">
          {stages.slice(0, -1).map((stage, index) => (
            <div
              key={stage.key}
              className={`h-2 w-2 rounded-full transition-colors ${
                stages.findIndex((s) => s.key === currentStage) >= index
                  ? "bg-indigo-500"
                  : "bg-indigo-200 dark:bg-indigo-700"
              }`}
            />
          ))}
        </div>
      </m.div>
    );
  }

  // Complete stage - show completion indicator only
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-4 flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950"
    >
      <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
      <p className="text-sm font-medium text-green-700 dark:text-green-300">
        Alex has finished your assessment - see your report below!
      </p>
    </m.div>
  );
};
