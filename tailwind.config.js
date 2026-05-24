/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out',
          'glow': 'glow 2s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: { '0%': { opacity: 0, y: 10 }, '100%': { opacity: 1, y: 0 } },
          glow: { '0%, 100%': { textShadow: '0 0 5px #00ffff' }, '50%': { textShadow: '0 0 20px #00ffff' } },
        },
        backdropBlur: { xs: '2px' },
      },
    },
    plugins: [],
  }