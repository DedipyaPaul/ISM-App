// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from your screenshot
const firebaseConfig = {
  apiKey: "AIzaSyBtvX1Oc8oxB-g93NsfydR5u8N0ua5V1mM",
  authDomain: "spirituality-app-57548.firebaseapp.com",
  projectId: "spirituality-app-57548",
  storageBucket: "spirituality-app-57548.firebasestorage.app",
  messagingSenderId: "548623459724",
  appId: "1:548623459724:web:17ac59ca3fd576021e22a9",
  measurementId: "G-ZGFHX04WEH"
};

// Initialize Firebase and export the services we need
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);