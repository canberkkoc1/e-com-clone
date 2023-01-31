import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiProduct = createApi({
  reducerPath: "apiProduct",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
  }),
});

//! use this to get the query
export const { useGetAllProductsQuery } = apiProduct;
