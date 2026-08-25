import { type Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        // Carbon background
        carbon: {
          900: '#0a0b0d',
          950: '#07080a',
        },
        // Lime accent
        lime: {
          300: '#e1f68a',
          400: '#bef268',
          500: '#c7f751',
          600: '#a3d43a',
        },
        // Steel grays
        steel: {
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['GeistMono', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '120': '30rem',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.375rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0px',
        2: '2px',
        3: '3px',
      },
      boxShadow: {
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'glow-lime': '0 0 20px 4px rgb(199 247 81 / 0.3)',
        'glow-lime-sm': '0 0 10px 2px rgb(199 247 81 / 0.2)',
      },
      transitionDelay: {
        '700': '700ms',
        '900': '900ms',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
