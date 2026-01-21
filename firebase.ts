
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDyicXFj6oqypMkDEp701fJEFo6_sHEoa0",
  authDomain: "asdd-cf873.firebaseapp.com",
  projectId: "asdd-cf873",
  storageBucket: "asdd-cf873.firebasestorage.app",
  messagingSenderId: "487256786133",
  appId: "1:487256786133:web:77821ef44a79757e104e5c",
  measurementId: "G-PWSM5JREFP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let analytics = null;
isSupported().then(supported => {
  if (supported) analytics = getAnalytics(app);
});

export { app, db, auth, analytics };
