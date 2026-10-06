import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu7_wCBlVTZrl14r9dJF0t-_HvcL_SbmE",
  authDomain: "silk-road-6d4b6.firebaseapp.com",
  projectId: "silk-road-6d4b6",
  storageBucket: "silk-road-6d4b6.firebasestorage.app",
  messagingSenderId: "934916463975",
  appId: "1:934916463975:web:e9ea77136b599896a7a3c2",
  measurementId: "G-FC1WZQB9N2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);