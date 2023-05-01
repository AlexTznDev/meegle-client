// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGDC-QRtF95PEky17bhg6ZONlLhyEhEUY",
  authDomain: "meegle-project-385014.firebaseapp.com",
  projectId: "meegle-project-385014",
  storageBucket: "meegle-project-385014.appspot.com",
  messagingSenderId: "621288007374",
  appId: "1:621288007374:web:df4d7b848aa573128f529f",
  measurementId: "G-F2DHHKFRVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =  getAuth(app)
const db = getFirestore(app);


export { app, auth, db };

