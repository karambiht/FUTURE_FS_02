/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-end SaaS Dark UI theme palette
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1', // primary indigo
          600: '#4f46e5', // hover primary
          700: '#4338ca',
        },
        slate: {
          950: '#0b0f19', // deep background obsidian
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
