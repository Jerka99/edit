// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvWjcputlw2BtIEyqPJAc339G5UIIEkwE",
  authDomain: "mybase-6584d.firebaseapp.com",
  projectId: "mybase-6584d",
  storageBucket: "mybase-6584d.appspot.com",
  messagingSenderId: "671055494134",
  appId: "1:671055494134:web:54b4b2390c21d4cad125d7",
  measurementId: "G-4QS1YJNBKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
