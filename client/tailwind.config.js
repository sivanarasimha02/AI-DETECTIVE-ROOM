/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        detective: {
          dark: '#0a0d14',
          panel: 'rgba(15, 20, 31, 0.90)',
          charcoal: '#141923',
          border: '#2a3447',
          amber: '#f59e0b',
          gold: '#fbbf24',
          cyan: '#06b6d4',
          danger: '#ef4444',
          text: '#f1f5f9',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
      }
    },
  },
  plugins: [],
}

