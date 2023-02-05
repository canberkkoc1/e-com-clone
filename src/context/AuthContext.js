import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password);

    // create user in firestore for user shopping cart
    setDoc(doc(db, "userInfo", email), {
      userName: name,
    });
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const getUser = async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setLoading(false);
        }
      });
    };

    const subscribe = getUser();

    return () => subscribe;
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
