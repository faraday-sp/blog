// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/content", "@nuxt/ui"],
  css: ['./assets/scss/main.scss'],
  compatibilityDate: "2025-02-24",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use 'sass:math';
            @use './assets/scss/compile/_mixins.scss' as *;
          `,
        },
      },
    },
  },
});