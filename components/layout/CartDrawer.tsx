import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import CartLineItem from "@/components/ui/CartLineItem";
import EmptyState from "@/components/ui/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeCart,
  selectCartIsOpen,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from "@/store/slices/cartSlice";
import { formatCount, useTranslation } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

/**
 * Slide-in cart panel, rendered once in `Layout`. Opened by the Navbar bag
 * icon and by every Add to Cart; closes on Escape, backdrop click, or any
 * route change (e.g. following "Checkout").
 */
export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslation();
  const isOpen = useAppSelector(selectCartIsOpen);
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleRouteChange = () => dispatch(closeCart());
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [dispatch, router.events]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch(closeCart());
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-heading"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-3 border-ink bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <header className="flex items-center justify-between border-b-3 border-ink px-5 py-4">
              <div>
                <h2 id="cart-drawer-heading" className="text-h3 font-bold">
                  {t.cart.heading}
                </h2>
                {totalItems > 0 && (
                  <p className="text-small text-text-secondary">
                    {formatCount(totalItems, t.cart.itemCountOne, t.cart.itemCount)}
                  </p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={t.cart.closeDrawer}
                onClick={() => dispatch(closeCart())}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink transition-colors hover:bg-primary"
              >
                <X size={20} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-5">
                <EmptyState
                  heading={t.cart.emptyHeading}
                  message={t.cart.emptyMessage}
                  actionLabel={t.cart.continueShopping}
                  actionHref="/category/all"
                />
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-5">
                  {items.map((item) => (
                    <CartLineItem key={`${item.productId}-${item.color ?? ""}`} item={item} compact />
                  ))}
                </ul>

                <footer className="border-t-3 border-ink px-5 py-5">
                  <div className="flex items-center justify-between text-h3">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="mt-1 text-small text-text-secondary">{t.cart.shippingNote}</p>
                  <Button asChild className="mt-4 w-full">
                    <Link href="/checkout">{t.cart.checkout}</Link>
                  </Button>
                  <Link
                    href="/cart"
                    className="mt-3 block text-center text-small font-semibold text-secondary hover:underline hover:underline-offset-4"
                  >
                    {t.cart.viewCart}
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
