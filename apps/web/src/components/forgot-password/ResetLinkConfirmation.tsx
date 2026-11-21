import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiInfo } from "react-icons/fi";

interface ResetLinkConfirmationProps {
  email: string;
}

function ResetLinkConfirmation({ email }: ResetLinkConfirmationProps) {
  return (
    <section className="w-full text-center">
      {/* Brand */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-green)] bg-[var(--primary-soft)] text-[var(--primary)]">
          <FiCheckCircle size={21} />
        </span>

        <span className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
          BrowserGuard
        </span>
      </div>

      {/* Success icon */}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--primary)] text-[var(--primary)]">
        <FiCheckCircle size={34} />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
        Reset link sent!
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
        A password reset link has been sent to{" "}
        <span className="font-medium text-[var(--text-primary)]">{email}</span>.
      </p>

      {/* Email instructions */}
      <div className="mt-6 rounded-xl border border-[var(--border-green)] bg-[rgba(0,213,27,0.045)] p-4 text-left">
        <div className="flex items-center gap-2">
          <FiInfo
            size={18}
            className="shrink-0 text-[var(--primary)]"
            aria-hidden="true"
          />

          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            Didn&apos;t receive the email?
          </h3>
        </div>

        <ul className="mt-3 space-y-2 pl-5 text-xs leading-5 text-[var(--text-secondary)]">
          <li className="list-disc">Check your spam or junk folder.</li>
          <li className="list-disc">
            Make sure your email address is correct.
          </li>
          <li className="list-disc">Try again in a few minutes.</li>
        </ul>
      </div>

      {/* Back to login */}
      <div className="mt-6 flex justify-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-light)] transition-colors hover:text-[var(--primary)]"
        >
          <FiArrowLeft size={16} aria-hidden="true" />
          Back to sign in
        </Link>
      </div>
    </section>
  );
}

export default ResetLinkConfirmation;
