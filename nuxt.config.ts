import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
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
  compatibilityDate: '2025-02-24',
  css: ['./assets/scss/main.scss', '~/assets/scss/index.css'],
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxt/ui'],
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
    plugins: [tailwindcss()],
  },
})
