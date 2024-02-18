/** @type {import('tailwindcss').Config} */
/* eslint-env es6 */
/* eslint-disable no-console */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./apps/**/*.{html,ts}", "./libs/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
