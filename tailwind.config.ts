import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        standard: "1920px",
      },
      screens: {
        xs: "321px",
      },
      colors: {
        primary: "#103178",
        secondary: "#F0F2F5",
        
        danger: "#E62727",
        gray: "#707070",
        light: "#F5F5F5",
        muted: "#D9D9D9",
        neutral: "#F6F7E5",
        success: "#008337",
        legendary: '#787878'
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }], 
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }], 
        "5xl": ["48px", { lineHeight: "48px" }], 
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
