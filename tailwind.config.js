const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or  false, 'media' or 'class'
  theme: {
    extend: {
      colors: {
        principal: {
          DEFAULT: colors.blueGray[800],
          ...colors.blueGray
        },
        contrast: colors.white,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}