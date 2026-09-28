import { describe, expect, it } from "vitest";
import reducer, {
  addToCart,
  clearCart,
  closeCart,
  hydrateCart,
  removeFromCart,
  selectCartTotalItems,
  selectCartTotalPrice,
  updateQuantity,
} from "@/store/slices/cartSlice";
import type { CartState } from "@/types/cart";

const aviator = { productId: "p1", name: "Eclipse Aviator", price: 38, image: "/a.svg", color: "Jet Black" };

const init = (): CartState => reducer(undefined, { type: "@@init" });

describe("cartSlice", () => {
  it("starts empty, closed and not yet hydrated", () => {
    expect(init()).toEqual({ items: [], isOpen: false, hydrated: false });
  });

  it("adds an item with quantity 1 by default and opens the drawer", () => {
    const state = reducer(init(), addToCart(aviator));
    expect(state.items).toEqual([{ ...aviator, quantity: 1 }]);
    expect(state.isOpen).toBe(true);
  });

  it("merges the same product + color and keeps different colors separate", () => {
    let state = reducer(init(), addToCart({ ...aviator, quantity: 2 }));
    state = reducer(state, addToCart(aviator));
    state = reducer(state, addToCart({ ...aviator, color: "Tortoise" }));
    expect(state.items).toHaveLength(2);
    expect(state.items[0]?.quantity).toBe(3);
    expect(state.items[1]).toMatchObject({ color: "Tortoise", quantity: 1 });
  });

  it("removes only the matching product + color", () => {
    let state = reducer(init(), addToCart(aviator));
    state = reducer(state, addToCart({ ...aviator, color: "Tortoise" }));
    state = reducer(state, removeFromCart({ productId: "p1", color: "Jet Black" }));
    expect(state.items.map((i) => i.color)).toEqual(["Tortoise"]);
  });

  it("clamps quantity updates to at least 1", () => {
    let state = reducer(init(), addToCart(aviator));
    state = reducer(state, updateQuantity({ productId: "p1", color: "Jet Black", quantity: 0 }));
    expect(state.items[0]?.quantity).toBe(1);
  });

  it("hydrates saved items and clears", () => {
    let state = reducer(init(), hydrateCart([{ ...aviator, quantity: 2 }]));
    expect(state.hydrated).toBe(true);
    expect(state.items).toHaveLength(1);
    state = reducer(reducer(state, clearCart()), closeCart());
    expect(state.items).toEqual([]);
    expect(state.isOpen).toBe(false);
  });

  it("totals items and price", () => {
    let cart = reducer(init(), addToCart({ ...aviator, quantity: 2 }));
    cart = reducer(cart, addToCart({ productId: "p2", name: "Cat-Eye", price: 42, image: "" }));
    expect(selectCartTotalItems({ cart })).toBe(3);
    expect(selectCartTotalPrice({ cart })).toBe(118);
  });
});
