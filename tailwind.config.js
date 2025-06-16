/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.{js,css}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#174575",
        secondary: "#66c0f4",
        accent: "#0D6EFD",
      },
    },
  },
  plugins: [],
}

