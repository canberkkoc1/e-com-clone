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

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);

    /* setDoc(doc(db, "NetflixUsers", email), {
      savedShows: [],
    }); */

    /*  .catch(error => {
              return error
          }) */
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    /* .then(currentUser => {
              setUser(currentUser)
          }).catch(error => {
              return error
          }) */
  };

  const handleSignOut = () => {
    return signOut(auth);

    /* .then(() => {
              setUser(null)
            }).catch((error) => {
              // An error happened.
              return error
          });
           */
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }

      return () => {
        unsubscribe();
      };
    });
  });

  return (
    <AuthContext.Provider
      value={{
        user,
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
