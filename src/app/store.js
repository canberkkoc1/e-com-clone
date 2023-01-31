import { configureStore } from "@reduxjs/toolkit";
import { apiProduct } from "../redux/apiProduct";

export const store = configureStore({
  reducer: {
    [apiProduct.reducerPath]: apiProduct.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiProduct.middleware),
});
