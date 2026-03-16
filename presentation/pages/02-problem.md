---
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
---

## Проблема и решение

<div class="grid grid-cols-2 gap-8 pt-4">
  <div class="bg-red-900/10 p-4 rounded-lg border border-red-500/20">
    <h3 class="text-red-400 mb-2">Проблема</h3>
    <ul class="text-sm opacity-80">
      <li>Сложность ввода длинных промптов на мобильных устройствах</li>
      <li>UX-барьеры при взаимодействии с ИИ</li>
    </ul>
  </div>
  
  <div class="bg-green-900/10 p-4 rounded-lg border border-green-500/20">
    <h3 class="text-green-400 mb-2">Решение</h3>
    <ul class="text-sm opacity-80">
      <li>Voice-First интерфейс</li>
      <li>Мгновенная трансформация речи в структурированный Markdown</li>
    </ul>
  </div>
</div>

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer hover:bg-white hover:bg-opacity-10" title="Next Page">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>