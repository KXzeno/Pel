import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        urbanist: ['var(--font-urbanist)'],
        inter: ['var(--font-inter)'],
        cinzel: ['var(--font-cinzel)'],
        diphylleia: ['var(--font-diphylleia)'],
        merriweather: ['var(--font-merriweather)'],
        spectral: ['var(--font-spectral)'],
        dm_sans: ['var(--font-dm-sans)'],
        quicksand: ['var(--font-quicksand)'],
        dosis: ['var(--font-quicksand)'],
        sono: ['var(--font-sono)'],
      },
      container: {
        padding: "0.3rem 0.15rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
