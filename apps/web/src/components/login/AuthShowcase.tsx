import { FiActivity, FiCode, FiLayers } from "react-icons/fi";

import BrowserSecurity from "../../assets/images/BrowserSecurity.webp";

const highlights = [
  {
    icon: FiCode,
    label: "Static Analysis",
  },
  {
    icon: FiActivity,
    label: "Dynamic Analysis",
  },
  {
    icon: FiLayers,
    label: "Security Reports",
  },
];

function AuthShowcase() {
  return (
    <section className="relative flex w-full flex-col items-start justify-start py-0 lg:justify-center lg:py-5">
      {/* BrowserGuard illustration — visible on all devices */}
      <div className="relative flex w-full items-start justify-start lg:items-center lg:justify-start">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-[0.045] blur-[90px] sm:h-56 sm:w-56 lg:left-1/2 lg:-translate-x-1/2"
        />

        <img
          src={BrowserSecurity}
          alt="Browser extension protected by BrowserGuard"
          className="relative z-10 block h-auto w-full max-w-[340px] object-contain object-left sm:max-w-[390px] lg:max-h-[340px] lg:max-w-[560px] lg:object-center xl:max-h-[390px]"
        />
      </div>

      {/* Full brand showcase — desktop only */}
      <div className="mt-6 hidden w-full max-w-[570px] lg:block">
        <h1 className="text-[clamp(2.3rem,4vw,3.65rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--text-primary)]">
          Analyse Browser
          <br />
          Extensions with
          <br />
          <span className="text-[var(--primary-light)]">Confidence.</span>
        </h1>

        <p className="mt-5 max-w-[520px] text-sm leading-[1.75] text-[var(--text-secondary)] xl:text-base xl:leading-[1.8]">
          Detect suspicious behaviour, inspect permissions and get clear,
          evidence-based security insights.
        </p>

        {/* Capability highlights */}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 xl:gap-x-7">
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon
                size={23}
                aria-hidden="true"
                className="shrink-0 text-[var(--primary)]"
              />

              <span className="whitespace-nowrap text-xs font-medium text-[var(--text-primary)] xl:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AuthShowcase;
