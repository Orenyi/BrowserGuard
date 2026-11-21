import { FiBarChart2, FiClock, FiCode } from "react-icons/fi";

import BrowserSecurity from "../../assets/images/BrowserSecurity.webp";

const benefits = [
  {
    icon: FiCode,
    title: "Run security analyses",
    description: "Scan and evaluate browser extensions.",
  },
  {
    icon: FiBarChart2,
    title: "Access detailed reports",
    description: "View clear, evidence-based findings.",
  },
  {
    icon: FiClock,
    title: "Keep your analysis history",
    description: "Revisit past scans and track results.",
  },
];

function RegisterShowcase() {
  return (
    <section className="hidden w-full max-w-[570px] flex-col items-start justify-center lg:flex">
      {/* Section introduction */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-[2px] w-6 bg-[var(--primary)]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-light)]">
            Create an account
          </span>
        </div>

        <h1 className="max-w-[520px] text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-[var(--text-primary)]">
          Get Started with
          <br />
          <span className="text-[var(--primary-light)]">BrowserGuard.</span>
        </h1>

        <p className="mt-3 max-w-[450px] text-sm leading-[1.7] text-[var(--text-secondary)]">
          Create an account to analyse browser extensions, track your analysis
          history and access detailed security reports.
        </p>
      </div>

      {/* Browser security illustration */}
      <div className="relative mt-5 flex w-full items-center justify-start">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-[0.05] blur-[100px]"
        />

        <img
          src={BrowserSecurity}
          alt="Browser extension protected by BrowserGuard"
          className="relative z-10 block h-auto w-full max-w-[440px] object-contain object-left"
        />
      </div>

      {/* Account benefits */}
      <div className="mt-5 flex w-full flex-col gap-4 pl-2">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-green)] bg-[rgba(0,213,27,0.08)] text-[var(--primary)]">
              <Icon size={20} aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-xs font-semibold text-[var(--text-primary)]">
                {title}
              </h3>

              <p className="mt-0.5 text-[11px] leading-5 text-[var(--text-secondary)]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RegisterShowcase;
