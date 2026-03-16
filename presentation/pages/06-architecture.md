# Архитектура и Чистый Код

<div class="grid grid-cols-2 gap-6 pt-4 text-[13px]">

  <div>
    <h3 class="flex items-center gap-2 mb-2 text-blue-400 font-bold">
      <carbon:application /> Frontend (FSD-lite)
    </h3>
    <ul class="space-y-1 opacity-90">
      <li><carbon:checkbox-checked class="inline mr-1 text-blue-500"/> <b>Hooks:</b> Изоляция логики (useSpeechToText)</li>
      <li><carbon:checkbox-checked class="inline mr-1 text-blue-500"/> <b>Views:</b> Чистые страницы через HomeView</li>
      <li><carbon:checkbox-checked class="inline mr-1 text-blue-500"/> <b>Lib:</b> Централизованный API-клиент</li>
    </ul>
    <div class="mt-4 p-2 bg-black/20 rounded font-mono text-[10px] border border-white/5">
      src/hooks/useSpeechToText.ts<br/>
      src/views/HomeView.tsx
    </div>
  </div>

  <div>
    <h3 class="flex items-center gap-2 mb-2 text-green-400 font-bold">
      <carbon:data-base /> Backend (Strategy Pattern)
    </h3>
    <ul class="space-y-1 opacity-90">
      <li><carbon:checkbox-checked class="inline mr-1 text-green-500"/> <b>Services:</b> Фабрика провайдеров (AI Factory)</li>
      <li><carbon:checkbox-checked class="inline mr-1 text-green-500"/> <b>Validation:</b> Строгие схемы через Zod</li>
      <li><carbon:checkbox-checked class="inline mr-1 text-green-500"/> <b>Config:</b> Type-safe окружение (env.ts)</li>
    </ul>
    <div class="mt-4 p-2 bg-black/20 rounded font-mono text-[10px] border border-white/5">
      src/services/ai.factory.ts<br/>
      src/controllers/chat.schema.ts
    </div>
  </div>

</div>

<div class="mt-8 flex items-center justify-center gap-4 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
  <carbon:security class="text-yellow-500 text-xl" />
  <span class="text-sm"><b>Security:</b> Интеграция Helmet, CORS и скрытие Backend URL через Next.js Rewrites.</span>
</div>
