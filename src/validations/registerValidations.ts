import { z } from "zod";

export const registerValidation = z.object({
  name: z.string().min(3, "Name is too short"),
  phone: z.string().min(10, "Phone number must be atleast of 10 digits"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterData = z.infer<typeof registerValidation>;
