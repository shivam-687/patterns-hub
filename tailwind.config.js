/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter','Ubuntu','Fira Sans', ...defaultTheme.fontFamily.sans],
      },
      colors:{
        whatsapp: '#128C7E',
          "whatsapp-focus": '#075E54',
          "whatsapp-content": '#fff',
      },
      screens:{
        '2xs': '350px'
      },
      aspectRatio:{
        'portrait': '2/3'
      }
    },
  },
  daisyui: {
    themes: [
      'coffee',
      'bumblebee'
    ],
  },
  plugins: [require('@tailwindcss/line-clamp'),require('tailwind-scrollbar'),require('daisyui')],
}
