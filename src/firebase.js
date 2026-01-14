// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// 🔹 Step 1: Firebase config from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🔹 Step 2: Initialize Firebase
export const app = initializeApp(firebaseConfig);

// 🔹 Step 3: Realtime Database reference
export const db = getDatabase(app);

// 🔹 Step 4: App Check with reCAPTCHA v3
// ONLY enable App Check in production, skip in development
// To use App Check in dev, register the debug token in Firebase Console
if (!import.meta.env.DEV) {
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (recaptchaKey) {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaKey),
        isTokenAutoRefreshEnabled: true,
      });
      console.log('✅ App Check initialized (production)');
    } catch (error) {
      console.warn('⚠️ App Check initialization failed:', error.message);
    }
  }
} else {
  console.log('ℹ️ App Check disabled in development mode');
}

export default app;


