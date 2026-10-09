import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0B8F5A",
          greenDark: "#087A4C",
          ink: "#0B2F2A",
          navy: "#0B3C4D",
          mint: "#E6F5F3",
          mintLight: "#F1FAF9",
        },
        text: {
          body: "#374151",
          muted: "#6B7280",
        },
        star: "#F5B301",
        card: "#FFFFFF",
        border: "#E5EEEC",
      },
      boxShadow: {
        card: "0 4px 16px rgba(11, 60, 77, 0.08)",
      },
      borderRadius: {
        card: "0.75rem", // rounded-xl (~12px)
        button: "0.5rem", // rounded-md (~8px)
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
