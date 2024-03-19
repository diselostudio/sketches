import ssr from "vike/plugin";
import glsl from 'vite-plugin-glsl';
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "#root": `${__dirname}/src`,
      "#sketch": `${__dirname}/pages/sketch`,
    }
  },
  plugins: [
    glsl(),
    ssr({
      prerender: {
        parallel: 4, partial: false
      }
    })],
  ssr: {
    noExternal: ['glslCanvas']
  },
});