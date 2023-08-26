/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        px1: "1px",
        mobile: "450px",
      },
      spacing: {
        custom: "73px",
      },
      padding: {
        pxcontent: "250px",
        pxcontentmd: "220px",
      },
      borderWidth: {
        px1: "1px",
      },
    },
  },
  plugins: [],
};
