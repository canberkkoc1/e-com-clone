import { configureStore } from "@reduxjs/toolkit";
import { apiProduct } from "../redux/apiProduct";
import userReducer from "../redux/userSlice";

/* export const store = configureStore({
  reducer: {
    [apiProduct.reducerPath]: apiProduct.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiProduct.middleware), 
  });
  */

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
