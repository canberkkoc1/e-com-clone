import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { UseBestSeller } from "../context/BestSeller";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

function Man() {
  const { bestSeller, loading } = UseBestSeller();

  if (loading) {
    return <div>Loading...</div>;
  }

  const manCategory = bestSeller.filter((item) => item.category === "Man");

  debugger;

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-10 mb-10">
        Man Products
      </h1>
      <section class="border border-t-2 py-8 grid grid-cols-2 gap-x-6 gap-y-10 px-10 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4  lg:px-24">
        {manCategory && <ProductCard items={manCategory} loading={loading} />}
      </section>
    </>
  );
}

export default Man;
