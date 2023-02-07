import { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export const bestSellerContext = createContext();

export const BestSellerContextProvider = ({ children }) => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBestSeller = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      await querySnapshot.forEach((doc) => {
        setBestSeller((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    };
    getBestSeller();

    return () => getBestSeller();
  }, []);

  return (
    <bestSellerContext.Provider value={{ bestSeller, loading }}>
      {children}
    </bestSellerContext.Provider>
  );
};

export function UseBestSeller() {
  return useContext(bestSellerContext);
}
