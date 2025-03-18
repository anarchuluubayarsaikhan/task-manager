
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, sendEmailVerification, sendPasswordResetEmail, signOut,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, addDoc, collection, deleteDoc, updateDoc, doc, onSnapshot, query, where, getDocs, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
auth.setPersistence(browserLocalPersistence)  
  .then(() => {
    console.log("Firebase auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error.message);
  });
  export { auth, db, addDoc, collection, deleteDoc, updateDoc, doc, onSnapshot, query, where, getDocs, getDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, signOut };


  














