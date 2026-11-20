/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          DEFAULT: "#070a08",
          secondary: "#0b100c",
        },

        surface: {
          DEFAULT: "#0d140f",
          raised: "#111b14",
          hover: "#142019",
        },

        // Brand
        primary: {
          DEFAULT: "#00d51b",
          light: "#39f34b",
          dark: "#087510",
          soft: "rgba(0, 213, 27, 0.09)",
          glow: "rgba(0, 213, 27, 0.16)",
        },

        // Text
        content: {
          primary: "#e8f5e9",
          secondary: "#a3b7a5",
          muted: "#6f8572",
        },

        // Borders
        border: {
          DEFAULT: "rgba(111, 160, 117, 0.18)",
          green: "rgba(0, 213, 27, 0.4)",
          strong: "rgba(111, 160, 117, 0.3)",
        },

        // Threat severity
        critical: "#ff3b45",
        high: "#ff8738",
        medium: "#f2c94c",
        low: "#39d98a",
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        primary: ["Poppins", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
      },

      boxShadow: {
        green: "0 0 25px rgba(0, 213, 27, 0.08)",
        card: "0 10px 35px rgba(0, 0, 0, 0.2)",
      },

      maxWidth: {
        container: "1240px",
      },

      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },
    },
  },

  plugins: [],
};
