import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  transpile: ["@heroicons/vue", "tailwindcss"],
  srcDir: "src/",
  modules: ["@nuxtjs/tailwindcss"],
  typescript: { strict: true },
  vite: {
    server: { watch: { usePolling: true } },
  },
})
