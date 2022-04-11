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
      dark1: "#181A1C",
      dark2: "#1e2227",
      purple: "#34083C",
      brightPurple: "#77038d",
      brightBlue: "#0a62a2",
      brightOrange: "#a2680a",
      brightGreen: "#627e04",
      brightRed: "#8d2d03",
      blue: "#0E3953",
      white: "#bdc9d6",
      iconwhite: "#B9B9B9",
      label: "#4D5762",
    },
    fontFamily: {
      display: ["Averia Serif Libre"],
      sans: ["Assistant"],
      serif: ["Merriweather"],
    },
  },
  plugins: [],
};
