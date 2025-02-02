// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACP6zBZ_YjSrobzDLIrDSHMdT7bvSNx-s",
  authDomain: "btsproject-5d6e0.firebaseapp.com",
  projectId: "btsproject-5d6e0",
  storageBucket: "btsproject-5d6e0.firebasestorage.app",
  messagingSenderId: "32656532061",
  appId: "1:32656532061:web:1cd6648fbced591d76a3b4",
  measurementId: "G-F5FVSEJEX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export { analytics , auth ,fireStore };