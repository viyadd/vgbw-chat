// src/components/chat/ChatInput.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, ChevronRight } from "lucide-react";

export const ChatInput = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Автоматическое изменение высоты textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (!text.trim()) return;
    console.log("Sending:", text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full px-6 pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="relative flex items-center bg-[#1a3a7a]/50 border border-[#2a4a8a] rounded-2xl p-1.5 transition-colors">
          <div className="pl-4 text-blue-400">
            <Mic
              size={20}
              className="cursor-pointer hover:text-blue-300 transition-colors"
            />
          </div>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask whatever you want"
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-gray-400 px-4 py-3 text-sm"
          />

          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="bg-[#254da3] hover:bg-[#2d5cc4] text-white p-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
