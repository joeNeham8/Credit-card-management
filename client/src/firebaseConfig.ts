// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCqVNmm1UI4hAyXGMyYeH9iqZK5mjXbDkw",
  authDomain: "credit-card-management-dbd3c.firebaseapp.com",
  projectId: "credit-card-management-dbd3c",
  storageBucket: "credit-card-management-dbd3c.firebasestorage.app",
  messagingSenderId: "332998521671",
  appId: "1:332998521671:web:052169342b8e4b2d961262",
  measurementId: "G-0SY7R8B21K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
// export const firebaseApp = initializeApp(firebaseConfig);