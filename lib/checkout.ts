import type { LocaleStrings } from "@/types/locales";

export type CheckoutField = keyof LocaleStrings["checkout"]["fields"];
export type CheckoutForm = Record<CheckoutField, string>;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export const CHECKOUT_FIELDS: CheckoutField[] = [
  "fullName",
  "email",
  "address",
  "city",
  "postalCode",
  "country",
];

export const EMPTY_CHECKOUT_FORM: CheckoutForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Loose shape check (something@something.tld); the mail provider does the real verification. */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

/** Every field is required; email must look like an address. Returns only failing fields. */
export function validateCheckout(form: CheckoutForm, strings: LocaleStrings["checkout"]): CheckoutErrors {
  const errors: CheckoutErrors = {};
  for (const field of CHECKOUT_FIELDS) {
    if (!form[field].trim()) errors[field] = strings.required;
  }
  if (!errors.email && !isValidEmail(form.email)) {
    errors.email = strings.invalidEmail;
  }
  return errors;
}

/** Placeholder order reference until a real order API issues one, e.g. "BB-7K3QX9". */
export function createOrderId(random: () => number = Math.random): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i += 1) {
    id += alphabet[Math.floor(random() * alphabet.length)];
  }
  return `BB-${id}`;
}
