import { z } from "zod";

export const registerBusinessValidation = z.object({
  name: z.string().min(3, "Name is too short"),
  address: z.string().min(3, "Address is too short"),
  businessType: z.string().min(3, "Business type is too short"),
});

export type BusinessRegisterData = z.infer<typeof registerBusinessValidation>;
