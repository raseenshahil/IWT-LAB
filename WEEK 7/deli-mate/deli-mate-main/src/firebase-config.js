import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyAs6WtTrF_U3zyqKU9MOQQVahDUfzHe7Eo",
  authDomain: "deli-mate-21d62.firebaseapp.com",
  projectId: "deli-mate-21d62",
  storageBucket: "deli-mate-21d62.appspot.com",
  messagingSenderId: "2020722898",
  appId: "1:2020722898:web:b503531a419c433b1c850b",
  measurementId: "G-Z9YB2R1V41",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
