
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blog-c36a2.firebaseapp.com",
  projectId: "blog-c36a2",
  storageBucket: "blog-c36a2.firebasestorage.app",
  messagingSenderId: "568871148509",
  appId: "1:568871148509:web:c81ed617833aedc547b434"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);