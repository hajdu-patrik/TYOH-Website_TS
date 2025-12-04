/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['"Bitter"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "250px",
        s: "300px",
        bg: "640px",
        "3xl": "2500px",
        "4xl": "3000px",
      },
    },
  },
  plugins: [],
  darkMode: "false",
};