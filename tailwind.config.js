const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or  false, 'media' or 'class'
  theme: {
    extend: {
      theme: {
        maxWidth: {
          'screen': '100vw'
        }
      }
      // colors: {
      //   principal: {
      //     DEFAULT: colors.blueGray[800],
      //     ...colors.blueGray
      //   },
      //   contrast: colors.white,
      // }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'sr-smith': {
          'primary': '#2d3cae',
          'primary-focus': '#20247e',
          'primary-content': '#ffffff',
          'secondary': '#2987c2',
          'secondary-focus': '#2864a4',
          'secondary-content': '#ffffff',
          'accent': '#37cdbe',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          'neutral': '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
        },
      },
    ],
  },
}