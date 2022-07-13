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
      grey: {
        1: "#FAFAFA",
        2: "#F4F4F4",
        3: "#B7B7B7",
        4: "#525252",
        5: "#383838",
      },
      pink: "#FF08F6",
    },
    fontFamily: {
      display: ["Averia Serif Libre"],
      sans: ["Open Sans"],
      serif: ["Source Code Pro"],
    },
  },
  plugins: [],
};
