import { motion, useReducedMotion } from "framer-motion";
import {
  FiActivity,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiCode,
  FiFileText,
  FiLayers,
  FiSearch,
} from "react-icons/fi";

import Container from "../common/Container";
import Button from "../common/Button";

const capabilities = [
  {
    icon: FiCode,
    title: "Static Code Analysis",
    description: "Inspects extension code, manifest and permissions.",
  },
  {
    icon: FiActivity,
    title: "Dynamic Behaviour Monitoring",
    description: "Observes runtime activities in a controlled environment.",
  },
  {
    icon: FiLayers,
    title: "Hybrid Threat Detection",
    description: "Combines static and dynamic evidence for deeper analysis.",
  },
  {
    icon: FiFileText,
    title: "Explainable Security Reports",
    description: "Clear, structured findings with evidence and context.",
  },
];

const analysisStages = [
  {
    label: "Static Code Analysis",
    status: "Completed",
    state: "completed",
  },
  {
    label: "Dynamic Behaviour Monitoring",
    status: "Running...",
    state: "running",
  },
  {
    label: "Threat Analysis",
    status: "Pending",
    state: "pending",
  },
  {
    label: "Generate Report",
    status: "Pending",
    state: "pending",
  },
];

function AnalysisPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.7,
        delay: shouldReduceMotion ? 0 : 0.15,
      }}
      className="relative mx-0 w-full max-w-[520px] lg:ml-auto"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-[var(--primary)] opacity-[0.06] blur-[90px]" />

      {/* Analysis window */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-green)] bg-[#090f0b] shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
        {/* Window header */}
        <div className="flex h-11 items-center gap-3 border-b border-[var(--border)] bg-[rgba(255,255,255,0.015)] px-3 sm:px-4">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>

          <span className="min-w-0 flex-1 truncate text-center font-mono text-[9px] text-[var(--text-secondary)] sm:text-[10px]">
            BrowserGuard — Extension Analysis
          </span>
        </div>

        {/* Extension information */}
        <div className="flex items-center gap-3  p-4 sm:p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-green)] bg-[rgba(0,213,27,0.07)] text-[var(--primary)]">
            <FiCode size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[11px] font-semibold text-[var(--text-primary)]">
              sample-extension.crx
            </h3>

            <p className="mt-1 text-[9px] text-[var(--text-muted)]">
              Chrome Extension · 2.4 MB
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-[rgba(0,213,27,0.18)] bg-[rgba(0,213,27,0.08)] px-2.5 py-1.5 font-mono text-[9px] text-[var(--primary)]">
            Analysing...
          </span>
        </div>

        {/* Analysis stages */}
        <div className="space-y-0 px-4 sm:px-5">
          {analysisStages.map((stage, index) => (
            <div
              key={stage.label}
              className="flex min-h-[39px] items-center gap-3 border-b border-[rgba(111,160,117,0.09)]"
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  stage.state === "completed"
                    ? "bg-[var(--primary)] text-[#031006]"
                    : stage.state === "running"
                      ? "border border-[var(--primary)]"
                      : "bg-[#26332a] text-[#84968a]"
                }`}
              >
                {stage.state === "completed" ? (
                  <FiCheck size={10} />
                ) : stage.state === "running" ? (
                  <span className="h-2 w-2 animate-spin rounded-full border border-[var(--primary)] border-t-transparent" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-current" />
                )}
              </div>

              <span
                className={`min-w-0 flex-1 truncate text-[10px] ${
                  stage.state === "pending"
                    ? "text-[var(--text-muted)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                {stage.label}
              </span>

              <span
                className={`shrink-0 font-mono text-[9px] ${
                  stage.state === "completed"
                    ? "text-[var(--primary)]"
                    : stage.state === "running"
                      ? "text-[var(--primary-light)]"
                      : "text-[var(--text-muted)]"
                }`}
              >
                {stage.status}
              </span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#1a281d]">
            <motion.div
              initial={shouldReduceMotion ? false : { width: 0 }}
              animate={{ width: "56%" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.4,
                delay: shouldReduceMotion ? 0 : 0.5,
              }}
              className="h-full rounded-full bg-[var(--primary)] shadow-[0_0_12px_rgba(0,213,27,0.35)]"
            />
          </div>

          <span className="font-mono text-[10px] font-semibold text-[var(--text-primary)]">
            56%
          </span>
        </div>
      </div>

      {/* Decorative background grid */}
      <div className="pointer-events-none absolute -right-5 top-8 -z-10 hidden h-40 w-40 opacity-20 sm:block">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(var(--primary) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
      </div>
    </motion.div>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--border)]">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -right-40 -top-20 -z-10 h-[450px] w-[450px] rounded-full bg-[var(--primary)] opacity-[0.055] blur-[140px]" />

      <Container>
        <div className="grid items-center gap-12 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-14 lg:pt-20">
          {/* Hero content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="max-w-[620px]"
          >
            {/* Heading */}
            <h1 className="text-[clamp(2.35rem,5vw,3.9rem)] font-semibold leading-[1.13] tracking-[-0.045em] text-[var(--text-primary)]">
              Know What Your Browser Extensions Are{" "}
              <span className="text-[var(--primary-light)]">Really Doing.</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[510px] text-[13px] leading-[1.8] text-[var(--text-secondary)] sm:text-sm">
              Analyse browser extensions using both static code analysis and
              dynamic behaviour monitoring to understand their permissions,
              code, and real-world activities.
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/register" size="lg">
                <FiSearch aria-hidden="true" />
                Analyse an Extension
                <FiArrowUpRight aria-hidden="true" />
              </Button>

              <Button href="/how-it-works" variant="outline" size="lg">
                <FiArrowRight aria-hidden="true" />
                Explore How It Works
              </Button>
            </div>
          </motion.div>

          {/* Analysis preview */}
          <AnalysisPreview />
        </div>

        {/* Capability strip */}
        <div className="grid grid-cols-1 border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className={`flex gap-3 py-5 sm:px-4 lg:px-3 lg:py-6 ${
                  index > 0
                    ? "border-t border-[var(--border)] sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,213,27,0.08)] text-[var(--primary)]">
                  <Icon size={19} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[11px] font-semibold leading-5 text-[var(--text-primary)] sm:text-xs">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-[1.6] text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Hero;
