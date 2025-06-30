/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        casona: ['"casona"', "sans-serif"], // Permite usar `font-casona` en HTML
      },
    },
  },
  plugins: [],
};
