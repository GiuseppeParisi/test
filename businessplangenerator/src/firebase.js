// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYLpXYRGxAzBFdEhtFefdIuJpMMONjT2A",
  authDomain: "businessplangenerator-42b07.firebaseapp.com",
  projectId: "businessplangenerator-42b07",
  storageBucket: "businessplangenerator-42b07.appspot.com",
  messagingSenderId: "642254694751",
  appId: "1:642254694751:web:cd5f4b78fa1c4c7ed0eeea"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
