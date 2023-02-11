import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import secureLocalStorage from "react-secure-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  debugger;

  const signUp = async (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password);

    // create user in firestore for user shopping cart
    setDoc(doc(db, "userInfo", email), {
      userName: name,
    });
  };

  const signIn = async (email, password) => {
    secureLocalStorage.setItem("user", email);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleSignOut = () => {
    secureLocalStorage.removeItem("user");
    return signOut(auth);
  };

  useEffect(() => {
    const getUser = async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          secureLocalStorage.setItem("user", currentUser.email);
          setLoading(false);
        }
      });
    };

    const subscribe = getUser();

    return () => subscribe;
  }, []);

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
