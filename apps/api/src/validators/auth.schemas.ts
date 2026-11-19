import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[0-9]/, "Include at least one number")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character");

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, "Full name must contain at least 2 characters")
      .max(80, "Full name is too long"),

    email: z.string().trim().email("Enter a valid email address"),

    password: passwordSchema,

    confirmPassword: z.string(),

    acceptTerms: z
      .boolean()
      .refine(
        (value) => value === true,
        "You must accept the Terms of Service",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(32, "Invalid reset token"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
