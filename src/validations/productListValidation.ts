import { z } from "zod";
import { CreateProductValidation } from "./productValidation";

const populatedCategorySchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  position: z.string(),
  isActive: z.boolean(),
});

export const ProductDisplayValidation = CreateProductValidation.extend({
  categoryId: populatedCategorySchema,
});

export type ProductDisplayData = z.infer<typeof ProductDisplayValidation>;
