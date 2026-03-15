// src/lib/api-client.ts

export interface ChatResponse {
  status: string;
  data: {
    reply: string;
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

const API_URL = "/api/v1/chat";
const AUTH_STRING = process.env.NEXT_PUBLIC_API_AUTH || "";

export const apiClient = {
  sendMessage: async (
    message: string,
    signal?: AbortSignal,
  ): Promise<ChatResponse> => {
    if (!API_URL) throw new Error("API URL is not configured");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(AUTH_STRING)}`,
      },
      body: JSON.stringify({ message }),
      signal,
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error("Ошибка авторизации (401)");
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    return response.json();
  },
};
