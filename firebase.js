// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore }  from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC8aNgUaKNKxuTS0FQ0xNN3ZdcHd8Qr1Q",
  authDomain: "sport-wear-store.firebaseapp.com",
  projectId: "sport-wear-store",
  storageBucket: "sport-wear-store.appspot.com",
  messagingSenderId: "262469013003",
  appId: "1:262469013003:web:8f0618a0fee8b9c18dc10e"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };