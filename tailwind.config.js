/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        lightBeige: "#f4eee0",
        darkDarkPurple: "#393646",
        darkPurple: "#4f4557",
        purple: "#6d5d6e"
        
      },
    },
  },
  plugins: [],
}

