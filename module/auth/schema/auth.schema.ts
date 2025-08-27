import { Role } from "prisma/client";
import { z } from "zod";

export const SignUpValidationSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum([Role.CLINICIAN, Role.SUPERVISOR, Role.PARTNER, Role.PAYROLL])
    .refine((val) => !!val, { message: "Role is required" }),
});


export const SignInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
