module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
    transitionDuration: {
      DEFAULT: "500ms",
    },
    extend: {
      width: {
        250: "250px",
        450: "450px",
        960: "960px",
        1200: "1200px",
      },
      maxWidth: {
        450: "450px",
        960: "960px",
        1200: "1200px",
      },
    },
    colors: {
      dark: "#24283b",
      white: "#F8F8F8",
      black: "#1D1D1D",
      blue: "#1253CD",
      yellow: "#FFA934",
      black2: "#272727",
    },
    fontFamily: {
      display: ["Averia Serif Libre"],
      sans: ["Open Sans"],
      serif: ["Source Code Pro"],
    },
  },
  plugins: [],
};
