import { describe, expect, it } from "vitest";
import reducer, {
  clearWishlist,
  hydrateWishlist,
  selectIsWishlisted,
  selectWishlistCount,
  toggleWishlist,
} from "@/store/slices/wishlistSlice";

const init = () => reducer(undefined, { type: "@@init" });

describe("wishlistSlice", () => {
  it("toggles a product on and off, keeping save order", () => {
    let wishlist = reducer(init(), toggleWishlist("p2"));
    wishlist = reducer(wishlist, toggleWishlist("p1"));
    expect(wishlist.productIds).toEqual(["p2", "p1"]);
    expect(selectIsWishlisted("p1")({ wishlist })).toBe(true);

    wishlist = reducer(wishlist, toggleWishlist("p2"));
    expect(wishlist.productIds).toEqual(["p1"]);
    expect(selectWishlistCount({ wishlist })).toBe(1);
  });

  it("hydrates saved ids and clears", () => {
    let wishlist = reducer(init(), hydrateWishlist(["p3", "p4"]));
    expect(wishlist).toEqual({ productIds: ["p3", "p4"], hydrated: true });
    wishlist = reducer(wishlist, clearWishlist());
    expect(wishlist.productIds).toEqual([]);
  });
});
