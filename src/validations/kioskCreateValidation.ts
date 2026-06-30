import { z } from "zod";

export const kioskCreateValidation = z.object({
  name: z.string().min(3, "Name is too short"),
  note: z.string().optional(),
});

export type KioskCreateData = z.infer<typeof kioskCreateValidation>;
