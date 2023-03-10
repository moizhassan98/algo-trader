// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDw4-cBnt1SwFB9hOvX8KbarfFnUp5fMfE",
  authDomain: "algotrader-eu.firebaseapp.com",
  projectId: "algotrader-eu",
  storageBucket: "algotrader-eu.appspot.com",
  messagingSenderId: "788872294533",
  appId: "1:788872294533:web:491e1693058243939079ec",
  measurementId: "G-J4M4L21JHF"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase)
const db = getFirestore(firebase)

export {
  firebase,
  analytics,
  auth,
  db
}