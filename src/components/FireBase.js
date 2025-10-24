// src/components/FireBase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ Add GoogleAuthProvider
import { getFirestore } from "firebase/firestore"; // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAiPEY4j9CLs0vdB5h_bC8FgYTgV2ofB1s",
  authDomain: "smartfoodanalyzer.firebaseapp.com",
  projectId: "smartfoodanalyzer",
  storageBucket: "smartfoodanalyzer.firebasestorage.app",
  messagingSenderId: "93720725745",
  appId: "1:93720725745:web:abd2446f8732a48d79c150",
  measurementId: "G-WKZJWW70NT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider(); // ✅ Initialize provider

export { auth, db, googleProvider }; // ✅ Export provider// ✅ Export both