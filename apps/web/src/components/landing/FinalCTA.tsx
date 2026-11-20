import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiShield } from "react-icons/fi";

import Container from "../common/Container";
import Button from "../common/Button";

function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className=" py-8 sm:py-10">
      <Container>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="relative isolate overflow-hidden rounded-xl border border-[var(--primary-dark)] bg-[rgba(0,213,27,0.075)] px-5 py-6 sm:px-7 sm:py-7"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute -bottom-20 right-10 -z-10 h-48 w-48 rounded-full bg-[var(--primary)] opacity-[0.1] blur-[65px]" />

          <div
            className="pointer-events-none absolute bottom-0 right-0 -z-10 h-full w-1/2 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(var(--primary) 1px, transparent 1px)",
              backgroundSize: "9px 9px",
              maskImage:
                "radial-gradient(ellipse at bottom right, black, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at bottom right, black, transparent 75%)",
            }}
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            {/* CTA content */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[var(--primary)]">
                <FiShield size={32} strokeWidth={1.7} />
              </div>

              <div>
                <h2 className="text-sm font-semibold leading-6 text-[var(--text-primary)] sm:text-base">
                  Take Control of Your Browser Extension Security.
                </h2>

                <p className="mt-1 text-[10px] leading-5 text-[var(--text-secondary)] sm:text-xs">
                  Create an account to analyse extensions, track reports and
                  explore deeper insights.
                </p>
              </div>
            </div>

            {/* CTA button */}
            <div className="shrink-0 sm:pl-4">
              <Button href="/register" size="md" fullWidth>
                Create Account
                <FiArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FinalCTA;
