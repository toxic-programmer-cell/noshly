// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "noshly-food-delivery.firebaseapp.com",
  projectId: "noshly-food-delivery",
  storageBucket: "noshly-food-delivery.firebasestorage.app",
  messagingSenderId: "1059794569495",
  appId: "1:1059794569495:web:db5d78b674d5c8e5e98f52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
