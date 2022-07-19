// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGGHt6rPx8-jcC4eykaPtgvAKMSbXvcYc",
  authDomain: "todoapp-81598.firebaseapp.com",
  projectId: "todoapp-81598",
  storageBucket: "todoapp-81598.appspot.com",
  messagingSenderId: "776583973328",
  appId: "1:776583973328:web:3d31ff2523f5b3101c11d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
export const auth = getAuth();