/** @type {import('tailwindcss').Config} */

var defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./apps/*/src/**/*.{html,ts}",
    "./libs/*/src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        synogray: {
          0: "#FFFFFF",
          80: "#FAFAFA",
          100: "#F7F7F7",
          190: "#E2E2E2",
          200: "#E1E1E1",
          210: "#DDDDDD",
          300: "#CFCFCF",
          350: "#CCCCCC",
          400: "#A6A6A6",
          500: "#7E7E7E",
          550: "#757575",
          600: "#626262",
          999: "#000",
        },
        synoblue: "#0500ed",
        synogreen: "#42ff00",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
