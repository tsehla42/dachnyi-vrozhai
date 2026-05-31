import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        section: z.string().optional(),
        category: z.string().optional(),
        article: z.string().optional(),
      }),
    }),
  },
});
