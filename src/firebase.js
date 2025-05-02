// Import the necessary functions from Firebase v9+ SDK
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // ✅ added GoogleAuthProvider
import { getFirestore } from 'firebase/firestore';  // Optional: If you're using Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ18ExT2YbCzJG6XywNGt1jr_7rwlV8pM",
  authDomain: "flowtalk-305f2.firebaseapp.com",
  projectId: "flowtalk-305f2",
  storageBucket: "flowtalk-305f2.firebasestorage.app",
  messagingSenderId: "103982464303",
  appId: "1:103982464303:web:81290e5acd7e2e8d5035da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider(); // ✅ added only this line

// Export everything
export { auth, firestore, provider }; // ✅ included provider
export default app;
