import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { UserAuth } from "../context/AuthContext";
import { useCategories } from "../context/Categories";

function Home() {
  const { user } = UserAuth();

  console.log(user);

  return (
    <div>
      <Navbar />
      <Slider />
    </div>
  );
}

export default Home;
