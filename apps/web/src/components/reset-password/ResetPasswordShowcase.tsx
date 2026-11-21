import PasswordLock from "../../assets/images/PasswordLock.webp";

function ResetPasswordShowcase() {
  return (
    <section className="w-full">
      {/* Illustration */}
      <div className="relative flex w-full items-center justify-start lg:justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-[0.06] blur-[90px] sm:h-64 sm:w-64"
        />

        <img
          src={PasswordLock}
          alt="A secure password protected by BrowserGuard"
          className="relative z-10 h-auto w-[150px] object-contain sm:w-[175px] lg:w-full lg:max-w-[440px] xl:max-w-[500px]"
        />
      </div>

      {/* Introduction */}
      <div className="mt-5 w-full lg:mt-7">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-[2px] w-6 bg-[var(--primary)]" />

          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--primary-light)]">
            Set a new password
          </span>
        </div>

        <h1 className="max-w-[540px] text-[clamp(1.8rem,3.5vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-[var(--text-primary)]">
          Create a
          <br className="hidden lg:block" />
          <span className="text-[var(--primary-light)]"> New Password.</span>
        </h1>

        <p className="mt-3 max-w-[430px] text-sm leading-[1.7] text-[var(--text-secondary)] sm:text-base">
          Choose a strong password for your BrowserGuard account.
        </p>
      </div>
    </section>
  );
}

export default ResetPasswordShowcase;
