import React, { useEffect } from "react";
import { UseBestSeller } from "../context/BestSeller";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

function Kids() {
  const { bestSeller, loading } = UseBestSeller();

  if (loading) {
    return <div>Loading...</div>;
  }

  const kidsCategory = bestSeller.filter((item) => item.category === "Kids");

  debugger;

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-10 mb-10">
        Kids Products
      </h1>
      <section class="border border-t-2 py-8 grid grid-cols-2 gap-x-6 gap-y-10 px-10 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4  lg:px-24">
        {kidsCategory && <ProductCard items={kidsCategory} loading={loading} />}
      </section>
    </>
  );
}

export default Kids;
