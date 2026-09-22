import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  /** Applies the Button styles to one child, such as a Next.js Link. */
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  // Primary: black bg, yellow text
  primary: "bg-ink text-primary hover:bg-ink/90",
  // Secondary: yellow bg, black text
  secondary: "bg-primary text-ink hover:bg-primary/90",
  // Accent: pink bg, white text
  accent: "bg-accent-pink text-white hover:bg-accent-pink/90",
  // Ghost: white bg, black outline
  ghost: "bg-white text-ink hover:bg-surface",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-small px-4 py-2 gap-1.5",
  md: "text-body px-6 py-3 gap-2",
  lg: "text-h3 px-8 py-4 gap-2.5",
};

/**
 * Bold, pill-shaped button used across the site. Every variant keeps the
 * thick ink border + hard "comic" shadow so buttons read as part of the
 * comic-book/streetwear system, not a generic rounded button.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      asChild = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const buttonClassName = cn(
      "inline-flex items-center justify-center font-semibold rounded-pill border-3 border-ink shadow-comic-sm transition-all",
      "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic",
      "active:translate-x-0 active:translate-y-0 active:shadow-none",
      "disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );
    const withIcons = (contentChildren: ReactNode) => <>{icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}{contentChildren}{icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}</>;

    if (asChild && isValidElement<{ className?: string; children?: ReactNode }>(children)) {
      return cloneElement(children, { className: cn(buttonClassName, children.props.className), ...rest }, withIcons(children.props.children));
    }

    return <button ref={ref} className={buttonClassName} {...rest}>{withIcons(children)}</button>;
  }
);

Button.displayName = "Button";

export default Button;
