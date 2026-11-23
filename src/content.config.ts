import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One rule for EVERY page: frontmatter is metadata; the entire Markdown body is visible.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    eyebrow: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
    featured: z.boolean().optional(),
    status: z.string().optional(),
  }),
});
export const collections = { pages };
