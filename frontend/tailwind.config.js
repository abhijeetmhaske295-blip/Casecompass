/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#f0f2fa',
          100: '#dce1f4',
          200: '#bdc5ec',
          300: '#93a1e0',
          400: '#6677d2',
          500: '#4555c2',
          600: '#3341a9',
          700: '#28328c',
          800: '#222a73',
          900: '#191970', // Primary Midnight Blue
          950: '#0f1244',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
