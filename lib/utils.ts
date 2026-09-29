import { storeConfig } from "@/lib/storeConfig";

/**
 * Formats a price, e.g. formatPrice(39) -> "€39", formatPrice(39.5) -> "€39.50".
 * Whole amounts drop the ".00" to keep product cards clean.
 */
export function formatPrice(amount: number, currency: string = storeConfig.currency): string {
  const isWhole = Number.isInteger(amount);
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Whole-number percentage saved versus the MRP, or null when not discounted. */
export function discountPercent(price: number, mrp?: number): number | null {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Joins class names, skipping falsy values. Small local substitute for
 * libraries like `clsx` so we don't add an extra dependency for this.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
