module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
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
      blue: "#0E3953",
      white: "#bdc9d6",
      iconwhite: "#B9B9B9",
      label: "#4D5762",
    },
    fontFamily: {
      display: ["Averia Serif Libre"],
      sans: ["Assistant"],
      serif: ["Volkorn"],
    },
  },
  plugins: [],
};
