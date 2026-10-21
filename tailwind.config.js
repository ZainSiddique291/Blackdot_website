/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0B0B",
          charcoal: "#191919",
          gold: "#C99A3B",
          "gold-light": "#E2C27A",
          "gold-dark": "#9E7426",
          "gold-tint": "#F3E8D0",
          ivory: "#F7F5F0",
          white: "#FFFFFF",
          text: "#333333",
          muted: "#777777",
          border: "#E5E1D8",
          success: "#287A4B",
          error: "#B42318",
        },
      },
      fontFamily: {
        heading: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
      boxShadow: {
        luxury: "0 12px 36px rgba(11, 11, 11, 0.08)",
        "gold-glow": "0 0 25px rgba(201, 154, 59, 0.25)",
        "gold-glow-lg": "0 0 45px rgba(201, 154, 59, 0.35)",
        "dark-elevated": "0 20px 50px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "float-gentle": "float 5s ease-in-out infinite",
        "float-reverse": "floatReverse 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.8deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(-0.8deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
