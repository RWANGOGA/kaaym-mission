// lib/firebase/client.ts
'use client'; // ← This file is only for client-side usage!

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { firebaseConfig } from './config'; // We'll create config next

// Singleton: initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export the services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics (optional, only available on client/browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;