import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";

import Logo from "../common/Logo";

interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

interface RegisterFormProps {
  onSubmit?: (credentials: RegisterCredentials) => Promise<void>;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptedTerms?: string;
}

function getPasswordStrength(password: string) {
  if (!password) {
    return { score: 0, label: "", color: "bg-[#26332a]" };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) {
    return { score: 1, label: "Weak", color: "bg-[var(--critical)]" };
  }

  if (score === 2) {
    return { score: 2, label: "Fair", color: "bg-[var(--high)]" };
  }

  if (score === 3) {
    return { score: 3, label: "Good", color: "bg-[var(--medium)]" };
  }

  return { score: 4, label: "Strong", color: "bg-[var(--low)]" };
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    const normalizedName = fullName.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName) {
      nextErrors.fullName = "Full name is required.";
    } else if (normalizedName.length < 2) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!normalizedEmail) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must contain at least 8 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!acceptedTerms) {
      nextErrors.acceptedTerms =
        "You must agree to the Terms of Service and Privacy Policy.";
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

    if (!onSubmit) {
      setFormError(
        "Registration is not connected yet. Please try again later.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        acceptedTerms,
      });
    } catch {
      setFormError(
        "Unable to create your account. Please check your details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseStyles =
    "h-[46px] w-full rounded-[9px] border bg-[rgba(255,255,255,0.025)] pl-10 pr-11 text-xs text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,213,27,0.10)] sm:h-[48px]";

  const fieldErrorClass = "mt-1.5 text-[11px] text-[var(--critical)]";

  return (
    <div className="w-full">
      {/* Form heading */}
      <div className="mb-5 text-center sm:mb-6">
        <div className="mb-3 flex justify-center">
          <Logo width={140} imageClassName="w-[132px] sm:w-[140px]" />
        </div>

        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-[1.75rem]">
          Create your account
        </h2>

        <p className="mx-auto mt-1 max-w-[330px] text-xs leading-[1.6] text-[var(--text-secondary)] sm:text-sm">
          Join BrowserGuard and start analysing browser extensions.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full name */}
        <div>
          <label
            htmlFor="register-full-name"
            className="mb-1.5 block text-xs font-medium text-[var(--text-primary)]"
          >
            Full name
          </label>

          <div className="relative">
            <FiUser
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="register-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={fullName}
              disabled={isSubmitting}
              onChange={(event) => {
                setFullName(event.target.value);
                setErrors((current) => ({
                  ...current,
                  fullName: undefined,
                }));
                setFormError("");
              }}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? "register-name-error" : undefined
              }
              className={`${inputBaseStyles} ${
                errors.fullName
                  ? "border-[var(--critical)]"
                  : "border-[var(--border-green)]"
              }`}
            />
          </div>

          {errors.fullName && (
            <p
              id="register-name-error"
              role="alert"
              className={fieldErrorClass}
            >
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email address */}
        <div className="mt-4">
          <label
            htmlFor="register-email"
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
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Enter your email address"
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
              aria-describedby={
                errors.email ? "register-email-error" : undefined
              }
              className={`${inputBaseStyles} ${
                errors.email
                  ? "border-[var(--critical)]"
                  : "border-[var(--border-green)]"
              }`}
            />
          </div>

          {errors.email && (
            <p
              id="register-email-error"
              role="alert"
              className={fieldErrorClass}
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <label
            htmlFor="register-password"
            className="mb-1.5 block text-xs font-medium text-[var(--text-primary)]"
          >
            Password
          </label>

          <div className="relative">
            <FiLock
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              disabled={isSubmitting}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({
                  ...current,
                  password: undefined,
                  confirmPassword: undefined,
                }));
                setFormError("");
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "register-password-error"
                  : "password-strength"
              }
              className={`${inputBaseStyles} ${
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
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              {showPassword ? (
                <FiEyeOff size={17} aria-hidden="true" />
              ) : (
                <FiEye size={17} aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password && (
            <p
              id="register-password-error"
              role="alert"
              className={fieldErrorClass}
            >
              {errors.password}
            </p>
          )}

          {/* Password strength */}
          <div id="password-strength" className="mt-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] text-[var(--text-secondary)]">
                Password strength
              </span>

              <span
                className={`text-[10px] font-semibold ${
                  passwordStrength.score === 4
                    ? "text-[var(--low)]"
                    : passwordStrength.score === 3
                      ? "text-[var(--medium)]"
                      : passwordStrength.score === 2
                        ? "text-[var(--high)]"
                        : passwordStrength.score === 1
                          ? "text-[var(--critical)]"
                          : "text-[var(--text-muted)]"
                }`}
                aria-live="polite"
              >
                {passwordStrength.label || "Not set"}
              </span>
            </div>

            <div
              className="flex gap-1"
              role="meter"
              aria-label="Password strength"
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={passwordStrength.score}
            >
              {[1, 2, 3, 4].map((segment) => (
                <div
                  key={segment}
                  className={`h-[5px] flex-1 rounded-full ${
                    segment <= passwordStrength.score
                      ? passwordStrength.color
                      : "bg-[#26332a]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Confirm password */}
        <div className="mt-4">
          <label
            htmlFor="register-confirm-password"
            className="mb-1.5 block text-xs font-medium text-[var(--text-primary)]"
          >
            Confirm password
          </label>

          <div className="relative">
            <FiLock
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="register-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              disabled={isSubmitting}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setErrors((current) => ({
                  ...current,
                  confirmPassword: undefined,
                }));
                setFormError("");
              }}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "register-confirm-password-error"
                  : undefined
              }
              className={`${inputBaseStyles} ${
                errors.confirmPassword
                  ? "border-[var(--critical)]"
                  : "border-[var(--border-green)]"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              disabled={isSubmitting}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={showConfirmPassword}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              {showConfirmPassword ? (
                <FiEyeOff size={17} aria-hidden="true" />
              ) : (
                <FiEye size={17} aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p
              id="register-confirm-password-error"
              role="alert"
              className={fieldErrorClass}
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms agreement */}
        <div className="mt-4">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={acceptedTerms}
              disabled={isSubmitting}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked);
                setErrors((current) => ({
                  ...current,
                  acceptedTerms: undefined,
                }));
                setFormError("");
              }}
              aria-invalid={Boolean(errors.acceptedTerms)}
              aria-describedby={
                errors.acceptedTerms ? "register-terms-error" : undefined
              }
              className="mt-0.5 h-[17px] w-[17px] shrink-0 cursor-pointer rounded border-[var(--border-green)] accent-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            />

            <span className="text-[11px] leading-[1.6] text-[var(--text-secondary)]">
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-semibold text-[var(--primary-light)] hover:text-[var(--primary)]"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-semibold text-[var(--primary-light)] hover:text-[var(--primary)]"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {errors.acceptedTerms && (
            <p
              id="register-terms-error"
              role="alert"
              className={fieldErrorClass}
            >
              {errors.acceptedTerms}
            </p>
          )}
        </div>

        {/* General form error */}
        {formError && (
          <div
            role="alert"
            aria-live="polite"
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        {/* Login link */}
        <p className="mt-4 text-center text-[11px] text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="ml-1 font-semibold text-[var(--primary-light)] transition-colors hover:text-[var(--primary)]"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
