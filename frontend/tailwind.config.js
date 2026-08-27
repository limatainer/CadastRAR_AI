import { type Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      // Colours live in src/index.css as CSS variables so they can flip
      // with the theme. Reach for them via var(--accent), not here.
      fontFamily: {
        display: ['Newsreader', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['GeistMono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
        sm: ['0.875rem', { lineHeight: '1.45rem' }],
        base: ['1.0625rem', { lineHeight: '1.7' }],
        lg: ['1.1875rem', { lineHeight: '1.65' }],
        xl: ['1.375rem', { lineHeight: '1.4' }],
        '2xl': ['1.75rem', { lineHeight: '1.25' }],
        '3xl': ['2.25rem', { lineHeight: '1.15' }],
        '4xl': ['2.75rem', { lineHeight: '1.1' }],
        '5xl': ['3.5rem', { lineHeight: '1.05' }],
        '6xl': ['4.5rem', { lineHeight: '1.02' }],
      },
      letterSpacing: {
        display: '-0.021em',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
