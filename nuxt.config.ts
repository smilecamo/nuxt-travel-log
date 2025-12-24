import tailwindcss from "@tailwindcss/vite";

import "./lib/env";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxtjs/color-mode", "@pinia/nuxt"],
  colorMode: {
    dataValue: "theme",
  },
});
