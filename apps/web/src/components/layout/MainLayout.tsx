import type { ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Accessibility: Skip navigation */}
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-[var(--primary)] px-5 py-3 font-medium text-[#031006] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
      >
        Skip to content
      </a>

      {/* Shared navigation */}
      <Navbar />

      {/* Page content */}
      <main
        id="main-content"
        className="min-w-0 flex-1 outline-none"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Shared footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
