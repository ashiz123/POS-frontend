import { z } from "zod";

export const ProductValidation = z.object({
  name: z.string().min(3, "Name is too short"),
  description: z.string().optional(),
  slug: z.string().slugify().min(3, "Slug is too short"),
  stockType: z.enum(["stocked", "composite"]),
  lowStock: z.coerce.number().default(0),
  image: z.string().optional(),
  sellPrice: z.coerce.number().min(1, "Sell price must be greater than 0"),
  isActive: z.boolean(),
  categoryId: z.string(),
});

export type ProductData = z.infer<typeof ProductValidation>;
