import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.webp";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  width?: number;
  href?: string;
}

function Logo({
  className = "",
  imageClassName = "",
  width = 180,
  href = "/",
}: LogoProps) {
  return (
    <Link
      to={href}
      className={`inline-flex shrink-0 items-center ${className}`.trim()}
      aria-label="BrowserGuard home"
    >
      <img
        src={logo}
        alt="BrowserGuard"
        width={width}
        className={`h-auto max-w-full object-contain ${imageClassName}`.trim()}
      />
    </Link>
  );
}

export default Logo;
