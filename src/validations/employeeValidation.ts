import { z } from "zod";

export const EMPLOYEE_ROLES = [
  "admin",
  "manager",
  "cashier",
  "employee",
  "owner",
] as const;

export type EmployeeRole = (typeof EMPLOYEE_ROLES)[number];

const PHONE_PATTERN = z.string().regex(/^\+?[0-9]\d{1,14}$/, {
  message: "Invalid phone number format",
});

const employeeValidation = z
  .object({
    name: z.string().min(5).max(100),
    email: z.email().toLowerCase(),
    address: z.string(),
    phone: PHONE_PATTERN,
  })
  .strict();

export const CreateEmployeeValidation = employeeValidation.extend({
  role: z.enum(EMPLOYEE_ROLES),
});

export const UpdateEmployeeValidation = employeeValidation.partial();

export type CreateEmployeeData = z.infer<typeof CreateEmployeeValidation>;
export type UpdateEmployeeData = z.infer<typeof UpdateEmployeeValidation>;
