import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { ProductBadgeLabel } from "@/types/product";
import { formatTranslation, useTranslation } from "@/lib/i18n";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  (
    | { label: ProductBadgeLabel; discountPercent?: never }
    /** Renders "-20%" in sale pink. */
    | { discountPercent: number; label?: never }
  );

const badgeStyles: Record<ProductBadgeLabel, string> = {
  New: "bg-accent-blue text-white",
  Bestseller: "bg-primary text-ink",
  Sale: "bg-accent-pink text-white",
  Limited: "bg-accent-orange text-white",
};

/** Small colored chip for product state ("New", "Bestseller"…) or a discount ("-20%"). */
export default function Badge({ label, discountPercent, className, ...rest }: BadgeProps) {
  const t = useTranslation();
  const isDiscount = discountPercent !== undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-bold leading-none",
        isDiscount ? "bg-accent-pink text-white" : badgeStyles[label],
        className
      )}
      {...rest}
    >
      {isDiscount ? formatTranslation(t.common.discount, { percent: discountPercent }) : t.productBadges[label]}
    </span>
  );
}
