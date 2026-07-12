/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#160F08",
        surface: "#221708",
        surface2: "#2E2110",
        brand: { DEFAULT: "#FBBF24", dim: "#D97706" },
        alert: { DEFAULT: "#F97316", dim: "#C2410C" },
        success: { DEFAULT: "#FDE68A", dim: "#FBBF24" },
        paper: "#FFF8EC",
        mute: "#A89B86",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out",
      },
    },
  },
  plugins: [],
}