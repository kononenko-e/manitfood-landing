# Проект: ManitFood Landing

## Стек
- **Фреймворк**: Astro 5.x + React 19
- **Стили**: Tailwind CSS 3.x (через `@astrojs/tailwind`)
- **UI-библиотека**: daisyUI 4.x
- **Типизация**: TypeScript

## daisyUI — обязательная UI-библиотека

**ВАЖНО**: При создании любых HTML/JSX-компонентов и интерфейсов **ОБЯЗАТЕЛЬНО** использовать классы daisyUI. Не создавай кастомные CSS-решения, если аналог уже есть в daisyUI.

### Как использовать daisyUI
- Установлен как dev-зависимость: `daisyui@4`
- Подключен в `tailwind.config.mjs` через `plugins: [require('daisyui')]`
- Все классы daisyUI доступны глобально — просто добавляй их как обычные Tailwind-классы
- **Документация**: используй MCP server Context7 для получения точной документации по компонентам daisyUI

### Часто используемые компоненты
| Что нужно | Классы daisyUI |
|---|---|
| Кнопка | `btn`, `btn-primary`, `btn-ghost`, `btn-sm`, `btn-lg` |
| Карточка | `card`, `card-body`, `card-title`, `card-actions` |
| Формы | `input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `file-input` |
| Модалка | `modal`, `modal-box`, `modal-action` |
| Навигация | `navbar`, `menu`, `menu-horizontal`, `drawer`, `tabs` |
| Оповещения | `alert`, `alert-info`, `alert-success`, `alert-error`, `toast` |
| Индикаторы | `badge`, `loading`, `progress`, `radial-progress` |
| Раскрывающиеся | `collapse`, `accordion`, `dropdown` |
| Список | `list`, `list-row` |
| Таблица | `table`, `table-zebra` |
| Скелетоны | `skeleton` |

### Правила использования
1. **Предпочитай daisyUI** — не пиши кастомные классы для стандартных UI-элементов (кнопки, карточки, формы, алерты, и т.д.).
2. **Кастомизация через Tailwind** — если нужно изменить отступ, размер или цвет, используй Tailwind-утилиты поверх daisyUI-классов: `btn btn-primary px-8 rounded-full`.
3. **Темы daisyUI** — цвета задаются через семантические классы: `bg-primary`, `text-base-content`, `border-base-300`. Не используй `bg-gray-500` для фона — используй `bg-base-200`.
4. **Отзывчивость** — используй responsive-префиксы Tailwind: `sm:`, `md:`, `lg:`.
5. **Иконки** — используй `lucide-react` (уже установлен).
6. **Проверяй компонент перед использованием** — перед написанием сложного компонента (например, `drawer`, `carousel`, `dropdown`) запроси документацию через MCP Context7, чтобы точно использовать правильные классы и структуру HTML.

### Примеры
```tsx
// Кнопка
<button className="btn btn-primary">Нажми меня</button>

// Карточка
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Заголовок</h2>
    <p>Описание</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Действие</button>
    </div>
  </div>
</div>

// Форма
<label className="input input-bordered flex items-center gap-2">
  <Mail className="h-4 w-4 opacity-50" />
  <input type="email" placeholder="Email" />
</label>

// Алерт
<div className="alert alert-success">
  <CheckCircle className="h-6 w-6" />
  <span>Успешно сохранено!</span>
</div>
```

## Существующие компоненты (legacy)
Проект раньше использовал shadcn/ui, но он полностью удалён в пользу daisyUI. Если встретишь импорты или упоминания shadcn — это legacy, заменяй на daisyUI.

## Сборка
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
