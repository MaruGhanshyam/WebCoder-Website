/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: { navy: '#0d354b', ink: '#102e40', red: '#ed1c24', pale: '#f4f8fa' }
      },
      fontFamily: { sans: ['Manrope', 'Arial', 'sans-serif'] }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
