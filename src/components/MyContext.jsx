import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const MyContext = createContext();
const Base = createContext();

export function useContextComp() {
  return useContext(MyContext);
}

export function useBaseContextComp() {
  return useContext(Base);
}

export const MyContextComp = ({ children, checker }) => {
  const [authUser, setAuthUser] = useState("");
  const [name, setName] = useState("") // sprema ime prijavljenog korisnika jer
      	                                      // updateProfile ne triggera onAuthStateChanged
  const [animalsList, setAnimalsList] = useState([])

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser("");
      }
      checker(user)
    });
    return () => listen();
  }, []);

  const animalsCollectionRef = collection(db, "animals");


  const getList = async () =>{
    try{
      const data = await getDocs(animalsCollectionRef)
      const filteredData = data.docs.map(doc=>({
        ...doc.data(),
      id: doc.id
    }))
     setAnimalsList(filteredData)
    }
    catch (error){
      console.error(error)
    }
  }

  useEffect(()=>{
    getList()
  },[])

  console.log(animalsList)

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

  const PostInBase = async (object) =>{
    try{
    await addDoc(animalsCollectionRef,{...object})
    getList();
    }
    catch (error){
      console.error(error)
    }
  }


  return (
    <MyContext.Provider value={{ signOutFun, authUser, name, createUser, logInUser }}>
          <Base.Provider value={{ animalsList, PostInBase }}>
              {children}
          </Base.Provider>
    </MyContext.Provider>
  );
};
