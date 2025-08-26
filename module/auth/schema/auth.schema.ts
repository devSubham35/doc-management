import { z } from "zod";

export const SignUpValidationSchema = z.object({
  email: z.string().email(),
  full_name: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
