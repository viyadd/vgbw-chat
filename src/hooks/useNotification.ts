// src/shared/lib/hooks/useNotification.ts
import { toast } from "react-toastify";

export const useNotification = () => {
  const notify = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
    warn: (message: string) => toast.warn(message),
  };

  return notify;
};
