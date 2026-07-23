// Манит-бот — логика каскадной фильтрации каруселей
// Читает compatibility.json и отдаёт «что показать на следующем шаге».
//
// Философия: бинарно (можно/нельзя). Матрицы перечисляют РАЗРЕШЁННЫЕ значения.
// preferred_* — мягкие подсказки для сортировки, не фильтр.

import { createRequire } from 'node:module';
const M = createRequire(import.meta.url)('./compatibility.json');

/** Шаг 2: стили, доступные для выбранного жанра. */
export function stylesForGenre(genre) {
  return M.genre_style[genre] || [];
}

/** Шаг 3, часть 1: типы локаций (табы) для пары жанр+стиль = пересечение. */
export function locationTypesFor(genre, style) {
  const g = new Set(M.genre_location_type[genre] || []);
  return (M.style_location_type[style] || []).filter((t) => g.has(t));
}

/**
 * Шаг 3, часть 2: конкретные локации внутри выбранного типа,
 * отсортированные по релевантности стилю (preferred сверху).
 */
export function locationsFor(genre, style, type) {
  if (!locationTypesFor(genre, style).includes(type)) return [];
  const all = Object.keys(M.axes.location[type] || {});
  const pref = M.style_preferred_locations[style] || [];
  const rank = (loc) => {
    const i = pref.indexOf(loc);
    return i === -1 ? Infinity : i;
  };
  return [...all].sort((a, b) => rank(a) - rank(b));
}

/** Шаг 4: уровни реквизита для стиля. */
export function propsForStyle(style) {
  return M.style_props[style] || [];
}

/** Шаг 5: форматы (всегда все), preferred жанра — сверху. */
export function formatsForGenre(genre) {
  const all = Object.keys(M.axes.format);
  const pref = M.genre_preferred_format[genre] || [];
  const rank = (f) => {
    const i = pref.indexOf(f);
    return i === -1 ? Infinity : i;
  };
  return [...all].sort((a, b) => rank(a) - rank(b));
}

/** Полный набор «что показать» на каждом шаге для частично собранного кадра. */
export function nextOptions(state = {}) {
  const { genre, style, locationType } = state;
  return {
    genres: Object.keys(M.axes.genre),
    styles: genre ? stylesForGenre(genre) : [],
    locationTypes: genre && style ? locationTypesFor(genre, style) : [],
    locations:
      genre && style && locationType
        ? locationsFor(genre, style, locationType)
        : [],
    props: style ? propsForStyle(style) : [],
    formats: genre ? formatsForGenre(genre) : Object.keys(M.axes.format),
  };
}

/** Проверка готовой комбинации на совместимость (для валидации записи в БД). */
export function isValidCombo({ genre, style, locationType, location, props }) {
  if (!stylesForGenre(genre).includes(style)) return false;
  if (!locationTypesFor(genre, style).includes(locationType)) return false;
  if (location && !(location in (M.axes.location[locationType] || {}))) return false;
  if (props && !propsForStyle(style).includes(props)) return false;
  return true;
}
