/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'main-color': {
        100: '#CCF7F0',
        200: '#99EFE1',
        300: '#66E7D3',
        400: '#33DFC4',
        500: '#00D1B2', // main
        600: '#00B89F',
        700: '#009F8C',
        800: '#00867A',
      },
      'sub-color': {
        100: '#FDF9CC',
        200: '#FBF39A',
        300: '#F8ED67',
        400: '#F5E843',
        500: '#F2E33C', // sub
        600: '#D5C837',
        700: '#B9AE31',
        800: '#9C932B',
      },
      black: {
        100: '#F3F3F3', // stroke
        200: '#CCCCCC',
        300: '#B3B3B3',
        400: '#999999', // gray
        500: '#808080',
        600: '#666666',
        700: '#4D4D4D',
        800: '#303030', // text
      },
      white: '#fefefe', // background
    },
    boxShadow: {
      xs: '0px 0px 10px rgba(0, 0, 0, 0.03)',
    },
  },
  plugins: [],
};
