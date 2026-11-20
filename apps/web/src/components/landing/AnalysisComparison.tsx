import { motion, useReducedMotion } from "framer-motion";
import { FiActivity, FiCheck, FiCode, FiLayers, FiPlus } from "react-icons/fi";

import Container from "../common/Container";

const analysisTypes = [
  {
    title: "Static Analysis",
    description:
      "Analyses the extension's source code, manifest and permissions without executing it.",
    icon: FiCode,
    benefits: [
      "Reveals risky code patterns",
      "Identifies excessive permissions",
      "Fast and comprehensive",
    ],
  },
  {
    title: "Dynamic Analysis",
    description:
      "Runs the extension in a controlled environment to observe its runtime behaviour.",
    icon: FiActivity,
    benefits: [
      "Observes real activities",
      "Captures network requests",
      "Uncovers behaviour not obvious from code alone",
    ],
  },
];

function AnalysisComparison() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className=" py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
          {/* Introduction */}
          <div className="max-w-[450px]">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-[19px] bg-[var(--primary)]" />
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.17em] text-[var(--primary)]">
                Static vs Dynamic Analysis
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[28px]">
              Two complementary perspectives, a clearer picture.
            </h2>

            <p className="mt-4 text-[11px] leading-6 text-[var(--text-secondary)] sm:text-xs">
              BrowserGuard uses both static and dynamic analysis to understand
              an extension's intent, code and real-world behaviour.
            </p>
          </div>

          {/* Comparison cards */}
          <div className="relative grid gap-5 sm:grid-cols-2 sm:gap-6">
            {analysisTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.1,
                  }}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,213,27,0.08)] text-[var(--primary)]">
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-[10px] leading-[1.6] text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {item.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-[10px] leading-[1.5] text-[var(--text-secondary)]"
                      >
                        <FiCheck
                          size={13}
                          className="mt-0.5 shrink-0 text-[var(--primary)]"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}

            {/* Desktop combination indicator */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-green)] bg-[var(--bg)] text-[var(--primary)] sm:flex">
              <FiPlus size={17} />
            </div>
          </div>
        </div>

        {/* Combined analysis banner */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mt-6 flex flex-col gap-3 rounded-xl border border-[var(--primary-dark)] bg-[rgba(0,213,27,0.075)] p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-green)] bg-[rgba(0,213,27,0.1)] text-[var(--primary)]">
            <FiLayers size={21} />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[var(--text-primary)]">
              Combined analysis provides additional evidence
            </h3>

            <p className="mt-1 text-[10px] leading-[1.6] text-[var(--text-secondary)] sm:text-[11px]">
              By combining code inspection and runtime observation, BrowserGuard
              builds a more complete and reliable understanding of an
              extension's behaviour.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AnalysisComparison;
