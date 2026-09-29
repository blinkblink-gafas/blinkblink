import Link from "next/link";
import type { NextPage } from "next";
import Seo from "@/components/layout/Seo";
import Button from "@/components/ui/Button";
import CartLineItem from "@/components/ui/CartLineItem";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { useAppSelector } from "@/store/hooks";
import {
  selectCartHydrated,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from "@/store/slices/cartSlice";
import { formatCount, useTranslation } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

/** Full-page cart — the drawer's content with room to breathe, and a shareable URL. */
const CartPage: NextPage = () => {
  const t = useTranslation();
  const hydrated = useAppSelector(selectCartHydrated);
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <>
      <Seo title={t.pages.cart.title} noIndex />

      <Section>
        {!hydrated ? (
          <div className="min-h-[40vh]" aria-busy="true" />
        ) : items.length === 0 ? (
          <EmptyState
            isPageHeading
            heading={t.cart.emptyHeading}
            message={t.cart.emptyMessage}
            actionLabel={t.cart.continueShopping}
            actionHref="/category/all"
          />
        ) : (
          <>
            <h1 className="text-[28px] font-black tracking-[-0.03em] text-text-primary sm:text-[36px]">{t.cart.heading}</h1>
            <p className="mt-1 text-body text-text-secondary">
              {formatCount(totalItems, t.cart.itemCountOne, t.cart.itemCount)}
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <ul className="divide-y divide-ink/10 rounded-2xl bg-white ring-1 ring-ink/10 px-5">
                {items.map((item) => (
                  <CartLineItem key={`${item.productId}-${item.color ?? ""}`} item={item} />
                ))}
              </ul>

              <aside className="h-fit rounded-2xl bg-white ring-1 ring-ink/10 p-6">
                <div className="flex items-center justify-between text-lg">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <p className="mt-1 text-small text-text-secondary">{t.cart.shippingNote}</p>
                <Button asChild className="mt-6 w-full">
                  <Link href="/checkout">{t.cart.checkout}</Link>
                </Button>
                <Link
                  href="/category/all"
                  className="mt-4 block text-center text-small font-semibold text-text-primary hover:underline hover:underline-offset-4"
                >
                  {t.cart.continueShopping}
                </Link>
              </aside>
            </div>
          </>
        )}
      </Section>
    </>
  );
};

export default CartPage;
