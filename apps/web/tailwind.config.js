
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070a08",
        surface: "#0d140f",
        primary: "#00d51b",
        "primary-light": "#39f34b",
        critical: "#ff3b45",
        high: "#ff8738",
        medium: "#f2c94c",
        low: "#39d98a",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
