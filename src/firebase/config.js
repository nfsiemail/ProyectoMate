// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//⚠️Esto no deberia compartirse en un proyecto real
//📚En este proyecto educativo, por simplicidad para todos, lo utilizamos asi
//👉A futuro lo reemplazarían por variables de entorno y archivo .env😉

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLwa3fwN-lmX1JI4Ri5Vg7EwjadKFvz2Y",
  authDomain: "proyecto-mate-26.firebaseapp.com",
  projectId: "proyecto-mate-26",
  storageBucket: "proyecto-mate-26.firebasestorage.app",
  messagingSenderId: "107974996105",
  appId: "1:107974996105:web:01e3f26e3aad8eb5705658",
  measurementId: "G-1MH99GKH7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

//para el login
const auth = getAuth(app);

export { db, auth };
