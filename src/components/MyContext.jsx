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
  const [notifications, setNotificationList] = useState([])
  const [donations, setDonationList] = useState([])

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
    notificationsCollectionRef:collection(db, "notifications"),
    donationsCollectionRef:collection(db, "donations"),
    contactCollectionRef:collection(db, "contact")
  }



  const getList = async () =>{
    try{
      const animalsData = await getDocs(collections.animalsCollectionRef)
      const filteredAnimals = animalsData.docs.map(doc=>({
        ...doc.data(),
      id: doc.id
    }))

    const notificationsData = await getDocs(collections.notificationsCollectionRef)
      const filteredNotifications = notificationsData.docs.map(doc=>({
        ...doc.data(),
      id: doc.id
    }))

    const donationsData = await getDocs(collections.donationsCollectionRef)
      const filteredDonations = donationsData.docs.map(doc=>({
        ...doc.data(),
      id: doc.id
    }))

     setNotificationList(filteredNotifications)
     setAnimalsList(filteredAnimals)
     setDonationList(filteredDonations)
    }
    catch (error){
      console.error(error)
    }
  }

  useEffect(()=>{
    getList()
  },[])


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

  const postInBase = async (object, collection) =>{
    try{
    await addDoc(collections[collection],{...object})
    getList();
    }
    catch (error){
      console.error(error)
    }
  }
  const deleteFromBase = async (id, collectionName) =>{
    try{
      const element = doc(db, collectionName, id)
      await deleteDoc(element)
      getList();
      }
      catch (error){
        console.error(error)
      }
  }

  const changeInfo = async (id, object, collectionName) =>{
    try{
      const element = doc(db, collectionName, id)
      await updateDoc(element, object)
      getList();
      }
      catch (error){
        console.error(error)
      }
  }




  return (
    <MyContext.Provider value={{auth:{ signOutFun, authUser, name, createUser, logInUser },
                                base:{ animalsList, postInBase, deleteFromBase, changeInfo},
                                notifications:{notifications},
                                donations:{donations}}}>
              {children}
    </MyContext.Provider>
  );
};
