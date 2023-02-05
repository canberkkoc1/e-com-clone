import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export const CategoriesContext = createContext();

// get data from firebase
export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "category"));
      await querySnapshot.forEach((doc) => {
        setCategories((prev) => [...prev, doc.data().category]);
        console.log(doc.data().category);
      });
      setLoading(false);
    };

    getCategories();

    return () => getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategories() {
  return useContext(CategoriesContext);
}
