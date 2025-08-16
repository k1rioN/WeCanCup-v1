/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { pink: '#FFB6C1', mint: '#98FF98' },
        bg: { DEFAULT: '#0b0d12', soft: '#12151c' }
      },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,0.35)' }
    }
  },
  plugins: []
}
