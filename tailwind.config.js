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
      blue: "#001a4c",
      purple: "#9322bc",
      darkPurple: "#640089",
      pink: "#eb296f",
      text: "#f4fbdb",
    },
    fontFamily: {
      display: ["Averia Serif Libre"],
      sans: ["Open Sans"],
      serif: ["Source Code Pro"],
    },
  },
  plugins: [],
};
