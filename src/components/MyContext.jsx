import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const MyContext = createContext();

export function useContextComp() {
  return useContext(MyContext);
}

export const MyContextComp = ({ children, checker }) => {
  const [authUser, setAuthUser] = useState("");
  const [name, setName] = useState("")

  useEffect(() => {
    const filter = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser("");
      }
      checker(user)
    });
    return () => filter();
  }, []);

  const createUser = (name, email, password) => {
    setName(name)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
       return updateProfile(auth.currentUser, { displayName: name });
      })
      .catch((error) => console.error(error));
  };

  const logInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.error(error));
  };

  const signOutFun = () => {
    signOut(auth)
      .then(console.log("sucessful sign out"))
      .catch((error) => console.error(error));
  };

  

  return (
    <MyContext.Provider value={{ signOutFun, authUser, name, createUser, logInUser }}>
      {children}
    </MyContext.Provider>
  );
};
