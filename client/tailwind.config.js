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
          50: '#f0f7f6',
          100: '#daebe8',
          200: '#b8d8d3',
          300: '#8cbeb7',
          400: '#5a9c94',
          500: '#1e3f3b', // Deep forest green
          600: '#183330',
          700: '#142927',
          800: '#10211f',
          900: '#0c1a18',
          accent: '#0d9488', // Vibrant teal highlight
          amber: '#f59e0b',
        },
        cream: {
          50: '#fdfdfc',
          100: '#faf9f5', // Main warm background surface
          200: '#f4f1ea', // Warm card surface
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
          600: '#525252',
          700: '#3f3f3f',
          800: '#2a2a2a',
          900: '#1a1a1a', // Primary dark text
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
