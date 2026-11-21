import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiEye, FiEyeOff, FiLock } from "react-icons/fi";

interface ResetPasswordFormProps {
  onSubmit?: (password: string) => Promise<void>;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: "At least 8 characters",
    test: (password) => password.length >= 8,
  },
  {
    label: "Include an uppercase letter (A–Z)",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Include a lowercase letter (a–z)",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "Include a number (0–9)",
    test: (password) => /\d/.test(password),
  },
  {
    label: "Include a special character (e.g., @#$)",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passedRequirements = passwordRequirements.filter((requirement) =>
    requirement.test(password),
  ).length;

  const strengthLabel =
    password.length === 0
      ? "Not set"
      : passedRequirements <= 2
        ? "Weak"
        : passedRequirements <= 4
          ? "Medium"
          : "Strong";

  const strengthColor =
    passedRequirements <= 2
      ? "bg-[var(--critical)]"
      : passedRequirements <= 4
        ? "bg-[var(--medium)]"
        : "bg-[var(--low)]";

  const validateForm = () => {
    const nextErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!password) {
      nextErrors.password = "New password is required.";
    } else if (passedRequirements !== passwordRequirements.length) {
      nextErrors.password = "Please meet all password requirements.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    return !nextErrors.password && !nextErrors.confirmPassword;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormError("");

    if (!validateForm()) return;

    if (!onSubmit) {
      setFormError(
        "Password reset is not connected yet. Please try again later.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(password);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to reset your password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles =
    "h-[46px] w-full rounded-[9px] border border-[var(--border-green)] bg-[rgba(255,255,255,0.025)] pl-10 pr-11 text-xs text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,213,27,0.10)] sm:h-[48px]";

  return (
    <section className="w-full">
      {/* Form heading */}
      <div className="mb-6 text-left lg:text-center">
        <div className="mb-5 hidden items-center justify-center gap-2 lg:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-green)] bg-[var(--primary-soft)] text-[var(--primary)]">
            <FiLock size={17} />
          </span>

          <span className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            BrowserGuard
          </span>
        </div>

        <h2 className="text-[1.65rem] font-semibold leading-tight tracking-[-0.035em] text-[var(--text-primary)] sm:text-2xl">
          Reset your password
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* New password */}
        <div>
          <label
            htmlFor="new-password"
            className="mb-1.5 block text-xs font-medium text-[var(--text-primary)]"
          >
            New password
          </label>

          <div className="relative">
            <FiLock
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="new-password"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password"
              value={password}
              disabled={isSubmitting}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({
                  ...current,
                  password: "",
                }));
                setFormError("");
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby="password-requirements"
              className={`${inputStyles} ${
                errors.password ? "border-[var(--critical)]" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>

          {errors.password && (
            <p
              role="alert"
              className="mt-1.5 text-[11px] text-[var(--critical)]"
            >
              {errors.password}
            </p>
          )}
        </div>

        {/* Password requirements */}
        <div
          id="password-requirements"
          className="mt-3 rounded-lg border border-[var(--border)] bg-[rgba(0,213,27,0.025)] p-3"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              Password requirements
            </span>

            <span
              className={`text-[10px] font-semibold ${
                strengthLabel === "Strong"
                  ? "text-[var(--low)]"
                  : strengthLabel === "Medium"
                    ? "text-[var(--medium)]"
                    : "text-[var(--text-muted)]"
              }`}
            >
              {strengthLabel}
            </span>
          </div>

          {/* Strength indicator */}
          <div
            className="mb-3 grid grid-cols-5 gap-1"
            aria-label={`Password strength: ${strengthLabel}`}
          >
            {passwordRequirements.map((requirement, index) => (
              <span
                key={requirement.label}
                className={`h-1 rounded-full transition-colors duration-200 ${
                  index < passedRequirements
                    ? strengthColor
                    : "bg-[var(--surface-hover)]"
                }`}
              />
            ))}
          </div>

          <ul className="space-y-1.5">
            {passwordRequirements.map((requirement) => {
              const passed = requirement.test(password);

              return (
                <li
                  key={requirement.label}
                  className="flex items-center gap-2 text-[10px] leading-4 sm:text-[11px]"
                >
                  <FiCheckCircle
                    size={13}
                    aria-hidden="true"
                    className={
                      passed
                        ? "shrink-0 text-[var(--low)]"
                        : "shrink-0 text-[var(--text-muted)]"
                    }
                  />

                  <span
                    className={
                      passed
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]"
                    }
                  >
                    {requirement.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Confirm password */}
        <div className="mt-4">
          <label
            htmlFor="confirm-new-password"
            className="mb-1.5 block text-xs font-medium text-[var(--text-primary)]"
          >
            Confirm new password
          </label>

          <div className="relative">
            <FiLock
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              id="confirm-new-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              disabled={isSubmitting}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setErrors((current) => ({
                  ...current,
                  confirmPassword: "",
                }));
                setFormError("");
              }}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "confirm-password-error" : undefined
              }
              className={`${inputStyles} ${
                errors.confirmPassword ? "border-[var(--critical)]" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={showConfirmPassword}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              {showConfirmPassword ? (
                <FiEyeOff size={17} />
              ) : (
                <FiEye size={17} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              role="alert"
              className="mt-1.5 text-[11px] text-[var(--critical)]"
            >
              {errors.confirmPassword}
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
          {isSubmitting ? "Resetting password..." : "Reset password"}
        </button>

        {/* Back to login */}
        <div className="mt-5 flex justify-center">
          <Link
            to="/login"
            className="text-xs font-medium text-[var(--primary-light)] transition-colors hover:text-[var(--primary)]"
          >
            <span aria-hidden="true">←</span> Back to sign in
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ResetPasswordForm;
