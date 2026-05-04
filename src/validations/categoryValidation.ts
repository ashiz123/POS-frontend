import { z } from "zod";

const PopulatedParentSchema = z.object({
  _id: z.string(),
  title: z.string(),
});

export const categoryValidation = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().optional(),
  slug: z.string().slugify().min(3, "Slug is too short"),
  isActive: z.boolean().optional(),
  parentCategoryId: z
    .union([z.string(), PopulatedParentSchema])
    .nullable() // handles null or undefined
    .or(z.literal(""))
    .transform((val) => (val === "" || val === undefined ? null : val)),
});

export type CategoryData = z.infer<typeof categoryValidation>;
