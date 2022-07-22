import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: "src/",
  modules: ["@nuxtjs/tailwindcss", "mobx-vue-lite/nuxt"],
  typescript: { strict: true },
})
