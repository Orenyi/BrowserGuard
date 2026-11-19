import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

interface PasswordResetEmailInput {
  email: string;
  displayName: string;
  resetUrl: string;
}

export const sendPasswordResetEmail = async ({
  email,
  displayName,
  resetUrl,
}: PasswordResetEmailInput): Promise<void> => {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    throw new Error("Email service is not configured.");
  }

  await transporter.sendMail({
    from: env.MAIL_FROM || env.SMTP_USER,
    to: email,
    subject: "Reset your BrowserGuard password",

    text: `
Hello ${displayName},

We received a request to reset your BrowserGuard password.

Use the link below to create a new password:

${resetUrl}

This link expires in 30 minutes and can only be used once.

If you did not request this reset, you can safely ignore this email.

BrowserGuard Security Team
    `,

    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:30px;background:#07100a;color:#ffffff;border-radius:12px;">
        <h2 style="color:#00d51b;">BrowserGuard</h2>

        <h3>Reset your password</h3>

        <p>Hello ${displayName.replace(/[&<>"']/g, "")},</p>

        <p>
          We received a request to reset your BrowserGuard
          account password.
        </p>

        <p>Click the button below to create a new password.</p>

        <a
          href="${resetUrl}"
          style="display:inline-block;padding:14px 24px;background:#00d51b;color:#031006;text-decoration:none;border-radius:8px;font-weight:bold;"
        >
          Reset Password
        </a>

        <p style="margin-top:25px;">
          This link expires in <strong>30 minutes</strong>
          and can only be used once.
        </p>

        <p>
          If you did not request this reset, you can safely
          ignore this email.
        </p>

        <hr style="border-color:#1b3522;margin-top:30px;" />

        <p style="color:#9ab09d;font-size:12px;">
          BrowserGuard Security Team
        </p>
      </div>
    `,
  });
};
