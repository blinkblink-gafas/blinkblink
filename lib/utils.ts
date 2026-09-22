/**
 * Formats a number as a price string, e.g. formatPrice(49.99, "USD") -> "$49.99"
 */
export function formatPrice(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Joins class names, skipping falsy values. Small local substitute for
 * libraries like `clsx` so we don't add an extra dependency for this.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
