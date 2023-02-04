import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export const CategoriesContext = createContext();

// get data from firebase
export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "category"));
      debugger;
      const categories = querySnapshot.docs.map((doc) => doc.data());
      setCategories(categories[0]);
    };

    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategories() {
  return useContext(CategoriesContext);
}
