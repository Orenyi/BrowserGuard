import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";
import Logo from "../common/Logo";

const navigationLinks = [
  { label: "How It Works", to: "/#how-it-works", type: "section" },
  { label: "Features", to: "/#features", type: "section" },
  { label: "Why Us", to: "/#why-us", type: "section" },
  { label: "Dashboard", to: "/dashboard", type: "page" },
] as const;

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.065,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    x: -14,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  // Close the menu whenever the route or hash changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close the menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // Prevent background scrolling while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Scroll to homepage sections after navigation.
  useEffect(() => {
    if (!location.hash) {
      if (location.pathname === "/") {
        window.scrollTo({
          top: 0,
          behavior: shouldReduceMotion ? "auto" : "smooth",
        });
      }

      return;
    }

    const sectionId = decodeURIComponent(location.hash.slice(1));

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash, shouldReduceMotion]);

  // Navigate to homepage sections from any page.
  const handleSectionNavigation = (to: string) => {
    closeMenu();

    if (location.pathname === "/") {
      const sectionId = to.split("#")[1];

      if (sectionId) {
        navigate(`/#${sectionId}`);
      }

      return;
    }

    navigate(to);
  };

  const transitionDuration = shouldReduceMotion ? 0 : undefined;

  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--border)] bg-[rgba(7,10,8,0.94)] backdrop-blur-xl">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-[68px] items-center justify-between gap-6 lg:h-[76px]"
        >
          {/* Brand */}
          <Logo
            width={150}
            imageClassName="w-[132px] sm:w-[145px] lg:w-[155px]"
          />

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            {navigationLinks.map((link) => {
              if (link.type === "section") {
                const sectionId = link.to.split("#")[1];

                const active =
                  location.pathname === "/" &&
                  location.hash === `#${sectionId}`;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={active ? "location" : undefined}
                    className={`group relative py-2 text-[13px] font-medium transition-colors duration-200 ${
                      active
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}

                    <span
                      className={`absolute -bottom-[2px] left-0 h-[2px] rounded-full bg-[var(--primary)] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative py-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}

                      <span
                        className={`absolute -bottom-[2px] left-0 h-[2px] rounded-full bg-[var(--primary)] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop authentication actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/login" variant="outline" size="sm">
              Login
            </Button>

            <Button href="/register" size="sm">
              Get Started
              <FiArrowUpRight aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile / tablet menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--border-green)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, rotate: -45, scale: 0.75 }
                }
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.75 }}
                transition={{
                  duration: transitionDuration ?? 0.16,
                }}
              >
                {menuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </Container>

      {/* Mobile / tablet full-screen navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: transitionDuration ?? 0.2,
              }}
              className="fixed inset-0 z-[105] cursor-default bg-black/70 backdrop-blur-sm lg:hidden"
            />

            {/* Full-screen menu panel */}
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
              className="fixed inset-0 z-[110] flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-[var(--bg)] lg:hidden"
            >
              {/* Menu header */}
              <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[var(--border)] px-5 sm:px-8">
                <Logo width={150} imageClassName="w-[132px] sm:w-[145px]" />

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-green)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                >
                  <FiX size={21} />
                </button>
              </div>

              {/* Menu content */}
              <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
                <nav aria-label="Mobile navigation" className="flex-1">
                  <div className="border-t border-[var(--border)]">
                    {navigationLinks.map((link, index) => {
                      const active =
                        link.type === "section"
                          ? location.pathname === "/" &&
                            location.hash === `#${link.to.split("#")[1]}`
                          : location.pathname === link.to;

                      return (
                        <motion.div
                          key={link.to}
                          variants={
                            shouldReduceMotion ? undefined : linkVariants
                          }
                        >
                          {link.type === "section" ? (
                            <button
                              type="button"
                              onClick={() => handleSectionNavigation(link.to)}
                              className="group flex min-h-[76px] w-full items-center justify-between gap-4 border-b border-[var(--border)] py-4 text-left sm:min-h-[86px]"
                            >
                              <div className="flex items-center gap-5">
                                <span
                                  className={`font-mono text-[11px] ${
                                    active
                                      ? "text-[var(--primary)]"
                                      : "text-[var(--text-muted)]"
                                  }`}
                                >
                                  {String(index + 1).padStart(2, "0")}
                                </span>

                                <span
                                  className={`text-xl font-medium tracking-tight transition-colors sm:text-2xl ${
                                    active
                                      ? "text-[var(--text-primary)]"
                                      : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                                  }`}
                                >
                                  {link.label}
                                </span>
                              </div>

                              <FiArrowUpRight
                                size={19}
                                className="text-[var(--text-muted)] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                              />
                            </button>
                          ) : (
                            <NavLink
                              to={link.to}
                              onClick={closeMenu}
                              className="group flex min-h-[76px] items-center justify-between gap-4 border-b border-[var(--border)] py-4 sm:min-h-[86px]"
                            >
                              {({ isActive }) => (
                                <>
                                  <div className="flex items-center gap-5">
                                    <span
                                      className={`font-mono text-[11px] ${
                                        isActive
                                          ? "text-[var(--primary)]"
                                          : "text-[var(--text-muted)]"
                                      }`}
                                    >
                                      {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span
                                      className={`text-xl font-medium tracking-tight transition-colors sm:text-2xl ${
                                        isActive
                                          ? "text-[var(--text-primary)]"
                                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                                      }`}
                                    >
                                      {link.label}
                                    </span>
                                  </div>

                                  <FiArrowUpRight
                                    size={19}
                                    className={`transition-all group-hover:-translate-y-1 group-hover:translate-x-1 ${
                                      isActive
                                        ? "text-[var(--primary)]"
                                        : "text-[var(--text-muted)] group-hover:text-[var(--primary)]"
                                    }`}
                                  />
                                </>
                              )}
                            </NavLink>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Full-width authentication actions */}
                <motion.div
                  variants={shouldReduceMotion ? undefined : linkVariants}
                  className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-7"
                >
                  <Button
                    href="/login"
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={closeMenu}
                  >
                    Login
                  </Button>

                  <Button
                    href="/register"
                    size="lg"
                    fullWidth
                    onClick={closeMenu}
                  >
                    Get Started
                    <FiArrowUpRight aria-hidden="true" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
