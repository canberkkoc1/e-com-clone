import React from "react";
import BestSeller from "../components/BestSeller";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { UserAuth } from "../context/AuthContext";

function Home() {
  debugger;

  return (
    <div>
      <Navbar />
      <Slider />
      <BestSeller />
    </div>
  );
}

export default Home;
