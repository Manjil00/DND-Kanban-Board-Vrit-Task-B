/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgcolor: '#161618',
        bgcolorlite: '#212124',
    },
    fontFamily: {
      LogoFont:'"Sixtyfour Convergence", sans-serif;',
      },
    },
  },
  plugins: [],
}