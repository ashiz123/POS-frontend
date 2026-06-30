import { z } from "zod";

export const kioskActivationValidation = z.object({
  activationCode: z.string().min(6, "Activation code is too short"),
});

export type KioskActivationType = z.infer<typeof kioskActivationValidation>;
