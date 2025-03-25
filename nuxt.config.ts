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
  css: ['./assets/css/main.css', '~/assets/css/index.css'],
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxt/ui'],
  vite: {
    plugins: [tailwindcss()],
  },
})
