import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        lavender: "#fdf4ff",
        pastelPink: "#ffe4e6",
        pastelYellow: "#fff7d6",
        pastelGreen: "#d4f6d5",
        pastelBlue: "#d6eaff",
        pastelPurple: "#e9d5ff",
      },
      backgroundImage: {
        "pastel-gradient": "linear-gradient(180deg, #fdf4ff 0%, #fef9f9 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
