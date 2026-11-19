import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z.string().min(1),

  CLIENT_URL: z.string().url().default("http://localhost:5173"),

  JWT_SECRET: z.string().min(64),

  CSRF_SECRET: z.string().min(64),

  JWT_EXPIRES_IN: z.string().default("1d"),

  JWT_REMEMBER_ME_EXPIRES_IN: z.string().default("7d"),

  AUTH_COOKIE_NAME: z.string().default("browserguard_token"),

  // SMTP configuration
  SMTP_HOST: z.string().optional(),

  SMTP_PORT: z.coerce.number().default(465),

  SMTP_SECURE: z
    .enum(["true", "false"])
    .default("true")
    .transform((value) => value === "true"),

  SMTP_USER: z.string().optional(),

  SMTP_PASS: z.string().optional(),

  MAIL_FROM: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment configuration:",
    parsedEnv.error.flatten().fieldErrors,
  );

  process.exit(1);
}

export const env = parsedEnv.data;
