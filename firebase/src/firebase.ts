// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBOAOu0hd-yWPqrXCYLVN1yO4PjUWIfRoo",
    authDomain: "fir-fe55b.firebaseapp.com",
    projectId: "fir-fe55b",
    storageBucket: "fir-fe55b.appspot.com",
    messagingSenderId: "34147781236",
    appId: "1:34147781236:web:09a701311638dd42495f21",
    measurementId: "G-HEK2F5HNYH"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth,db};