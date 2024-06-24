// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "appete-bd540.firebaseapp.com",
  projectId: "appete-bd540",
  storageBucket: "appete-bd540.appspot.com",
  messagingSenderId: "204789375992",
  appId: "1:204789375992:web:bacc08ed796694f2392c0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);