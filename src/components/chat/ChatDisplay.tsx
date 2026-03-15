// src/components/chat/ChatDisplay.tsx
"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatDisplayProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatDisplay = ({ messages, isLoading }: ChatDisplayProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Автопрокрутка вниз при новых сообщениях
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-hide">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === "user"
                ? "bg-[#254da3] text-white"
                : "bg-[#1a3a7a]/50 text-gray-200 border border-[#2a4a8a]"
            }`}
          >
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-[#1a3a7a]/30 text-blue-400 p-4 rounded-2xl animate-pulse text-sm">
            AI thinking...
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
