/** @type {import('tailwindcss').Config} */

// Токены — из DESIGN.md (§2 цвет, §3 типографика, §4 геометрия/тени).
// Master-тема `manit` — нейтральная «фотобумага» (решение сессии вёрстки:
// в DESIGN.md base-цвета master не заданы, заданы только подтемы; выбрана
// светлая нейтральная база без тёплого сдвига home-warm и без графита
// studio-dark, чтобы обе подтемы читались как отступление от master-мира).

const accent = {
  primary: '#D6F23C', // кислотный лайм — «метка редактора», единственный манящий цвет
  secondary: '#C81E3A', // safelight-красный — только точечно (бейджи до/после, live-метки)
};

// Геометрия: система прямоугольная («кадр на контрольном листе»),
// единственное исключение — круглая кнопка-«затвор» (rounded-full утилитой).
const geometry = {
  '--rounded-box': '0.25rem',
  '--rounded-btn': '0.25rem',
  '--rounded-badge': '0.125rem',
  '--animation-btn': '0.2s',
  '--btn-focus-scale': '1', // без transform-подскоков (DESIGN §4)
  '--tab-radius': '0.25rem',
};

const stateColors = {
  info: '#3ABFF8',
  success: '#36D399',
  warning: '#FBBD23',
  error: '#F87272',
};

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Golos Text"', 'system-ui', 'sans-serif'],
        display: ['"Golos Text"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // мягкие рассеянные тени, тонированные под тему (не чистый чёрный)
        'frame-warm': '0 10px 32px -8px rgba(72, 62, 44, 0.18)',
        'frame-dark': '0 10px 32px -8px rgba(6, 8, 12, 0.55)',
        // тень-«свечение» для кнопки-затвора
        shutter: '0 8px 28px -6px rgba(214, 242, 60, 0.35)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: false,
    themes: [
      {
        // master-мир: все общие секции (hero, до/после, конфигуратор, тарифы, FAQ, CTA)
        manit: {
          'color-scheme': 'light',
          primary: accent.primary,
          'primary-content': '#1C1B18', // на лайме текст всегда тёмный, никогда белый
          secondary: accent.secondary,
          'secondary-content': '#F7F6F2',
          accent: accent.primary,
          'accent-content': '#1C1B18',
          neutral: '#15161A',
          'neutral-content': '#F2F1EC',
          'base-100': '#FAFAF7',
          'base-200': '#F0EFEA',
          'base-300': '#DDDCD3',
          'base-content': '#1A1B1E',
          ...stateColors,
          ...geometry,
        },
      },
      {
        // сегмент-подтема «Студия» (заведение / бизнес)
        'studio-dark': {
          'color-scheme': 'dark',
          primary: accent.primary,
          'primary-content': '#15161A',
          secondary: accent.secondary,
          'secondary-content': '#F2F1EC',
          accent: accent.primary,
          'accent-content': '#15161A',
          neutral: '#0E0F12',
          'neutral-content': '#F2F1EC',
          'base-100': '#15161A',
          'base-200': '#1D1F24',
          'base-300': '#2A2D33',
          'base-content': '#F2F1EC',
          ...stateColors,
          ...geometry,
        },
      },
      {
        // сегмент-подтема «Дом» (дом / малый бренд)
        'home-warm': {
          'color-scheme': 'light',
          primary: accent.primary,
          'primary-content': '#1C1B18',
          secondary: accent.secondary,
          'secondary-content': '#F7F6F2',
          accent: accent.primary,
          'accent-content': '#1C1B18',
          neutral: '#1C1B18',
          'neutral-content': '#F4F2EC',
          'base-100': '#F4F2EC',
          'base-200': '#E8E4D8',
          'base-300': '#D9D3C2',
          'base-content': '#1C1B18',
          ...stateColors,
          ...geometry,
        },
      },
    ],
  },
};
