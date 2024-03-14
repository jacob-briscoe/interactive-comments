const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      display: "Rubik, sans-serif",
    },
    extend: {
      colors: {
        "moderate-blue": "hsl(238, 40%, 52%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "light-grayish-blue": "hsl(239, 57%, 85%)",
        "pale-red": "hsl(357, 100%, 86%)",
        "dark-blue": "hsl(212, 24%, 26%)",
        "grayish-blue": "hsl(211, 10%, 45%)",
        "light-gray": "hsl(223, 19%, 93%)",
        "very-light-gray": "hsl(228, 33%, 97%)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
        a: { textDecoration: "underline" },
      });
    }),
  ],
};
