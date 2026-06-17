import { z } from "zod/v3";

export const inventoryBatchSchema = z.object({
  quantity: z.string().min(1),
  price: z.string().min(1),
  expiryDate: z.string().date(),
});

export type InventoryBatchData = z.infer<typeof inventoryBatchSchema>;
