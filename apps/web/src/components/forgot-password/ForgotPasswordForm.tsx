import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => Promise<void>;
  onSuccess: (email: string) => void;
}

function ForgotPasswordForm({ onSubmit, onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return "Email address is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return "Enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormError("");

    const validationError = validateEmail();

    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setEmailError("");

    if (!onSubmit) {
      setFormError(
        "Password recovery is not connected yet. Please try again later.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const normalizedEmail = email.trim();
      await onSubmit(normalizedEmail);
      onSuccess(normalizedEmail);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "We couldn't process your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full">
      {/* Form heading */}
      <div className="mb-6">
        <h2 className="text-[1.65rem] font-semibold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
          Forgot your password?
        </h2>

        <p className="mt-2 text-sm leading-[1.65] text-[var(--text-secondary)]">
          No worries. Enter your email address and we&apos;ll send you a
          password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email address */}
        <div>
          <label
            htmlFor="forgot-password-email"
            className="mb-1.5 block text-xs font-medium text-[var(--text-primary)]"
          >
            Email address
          </label>

          <div className="relative">
            <FiMail
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="forgot-password-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Enter your email address"
              value={email}
              disabled={isSubmitting}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
                setFormError("");
              }}
              aria-invalid={Boolean(emailError)}
              aria-describedby={
                emailError ? "forgot-password-email-error" : undefined
              }
              className={`h-[46px] w-full rounded-[9px] border bg-[rgba(255,255,255,0.025)] pl-10 pr-4 text-xs text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,213,27,0.10)] sm:h-[48px] ${
                emailError
                  ? "border-[var(--critical)]"
                  : "border-[var(--border-green)]"
              }`}
            />
          </div>

          {emailError && (
            <p
              id="forgot-password-email-error"
              role="alert"
              className="mt-1.5 text-[11px] text-[var(--critical)]"
            >
              {emailError}
            </p>
          )}
        </div>

        {/* General error */}
        {formError && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-[rgba(255,59,69,0.35)] bg-[rgba(255,59,69,0.08)] px-3 py-2.5 text-xs leading-5 text-[#ff8b91]"
          >
            {formError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-5 flex min-h-[46px] w-full items-center justify-center rounded-[9px] bg-[var(--primary)] px-5 py-3 text-xs font-semibold text-[#031006] transition-all duration-200 hover:bg-[var(--primary-light)] hover:shadow-[0_0_24px_rgba(0,213,27,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending reset link..." : "Send reset link"}
        </button>

        {/* Back to login */}
        <div className="mt-5 flex justify-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-medium text-[var(--primary-light)] transition-colors hover:text-[var(--primary)]"
          >
            <FiArrowLeft size={15} aria-hidden="true" />
            Back to sign in
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ForgotPasswordForm;
