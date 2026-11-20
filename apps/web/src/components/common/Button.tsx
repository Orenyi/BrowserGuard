import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

type NavigationButtonProps = BaseProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href"
  > & {
    href: string;
  };

type ButtonProps = NativeButtonProps | NavigationButtonProps;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition-all duration-normal ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-[#031006] hover:border-primary-light hover:bg-primary-light hover:shadow-green",

  outline:
    "border-primary bg-transparent text-primary-light hover:bg-primary-soft hover:shadow-green",

  ghost:
    "border-transparent bg-transparent text-content-secondary hover:bg-surface-hover hover:text-content-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 py-2 text-xs",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-[50px] px-6 py-3 text-sm",
};

function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
  } = props;

  // Build shared styles using component-only props.
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Navigation button: internal or external.
  if (typeof props.href === "string") {
    const {
      href,
      target,
      rel,
      onClick,
      variant: _variant,
      size: _size,
      fullWidth: _fullWidth,
      className: _className,
      children: _children,
      ...anchorProps
    } = props;

    const isExternal =
      /^(https?:\/\/|mailto:|tel:)/i.test(href) || target === "_blank";

    // External navigation.
    if (isExternal) {
      return (
        <a
          {...anchorProps}
          href={href}
          target={target}
          rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
          onClick={onClick}
          className={classes}
        >
          {children}
        </a>
      );
    }

    // Internal React Router navigation.
    return (
      <Link
        {...anchorProps}
        to={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  // Native HTML button.
  const {
    variant: _variant,
    size: _size,
    fullWidth: _fullWidth,
    className: _className,
    children: _children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  );
}

export default Button;
