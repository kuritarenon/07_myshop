// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFo9Tgrhzvc0qnHWcf3pEsHnAff7f0BtE",
    authDomain: "react-ecsite-5b7b1.firebaseapp.com",
    projectId: "react-ecsite-5b7b1",
    storageBucket: "react-ecsite-5b7b1.firebasestorage.app",
    messagingSenderId: "548326583523",
    appId: "1:548326583523:web:cefee062ab7c715d66a9d6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
