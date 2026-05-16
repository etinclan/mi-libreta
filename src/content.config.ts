import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notas' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    stage: z.enum(['intuicion', 'emergente', 'maduro']),
    tags: z.array(z.string()).optional(),
  }),
});

const ensayos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ensayos' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    stage: z.enum(['intuicion', 'emergente', 'maduro']),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const collections = { notas, ensayos };
