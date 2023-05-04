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
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const MyContext = createContext();

export function useContextComp() {
  return useContext(MyContext);
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

  const collections ={
    animalsCollectionRef:collection(db, "animals"),
  }



  const getList = async () =>{
    try{
      const data = await getDocs(collections.animalsCollectionRef)
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
    await addDoc(collections.animalsCollectionRef,{...object})
    getList();
    }
    catch (error){
      console.error(error)
    }
  }

  const deleteAnimal = async (id) =>{
    try{
      const animal = doc(db, "animals", id)
      await deleteDoc(animal)
      getList();
      }
      catch (error){
        console.error(error)
      }
  }

  const changeAnimalInfo = async (id, object) =>{
    try{
      const animal = doc(db, "animals", id)
      await updateDoc(animal, object)
      getList();
      }
      catch (error){
        console.error(error)
      }
  }




  return (
    <MyContext.Provider value={{auth:{ signOutFun, authUser, name, createUser, logInUser }, base:{ animalsList, PostInBase, deleteAnimal, changeAnimalInfo}}}>
              {children}
    </MyContext.Provider>
  );
};
