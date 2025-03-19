import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "**/*.md",
    }),
    rus: defineCollection({
      type: "page",
      source: "rus/**/*.md",
      schema: z.object({
        lox: z.string(),
      }),
    }),
    usa: defineCollection({
      type: "page",
      source: "usa/**/*.md",
      schema: z.object({
        lox: z.string(),
      }),
    }),
  },
});
