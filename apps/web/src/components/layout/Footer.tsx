import { FiShield, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import Logo from "../common/Logo";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/", external: false },
      { label: "Features", href: "/features", external: false },
      { label: "How It Works", href: "/how-it-works", external: false },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "User Guide", href: "/documentation", external: false },
      { label: "Analysis Methods", href: "/analysis-methods", external: false },
      { label: "Report Guide", href: "/report-guide", external: false },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About BrowserGuard", href: "/about", external: false },
      { label: "Research", href: "/research", external: false },
      {
        label: "Contact",
        href: "mailto:contact@browserguard.dev",
        external: true,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", external: false },
      { label: "Terms of Service", href: "/terms", external: false },
    ],
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-[var(--primary)] opacity-[0.035] blur-[100px]" />

      <Container>
        {/* Main footer */}
        <div className="relative grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-10 lg:py-14">
          {/* Brand column */}
          <div className="col-span-2 max-w-[320px] sm:col-span-3 lg:col-span-1">
            <Logo width={155} imageClassName="w-[145px] sm:w-[155px]" />

            <p className="mt-5 max-w-[280px] text-xs leading-6 text-[var(--text-muted)]">
              Browser extension threat detection and behavioural analysis
              platform.
            </p>

            {/* Security note */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <FiShield
                size={15}
                className="shrink-0 text-[var(--primary)]"
                aria-hidden="true"
              />

              <span className="text-[11px] text-[var(--text-secondary)]">
                Built with security in mind.
              </span>
            </div>
          </div>

          {/* Footer navigation groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-xs font-semibold text-[var(--text-primary)]">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--primary-light)]"
                      >
                        {link.label}
                        <FiArrowUpRight
                          size={11}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--primary-light)]"
                      >
                        {link.label}
                        <FiArrowUpRight
                          size={11}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom */}
        <div className="relative flex flex-col gap-3 border-t border-[var(--border)] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[var(--text-muted)]">
            © {currentYear} BrowserGuard. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />

            <span className="font-mono text-[9px] tracking-[0.12em] text-[var(--text-muted)]">
              SECURITY ANALYSIS PLATFORM
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
