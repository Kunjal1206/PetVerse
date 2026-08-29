/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6f5',
          100: '#dae8e5',
          200: '#b7d1cc',
          300: '#8baeb2',
          400: '#5c878d',
          500: '#1e3f3b', // Deep forest green/teal
          600: '#183431',
          700: '#132a27',
          800: '#0f201e',
          900: '#0c1b19',
          accent: '#0d9488', // Teal highlight
        },
        cream: {
          50: '#fafaf9',
          100: '#faf9f5', // Main warm background surface
          200: '#f5f2eb', // Slightly darker cream/beige
          300: '#eae5d9',
          400: '#d7cdb9',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#3a3a3a',
          900: '#2a2a2a', // Primary dark text
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
