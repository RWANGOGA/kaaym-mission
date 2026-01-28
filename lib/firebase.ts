// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeDv2HGFz1-VTUIhgedvWn55nZzWqVydI",
  authDomain: "kaaym-mission-52e49.firebaseapp.com",
  projectId: "kaaym-mission-52e49",
  storageBucket: "kaaym-mission-52e49.firebasestorage.app",
  messagingSenderId: "437386312638",
  appId: "1:437386312638:web:dea4cd7fde143ac38c57ef",
  measurementId: "G-LQ18ZWZRHH",
};

// Initialize Firebase app (safe for SSR and hot-reloading)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Core services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ← Added for file/image uploads

// Analytics – only initialize on client-side (throws error in SSR)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };

// Optional: Export the app instance if needed elsewhere
export { app };