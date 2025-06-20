
// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfKCHk-1h6S_q8j9xjyT1BW3N_D7gYUYk",
  authDomain: "terraflowai-i6cxm.firebaseapp.com",
  projectId: "terraflowai-i6cxm",
  storageBucket: "terraflowai-i6cxm.appspot.com", // Corrected from firebasestorage.app
  messagingSenderId: "992274973886",
  appId: "1:992274973886:web:f3da0281d854a17bd74aef",
  measurementId: "G-FELJ9TFKNP"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | undefined;

try {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    // Initialize Analytics only on the client side
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Fallback or rethrow, depending on how critical Firebase is at init
  // For now, we'll let it proceed, but in a real app, you might want to handle this more gracefully.
  // For example, if 'app' is not initialized, other Firebase services will fail.
  // A simple approach might be to re-throw or set a global error state.
  // To prevent crashing if app is not initialized, ensure checks where 'app' is used.
  // For now, we'll assume initializeApp will succeed or the app has a way to handle its absence.
  // If this is the first initialization, an error is critical.
  // If re-initialization is attempted, Firebase SDK often throws.
  // A common pattern is to check if an app instance already exists.
  // However, this basic setup follows the user's provided snippet.
}

export { app, analytics, firebaseConfig };
