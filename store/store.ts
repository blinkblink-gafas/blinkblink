import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/store/api/apiSlice";
import cartReducer from "@/store/slices/cartSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export const store = makeStore();

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
