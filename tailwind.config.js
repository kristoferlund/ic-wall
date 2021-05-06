module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      opacity: ["disabled"],
      outline: ["focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
