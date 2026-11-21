import PasswordRecovery from "../../assets/images/PasswordRecovery.webp";
import EmailSent from "../../assets/images/EmailSent.webp";

interface ForgotPasswordShowcaseProps {
  isSuccess?: boolean;
}

function ForgotPasswordShowcase({
  isSuccess = false,
}: ForgotPasswordShowcaseProps) {
  const title = isSuccess ? (
    <>
      Check Your <span className="text-[var(--primary-light)]">Email.</span>
    </>
  ) : (
    <>
      Reset Your Password
      <br />
      <span className="text-[var(--primary-light)]">Securely.</span>
    </>
  );

  const description = isSuccess
    ? "We've sent a password reset link to your email address. Follow the instructions in the email to set a new password."
    : "Enter your email address and we'll send you a link to create a new password for your account.";

  return (
    <section className="w-full">
      {/* Desktop introduction */}
      <div className="hidden lg:block">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-[2px] w-6 bg-[var(--primary)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)]">
            Account recovery
          </span>
        </div>

        <h1 className="max-w-[480px] text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-[var(--text-primary)]">
          {title}
        </h1>

        <p className="mt-3 max-w-[410px] text-sm leading-[1.7] text-[var(--text-secondary)]">
          {description}
        </p>
      </div>

      {/* Envelope illustration */}
      <div className="relative mt-4 flex w-full items-center justify-start lg:mt-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-[0.05] blur-[90px]"
        />

        <img
          src={isSuccess ? EmailSent : PasswordRecovery}
          alt={
            isSuccess
              ? "Email envelope with a confirmation checkmark"
              : "Password recovery envelope secured with a lock"
          }
          className="relative z-10 mx-auto block h-auto w-full max-w-[340px] object-contain object-center lg:mx-0 lg:max-w-[390px]"
        />
      </div>

      {/* Tablet and mobile introduction */}
      <div className="mt-2 lg:hidden">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-[2px] w-6 bg-[var(--primary)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)]">
            Account recovery
          </span>
        </div>

        <h1 className="text-[clamp(1.65rem,5vw,2rem)] font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--text-primary)]">
          {title}
        </h1>

        <p className="mt-2 max-w-[440px] text-sm leading-[1.65] text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </section>
  );
}

export default ForgotPasswordShowcase;
