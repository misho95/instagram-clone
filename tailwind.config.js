/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        px1: "1px",
      },
      borderWidth: {
        px1: "1px",
      },
    },
  },
  plugins: [],
};
