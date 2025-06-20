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
        primary: "#1E3A8A",
        secondary: "#38BDF8",
        accent: "#0EA5E9",
        dark: {
          100: "#2D3748",
          200: "#1A202C",
          300: "#171923",
        },
        light: {
          100: "#F7FAFC",
          200: "#EDF2F7",
          300: "#E2E8F0",
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

