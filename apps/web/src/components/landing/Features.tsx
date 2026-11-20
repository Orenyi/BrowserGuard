import { motion, useReducedMotion } from "framer-motion";
import {
  FiShield,
  FiCode,
  FiGlobe,
  FiActivity,
  FiLayers,
  FiFileText,
} from "react-icons/fi";

import Container from "../common/Container";

const features = [
  {
    icon: FiShield,
    title: "Permission inspection",
    description:
      "Examine requested permissions and identify access that may exceed an extension's stated functionality.",
  },
  {
    icon: FiCode,
    title: "JavaScript threat detection",
    description:
      "Inspect source code for suspicious execution patterns, script injection and potentially unsafe functions.",
  },
  {
    icon: FiGlobe,
    title: "Network activity monitoring",
    description:
      "Observe external requests and identify unexpected communication during controlled execution.",
  },
  {
    icon: FiActivity,
    title: "Behavioural analysis",
    description:
      "Monitor selected runtime activities to understand what an extension actually does when executed.",
  },
  {
    icon: FiLayers,
    title: "Risk scoring",
    description:
      "Combine available evidence into a transparent risk score with severity indicators.",
  },
  {
    icon: FiFileText,
    title: "Detailed reports",
    description:
      "Review findings, supporting evidence, potential impact and recommendations in one report.",
  },
];

function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-14 sm:py-16 lg:py-18" id="features">
      <Container>
        <div className="mb-7 max-w-[510px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-[19px] bg-[var(--primary)]" />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.17em] text-[var(--primary)]">
              Core Features
            </span>
          </div>

          <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[28px]">
            Comprehensive analysis for safer browser extensions.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                }}
                className="group flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors duration-300 hover:border-[var(--border-green)] sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,213,27,0.08)] text-[var(--primary)] transition-transform duration-300 group-hover:scale-105">
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[11px] font-semibold leading-5 text-[var(--text-primary)] sm:text-xs">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-[10px] leading-[1.65] text-[var(--text-secondary)] sm:text-[11px]">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Features;
