import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";
import { ApiError } from "../../services/api";

import type { LoginCredentials } from "../../types/auth.types";

interface LoginFormProps {
  onSubmit?: (credentials: LoginCredentials) => Promise<void>;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormError("");

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const credentials: LoginCredentials = {
        email: email.trim(),
        password,
        rememberMe,
      };

      if (onSubmit) {
        await onSubmit(credentials);
      } else {
        const authenticatedUser = await loginUser(credentials);
        setUser(authenticatedUser);
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError(
          "Unable to sign in. Please check your details and try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseStyles =
    "h-[52px] w-full rounded-[10px] border bg-[rgba(255,255,255,0.025)] pl-12 pr-4 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,213,27,0.10)]";

  return (
    <div className="w-full">
      {/* Form heading */}
      <div className="mb-8 text-center">
        <div className="mb-6 hidden items-center justify-center gap-2.5 sm:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-green)] bg-[rgba(0,213,27,0.08)] text-[var(--primary)]">
            <FiLock size={19} aria-hidden="true" />
          </span>

          <span className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            BrowserGuard
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-[2.25rem]">
          Welcome back
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
          Sign in to continue to your BrowserGuard account.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email address */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
          >
            Email address
          </label>

          <div className="relative">
            <FiMail
              size={20}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Enter your email"
              value={email}
              disabled={isSubmitting}
              onChange={(event) => {
                setEmail(event.target.value);

                setErrors((current) => ({
                  ...current,
                  email: undefined,
                }));

                setFormError("");
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              className={`${inputBaseStyles} ${
                errors.email
                  ? "border-[var(--critical)]"
                  : "border-[var(--border-green)]"
              }`}
            />
          </div>

          {errors.email && (
            <p
              id="login-email-error"
              role="alert"
              className="mt-2 text-xs text-[var(--critical)]"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mt-6">
          <label
            htmlFor="login-password"
            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
          >
            Password
          </label>

          <div className="relative">
            <FiLock
              size={20}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              disabled={isSubmitting}
              onChange={(event) => {
                setPassword(event.target.value);

                setErrors((current) => ({
                  ...current,
                  password: undefined,
                }));

                setFormError("");
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
              className={`${inputBaseStyles} pr-12 ${
                errors.password
                  ? "border-[var(--critical)]"
                  : "border-[var(--border-green)]"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-50"
            >
              {showPassword ? (
                <FiEyeOff size={19} aria-hidden="true" />
              ) : (
                <FiEye size={19} aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password && (
            <p
              id="login-password-error"
              role="alert"
              className="mt-2 text-xs text-[var(--critical)]"
            >
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember me and forgot password */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-[var(--text-secondary)]">
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              disabled={isSubmitting}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-5 w-5 cursor-pointer rounded border-[var(--border-green)] accent-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-[var(--primary-light)] transition-colors hover:text-[var(--primary)]"
          >
            Forgot password?
          </Link>
        </div>

        {/* General form error */}
        {formError && (
          <div
            role="alert"
            aria-live="polite"
            className="mt-5 rounded-lg border border-[rgba(255,59,69,0.35)] bg-[rgba(255,59,69,0.08)] px-4 py-3 text-sm leading-6 text-[#ff8b91]"
          >
            {formError}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-8 flex min-h-[52px] w-full items-center justify-center rounded-[10px] bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[#031006] transition-all duration-200 hover:bg-[var(--primary-light)] hover:shadow-[0_0_24px_rgba(0,213,27,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        {/* Registration link */}
        <p className="mt-7 text-center text-sm text-[var(--text-secondary)]">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="ml-1 font-semibold text-[var(--primary-light)] transition-colors hover:text-[var(--primary)]"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
