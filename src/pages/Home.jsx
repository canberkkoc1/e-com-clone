import React from "react";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";
import { useCategories } from "../context/Categories";

function Home() {
  /*  const { user } = UserAuth();
  const { categories } = useCategories();

  console.log(categories.category); */

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Home;
