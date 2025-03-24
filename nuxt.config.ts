export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/content", "@nuxt/ui"],
  css: ['./assets/scss/main.scss', '~/assets/scss/index.css'],
  compatibilityDate: "2025-02-24",
  app: {
    head: {
      link: [
        {
          crossorigin: '',
          href: '/static-media-frontend/fonts/montserrat/stylesheet.css',
          rel: 'stylesheet',
        },
      ],
      title: '',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use 'sass:math';
            @use './assets/scss/compile/_mixins.scss' as *;
          `,
          api: 'modern-compiler',
        },
      },
    },
  },
});