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
      white: "#ffffff",
      grey: {
        1: "#B7B7B7",
        2: "#525252",
        3: "#383838",
      },
      content: {
        1: "#B7B7B7",
        2: "#525252",
        3: "#383838",
      },
      pink: "#ff48b3",
      blue: "#09a1ed",
    },
    fontFamily: {
      display: ["Averia Serif Libre"],
      sans: ["Open Sans"],
      serif: ["Source Code Pro"],
    },
  },
  plugins: [],
};
