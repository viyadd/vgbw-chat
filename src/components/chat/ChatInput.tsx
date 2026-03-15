// src/components/chat/ChatInput.tsx
"use client";

import { useState, useEffect } from "react";
import { Mic, ChevronRight } from "lucide-react";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useNotification } from "@/hooks/useNotification";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [text, setText] = useState("");
  const notify = useNotification();

  const { isListening, start, stop, error } = useSpeechToText({
    onResult: (result) => setText(result),
  });

  // Вывод ошибок через уведомления
  useEffect(() => {
    if (error) {
      notify.error(`Ошибка микрофона: ${error}`);
    }
  }, [error, notify]);

  const handleMicClick = () => {
    if (isListening) {
      stop();
    } else {
      start();
    }
  };

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="w-full px-6 pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="relative flex items-center bg-[#1a3a7a]/50 border border-[#2a4a8a] rounded-2xl p-1.5 transition-colors">
          <button
            onClick={handleMicClick}
            className={`pl-4 transition-all ${
              isListening
                ? "text-red-500 animate-pulse scale-125"
                : "text-blue-400 hover:text-blue-300"
            }`}
          >
            <Mic size={20} />
          </button>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={isListening ? "Слушаю..." : "Ask whatever you want"}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-gray-400 px-4 py-3 text-sm"
          />

          <button
            onClick={handleSend}
            disabled={!text.trim() || isListening}
            className="bg-[#254da3] hover:bg-[#2d5cc4] text-white p-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
