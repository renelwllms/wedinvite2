import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6efe7",
        foreground: "#2f241f",
        cream: "#fbf7f1",
        champagne: "#e8d7b7",
        gold: "#b78b4a",
        cocoa: "#4a352d",
        rose: "#c39a90"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      backgroundImage: {
        "paper-glow": "radial-gradient(circle at top, rgba(255,255,255,0.9), rgba(246,239,231,0.85) 45%, rgba(230,217,198,0.72) 100%)"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(81, 55, 38, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
