/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        gov: {
          maroon: '#7B1D1D',
          'maroon-dark': '#5A1515',
          'maroon-light': '#9B2C2C',
          'maroon-bg': '#FEF2F2',
          sidebar: '#1C0A0A',
          'sidebar-hover': '#2D1515',
          gold: '#B7791F',
          'gold-light': '#D4A017',
          'gold-bg': '#FFFBEB',
          parchment: '#FAF8F5',
          border: '#E2D9C8',
          'border-dark': '#C4B896',
        },
      },
      fontSize: {
        'xxs': ['10px', '14px'],
        'xs': ['11px', '16px'],
        'sm': ['12px', '18px'],
        'base': ['13px', '20px'],
        'md': ['14px', '20px'],
        'lg': ['15px', '22px'],
        'xl': ['16px', '24px'],
        '2xl': ['18px', '26px'],
        '3xl': ['20px', '28px'],
        '4xl': ['24px', '32px'],
      }
    },
  },
  plugins: [],
}
