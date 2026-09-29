import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

export interface WishlistState {
  productIds: Product["id"][];
  hydrated: boolean;
}

const initialState: WishlistState = {
  productIds: [],
  hydrated: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    /** Restores ids saved in localStorage (see store/persistence.ts). */
    hydrateWishlist: (state, action: PayloadAction<Product["id"][]>) => {
      state.productIds = action.payload;
      state.hydrated = true;
    },
    toggleWishlist: (state, action: PayloadAction<Product["id"]>) => {
      const id = action.payload;
      state.productIds = state.productIds.includes(id)
        ? state.productIds.filter((existing) => existing !== id)
        : [...state.productIds, id];
    },
    clearWishlist: (state) => {
      state.productIds = [];
    },
  },
});

export const { hydrateWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

// ---- Selectors ----
export const selectWishlistIds = (state: { wishlist: WishlistState }) => state.wishlist.productIds;
export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.productIds.length;
export const selectWishlistHydrated = (state: { wishlist: WishlistState }) =>
  state.wishlist.hydrated;
export const selectIsWishlisted = (id: Product["id"]) => (state: { wishlist: WishlistState }) =>
  state.wishlist.productIds.includes(id);
