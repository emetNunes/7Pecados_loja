import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F2F2F2",
            foreground: "#000000",
            primary: {
              DEFAULT: "#A62940",
            },
            secondary: {
              DEFAULT: "#591C27",
            },
            tertiary: {
              DEFAULT: "#3E3E40",
            },
            base: {
              DEFAULT: "#FFFFFF",
            },
          },
        },
        dark: {
          colors: {
            background: "#121212",
            foreground: "#E0E0E0",
            primary: {
              DEFAULT: "#F25F79",
            },
            secondary: {
              DEFAULT: "#D94D65",
            },
            tertiary: {
              DEFAULT: "#888888",
            },
            base: {
              DEFAULT: "#1E1E1E",
            },
          },
        },
      },
    }),
  ],
};
