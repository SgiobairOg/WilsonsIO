import { z } from 'zod';

//* Template Head Props */
const templateHeadPropsSchema = z.object({
  title: z.string().optional(),
  canonicalUrl: z.string().url().optional()
})

export type templateHeadProps = z.infer<typeof templateHeadPropsSchema>;