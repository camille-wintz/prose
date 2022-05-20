module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
    transitionDuration: {
      DEFAULT: "350ms",
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
      white: "#F8F8F8",
      black: "#121212",
      blue: "#1253CD",
    },
    fontFamily: {
      display: ["Astonia"],
      sans: ["Assistant"],
      serif: ["Charter"],
    },
  },
  plugins: [],
};
