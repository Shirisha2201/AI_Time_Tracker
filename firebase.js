// firebase.js (WORKING FINAL VERSION)

// --- IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// --- YOUR FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyD8nylXz-Go88fyzfegiytDeae-UJBeQC8",
  authDomain: "ai-timetracker.firebaseapp.com",
  projectId: "ai-timetracker",
  storageBucket: "ai-timetracker.firebasestorage.app",
  messagingSenderId: "88851320884",
  appId: "1:88851320884:web:2ff2835eed938d7a957a61"
};


// --- INITIALIZE FIREBASE ---
const app = initializeApp(firebaseConfig);

// AUTH & DB
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


// --- EXPORTS ---
export {
  auth,
  db,
  provider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut
};
