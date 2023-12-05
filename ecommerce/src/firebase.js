// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries


import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSwuHrBPqv6dOVPsRy_RXfSW5k03RU7IE",
  authDomain: "fir-234ec.firebaseapp.com",
  databaseURL: "https://fir-234ec-default-rtdb.firebaseio.com",
  projectId: "fir-234ec",
  storageBucket: "fir-234ec.appspot.com",
  messagingSenderId: "222123485338",
  appId: "1:222123485338:web:127c2c9e7f17f7c2afd723",
  measurementId: "G-4S5YC2XXMG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db=firebase.firestore()