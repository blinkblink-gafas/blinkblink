import { describe, expect, it } from "vitest";
import { EMPTY_CHECKOUT_FORM, createOrderId, validateCheckout } from "@/lib/checkout";
import en from "../locales/en.json";

const strings = en.checkout;
const valid = {
  fullName: "Test Customer",
  email: "test@example.com",
  address: "1 Test Street",
  city: "Testville",
  postalCode: "00000",
  country: "Testland",
};

describe("validateCheckout", () => {
  it("passes a complete form", () => {
    expect(validateCheckout(valid, strings)).toEqual({});
  });

  it("requires every field, ignoring whitespace-only values", () => {
    const errors = validateCheckout({ ...EMPTY_CHECKOUT_FORM, city: "   " }, strings);
    expect(Object.keys(errors).sort()).toEqual(
      ["address", "city", "country", "email", "fullName", "postalCode"].sort()
    );
    expect(errors.city).toBe(strings.required);
  });

  it("rejects a malformed email", () => {
    expect(validateCheckout({ ...valid, email: "not-an-email" }, strings)).toEqual({
      email: strings.invalidEmail,
    });
  });
});

describe("createOrderId", () => {
  it("formats a BB- prefixed 6-character reference", () => {
    expect(createOrderId()).toMatch(/^BB-[A-Z2-9]{6}$/);
    expect(createOrderId(() => 0)).toBe("BB-AAAAAA");
  });
});
