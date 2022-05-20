import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const path = require("path");

const generateScopedName = "[name]__[local]___[hash:base64:5]";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    sourcemap: true,
  },
  css: {
    modules: {
      generateScopedName,
    },
  },
});
