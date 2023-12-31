/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "640px", // Small screens and above (640px)
      md: "768px", // Medium screens and above (768px)
      lg: "1024px", // Large screens and above (1024px)
      xl: "1400px", // Extra-large screens and above (1280px)
    },
  },
  plugins: [require("flowbite/plugin")],
};
