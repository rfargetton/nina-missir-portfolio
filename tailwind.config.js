/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{md,njk,html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#5C7A6B",
        secondary: "#C4674A",
        cream: "#F7F3EE",
        sand: "#E8DDD0",
        moss: "#8FA88B",
        bark: "#3D2E28",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
