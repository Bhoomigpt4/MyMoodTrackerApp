import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_MBzktcMgY7D3bGAZuRdJ4qBJ7isa0TM",
  authDomain: "mood-tracker-6fe0f.firebaseapp.com",
  projectId: "mood-tracker-6fe0f",
  storageBucket: "mood-tracker-6fe0f.firebasestorage.app",
  messagingSenderId: "602932741268",
  appId: "1:602932741268:web:0371717be989cb4ecae081",
  measurementId: "G-9N8VLQLXVM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ Initialize Auth

export { db, auth };