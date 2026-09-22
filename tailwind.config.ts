import type { Config } from "tailwindcss";

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
        // so hex values can be swapped in one place once confirmed.
        primary: "var(--color-primary)",
        secondary: "var(--secondary)",
        "accent-pink": "var(--color-accent-pink)",
        "accent-blue": "var(--color-accent-blue)",
        "accent-orange": "var(--color-accent-orange)",
        ink: "var(--color-ink)",
        black: "var(--black)",
        surface: "var(--color-surface)",
        background: "var(--background)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        white: "var(--color-white)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // [fontSize, { lineHeight }] — desktop scale from the type spec.
        // Sections should scale these down with responsive variants.
        h1: ["56px", { lineHeight: "64px", fontWeight: "700" }],
        h2: ["40px", { lineHeight: "48px", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        small: ["14px", { lineHeight: "20px", fontWeight: "400" }],
      },
      borderRadius: {
        pill: "999px",
      },
      borderWidth: {
        3: "3px",
        5: "5px",
      },
      boxShadow: {
        // Hard, offset "comic panel" shadow used instead of soft blurred shadows.
        comic: "4px 4px 0px 0px var(--color-ink)",
        "comic-sm": "2px 2px 0px 0px var(--color-ink)",
        "comic-lg": "8px 8px 0px 0px var(--color-ink)",
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
