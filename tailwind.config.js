/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 어디서 사용할 것인지 알려주기
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './styles/**/*.{scss, css}',
  ],
  theme: {
    extend: {
      animation: {
        skeleton: 'skeleton-gradient 2s infinite linear;',
      },
      keyframes: {
        'skeleton-gradient': {
          '0%, 100%': { backgroundColor: 'rgba(226, 232, 240, 0.4)' },
          '50%': { backgroundColor: 'rgba(226, 232, 240, 0.8)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
