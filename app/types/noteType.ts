import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  tagline: z
    .string()
    .min(1, "Tagline is Required")
    .max(200, "Tagline must be less than 200 characters"),
  body: z
    .string()
    .min(1, "Body is Required")
    .max(50000, "Body must be less than 50,000 characters"),
  createdAt: z.date().optional(),
  pinned: z.boolean().default(false),
});

export type Note = z.infer<typeof noteSchema>;
