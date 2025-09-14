"use client";
import { Thread } from "@/components/assistant-ui/thread";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChat } from "@ai-sdk/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
import { useEffect } from "react";

const HomePage = () => {
  const chat = useChat();
  const runtime = useAISDKRuntime(chat);

  useEffect(() => {
    chat.sendMessage({
      id: "initial-message",
      role: "user",
      parts: [{ type: "text", text: "Hello" }],
    });
  }, []);

  useEffect(() => {
    if (chat.messages.at(0)?.role === "user")
      chat.setMessages(chat.messages.slice(1));
  }, [chat.messages.length]);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-dvh">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};

export default HomePage;
