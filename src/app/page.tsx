// src/app/page.tsx
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-[#0a2558] text-white">
      {/* Content Area */}
      <div className="flex-1 flex flex-col items-start justify-center px-8 max-w-2xl mx-auto w-full">
        {/* Logo/Icon */}
        <div className="bg-[#1a3a7a] p-2 rounded-lg mb-8">
          <MessageSquare className="text-white fill-white" size={24} />
        </div>

        {/* Hero Text */}
        <h2 className="text-2xl font-medium mb-2 opacity-90">Hi there!</h2>
        <h1 className="text-4xl font-bold mb-6 tracking-tight">
          What would you like to know?
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-12">
          Use one of the most common prompts below <br />
          or ask your own question
        </p>
      </div>

      {/* Input Area */}
      <ChatInput />
    </main>
  );
}
