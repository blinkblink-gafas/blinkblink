import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Info } from "lucide-react";
import Seo from "@/components/layout/Seo";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCart,
  selectCartHydrated,
  selectCartItems,
  selectCartTotalPrice,
} from "@/store/slices/cartSlice";
import {
  CHECKOUT_FIELDS,
  EMPTY_CHECKOUT_FORM,
  createOrderId,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutField,
  type CheckoutForm,
} from "@/lib/checkout";
import { useTranslation } from "@/lib/i18n";
import { cn, formatPrice } from "@/lib/utils";

const FIELD_INPUT: Record<CheckoutField, { type: string; autoComplete: string }> = {
  fullName: { type: "text", autoComplete: "name" },
  email: { type: "email", autoComplete: "email" },
  address: { type: "text", autoComplete: "street-address" },
  city: { type: "text", autoComplete: "address-level2" },
  postalCode: { type: "text", autoComplete: "postal-code" },
  country: { type: "text", autoComplete: "country-name" },
};

const CONTACT_FIELDS: CheckoutField[] = ["fullName", "email"];
const SHIPPING_FIELDS = CHECKOUT_FIELDS.filter((field) => !CONTACT_FIELDS.includes(field));

/**
 * Checkout stub: validates contact + shipping details and places a mock
 * order (clears the cart, shows a confirmation). No payment is taken — a
 * payment provider plugs in at `handleSubmit` once the backend exists.
 */
const CheckoutPage: NextPage = () => {
  const t = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const hydrated = useAppSelector(selectCartHydrated);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const [form, setForm] = useState<CheckoutForm>(EMPTY_CHECKOUT_FORM);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: CheckoutField) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateCheckout(form, t.checkout);
    setErrors(nextErrors);

    const firstInvalid = CHECKOUT_FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    const orderId = createOrderId();
    await router.replace({ pathname: "/checkout/success", query: { order: orderId } });
    dispatch(clearCart());
  };

  const renderField = (field: CheckoutField) => {
    const id = `checkout-${field}`;
    const error = errors[field];
    return (
      <div key={field} className={cn("flex flex-col gap-1", field === "address" && "sm:col-span-2")}>
        <label htmlFor={id} className="text-small font-semibold">
          {t.checkout.fields[field]}
        </label>
        <input
          id={id}
          name={field}
          {...FIELD_INPUT[field]}
          value={form[field]}
          onChange={handleChange(field)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "rounded-xl border-3 bg-white px-4 py-2.5 text-body outline-none focus-visible:shadow-comic-sm",
            error ? "border-secondary" : "border-ink"
          )}
        />
        {error && (
          <p id={`${id}-error`} className="text-small font-semibold text-secondary">
            {error}
          </p>
        )}
      </div>
    );
  };

  if (!hydrated) {
    return (
      <>
        <Seo title={t.pages.checkout.title} noIndex />
        <Section>
          <div className="min-h-[40vh]" aria-busy="true" />
        </Section>
      </>
    );
  }

  if (items.length === 0 && !isSubmitting) {
    return (
      <>
        <Seo title={t.pages.checkout.title} noIndex />
        <Section>
          <EmptyState
            isPageHeading
            heading={t.checkout.emptyHeading}
            message={t.checkout.emptyMessage}
            actionLabel={t.cart.continueShopping}
            actionHref="/category/all"
          />
        </Section>
      </>
    );
  }

  return (
    <>
      <Seo title={t.pages.checkout.title} noIndex />

      <Section>
        <h1 className="text-h2 font-bold text-text-primary">{t.checkout.heading}</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-8">
            <fieldset className="rounded-2xl border-3 border-ink bg-white p-6">
              <legend className="px-2 text-h3 font-bold">{t.checkout.contactHeading}</legend>
              <div className="grid gap-4 sm:grid-cols-2">{CONTACT_FIELDS.map(renderField)}</div>
            </fieldset>

            <fieldset className="rounded-2xl border-3 border-ink bg-white p-6">
              <legend className="px-2 text-h3 font-bold">{t.checkout.shippingHeading}</legend>
              <div className="grid gap-4 sm:grid-cols-2">{SHIPPING_FIELDS.map(renderField)}</div>
            </fieldset>

            <p className="flex items-start gap-2 rounded-xl bg-primary/40 p-4 text-small">
              <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              {t.checkout.paymentNote}
            </p>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:self-start">
              {t.checkout.placeOrder} · {formatPrice(totalPrice)}
            </Button>
          </form>

          <aside className="h-fit rounded-2xl border-3 border-ink bg-white p-6 shadow-comic">
            <h2 className="text-h3 font-bold">{t.checkout.summaryHeading}</h2>
            <ul className="mt-4 divide-y divide-ink/10">
              {items.map((item) => (
                <li key={`${item.productId}-${item.color ?? ""}`} className="flex items-center gap-3 py-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 border-ink bg-surface">
                    {item.image && <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />}
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-bold text-primary">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-small font-semibold">{item.name}</p>
                    {item.color && <p className="text-small text-text-secondary">{item.color}</p>}
                  </div>
                  <p className="text-small font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t-3 border-ink pt-4 text-h3">
              <span>{t.cart.subtotal}</span>
              <span className="font-bold">{formatPrice(totalPrice)}</span>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
};

export default CheckoutPage;
