import React from "react";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";

function Home() {
  const { user } = UserAuth();

  console.log(user);

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Home;
