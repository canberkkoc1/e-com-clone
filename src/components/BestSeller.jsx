import React from "react";
import { UseBestSeller } from "../context/BestSeller";
import LoadingPage from "../pages/LoadingPage";
import ProductCard from "./ProductCard";

function BestSeller() {
  const { bestSeller, loading } = UseBestSeller();

  // get best seller 8 item in array
  const bestSellerItem = bestSeller.slice(0, 8);

  // best seller section
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mt-10">Best Seller</h1>
      <section class="border border-t-2 py-8 grid grid-cols-2 gap-x-6 gap-y-10 px-10 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4  lg:px-24">
        <ProductCard items={bestSellerItem} loading={loading} />
      </section>
    </>
  );
}

export default BestSeller;
