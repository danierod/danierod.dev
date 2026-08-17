import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const about = defineCollection({
  loader: glob({ base: "./src/content/about", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().nonnegative(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({
    base: "./src/content/case-studies",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      role: z.string(),
      period: z.string(),
      summary: z.string(),
      impact: z.array(
        z.object({
          metric: z.string().optional(),
          description: z.string(),
        }),
      ),
      technologies: z.array(z.string()),
      order: z.number().int().nonnegative(),
      draft: z.boolean().default(false),
      ogImage: image().optional(),
    }),
});

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    kind: z.enum(["article", "til"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: file("./src/content/testimonials.yaml"),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string().optional(),
    angle: z.enum(["leadership", "product", "mentorship"]),
  }),
});

export const collections = {
  about,
  "case-studies": caseStudies,
  writing,
  testimonials,
};
