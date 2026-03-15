// src/views/HomeView.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatDisplay, Message } from "@/components/chat/ChatDisplay";
import { apiClient } from "@/lib/api-client";
import { useNotification } from "@/hooks/useNotification";
import { SystemInfo } from "@/components";

export const HomeView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const notify = useNotification();

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      const userMsg: Message = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await apiClient.sendMessage(
          text,
          abortControllerRef.current.signal,
        );
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.reply },
        ]);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        let errorMessage = "Something went wrong";

        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }

        notify.error(errorMessage);
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [notify],
  );

  return (
    <div className="flex flex-col h-screen bg-[#0a2558] text-white overflow-hidden relative">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-start justify-center px-8 max-w-2xl mx-auto w-full">
          <div className="bg-[#1a3a7a] p-2.5 rounded-xl mb-8 shadow-lg">
            <MessageSquare size={24} className="text-white fill-white" />
          </div>
          <h2 className="text-2xl font-medium mb-2 opacity-90">Hi there!</h2>
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            What would you like to know?
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Ask your own question or use voice
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full overflow-hidden">
          <ChatDisplay messages={messages} isLoading={isLoading} />
        </div>
      )}

      <ChatInput onSend={handleSendMessage} disabled={isLoading} />

      {/* Маленький индикатор версий */}
      <SystemInfo />
    </div>
  );
};
