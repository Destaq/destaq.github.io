import { defineCollection, z } from "astro:content";

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    description: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    legacyPath: z.string(),
    legacy: z.record(z.string(), z.unknown()).optional(),
    heroImage: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string().optional()
      })
      .optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { writing };
