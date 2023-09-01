import { z } from 'astro:content';

export const employmentHistorySchema = z.object({
    jobTitle: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    employer: z.string(),
    location: z.string(),
})