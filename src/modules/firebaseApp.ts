// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQ_2KHtKJqYyAIy7dkpVvrTEvmAr_XMqM",
    authDomain: "social-media-b73ba.firebaseapp.com",
    databaseURL: "https://social-media-b73ba-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "social-media-b73ba",
    storageBucket: "social-media-b73ba.appspot.com",
    messagingSenderId: "487230275356",
    appId: "1:487230275356:web:ae69818997d7ba782e84d9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);