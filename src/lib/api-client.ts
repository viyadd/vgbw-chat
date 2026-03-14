// src/lib/api-client.ts

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Имитация клиента для работы с API.
 * На данном этапе просто выводит данные в консоль.
 */
export const apiClient = {
  sendMessage: async (message: string): Promise<void> => {
    console.log("[API Call]: Sending message...", {
      content: message,
      timestamp: new Date().toISOString(),
    });

    // Имитация задержки сети
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
};
