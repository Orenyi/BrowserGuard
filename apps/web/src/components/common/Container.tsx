import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide" | "narrow";
}

const sizeStyles = {
  default: "max-w-[1380px]",
  wide: "max-w-[1440px]",
  narrow: "max-w-[960px]",
};

function Container({
  children,
  size = "default",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
