/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#293A88',
          red: '#EB463B',
          lightGray: '#F0F0F0',
          mediumGray: '#C8C8C8',
          darkGray: '#979797',
        }
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
plugins: [require('@tailwindcss/typography')],
}
