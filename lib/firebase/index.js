// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import { GetServerSideProps } from "next";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: "expense-3fa5d.firebaseapp.com",
  projectId: "expense-3fa5d",
  storageBucket: "expense-3fa5d.appspot.com",
  messagingSenderId: "704975333455",
  appId: "1:704975333455:web:54c9ae57a7c9f0d4ca623a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db ,auth};