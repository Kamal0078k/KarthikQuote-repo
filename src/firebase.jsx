// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCffHD-ZTGwLqOK6XtHP7Te1I7O2ktAQfY",
  authDomain: "karthik-creatives.firebaseapp.com",
  projectId: "karthik-creatives",
  storageBucket: "karthik-creatives.appspot.com",
  messagingSenderId: "1008948402002",
  appId: "1:1008948402002:web:0b6f651dd5cccf30de8c8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
