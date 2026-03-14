// src/hooks/useSpeechToText.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/** * Расширяем глобальный интерфейс Window для типизации Web Speech API
 */
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface SpeechRecognitionResult {
  readonly transcript: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  };
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult:
    | ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

interface UseSpeechToTextReturn {
  isListening: boolean;
  transcript: string;
  start: () => void;
  stop: () => void;
  error: string | null;
}
interface UseSpeechToTextOptions {
  onResult?: (transcript: string) => void;
}

export const useSpeechToText = (
  options?: UseSpeechToTextOptions,
): UseSpeechToTextReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    // Проверка поддержки API внутри эффекта
    const GlobalSpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!GlobalSpeechRecognition) {
      // Чтобы избежать предупреждения о каскадном рендере,
      // обновляем состояние только если оно еще не установлено
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(
        (prev) => prev || "Web Speech API не поддерживается в этом браузере.",
      );
      return;
    }

    const recognition = new GlobalSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "ru-RU";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      if (options?.onResult) {
        options.onResult(currentTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [options]);

  const start = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setError(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ошибка запуска микрофона",
        );
      }
    }
  }, [isListening]);

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  return { isListening, transcript, start, stop, error };
};
