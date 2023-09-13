/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        postContainer: "332px",
        activeW: "9px",
      },
      height: {
        px1: "1px",
        activeH: "9px",
        mobile: "470px",
        postComment: "280px",
        customScreenHeigth: "calc(100vh - 220px)",
        customScreenHeigthMobile: "calc(100vh - 470px)",
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
      minHeight: {
        h60: "60rem",
        h40: "40rem",
        h30: "30rem",
        h20: "20rem",
      },
      fontFamily: {
        customCursive: "Satisfy",
      },
    },
  },
  plugins: [],
};
