import { defineCollection, z } from 'astro:content';
import { employmentHistorySchema, blogPostSchema } from '../schemas';

const employmentHistoryCollection = defineCollection({
    type: 'content',
    schema: employmentHistorySchema,
})

const blogPostCollection = defineCollection({
  type: 'content',
  schema: blogPostSchema,
})

export const collections = {
    'employmentHistory': employmentHistoryCollection,
    'blogPosts': blogPostCollection
}