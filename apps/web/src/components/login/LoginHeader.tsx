import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Logo from "../common/Logo";

function LoginHeader() {
  return (
    <header className="relative z-20 flex w-full shrink-0 items-center justify-between gap-4 py-5 sm:py-6">
      {/* Brand */}
      <Logo width={180} imageClassName="w-[145px] sm:w-[165px]" />

      {/* Back to home */}
      <Link
        to="/"
        className="inline-flex shrink-0 items-center gap-2 text-xs font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--primary)] sm:text-sm"
      >
        <FiArrowLeft size={16} aria-hidden="true" />
        <span>Back to Home</span>
      </Link>
    </header>
  );
}

export default LoginHeader;
