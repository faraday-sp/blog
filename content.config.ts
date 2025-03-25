import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      source: '**/*.md',
      type: 'page',
    }),
    rus: defineCollection({
      schema: z.object({
        lox: z.string(),
      }),
      source: 'rus/**/*.md',
      type: 'page',
    }),
    usa: defineCollection({
      schema: z.object({
        lox: z.string(),
      }),
      source: 'usa/**/*.md',
      type: 'page',
    }),
  },
})
