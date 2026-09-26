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

/**
 * Turns a URL slug ("blue-light", "all") into a display label ("Blue Light",
 * "All"). Used for category page headings/titles until real category copy
 * (with its own translated name) replaces slug-based routing.
 */
export function prettifyLabel(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
