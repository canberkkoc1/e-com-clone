import React from "react";
import { useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function Carts() {
  const localtion = useLocation();

  const carts = localtion.state.carts;

  const userEmail = secureLocalStorage.getItem("user");
  debugger;
  return (
    <div>
      {carts.map((cart) => (
        <div key={cart.id}>
          <h1>{cart.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default Carts;
