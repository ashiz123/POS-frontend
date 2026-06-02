import { z } from "zod";

export const kioskLoginValidation = z.object({
  email: z.email("Invalid email address"),
  pin: z.string("Pin must be a string"),
});

export type KioskLoginData = z.infer<typeof kioskLoginValidation>;
