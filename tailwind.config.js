/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 어디서 사용할 것인지 알려주기
    './pages/**/*.{js,jsx,ts,tsx}',
    '@components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
