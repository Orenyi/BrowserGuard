import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiCode,
  FiFileText,
  FiUploadCloud,
  FiActivity,
} from "react-icons/fi";

import Container from "../common/Container";

const steps = [
  {
    number: "01",
    title: "Upload extension",
    description:
      "Submit a Chrome extension package (.crx or .zip) for analysis.",
    icon: FiUploadCloud,
  },
  {
    number: "02",
    title: "Analyse source code",
    description:
      "Inspect the manifest, permissions and JavaScript for suspicious patterns.",
    icon: FiCode,
  },
  {
    number: "03",
    title: "Monitor runtime behaviour",
    description:
      "Execute the extension in an isolated environment and observe its activities.",
    icon: FiActivity,
  },
  {
    number: "04",
    title: "Generate security report",
    description:
      "Combine the findings into a structured, explainable report with risk assessment.",
    icon: FiFileText,
  },
];

function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden  py-14 sm:py-16 lg:py-20"
      id="how-it-works"
    >
      <Container>
        {/* Section heading */}
        <div className="mb-9 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[440px]">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-[19px] bg-[var(--primary)]" />

              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.17em] text-[var(--primary)]">
                How It Works
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[28px]">
              A simple, transparent analysis process.
            </h2>
          </div>

          <p className="max-w-[440px] text-xs leading-6 text-[var(--text-secondary)] sm:text-[13px]">
            From upload to report, BrowserGuard analyses an extension using
            complementary techniques to provide clear and actionable security
            insights.
          </p>
        </div>

        {/* Process cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <motion.article
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                  }}
                  className="group relative flex h-full min-h-[178px] flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:border-[var(--border-green)] hover:bg-[rgba(0,213,27,0.025)] lg:mx-3"
                >
                  {/* Card number */}
                  <span className="absolute right-4 top-4 font-mono text-[10px] font-medium text-[var(--text-secondary)]">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--primary)] transition-all duration-300 group-hover:bg-[rgba(0,213,27,0.08)]">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <h3 className="text-xs font-semibold text-[var(--text-primary)] sm:text-[13px]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-[10px] leading-[1.7] text-[var(--text-secondary)] sm:text-[11px]">
                      {step.description}
                    </p>
                  </div>
                </motion.article>

                {/* Desktop connector */}
                {index !== steps.length - 1 && (
                  <div className="pointer-events-none absolute -right-[10px] top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center text-[var(--primary)] lg:flex">
                    <FiArrowRight size={20} strokeWidth={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
