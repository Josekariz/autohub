/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: {
          light: "#f9fafb", // gray-50
          dark: "#111827", // gray-900
        },
        card: {
          light: "#ffffff", // white
          dark: "#1f2937", // gray-800
        },
        accent: "#2d7cd0", // blue
      },
    },
  },
  plugins: [],
};
