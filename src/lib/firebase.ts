
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // For Realtime Database if needed
import { getFunctions } from "firebase/functions"; // For Firebase Functions
import { getStorage } from "firebase/storage"; // For Firebase Storage if needed

const firebaseConfig = {
  apiKey: "AIzaSyA0LQlogVMZ_xss5bgU_57EQn4noNuTHXQ",
  authDomain: "crypto-casino-royale-4nvjb.firebaseapp.com",
  projectId: "crypto-casino-royale-4nvjb",
  storageBucket: "crypto-casino-royale-4nvjb.firebasestorage.app",
  messagingSenderId: "934148737291",
  appId: "1:934148737291:web:7b917df10a0e3f09c9fa0e"
};

// Check if essential environment variables are set *before* initializing
if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId
) {
  // This error will stop execution if the core config is missing,
  // making it clear that environment variables are the issue.
  throw new Error(
    "Firebase is not fully configured. Essential environment variables (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID) are missing. " +
    "Please ensure they are correctly set in your .env.local file (prefixed with NEXT_PUBLIC_) and that you have RESTARTED your development server."
  );
}

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const functions = getFunctions(app);
const storage = getStorage(app);

export { app, auth, firestore, database, functions, storage };
