// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaXymKBhlpjw6aAfR_kO5Vkx088YTBp7U",
  authDomain: "projectyle-2eaf4.firebaseapp.com",
  projectId: "projectyle-2eaf4",
  storageBucket: "projectyle-2eaf4.appspot.com",
  messagingSenderId: "647878359343",
  appId: "1:647878359343:web:1dedb0a81359c8937009da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth()
