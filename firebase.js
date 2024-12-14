import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    setDoc,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
    auth,
    provider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db,
    setDoc,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where
};





//SEPARATE
// import { initializeApp } from "firebase/app";
// import {
//     getAuth,
//     GoogleAuthProvider,
//     signInWithPopup,
//     createUserWithEmailAndPassword
// } from "firebase/auth";
// import {
//     getFirestore,
//     setDoc,
//     doc
// } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const db = getFirestore(app);

// export {
//     auth,
//     provider,
//     signInWithPopup,
//     createUserWithEmailAndPassword,
//     db,
//     setDoc,
//     doc
// };



///SEPARATE
// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore, setDoc, doc } from "firebase/firestore"; // Import Firestore-related functions

// // Your Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, // Add this if using Realtime Database
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// // Initialize Firestore
// const db = getFirestore(app);

// export { auth, provider, signInWithPopup, createUserWithEmailAndPassword, db, setDoc, doc };

// // export { auth, provider, signInWithPopup };





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCduGZNCS3tyrFDZaUUVSEDMIZV3TTrITA",
//   authDomain: "my-db-classprjt.firebaseapp.com",
//   projectId: "my-db-classprjt",
//   storageBucket: "my-db-classprjt.firebasestorage.app",
//   messagingSenderId: "696431626776",
//   appId: "1:696431626776:web:968e6b62558b46bb35d16d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);