import type { AppStore } from "@/store/store";
import { hydrateCart } from "@/store/slices/cartSlice";
import { hydrateWishlist } from "@/store/slices/wishlistSlice";
import type { CartItem } from "@/types/cart";

const CART_KEY = "blinkblink:cart";
const WISHLIST_KEY = "blinkblink:wishlist";

function read<T>(key: string, isValid: (value: unknown) => value is T, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    // Storage blocked (private mode, disabled cookies) or corrupt JSON.
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or storage blocked — the in-memory store still works.
  }
}

function isCartItems(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.productId === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number"
    )
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((id) => typeof id === "string");
}

/**
 * Restores the cart and wishlist from localStorage, then saves them whenever
 * they change. Called once from `_app.tsx` after mount — never during render —
 * so the server and first client render agree (both start empty).
 * Returns an unsubscribe function.
 */
export function setupPersistence(store: AppStore): () => void {
  store.dispatch(hydrateCart(read(CART_KEY, isCartItems, [])));
  store.dispatch(hydrateWishlist(read(WISHLIST_KEY, isStringArray, [])));

  let { cart, wishlist } = store.getState();

  return store.subscribe(() => {
    const next = store.getState();
    if (next.cart.items !== cart.items) write(CART_KEY, next.cart.items);
    if (next.wishlist.productIds !== wishlist.productIds) write(WISHLIST_KEY, next.wishlist.productIds);
    cart = next.cart;
    wishlist = next.wishlist;
  });
}
