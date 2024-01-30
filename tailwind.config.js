/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/***/**/*.{js,jsx}"],
  theme: {
    ripple: (theme) => ({
      colors: theme("colors"),
    }),

    fontFamily: {
      mont: ["Montserrat", "sans-serif"],
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },

    extend: {
      fontSize: {
        "mysm": "0.75rem",
        "mybase": "0.875rem",
        "myxl": "1.25rem",
        "2xl": "1.563rem",
        "mxl": "1.75rem",
      },

      lineHeight: {
        sm: "1.125rem",
        normal: "1.063rem",
        lg: "3.063rem",
        12: "3rem",
      },
      colors: {
        dark: "#282828",
        grey: "#282726",
        red_: "#D73B69",
        light: "#F7F7F7",

        secondary: "#ecc94b",
        error: "#CB191D",
        success: "#28a745",
        warning: "#ffc107",
        info: "#17a2b8",

        // ...
      },
    },
  },
  plugins: [
    // require("flowbite/plugin"),
    require("tailwindcss-ripple")(),
  ],
};
