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
        background: "#f7f0e8",
        foreground: "#2f2622",
        ivory: "#fbf6f0",
        cream: "#f4ebe0",
        beige: "#e8dbc9",
        champagne: "#dec7a7",
        sand: "#c8aa7d",
        gold: "#b89363",
        taupe: "#5b4a42",
        cocoa: "#3e312c",
        charcoal: "#2d2927",
        rose: "#c7a79a"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        script: ["var(--font-script)"]
      },
      backgroundImage: {
        "paper-glow":
          "radial-gradient(circle at top, rgba(255,255,255,0.92), rgba(247,240,232,0.9) 42%, rgba(229,214,196,0.76) 100%)",
        "editorial-fade":
          "linear-gradient(180deg, rgba(251,246,240,0.92) 0%, rgba(247,240,232,0.98) 56%, rgba(240,230,217,1) 100%)",
        "linen-texture":
          "radial-gradient(circle at 1px 1px, rgba(62,49,44,0.04) 1px, transparent 0)"
      },
      boxShadow: {
        soft: "0 24px 60px rgba(83, 60, 44, 0.12)",
        panel: "0 18px 40px rgba(68, 47, 35, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
