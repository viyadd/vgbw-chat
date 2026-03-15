// src/components/chat/SystemInfo.tsx
"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export const SystemInfo = () => {
  const [beVersion, setBeVersion] = useState<string>("loading...");
  const feVersion = process.env.APP_VERSION || "0.0.0";

  useEffect(() => {
    apiClient
      .getHealth()
      .then((data) => setBeVersion(data.version))
      .catch(() => setBeVersion("unknown"));
  }, []);

  return (
    <div className="fixed bottom-2 right-4 flex gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
      <span>vgbw: v{feVersion}</span>
      <span className="border-l border-gray-700 pl-3">vgb: v{beVersion}</span>
    </div>
  );
};
