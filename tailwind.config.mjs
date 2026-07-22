/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#d9481f',
          'primary-content': '#fff7f2',
          secondary: '#2b211c',
          accent: '#e8c39e',
          neutral: '#1c1917',
          'base-100': '#ffffff',
          'base-200': '#f6f4f1',
          'base-300': '#e8e4de',
          'base-content': '#1c1917',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
      'black',
      {
        warm: {
          'color-scheme': 'light',
          primary: '#c2703d',
          'primary-content': '#fff8f0',
          secondary: '#8a5a34',
          accent: '#9a6b3f',
          neutral: '#3b2f2a',
          'base-100': '#fbf3e9',
          'base-200': '#f3e6d3',
          'base-300': '#e9d5b8',
          'base-content': '#2b211c',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
};
