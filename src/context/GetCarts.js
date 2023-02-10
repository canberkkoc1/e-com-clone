import { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/config";
import secureLocalStorage from "react-secure-storage";

export const cartsContext = createContext();

export const CartsContextProvider = ({ children }) => {
  const userEmail = secureLocalStorage.getItem("user");
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  debugger;
  useEffect(() => {
    onSnapshot(
      query(collection(db, "userInfo", userEmail, "cart")),
      (snapshot) => {
        setCarts(snapshot.docs.map((doc) => doc.data()));
      }
    );
  }, [db]);

  return (
    <cartsContext.Provider value={{ carts, loading }}>
      {children}
    </cartsContext.Provider>
  );
};

export function UseCarts() {
  return useContext(cartsContext);
}
