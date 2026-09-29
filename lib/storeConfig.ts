/**
 * Store policies shown around the site (product page, cart, trust badges).
 * These values are PLACEHOLDERS — confirm them before launch, since they
 * are promises to customers.
 */
export const storeConfig = {
  currency: "EUR",
  /** Orders at or above this subtotal ship free. */
  freeShippingThreshold: 50,
  /** Days a customer has to return an order. */
  returnDays: 30,
  /** Products shown per page on category listings. */
  productsPerPage: 9,
} as const;
