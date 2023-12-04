// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-109d8.firebaseapp.com",
  projectId: "real-estate-109d8",
  storageBucket: "real-estate-109d8.appspot.com",
  messagingSenderId: "425514547937",
  appId: "1:425514547937:web:72d26685c9a56a7447d5a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);