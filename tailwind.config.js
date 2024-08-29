/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '300px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
         VeryDarkGray: 'hsl(0, 0%, 17%)',
         DarkGray: 'hsl(0, 0%, 59%)',
      },
    },
  },
  plugins: [],
}