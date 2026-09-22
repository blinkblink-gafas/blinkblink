import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { ProductBadgeLabel } from "@/types/product";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: ProductBadgeLabel;
}

const badgeStyles: Record<ProductBadgeLabel, string> = {
  New: "bg-accent-blue text-white",
  Bestseller: "bg-primary text-ink",
  Sale: "bg-accent-pink text-white",
  Limited: "bg-accent-orange text-white",
};

/**
 * Small, bold, colored chip used to flag product state ("New",
 * "Bestseller", "Sale", "Limited"). Purely presentational.
 */
export default function Badge({ label, className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border-2 border-ink px-3 py-1 text-small font-semibold leading-none",
        badgeStyles[label],
        className
      )}
      {...rest}
    >
      {label}
    </span>
  );
}
