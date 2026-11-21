import { Link } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft, FiCheck } from "react-icons/fi";
import DottedBG from "../../assets/images/DottedBG.webp";

export type ResetResultStatus = "success" | "expired";

interface ResetPasswordResultProps {
  status: ResetResultStatus;
}

function ResetPasswordResult({ status }: ResetPasswordResultProps) {
  const isSuccess = status === "success";

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)] px-5 py-12">
      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] ${
          isSuccess
            ? "bg-[var(--primary)] opacity-[0.07]"
            : "bg-[var(--critical)] opacity-[0.06]"
        }`}
      />

      {/* Dotted wave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
      >
        <img
          src={DottedBG}
          alt=""
          className="h-auto w-full select-none object-contain opacity-40"
        />
      </div>

      {/* Result content */}
      <section
        aria-labelledby="reset-result-title"
        className="relative z-10 mx-auto w-full max-w-[440px] text-center"
      >
        {/* Status icon */}
        <div
          className={`mx-auto mb-6 flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 sm:h-[88px] sm:w-[88px] ${
            isSuccess
              ? "border-[var(--primary)] text-[var(--primary-light)] shadow-[0_0_30px_rgba(0,213,27,0.18)]"
              : "border-[var(--critical)] text-[var(--critical)] shadow-[0_0_30px_rgba(255,59,69,0.12)]"
          }`}
        >
          {isSuccess ? (
            <FiCheck size={46} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <FiAlertTriangle size={43} strokeWidth={1.8} aria-hidden="true" />
          )}
        </div>

        {/* Heading */}
        <h1
          id="reset-result-title"
          className="text-[1.65rem] font-semibold leading-tight tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl"
        >
          {isSuccess ? (
            <>
              Password reset
              <br />
              <span className="text-[var(--primary-light)]">successful!</span>
            </>
          ) : (
            <>
              Password reset
              <br />
              <span className="text-[var(--critical)]">link expired</span>
            </>
          )}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-[350px] text-sm leading-[1.75] text-[var(--text-secondary)] sm:text-base">
          {isSuccess
            ? "Your password has been updated. You can now sign in to your BrowserGuard account."
            : "This reset link is no longer valid or has already been used."}
        </p>

        {/* Primary action */}
        <div className="mt-7">
          {isSuccess ? (
            <Link
              to="/login"
              className="flex min-h-[48px] w-full items-center justify-center rounded-[9px] bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[#031006] transition-all duration-200 hover:bg-[var(--primary-light)] hover:shadow-[0_0_24px_rgba(0,213,27,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              Sign in
            </Link>
          ) : (
            <Link
              to="/forgot-password"
              className="flex min-h-[48px] w-full items-center justify-center rounded-[9px] border border-[var(--primary)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--primary-soft)] hover:shadow-[0_0_20px_rgba(0,213,27,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              Request a new link
            </Link>
          )}
        </div>

        {/* Back to sign in */}
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center gap-2 text-xs font-medium text-[var(--primary-light)] transition-colors hover:text-[var(--primary)]"
        >
          <FiArrowLeft size={15} aria-hidden="true" />
          Back to sign in
        </Link>
      </section>
    </main>
  );
}

export default ResetPasswordResult;
