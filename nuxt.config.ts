import { promises as fs } from 'fs'
import path from 'path'

async function getPrerenderRoutes() {
  const contentDir = path.resolve('content/posts')
  let routes: string[] = []

  try {
    const regions = await fs.readdir(contentDir)
    for (const region of regions) {
      const regionPath = path.join(contentDir, region)
      const stat = await fs.stat(regionPath)

      if (stat.isDirectory()) {
        routes.push(`/${region}`)

        const files = await fs.readdir(regionPath)
        files.forEach(file => {
          if (file.endsWith('.md')) {
            const slug = file.replace('.md', '')
            routes.push(`/${region}/${slug}`)
          }
        })
      }
    }
  } catch (error) {
    console.error('Ошибка при создании маршрутов:', error)
  }

  console.log('📌 Предрендеринг маршрутов:', routes)
  return routes
}

const prerenderRoutesPromise = await getPrerenderRoutes()

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/content", "@nuxt/ui"],
  css: ['./assets/scss/main.scss'],
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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutesPromise
    }
  },
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