# VGBW Voice Assistant (Frontend)

Современный интерфейс голосового ассистента, построенный на **Next.js 16** с использованием **Web Speech API**. Проект разработан с упором на производительность, типизацию и чистую архитектуру.

## 🚀 Основные возможности

- **Voice-to-Text (STT):** Интеграция с браузерным API для захвата и распознавания речи в реальном времени.
- **AI Chat:** Интеграция с LLM-бэкендом через защищенное проксирование.
- **Markdown Support:** Рендеринг ответов ИИ с поддержкой таблиц, списков и блоков кода (GFM).
- **Security:** Реализация Basic Auth и поддержка локального HTTPS для работы с микрофоном.
- **Modern UI:** Темная тема в стиле Apple/OpenAI, отсутствие лишних визуальных элементов (скрытые скроллбары, адаптивная верстка).

## 🛠 Технологический стек

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + Headless UI
- **Typography:** [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Icons:** Lucide React
- **Notifications:** React-Toastify
- **Markdown:** React-Markdown + Remark-GFM

## 📂 Архитектура

Проект следует упрощенным принципам **Feature-Sliced Design (FSD)**:

- `src/views`: Верхнеуровневые компоненты страниц (логика представления).
- `src/components`: Переиспользуемые UI-компоненты (атомарные элементы чата).
- `src/hooks`: Изолированная бизнес-логика (STT, уведомления).
- `src/lib`: Инфраструктурный слой (API-клиент, конфигурации).

## ⚙️ Установка и запуск

## 1. Клонирование репозитория

```bash
git clone https://github.com/viyadd/vgbw-chat.git
cd vgbw-chat
```

## 2\. Установка зависимостей

```Bash
npm install
```

## 3\. Настройка окружения

Создайте файл `.env.local` на основе примера:

```bash
NEXT_PUBLIC_API_AUTH=your_user:your_password
BACKEND_URL=https://your-backend-api.com
PORT=3001
```

## 4\. Генерация SSL (для работы микрофона в dev)

Для работы Web Speech API в Chrome на localhost требуется HTTPS:

```Bash
mkcert localhost
```

Укажите пути к сертификатам в `.env.local` (параметры `SSL_KEY_PATH` и `SSL_CERT_PATH`).

## 5\. Запуск

```Bash
npm run dev
```

Приложение будет доступно по адресу: `https://localhost:3001`

## 📋 API Контракт

Приложение ожидает от бэкенда следующий формат ответа:

```JSON
{
  "status": "success",
  "data": {
    "reply": "Текст ответа в Markdown",
    "usage": { "total_tokens": 500 }
  }
}
```
