import { useState } from "react";

import Container from "../components/common/Container";
import LoginHeader from "../components/login/LoginHeader";
import ResetPasswordShowcase from "../components/reset-password/ResetPasswordShowcase";
import ResetPasswordForm from "../components/reset-password/ResetPasswordForm";
import ResetPasswordResult, {
  type ResetResultStatus,
} from "../components/reset-password/ResetPasswordResult";

import DottedBG from "../assets/images/DottedBG.webp";

interface ResetPasswordPageProps {
  onResetPassword?: (token: string, password: string) => Promise<void>;
}

function isExpiredResetError(error: unknown): boolean {
  if (!error || typeof error !== "object" || !("code" in error)) {
    return false;
  }

  const code = String(error.code).toUpperCase();

  return [
    "TOKEN_EXPIRED",
    "TOKEN_INVALID",
    "TOKEN_USED",
    "INVALID_RESET_TOKEN",
    "EXPIRED_RESET_TOKEN",
  ].includes(code);
}

function ResetPasswordPage({ onResetPassword }: ResetPasswordPageProps) {
  const [result, setResult] = useState<ResetResultStatus | null>(null);

  const token = new URLSearchParams(window.location.search).get("token") ?? "";

  const handleResetPassword = async (password: string) => {
    if (!token) {
      setResult("expired");
      return;
    }

    if (!onResetPassword) {
      throw new Error(
        "Password reset is not connected yet. Please try again later.",
      );
    }

    try {
      await onResetPassword(token, password);
      setResult("success");
    } catch (error) {
      if (isExpiredResetError(error)) {
        setResult("expired");
      }

      throw error;
    }
  };

  // Show success or expired-link result.
  if (result) {
    return <ResetPasswordResult status={result} />;
  }

  // Missing token means the reset link cannot be used.
  if (!token) {
    return <ResetPasswordResult status="expired" />;
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[var(--bg)]">
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-[var(--primary)] opacity-[0.035] blur-[150px]"
      />

      {/* Full-width dotted wave */}
      <img
        src={DottedBG}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-0 z-0 block h-auto w-full max-w-none select-none opacity-40 md:-bottom-28 lg:-bottom-36 xl:-bottom-44"
      />

      <Container className="relative z-10 flex min-h-screen flex-col">
        <LoginHeader />

        <div className="grid flex-1 grid-cols-1 items-start gap-6 pb-12 pt-5 sm:gap-8 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-4 xl:gap-16">
          {/* Left: password showcase */}
          <div className="min-w-0">
            <ResetPasswordShowcase />
          </div>

          {/* Right: reset form */}
          <section className="flex min-w-0 justify-start lg:justify-end">
            <div className="w-full max-w-[520px] rounded-xl border border-[var(--border-green)] bg-[rgba(5,18,9,0.78)] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-6 lg:p-6 xl:p-8">
              <ResetPasswordForm onSubmit={handleResetPassword} />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

export default ResetPasswordPage;
