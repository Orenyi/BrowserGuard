import { motion, useReducedMotion } from "framer-motion";
import { FiActivity, FiBookOpen, FiLayers, FiShield } from "react-icons/fi";

import Container from "../common/Container";

const principles = [
  {
    icon: FiActivity,
    title: "Evidence-based findings",
    description: "Insights backed by code analysis and observed behaviour.",
  },
  {
    icon: FiLayers,
    title: "Transparent detection methodology",
    description: "A clear and explainable analysis process.",
  },
  {
    icon: FiShield,
    title: "Security-focused analysis",
    description: "Designed to surface meaningful security and privacy risks.",
  },
  {
    icon: FiBookOpen,
    title: "Research-oriented framework",
    description:
      "Built for cybersecurity research, learning and real-world analysis.",
  },
];

function TrustSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-12 sm:py-14" id="why-us">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-10">
          {/* Heading */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-[19px] bg-[var(--primary)]" />
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.17em] text-[var(--primary)]">
                Why BrowserGuard?
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[27px]">
              A research-driven approach to extension security.
            </h2>
          </div>

          {/* Principles */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 sm:gap-5">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <motion.div
                  key={principle.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.07,
                  }}
                >
                  <Icon
                    size={19}
                    className="mb-3 text-[var(--primary)]"
                    strokeWidth={1.8}
                  />

                  <h3 className="text-[10px] font-semibold leading-[1.5] text-[var(--text-primary)] sm:text-[11px]">
                    {principle.title}
                  </h3>

                  <p className="mt-1.5 text-[9px] leading-[1.6] text-[var(--text-muted)] sm:text-[10px]">
                    {principle.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TrustSection;
