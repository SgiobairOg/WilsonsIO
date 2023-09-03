import { z, reference } from 'astro:content';

export const blogPostSchema = z.object({
    isDraft: z.boolean(),
    title: z.string(),
    sortOrder: z.number().default(0),
    author: z.string().default('Aoibhe'),
    tags: z.array(z.string()),
    footnote: z.string().optional(),
    publishDate: z.date(),
    canonicalURL: z.string().url(),
    teaser: z.string().optional(),
    relatedPosts: z.array(reference('blogPosts')).optional(),
  })
