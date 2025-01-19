/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        "primary": "#caf0f8",
        "secondary": "#121212",
        "accent": "#03045e",
        "highlight": "#fb8500"
      },
      screens: {
        xs: "320px"
      }
    },
  },
  plugins: [],
}

