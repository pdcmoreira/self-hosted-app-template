import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'log-debug': '#C1CFA1',
        'log-info': '#687FE5',
        'log-warning': '#FADA7A',
        'log-error': '#DA6C6C',
      },
    },
  },
  plugins: [forms],
}
