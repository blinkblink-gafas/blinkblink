import type { Config } from "tailwindcss";

/** Reads a `--<name>-rgb` channel variable so Tailwind opacity modifiers (`bg-ink/50`) work. */
const rgb = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens — piped through CSS variables (see styles/globals.css)
        // so values can be swapped in one place once confirmed.
        primary: rgb("primary"),
        secondary: rgb("secondary"),
        "accent-pink": rgb("secondary"),
        "accent-blue": rgb("accent-blue"),
        "accent-orange": rgb("accent-orange"),
        ink: rgb("black"),
        black: rgb("black"),
        surface: rgb("background"),
        background: rgb("background"),
        "text-primary": rgb("text-primary"),
        "text-secondary": rgb("text-secondary"),
        white: rgb("white"),
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        small: ["14px", { lineHeight: "20px", fontWeight: "400" }],
      },
      borderRadius: {
        pill: "999px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      maxWidth: {
        section: "1280px",
      },
      screens: {
        // Explicit breakpoints matching the three target viewports.
        mobile: "375px",
        tablet: "768px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
