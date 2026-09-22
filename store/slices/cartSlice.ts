import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "@/types/cart";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) => {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.color === item.color
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; color?: string }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.productId === action.payload.productId &&
            i.color === action.payload.color
          )
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; color?: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.color === action.payload.color
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// ---- Selectors ----
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectCartTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
