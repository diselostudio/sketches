import ssr from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [ssr({
    prerender: {
      parallel: 4, partial: false
    }
  })],
});