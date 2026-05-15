import { defineContentConfig, defineCollection } from '@nuxt/content';
import { z } from 'zod';

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
