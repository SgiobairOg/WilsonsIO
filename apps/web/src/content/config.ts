import { defineCollection, z } from 'astro:content';
import { employmentHistorySchema } from '../schemas';

const employmentHistoryCollection = defineCollection({
    type: 'content',
    schema: employmentHistorySchema,
})

export const collections = {
    'employmentHistory': employmentHistoryCollection
}