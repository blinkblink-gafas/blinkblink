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
  // Primary: black bg, white text — Add to Cart, Shop Now
  primary: "bg-ink text-white hover:bg-ink/85",
  // Secondary: yellow bg, black text — Buy Now, Explore Collection
  secondary: "bg-primary text-ink hover:brightness-95",
  // Accent: pink bg, white text
  accent: "bg-accent-pink text-white hover:bg-accent-pink/90",
  // Ghost: white bg, hairline outline
  ghost: "bg-white text-ink ring-1 ring-inset ring-ink/15 hover:bg-surface",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-small px-4 py-2 gap-1.5",
  md: "text-body px-6 py-3 gap-2",
  lg: "text-body px-8 py-4 gap-2.5",
};

/** Pill-shaped button used across the site. */
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
      "inline-flex items-center justify-center rounded-pill font-semibold transition-all",
      "active:scale-[0.98]",
      "disabled:pointer-events-none disabled:opacity-50",
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
