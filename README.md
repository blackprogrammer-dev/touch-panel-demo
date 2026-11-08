# Touch panel demo (React + TypeScript)

Демо сенсорной панели 1280×800: свайп между страницами, переход из меню тем же движением,
дуговой ползунок и переключатели на mock-данных. Данные только через `src/data/useDevices.ts`,
поэтому mock потом заменяется на Home Assistant без правок компонентов.

## Запуск
```bash
npm create vite@latest touch-panel-demo -- --template react-ts
cd touch-panel-demo
npm i framer-motion @use-gesture/react tailwindcss @tailwindcss/vite
```
В `vite.config.ts` добавьте плагин:
```ts
import tailwindcss from '@tailwindcss/vite'
// plugins: [react(), tailwindcss()]
```
Замените `src/App.tsx` и `src/index.css`, добавьте папки `src/components` и `src/data` из этого архива,
удалите `src/App.css`. Затем `npm run dev`. Деплой на Cloudflare Pages: build `npm run build`, output `dist`.

## Идеи на дальше
Экран Status, график (Recharts), состояния загрузки/ошибки, подключение Home Assistant.