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
      transparent: "transparent",
      dark0: "#0f1a23",
      dark1: "#182b3a",
      dark2: "#1f3a4f",
      purple: "#34083C",
      brightPurple: "#77038d",
      lightPurple: "#ca48e5",
      brightBlue: "#0a62a2",
      brightOrange: "#a2680a",
      brightGreen: "#627e04",
      brightRed: "#8d2d03",
      blue: "#0E3953",
      white: "#dee5ec",
      iconwhite: "#dee5ec",
      label: "#a4b1bc",
    },
    fontFamily: {
      display: ["Averia Serif Libre"],
      sans: ["Assistant"],
      serif: ["Merriweather"],
    },
  },
  plugins: [],
};
