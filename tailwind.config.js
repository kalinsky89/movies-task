/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: ['disabled'],
      colors:{
        primary:"#a3a0a0",
        secondary: "#ddd",
        thirdGray: "#f2f2f2",
        successGreen: "#04aa6d",
        disabledRed: '#f5adad'
      },
      fontSize:{
        mobSmall: "0.56rem",
        mobThSmall: "0.68rem"
      },
      minHeight:{
        screenNotFull: "82.5vh"
      }
    },
  },
  plugins: [],
};
