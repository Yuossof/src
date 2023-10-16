// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
    apiKey: "AIzaSyBvOwjFT0KVe-1R59xfSGYU4AAoT5am77o",
    authDomain: "myapp-a5381.firebaseapp.com",
    projectId: "myapp-a5381",
    storageBucket: "myapp-a5381.appspot.com",
    messagingSenderId: "33527460081",
    appId: "1:33527460081:web:8be1066d36e9c82e847950"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)