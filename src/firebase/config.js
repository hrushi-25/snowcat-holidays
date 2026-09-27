import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Helper to sanitize environment variables (removes accidental quotes, whitespace, trailing commas)
 */
const cleanEnv = (val) => {
  if (!val) return '';
  return String(val)
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/,$/, '')
    .replace(/^["']|["']$/g, '')
    .trim();
};

/**
 * Firebase Configuration for Snowcat Holidays Frontend.
 * Reads environment variables configured in .env / Vite.
 */
const firebaseConfig = {
  apiKey: cleanEnv(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: cleanEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: cleanEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: cleanEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanEnv(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: cleanEnv(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)
};

/**
 * Check if Firebase has been properly configured with at least apiKey and projectId.
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your_api_key_here' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'your_project_id_here'
);

let app = null;
let db = null;
let auth = null;

try {
  if (isFirebaseConfigured) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.info('🔥 Firebase Cloud Firestore & Auth successfully connected to project:', firebaseConfig.projectId);
  } else {
    console.info(
      'ℹ️ Firebase credentials not detected in .env file. Running in fallback mode. Add VITE_FIREBASE_* variables to enable Cloud Firestore.'
    );
  }
} catch (error) {
  console.warn('⚠️ Firebase initialization warning:', error);
}

export { app, db, auth, firebaseConfig };
