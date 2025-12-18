import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/icon"],
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
});
