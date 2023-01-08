/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        darkGrey: '#423E52',
        blue: {
          100: '#9595C5',
          200: '#6066D8'
        },
        dark: {
          text: '#2A2A2A',
          100: '#52525b',
          200: '#2B3559',
          300: '#343857',
          400: '#1B1F37',
          500: '#0A070E',
          600: '#0B080F'
        }
      }
    }
  },
  borderWidth: {
    xs: '0.5px'
  },
  plugins: []
}
