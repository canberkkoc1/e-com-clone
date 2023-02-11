import { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { UserAuth } from "./AuthContext";

export const likesContext = createContext();

export const LikesContextProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(
      query(collection(db, "userInfo", user?.email, "likes")),
      (snapshot) => {
        setLikes(snapshot.docs.map((doc) => doc.data()));
      }
    );
  }, [db]);
  return (
    <likesContext.Provider value={{ likes, loading }}>
      {children}
    </likesContext.Provider>
  );
};

export function UseLikes() {
  return useContext(likesContext);
}
