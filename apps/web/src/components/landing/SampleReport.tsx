import { motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiCode, FiFileText, FiShield } from "react-icons/fi";

import Container from "../common/Container";

const findings = [
  {
    severity: "High",
    description: "Reads browsing data without clear need",
    color: "text-[var(--high)]",
    dot: "bg-[var(--high)]",
  },
  {
    severity: "Medium",
    description: "Communicates with external domain",
    color: "text-[var(--medium)]",
    dot: "bg-[var(--medium)]",
  },
  {
    severity: "Low",
    description: "Uses broad host permissions",
    color: "text-[var(--low)]",
    dot: "bg-[var(--low)]",
  },
];

function SampleReport() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className=" py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* Introduction */}
          <div className="max-w-[410px]">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-[19px] bg-[var(--primary)]" />
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.17em] text-[var(--primary)]">
                Sample Report
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[28px]">
              A clear, evidence-based security report.
            </h2>

            <p className="mt-4 text-[11px] leading-6 text-[var(--text-secondary)] sm:text-xs">
              Review key results from a sample analysis, including risk score,
              findings and the status of both static and dynamic analysis.
            </p>
          </div>

          {/* Report preview */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="min-w-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[#090f0b] shadow-[0_18px_55px_rgba(0,0,0,0.3)]"
          >
            {/* Report header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-3 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,213,27,0.09)] text-[var(--primary)]">
                  <FiCode size={18} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-[11px] font-semibold text-[var(--text-primary)]">
                    Sample Extension
                  </h3>

                  <p className="mt-1 truncate font-mono text-[9px] text-[var(--text-muted)]">
                    com.example.sample · v1.2.0
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                <span className="text-[9px] text-[var(--text-muted)]">
                  Risk Score
                </span>
                <span className="font-mono text-xl font-semibold text-[var(--medium)]">
                  72
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">
                  /100
                </span>
              </div>
            </div>

            {/* Report body */}
            <div className="grid gap-3 p-3 sm:grid-cols-[0.8fr_1.2fr] sm:p-4">
              {/* Analysis status */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                <h4 className="mb-3 text-[10px] font-semibold text-[var(--text-primary)]">
                  Analysis Status
                </h4>

                <div className="space-y-3">
                  {["Static Analysis", "Dynamic Analysis"].map((item) => (
                    <div
                      key={item}
                      className="flex flex-wrap items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--primary)] text-[#031006]">
                          <FiCheck size={9} />
                        </span>

                        <span className="text-[9px] text-[var(--text-secondary)]">
                          {item}
                        </span>
                      </div>

                      <span className="rounded-full bg-[rgba(0,213,27,0.1)] px-2 py-1 font-mono text-[8px] text-[var(--primary)]">
                        Completed
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Findings */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-[10px] font-semibold text-[var(--text-primary)]">
                    Findings ({findings.length})
                  </h4>

                  <FiFileText size={13} className="text-[var(--text-muted)]" />
                </div>

                <div className="space-y-3">
                  {findings.map((finding) => (
                    <div
                      key={finding.severity}
                      className="grid grid-cols-[62px_1fr] items-start gap-2"
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-[8px] ${finding.color}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${finding.dot}`}
                        />
                        {finding.severity}
                      </span>

                      <p className="text-[9px] leading-[1.5] text-[var(--text-secondary)]">
                        {finding.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview note */}
            <div className="flex items-center gap-2 border-t border-[var(--border)] px-3 py-2.5 sm:px-4">
              <FiShield size={12} className="shrink-0 text-[var(--primary)]" />
              <span className="text-[9px] text-[var(--text-muted)]">
                Illustrative report preview · Example findings and score
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default SampleReport;
